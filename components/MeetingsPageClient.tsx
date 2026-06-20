"use client";

import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import CutCard from "@/components/CutCard";
import Countdown from "@/components/Countdown";
import MeetingCard from "@/components/MeetingCard";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";
import type { ArchiveMeeting, NextMeeting } from "@/lib/meetings";

export default function MeetingsPageClient({
  nextMeeting,
  archiveMeetings,
}: {
  nextMeeting: NextMeeting | null;
  archiveMeetings: ArchiveMeeting[];
}) {
  const { t, locale, settings } = useApp();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
      <section className="pb-8 pt-10 lg:pt-16">
        <Reveal>
          <SectionLabel>{t("meetings.overline")}</SectionLabel>
          <h1 className="mt-4 font-display text-5xl first-letter:text-gold-ink dark:first-letter:text-gold-light md:text-6xl">
            {t("meetings.title")}
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-inkc-sub dark:text-paper-line/90">
            {t("meetings.subtitle")}
          </p>
        </Reveal>
      </section>

      {nextMeeting && (
        <section className="pb-10 lg:pb-16">
          <Reveal>
            <CutCard variant="navy" className="max-w-2xl p-6 lg:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[3px] text-gold-light">{t("meetings.next")}</p>
              <h2 className="mt-3 font-display text-3xl text-paper">{nextMeeting.title}</h2>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper-line/90">
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
                    <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
                  </svg>
                  {nextMeeting.dateLabel[locale]} · {nextMeeting.time}
                </span>
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {nextMeeting.location}
                </span>
              </div>
              <Countdown iso={nextMeeting.iso} className="mt-6" />
              <Button variant="gold" href={settings.telegram} target="_blank" rel="noopener noreferrer" className="mt-6">
                {t("meetings.attend")}
              </Button>
            </CutCard>
          </Reveal>
        </section>
      )}

      <hr className="border-paper-line dark:border-navy-line" />

      <section className="py-10 lg:py-16">
        <Reveal>
          <SectionLabel>
            {t("meetings.archive")} — {archiveMeetings.length} {t("meetings.meeting")}
          </SectionLabel>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {archiveMeetings.map((meeting, i) => (
            <Reveal key={meeting.slug} delay={i * 80}>
              <MeetingCard meeting={meeting} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
