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
  // 原材料が POP 記載分のみ(全配合は確認中)の商品のみ、注記を併記する。
  const showIngredientsNote = Boolean(product.ingredients.note);

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

  // 価格は委託先店舗により異なるため、磯部様の意向(2026-11-01確認)によりサイトには掲載しない。

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
      {showIngredientsNote && (
        <p className="mt-2 text-sm text-sumi-soft">{d.ingredientsNote}</p>
      )}
    </div>
  );
}
