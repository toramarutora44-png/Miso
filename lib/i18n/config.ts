import type { Locale } from "@/types/i18n";

/**
 * 公開対象ロケール。日本語・英語の2言語を公開する。
 */
export const locales: Locale[] = ["ja", "en"];

export const defaultLocale: Locale = "ja";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
