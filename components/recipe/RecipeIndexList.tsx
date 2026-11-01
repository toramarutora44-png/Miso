import Link from "next/link";
import { getProductById } from "@/lib/repositories/productRepository";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductId } from "@/types/product";

interface RecipeIndexListProps {
  recipes: Recipe[];
  locale: Locale;
  dict: Dictionary;
  /** trueなら商品ごとに見出しを分けて表示する。falseはフラットな一覧。 */
  groupByProduct?: boolean;
  className?: string;
}

const PRODUCT_ORDER: ProductId[] = ["koshu-miso", "rice-miso", "kinzanji-miso"];

const PRODUCT_STYLE: Record<ProductId, { text: string; rule: string; bar: string }> = {
  "koshu-miso": { text: "text-koshu", rule: "bg-koshu/30", bar: "bg-koshu" },
  "rice-miso": { text: "text-kome", rule: "bg-kome/30", bar: "bg-kome" },
  "kinzanji-miso": { text: "text-kinzanji", rule: "bg-kinzanji/30", bar: "bg-kinzanji" },
};

/**
 * 「雑誌の巻末索引」のような組版のレシピ一覧。トップページと/{locale}/recipesで共通利用する。
 */
export function RecipeIndexList({
  recipes,
  locale,
  dict,
  groupByProduct = false,
  className = "",
}: RecipeIndexListProps) {
  if (!groupByProduct) {
    return (
      <ol className={className}>
        {recipes.map((recipe, i) => (
          <RecipeRow
            key={recipe.id}
            recipe={recipe}
            index={i}
            locale={locale}
            dict={dict}
            showProductBadge
          />
        ))}
      </ol>
    );
  }

  return (
    <div className={`flex flex-col gap-10 ${className}`}>
      {PRODUCT_ORDER.map((productId) => {
        const product = getProductById(productId);
        const groupRecipes = recipes.filter((r) => r.productIds.includes(productId));
        if (!product || groupRecipes.length === 0) return null;
        const style = PRODUCT_STYLE[productId];

        return (
          <div
            key={productId}
            id={`recipe-group-${productId}`}
            className="grid grid-cols-[28px_1fr] gap-x-4 scroll-mt-16"
          >
            <div className="flex flex-col items-center">
              <span className={`t-vertical shrink-0 text-[15px] ${style.text}`}>
                {product.name[locale]}
              </span>
              <span className={`mt-2 w-px flex-1 ${style.rule}`} aria-hidden="true" />
            </div>
            <ol>
              {groupRecipes.map((recipe, i) => (
                <RecipeRow
                  key={recipe.id}
                  recipe={recipe}
                  index={i}
                  locale={locale}
                  dict={dict}
                  barClass={style.bar}
                />
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

interface RecipeRowProps {
  recipe: Recipe;
  index: number;
  locale: Locale;
  dict: Dictionary;
  barClass?: string;
  showProductBadge?: boolean;
}

function RecipeRow({ recipe, index, locale, dict, barClass, showProductBadge }: RecipeRowProps) {
  const usedProduct = showProductBadge ? getProductById(recipe.productIds[0]) : undefined;

  return (
    <li>
      <Link
        href={`/${locale}/recipes/${recipe.slug}`}
        className="group relative grid min-h-[48px] grid-cols-[2.2em_1fr_auto] items-baseline border-b border-rule py-3.5 pl-3"
      >
        <span
          className={`absolute inset-y-0 left-0 w-0 transition-[width] duration-200 ${
            barClass ?? "bg-fukamidori"
          } group-hover:w-0.5 group-focus-visible:w-0.5`}
          aria-hidden="true"
        />
        <span className="t-label tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-heading text-[16.5px] text-sumi transition-colors group-hover:text-fukamidori-dark group-focus-visible:text-fukamidori-dark">
          {recipe.title[locale]}
        </span>
        <span className="flex flex-col items-end gap-0.5 text-right">
          <span className="t-meta">
            {recipe.timeMinutes}
            {dict.recipe.minutesUnit}
          </span>
          {showProductBadge && usedProduct && (
            <span className="text-[10px] text-sumi-faint">{usedProduct.name[locale]}</span>
          )}
        </span>
      </Link>
    </li>
  );
}
