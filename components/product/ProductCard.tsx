import Image from "next/image";
import Link from "next/link";
import type { Product, ProductId } from "@/types/product";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProductCardProps {
  product: Product;
  locale: Locale;
  dict: Dictionary;
}

const bandClass: Record<ProductId, string> = {
  "koshu-miso": "bg-koshu",
  "rice-miso": "bg-kome",
  "kinzanji-miso": "bg-kinzanji",
};

/** 商品ごとの「選ぶ理由」バッジ。すべて確認済みの一次情報(POP・公式サイト)に基づく。 */
const sellPointKey: Record<ProductId, keyof Dictionary["product"]> = {
  "koshu-miso": "aomameBadge",
  "rice-miso": "naturalBadge",
  "kinzanji-miso": "popularBadge",
};

export function ProductCard({ product, locale, dict }: ProductCardProps) {
  const { hero } = product.images;
  const d = dict.product;
  const pairingsPreview = product.pairings
    .slice(0, 2)
    .map((p) => p[locale])
    .join("・");

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="block">
      <div className="h-full overflow-hidden rounded-card bg-washi shadow-stack transition-transform hover:-translate-y-0.5">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt[locale]}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sumi/65 via-sumi/5 to-transparent"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-3 left-4 font-heading text-[26px] font-bold leading-none text-washi"
            style={{ transform: "rotate(-1.5deg)", textShadow: "0 2px 6px rgba(0,0,0,.5)" }}
          >
            {product.name[locale]}
          </span>
        </div>
        <div className={`h-2 w-full ${bandClass[product.id]}`} aria-hidden="true" />

        <div className="px-4 pb-5 pt-7">
          <span className="mb-2 inline-block rounded-full border border-fukamidori/40 bg-fukamidori/10 px-2.5 py-0.5 text-xs font-medium text-fukamidori-dark">
            {d[sellPointKey[product.id]]}
          </span>
          <p className="mt-1 text-base text-sumi-soft">{product.catchCopy[locale]}</p>
          {pairingsPreview && (
            <p className="mt-2 text-xs text-sumi-faint">
              {d.pairingsTitle}: {pairingsPreview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
