interface BookCardProps {
  title: string;
  author: string;
  className?: string;
}

/** Kitob muqovasi — navy gradient + ichki tilla ramka */
export default function BookCard({ title, author, className = "" }: BookCardProps) {
  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden rounded-sm bg-navy-grad shadow-md shadow-navy/20 transition-transform duration-200 hover:-translate-y-1 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-1.5 border border-gold/40"
      />
      {/* Kitob "tikuvi" — chap tomondagi chiziq */}
      <div aria-hidden className="absolute bottom-0 left-2.5 top-0 w-px bg-gold/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-between px-3 py-5 text-center">
        <h3 className="mt-2 font-display text-sm leading-snug text-paper [text-wrap:balance] md:text-base">
          {title}
        </h3>
        <p className="text-micro font-semibold uppercase tracking-[2px] text-gold-light">
          {author}
        </p>
      </div>
    </div>
  );
}
