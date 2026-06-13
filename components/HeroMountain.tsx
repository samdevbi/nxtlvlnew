"use client";

import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";

const IMG_DESKTOP = "/hero-mountain.jpg";
const IMG_MOBILE = "/hero-mountain-mobile.jpg";

export default function HeroMountain() {
  const { t } = useApp();

  return (
    <section className="relative isolate aspect-[950/1300] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[16/9]">
      {/* ===== Qatlam 0: orqa fon rasmi (mobil / desktop) ===== */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-top md:hidden"
        style={{ backgroundImage: `url(${IMG_MOBILE})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 hidden bg-cover bg-top md:block"
        style={{ backgroundImage: `url(${IMG_DESKTOP})` }}
      />
      {/* Osmon qismida matn o'qilishi uchun oqartirgich */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-white/65 via-white/20 to-transparent"
      />

      {/* ===== Qatlam 10: sarlavha (cho'qqi ortida qoladigan) ===== */}
      <div className="absolute inset-x-0 top-[19%] z-10 px-2 text-center sm:top-[22%] md:top-[24%]">
        <Reveal>
          <SectionLabel className="justify-center font-bold !text-navy [&_span]:hidden">
            {t("home.hero.overline")}
          </SectionLabel>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.05] text-navy sm:text-5xl md:whitespace-nowrap md:text-7xl lg:text-8xl">
            {t("home.hero.titleStart")}{" "}
            <span className="text-gold-ink">{t("home.hero.titleGold")}</span>
          </h1>
        </Reveal>
      </div>

      {/* ===== Qatlam 22: pastki blend — keyingi sectionga silliq o'tish ===== */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-b from-transparent to-paper dark:to-navy-deep"
      />

      {/* ===== Qatlam 30: tavsif, tugmalar, scroll belgisi ===== */}
      <div className="absolute inset-x-0 bottom-[7%] z-30 flex flex-col items-center px-4 text-center">
        <Reveal delay={150}>
          <p className="mx-auto max-w-md text-base font-semibold leading-relaxed text-navy md:text-lg">
            {t("home.hero.description")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="primary" href="/join">
              {t("home.hero.join")}
            </Button>
            <Button variant="outline" href="/about">
              {t("home.hero.details")}
            </Button>
          </div>
        </Reveal>

        {/* Scroll belgisi */}
        <div className="mt-8 hidden flex-col items-center gap-2 md:flex">
          <span aria-hidden className="h-9 w-px bg-gold/70" />
          <span className="flex h-7 w-7 animate-bounce items-center justify-center rounded-full border border-gold text-gold-ink">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
