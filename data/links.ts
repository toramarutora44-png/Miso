/**
 * サイト外部リンクのデータ。
 * ecUrl(ECサイト)・contactUrl(電話)は磯部様確認済みのため isPlaceholder: false。
 * officialSiteUrl・experienceInfoUrl は未確認のため isPlaceholder: true の仮リンクとして保持する。
 * TODO(data-verify): 要・磯部様確認 — officialSiteUrl / experienceInfoUrl の本番URL確定後に更新すること。
 */
export interface LinkEntry {
  value: string;
  isPlaceholder: boolean;
}

export interface SiteLinks {
  ecUrl: LinkEntry;
  officialSiteUrl: LinkEntry;
  experienceInfoUrl: LinkEntry;
  contactUrl: LinkEntry;
}

export const links: SiteLinks = {
  ecUrl: { value: "http://www.misokoubounosato.stores.jp", isPlaceholder: false },
  officialSiteUrl: { value: "https://example.com/PLACEHOLDER", isPlaceholder: true },
  experienceInfoUrl: { value: "https://example.com/PLACEHOLDER", isPlaceholder: true },
  contactUrl: { value: "tel:09031472470", isPlaceholder: false },
};
