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
 * 上部: 富士山麓の青大豆を仕込む実写真(process/aomame-soaking.jpg)を大きく表示する。
 * 下部: 生成りの帯に、見出し・サブコピー・認証バッジ・CTAを実HTMLとして表示する
 *       (画像の焼き込みに依存しない、アクセシブルな実要素)。
 */
export function Hero({ locale, dict }: HeroProps) {
  const h = dict.home.hero;

  return (
    <div>
      <div className="mx-auto w-full sm:max-w-md">
        <Image
          src="/images/process/aomame-soaking.jpg"
          alt={h.imageAlt}
          width={900}
          height={1125}
          priority
          sizes="(min-width: 640px) 448px, 100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="bg-kinari px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-[32px] leading-tight text-sumi sm:text-[40px]">
            {h.headline}
          </h1>
          <svg
            viewBox="0 0 200 24"
            className="mx-auto mt-2 h-5 w-40 text-fukamidori"
            aria-hidden="true"
          >
            <path
              d="M4 18 C 50 6, 120 22, 196 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-5 text-lg text-sumi-soft">{h.subcopy}</p>

          <CertBadges locale={locale} className="mt-6" />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
