import Link from "next/link";
import { LineChart } from "@/components/admin/LineChart";
import { BarChart } from "@/components/admin/BarChart";
import { HorizontalBarChart } from "@/components/admin/HorizontalBarChart";
import { PeriodFilter, RANGE_OPTIONS } from "@/components/admin/PeriodFilter";
import { SECTION_LABELS, getAllAnalytics, resolveRange } from "@/lib/admin/analytics";

export const dynamic = "force-dynamic";

function buildQuery(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

export default async function AdminQrPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { range, from, to } = resolveRange(searchParams);
  const rangeLabel = RANGE_OPTIONS.find((o) => o.value === range)?.label ?? "";

  const {
    qrRows,
    dailyRows,
    itemRows,
    monthlyRows,
    pageviewSectionRows,
    productCompareRows,
  } = await getAllAnalytics(from, to);

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

  const rangeQuery = buildQuery({ range, from, to });

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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          表示期間: {from} 〜 {to} ({rangeLabel})
        </p>
        <div className="flex gap-2">
          <a
            href={`/admin/qr/export?${rangeQuery}`}
            className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-100"
          >
            CSV出力
          </a>
          <Link
            href={`/admin/qr/report?${rangeQuery}`}
            className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-100"
          >
            印刷用レポート
          </Link>
        </div>
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

      <section className="mb-8">
        <h2 className="mb-2 text-base font-medium">月別アクセス推移(直近12ヶ月)</h2>
        <div className="rounded border border-zinc-300 bg-white p-4">
          <BarChart data={monthlyChartData} ariaLabel="月別アクセス推移" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-base font-medium">ページ別アクセス(通常閲覧)</h2>
        <p className="mb-2 text-xs text-zinc-500">
          QRコード経由に限らない、サイトの通常閲覧(オーガニック/直接アクセス)をページ単位で集計したもの。
        </p>
        <div className="overflow-x-auto rounded border border-zinc-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">セクション</th>
                <th className="px-3 py-2">選択期間内アクセス数</th>
              </tr>
            </thead>
            <tbody>
              {pageviewSectionRows.map((row) => (
                <tr key={row.section} className="border-t border-zinc-200">
                  <td className="px-3 py-2">{SECTION_LABELS[row.section] ?? row.section}</td>
                  <td className="px-3 py-2">{row.total}</td>
                </tr>
              ))}
              {pageviewSectionRows.length === 0 && (
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
        <h2 className="mb-2 text-base font-medium">
          商品詳細ページ: QR経由 vs 通常アクセス比較(選択期間)
        </h2>
        <div className="overflow-x-auto rounded border border-zinc-300 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">商品</th>
                <th className="px-3 py-2">QR経由</th>
                <th className="px-3 py-2">通常アクセス</th>
              </tr>
            </thead>
            <tbody>
              {productCompareRows.map((row) => (
                <tr key={row.slug} className="border-t border-zinc-200">
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.qr_total}</td>
                  <td className="px-3 py-2">{row.pageview_total}</td>
                </tr>
              ))}
              {productCompareRows.length === 0 && (
                <tr>
                  <td className="px-3 py-2 text-zinc-500" colSpan={3}>
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
