import { getCertifications, getCertificationsForProduct } from "@/lib/repositories/brandRepository";
import type { Locale } from "@/types/i18n";
import type { ProductId } from "@/types/product";

interface CertBadgesProps {
  locale: Locale;
  /** 指定時はその商品に適用される認証のみ表示する(例: 金山寺みそは非表示)。未指定時は全認証を表示する。 */
  productId?: ProductId;
  className?: string;
}

/**
 * 認証バッジ(ハラール認証・山梨県認証取得)を実HTMLとして表示する。
 * 深緑地・白文字の小さめ単一バッジ+下部に小さい注記(対象商品・山梨県認証の内訳)。
 * 画像焼き込みへの依存をなくし、アクセシブルに表示する。
 */
export function CertBadges({ locale, productId, className = "" }: CertBadgesProps) {
  const certs = productId ? getCertificationsForProduct(productId) : getCertifications();

  if (certs.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {certs.map((cert) => (
          <li
            key={cert.id}
            className="inline-flex items-center rounded bg-fukamidori-dark px-3 py-1.5 text-sm font-medium text-washi"
          >
            {cert.label[locale]}
          </li>
        ))}
      </ul>
      {certs.map((cert) => (
        <p key={cert.id} className="max-w-xs text-center text-xs text-sumi-soft">
          {cert.note[locale]}
          <br />
          {cert.subNote[locale]}
        </p>
      ))}
    </div>
  );
}
