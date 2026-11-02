import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

/**
 * ロケール無しパスを /ja へ 308 リダイレクトする。
 * /ja, /en 配下はそのまま通過させる(両ロケールとも公開対象)。
 * Accept-Language による判定は行わない(仕様上、明示的に不要)。
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
     * 以下を除く全パスにマッチ:
     * - api (API routes)
     * - _next/static, _next/image (Next.js内部)
     * - 静的ファイル(拡張子を含むパス、favicon.ico等)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
