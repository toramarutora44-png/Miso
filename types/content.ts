import type { Locale } from "./i18n";

export type Confidence = "confirmed" | "provisional" | "unverified";

export interface Provisional<T> {
  value: T;
  confidence: Confidence;
  note?: string;
}

export interface ImageRef {
  src: string;
  alt: Record<Locale, string>;
  width: number;
  height: number;
  isPlaceholder?: boolean;
}
