import Image from "next/image";
import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavLink } from "./NavLink";
import { locales } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/i18n";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * スティッキーヘッダー。h-14固定、半透明+blurで本文上に重なっても視認性を保つ。
 * LocaleSwitcherはlocales.length > 1がfalseの現状、自動的に非表示になる
 * (英語版復活時のため、コード自体は削除しない)。
 */
export function Header({ locale, dict }: HeaderProps) {
  const nav = dict.nav;

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-rule bg-washi/88 backdrop-blur-[8px]">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/images/brand/logo.avif"
            alt={dict.site.name}
            width={28}
            height={28}
            sizes="28px"
            className="h-7 w-7 object-contain"
          />
          <span className="font-heading text-[16.5px] tracking-[.04em] text-fukamidori-dark">
            {dict.site.name}
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-0.5">
          <NavLink href={`/${locale}/products`}>{nav.productsShort}</NavLink>
          <NavLink href={`/${locale}/producer`}>{nav.producerShort}</NavLink>
          <NavLink href={`/${locale}/recipes`}>{nav.recipesShort}</NavLink>
        </nav>
        {locales.length > 1 && <LocaleSwitcher currentLocale={locale} />}
      </div>
    </header>
  );
}
