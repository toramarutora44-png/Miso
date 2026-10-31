import ja from "@/locales/ja.json";
import en from "@/locales/en.json";
import type { Locale } from "@/types/i18n";

export type Dictionary = typeof ja;

export const dictionaries: Record<Locale, Dictionary> = {
  ja,
  en,
};
