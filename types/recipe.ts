import type { LocalizedText } from "./i18n";
import type { ImageRef, Confidence } from "./content";
import type { ProductId } from "./product";

export type RecipeTag =
  | "soup"
  | "main"
  | "side"
  | "snack"
  | "local"
  | "vegan"
  | "shojin";

export interface Recipe {
  id: string;
  slug: string;
  order: number;
  title: LocalizedText;
  productIds: ProductId[];
  tags: RecipeTag[];
  timeMinutes: number;
  servings: number;
  difficulty: 1 | 2 | 3;
  ingredients: { name: LocalizedText; amount: LocalizedText }[];
  steps: { text: LocalizedText; image?: ImageRef }[];
  tip?: LocalizedText;
  image: ImageRef;
  confidence: Confidence;
}
