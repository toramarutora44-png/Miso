import { products } from "@/data/products";
import { producer } from "@/data/producer";
import { links } from "@/data/links";
import type { Product, ProductId } from "@/types/product";
import type { SiteLinks } from "@/data/links";

export type { SiteLinks };

/**
 * data/ への直接アクセスはこのファイル(lib/repositories/)経由に限定する。
 * ページ・コンポーネントからは data/ を直接importせず、本リポジトリ関数を使うこと。
 * (将来的にDB移行する際も、呼び出し側はこのインターフェースのままで良い想定)
 */

export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => a.order - b.order);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: ProductId): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getProducer() {
  return producer;
}

export function getSiteLinks(): SiteLinks {
  return links;
}
