export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-xl tracking-[0.22em] text-inkc dark:text-paper ${className}`}
      aria-label="NXTLVL CLUB"
    >
      NXTLVL
    </span>
  );
}
