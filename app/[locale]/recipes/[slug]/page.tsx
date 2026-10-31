import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { RecipeCarousel } from "@/components/recipe/RecipeCarousel";
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
      <Section tone="kinari">
        {recipe.image ? (
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt[locale]}
            width={recipe.image.width}
            height={recipe.image.height}
            className="h-56 w-full rounded-card border border-miso-light/30 object-cover sm:h-72"
          />
        ) : (
          <div
            role="img"
            aria-label={d.noImageAlt}
            className="flex h-56 w-full items-center justify-center rounded-card border border-miso-light/30 bg-miso-light/40 sm:h-72"
          >
            <span className="font-heading text-2xl text-koshu">{recipe.title[locale]}</span>
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
        </dl>
      </Section>

      <Section tone="kinari-deep">
        <h2 className="text-[28px]">{d.ingredientsTitle}</h2>
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
      </Section>

      <Section tone="kinari">
        <h2 className="text-[28px]">{d.stepsTitle}</h2>
        <ol className="mt-4 flex flex-col gap-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-base">
              <span className="shrink-0 font-medium text-miso">{i + 1}.</span>
              <span>{step.text[locale]}</span>
            </li>
          ))}
        </ol>
        {recipe.tip && (
          <div className="mt-6 rounded-card border border-miso-light/30 bg-kinari-deep p-4">
            <h3 className="text-[20px]">{d.tipTitle}</h3>
            <p className="mt-2 text-base text-sumi-soft">{recipe.tip[locale]}</p>
          </div>
        )}
      </Section>

      {products.length > 0 && (
        <Section tone="kinari-deep">
          <h2 className="text-[28px]">{d.usesProductsTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/${locale}/products/${product.slug}`}
                  className="tap-target inline-flex items-center text-base text-miso underline hover:text-akamiso"
                >
                  {product.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="kinari">
        <h2 className="text-[28px]">{d.recommendedTitle}</h2>
        <div className="mt-4">
          <RecipeCarousel recipes={recommended.slice(0, 4)} locale={locale} dict={dict} />
        </div>
        <p className="mt-8 text-base">
          <Link
            href={`/${locale}/recipes`}
            className="tap-target inline-flex items-center text-fukamidori-dark underline"
          >
            {d.backToList}
          </Link>
        </p>
      </Section>
    </>
  );
}
