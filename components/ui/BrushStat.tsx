interface BrushStatProps {
  /** 大きく見せる数値(例: 熟成月数) */
  value: string | number;
  /** 数値の単位・補足(例: "ヶ月") */
  unit: string;
  /** 数値の上に小さく表示するラベル(例: "熟成期間") */
  label: string;
  className?: string;
}

/**
 * 数値を筆文字風に大きく見せる統計表示(熟成期間等、確認済みの事実のみに使うこと)。
 * 太字明朝+わずかな傾きで手書きの勢いを演出する。
 */
export function BrushStat({ value, unit, label, className = "" }: BrushStatProps) {
  return (
    <div className={`inline-flex items-end gap-2 border-l-2 border-miso pl-3 ${className}`}>
      <div>
        <p className="t-label">{label}</p>
        <p
          className="font-heading text-[42px] font-bold leading-[0.9] text-fukamidori-dark"
          style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}
        >
          {value}
          <span className="ml-1 text-[18px] font-medium">{unit}</span>
        </p>
      </div>
    </div>
  );
}
