import Link from "next/link";
import { Section } from "@/components/ui/Section";

/**
 * not-found.tsx は Next.js の仕様上、動的ルートの params を受け取れないため、
 * ロケール検出不能時の共通フォールバックとして既定ロケール(ja)文言で表示する。
 */
export default function LocaleNotFound() {
  return (
    <Section tone="kinari" className="text-center">
      <h1 className="text-[28px]">ページが見つかりません</h1>
      <p className="mt-3 text-base text-sumi-soft">
        お探しのページは見つかりませんでした。
      </p>
      <p className="mt-6">
        <Link href="/ja" className="tap-target inline-flex items-center text-miso underline">
          トップへ戻る
        </Link>
      </p>
    </Section>
  );
}
