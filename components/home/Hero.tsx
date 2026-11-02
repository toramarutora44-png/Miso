import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { BrushRule } from "@/components/ui/BrushRule";
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
 * 見出し・サブコピー・CTAは画像より先(スクロールなしで見える位置)に配置し、
 * 画像への重ね書きは行わない。完成料理の実写真8枚を3:2タイルの横マーキーで
 * 流し続け、「この味噌で何が作れるか」を手を止めずに見せる。
 * (以前の大タイル表示は元画像の正方形クロップ可能範囲を2倍以上に拡大しており
 * 粗さの原因になっていたため、3:2の控えめな表示サイズに変更した)
 */
const FEATURED_SLUGS = [
  "tori-negi-miso-yaki",
  "kabocha-kinoko-hoto",
  "sake-kinoko-miso-butter-foil",
  "kinoko-miso-cream-pasta",
  "yaki-nasu-miso-cheese",
  "ninniku-miso-yaki-onigiri",
  "shinjaga-misomayo-salad",
  "avocado-hiya-yakko-kinzanji",
];

export function Hero({ locale, dict, recipes }: HeroProps) {
  const h = dict.home.hero;
  const bySlug = new Map(recipes.map((r) => [r.slug, r] as const));
  const featured = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (r): r is Recipe => Boolean(r && r.image)
  );

  const renderTile = (recipe: Recipe, idx: number, hidden: boolean) => {
    const image = recipe.image!;
    const isFirst = idx === 0 && !hidden;
    return (
      <li
        key={`${recipe.id}-${hidden ? "dup" : "orig"}`}
        className="relative h-[168px] w-[252px] shrink-0 overflow-hidden rounded-card sm:h-[216px] sm:w-[324px]"
      >
        {isFirst ? (
          <Image
            src={image.src}
            alt={hidden ? "" : image.alt[locale]}
            fill
            priority
            sizes="(min-width: 640px) 324px, 252px"
            className="object-cover"
          />
        ) : (
          <Image
            src={image.src}
            alt={hidden ? "" : image.alt[locale]}
            fill
            loading="eager"
            fetchPriority="low"
            sizes="(min-width: 640px) 324px, 252px"
            className="object-cover"
          />
        )}
      </li>
    );
  };

  return (
    <section className="bg-washi">
      <div className="px-5 pb-6 pt-8 text-center sm:pb-8 sm:pt-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="t-display anim-rise d-1 text-sumi" style={{ textWrap: "balance" }}>
            {h.headline}
          </h1>
          <BrushRule className="mx-auto mt-2" width={168} animated />
          <p className="t-lead anim-rise d-2 mt-4 text-sumi-soft">{h.subcopy}</p>
          <div className="anim-rise d-3 mt-6 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href={`/${locale}/recipes`}>{h.cta}</LinkButton>
            <LinkButton href={`/${locale}/products`} variant="secondary">
              {h.ctaProducts}
            </LinkButton>
          </div>
        </div>
      </div>

      {featured.length > 0 && (
        <div className="marquee anim-rise d-4 pb-10 sm:pb-14">
          <div className="marquee-track">
            <ul className="marquee-group">
              {featured.map((recipe, idx) => renderTile(recipe, idx, false))}
            </ul>
            <ul className="marquee-group" aria-hidden="true">
              {featured.map((recipe, idx) => renderTile(recipe, idx, true))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
