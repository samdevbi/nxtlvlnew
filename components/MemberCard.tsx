"use client";

import Link from "next/link";
import MemberPhoto from "@/components/MemberPhoto";
import type { Member } from "@/lib/members";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <Link
      href={`/members/${member.slug}`}
      className="clip-cut group flex aspect-[3/4] flex-col overflow-hidden border border-paper-line bg-navy-deep text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/15 dark:border-navy-line dark:hover:shadow-black/40"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <MemberPhoto
          initials={member.initials}
          photoUrl={member.photo}
          size="md"
          className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="shrink-0 px-3 py-3">
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
