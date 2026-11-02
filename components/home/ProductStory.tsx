import Image from "next/image";
import Link from "next/link";
import { Band } from "@/components/ui/Band";
import { Reveal } from "@/components/ui/Reveal";
import { BrushRule } from "@/components/ui/BrushRule";
import { LinkButton } from "@/components/ui/Button";
import { CertBadges } from "@/components/brand/CertBadges";
import type { Product } from "@/types/product";
import type { Recipe } from "@/types/recipe";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProductStoryProps {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  recipes: Recipe[];
  index: 1 | 2 | 3;
  tone: "washi" | "kinari" | "fukamidori-deep";
  invert?: boolean;
}

const ACCENT_BY_TONE: Record<ProductStoryProps["tone"], string> = {
  washi: "var(--c-koshu)",
  kinari: "var(--c-kome-ink)",
  "fukamidori-deep": "var(--c-miso-light)",
};

/**
 * トップページの商品3ブロック。3商品すべて同じ中央寄せ構造(丸窓画像)に統一し、
 * トーン・アクセント色のみで差別化する(以前は3つの異なるレイアウトに分岐していた)。
 */
export function ProductStory({
  product,
  locale,
  dict,
  recipes,
  index,
  tone,
  invert = false,
}: ProductStoryProps) {
  const d = dict.product;
  const relatedRecipes = recipes.slice(0, 2);
  const accentColor = ACCENT_BY_TONE[tone];

  const labelClass = invert ? "text-washi/60" : undefined;
  const leadClass = invert ? "text-washi/90" : "text-sumi";
  const bodyClass = invert ? "text-washi/75" : "text-sumi-soft";
  const titleClass = invert ? "text-washi" : "text-sumi";

  return (
    <Band tone={tone}>
      <div className="mx-auto max-w-[680px] px-5 py-20 text-center sm:py-24">
        <p className="t-num" style={{ color: accentColor }}>
          {String(index).padStart(2, "0")}
        </p>
        <h2 className={`t-title mt-2 ${titleClass}`}>{product.name[locale]}</h2>
        <BrushRule width={160} animated={false} className="mx-auto mt-3" color={accentColor} />
        <p className={`t-lead mt-4 ${leadClass}`}>{product.catchCopy[locale]}</p>

        {product.id === "koshu-miso" && (
          <div className="mt-5 inline-flex items-center gap-3">
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
            <span className={`t-meta ${invert ? "text-washi/60" : ""}`}>{d.aomameBadge}</span>
          </div>
        )}

        <Reveal className="mt-8">
          <div className="mx-auto flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-full bg-washi sm:h-[220px] sm:w-[220px]">
            <Image
              src={product.images.hero.src}
              alt={product.images.hero.alt[locale]}
              width={760}
              height={760}
              sizes="220px"
              className="h-[160%] w-[160%] max-w-none -ml-[70%] -mt-[35%] object-cover mix-blend-multiply"
            />
          </div>
        </Reveal>

        {product.agingMonths.value !== null && (
          <p className={`t-meta mt-6 ${invert ? "text-washi/60" : ""}`}>
            {d.agingMonths}: {product.agingMonths.value}
            {d.months}
          </p>
        )}

        <h3 className={`t-label mt-8 ${labelClass ?? ""}`}>{d.pairingsTitle}</h3>
        <p className={`t-body mt-2 ${bodyClass}`}>
          {product.pairings.map((p) => p[locale]).join("・")}
        </p>

        {recipes.length > 0 && (
          <ul className="mx-auto mt-8 max-w-[420px] border-t border-rule">
            {relatedRecipes.map((r, i) => (
              <li key={r.id}>
                <Link
                  href={`/${locale}/recipes/${r.slug}`}
                  className="flex items-baseline justify-between gap-3 border-b border-rule py-3 text-left"
                >
                  <span className={`t-body ${invert ? "text-washi/90" : "text-sumi"}`}>
                    <span className={`t-meta mr-2 ${invert ? "text-washi/60" : ""}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {r.title[locale]}
                  </span>
                  <span className={`t-meta shrink-0 ${invert ? "text-washi/60" : ""}`}>
                    {r.timeMinutes}
                    {dict.recipe.minutesUnit}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <CertBadges align="center" className="mt-8" productId={product.id} locale={locale} />

        <div className="mt-10">
          <LinkButton
            href={`/${locale}/products/${product.slug}`}
            variant={invert ? "inverse" : "primary"}
          >
            {dict.home.productDetailCta}
          </LinkButton>
        </div>
      </div>
    </Band>
  );
}
