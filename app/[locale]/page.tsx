import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getAllProducts, getProducer } from "@/lib/repositories/productRepository";
import { getAllRecipes } from "@/lib/repositories/recipeRepository";
import type { Locale } from "@/types/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: { locale: string };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const h = dict.home;

  const products = getAllProducts();
  const producer = getProducer();
  const recipes = await getAllRecipes();

  return (
    <>
      <Hero locale={locale} dict={dict} />

      <Section tone="kinari" id="products" as="section">
        <h2 className="text-center text-[28px] text-sumi sm:text-[32px]">
          {h.productsTitle}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <LinkButton href={`/${locale}/compare`} variant="secondary">
            {dict.common.viewCompare}
          </LinkButton>
        </div>
      </Section>

      <Section tone="kinari-deep">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Image
            src={producer.image.src}
            alt={producer.image.alt[locale]}
            width={producer.image.width}
            height={producer.image.height}
            className="h-auto w-40 shrink-0 rounded-card border border-miso-light/30 object-cover shadow-paper"
          />
          <div className="text-center sm:text-left">
            <span className="inline-block rounded-full border border-fukamidori/40 bg-fukamidori/10 px-3 py-1 text-sm font-medium text-fukamidori-dark">
              {h.producerBadge}
            </span>
            <h2 className="mt-3 text-[28px]">{h.producerTitle}</h2>
            <p className="mt-3 text-lg">「{h.producerQuote}」</p>
            <LinkButton href={`/${locale}/producer`} variant="secondary" className="mt-5">
              {h.producerCta}
            </LinkButton>
          </div>
        </div>
      </Section>

      <Section tone="kinari">
        <h2 className="text-[28px]">{h.recipesTitle}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recipes.slice(0, 4).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} locale={locale} dict={dict} />
          ))}
        </div>
        <LinkButton href={`/${locale}/recipes`} className="mt-6">
          {dict.common.viewRecipes}
        </LinkButton>
      </Section>

      <Section tone="kinari" className="text-center">
        <p className="text-lg text-sumi">{h.recommendText}</p>
      </Section>

      <Section tone="kinari-deep">
        <h2 className="text-[28px]">{h.purchaseTitle}</h2>
        <p className="mt-3 text-base text-sumi-soft">{h.purchaseText}</p>
        <p className="mt-4 text-base">
          <Link
            href={`tel:${producer.phone.replace(/-/g, "")}`}
            className="tap-target inline-flex items-center text-akamiso underline"
          >
            {h.phoneCta}: {producer.phone}
          </Link>
        </p>
      </Section>
    </>
  );
}
