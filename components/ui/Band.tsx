import type { ReactNode } from "react";

interface BandProps {
  children: ReactNode;
  tone: "washi" | "kinari" | "kinari-deep" | "fukamidori-deep" | "none";
  className?: string;
}

const toneClass: Record<BandProps["tone"], string> = {
  washi: "bg-washi",
  kinari: "bg-kinari",
  "kinari-deep": "bg-kinari-deep",
  "fukamidori-deep": "bg-fukamidori-deep",
  none: "",
};

/**
 * トップページ専用の全幅レイアウト部品。
 * 内部ページ用の components/ui/Section.tsx(max-w-3xl固定)とは異なり、
 * 幅の制御は呼び出し側に委ねる薄いラッパー。
 */
export function Band({ children, tone, className = "" }: BandProps) {
  return <section className={`${toneClass[tone]} ${className}`}>{children}</section>;
}
