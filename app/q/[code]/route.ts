import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import {
  classifyUserAgent,
  getClientIp,
  getJstDayAndMonth,
  hashVisitor,
  isBotUserAgent,
} from "@/lib/tracking/visitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK_PATH = "/ja";

/**
 * 計測結果をDBに記録する。レスポンスには影響させない
 * (失敗してもリダイレクト自体は必ず成功させる)。
 * Next 14.2系に `after()` が無いため、awaitせずfire-and-forgetする。
 */
async function recordScan(code: string, request: NextRequest): Promise<void> {
  try {
    if (process.env.VERCEL_ENV !== "production") return;

    const ua = request.headers.get("user-agent") ?? "";
    if (isBotUserAgent(ua)) return;

    const ip = getClientIp(request.headers);
    const country = request.headers.get("x-vercel-ip-country") ?? null;
    const { day, month } = getJstDayAndMonth();
    const salt = process.env.ADMIN_SESSION_SECRET ?? "";
    const visitorHash = await hashVisitor(ip, ua, day, salt);
    const uaClass = classifyUserAgent(ua);

    await sql`
      insert into scans (code, day, month, visitor_hash, ua_class, country)
      values (${code}, ${day}, ${month}, ${visitorHash}, ${uaClass}, ${country})
    `;
  } catch {
    // 計測失敗はリダイレクトに影響させない
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const { code } = params;

  let destPath = FALLBACK_PATH;
  try {
    const rows = await sql<{ dest_path: string }>`
      select dest_path from qr_codes
      where code = ${code} and archived = false
      limit 1
    `;
    if (rows.length > 0) {
      destPath = rows[0].dest_path as string;
    }
  } catch {
    // DB参照失敗時もフォールバック先へ302する
  }

  // レスポンスを待たずに計測を行う(fire-and-forget)。
  void recordScan(code, request);

  const url = request.nextUrl.clone();
  url.pathname = destPath;
  url.search = "";
  return NextResponse.redirect(url, 302);
}
