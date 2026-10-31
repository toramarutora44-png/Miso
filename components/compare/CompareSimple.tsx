import Image from "next/image";
import type { Product, ProductId } from "@/types/product";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface CompareSimpleProps {
  products: Product[];
  locale: Locale;
  dict: Dictionary;
}

const bandClass: Record<ProductId, string> = {
  "koshu-miso": "bg-koshu",
  "rice-miso": "bg-kome",
  "kinzanji-miso": "bg-kinzanji",
};

/**
 * 商品比較の簡易版。数値バーは使わず、catchCopy と pairings を並べて表示する。
 */
export function CompareSimple({ products, locale, dict }: CompareSimpleProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-card bg-washi shadow-paper"
        >
          <div className="relative">
            <Image
              src={product.images.thumb.src}
              alt={product.images.thumb.alt[locale]}
              width={product.images.thumb.width}
              height={product.images.thumb.height}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className={`h-2 w-full ${bandClass[product.id]}`} aria-hidden="true" />
          </div>
          <div className="p-4">
            <h3 className="text-[20px]">{product.name[locale]}</h3>
            <p className="mt-2 text-base font-medium text-sumi">
              {product.catchCopy[locale]}
            </p>
            <h4 className="mt-4 text-sm font-medium text-sumi-soft">
              {dict.compare.pairingsRow}
            </h4>
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              {product.pairings.map((pairing, i) => (
                <li key={i}>{pairing[locale]}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
