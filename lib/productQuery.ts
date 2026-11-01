import type { ProductId } from "@/types/product";

/**
 * /ja?product=xxx のクエリ値を ProductId に解決する純関数(data非依存)。
 * トップページの商品ブロックへの直接リンク(SNS・紙POPのQR等)で使用する。
 */
const PRODUCT_QUERY_MAP: Record<string, ProductId> = {
  koshu: "koshu-miso",
  "koshu-miso": "koshu-miso",
  kome: "rice-miso",
  rice: "rice-miso",
  "rice-miso": "rice-miso",
  kinzanji: "kinzanji-miso",
  "kinzanji-miso": "kinzanji-miso",
};

export function resolveProductKey(value: string | null): ProductId | null {
  if (!value) return null;
  return PRODUCT_QUERY_MAP[value.toLowerCase()] ?? null;
}
