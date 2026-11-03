/**
 * 管理画面専用の期間フィルターUI。サーバーコンポーネントのページから
 * GETフォームで /admin/qr?range=... (&from=...&to=...) に遷移させる。
 * クライアントJSは使わず、サーバー側のSQL WHERE条件に反映する方式。
 */
export type RangeKey = "today" | "7d" | "30d" | "thisMonth" | "lastMonth" | "custom";

export const RANGE_OPTIONS: { value: RangeKey; label: string }[] = [
  { value: "today", label: "今日" },
  { value: "7d", label: "直近7日間" },
  { value: "30d", label: "直近30日間" },
  { value: "thisMonth", label: "今月" },
  { value: "lastMonth", label: "先月" },
  { value: "custom", label: "任意期間" },
];

export function PeriodFilter({
  range,
  from,
  to,
}: {
  range: RangeKey;
  from: string;
  to: string;
}) {
  return (
    <form
      method="get"
      action="/admin/qr"
      className="mb-4 flex flex-wrap items-end gap-3 rounded border border-zinc-300 bg-white p-3 text-sm"
    >
      <label className="flex flex-col gap-1">
        <span className="text-xs text-zinc-500">期間</span>
        <select
          name="range"
          defaultValue={range}
          className="rounded border border-zinc-300 px-2 py-1"
        >
          {RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs text-zinc-500">開始日(任意期間時)</span>
        <input
          type="date"
          name="from"
          defaultValue={from}
          className="rounded border border-zinc-300 px-2 py-1"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs text-zinc-500">終了日(任意期間時)</span>
        <input
          type="date"
          name="to"
          defaultValue={to}
          className="rounded border border-zinc-300 px-2 py-1"
        />
      </label>
      <button
        type="submit"
        className="rounded bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-700"
      >
        絞り込む
      </button>
    </form>
  );
}
