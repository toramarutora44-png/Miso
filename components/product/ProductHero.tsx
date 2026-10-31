import Image from "next/image";
import type { Product } from "@/types/product";
import type { Locale } from "@/types/i18n";

interface ProductHeroProps {
  product: Product;
  locale: Locale;
}

export function ProductHero({ product, locale }: ProductHeroProps) {
  const { hero } = product.images;
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Image
        src={hero.src}
        alt={hero.alt[locale]}
        width={hero.width}
        height={hero.height}
        className="h-auto w-48 rounded-card border border-miso-light/30 sm:w-56"
        priority
      />
      <div>
        <h1 className="text-[32px] leading-tight sm:text-[36px]">
          {product.name[locale]}
        </h1>
        <p className="mt-3 text-lg text-sumi-soft">{product.catchCopy[locale]}</p>
      </div>
    </div>
  );
}
