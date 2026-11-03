/**
 * 管理画面専用の横棒グラフ(自作SVG)。商品別アクセス数のようにラベルが
 * 長く系列数が少ないデータ向け。
 */
type Bar = { label: string; value: number };

export function HorizontalBarChart({
  data,
  barHeight = 28,
  gap = 14,
  color = "#2563eb",
  emptyMessage = "データがありません",
  ariaLabel = "横棒グラフ",
}: {
  data: Bar[];
  barHeight?: number;
  gap?: number;
  color?: string;
  emptyMessage?: string;
  ariaLabel?: string;
}) {
  if (data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-zinc-500">
        {emptyMessage}
      </div>
    );
  }

  const width = 640;
  const padding = { top: 12, right: 48, bottom: 12, left: 120 };
  const innerWidth = width - padding.left - padding.right;
  const height = padding.top + padding.bottom + data.length * (barHeight + gap) - gap;

  const maxValue = Math.max(1, ...data.map((d) => d.value));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ height: "auto", display: "block" }}
      role="img"
      aria-label={ariaLabel}
    >
      {data.map((d, i) => {
        const y = padding.top + i * (barHeight + gap);
        const barLength = (d.value / maxValue) * innerWidth;
        return (
          <g key={d.label}>
            <text
              x={padding.left - 8}
              y={y + barHeight / 2}
              fontSize={12}
              fill="#18181b"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {d.label}
            </text>
            <rect
              x={padding.left}
              y={y}
              width={Math.max(barLength, d.value > 0 ? 2 : 0)}
              height={barHeight}
              fill={color}
              rx={4}
            />
            <text
              x={padding.left + barLength + 6}
              y={y + barHeight / 2}
              fontSize={12}
              fill="#52525b"
              dominantBaseline="middle"
            >
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
