import type { ReactNode } from "react";

export interface TimelineItem {
  label: string;
  content: ReactNode;
}

/** Vertikal timeline — tilla nuqtalar va hairline chiziq */
export default function Timeline({
  items,
  className = "",
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={`relative flex flex-col gap-7 ${className}`}>
      <span
        aria-hidden
        className="absolute bottom-2 left-[5px] top-2 w-px bg-paper-line dark:bg-navy-line"
      />
      {items.map((item, i) => (
        <li key={i} className="relative pl-7">
          <span
            aria-hidden
            className="absolute left-0 top-1 h-[11px] w-[11px] rounded-full border-2 border-gold bg-paper dark:bg-navy-deep"
          />
          <p className="text-[10px] font-semibold uppercase tracking-[3px] text-gold-ink dark:text-gold-light">
            {item.label}
          </p>
          <div className="mt-1.5 text-sm leading-relaxed text-inkc dark:text-paper">
            {item.content}
          </div>
        </li>
      ))}
    </ol>
  );
}
