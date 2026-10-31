import type { ProductId } from "@/types/product";

/**
 * ブランド共通データ(認証バッジ等)。
 * 本ファイルの認証表記は公式POP(みそ工房の郷_味噌POP_A5縦_300dpi.jpg)準拠の確定表現。
 *
 * 認証有効期限: やまなしフードダイバーシティ(Vegan/Muslim Friendly Star) 2027-03-31まで /
 * ハラール認証(JHF) 2027-08-25まで。
 * 期限到来前に再確認し、失効時は該当バッジを削除すること。
 * ハラール系バッジは甲州みそ・米みそのみに適用(金山寺みそには適用しない)。POP(2026-10-31確認)準拠。
 */
export interface Certification {
  id: "yamanashi-halal";
  label: { ja: string; en: string };
  note: { ja: string; en: string };
  subNote: { ja: string; en: string };
  infoUrl: string;
  appliesTo: ProductId[];
  colorVar: string;
}

export const certifications: Certification[] = [
  {
    id: "yamanashi-halal",
    label: {
      ja: "ハラール認証・山梨県認証取得",
      en: "[EN TODO] Halal Certified / Yamanashi Prefecture Certified",
    },
    note: {
      ja: "※認証表示は甲州みそ・米みそが対象です。",
      en: "[EN TODO] *This certification applies to Koshu Miso and Rice Miso only.",
    },
    subNote: {
      ja: "山梨県認証:やまなしフードダイバーシティ認証 ／ Muslim Friendly Star",
      en: "[EN TODO] Yamanashi certification: Yamanashi Food Diversity Certification / Muslim Friendly Star",
    },
    infoUrl: "https://www.pref.yamanashi.jp/kankou-sk/yfdc.html",
    appliesTo: ["koshu-miso", "rice-miso"],
    colorVar: "--c-fukamidori-dark",
  },
];
