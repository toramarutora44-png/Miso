interface BrushRuleProps {
  width?: number;
  className?: string;
  animated?: boolean;
  color?: string;
}

/**
 * 筆罫(筆文字風の区切り線)。ヒーローでは`animated`で描画アニメーションを付け、
 * 商品ブロックの見出し罫では`animated={false}`で静的表示する。
 */
export function BrushRule({ width = 160, className = "", animated = false, color }: BrushRuleProps) {
  return (
    <svg
      viewBox="0 0 200 24"
      width={width}
      height={Math.round(width * 0.12)}
      className={`${animated ? "brush-path" : "brush-path--static"} ${className}`}
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      <path
        d="M4 18 C 50 6, 120 22, 196 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  );
}
