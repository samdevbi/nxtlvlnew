"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import CutCard from "@/components/CutCard";
import StatBlock from "@/components/StatBlock";
import Reveal from "@/components/Reveal";
import HeroMountain from "@/components/HeroMountain";
import TeamArc from "@/components/TeamArc";
import OneWaySection from "@/components/OneWaySection";
import HowItWorks from "@/components/HowItWorks";
import Countdown from "@/components/Countdown";
import { useApp } from "@/components/providers/AppProviders";
import meetings from "@/data/meetings.json";

const STATS = [
  { value: "8", key: "home.stats.members" },
  { value: "4", key: "home.stats.meetings" },
  { value: "12", key: "home.stats.sport" },
  { value: "4", key: "home.stats.presentations" },
];

const DIRECTION_ICONS: Record<string, JSX.Element> = {
  meetings: (
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.4c-.6.5-1.3 0-1.3-.7V6.5Z" />
  ),
  books: (
    <path d="M12 6.5C10.5 5 8.4 4.5 5.5 4.5c-.8 0-1.5.7-1.5 1.5v11c0 .8.7 1.5 1.5 1.5 2.9 0 5 .5 6.5 2 1.5-1.5 3.6-2 6.5-2 .8 0 1.5-.7 1.5-1.5V6c0-.8-.7-1.5-1.5-1.5-2.9 0-5 .5-6.5 2Zm0 0v14" />
  ),
  sport: (
    <path d="M6.5 9v6M4 10.5v3M17.5 9v6M20 10.5v3M6.5 12h11" />
  ),
  hobby: (
    <path d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 3.4v.2" />
  ),
};

const DIRECTION_KEYS = ["meetings", "books", "sport", "hobby"] as const;

function NextMeetingCard({ className = "" }: { className?: string }) {
  const { t, locale } = useApp();
  const meeting = meetings.next;

  return (
    <CutCard variant="navy" className={`py-[49px] ${className}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[3px] text-gold-light">
        {t("home.nextMeeting.overline")}
      </p>
      <h3 className="mt-3 font-display text-2xl text-paper">{meeting.title}</h3>

      <div className="mt-4 flex flex-col gap-2 text-sm text-paper-line/90">
        <span className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
            <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
          </svg>
          {meeting.dateLabel[locale]} · {meeting.time}
        </span>
        <span className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {meeting.location}
        </span>
      </div>

      <Countdown iso={meeting.iso} className="mt-5" />

      <div className="mt-5 flex items-center gap-3 border-t border-navy-line pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-xs font-semibold text-gold-light">
          {meeting.speaker.initials}
        </span>
        <span className="text-sm text-paper-line/90">
          {t("home.nextMeeting.speaker")} — {meeting.speaker.shortName}
        </span>
      </div>
    </CutCard>
  );
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink transition-colors hover:text-gold dark:text-gold-light dark:hover:text-gold"
    >
      {children}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </Link>
  );
}

export default function Home() {
  const { t } = useApp();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== Hero (tog' fonida) ===== */}
        <HeroMountain />

        {/* ===== Statistika ===== */}
        <section className="border-y border-paper-line dark:border-navy-line">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-14">
            {/* Mobil: 2×2 grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:hidden">
              {STATS.map((stat, i) => (
                <Reveal key={stat.key} delay={i * 80}>
                  <StatBlock value={stat.value} label={t(stat.key)} />
                </Reveal>
              ))}
            </div>

            {/* Desktop: 4 ta element — orasidagi masofa teng */}
            <div className="hidden w-full items-start justify-between lg:flex">
              {STATS.map((stat, i) => (
                <Reveal key={stat.key} delay={i * 80}>
                  <StatBlock value={stat.value} label={t(stat.key)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Club haqida ===== */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionLabel>{t("home.about.overline")}</SectionLabel>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                {t("home.about.titleStart")}{" "}
                <span className="text-gold-ink dark:text-gold-light">
                  {t("home.about.titleGold")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="lg:self-center">
              <p className="text-[15px] leading-relaxed text-inkc-sub dark:text-paper-line/90">
                {t("home.about.text")}
              </p>
              <div className="mt-4">
                <ArrowLink href="/about">{t("home.about.link")}</ArrowLink>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Yo'nalishlar ===== */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:pb-16">
          <Reveal>
            <SectionLabel>{t("home.directions.overline")}</SectionLabel>
          </Reveal>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {DIRECTION_KEYS.map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <CutCard className="h-full p-5 lg:p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold-ink dark:text-gold-light">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {DIRECTION_ICONS[key]}
                    </svg>
                  </span>
                  <h3 className="mt-4 font-sans text-base font-semibold">
                    {t(`home.directions.items.${key}.title`)}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-inkc-sub dark:text-paper-line/80">
                    {t(`home.directions.items.${key}.text`)}
                  </p>
                </CutCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== How it works ===== */}
        <HowItWorks />

        {/* ===== Keyingi meeting ===== */}
        <section className="mx-auto mt-[50px] max-w-6xl px-4 pb-10 md:px-6 lg:pb-16">
          <Reveal>
            <NextMeetingCard className="mx-auto max-w-2xl" />
          </Reveal>
        </section>

        {/* ===== Jamoa ===== */}
        <TeamArc />

        {/* ===== One way, One Hobby, One Team ===== */}
        <OneWaySection />

        {/* ===== CTA — Ariza topshirish ===== */}
        <section className="relative overflow-hidden bg-navy-grad">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center md:px-6 lg:py-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-paper md:text-4xl lg:text-5xl">
                {t("home.cta.titleStart")}
                <br />
                <span className="text-gold-light">{t("home.cta.titleGold")}</span>
              </h2>
              <Button variant="gold" size="lg" href="/join" className="mt-7">
                {t("home.cta.button")}
              </Button>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
