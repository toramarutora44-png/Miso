import type { Locale } from "@/types/i18n";

/**
 * 公開対象ロケール。/en は今回公開対象から外す(P0)。
 * 型 Locale 自体は "ja" | "en" のまま維持し、将来の英語版復活に備える。
 */
export const locales: Locale[] = ["ja"];

export const defaultLocale: Locale = "ja";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
