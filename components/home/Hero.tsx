import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { CertBadges } from "@/components/brand/CertBadges";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * ヒーロー。
 * 上部: 甲州みその商品写真(products/koshu-miso.jpg)を大きく表示する
 *       (「商品が印象的に登場する」演出のため、工程写真ではなく商品本体を主役にする)。
 *       写真は760x760の正方形で、左に焼き込み文字「天然醸造/甲州みそ/1Kg」、右に味噌本体。
 *       4:5等の縦長比率でcoverすると文字が中途半端に欠けるため、コンテナを正方形に保ち
 *       写真全体(文字ごと)を見せる方針にしている(焼き込み文字もブランドの一部として扱う)。
 * 下部: 生成りの帯に、見出し・サブコピー・認証バッジ・CTAを実HTMLとして表示する
 *       (画像の焼き込みに依存しない、アクセシブルな実要素)。
 */
export function Hero({ locale, dict }: HeroProps) {
  const h = dict.home.hero;

  return (
    <div>
      <div className="hero-media aspect-square w-full overflow-hidden sm:ml-auto sm:max-w-[560px]">
        <Image
          src="/images/products/koshu-miso.jpg"
          alt={h.imageAlt}
          width={760}
          height={760}
          priority
          fetchPriority="high"
          sizes="(min-width: 640px) 560px, 100vw"
          className="h-full w-full object-cover object-center mix-blend-multiply"
        />
      </div>

      <div className="bg-washi px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="t-display anim-rise d-1 text-sumi">{h.headline}</h1>
          <svg
            viewBox="0 0 200 24"
            className="brush-path mx-auto mt-2 h-5 w-40 text-fukamidori"
            aria-hidden="true"
          >
            <path
              d="M4 18 C 50 6, 120 22, 196 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              pathLength="1"
            />
          </svg>
          <p className="t-body anim-rise d-2 mt-5 text-sumi-soft">{h.subcopy}</p>

          <CertBadges locale={locale} className="anim-rise d-3 mt-6" />

          <div className="anim-rise d-4 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href={`/${locale}/products`}>{h.ctaProducts}</LinkButton>
            <LinkButton href={`/${locale}/producer`} variant="secondary">
              {h.ctaProducer}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
