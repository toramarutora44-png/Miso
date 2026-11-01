import { ILLUST_PATHS } from "./paths";
import type { IllustName } from "@/lib/illust/mapping";

interface DishIllustProps {
  name: IllustName;
  size?: number;
  tone?: "dark" | "light";
  className?: string;
}

// Tailwindのコンテンツスキャナは静的解析のため、`illust-${tone}` のような
// テンプレート結合だとクラス名を検出できずビルド時にパージされる。
// 完全なクラス名文字列をソースに残すため、ルックアップテーブル経由で解決する。
const TONE_CLASS: Record<"dark" | "light", string> = {
  dark: "illust-dark",
  light: "illust-light",
};

export function DishIllust({ name, size = 48, tone = "dark", className = "" }: DishIllustProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`${TONE_CLASS[tone]} ${className}`}
    >
      {ILLUST_PATHS[name]}
    </svg>
  );
}
