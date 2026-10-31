import Image from "next/image";
import type { Product, ProductId } from "@/types/product";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getCertificationsForProduct } from "@/lib/repositories/brandRepository";

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
 * 商品比較の簡易版。taste数値バーは根拠がないため使用せず、
 * 「キャッチコピー / 麹の種類 / 食べ方 / 認証」の4行で比較する(全セルが確認済み情報)。
 * 麹の種類は原材料の確認済みテキストから抽出し、見つからない場合は「確認中」と表示する。
 */
function getKoujiText(product: Product, locale: Locale, dict: Dictionary): string {
  const ingredients = product.ingredients.value;
  if (!ingredients) return dict.compare.koujiChecking;
  const kouji = ingredients.find((i) => i.ja.includes("麹") || i.ja.includes("糀"));
  return kouji ? kouji[locale] : dict.compare.koujiChecking;
}

export function CompareSimple({ products, locale, dict }: CompareSimpleProps) {
  const c = dict.compare;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {products.map((product) => {
        const certs = getCertificationsForProduct(product.id);
        return (
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

              <dl className="mt-3 flex flex-col gap-3 text-sm">
                <div>
                  <dt className="text-sumi-soft">{c.catchCopyRow}</dt>
                  <dd className="mt-0.5 font-medium text-sumi">{product.catchCopy[locale]}</dd>
                </div>
                <div>
                  <dt className="text-sumi-soft">{c.koujiRow}</dt>
                  <dd className="mt-0.5 text-sumi">{getKoujiText(product, locale, dict)}</dd>
                </div>
                <div>
                  <dt className="text-sumi-soft">{c.pairingsRow}</dt>
                  <dd className="mt-0.5 text-sumi">
                    {product.pairings.map((p) => p[locale]).join(" / ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-sumi-soft">{c.certRow}</dt>
                  <dd className="mt-0.5 text-sumi">
                    {certs.length > 0 ? c.certYes : c.certNo}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        );
      })}
    </div>
  );
}
