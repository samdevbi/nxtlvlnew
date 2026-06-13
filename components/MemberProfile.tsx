"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";
import Chip from "@/components/Chip";
import Timeline from "@/components/Timeline";
import MemberPhoto from "@/components/MemberPhoto";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";
import type { Member } from "@/lib/members";

export default function MemberProfile({ member }: { member: Member }) {
  const { t, locale } = useApp();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
        {/* Orqaga */}
        <div className="pt-6 lg:pt-10">
          <Link
            href="/members"
            className="inline-flex items-center gap-1.5 text-sm text-inkc-sub transition-colors hover:text-gold-ink dark:text-paper-line dark:hover:text-gold-light"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5 8 12l7 7" />
            </svg>
            {t("members.back")}
          </Link>
        </div>

        {/* ===== Foto + ism ===== */}
        <section className="grid gap-6 pb-10 pt-5 lg:grid-cols-[2fr_3fr] lg:items-end lg:gap-12 lg:pb-16">
          <Reveal>
            <div className="clip-cut relative aspect-[4/3] overflow-hidden bg-navy-deep lg:aspect-[4/5]">
              <MemberPhoto initials={member.initials} size="lg" className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl md:text-5xl">{member.name}</h1>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[2.5px] text-gold-ink dark:text-gold-light">
              {member.role}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1.5 text-sm text-inkc-sub dark:text-paper-line">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {member.location}
              </span>
              <span className="text-sm text-inkc-sub dark:text-paper-line">
                {t("members.age")} — {member.age}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
                <a
                  href={member.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-line text-inkc-sub transition-colors hover:border-gold hover:text-gold-ink dark:border-navy-line dark:text-paper-line dark:hover:border-gold dark:hover:text-gold-light"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M21.5 4.5 2.9 11.7c-1 .4-1 1.2-.2 1.4l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2 1-.5l2.3-2.3 4.9 3.6c.9.5 1.5.2 1.7-.8l3.2-15c.3-1.3-.5-1.9-1.8-1.5ZM8.7 14.6l9.8-6.2c.5-.3.9-.1.5.2l-8.3 7.5-.3 3.4-1.7-4.9Z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${member.email}`}
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-line text-inkc-sub transition-colors hover:border-gold hover:text-gold-ink dark:border-navy-line dark:text-paper-line dark:hover:border-gold dark:hover:text-gold-light"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                    <path d="m4.5 7 7.5 6 7.5-6" />
                  </svg>
                </a>
            </div>
          </Reveal>
        </section>

        <hr className="border-paper-line dark:border-navy-line" />

        {/* ===== Bio ===== */}
        <section className="py-8 lg:py-12">
          <Reveal>
            <SectionLabel>{t("members.bio")}</SectionLabel>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-inkc-sub dark:text-paper-line/90">
              {member.bio[locale]}
            </p>
          </Reveal>
        </section>

        {/* ===== Ta'lim ===== */}
        <section className="pb-8 lg:pb-12">
          <Reveal>
            <SectionLabel>{t("members.education")}</SectionLabel>
          </Reveal>
          <div className="mt-4 flex max-w-2xl flex-col gap-3">
            {member.education.map((edu, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="clip-cut flex items-start border border-paper-line bg-paper-card px-5 py-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10 dark:border-navy-line dark:bg-navy-card dark:hover:shadow-black/40">
                  <span className="mt-0.5 w-[6.75rem] shrink-0 font-display text-lg leading-none text-gold-ink dark:text-gold-light">
                    {t(`members.degrees.${edu.degree}`)}
                  </span>
                  <div className="min-w-0 flex-1 pl-[10px]">
                    <h3 className="text-sm font-semibold">{edu.field}</h3>
                    <p className="mt-0.5 text-xs text-inkc-sub dark:text-paper-line/80">
                      {edu.university}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-inkc-sub/80 dark:text-paper-line/60">
                      {edu.period[locale]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Tajriba ===== */}
        <section className="pb-8 lg:pb-12">
          <Reveal>
            <SectionLabel>{t("members.experience")}</SectionLabel>
          </Reveal>
          <div className="mt-4 flex max-w-2xl flex-col gap-3">
            {member.experience.map((exp, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="clip-cut flex items-center gap-3.5 border border-paper-line bg-paper-card px-5 py-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10 dark:border-navy-line dark:bg-navy-card dark:hover:shadow-black/40">
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <span>
                    <h3 className="text-sm font-semibold">{exp.title}</h3>
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-inkc-sub dark:text-paper-line/80">
                      {exp.period[locale]}
                    </p>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Ko'nikmalar ===== */}
        <section className="pb-8 lg:pb-12">
          <Reveal>
            <SectionLabel>{t("members.skills")}</SectionLabel>
            <div className="mt-4 flex max-w-2xl flex-wrap gap-2">
              {member.skills.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ===== Natijalar timeline ===== */}
        <section className="pb-8 lg:pb-12">
          <Reveal>
            <SectionLabel>{t("members.results")}</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <Timeline
              className="mt-6 max-w-xl"
              items={member.results.map((result) => ({
                label: result.label[locale],
                content: result.text[locale],
              }))}
            />
          </Reveal>
        </section>

        <hr className="border-paper-line dark:border-navy-line" />

        {/* ===== Kitoblar ===== */}
        <section className="py-8 lg:py-12">
          <Reveal>
            <SectionLabel>{t("members.books")}</SectionLabel>
            <ul className="mt-4 flex max-w-2xl flex-col gap-3">
              {member.books.map((book) => (
                <li key={book} className="flex items-center gap-3 text-[15px]">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="h-[18px] w-[18px] shrink-0 text-gold-ink dark:text-gold-light"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 4.5h11A2.5 2.5 0 0 1 18.5 7v12.5H7A2 2 0 0 1 5 17.5v-13Zm0 12h13.5M8 4.5v12" />
                  </svg>
                  {book}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ===== Sport & hobbi ===== */}
        <section className="pb-12 lg:pb-20">
          <Reveal>
            <SectionLabel>{t("members.hobbies")}</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {member.hobbies.map((hobby) => (
                <Chip key={hobby.uz}>{hobby[locale]}</Chip>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
