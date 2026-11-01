import type { ProductId } from "@/types/product";

/**
 * レシピの商品色ベタタイル(RecipeCard・レシピ詳細ヒーロー)で共通利用する配色定義。
 * 米みそのタイル背景(--c-kome)は明るい黄色系のため、白文字・白イラスト線だと
 * 視認性が悪い。商品ごとに文字色・イラストのトーンを切り替える。
 */
export const TILE_BG: Record<ProductId, string> = {
  "koshu-miso": "bg-koshu",
  "rice-miso": "bg-kome",
  "kinzanji-miso": "bg-kinzanji",
};

export const TILE_INK: Record<ProductId, "dark" | "light"> = {
  "koshu-miso": "light",
  "rice-miso": "dark",
  "kinzanji-miso": "light",
};

export const TILE_TEXT: Record<ProductId, string> = {
  "koshu-miso": "text-washi",
  "rice-miso": "text-sumi",
  "kinzanji-miso": "text-washi",
};
