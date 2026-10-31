interface TasteBarProps {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
  max?: 5;
}

/**
 * 5段階バー。数値とラベルを併記し、色のみに依存しない表現にする
 * (塗り区画の数 + "value/max" のテキストで段階を伝える)。
 */
export function TasteBar({ label, value, max = 5 }: TasteBarProps) {
  const segments = Array.from({ length: max }, (_, i) => i < value);

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-base text-sumi">{label}</span>
      <div
        role="img"
        aria-label={`${label}: ${value} / ${max}`}
        className="flex flex-1 gap-1"
      >
        {segments.map((filled, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded border border-fukamidori-dark/40 ${
              filled ? "bg-fukamidori" : "bg-transparent"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="w-12 shrink-0 text-right text-sm text-sumi-soft">
        {value}/{max}
      </span>
    </div>
  );
}
