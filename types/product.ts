import type { LocalizedText, LocalizedRich } from "./i18n";
import type { ImageRef, Provisional } from "./content";

export type ProductId = "koshu-miso" | "rice-miso" | "kinzanji-miso";

export type TasteAxis = "sweetness" | "saltiness" | "richness" | "aroma";

export type TasteProfile = Record<TasteAxis, 1 | 2 | 3 | 4 | 5>;

export interface PriceVariant {
  netWeightG: number;
  priceYen: number;
}

export interface Product {
  id: ProductId;
  slug: string;
  order: number;
  name: LocalizedText;
  catchCopy: LocalizedText;
  body: LocalizedRich;
  taste: Provisional<TasteProfile>;
  tasteNotes: Provisional<LocalizedText>;
  ingredients: Provisional<LocalizedText[] | null>;
  allergens: Provisional<string[] | null>;
  dietary: Provisional<{
    vegan: boolean | null;
    halal: boolean | null;
    glutenFree: boolean | null;
  }>;
  agingMonths: Provisional<number | null>;
  priceVariants: Provisional<PriceVariant[] | null>;
  pairings: LocalizedText[];
  recipeIds: string[];
  images: { hero: ImageRef; thumb: ImageRef };
  purchase: { ecUrl: string | null; isPlaceholderUrl: boolean };
}
