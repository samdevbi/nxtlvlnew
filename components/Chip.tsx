import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Chip({ children, active = false, className = "", onClick }: ChipProps) {
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
        active
          ? "bg-gold text-navy"
          : "bg-paper-chip text-inkc-sub hover:text-gold-ink dark:bg-navy-card dark:text-paper-line dark:hover:text-gold-light"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
