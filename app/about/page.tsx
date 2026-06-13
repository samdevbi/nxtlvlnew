"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";
import CutCard from "@/components/CutCard";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";

const VALUE_KEYS = ["reading", "discipline", "circle", "honesty", "sport", "health"] as const;
const HISTORY_KEYS = ["y2023", "y2024", "y2025", "y2026"] as const;
const FORMAT_KEYS = [
  "checkin",
  "weeklyAnalysis",
  "presentation",
  "presentationReview",
  "industryNews",
  "nextGoals",
] as const;
const RULE_KEYS = ["attend", "sport", "respect", "growth"] as const;

const VALUE_ICONS: Record<(typeof VALUE_KEYS)[number], JSX.Element> = {
  reading: (
    <path d="M12 6.5C10.5 5 8.4 4.5 5.5 4.5c-.8 0-1.5.7-1.5 1.5v11c0 .8.7 1.5 1.5 1.5 2.9 0 5 .5 6.5 2 1.5-1.5 3.6-2 6.5-2 .8 0 1.5-.7 1.5-1.5V6c0-.8-.7-1.5-1.5-1.5-2.9 0-5 .5-6.5 2Zm0 0v14" />
  ),
  discipline: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  circle: (
    <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 19c.5-3 2.5-4.5 5-4.5s4.5 1.5 5 4.5m1-1c.4-1.8 1.6-2.8 3.2-2.8 1.4 0 2.6.8 3.1 2.3" />
  ),
  honesty: (
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
  ),
  sport: <path d="M6.5 9v6M4 10.5v3M17.5 9v6M20 10.5v3M6.5 12h11" />,
  health: (
    <path d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 3.4v.2" />
  ),
};

export default function About() {
  const { t } = useApp();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:px-6 lg:pb-16 lg:pt-16">
          <Reveal>
            <SectionLabel>{t("about.hero.overline")}</SectionLabel>
            <h1 className="mt-4 font-display text-[40px] leading-[1.05] md:text-6xl">
              {t("about.hero.titleStart")}
              <br />
              <span className="text-gold-ink dark:text-gold-light">
                {t("about.hero.titleGold")}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-inkc-sub dark:text-paper-line/90">
              {t("about.hero.text")}
            </p>
          </Reveal>
        </section>

        {/* ===== Missiya ===== */}
        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:pb-16">
          <Reveal>
            <CutCard variant="navy" className="p-7 lg:p-10">
              <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[3px] text-gold-light">
                <span aria-hidden className="h-px w-[18px] bg-gold" />
                {t("about.mission.overline")}
              </p>
              <p className="mt-4 max-w-2xl font-display text-2xl leading-snug text-paper md:text-3xl">
                {t("about.mission.text")}
              </p>
            </CutCard>
          </Reveal>
        </section>

        {/* ===== Qadriyatlar ===== */}
        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:pb-16">
          <Reveal>
            <SectionLabel>{t("about.values.overline")}</SectionLabel>
          </Reveal>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:gap-6">
            {VALUE_KEYS.map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <CutCard className="flex h-full items-center gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-ink dark:text-gold-light">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {VALUE_ICONS[key]}
                    </svg>
                  </span>
                  <span>
                    <h3 className="font-sans text-base font-semibold">
                      {t(`about.values.items.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-[13px] leading-snug text-inkc-sub dark:text-paper-line/80">
                      {t(`about.values.items.${key}.text`)}
                    </p>
                  </span>
                </CutCard>
              </Reveal>
            ))}
          </div>
        </section>

        <hr className="mx-auto max-w-6xl border-paper-line dark:border-navy-line" />

        {/* ===== Qisqa tarix ===== */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-16">
          <Reveal>
            <SectionLabel>{t("about.history.overline")}</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <Timeline
              className="mt-6 max-w-xl"
              items={HISTORY_KEYS.map((key) => ({
                label: t(`about.history.items.${key}.label`),
                content: t(`about.history.items.${key}.text`),
              }))}
            />
          </Reveal>
        </section>

        <hr className="mx-auto max-w-6xl border-paper-line dark:border-navy-line" />

        {/* ===== Meeting formati ===== */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-16">
          <Reveal>
            <SectionLabel>{t("about.format.overline")}</SectionLabel>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              {t("about.format.title")}
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-6">
            {FORMAT_KEYS.map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <CutCard className="flex h-full items-start gap-5 p-5 lg:p-6">
                  <span className="font-display text-3xl leading-none text-gold-ink dark:text-gold-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <h3 className="font-sans text-base font-semibold">
                      {t(`about.format.steps.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-[13px] leading-snug text-inkc-sub dark:text-paper-line/80">
                      {t(`about.format.steps.${key}.text`)}
                    </p>
                  </span>
                </CutCard>
              </Reveal>
            ))}
          </div>
        </section>

        <hr className="mx-auto max-w-6xl border-paper-line dark:border-navy-line" />

        {/* ===== Club qoidalari ===== */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-16">
          <Reveal>
            <SectionLabel>{t("about.rules.overline")}</SectionLabel>
          </Reveal>
          <ul className="mt-6 grid gap-3.5 md:grid-cols-2 md:gap-x-12">
            {RULE_KEYS.map((key, i) => (
              <Reveal key={key} delay={i * 60}>
                <li className="flex items-start gap-3 text-[15px] leading-relaxed">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink dark:text-gold-light"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                  {t(`about.rules.items.${key}`)}
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
