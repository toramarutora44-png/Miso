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
 * CSS の scroll-snap による横スクロールカルーセル。JSは使用しない。
 */
export function RecipeCarousel({ recipes, locale, dict }: RecipeCarouselProps) {
  if (recipes.length === 0) {
    return <p className="text-base text-sumi-soft">{dict.common.recipeComingSoon}</p>;
  }

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="w-64 shrink-0 snap-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <RecipeCard recipe={recipe} locale={locale} dict={dict} />
        </div>
      ))}
    </div>
  );
}
