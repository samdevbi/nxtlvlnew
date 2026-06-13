interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatBlock({ value, label, className = "" }: StatBlockProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span aria-hidden className="h-0.5 w-[26px] bg-gold" />
      <span className="font-display text-4xl leading-none text-inkc dark:text-paper md:text-5xl lg:text-[54px]">
        {value}
      </span>
      <span className="text-sm text-inkc-sub dark:text-paper-line">{label}</span>
    </div>
  );
}
