"use client";

import SectionLabel from "@/components/SectionLabel";
import MemberCard from "@/components/MemberCard";
import MemberHeroCarousel from "@/components/MemberHeroCarousel";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";
import type { Member } from "@/lib/members";

export default function MembersPageClient({ members }: { members: Member[] }) {
  const { t } = useApp();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
      <section className="pb-4 pt-10 lg:pt-14">
        <Reveal>
          <SectionLabel>{t("members.overline")}</SectionLabel>
          <h1 className="mt-4 font-display text-5xl first-letter:text-gold-ink dark:first-letter:text-gold-light md:text-6xl">
            {t("members.title")}
          </h1>
        </Reveal>
      </section>
      <MemberHeroCarousel members={members} />
      <section className="pb-4 pt-6">
        <Reveal>
          <p className="max-w-md text-lead leading-relaxed text-inkc-sub dark:text-paper-line/90">
            {t("members.subtitle")}
          </p>
        </Reveal>
      </section>
      <section className="grid grid-cols-2 gap-4 pb-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 lg:pb-20">
        {members.map((member, i) => (
          <Reveal key={member.slug} delay={(i % 4) * 80}>
            <MemberCard member={member} />
          </Reveal>
        ))}
      </section>
    </main>
  );
}
