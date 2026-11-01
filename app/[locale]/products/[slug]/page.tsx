import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Band } from "@/components/ui/Band";
import { ProductHero } from "@/components/product/ProductHero";
import { SpecTable } from "@/components/product/SpecTable";
import { PairingGrid } from "@/components/product/PairingGrid";
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
      <ProductHero product={product} locale={locale} dict={dict} />

      <Band tone="kinari">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:grid sm:grid-cols-12 sm:gap-10 sm:py-20">
          <div className="sm:col-span-7">
            <h2 className="t-title text-sumi">{dict.product.descriptionTitle}</h2>
            <div className="mt-4 flex flex-col gap-4">
              {product.id === "koshu-miso" && (
                <Image
                  src="/images/farm/aomame-bowl.jpg"
                  alt={dict.product.aomameCaption}
                  width={400}
                  height={400}
                  className="h-auto w-32 rounded-card border border-miso-light/30 object-cover shadow-paper sm:float-right sm:ml-5 sm:mb-3 sm:w-36"
                />
              )}
              {product.images.craftFigure && (
                <Image
                  src={product.images.craftFigure.src}
                  alt={product.images.craftFigure.alt[locale]}
                  width={400}
                  height={400}
                  className="h-auto w-32 rounded-card border border-miso-light/30 object-cover shadow-paper sm:float-right sm:ml-5 sm:mb-3 sm:w-36"
                />
              )}
              {product.body[locale].map((paragraph, i) => (
                <p key={i} className="t-body text-sumi-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 sm:col-span-5 sm:mt-0">
            <div className="bg-washi p-5 shadow-paper sm:sticky sm:top-20">
              <h2 className="t-title text-sumi">{dict.product.specTitle}</h2>
              <div className="mt-4">
                <SpecTable product={product} locale={locale} dict={dict} />
              </div>
              <p className="t-body mt-4 text-sumi-soft">
                <span>{dict.product.shippingLabel}: </span>
                {producer.shipping[locale]}
              </p>
            </div>
          </div>
        </div>
      </Band>

      <Band tone="kinari-deep">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:py-20">
          <h2 className="t-title text-sumi">{dict.product.pairingsTitle}</h2>
          <PairingGrid product={product} locale={locale} />

          <hr className="my-12 border-t border-rule" />

          <h2 className="t-title text-sumi">{dict.product.recipeLinkTitle}</h2>
          <RecipeCarousel recipes={recipes} locale={locale} dict={dict} className="mt-6" />

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6">
            <Link
              href={`/${locale}/producer`}
              className="tap-target inline-flex items-center text-fukamidori-dark underline"
            >
              {dict.common.viewProducer}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="tap-target inline-flex items-center text-fukamidori-dark underline"
            >
              {dict.common.backToProducts}
            </Link>
          </div>
        </div>
      </Band>
    </>
  );
}
