import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Recipe } from "@/types/recipe";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
  recipes: Recipe[];
}

/**
 * ファーストビュー。
 * QRコードから来た人は既に目の前の商品を知っているため、商品そのものではなく
 * 「この味噌で何が作れるか」を先に見せる。完成料理の実写真(3商品から1〜2品ずつ、
 * 彩りよく厳選)を主役にした非対称グリッド+見出し+「15のレシピを見る」CTA。
 * 元画像は880px幅程度の中サイズのため、表示サイズを抑えて過度な拡大を避ける。
 */
const FEATURED_SLUGS = [
  "tori-negi-miso-yaki", // 甲州みそ
  "kabocha-kinoko-hoto", // 甲州みそ
  "sake-kinoko-miso-butter-foil", // 米みそ
  "kinoko-miso-cream-pasta", // 米みそ
  "yaki-nasu-miso-cheese", // 金山寺みそ
];

export function Hero({ locale, dict, recipes }: HeroProps) {
  const h = dict.home.hero;
  const bySlug = new Map(recipes.map((r) => [r.slug, r] as const));
  const featured = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (r): r is Recipe => Boolean(r && r.image)
  );
  const [main, ...rest] = featured;

  return (
    <div className="bg-washi">
      {featured.length > 0 && (
        <div className="mx-auto max-w-[1200px] px-3 pt-6 sm:px-6 sm:pt-10">
          <div className="hero-media grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {main?.image && (
              <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-card sm:row-span-2 sm:aspect-square">
                <Image
                  src={main.image.src}
                  alt={main.image.alt[locale]}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 640px) 580px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {rest.slice(0, 4).map((r) =>
              r.image ? (
                <div key={r.id} className="relative aspect-square overflow-hidden rounded-card">
                  <Image
                    src={r.image.src}
                    alt={r.image.alt[locale]}
                    fill
                    sizes="(min-width: 640px) 280px, 45vw"
                    className="object-cover"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      <div className="px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="t-display anim-rise d-1 text-sumi" style={{ textWrap: "balance" }}>
            {h.headline}
          </h1>
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

          <div className="anim-rise d-3 mt-8 flex justify-center">
            <LinkButton href={`/${locale}/recipes`}>{h.cta}</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
