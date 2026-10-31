/**
 * サイト外部リンクのデータ。
 * ecUrl(ECサイト)・contactUrl(電話)は磯部様確認済みのため isPlaceholder: false。
 * officialSiteUrl・experienceInfoUrl は未確認かつ使用箇所がないため削除済み
 * (復活させる場合は本番URL確定後に追加すること)。
 */
export interface LinkEntry {
  value: string;
  isPlaceholder: boolean;
}

export interface SiteLinks {
  ecUrl: LinkEntry;
  contactUrl: LinkEntry;
}

export const links: SiteLinks = {
  ecUrl: { value: "https://misokoubounosato.stores.jp/", isPlaceholder: false },
  contactUrl: { value: "tel:09031472470", isPlaceholder: false },
};
