import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ProductHero } from "@/components/product/ProductHero";
import { TasteBar } from "@/components/product/TasteBar";
import { SpecTable } from "@/components/product/SpecTable";
import { RecipeCarousel } from "@/components/recipe/RecipeCarousel";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import {
  getAllProductSlugs,
  getProductBySlug,
  getProducer,
} from "@/lib/repositories/productRepository";
import { getRecipesForProduct } from "@/lib/repositories/recipeRepository";
import type { Locale } from "@/types/i18n";
import type { TasteAxis } from "@/types/product";

const tasteAxisOrder: TasteAxis[] = ["sweetness", "saltiness", "richness", "aroma"];

export function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

interface PageProps {
  params: { locale: string; slug: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const producer = getProducer();
  const recipes = await getRecipesForProduct(product.id);

  return (
    <>
      <Section tone="kinari">
        <ProductHero product={product} locale={locale} />
      </Section>

      <Section tone="kinari-deep">
        <h2 className="text-[28px]">{dict.product.descriptionTitle}</h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex flex-col gap-3">
            {product.body[locale].map((paragraph, i) => (
              <p key={i} className="text-base text-sumi-soft">
                {paragraph}
              </p>
            ))}
          </div>
          {product.id === "koshu-miso" && (
            <figure className="mx-auto w-32 shrink-0 sm:mx-0 sm:w-40">
              <Image
                src="/images/brand/cropped/koshu-aomame.jpg"
                alt={dict.product.aomameCaption}
                width={185}
                height={140}
                className="h-auto w-full rounded-card border border-miso-light/30 object-cover shadow-paper"
              />
              <figcaption className="mt-2 text-center text-sm text-sumi-soft">
                {dict.product.aomameCaption}
              </figcaption>
            </figure>
          )}
        </div>
      </Section>

      <Section tone="kinari">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-[28px]">{dict.product.tasteTitle}</h2>
        </div>
        <div className="flex flex-col gap-3">
          {tasteAxisOrder.map((axis) => (
            <TasteBar
              key={axis}
              label={dict.taste[axis]}
              value={product.taste.value[axis]}
            />
          ))}
        </div>
        {product.tasteNotes.value && (
          <p className="mt-4 text-base text-sumi-soft">
            {product.tasteNotes.value[locale]}
          </p>
        )}
      </Section>

      <Section tone="kinari-deep">
        <h2 className="text-[28px]">{dict.product.specTitle}</h2>
        <div className="mt-4">
          <SpecTable product={product} locale={locale} dict={dict} />
        </div>
        <p className="mt-4 text-sm text-sumi-soft">
          <span>{dict.product.shippingLabel}: </span>
          {producer.shipping[locale]}
        </p>
      </Section>

      <Section tone="kinari">
        <h2 className="text-[28px]">{dict.product.pairingsTitle}</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {product.pairings.map((pairing, i) => (
            <li key={i} className="text-base">
              {pairing[locale]}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="kinari-deep">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Card className="flex-1">
            <h3 className="text-[22px]">{dict.product.recipeLinkTitle}</h3>
            <div className="mt-3">
              <RecipeCarousel recipes={recipes} locale={locale} dict={dict} />
            </div>
          </Card>
          <Card className="flex-1">
            <h3 className="text-[22px]">{dict.product.producerLinkTitle}</h3>
            <p className="mt-2 text-base">
              <Link
                href={`/${locale}/producer`}
                className="tap-target inline-flex items-center text-miso underline hover:text-akamiso"
              >
                {dict.common.viewProducer}
              </Link>
            </p>
          </Card>
        </div>
        <p className="mt-6 text-base">
          <Link
            href={`/${locale}/products`}
            className="tap-target inline-flex items-center text-fukamidori-dark underline"
          >
            {dict.common.backToProducts}
          </Link>
        </p>
      </Section>
    </>
  );
}
