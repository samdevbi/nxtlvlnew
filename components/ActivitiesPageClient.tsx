"use client";

import { useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import BookCard from "@/components/BookCard";
import Chip from "@/components/Chip";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";
import uz from "@/locales/uz.json";
import en from "@/locales/en.json";

type Tab = "books" | "sport" | "hobby";

const TABS: Tab[] = ["books", "sport", "hobby"];
const SPORT_KEYS = ["football", "running"] as const;

type BooksData = {
  current: {
    title: string;
    author: string;
    note: { uz: string; en: string };
    progressPercent: number;
    chapter: number;
    totalChapters: number;
  };
  finishedCount: number;
  finished: { title: string; author: string }[];
};

function BooksTab({ books }: { books: BooksData }) {
  const { t, locale } = useApp();
  const { current } = books;

  return (
    <>
      {/* Hozir o'qilmoqda */}
      <section className="pt-8">
        <Reveal>
          <SectionLabel>{t("activities.reading")}</SectionLabel>
          <div className="clip-cut mt-4 grid max-w-2xl grid-cols-[100px_1fr] items-center gap-5 border border-paper-line bg-paper-chip p-5 dark:border-navy-line dark:bg-navy-card md:grid-cols-[120px_1fr] md:gap-6 md:p-6">
            <BookCard title={current.title} author={current.author} className="hover:translate-y-0" />
            <div>
              <h2 className="font-display text-2xl md:text-3xl">{current.title}</h2>
              <p className="mt-1 text-overline font-semibold uppercase tracking-[2px] text-gold-ink dark:text-gold-light">
                {current.author}
              </p>
              <p className="mt-2.5 text-detail leading-relaxed text-inkc-sub dark:text-paper-line/80">
                {current.note[locale]}
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper-line dark:bg-navy-line">
                <div
                  className="h-full rounded-full bg-gold-btn transition-all duration-500"
                  style={{ width: `${current.progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-overline font-semibold uppercase tracking-[2px] text-gold-ink dark:text-gold-light">
                {current.progressPercent}% · {current.chapter}-{t("activities.chapter")} / {current.totalChapters}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* O'qilgan kitoblar */}
      <section className="pb-12 pt-10 lg:pb-20">
        <Reveal>
          <SectionLabel>
            {t("activities.finished")} — {books.finishedCount} {t("activities.booksWord")}
          </SectionLabel>
        </Reveal>
        <div className="mt-5 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
          {books.finished.map((book, i) => (
            <Reveal key={book.title} delay={(i % 3) * 70}>
              <BookCard title={book.title} author={book.author} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function SportTab() {
  const { t } = useApp();

  return (
    <section className="pb-12 pt-8 lg:pb-20">
      <Reveal>
        <SectionLabel>{t("activities.tabs.sport")}</SectionLabel>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">
          {t("activities.sportTitle")}
        </h2>
      </Reveal>
      <div className="mt-6 flex max-w-2xl flex-col gap-4">
        {SPORT_KEYS.map((key, i) => (
          <Reveal key={key} delay={i * 80}>
            <div className="clip-cut flex items-center gap-4 border border-paper-line bg-paper-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/10 dark:border-navy-line dark:bg-navy-card dark:hover:shadow-black/40">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-ink dark:text-gold-light">
                {key === "football" ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5 8.2 10.3l1.5 4.4h4.6l1.5-4.4L12 7.5Zm0-4v4M5 9l3.2 1.3M19 9l-3.2 1.3M7.3 19.5l2.4-4.8M16.7 19.5l-2.4-4.8" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="5" r="1.8" />
                    <path d="M13.5 8.5 9.5 12l3 2.5-2 5M13.5 8.5l3 2.5 3-1M13.5 8.5l-4-1-3 2.5M8 17.5l-2.5 2" />
                  </svg>
                )}
              </span>
              <span>
                <h3 className="text-base font-semibold">
                  {t(`activities.sportItems.${key}.title`)}
                </h3>
                <p className="mt-0.5 text-overline font-semibold uppercase tracking-[2px] text-gold-ink dark:text-gold-light">
                  {t(`activities.sportItems.${key}.schedule`)}
                </p>
                <p className="mt-1 text-detail text-inkc-sub dark:text-paper-line/80">
                  {t(`activities.sportItems.${key}.note`)}
                </p>
              </span>
            </div>
          </Reveal>
        ))}
        <Reveal delay={200}>
          <PhotoPlaceholder
            aspect="aspect-[5/2]"
            silhouette="group"
            label={t("activities.sportPhoto")}
          />
        </Reveal>
      </div>
    </section>
  );
}

function HobbyTab() {
  const { t, locale } = useApp();
  const chips = (locale === "uz" ? uz : en).activities.hobbyChips as string[];

  return (
    <section className="pb-12 pt-8 lg:pb-20">
      <Reveal>
        <SectionLabel>{t("activities.tabs.hobby")}</SectionLabel>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">
          {t("activities.hobbyTitle")}
        </h2>
        <div className="mt-5 flex max-w-2xl flex-wrap gap-2">
          {chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </Reveal>
      <div className="mt-6 grid max-w-2xl grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <Reveal key={i} delay={i * 80}>
            <PhotoPlaceholder aspect="aspect-[16/10]" silhouette="group" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function ActivitiesPageClient({ books }: { books: BooksData }) {
  const { t } = useApp();
  const [tab, setTab] = useState<Tab>("books");

  return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
        {/* ===== Sarlavha + tablar ===== */}
        <section className="pt-10 lg:pt-16">
          <Reveal>
            <SectionLabel>{t("activities.overline")}</SectionLabel>
            <h1 className="mt-4 font-display text-5xl first-letter:text-gold-ink dark:first-letter:text-gold-light md:text-6xl">
              {t("activities.title")}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <div
              role="tablist"
              className="mt-7 flex gap-7 border-b border-paper-line dark:border-navy-line"
            >
              {TABS.map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`-mb-px border-b-2 pb-2.5 text-sm font-semibold transition-colors ${
                    tab === key
                      ? "border-gold text-inkc dark:text-paper"
                      : "border-transparent text-inkc-sub hover:text-gold-ink dark:text-paper-line/70 dark:hover:text-gold-light"
                  }`}
                >
                  {t(`activities.tabs.${key}`)}
                </button>
              ))}
            </div>
          </Reveal>
        </section>

        {tab === "books" && <BooksTab books={books} />}
        {tab === "sport" && <SportTab />}
        {tab === "hobby" && <HobbyTab />}
      </main>
  );
}
