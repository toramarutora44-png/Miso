import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "warning";
  className?: string;
}

const toneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-sumi-soft/40 text-sumi-soft",
  warning: "border-akamiso/50 text-akamiso",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-sm ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
