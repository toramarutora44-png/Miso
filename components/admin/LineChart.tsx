/**
 * 管理画面専用の折れ線グラフ(自作SVG)。
 * chart.js等の外部ライブラリは使わず、<svg>を直接組み立てる。
 * viewBox + width="100%" でレスポンシブ対応する。
 */
type Point = { label: string; value: number };

export function LineChart({
  data,
  height = 220,
  color = "#2563eb",
  emptyMessage = "データがありません",
  ariaLabel = "折れ線グラフ",
}: {
  data: Point[];
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
  const padding = { top: 16, right: 16, bottom: 28, left: 36 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(1, ...data.map((d) => d.value));
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const x = padding.left + stepX * i;
    const y = padding.top + innerHeight - (d.value / maxValue) * innerHeight;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");
  const labelStep = Math.max(1, Math.ceil(data.length / 6));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ height: "auto", display: "block" }}
      role="img"
      aria-label={ariaLabel}
    >
      {[0, 0.5, 1].map((t) => {
        const y = padding.top + innerHeight * (1 - t);
        return (
          <line
            key={t}
            x1={padding.left}
            x2={width - padding.right}
            y1={y}
            y2={y}
            stroke="#e4e4e7"
            strokeWidth={1}
          />
        );
      })}
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={`pt-${i}`} cx={p.x} cy={p.y} r={2.5} fill={color} />
      ))}
      {points.map((p, i) =>
        i % labelStep === 0 || i === points.length - 1 ? (
          <text
            key={`label-${i}`}
            x={p.x}
            y={height - 8}
            fontSize={10}
            fill="#71717a"
            textAnchor="middle"
          >
            {p.label}
          </text>
        ) : null
      )}
      <text x={2} y={padding.top + 4} fontSize={10} fill="#71717a">
        {maxValue}
      </text>
      <text x={2} y={padding.top + innerHeight} fontSize={10} fill="#71717a">
        0
      </text>
    </svg>
  );
}
