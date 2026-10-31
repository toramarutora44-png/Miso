"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/localePath";
import type { Locale } from "@/types/i18n";

const label: Record<Locale, string> = { ja: "日本語", en: "English" };

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname() ?? "/";

  return (
    <nav aria-label="Language switcher" className="flex items-center gap-2">
      {locales.map((loc) => {
        const isActive = loc === currentLocale;
        return (
          <Link
            key={loc}
            href={localePath(pathname, loc)}
            aria-current={isActive ? "true" : undefined}
            className={`tap-target inline-flex items-center justify-center rounded px-2 text-sm ${
              isActive
                ? "font-semibold text-fukamidori-dark underline"
                : "text-sumi-soft hover:text-fukamidori-dark"
            }`}
          >
            {label[loc]}
          </Link>
        );
      })}
    </nav>
  );
}
