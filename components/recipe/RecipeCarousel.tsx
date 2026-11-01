import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface RecipeCarouselProps {
  recipes: Recipe[];
  locale: Locale;
  dict: Dictionary;
}

/**
 * 2列グリッド表示。横スクロールなしで全件が画面内に収まる。
 */
export function RecipeCarousel({ recipes, locale, dict }: RecipeCarouselProps) {
  if (recipes.length === 0) {
    return <p className="text-base text-sumi-soft">{dict.common.recipeComingSoon}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
