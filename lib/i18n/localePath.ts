import type { Locale } from "@/types/i18n";
import { isLocale } from "./config";

/**
 * パスの先頭セグメントをロケールに差し替える。
 * 先頭セグメントがロケールでない場合は先頭に付与する。
 */
export function localePath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  // segments[0] は "" (先頭の"/"による)
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || "/";
  }
  const rest = pathname === "/" ? "" : pathname;
  return `/${locale}${rest}`;
}
