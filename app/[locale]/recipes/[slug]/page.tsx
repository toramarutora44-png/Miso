import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Band } from "@/components/ui/Band";
import { Badge } from "@/components/ui/Badge";
import { RecipeCarousel } from "@/components/recipe/RecipeCarousel";
import { DishIllust } from "@/components/illust/DishIllust";
import { getRecipeIllust } from "@/lib/illust/mapping";
import { TILE_BG, TILE_INK, TILE_TEXT } from "@/lib/illust/tileTheme";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import {
  getAllRecipeSlugs,
  getRecipeBySlug,
  getRecipesForProduct,
} from "@/lib/repositories/recipeRepository";
import { getProductById } from "@/lib/repositories/productRepository";
import type { Locale } from "@/types/i18n";
import type { Recipe } from "@/types/recipe";

export async function generateStaticParams() {
  const slugs = await getAllRecipeSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

interface PageProps {
  params: { locale: string; slug: string };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const d = dict.recipe;

  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const isVegan = recipe.tags.includes("vegan");
  const products = recipe.productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<ReturnType<typeof getProductById>> => Boolean(p));
  const usedProduct = getProductById(recipe.productIds[0]);
  const tileBg = usedProduct ? TILE_BG[usedProduct.id] : "bg-sumi-soft";
  const tileInk = usedProduct ? TILE_INK[usedProduct.id] : "dark";
  const tileText = usedProduct ? TILE_TEXT[usedProduct.id] : "text-washi";

  const relatedLists = await Promise.all(
    recipe.productIds.map((id) => getRecipesForProduct(id))
  );
  const seen = new Set<string>([recipe.id]);
  const recommended: Recipe[] = relatedLists.flat().filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  return (
    <>
      <Band tone="kinari">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          {recipe.image ? (
            <>
              <Image
                src={recipe.image.src}
                alt={recipe.image.alt[locale]}
                width={recipe.image.width}
                height={recipe.image.height}
                priority
                sizes={`(min-width: ${recipe.image.width}px) ${recipe.image.width}px, 100vw`}
                style={{ maxWidth: recipe.image.width }}
                className="mx-auto h-56 w-full rounded-card border border-miso-light/30 object-cover sm:h-72"
              />
              <p className="mt-2 text-xs text-sumi-faint">{d.photoDisclaimer}</p>
            </>
          ) : (
            <div
              role="img"
              aria-label={d.illustHeroAlt}
              className={`flex h-56 w-full flex-col items-center justify-center gap-3 sm:h-64 ${tileBg}`}
            >
              <DishIllust name={getRecipeIllust(recipe)} size={104} tone={tileInk} />
              <span className={`font-heading text-2xl ${tileText}`}>{recipe.title[locale]}</span>
            </div>
          )}
          <p className="mt-4 rounded-card border border-miso-light/30 bg-kinari-deep px-4 py-3 text-sm text-sumi-soft">
            {d.disclaimer}
          </p>
          <h1 className="mt-5 text-[32px] sm:text-[36px]">{recipe.title[locale]}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} tone={tag === "vegan" ? "warning" : "neutral"}>
                {d.tags[tag]}
              </Badge>
            ))}
          </div>
          {isVegan && <p className="mt-2 text-base text-fukamidori-dark">{d.veganBadge}</p>}
          <dl className="mt-4 flex flex-wrap gap-6 text-base text-sumi-soft">
            <div>
              <dt className="text-sm">{d.timeLabel}</dt>
              <dd>
                {recipe.timeMinutes}
                {d.minutesUnit}
              </dd>
            </div>
            <div>
              <dt className="text-sm">{d.servingsLabel}</dt>
              <dd>
                {recipe.servings}
                {d.servingsUnit}
              </dd>
            </div>
            <div>
              <dt className="text-sm">{d.difficultyLabel}</dt>
              <dd>{recipe.difficulty} / 3</dd>
            </div>
            {products.length > 0 && (
              <div>
                <dt className="text-sm">{d.usesProductsTitle}</dt>
                <dd className="flex flex-col gap-1">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${locale}/products/${product.slug}`}
                      className="tap-target inline-flex items-center text-miso underline hover:text-akamiso"
                    >
                      {product.name[locale]}
                    </Link>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Band>

      <Band tone="kinari-deep">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:grid sm:grid-cols-12 sm:gap-10 sm:py-20">
          <div className="sm:col-span-5 sm:sticky sm:top-20">
            <h2 className="t-title text-sumi">{d.ingredientsTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-miso-light/20 pb-2 text-base"
                >
                  <span>{ing.name[locale]}</span>
                  <span className="text-sumi-soft">{ing.amount[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 sm:col-span-7 sm:mt-0">
            <h2 className="t-title text-sumi">{d.stepsTitle}</h2>
            <ol className="mt-4 flex flex-col gap-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-base">
                  <span className="shrink-0 font-medium text-miso">{i + 1}.</span>
                  <span>{step.text[locale]}</span>
                </li>
              ))}
            </ol>
            {recipe.tip && (
              <div className="mt-8 rounded-card border border-miso-light/40 border-l-4 border-l-miso bg-washi p-5 shadow-paper">
                <div className="flex items-center gap-2.5">
                  <DishIllust name="misoSpoon" size={44} tone="dark" className="shrink-0" />
                  <h3 className="font-heading text-[21px] font-bold text-fukamidori-dark sm:text-[23px]">
                    {d.tipHeadline}
                  </h3>
                </div>
                <p className="t-body mt-3 text-sumi">{recipe.tip[locale]}</p>
              </div>
            )}
          </div>
        </div>
      </Band>

      <Band tone="kinari">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:py-20">
          <h2 className="t-title text-sumi">{d.recommendedTitle}</h2>
          <RecipeCarousel recipes={recommended.slice(0, 4)} locale={locale} dict={dict} className="mt-6" />
          <p className="mt-8 text-base">
            <Link
              href={`/${locale}/recipes`}
              className="tap-target inline-flex items-center text-fukamidori-dark underline"
            >
              {d.backToList}
            </Link>
          </p>
        </div>
      </Band>
    </>
  );
}
