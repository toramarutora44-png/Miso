import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Hero } from "@/components/home/Hero";
import { ProductStory } from "@/components/home/ProductStory";
import { ProducerStory } from "@/components/home/ProducerStory";
import { ProductFocus } from "@/components/home/ProductFocus";
import { RecipeIndexList } from "@/components/recipe/RecipeIndexList";
import { Section } from "@/components/ui/Section";
import { Band } from "@/components/ui/Band";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getProductById, getProducer } from "@/lib/repositories/productRepository";
import { getAllRecipes, getRecipesForProduct } from "@/lib/repositories/recipeRepository";
import type { Locale } from "@/types/i18n";
import type { ProductId } from "@/types/product";

const FOCUS_COLOR: Record<ProductId, string> = {
  "koshu-miso": "var(--c-koshu)",
  "rice-miso": "var(--c-kome)",
  "kinzanji-miso": "var(--c-kinzanji)",
};

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

  const producer = getProducer();
  const recipes = await getAllRecipes();

  const koshuMiso = getProductById("koshu-miso");
  const riceMiso = getProductById("rice-miso");
  const kinzanjiMiso = getProductById("kinzanji-miso");
  if (!koshuMiso || !riceMiso || !kinzanjiMiso) notFound();

  const [koshuRecipes, riceRecipes] = await Promise.all([
    getRecipesForProduct("koshu-miso"),
    getRecipesForProduct("rice-miso"),
  ]);

  return (
    <>
      <ProductFocus />
      <Hero locale={locale} dict={dict} />

      <Band tone="fukamidori-deep" className="bg-fukamidori-dark py-3.5 text-washi">
        <p className="px-4 text-center text-sm sm:text-base">
          {h.recommendText}{" "}
          <Link href={`/${locale}/compare`} className="underline">
            {dict.common.viewCompare}
          </Link>
        </p>
      </Band>

      <div
        id="product-koshu-miso"
        className="scroll-mt-16"
        style={{ "--focus-c": FOCUS_COLOR["koshu-miso"] } as CSSProperties}
      >
        <ProductStory
          product={koshuMiso}
          locale={locale}
          dict={dict}
          variant="bleed-right"
          recipes={koshuRecipes}
        />
      </div>

      <div
        id="product-rice-miso"
        className="scroll-mt-16"
        style={{ "--focus-c": FOCUS_COLOR["rice-miso"] } as CSSProperties}
      >
        <ProductStory
          product={riceMiso}
          locale={locale}
          dict={dict}
          variant="center-round"
          recipes={riceRecipes}
        />
      </div>

      <div
        id="product-kinzanji-miso"
        className="scroll-mt-16"
        style={{ "--focus-c": FOCUS_COLOR["kinzanji-miso"] } as CSSProperties}
      >
        <ProductStory
          product={kinzanjiMiso}
          locale={locale}
          dict={dict}
          variant="inverse-panel"
          recipes={[]}
        />
      </div>

      <ProducerStory locale={locale} dict={dict} />

      <Band tone="kinari-deep">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:py-20">
          <h2 className="t-title text-sumi">{h.recipesTitle}</h2>
          <p className="t-body mt-2 text-sumi-soft">{h.recipesLead}</p>
          <RecipeIndexList
            recipes={recipes}
            locale={locale}
            dict={dict}
            groupByProduct
            className="mt-8"
          />
        </div>
      </Band>

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
