import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { RecipeIndexList } from "@/components/recipe/RecipeIndexList";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getAllRecipes } from "@/lib/repositories/recipeRepository";
import { getAllProducts } from "@/lib/repositories/productRepository";
import type { Locale } from "@/types/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: { locale: string };
}

export default async function RecipesPage({ params }: PageProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const recipes = await getAllRecipes();
  const products = getAllProducts();

  return (
    <Section tone="kinari">
      <h1 className="text-[32px] sm:text-[36px]">{dict.recipe.listTitle}</h1>
      <p className="mt-2 text-base text-sumi-soft">{dict.recipe.listLead}</p>

      <p className="t-meta mt-6">
        {dict.recipe.indexJumpLabel}:{" "}
        {products.map((product, i) => (
          <span key={product.id}>
            {i > 0 && " / "}
            <Link href={`#recipe-group-${product.id}`} className="underline">
              {product.name[locale]}
            </Link>
          </span>
        ))}
      </p>

      <RecipeIndexList recipes={recipes} locale={locale} dict={dict} groupByProduct className="mt-8" />
    </Section>
  );
}
