import Image from "next/image";
import { Band } from "@/components/ui/Band";
import { Reveal } from "@/components/ui/Reveal";
import { BrushStat } from "@/components/ui/BrushStat";
import { CertBadges } from "@/components/brand/CertBadges";
import type { Product } from "@/types/product";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProductHeroProps {
  product: Product;
  locale: Locale;
  dict: Dictionary;
}

export function ProductHero({ product, locale, dict }: ProductHeroProps) {
  const { hero } = product.images;
  return (
    <Band tone="washi">
      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:grid sm:grid-cols-12 sm:items-center sm:gap-8 sm:py-16">
        <div className="order-2 sm:order-1 sm:col-span-5">
          <p className="t-label">{String(product.order).padStart(2, "0")}</p>
          <h1 className="t-title mt-2">{product.name[locale]}</h1>
          <p className="t-lead mt-4 text-sumi">{product.catchCopy[locale]}</p>
          {product.tasteNotes?.value && (
            <p className="t-body mt-4 text-sumi-soft">{product.tasteNotes.value[locale]}</p>
          )}
          {product.agingMonths?.value != null && (
            <BrushStat
              className="mt-5"
              value={product.agingMonths.value}
              unit={dict.product.months}
              label={dict.product.agingMonths}
            />
          )}
          <CertBadges locale={locale} productId={product.id} align="left" className="mt-6" />
        </div>
        <div className="order-1 mt-6 sm:order-2 sm:col-span-7 sm:mt-0">
          <Reveal>
            <div className="relative aspect-square w-full overflow-hidden sm:ml-auto sm:max-w-[520px]">
              <Image
                src={hero.src}
                alt={hero.alt[locale]}
                fill
                priority
                sizes="(min-width: 640px) 520px, 100vw"
                className="object-cover mix-blend-multiply"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Band>
  );
}
