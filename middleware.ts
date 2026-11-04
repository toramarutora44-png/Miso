import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import {
  classifyUserAgent,
  getClientIp,
  getJstDayAndMonth,
  hashVisitor,
  isBotUserAgent,
} from "@/lib/tracking/visitor";

/**
 * ロケール無しパスを /ja へ 308 リダイレクトする。
 * /ja, /en 配下はそのまま通過させる(両ロケールとも公開対象)。
 * Accept-Language による判定は行わない(仕様上、明示的に不要)。
 *
 * /admin 配下は別経路(独立レイアウト)のため、ロケール無し判定からは除外し、
 * 代わりにCookie認証チェックを行う(/admin/login 自体は除く)。
 * /q 配下はトラッキングリダイレクト専用のRoute Handlerのため、
 * ロケール判定の対象から除外する。
 */

/**
 * pathname からアクセス計測用のセクションを判定する。
 * `/{locale}` 配下のパスのみを対象とする想定(呼び出し元でisLocale確認済み)。
 */
function resolveSection(pathname: string): string {
  // 例: "/ja/products/koshu-miso" -> ["ja", "products", "koshu-miso"]
  const segments = pathname.split("/").filter(Boolean).slice(1);
  const sub = segments[0];

  if (!sub) return "top";
  if (sub === "products") return segments[1] ? "product_detail" : "products";
  if (sub === "recipes") return segments[1] ? "recipe_detail" : "recipes";
  if (sub === "producer") return "producer";
  return "other";
}

/**
 * 通常閲覧(QR経由に限らないページ単位)のアクセスを記録する。
 * レスポンスには一切影響させない(失敗してもページ表示は必ず成功させる)。
 *
 * なぜここだけ pg でなく fetch(PostgREST) なのか:
 * middleware.ts は Next.js の仕様上 Edge Runtime に固定され、`runtime`
 * オプションでNode.js Runtimeに切り替えることができない。Edge Runtimeでは
 * `pg`(raw TCPソケットを使うPostgresクライアント)が動作しないため、
 * Supabaseの REST API(PostgREST)へ fetch() でINSERTする方式を取る。
 * (/q/[code]/route.ts は Route Handler なので runtime="nodejs" を指定でき、
 * そちらは引き続き `pg` 経由で scans テーブルに書き込んでいる。)
 */
async function recordPageview(
  request: NextRequest,
  locale: string,
  section: string,
): Promise<void> {
  try {
    if (process.env.VERCEL_ENV !== "production") return;

    const ua = request.headers.get("user-agent") ?? "";
    if (isBotUserAgent(ua)) return;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;
    if (!supabaseUrl || !supabaseKey) return;

    const ip = getClientIp(request.headers);
    const country = request.headers.get("x-vercel-ip-country") ?? null;
    const { day, month } = getJstDayAndMonth();
    const salt = process.env.ADMIN_SESSION_SECRET ?? "";
    const visitorHash = await hashVisitor(ip, ua, day, salt);
    const uaClass = classifyUserAgent(ua);

    await fetch(`${supabaseUrl}/rest/v1/pageviews`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        path: request.nextUrl.pathname,
        section,
        locale,
        day,
        month,
        visitor_hash: visitorHash,
        ua_class: uaClass,
        country,
      }),
    });
  } catch {
    // 計測失敗はページ表示に影響させない
  }
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login" || pathname === "/admin/login/submit") {
      return NextResponse.next();
    }

    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET ?? "";
    const isValid = secret ? await verifySessionToken(token, secret) : false;

    if (!isValid) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl, 302);
    }

    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const firstSegment = segments[1] ?? "";

  if (isLocale(firstSegment)) {
    // レスポンスを待たずに計測を完了させる(fire-and-forget)。
    // middlewareはレスポンス返却後に実行コンテキストが終了する可能性があるため、
    // event.waitUntil() で計測Promiseの完了をランタイムに保証させる。
    event.waitUntil(recordPageview(request, firstSegment, resolveSection(pathname)));
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const suffix = pathname === "/" ? "" : pathname;
  url.pathname = `/${defaultLocale}${suffix}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * 以下を除く全パスにマッチ(ロケール無しリダイレクト用):
     * - api (API routes)
     * - admin (独自レイアウト + Cookie認証。別パターンで個別にマッチさせる)
     * - q (QRトラッキング用Route Handler)
     * - _next/static, _next/image (Next.js内部)
     * - 静的ファイル(拡張子を含むパス、favicon.ico等)
     */
    "/((?!api|admin|q|_next/static|_next/image|favicon.ico|images/).*)",
    // /admin 配下はCookie認証チェックのため個別にミドルウェアを発火させる
    "/admin/:path*",
  ],
};
