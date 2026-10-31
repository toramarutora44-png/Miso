import Image from "next/image";
import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { locales } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/i18n";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const navItems = [
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/producer`, label: dict.nav.producer },
    { href: `/${locale}/recipes`, label: dict.nav.recipes },
  ];

  return (
    <header className="border-b border-miso-light/30 bg-washi">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-heading text-xl font-semibold text-fukamidori-dark"
        >
          <Image
            src="/images/brand/logo.avif"
            alt="みそ工房の郷"
            width={648}
            height={648}
            className="h-10 w-10 object-contain"
          />
          {dict.site.name}
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tap-target inline-flex items-center justify-center rounded px-3 text-base text-sumi hover:text-fukamidori-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {locales.length > 1 && <LocaleSwitcher currentLocale={locale} />}
      </div>
    </header>
  );
}
