import type { ReactNode } from "react";

export default function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[3px] text-gold-ink dark:text-gold-light ${className}`}
    >
      <span aria-hidden className="h-px w-[18px] bg-gold" />
      {children}
    </p>
  );
}
