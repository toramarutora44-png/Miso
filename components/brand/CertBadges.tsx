import Image from "next/image";
import { getCertifications, getCertificationsForProduct } from "@/lib/repositories/brandRepository";
import type { Locale } from "@/types/i18n";
import type { ProductId } from "@/types/product";

interface CertBadgesProps {
  locale: Locale;
  /** 指定時はその商品に適用される認証のみ表示する(例: 金山寺みそは非表示)。未指定時は全認証を表示する。 */
  productId?: ProductId;
  className?: string;
  align?: "center" | "left";
}

/**
 * 認証バッジ(ムスリムフレンドリー・ヴィーガンフレンドリー)を実HTMLとして表示する。
 * 深緑地・白文字の小さめ単一バッジ+下部に小さい注記(対象商品・やまなしフードダイバーシティ認証の内訳)。
 * 「ハラール」「ビーガン」は『フレンドリー』と表記し『認証』の語を付けないこと(2026-11-03、磯部様指示)。
 * 画像焼き込みへの依存をなくし、アクセシブルに表示する。
 */
export function CertBadges({
  locale,
  productId,
  className = "",
  align = "center",
}: CertBadgesProps) {
  const certs = productId ? getCertificationsForProduct(productId) : getCertifications();

  if (certs.length === 0) {
    return null;
  }

  const itemsClass = align === "left" ? "items-start" : "items-center";
  const justifyClass = align === "left" ? "justify-start" : "justify-center";

  return (
    <div className={`flex flex-col ${itemsClass} gap-1.5 ${className}`}>
      {/* 実物の認証書(付属書)から切り出したロゴマーク。「やまなしフードダイバーシティ認証」の
          Muslim Friendly Star / Vegan Friendly 両カテゴリーが対象製品に含まれる場合のみ表示する。 */}
      <div className={`flex items-center ${justifyClass} gap-2`}>
        <Image
          src="/images/certification/logos/muslim-friendly-mark.png"
          alt="Muslim Friendly - Yamanashi Food Diversity Certified"
          width={80}
          height={80}
          className="h-20 w-20"
        />
        <Image
          src="/images/certification/logos/vegan-friendly-mark.png"
          alt="Vegan Friendly - Yamanashi Food Diversity Certified"
          width={80}
          height={80}
          className="h-20 w-20"
        />
      </div>
      <ul className={`flex flex-wrap items-center ${justifyClass} gap-2`}>
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
