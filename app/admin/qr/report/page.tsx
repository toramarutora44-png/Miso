import Link from "next/link";
import { PrintButton } from "@/components/admin/PrintButton";
import { SECTION_LABELS, getAllAnalytics, resolveRange } from "@/lib/admin/analytics";
import { RANGE_OPTIONS } from "@/components/admin/PeriodFilter";

export const dynamic = "force-dynamic";

export default async function AdminQrReportPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { range, from, to } = resolveRange(searchParams);
  const rangeLabel = RANGE_OPTIONS.find((o) => o.value === range)?.label ?? "";

  const { qrRows, itemRows, pageviewSectionRows, productCompareRows } = await getAllAnalytics(
    from,
    to,
  );

  const totalScans = qrRows.reduce((sum, row) => sum + Number(row.range_total), 0);
  const totalPageviews = pageviewSectionRows.reduce((sum, row) => sum + Number(row.total), 0);

  const itemRanking = [...itemRows].sort((a, b) => Number(b.total) - Number(a.total));

  const today = new Date();
  const printedAt = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate(),
  ).padStart(2, "0")}`;

  return (
    <main className="mx-auto max-w-3xl p-6 text-sm">
      <div className="no-print mb-6 flex items-center justify-between">
        <Link href="/admin/qr" className="text-sm text-zinc-600 underline">
          ← 管理画面に戻る
        </Link>
        <PrintButton />
      </div>

      <h1 className="text-xl font-semibold">QRアクセス計測 レポート</h1>
      <p className="mt-1 text-zinc-600">みそ工房の郷</p>
      <p className="mt-4 text-xs text-zinc-500">
        集計期間: {from} 〜 {to} ({rangeLabel}) / 出力日: {printedAt}
      </p>

      <section className="mt-6">
        <h2 className="mb-2 text-base font-medium">サマリー</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded border border-zinc-300 p-3">
            <p className="text-xs text-zinc-500">QR経由アクセス数(選択期間)</p>
            <p className="text-2xl font-semibold">{totalScans}</p>
          </div>
          <div className="rounded border border-zinc-300 p-3">
            <p className="text-xs text-zinc-500">通常閲覧ページビュー数(選択期間)</p>
            <p className="text-2xl font-semibold">{totalPageviews}</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-base font-medium">QRコード別アクセス数</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-400 text-left">
              <th className="py-1 pr-2">コード</th>
              <th className="py-1 pr-2">ラベル</th>
              <th className="py-1 pr-2">設置場所</th>
              <th className="py-1 pr-2">選択期間内</th>
              <th className="py-1 pr-2">累計</th>
            </tr>
          </thead>
          <tbody>
            {qrRows.map((row) => (
              <tr key={row.code} className="border-b border-zinc-200">
                <td className="py-1 pr-2 font-mono">{row.code}</td>
                <td className="py-1 pr-2">{row.label ?? "-"}</td>
                <td className="py-1 pr-2">{row.place_name ?? "-"}</td>
                <td className="py-1 pr-2">{row.range_total}</td>
                <td className="py-1 pr-2">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-base font-medium">商品別人気ランキング(選択期間)</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-400 text-left">
              <th className="py-1 pr-2">順位</th>
              <th className="py-1 pr-2">商品</th>
              <th className="py-1 pr-2">アクセス数</th>
            </tr>
          </thead>
          <tbody>
            {itemRanking.map((row, i) => (
              <tr key={row.slug} className="border-b border-zinc-200">
                <td className="py-1 pr-2">{i + 1}</td>
                <td className="py-1 pr-2">{row.name}</td>
                <td className="py-1 pr-2">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-base font-medium">ページ別アクセス(通常閲覧)</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-400 text-left">
              <th className="py-1 pr-2">セクション</th>
              <th className="py-1 pr-2">アクセス数</th>
            </tr>
          </thead>
          <tbody>
            {pageviewSectionRows.map((row) => (
              <tr key={row.section} className="border-b border-zinc-200">
                <td className="py-1 pr-2">{SECTION_LABELS[row.section] ?? row.section}</td>
                <td className="py-1 pr-2">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-base font-medium">商品詳細ページ: QR経由 vs 通常アクセス</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-400 text-left">
              <th className="py-1 pr-2">商品</th>
              <th className="py-1 pr-2">QR経由</th>
              <th className="py-1 pr-2">通常アクセス</th>
            </tr>
          </thead>
          <tbody>
            {productCompareRows.map((row) => (
              <tr key={row.slug} className="border-b border-zinc-200">
                <td className="py-1 pr-2">{row.name}</td>
                <td className="py-1 pr-2">{row.qr_total}</td>
                <td className="py-1 pr-2">{row.pageview_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-8 text-xs text-zinc-400">
        ※ このレポートは実際の購入データではなく、QRコード・ページへのアクセス数を集計したものです。
      </p>
    </main>
  );
}
