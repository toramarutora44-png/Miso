import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getProductById } from "@/lib/repositories/productRepository";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface RecipeCardProps {
  recipe: Recipe;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  /** グリッド内の小さめ表示(タイトル・バッジを控えめにする)。 */
  compact?: boolean;
}

export function RecipeCard({ recipe, locale, dict, className = "", compact = false }: RecipeCardProps) {
  const d = dict.recipe;
  const isVegan = recipe.tags.includes("vegan");
  const usedProduct = getProductById(recipe.productIds[0]);

  return (
    <Link href={`/${locale}/recipes/${recipe.slug}`} className={`block ${className}`}>
      <Card className="h-full hover:border-miso transition-colors">
        {recipe.image ? (
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt[locale]}
            width={recipe.image.width}
            height={recipe.image.height}
            className="aspect-[4/3] h-auto w-full rounded border border-miso-light/30 object-cover sm:aspect-[16/10]"
          />
        ) : usedProduct ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-miso-light/30 sm:aspect-[16/10]">
            {/* 商品パッケージ写真(左側に大きな文字あり)の右側=味噌本体に寄せて表示し、レシピ名との文字の重なりを避ける */}
            <Image
              src={usedProduct.images.thumb.src}
              alt={usedProduct.images.thumb.alt[locale]}
              fill
              className="object-cover object-right"
            />
          </div>
        ) : (
          <div
            role="img"
            aria-label={d.noImageAlt}
            className="flex aspect-[4/3] w-full items-center justify-center rounded border border-miso-light/30 bg-miso-light/40 p-3 text-center sm:aspect-[16/10]"
          >
            <span className="font-heading text-lg text-koshu">{recipe.title[locale]}</span>
          </div>
        )}
        <h3 className={compact ? "mt-2 text-base leading-snug" : "mt-3 text-[20px]"}>
          {recipe.title[locale]}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {usedProduct && (
            <Badge tone="neutral">{usedProduct.name[locale]}</Badge>
          )}
          {!compact && (
            <Badge tone="neutral">
              {recipe.timeMinutes}
              {d.minutesUnit}
            </Badge>
          )}
          {!compact &&
            recipe.tags.map((tag) => (
              <Badge key={tag} tone={tag === "vegan" ? "warning" : "neutral"}>
                {d.tags[tag]}
              </Badge>
            ))}
        </div>
        {!compact && isVegan && (
          <p className="mt-2 text-sm text-fukamidori-dark">{d.veganBadge}</p>
        )}
      </Card>
    </Link>
  );
}
