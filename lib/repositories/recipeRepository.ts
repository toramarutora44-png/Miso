import { recipes } from "@/data/recipes";
import type { Recipe } from "@/types/recipe";
import type { ProductId } from "@/types/product";

/**
 * data/ への直接アクセスはこのファイル(lib/repositories/)経由に限定する。
 * ページ・コンポーネントからは data/ を直接importせず、本リポジトリ関数を使うこと。
 */

export async function getAllRecipes(): Promise<Recipe[]> {
  return [...recipes].sort((a, b) => a.order - b.order);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
  return recipes.find((r) => r.slug === slug);
}

export async function getRecipesForProduct(productId: ProductId): Promise<Recipe[]> {
  return recipes
    .filter((r) => r.productIds.includes(productId))
    .sort((a, b) => a.order - b.order);
}

export async function getAllRecipeSlugs(): Promise<string[]> {
  return recipes.map((r) => r.slug);
}
