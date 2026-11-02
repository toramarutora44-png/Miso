import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/repositories/productRepository";
import { DishIllust } from "@/components/illust/DishIllust";
import { getRecipeIllust } from "@/lib/illust/mapping";
import { TILE_BG, TILE_INK, TILE_TEXT } from "@/lib/illust/tileTheme";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface RecipeCardProps {
  recipe: Recipe;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  sizes?: string;
}

/**
 * レシピカード。
 * recipe.image(実写真)がある場合は写真を主役に表示し、ない場合は商品色ベタの
 * ラベルタイル(イラスト+料理名)にフォールバックする。
 */
export function RecipeCard({ recipe, locale, dict, className = "", sizes }: RecipeCardProps) {
  const usedProduct = getProductById(recipe.productIds[0]);
  const tileBg = usedProduct ? TILE_BG[usedProduct.id] : "bg-sumi-soft";

  if (recipe.image) {
    return (
      <Link href={`/${locale}/recipes/${recipe.slug}`} className={`block ${className}`}>
        <div className="group relative aspect-[4/3] overflow-hidden bg-sumi-soft">
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt[locale]}
            fill
            sizes={sizes ?? "(min-width: 640px) 33vw, 50vw"}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sumi/85 via-sumi/5 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute right-3 top-3 text-[10px] text-washi/80">
            {recipe.timeMinutes}
            {dict.recipe.minutesUnit}
          </span>
          <p
            className="absolute inset-x-3 bottom-2.5 font-heading text-[14.5px] leading-snug text-washi"
            style={{ fontFeatureSettings: '"palt" 1' }}
          >
            {recipe.title[locale]}
          </p>
        </div>
      </Link>
    );
  }

  const ingredientNames = recipe.ingredients
    .slice(0, 3)
    .map((i) => i.name[locale])
    .join("・");

  return (
    <Link href={`/${locale}/recipes/${recipe.slug}`} className={`block ${className}`}>
      <div className={`group relative aspect-[4/3] p-4 ${tileBg}`}>
        <div className="pointer-events-none absolute inset-2 border border-washi/25 transition-colors group-hover:border-washi/45" />
        <span className="absolute right-3 top-3 text-[10px] text-washi/60">
          {recipe.timeMinutes}
          {dict.recipe.minutesUnit}
        </span>
        <div className="flex h-full flex-col items-center justify-center gap-1.5 px-2 text-center">
          <DishIllust
            name={getRecipeIllust(recipe)}
            size={44}
            tone={usedProduct ? TILE_INK[usedProduct.id] : "dark"}
          />
          <p
            className={`font-heading text-[15px] ${usedProduct ? TILE_TEXT[usedProduct.id] : "text-washi"}`}
            style={{ fontFeatureSettings: '"palt" 1' }}
          >
            {recipe.title[locale]}
          </p>
        </div>
        <p className="absolute inset-x-4 bottom-3 line-clamp-1 text-[10.5px] text-washi/55">
          {ingredientNames}
        </p>
      </div>
    </Link>
  );
}
