import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getAllRecipes } from "@/lib/repositories/recipeRepository";
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

  return (
    <Section tone="kinari">
      <h1 className="text-[32px] sm:text-[36px]">{dict.recipe.listTitle}</h1>
      <p className="mt-2 text-base text-sumi-soft">{dict.recipe.listLead}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} locale={locale} dict={dict} />
        ))}
      </div>
    </Section>
  );
}
