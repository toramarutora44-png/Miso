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
 * 上部: pop-rice-bowl-badges.jpg をそのまま(未加工)大きく表示する。
 *       この画像自体がロゴ・見出し・認証バッジ・QR込みの完成されたPOPクリエイティブ。
 *       実ピクセルサイズ(1024x1536, 縦横比1.5)をそのままコンテナの縦横比として使い、
 *       vh固定高さ+object-coverによるクロップ(実機でのQR・下部帯の見切れ)を避ける。
 * 下部: 生成りの帯に、見出し・サブコピー・認証バッジ・CTAを実HTMLとして再掲する
 *       (画像の焼き込みに依存しない、アクセシブルな実要素)。
 */
export function Hero({ locale, dict }: HeroProps) {
  const h = dict.home.hero;

  return (
    <div>
      <div className="mx-auto w-full sm:max-w-md">
        <Image
          src="/images/brand/pop/pop-rice-bowl-badges.jpg"
          alt={h.imageAlt}
          width={1024}
          height={1536}
          priority
          sizes="(min-width: 640px) 448px, 100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="bg-kinari px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-brush text-[40px] leading-tight text-sumi sm:text-[48px]">
            {h.headline}
          </h1>
          <svg
            viewBox="0 0 200 24"
            className="mx-auto mt-2 h-5 w-40 text-akamiso"
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
