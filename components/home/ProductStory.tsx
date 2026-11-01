import Image from "next/image";
import Link from "next/link";
import { Band } from "@/components/ui/Band";
import { Reveal } from "@/components/ui/Reveal";
import { CertBadges } from "@/components/brand/CertBadges";
import type { Product } from "@/types/product";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProductStoryProps {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  variant: "bleed-right" | "center-round" | "inverse-panel";
  recipes: Recipe[];
}

/**
 * トップページの商品3ブロック。3つの異なるエディトリアルレイアウトを1コンポーネントで出し分ける。
 * - bleed-right: 甲州みそ。左テキスト・右写真ブリード。
 * - center-round: 米みそ。完全中央寄せ、丸窓写真。
 * - inverse-panel: 金山寺みそ。深緑地に和紙パネル写真。
 */
export function ProductStory({ product, locale, dict, variant, recipes }: ProductStoryProps) {
  if (variant === "bleed-right") {
    return <BleedRight product={product} locale={locale} dict={dict} recipes={recipes} />;
  }
  if (variant === "center-round") {
    return <CenterRound product={product} locale={locale} dict={dict} recipes={recipes} />;
  }
  return <InversePanel product={product} locale={locale} dict={dict} />;
}

function BleedRight({
  product,
  locale,
  dict,
  recipes,
}: Omit<ProductStoryProps, "variant">) {
  const d = dict.product;
  const relatedRecipes = recipes.slice(0, 2);

  return (
    <Band tone="washi">
      <div className="grid grid-cols-1 sm:grid-cols-12 sm:items-center">
        <div className="order-2 px-4 py-10 sm:order-1 sm:col-span-5 sm:px-6 sm:py-20 lg:pl-10">
          <p className="t-label">01</p>
          <h2 className="t-vertical mt-2 font-heading text-[32px] text-sumi">
            {product.name[locale]}
          </h2>
          <p className="t-lead mt-4 text-sumi">{product.catchCopy[locale]}</p>

          {product.id === "koshu-miso" && (
            <div className="mt-5 flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/farm/aomame-bowl.jpg"
                  alt=""
                  width={112}
                  height={112}
                  sizes="56px"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="t-meta">{d.aomameBadge}</span>
            </div>
          )}

          {product.agingMonths.value !== null && (
            <p className="t-meta mt-4">
              {d.agingMonths}: {product.agingMonths.value}
              {d.months}
            </p>
          )}

          <h3 className="t-label mt-8">{d.pairingsTitle}</h3>
          <p className="t-body mt-2 text-sumi-soft">
            {product.pairings.map((p) => p[locale]).join("・")}
          </p>

          {relatedRecipes.length > 0 && (
            <ul className="mt-6 border-t border-rule">
              {relatedRecipes.map((recipe, i) => (
                <li key={recipe.id}>
                  <Link
                    href={`/${locale}/recipes/${recipe.slug}`}
                    className="flex items-baseline justify-between gap-3 border-b border-rule py-3"
                  >
                    <span className="t-body text-sumi">
                      <span className="t-meta mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {recipe.title[locale]}
                    </span>
                    <span className="t-meta shrink-0">
                      {recipe.timeMinutes}
                      {dict.recipe.minutesUnit}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/${locale}/products/${product.slug}`}
            className="t-meta mt-6 inline-block underline"
          >
            {dict.home.viewAllLabel}
          </Link>
        </div>

        <div className="order-1 sm:order-2 sm:col-span-7">
          <Reveal>
            <div className="aspect-[16/10] w-full overflow-hidden sm:ml-auto sm:aspect-square sm:max-w-[560px]">
              <Image
                src={product.images.hero.src}
                alt={product.images.hero.alt[locale]}
                width={product.images.hero.width}
                height={product.images.hero.height}
                sizes="(min-width: 640px) 560px, 100vw"
                className="h-full w-[180%] max-w-none -ml-[80%] object-cover object-[100%_40%] mix-blend-multiply sm:ml-0 sm:w-full sm:max-w-full sm:object-center"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Band>
  );
}

function CenterRound({
  product,
  locale,
  dict,
  recipes,
}: Omit<ProductStoryProps, "variant">) {
  const d = dict.product;
  const relatedRecipes = recipes.slice(0, 2);
  const pairings = product.pairings;

  return (
    <Band tone="kinari">
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="t-title text-sumi">{product.name[locale]}</h2>
        <p className="t-lead mt-4 text-sumi">{product.catchCopy[locale]}</p>

        <Reveal className="mt-8">
          <div className="mx-auto h-[220px] w-[220px] overflow-hidden rounded-full sm:h-[260px] sm:w-[260px]">
            <Image
              src={product.images.hero.src}
              alt={product.images.hero.alt[locale]}
              width={product.images.hero.width}
              height={product.images.hero.height}
              sizes="260px"
              className="h-[160%] w-[160%] max-w-none -ml-[70%] -mt-[35%] object-cover mix-blend-multiply"
            />
          </div>
        </Reveal>

        {product.agingMonths.value !== null && (
          <p className="t-meta mt-6">
            {d.agingMonths}: {product.agingMonths.value}
            {d.months}
          </p>
        )}

        {pairings.length === 1 ? (
          <p className="t-quote mt-8 text-sumi">{pairings[0][locale]}</p>
        ) : (
          <p className="t-body mt-8 text-sumi-soft">
            {pairings.map((p) => p[locale]).join("・")}
          </p>
        )}

        {relatedRecipes.length > 0 && (
          <div className="mt-8 flex items-center justify-center divide-x divide-rule text-sm">
            {relatedRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/${locale}/recipes/${recipe.slug}`}
                className="t-meta px-4 first:pl-0 last:pr-0"
              >
                {recipe.title[locale]}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Band>
  );
}

function InversePanel({ product, locale, dict }: Omit<ProductStoryProps, "variant" | "recipes">) {
  const d = dict.product;

  return (
    <Band tone="fukamidori-deep" className="text-washi">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-16 sm:grid-cols-12 sm:items-center sm:gap-10 sm:px-6 sm:py-24">
        <div className="sm:col-span-5">
          <Reveal>
            <div className="mx-auto w-full max-w-[300px] rotate-[-1.5deg] bg-washi p-5 shadow-stack sm:mx-0">
              <div className="aspect-square w-full overflow-hidden">
                <Image
                  src={product.images.hero.src}
                  alt={product.images.hero.alt[locale]}
                  width={product.images.hero.width}
                  height={product.images.hero.height}
                  sizes="300px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="sm:col-span-7">
          <h2 className="t-title text-washi">{product.name[locale]}</h2>
          <p className="t-lead mt-4 text-washi/90">{product.catchCopy[locale]}</p>

          <h3 className="t-label mt-8 text-washi/60">{d.pairingsTitle}</h3>
          <ol className="mt-3 space-y-2">
            {product.pairings.map((p, i) => (
              <li key={p.ja} className="t-body text-washi/70">
                <span className="t-meta mr-2 text-washi/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p[locale]}
              </li>
            ))}
          </ol>

          <CertBadges
            locale={locale}
            productId={product.id}
            align="left"
            className="mt-8"
          />
        </div>
      </div>
    </Band>
  );
}
