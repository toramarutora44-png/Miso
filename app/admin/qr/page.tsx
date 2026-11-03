import { sql } from "@/lib/db";
import { LineChart } from "@/components/admin/LineChart";
import { BarChart } from "@/components/admin/BarChart";
import { HorizontalBarChart } from "@/components/admin/HorizontalBarChart";
import { PeriodFilter, RANGE_OPTIONS, type RangeKey } from "@/components/admin/PeriodFilter";

export const dynamic = "force-dynamic";

type QrRow = {
  code: string;
  label: string | null;
  place_name: string | null;
  total: string;
  last7: string;
  last30: string;
  range_total: string;
};

type DailyRow = {
  day: string;
  total: string;
};

type ItemRow = {
  slug: string;
  name: string;
  total: string;
};

type MonthlyRow = {
  month: string;
  total: string;
};

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function resolveRange(searchParams: Record<string, string | string[] | undefined>): {
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

async function getQrRows(from: string, to: string): Promise<QrRow[]> {
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

async function getDailyRows(from: string, to: string): Promise<DailyRow[]> {
  return (await sql`
    select day::text as day, count(*)::text as total
    from scans
    where day >= ${from}::date and day <= ${to}::date
    group by day
    order by day asc
  `) as unknown as DailyRow[];
}

async function getItemRows(from: string, to: string): Promise<ItemRow[]> {
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

async function getMonthlyRows(): Promise<MonthlyRow[]> {
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

export default async function AdminQrPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { range, from, to } = resolveRange(searchParams);
  const rangeLabel = RANGE_OPTIONS.find((o) => o.value === range)?.label ?? "";

  const [qrRows, dailyRows, itemRows, monthlyRows] = await Promise.all([
    getQrRows(from, to),
    getDailyRows(from, to),
    getItemRows(from, to),
    getMonthlyRows(),
  ]);

  const dailyRowsDesc = [...dailyRows].reverse();
  const dailyChartData = dailyRows.map((row) => ({
    label: row.day.slice(5),
    value: Number(row.total),
  }));
  const itemChartData = itemRows.map((row) => ({
    label: row.name,
    value: Number(row.total),
  }));
  const monthlyChartData = monthlyRows.map((row) => ({
    label: row.month,
    value: Number(row.total),
  }));

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">QRアクセス計測</h1>
        <form action="/admin/logout" method="post">
          <button
            type="submit"
            className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-100"
          >
            ログアウト
          </button>
        </form>
      </div>

      <PeriodFilter range={range} from={from} to={to} />
      <p className="mb-6 text-xs text-zinc-500">
        表示期間: {from} 〜 {to} ({rangeLabel})
      </p>

      <section className="mb-8">
        <h2 className="mb-2 text-base font-medium">QRコード別</h2>
        <div className="overflow-x-auto rounded border border-zinc-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">コード</th>
                <th className="px-3 py-2">ラベル</th>
                <th className="px-3 py-2">設置場所</th>
                <th className="px-3 py-2">累計</th>
                <th className="px-3 py-2">直近7日</th>
                <th className="px-3 py-2">直近30日</th>
                <th className="px-3 py-2">選択期間内</th>
              </tr>
            </thead>
            <tbody>
              {qrRows.map((row) => (
                <tr key={row.code} className="border-t border-zinc-200">
                  <td className="px-3 py-2 font-mono">{row.code}</td>
                  <td className="px-3 py-2">{row.label ?? "-"}</td>
                  <td className="px-3 py-2">{row.place_name ?? "-"}</td>
                  <td className="px-3 py-2">{row.total}</td>
                  <td className="px-3 py-2">{row.last7}</td>
                  <td className="px-3 py-2">{row.last30}</td>
                  <td className="px-3 py-2">{row.range_total}</td>
                </tr>
              ))}
              {qrRows.length === 0 && (
                <tr>
                  <td className="px-3 py-2 text-zinc-500" colSpan={7}>
                    データがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-base font-medium">日別アクセス推移(選択期間)</h2>
        <div className="mb-4 rounded border border-zinc-300 bg-white p-4">
          <LineChart data={dailyChartData} ariaLabel="日別アクセス推移" />
        </div>
        <div className="overflow-x-auto rounded border border-zinc-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">日付</th>
                <th className="px-3 py-2">アクセス数</th>
              </tr>
            </thead>
            <tbody>
              {dailyRowsDesc.map((row) => (
                <tr key={row.day} className="border-t border-zinc-200">
                  <td className="px-3 py-2">{row.day}</td>
                  <td className="px-3 py-2">{row.total}</td>
                </tr>
              ))}
              {dailyRowsDesc.length === 0 && (
                <tr>
                  <td className="px-3 py-2 text-zinc-500" colSpan={2}>
                    データがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-base font-medium">商品別アクセス数(選択期間)</h2>
        <div className="mb-4 rounded border border-zinc-300 bg-white p-4">
          <HorizontalBarChart data={itemChartData} ariaLabel="商品別アクセス数" />
        </div>
        <div className="overflow-x-auto rounded border border-zinc-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">商品</th>
                <th className="px-3 py-2">選択期間内アクセス数</th>
              </tr>
            </thead>
            <tbody>
              {itemRows.map((row) => (
                <tr key={row.slug} className="border-t border-zinc-200">
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.total}</td>
                </tr>
              ))}
              {itemRows.length === 0 && (
                <tr>
                  <td className="px-3 py-2 text-zinc-500" colSpan={2}>
                    データがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-base font-medium">月別アクセス推移(直近12ヶ月)</h2>
        <div className="rounded border border-zinc-300 bg-white p-4">
          <BarChart data={monthlyChartData} ariaLabel="月別アクセス推移" />
        </div>
      </section>
    </main>
  );
}
