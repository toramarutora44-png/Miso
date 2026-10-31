import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-card border border-miso-light/20 bg-washi p-5 ${className}`}
    >
      {children}
    </div>
  );
}
