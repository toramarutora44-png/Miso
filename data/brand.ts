/**
 * ブランド共通データ(認証バッジ等)。
 * 本ファイルの3認証表記はブランド公式の確定表現であり、Provisional<T>ラップの対象外
 * (確認中表示なしで確定表示してよい)。「ハラール認証」という語は使わない。
 */
export interface Certification {
  id: "yamanashi" | "vegan" | "muslim";
  label: { ja: string; en: string };
  subLabel?: { ja: string; en: string }; // 英字表記等(VEGAN FRIENDLY 等)
  colorVar: string; // 例 "--c-cert-vegan"
}

export const certifications: Certification[] = [
  {
    id: "yamanashi",
    label: {
      ja: "やまなしフードダイバーシティ認証取得",
      en: "[EN TODO] Yamanashi Food Diversity Certified",
    },
    colorVar: "--c-cert-yamanashi",
  },
  {
    id: "vegan",
    label: { ja: "ヴィーガンフレンドリー", en: "VEGAN FRIENDLY" },
    subLabel: { ja: "VEGAN FRIENDLY", en: "VEGAN FRIENDLY" },
    colorVar: "--c-cert-vegan",
  },
  {
    id: "muslim",
    label: { ja: "ムスリムフレンドリー", en: "MUSLIM FRIENDLY" },
    subLabel: { ja: "MUSLIM FRIENDLY", en: "MUSLIM FRIENDLY" },
    colorVar: "--c-cert-muslim",
  },
];
