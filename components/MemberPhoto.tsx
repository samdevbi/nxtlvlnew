"use client";

type Props = {
  initials: string;
  photoUrl?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function MemberPhoto({
  initials,
  photoUrl,
  className = "h-full w-full",
  size = "md",
}: Props) {
  const textSize = { sm: "text-3xl", md: "text-4xl", lg: "text-6xl" }[size];

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt=""
        className={`${className} object-cover object-top`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`${className} flex items-center justify-center bg-navy-deep text-center`}
    >
      <span className={`font-display font-bold tracking-[0.18em] text-gold-light ${textSize}`}>
        {initials}
      </span>
    </div>
  );
}
