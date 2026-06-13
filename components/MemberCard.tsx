"use client";

import Link from "next/link";
import type { Member } from "@/lib/members";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <Link
      href={`/members/${member.slug}`}
      className="clip-cut group flex aspect-[3/4] flex-col items-center justify-center gap-4 overflow-hidden border border-paper-line bg-navy-deep px-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/15 dark:border-navy-line dark:hover:shadow-black/40"
    >
      <span className="font-display text-4xl font-bold tracking-[0.18em] text-gold-light">
        {member.initials}
      </span>
      <div>
        <h3 className="font-sans text-[15px] font-semibold leading-snug text-paper lg:text-base">
          {member.name}
        </h3>
        <p className="mt-1.5 text-[9px] font-semibold uppercase leading-snug tracking-[2px] text-gold-light">
          {member.role}
        </p>
      </div>
    </Link>
  );
}
