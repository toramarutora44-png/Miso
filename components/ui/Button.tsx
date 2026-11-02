import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "inverse";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-miso text-washi border border-miso hover:bg-akamiso transition-colors",
  secondary:
    "bg-transparent text-fukamidori-dark border border-miso-light hover:bg-kinari-deep transition-colors",
  inverse:
    "bg-washi text-fukamidori-deep border border-washi hover:bg-kinari transition-colors",
};

const base =
  "tap-target inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-base font-medium";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
}

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variantClass[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variantClass[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
