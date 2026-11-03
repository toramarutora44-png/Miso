/**
 * 管理画面専用の縦棒グラフ(自作SVG)。月別推移などカテゴリ数が少ない系列向け。
 */
type Bar = { label: string; value: number };

export function BarChart({
  data,
  height = 220,
  color = "#2563eb",
  emptyMessage = "データがありません",
  ariaLabel = "縦棒グラフ",
}: {
  data: Bar[];
  height?: number;
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
  const padding = { top: 24, right: 16, bottom: 28, left: 36 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(1, ...data.map((d) => d.value));
  const slot = innerWidth / data.length;
  const barWidth = Math.min(40, slot * 0.6);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ height: "auto", display: "block" }}
      role="img"
      aria-label={ariaLabel}
    >
      <line
        x1={padding.left}
        x2={width - padding.right}
        y1={padding.top + innerHeight}
        y2={padding.top + innerHeight}
        stroke="#d4d4d8"
        strokeWidth={1}
      />
      {data.map((d, i) => {
        const barHeight = (d.value / maxValue) * innerHeight;
        const x = padding.left + slot * i + (slot - barWidth) / 2;
        const y = padding.top + innerHeight - barHeight;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barWidth} height={Math.max(barHeight, d.value > 0 ? 1 : 0)} fill={color} rx={2} />
            {d.value > 0 && (
              <text x={x + barWidth / 2} y={y - 4} fontSize={10} fill="#52525b" textAnchor="middle">
                {d.value}
              </text>
            )}
            <text
              x={x + barWidth / 2}
              y={height - 8}
              fontSize={10}
              fill="#71717a"
              textAnchor="middle"
            >
              {d.label}
            </text>
          </g>
        );
      })}
      <text x={2} y={padding.top + 4} fontSize={10} fill="#71717a">
        {maxValue}
      </text>
    </svg>
  );
}
