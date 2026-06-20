"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import CutCard from "@/components/CutCard";
import Countdown from "@/components/Countdown";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";
import { pickLocalized } from "@/lib/localized";
import type { ArchiveMeeting, NextMeeting } from "@/lib/meetings";

type Props =
  | { kind: "archive"; meeting: ArchiveMeeting }
  | { kind: "next"; meeting: NextMeeting };

function InfoRow({ icon, children }: { icon: JSX.Element; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2.5 text-sm text-paper-line/90">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-gold-light"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
      {children}
    </span>
  );
}

export default function MeetingDetail(props: Props) {
  const { t, locale } = useApp();
  const { meeting } = props;
  const isArchive = props.kind === "archive";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
        {/* Orqaga */}
        <div className="pt-6 lg:pt-10">
          <Link
            href="/meetings"
            className="inline-flex items-center gap-1.5 text-sm text-inkc-sub transition-colors hover:text-gold-ink dark:text-paper-line dark:hover:text-gold-light"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5 8 12l7 7" />
            </svg>
            {t("meetings.back")}
          </Link>
        </div>

        {/* ===== Hero karta ===== */}
        <section className="pb-10 pt-5 lg:pb-14">
          <Reveal>
            <CutCard variant="navy" className="max-w-2xl p-6 lg:p-8">
              <p className="text-overline font-semibold uppercase tracking-[3px] text-gold-light">
                {t("meetings.meeting")} #{meeting.number}
              </p>
              <h1 className="mt-3 font-display text-3xl text-paper md:text-4xl">
                {meeting.title}
              </h1>

              <div className="mt-5 flex flex-col gap-2.5">
                <InfoRow
                  icon={
                    <>
                      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
                      <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
                    </>
                  }
                >
                  {isArchive
                    ? pickLocalized(props.meeting.dateLong, locale)
                    : pickLocalized(props.meeting.dateLabel, locale)}{" "}
                  · {meeting.timeRange}
                </InfoRow>
                <InfoRow
                  icon={
                    <>
                      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </>
                  }
                >
                  {meeting.location}
                </InfoRow>
                {isArchive && (
                  <InfoRow
                    icon={
                      <>
                        <circle cx="9" cy="8" r="3.2" />
                        <path d="M3.5 19c.7-3.8 3-5.7 5.5-5.7s4.8 1.9 5.5 5.7M15 5.6a3.2 3.2 0 0 1 0 4.8M17.5 13.6c1.6.8 2.7 2.3 3 5.4" />
                      </>
                    }
                  >
                    {props.meeting.attendance} {t("meetings.attended")}
                  </InfoRow>
                )}
              </div>

              {isArchive ? (
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 px-4 py-1.5 text-overline font-semibold uppercase tracking-[2px] text-gold-light">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                  {t("meetings.finished")}
                </span>
              ) : (
                <>
                  <Countdown iso={props.meeting.iso} className="mt-6" />
                  <Button
                    variant="gold"
                    href="https://t.me/nxtlvladmin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6"
                  >
                    {t("meetings.attend")}
                  </Button>
                </>
              )}
            </CutCard>
          </Reveal>
        </section>

        {/* ===== Speaker ===== */}
        <section className="pb-8 lg:pb-12">
          <Reveal>
            <SectionLabel>{t("meetings.speaker")}</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <Link
              href={`/members/${meeting.speaker.slug}`}
              className="clip-cut group mt-4 flex max-w-2xl items-center gap-4 border border-paper-line bg-paper-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 dark:border-navy-line dark:bg-navy-card dark:hover:shadow-black/40"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-gold-light ring-1 ring-gold/40 dark:bg-navy-deep">
                {meeting.speaker.initials}
              </span>
              <span className="flex-1">
                <h3 className="text-base font-semibold">{meeting.speaker.name}</h3>
                <p className="mt-0.5 text-overline font-semibold uppercase tracking-[2px] text-gold-ink dark:text-gold-light">
                  {meeting.speaker.role}
                </p>
              </span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-4 w-4 text-inkc-sub transition-colors group-hover:text-gold-ink dark:text-paper-line dark:group-hover:text-gold-light"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </Link>
          </Reveal>
        </section>

        {/* ===== Mavzular ===== */}
        <section className="pb-8 lg:pb-12">
          <Reveal>
            <SectionLabel>{t("meetings.topics")}</SectionLabel>
            <ul className="mt-4 flex max-w-2xl flex-col gap-3">
              {meeting.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 text-lead leading-relaxed">
                  <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-gold" />
                  {pickLocalized(topic, locale)}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {isArchive && (
          <>
            {/* ===== Slaydlar ===== */}
            <section className="pb-8 lg:pb-12">
              <Reveal>
                <a
                  href={props.meeting.slides.url}
                  className="clip-cut group flex max-w-2xl items-center gap-4 bg-paper-chip p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10 dark:bg-navy-card dark:hover:shadow-black/40"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="h-6 w-6 shrink-0 text-gold-ink dark:text-gold-light"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5l-5-5Z" />
                    <path d="M13.5 3.5v5h5M9 13h6M9 16.5h4" />
                  </svg>
                  <span className="flex-1">
                    <h3 className="text-sm font-semibold">{t("meetings.slides")}</h3>
                    <p className="mt-0.5 text-xs text-inkc-sub dark:text-paper-line/80">
                      PDF · {props.meeting.slides.pages} {t("meetings.pages")}
                    </p>
                  </span>
                  <span className="text-sm font-semibold text-gold-ink transition-colors group-hover:text-gold dark:text-gold-light">
                    {t("meetings.open")}
                  </span>
                </a>
              </Reveal>
            </section>

            {/* ===== Xulosalar ===== */}
            <section className="pb-8 lg:pb-12">
              <Reveal>
                <SectionLabel>{t("meetings.takeaways")}</SectionLabel>
              </Reveal>
              <div className="mt-4 flex max-w-2xl flex-col gap-3">
                {props.meeting.takeaways.map((takeaway, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <CutCard className="flex items-start gap-4 p-5 hover:translate-y-0 hover:shadow-none">
                      <span className="font-display text-2xl leading-none text-gold-ink dark:text-gold-light">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base leading-relaxed">{pickLocalized(takeaway, locale)}</p>
                    </CutCard>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ===== Galereya ===== */}
            <section className="pb-12 lg:pb-20">
              <Reveal>
                <SectionLabel>{t("meetings.gallery")}</SectionLabel>
              </Reveal>
              <div className="mt-4 grid max-w-2xl grid-cols-2 gap-4">
                {Array.from({ length: props.meeting.galleryCount }).map((_, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <PhotoPlaceholder aspect="aspect-[16/10]" silhouette="group" />
                  </Reveal>
                ))}
              </div>
            </section>
          </>
        )}

        {!isArchive && <div className="pb-12 lg:pb-20" />}
      </main>

      <Footer />
    </div>
  );
}
