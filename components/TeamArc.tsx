"use client";

import Link from "next/link";
import MemberPhoto from "@/components/MemberPhoto";
import { useApp } from "@/components/providers/AppProviders";
import type { Member } from "@/lib/members";

function TeamMemberCard({ member }: { member: Member }) {
  return (
    <Link
      href={`/members/${member.slug}`}
      title={member.name}
      className="group block w-[132px] shrink-0 snap-center"
    >
      <div className="flex h-[196px] w-[132px] flex-col overflow-hidden rounded-2xl border border-paper-line/80 bg-navy-deep text-center ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-12px_rgba(8,20,38,0.55)] group-hover:ring-2 group-hover:ring-gold dark:border-navy-line">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <MemberPhoto
            initials={member.initials}
            photoUrl={member.photo}
            size="sm"
            className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="shrink-0 px-2 py-2">
          <p className="text-[10px] font-semibold leading-[13px] text-paper">
            {member.name}
          </p>
          <p className="mt-1 text-[7.5px] font-semibold uppercase leading-[11px] tracking-[0.12em] text-gold-light">
            {member.role}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function TeamArc({ members }: { members: Member[] }) {
  const { t } = useApp();

  return (
    <section className="overflow-hidden border-t border-paper-line bg-[#f2efe6] py-12 dark:border-navy-line dark:bg-navy-deep lg:py-16">
      <div className="flex snap-x gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {members.map((member) => (
          <TeamMemberCard key={member.slug} member={member} />
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-2xl px-4 text-center md:mt-2">
        <span className="inline-block rounded-full bg-paper-chip px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-inkc-sub dark:bg-navy-card dark:text-gold-light">
          {t("home.members.overline")}
        </span>
        <h2 className="mt-5 text-3xl font-bold leading-[1.1] text-navy dark:text-paper md:text-4xl lg:text-5xl">
          {t("home.members.title1")}
          <br />
          <span className="font-medium text-inkc-sub dark:text-paper-line/70">
            {t("home.members.title2")}
          </span>
        </h2>
        <Link
          href="/members"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-gold-light shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl dark:bg-navy-card dark:ring-1 dark:ring-gold/30"
        >
          {t("home.members.link")}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
