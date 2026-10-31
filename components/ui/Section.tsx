import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  tone?: "kinari" | "kinari-deep" | "washi";
  className?: string;
  as?: "section" | "div";
  id?: string;
}

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  kinari: "bg-kinari",
  "kinari-deep": "bg-kinari-deep",
  washi: "bg-washi",
};

export function Section({
  children,
  tone = "kinari",
  className = "",
  as = "section",
  id,
}: SectionProps) {
  const Tag = as;
  return (
    <Tag id={id} className={`${toneClass[tone]} ${className}`}>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </div>
    </Tag>
  );
}
