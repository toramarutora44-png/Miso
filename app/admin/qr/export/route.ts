import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SECTION_LABELS, getAllAnalytics, resolveRange } from "@/lib/admin/analytics";

export const dynamic = "force-dynamic";

/**
 * CSV出力。Excelでの文字化けを避けるためUTF-8 BOMを付与する。
 * フィールドはダブルクォートで囲み、内部の " は "" にエスケープする(RFC4180準拠)。
 */
function csvField(value: string | number): string {
  const s = String(value);
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function csvRow(values: (string | number)[]): string {
  return values.map(csvField).join(",") + "\r\n";
}

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const { range, from, to } = resolveRange(searchParams);

  const { qrRows, dailyRows, itemRows, pageviewSectionRows, productCompareRows } =
    await getAllAnalytics(from, to);

  let csv = "";
  csv += csvRow(["みそ工房の郷 QRアクセス計測レポート"]);
  csv += csvRow(["集計期間", `${from} 〜 ${to}`, "期間指定", range]);
  csv += "\r\n";

  csv += csvRow(["■ QRコード別"]);
  csv += csvRow(["コード", "ラベル", "設置場所", "累計", "直近7日", "直近30日", "選択期間内"]);
  for (const row of qrRows) {
    csv += csvRow([
      row.code,
      row.label ?? "",
      row.place_name ?? "",
      row.total,
      row.last7,
      row.last30,
      row.range_total,
    ]);
  }
  csv += "\r\n";

  csv += csvRow(["■ 日別アクセス数(選択期間)"]);
  csv += csvRow(["日付", "アクセス数"]);
  for (const row of dailyRows) {
    csv += csvRow([row.day, row.total]);
  }
  csv += "\r\n";

  csv += csvRow(["■ 商品別アクセス数(選択期間)"]);
  csv += csvRow(["商品", "選択期間内アクセス数"]);
  for (const row of itemRows) {
    csv += csvRow([row.name, row.total]);
  }
  csv += "\r\n";

  csv += csvRow(["■ ページ別アクセス(通常閲覧、選択期間)"]);
  csv += csvRow(["セクション", "選択期間内アクセス数"]);
  for (const row of pageviewSectionRows) {
    csv += csvRow([SECTION_LABELS[row.section] ?? row.section, row.total]);
  }
  csv += "\r\n";

  csv += csvRow(["■ 商品詳細ページ: QR経由 vs 通常アクセス比較(選択期間)"]);
  csv += csvRow(["商品", "QR経由", "通常アクセス"]);
  for (const row of productCompareRows) {
    csv += csvRow([row.name, row.qr_total, row.pageview_total]);
  }

  const bom = "﻿";
  const body = bom + csv;
  const filename = `qr-access-${from}_${to}.csv`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
