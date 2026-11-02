"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
  exact = false,
}: {
  href: string;
  children: React.ReactNode;
  /** trueなら完全一致のみをアクティブとする(TOPリンク等、他の全ページのprefixと一致してしまう場合に使う) */
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname === href || pathname?.startsWith(href + "/");
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex h-11 items-center whitespace-nowrap px-1.5 text-[13px] sm:px-2.5 sm:text-[14px] ${
        isActive
          ? "border-b border-fukamidori text-fukamidori-dark"
          : "text-sumi-soft"
      }`}
    >
      {children}
    </Link>
  );
}
