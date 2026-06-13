import type { HTMLAttributes, ReactNode } from "react";

interface CutCardProps extends HTMLAttributes<HTMLDivElement> {
  /** navy variant — gradient fon + 2px tilla pastki chiziq */
  variant?: "paper" | "navy";
  children: ReactNode;
}

export default function CutCard({
  variant = "paper",
  className = "",
  children,
  ...props
}: CutCardProps) {
  const variants = {
    paper:
      "bg-paper-card border border-paper-line text-inkc dark:bg-navy-card dark:border-navy-line dark:text-paper dark:border-b-2 dark:border-b-gold",
    navy: "bg-navy-grad text-paper border-b-2 border-gold",
  };

  return (
    <div
      className={`clip-cut p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 dark:hover:shadow-black/40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
