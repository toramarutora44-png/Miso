import { dictionaries, type Dictionary } from "./dictionaries";
import type { Locale } from "@/types/i18n";

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
