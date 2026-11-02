import type { ProductId } from "@/types/product";

/**
 * ブランド共通データ(認証バッジ等)。
 * 本ファイルの認証表記は公式POP(みそ工房の郷_味噌POP_A5縦_300dpi.jpg)準拠の確定表現。
 *
 * 認証有効期限: やまなしフードダイバーシティ(Vegan/Muslim Friendly Star) 2027-03-31まで /
 * ハラール認証(JHF) 2027-08-25まで。
 * 期限到来前に再確認し、失効時は該当バッジを削除すること。
 * ハラール系バッジは甲州みそ・米みそのみに適用(金山寺みそには適用しない)。POP(2026-10-31確認)準拠。
 * 2026-11-01、磯部様よりやまなしフードダイバーシティ認証(Muslim Friendly Star/Vegan Friendly)の
 * 付属書(認定製品一覧)を受領。対象製品リストに甲州みそ・米みそが含まれ金山寺みそは含まれないことを
 * 原本で確認済み(public/images/certification/配下)。
 *
 * 【2026-11-03訂正】磯部様より「ハラール」「ビーガン」は『フレンドリー』と表記し、
 * 『認証』という語を付けないこと、との明確な指示あり(POPの「ハラール認証」表記は不使用に変更)。
 * 「認証」の語は、公式な制度名である「やまなしフードダイバーシティ認証」にのみ用いる。
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
      ja: "ムスリムフレンドリー・ヴィーガンフレンドリー",
      en: "Muslim Friendly / Vegan Friendly",
    },
    note: {
      ja: "※表示は甲州みそ・米みそが対象です。",
      en: "*This applies to Koshu Miso and Rice Miso only.",
    },
    subNote: {
      ja: "やまなしフードダイバーシティ認証取得(Muslim Friendly Star ／ Vegan Friendly)",
      en: "Yamanashi Food Diversity Certified (Muslim Friendly Star / Vegan Friendly)",
    },
    infoUrl: "https://www.pref.yamanashi.jp/kankou-sk/yfdc.html",
    appliesTo: ["koshu-miso", "rice-miso"],
    colorVar: "--c-fukamidori-dark",
  },
];
