import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

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
export async function middleware(request: NextRequest) {
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
