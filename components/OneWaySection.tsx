"use client";

import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";

const QUADRANTS = [
  { key: "running", align: "left" as const, pos: "tl" as const },
  { key: "hiking", align: "right" as const, pos: "tr" as const },
  { key: "gym", align: "left" as const, pos: "bl" as const },
  { key: "health", align: "right" as const, pos: "br" as const },
];

/** SWOT uslubidagi radial diagramma — markazda NXTLVL, 4 burchak */
export default function OneWaySection() {
  const { t } = useApp();

  return (
    <section className="border-t border-paper-line bg-paper dark:border-navy-line dark:bg-navy-deep">
      <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 lg:py-20">
        <Reveal>
          <div className="flex justify-center">
            <span className="rounded-md bg-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-paper dark:bg-navy-card">
              {t("home.oneWay.badge")}
            </span>
          </div>
        </Reveal>

        {/* Radial diagramma — mobil va desktop bir xil */}
        <div className="relative mx-auto mt-10 min-h-[480px] md:min-h-[660px] lg:min-h-[720px]">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full text-inkc/25 dark:text-paper-line/30"
            viewBox="0 0 1000 580"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <circle cx="500" cy="290" r="88" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="412" cy="202" r="4" fill="currentColor" />
            <path d="M412 202 H155 L155 52" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="588" cy="202" r="4" fill="currentColor" />
            <path d="M588 202 H845 L845 52" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="412" cy="378" r="4" fill="currentColor" />
            <path d="M412 378 H175 L175 485" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="588" cy="378" r="4" fill="currentColor" />
            <path d="M588 378 H825 L825 485" stroke="currentColor" strokeWidth="1.2" />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy shadow-lg md:h-[108px] md:w-[108px] dark:bg-navy-card">
              <span className="text-overline font-bold uppercase tracking-[0.18em] text-paper md:text-sm md:tracking-[0.22em]">
                {t("home.oneWay.center")}
              </span>
            </div>
          </div>

          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8 md:gap-x-10 md:gap-y-14">
            {QUADRANTS.map((q, i) => (
              <Reveal key={q.key} delay={i * 100} className={quadrantCell(q.pos)}>
                <QuadrantBlock
                  title={t(`home.oneWay.items.${q.key}.title`)}
                  subtopic={t(`home.oneWay.items.${q.key}.subtopic`)}
                  text={t(`home.oneWay.items.${q.key}.text`)}
                  align={q.align}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function quadrantCell(pos: "tl" | "tr" | "bl" | "br") {
  const map = {
    tl: "flex items-start justify-start pt-0 pl-0 md:pl-2",
    tr: "flex items-start justify-end pt-0 pr-0 md:pr-2",
    bl: "flex items-end justify-start pb-2 pl-0 md:pl-4",
    br: "flex items-end justify-end pb-2 pr-0 md:pr-4",
  };
  return map[pos];
}

function QuadrantBlock({
  title,
  subtopic,
  text,
  align,
}: {
  title: string;
  subtopic: string;
  text: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`max-w-[120px] sm:max-w-[160px] md:max-w-[220px] lg:max-w-[260px] ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <h3 className="text-lg font-bold text-inkc dark:text-paper md:text-2xl lg:text-3xl">
        {title}
      </h3>
      <p className="mt-1 text-xs font-medium text-inkc-sub md:text-sm dark:text-paper-line/80">
        {subtopic}
      </p>
      <p className="mt-2 text-overline leading-relaxed text-inkc-sub/90 md:text-detail dark:text-paper-line/70">
        {text}
      </p>
    </div>
  );
}
