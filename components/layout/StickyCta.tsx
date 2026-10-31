"use client";

import Link from "next/link";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface StickyCtaProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * モバイル下部固定の商品/体験導線バー。
 * 高さ56px(env(safe-area-inset-bottom)分を追加で確保)。
 */
export function StickyCta({ locale, dict }: StickyCtaProps) {
  const c = dict.common;

  return (
    <nav
      aria-label="Product and experience shortcuts"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-miso-light/40 bg-washi"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex h-14 max-w-3xl">
        <Link
          href={`/${locale}/products`}
          className="tap-target flex flex-1 flex-col items-center justify-center gap-0.5 bg-akamiso px-2 text-washi"
        >
          <span className="text-base font-medium">{c.stickyProducts}</span>
        </Link>
        <Link
          href={`/${locale}/experience`}
          className="tap-target flex flex-1 flex-col items-center justify-center gap-0.5 border-l border-miso-light/40 bg-transparent px-2 text-sumi"
        >
          <span className="text-base font-medium">{c.stickyExperience}</span>
        </Link>
      </div>
    </nav>
  );
}
