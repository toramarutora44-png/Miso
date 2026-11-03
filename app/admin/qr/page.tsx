import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

type QrRow = {
  code: string;
  label: string | null;
  place_name: string | null;
  total: string;
  last7: string;
  last30: string;
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

async function getQrRows(): Promise<QrRow[]> {
  return (await sql`
    select
      q.code,
      q.label,
      p.name as place_name,
      count(s.id)::text as total,
      count(s.id) filter (where s.day >= (current_date - interval '6 days'))::text as last7,
      count(s.id) filter (where s.day >= (current_date - interval '29 days'))::text as last30
    from qr_codes q
    left join places p on p.id = q.place_id
    left join scans s on s.code = q.code
    group by q.code, q.label, p.name
    order by q.code
  `) as unknown as QrRow[];
}

async function getDailyRows(): Promise<DailyRow[]> {
  return (await sql`
    select day::text as day, count(*)::text as total
    from scans
    where day >= (current_date - interval '29 days')
    group by day
    order by day desc
  `) as unknown as DailyRow[];
}

async function getItemRows(): Promise<ItemRow[]> {
  return (await sql`
    select
      i.slug,
      i.name,
      count(s.id)::text as total
    from items i
    left join qr_codes q on q.item_id = i.id
    left join scans s on s.code = q.code
    group by i.slug, i.name
    order by i.slug
  `) as unknown as ItemRow[];
}

export default async function AdminQrPage() {
  const [qrRows, dailyRows, itemRows] = await Promise.all([
    getQrRows(),
    getDailyRows(),
    getItemRows(),
  ]);

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
                </tr>
              ))}
              {qrRows.length === 0 && (
                <tr>
                  <td className="px-3 py-2 text-zinc-500" colSpan={6}>
                    データがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-base font-medium">日別アクセス数(直近30日)</h2>
        <div className="overflow-x-auto rounded border border-zinc-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">日付</th>
                <th className="px-3 py-2">アクセス数</th>
              </tr>
            </thead>
            <tbody>
              {dailyRows.map((row) => (
                <tr key={row.day} className="border-t border-zinc-200">
                  <td className="px-3 py-2">{row.day}</td>
                  <td className="px-3 py-2">{row.total}</td>
                </tr>
              ))}
              {dailyRows.length === 0 && (
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
        <h2 className="mb-2 text-base font-medium">商品別累計</h2>
        <div className="overflow-x-auto rounded border border-zinc-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">商品</th>
                <th className="px-3 py-2">累計アクセス数</th>
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
    </main>
  );
}
