interface BrushKeywordProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 本文中のキーワードを筆書き風に強調する。
 * 太字+深緑色+波線の下線(text-decoration-style: wavy)で、
 * 複雑なSVGなしに折り返しにも崩れず対応する。
 */
export function BrushKeyword({ children, className = "" }: BrushKeywordProps) {
  return (
    <strong
      className={`font-heading font-bold text-fukamidori-dark ${className}`}
      style={{
        fontSize: "1.1em",
        textDecoration: "underline",
        textDecorationStyle: "wavy",
        textDecorationColor: "var(--c-miso)",
        textDecorationThickness: "2px",
        textUnderlineOffset: "3px",
      }}
    >
      {children}
    </strong>
  );
}

/**
 * テキスト中の指定キーワードを <BrushKeyword> で囲んで返す。
 * 完全一致する最初の箇所のみ置換する(同じキーワードが複数出現する文章には使わない想定)。
 * マッチしない場合は元のテキストをそのまま返す(データの改変は一切しない)。
 */
export function highlightKeywords(text: string, keywords: string[]): React.ReactNode[] {
  if (keywords.length === 0) return [text];
  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    keywords.includes(part) ? (
      <BrushKeyword key={i}>{part}</BrushKeyword>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
