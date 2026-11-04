import { sql } from "@/lib/db";
import { RANGE_OPTIONS, type RangeKey } from "@/components/admin/PeriodFilter";

/**
 * /admin/qr, /admin/qr/export, /admin/qr/report で共通利用する
 * 集計クエリ・期間解決ロジック。
 */

export type QrRow = {
  code: string;
  label: string | null;
  place_name: string | null;
  total: string;
  last7: string;
  last30: string;
  range_total: string;
};

export type DailyRow = {
  day: string;
  total: string;
};

export type ItemRow = {
  slug: string;
  name: string;
  total: string;
};

export type MonthlyRow = {
  month: string;
  total: string;
};

export type SectionRow = {
  section: string;
  total: string;
};

export type ProductCompareRow = {
  slug: string;
  name: string;
  qr_total: string;
  pageview_total: string;
};

export const SECTION_LABELS: Record<string, string> = {
  top: "TOP",
  products: "商品一覧",
  product_detail: "商品詳細",
  recipes: "レシピ一覧",
  recipe_detail: "レシピ詳細",
  producer: "生産者",
  other: "その他",
};

export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function resolveRange(searchParams: Record<string, string | string[] | undefined>): {
  range: RangeKey;
  from: string;
  to: string;
} {
  const rawRange = searchParams.range;
  const validKeys = RANGE_OPTIONS.map((o) => o.value);
  const range: RangeKey = validKeys.includes(rawRange as RangeKey)
    ? (rawRange as RangeKey)
    : "30d";

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let from = today;
  let to = today;

  if (range === "today") {
    from = today;
    to = today;
  } else if (range === "7d") {
    from = new Date(today);
    from.setDate(from.getDate() - 6);
    to = today;
  } else if (range === "30d") {
    from = new Date(today);
    from.setDate(from.getDate() - 29);
    to = today;
  } else if (range === "thisMonth") {
    from = new Date(today.getFullYear(), today.getMonth(), 1);
    to = today;
  } else if (range === "lastMonth") {
    from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    to = new Date(today.getFullYear(), today.getMonth(), 0);
  } else if (range === "custom") {
    const rawFrom = typeof searchParams.from === "string" ? searchParams.from : undefined;
    const rawTo = typeof searchParams.to === "string" ? searchParams.to : undefined;
    const parsedFrom = rawFrom && !Number.isNaN(Date.parse(rawFrom)) ? new Date(rawFrom) : null;
    const parsedTo = rawTo && !Number.isNaN(Date.parse(rawTo)) ? new Date(rawTo) : null;
    from = parsedFrom ?? today;
    to = parsedTo ?? today;
    if (from.getTime() > to.getTime()) {
      const tmp = from;
      from = to;
      to = tmp;
    }
  }

  return { range, from: formatDate(from), to: formatDate(to) };
}

export async function getQrRows(from: string, to: string): Promise<QrRow[]> {
  return (await sql`
    select
      q.code,
      q.label,
      p.name as place_name,
      count(s.id)::text as total,
      count(s.id) filter (where s.day >= (current_date - interval '6 days'))::text as last7,
      count(s.id) filter (where s.day >= (current_date - interval '29 days'))::text as last30,
      count(s.id) filter (where s.day >= ${from}::date and s.day <= ${to}::date)::text as range_total
    from qr_codes q
    left join places p on p.id = q.place_id
    left join scans s on s.code = q.code
    group by q.code, q.label, p.name
    order by q.code
  `) as unknown as QrRow[];
}

export async function getDailyRows(from: string, to: string): Promise<DailyRow[]> {
  return (await sql`
    select day::text as day, count(*)::text as total
    from scans
    where day >= ${from}::date and day <= ${to}::date
    group by day
    order by day asc
  `) as unknown as DailyRow[];
}

export async function getItemRows(from: string, to: string): Promise<ItemRow[]> {
  return (await sql`
    select
      i.slug,
      i.name,
      count(s.id)::text as total
    from items i
    left join qr_codes q on q.item_id = i.id
    left join scans s on s.code = q.code and s.day >= ${from}::date and s.day <= ${to}::date
    group by i.slug, i.name
    order by i.slug
  `) as unknown as ItemRow[];
}

export async function getMonthlyRows(): Promise<MonthlyRow[]> {
  return (await sql`
    select
      to_char(gs, 'YYYY-MM') as month,
      count(s.id)::text as total
    from generate_series(
      date_trunc('month', current_date) - interval '11 months',
      date_trunc('month', current_date),
      interval '1 month'
    ) as gs
    left join scans s on s.month = to_char(gs, 'YYYY-MM')
    group by gs
    order by gs asc
  `) as unknown as MonthlyRow[];
}

/**
 * セクション別アクセス数(通常閲覧、pageviewsテーブル)。
 * 全セクションを固定順で表示するため、VALUES句で左外部結合する
 * (データが0件のセクションも0として表示するため)。
 */
export async function getPageviewSectionRows(from: string, to: string): Promise<SectionRow[]> {
  return (await sql`
    select
      v.section,
      count(p.id)::text as total
    from (
      values ('top'), ('products'), ('product_detail'),
             ('recipes'), ('recipe_detail'), ('producer'), ('other')
    ) as v(section)
    left join pageviews p
      on p.section = v.section
      and p.day >= ${from}::date and p.day <= ${to}::date
    group by v.section
    order by array_position(
      array['top','products','product_detail','recipes','recipe_detail','producer','other'],
      v.section
    )
  `) as unknown as SectionRow[];
}

/**
 * 商品詳細ページへのアクセスを QR経由(scans) / 通常アクセス(pageviews)で
 * 商品ごとに並べて比較する。
 * pageviews.path は "/{locale}/products/{slug}" 形式のため、split_partで
 * 4番目のセグメント(slug)を取り出して items.slug に突き合わせる。
 * count(distinct ...) を使うことで、scans側とpageviews側それぞれの
 * 1対多JOINが掛け合わさっても正しい件数になる。
 */
export async function getProductCompareRows(
  from: string,
  to: string,
): Promise<ProductCompareRow[]> {
  return (await sql`
    select
      i.slug,
      i.name,
      count(distinct s.id)::text as qr_total,
      count(distinct pv.id)::text as pageview_total
    from items i
    left join qr_codes q on q.item_id = i.id
    left join scans s on s.code = q.code
      and s.day >= ${from}::date and s.day <= ${to}::date
    left join pageviews pv on pv.section = 'product_detail'
      and split_part(pv.path, '/', 4) = i.slug
      and pv.day >= ${from}::date and pv.day <= ${to}::date
    group by i.slug, i.name
    order by i.slug
  `) as unknown as ProductCompareRow[];
}

export async function getAllAnalytics(from: string, to: string) {
  const [qrRows, dailyRows, itemRows, monthlyRows, pageviewSectionRows, productCompareRows] =
    await Promise.all([
      getQrRows(from, to),
      getDailyRows(from, to),
      getItemRows(from, to),
      getMonthlyRows(),
      getPageviewSectionRows(from, to),
      getProductCompareRows(from, to),
    ]);
  return { qrRows, dailyRows, itemRows, monthlyRows, pageviewSectionRows, productCompareRows };
}
