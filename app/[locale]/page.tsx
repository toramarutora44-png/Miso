import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Hero } from "@/components/home/Hero";
import { RecipeShowcase } from "@/components/home/RecipeShowcase";
import { ProductStory } from "@/components/home/ProductStory";
import { ProducerStory } from "@/components/home/ProducerStory";
import { ProductFocus } from "@/components/home/ProductFocus";
import { Section } from "@/components/ui/Section";
import { Band } from "@/components/ui/Band";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { getAllProducts, getProductById, getProducer } from "@/lib/repositories/productRepository";
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

/**
 * トップページ。
 * QRコードから来た人は既に目の前の商品が何の味噌か知っているため、
 * 「この味噌で何が作れるか」(料理・レシピ)を先に見せる構成に再編している。
 * 構成: ①料理写真ファーストビュー → ②レシピ紹介(商品別) → ③3種の味噌 → ④生産者紹介 → ⑤購入案内。
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const h = dict.home;

  const producer = getProducer();
  const recipes = await getAllRecipes();
  const products = getAllProducts();

  const koshuMiso = getProductById("koshu-miso");
  const riceMiso = getProductById("rice-miso");
  const kinzanjiMiso = getProductById("kinzanji-miso");
  if (!koshuMiso || !riceMiso || !kinzanjiMiso) notFound();

  const [koshuRecipes, riceRecipes, kinzanjiRecipes] = await Promise.all([
    getRecipesForProduct("koshu-miso"),
    getRecipesForProduct("rice-miso"),
    getRecipesForProduct("kinzanji-miso"),
  ]);
  const recipesByProduct: Record<ProductId, typeof recipes> = {
    "koshu-miso": koshuRecipes,
    "rice-miso": riceRecipes,
    "kinzanji-miso": kinzanjiRecipes,
  };

  return (
    <>
      <ProductFocus />

      {/* ① ファーストビュー: 完成料理の実写真を主役にする */}
      <Hero locale={locale} dict={dict} recipes={recipes} />

      {/* ② レシピ紹介: 商品カテゴリーごとに代表的な料理写真を見せる */}
      <RecipeShowcase
        products={products}
        recipesByProduct={recipesByProduct}
        locale={locale}
        dict={dict}
      />

      <Band tone="fukamidori-deep" className="bg-fukamidori-dark py-3.5 text-washi">
        <p className="px-4 text-center text-sm sm:text-base">
          {h.recommendText}{" "}
          <Link href={`/${locale}/compare`} className="underline">
            {dict.common.viewCompare}
          </Link>
        </p>
      </Band>

      {/* ③ 3種の味噌 */}
      <div
        id="product-koshu-miso"
        className="scroll-mt-16"
        style={{ "--focus-c": FOCUS_COLOR["koshu-miso"] } as CSSProperties}
      >
        <ProductStory
          product={koshuMiso}
          index={1}
          tone="washi"
          recipes={koshuRecipes}
          locale={locale}
          dict={dict}
        />
      </div>

      <div
        id="product-rice-miso"
        className="scroll-mt-16"
        style={{ "--focus-c": FOCUS_COLOR["rice-miso"] } as CSSProperties}
      >
        <ProductStory
          product={riceMiso}
          index={2}
          tone="kinari"
          recipes={riceRecipes}
          locale={locale}
          dict={dict}
        />
      </div>

      <div
        id="product-kinzanji-miso"
        className="scroll-mt-16"
        style={{ "--focus-c": FOCUS_COLOR["kinzanji-miso"] } as CSSProperties}
      >
        <ProductStory
          product={kinzanjiMiso}
          index={3}
          tone="fukamidori-deep"
          invert
          recipes={kinzanjiRecipes}
          locale={locale}
          dict={dict}
        />
      </div>

      {/* ④ 生産者紹介 */}
      <ProducerStory locale={locale} dict={dict} />

      {/* ⑤ 購入案内: 配送・EC関連は一切含めない */}
      <Section tone="kinari-deep">
        <h2 className="text-[28px]">{h.purchaseTitle}</h2>
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
