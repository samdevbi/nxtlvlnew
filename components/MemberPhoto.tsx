"use client";

type Props = {
  initials: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/** Hozircha rasm yo'q — to'liq navy fon, markazda oltin bosh harflar */
export default function MemberPhoto({
  initials,
  className = "h-full w-full",
  size = "md",
}: Props) {
  const textSize = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-6xl",
  }[size];

  return (
    <div
      aria-hidden
      className={`${className} flex items-center justify-center bg-navy-deep text-center`}
    >
      <span
        className={`font-display font-bold tracking-[0.18em] text-gold-light ${textSize}`}
      >
        {initials}
      </span>
    </div>
  );
}
