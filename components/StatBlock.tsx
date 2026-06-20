interface StatBlockProps {
  value: string;
  label: string;
  period?: string;
  className?: string;
}

export default function StatBlock({ value, label, period, className = "" }: StatBlockProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {period ? (
        <span className="text-overline font-semibold uppercase tracking-[0.14em] text-gold-ink dark:text-gold-light">
          {period}
        </span>
      ) : (
        <span aria-hidden className="h-0.5 w-[26px] bg-gold" />
      )}
      <span className="font-display text-4xl leading-none text-inkc dark:text-paper md:text-5xl lg:text-[3.5rem]">
        {value}
      </span>
      <span className="text-base text-inkc-sub dark:text-paper-line">{label}</span>
    </div>
  );
}
