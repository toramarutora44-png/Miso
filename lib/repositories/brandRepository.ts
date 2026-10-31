import { certifications } from "@/data/brand";
import type { Certification } from "@/data/brand";

export type { Certification };

/**
 * data/ への直接アクセスはこのファイル(lib/repositories/)経由に限定する。
 * ページ・コンポーネントからは data/ を直接importせず、本リポジトリ関数を使うこと。
 */
export function getCertifications(): Certification[] {
  return certifications;
}
