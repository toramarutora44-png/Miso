import { getCertifications } from "@/lib/repositories/brandRepository";
import type { Certification } from "@/lib/repositories/brandRepository";
import type { Locale } from "@/types/i18n";

interface CertBadgesProps {
  locale: Locale;
  className?: string;
}

const toneClass: Record<Certification["id"], string> = {
  yamanashi: "border-cert-yamanashi/50 bg-cert-yamanashi/10 text-sumi",
  vegan: "border-cert-vegan/50 bg-cert-vegan/10 text-cert-vegan",
  muslim: "border-cert-muslim/50 bg-cert-muslim/10 text-cert-muslim",
};

/**
 * 認証3バッジ(やまなしフードダイバーシティ/ヴィーガン/ムスリムフレンドリー)を
 * 実HTMLとして表示する。画像焼き込みへの依存をなくし、アクセシブルに表示する。
 */
export function CertBadges({ locale, className = "" }: CertBadgesProps) {
  const certs = getCertifications();

  return (
    <ul className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {certs.map((cert) => (
        <li
          key={cert.id}
          className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium ${toneClass[cert.id]}`}
        >
          {cert.label[locale]}
        </li>
      ))}
    </ul>
  );
}
