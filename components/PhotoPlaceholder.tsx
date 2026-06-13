interface PhotoPlaceholderProps {
  /** Tailwind aspect klassi, masalan "aspect-[4/5]" */
  aspect?: string;
  label?: string;
  /** Foto o'rniga siluet: bitta odam yoki guruh */
  silhouette?: "person" | "group";
  className?: string;
}

function PersonSilhouette() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className="absolute inset-0 m-auto h-3/5 w-3/5 text-gold-light/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="50" cy="36" r="15" />
      <path d="M18 88c4-18 16-26 32-26s28 8 32 26" />
    </svg>
  );
}

function GroupSilhouette() {
  return (
    <svg
      viewBox="0 0 140 80"
      aria-hidden
      className="absolute inset-0 m-auto h-3/5 w-3/5 text-gold-light/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="70" cy="26" r="13" />
      <path d="M44 74c2-15 12-22 26-22s24 7 26 22" />
      <circle cx="30" cy="34" r="10" />
      <path d="M10 72c1.5-12 9-18 20-18 4 0 7.5.8 10.5 2.3" />
      <circle cx="110" cy="34" r="10" />
      <path d="M99.5 56.3c3-1.5 6.5-2.3 10.5-2.3 11 0 18.5 6 20 18" />
    </svg>
  );
}

/** Foto kelguncha: navy gradient + diagonal tilla chiziqlar */
export default function PhotoPlaceholder({
  aspect = "aspect-[4/5]",
  label,
  silhouette,
  className = "",
}: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label ?? "Foto tez orada"}
      className={`clip-cut relative overflow-hidden bg-navy-card ${aspect} ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0px, transparent 18px, rgba(201,162,39,0.35) 18px, rgba(201,162,39,0.35) 19px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(19,41,74,0.9), rgba(8,20,38,0.95))",
          mixBlendMode: "multiply",
        }}
      />
      {silhouette === "person" && <PersonSilhouette />}
      {silhouette === "group" && <GroupSilhouette />}
      {label && (
        <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[3px] text-gold-light">
          {label}
        </span>
      )}
    </div>
  );
}
