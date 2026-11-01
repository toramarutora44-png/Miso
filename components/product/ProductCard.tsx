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

export function ProductCard({ product, locale, dict }: ProductCardProps) {
  const { hero } = product.images;

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="block">
      <div className="h-full overflow-hidden rounded-card bg-washi shadow-stack transition-transform hover:-translate-y-0.5">
        <div className="relative">
          <Image
            src={hero.src}
            alt={hero.alt[locale]}
            width={hero.width}
            height={hero.height}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className={`h-2 w-full ${bandClass[product.id]}`} aria-hidden="true" />
          <span className="absolute -bottom-3 left-4 inline-block rounded bg-washi px-3 py-1 font-heading text-lg text-sumi shadow-paper">
            {product.name[locale]}
          </span>
        </div>

        <div className="px-4 pb-5 pt-7">
          {product.id === "koshu-miso" && (
            <span className="mb-2 inline-block rounded-full border border-fukamidori/40 bg-fukamidori/10 px-2.5 py-0.5 text-xs font-medium text-fukamidori-dark">
              {dict.product.aomameBadge}
            </span>
          )}
          <p className="text-base text-sumi-soft">{product.catchCopy[locale]}</p>
        </div>
      </div>
    </Link>
  );
}
