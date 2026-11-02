import Link from "next/link";
import { RecipeCarousel } from "@/components/recipe/RecipeCarousel";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Product, ProductId } from "@/types/product";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface RecipeShowcaseProps {
  products: Product[];
  recipesByProduct: Record<ProductId, Recipe[]>;
  locale: Locale;
  dict: Dictionary;
}

const CATEGORY_ACCENT: Record<ProductId, string> = {
  "koshu-miso": "text-koshu",
  "rice-miso": "text-kome",
  "kinzanji-miso": "text-kinzanji",
};

/**
 * トップページ②レシピ紹介。甲州みそ・米みそ・金山寺みその3カテゴリーで、
 * それぞれ代表的な料理写真(RecipeCard)を見せる。実写真を主役にする。
 */
export function RecipeShowcase({ products, recipesByProduct, locale, dict }: RecipeShowcaseProps) {
  const h = dict.home;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="t-title text-sumi" style={{ textWrap: "balance" }}>
        {h.recipesTitle}
      </h2>
      <p className="t-body mt-2 text-sumi-soft">{h.recipesLead}</p>

      <div className="mt-10 flex flex-col gap-12">
        {products.map((product) => {
          const list = recipesByProduct[product.id] ?? [];
          if (list.length === 0) return null;
          return (
            <Reveal key={product.id}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`font-heading text-xl ${CATEGORY_ACCENT[product.id]}`}>
                  {product.name[locale]}
                </h3>
                <Link
                  href={`/${locale}/recipes#recipe-group-${product.id}`}
                  className="t-meta shrink-0 underline"
                >
                  {h.recipesCta}
                </Link>
              </div>
              <RecipeCarousel recipes={list.slice(0, 3)} locale={locale} dict={dict} className="mt-4" />
            </Reveal>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-sumi-faint">{dict.recipe.photoDisclaimer}</p>

      <div className="mt-8 text-center">
        <LinkButton href={`/${locale}/recipes`}>{h.recipesCta}</LinkButton>
      </div>
    </div>
  );
}
