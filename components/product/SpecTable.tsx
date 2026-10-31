import type { Product } from "@/types/product";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface SpecTableProps {
  product: Product;
  locale: Locale;
  dict: Dictionary;
}

interface Row {
  label: string;
  display: string;
}

/**
 * 商品仕様テーブル。
 * 値が未確認(null)の項目は「確認中」等を表示せず、行自体を出さない。
 * glutenFree(グルテンフリー)は甲州みそ等で麦麹を使用しグルテンを含む可能性が高いため、
 * 確認状況に関わらず表示自体を行わない。
 */
export function SpecTable({ product, locale, dict }: SpecTableProps) {
  const d = dict.product;
  const c = dict.common;

  const rows: Row[] = [];

  if (product.ingredients.value !== null) {
    rows.push({
      label: d.ingredients,
      display: product.ingredients.value.map((t) => t[locale]).join(" / "),
    });
  }

  if (product.allergens.value !== null) {
    rows.push({
      label: d.allergens,
      display:
        product.allergens.value.length === 0
          ? c.no
          : product.allergens.value.join(" / "),
    });
  }

  if (product.dietary.value.vegan !== null) {
    rows.push({
      label: d.vegan,
      display: product.dietary.value.vegan ? c.yes : c.no,
    });
  }

  if (product.dietary.value.halal !== null) {
    rows.push({
      label: d.halal,
      display: product.dietary.value.halal ? c.yes : c.no,
    });
  }

  if (product.agingMonths.value !== null) {
    rows.push({
      label: d.agingMonths,
      display: `${product.agingMonths.value}${d.months}`,
    });
  }

  if (product.priceVariants.value !== null) {
    rows.push({
      label: d.price,
      display: product.priceVariants.value
        .map(
          (v) =>
            `${v.netWeightG}${d.grams} ${v.priceYen.toLocaleString(locale)}${d.yen}`,
        )
        .join(" / "),
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-base">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-sumi-soft/20">
              <th
                scope="row"
                className="w-32 py-3 pr-4 text-left align-top font-normal text-sumi-soft"
              >
                {row.label}
              </th>
              <td className="py-3 align-top text-sumi">{row.display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
