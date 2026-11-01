"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(href + "/");
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`tap-target inline-flex h-11 items-center px-2.5 text-[14px] ${
        isActive
          ? "border-b border-fukamidori text-fukamidori-dark"
          : "text-sumi-soft"
      }`}
    >
      {children}
    </Link>
  );
}
