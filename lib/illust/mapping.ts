import type { ProductId } from "@/types/product";
import type { Recipe, RecipeTag } from "@/types/recipe";

export type IllustName =
  | "soupBowl"
  | "hotpot"
  | "stirfry"
  | "onigiri"
  | "riceBowl"
  | "cucumber"
  | "tofu"
  | "plate"
  | "kobachi"
  | "veg"
  | "misoSpoon";

/**
 * 警告: この配列はdata/products.tsのpairings配列の「順序(index)」に依存する。
 * pairingsの並び順を変更した場合、必ずこのマッピングも合わせて更新すること。
 *
 * koshu-miso.pairings  = [ほうとう, 味噌炒め, 焼きおにぎり, 貝の味噌汁]
 * rice-miso.pairings   = [毎日の味噌汁に。]
 * kinzanji-miso.pairings = [ごはんにのせて, きゅうりにのせて, 豆腐にのせて]
 */
const PAIRING_ILLUST: Record<ProductId, IllustName[]> = {
  "koshu-miso": ["hotpot", "stirfry", "onigiri", "soupBowl"],
  "rice-miso": ["soupBowl"],
  "kinzanji-miso": ["riceBowl", "cucumber", "tofu"],
};

export function getPairingIllust(productId: ProductId, index: number): IllustName {
  return PAIRING_ILLUST[productId]?.[index] ?? "misoSpoon";
}

const TAG_ILLUST: Record<RecipeTag, IllustName> = {
  soup: "soupBowl",
  local: "hotpot",
  main: "plate",
  side: "kobachi",
  snack: "onigiri",
  vegan: "veg",
  shojin: "misoSpoon",
};

const TAG_PRIORITY: RecipeTag[] = ["soup", "local", "main", "side", "snack", "vegan", "shojin"];

/**
 * タグ優先順位だけだと「main」タグが多く"plate"に偏るため、
 * data/recipes.ts全15件を確認した上で、炒め物・パスタ・冷やし豆腐・
 * 野菜中心の蒸し鶏など個別に適したイラストへ上書きしている。
 */
const RECIPE_ILLUST_OVERRIDE: Record<string, IllustName> = {
  "nasu-toriniku-shoga-miso": "stirfry", // なすと鶏ひき肉の「しょうが味噌炒め」
  "kinoko-miso-cream-pasta": "stirfry", // フライパンで仕上げるクリームパスタ
  "avocado-hiya-yakko-kinzanji": "tofu", // アボカド冷ややっこ(豆腐が主役)
  "mushidori-kyuri-lettuce-wrap": "veg", // 蒸し鶏ときゅうりのレタス包み(野菜が主役)
};

export function getRecipeIllust(recipe: Pick<Recipe, "id" | "tags">): IllustName {
  const override = RECIPE_ILLUST_OVERRIDE[recipe.id];
  if (override) return override;
  for (const tag of TAG_PRIORITY) {
    if (recipe.tags.includes(tag)) return TAG_ILLUST[tag];
  }
  return "misoSpoon";
}
