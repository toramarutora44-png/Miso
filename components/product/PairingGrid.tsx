import { DishIllust } from "@/components/illust/DishIllust";
import { getPairingIllust } from "@/lib/illust/mapping";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/types/product";
import type { Locale } from "@/types/i18n";

interface PairingGridProps {
  product: Product;
  locale: Locale;
}

export function PairingGrid({ product, locale }: PairingGridProps) {
  const pairings = product.pairings;

  if (pairings.length === 1) {
    return (
      <Reveal className="mx-auto mt-8 max-w-md text-center">
        <DishIllust name={getPairingIllust(product.id, 0)} size={96} tone="dark" className="mx-auto" />
        <p className="t-quote mt-5 text-sumi">{pairings[0][locale]}</p>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
        {pairings.map((pairing, i) => (
          <div key={i} className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-kinari-deep">
              <DishIllust name={getPairingIllust(product.id, i)} size={88} tone="dark" />
            </div>
            <p className="t-body text-sumi">{pairing[locale]}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
