"use client";

import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";

const STEP_COUNT = 10;
const TOP_STEPS = [1, 2, 3, 4, 5];
const BOTTOM_BY_COL = [10, 9, 8, 7, 6];

/** SVG path bilan mos: yuqori markaz 24px, pastki markaz 200px */
const TOP_CY = 24;
const BOT_CY = 200;
const CIRCLE = 36;

function padStep(n: number) {
  return String(n).padStart(2, "0");
}

function StepCircle({ step }: { step: number }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-inkc text-xs font-bold text-paper dark:bg-paper dark:text-inkc">
      {padStep(step)}
    </div>
  );
}

function StepLabel({ step, centered = false }: { step: number; centered?: boolean }) {
  const { t } = useApp();
  return (
    <p
      className={`text-[11px] leading-snug text-inkc-sub dark:text-paper-line/80 xl:text-xs ${
        centered ? "text-center" : "text-left"
      }`}
    >
      {t(`home.howItWorks.steps.${step}`)}
    </p>
  );
}

const CENTERED_STEPS = new Set([1, 6, 7, 9, 10]);

function TimelineColumn({
  topStep,
  bottomStep,
  delay,
}: {
  topStep: number;
  bottomStep: number;
  delay: number;
}) {
  const topCircleTop = TOP_CY - CIRCLE / 2;
  const bottomCircleTop = BOT_CY - CIRCLE / 2;
  const connectorTop = topCircleTop + CIRCLE;
  const topTextTop = connectorTop + 10;
  const bottomConnectorTop = bottomCircleTop + CIRCLE;
  const topCentered = CENTERED_STEPS.has(topStep);
  const bottomCentered = CENTERED_STEPS.has(bottomStep);

  return (
    <Reveal delay={delay}>
      <div className="relative h-[300px] w-full">
        {/* Yuqori aylana — yuqori chiziq ustida */}
        <div
          className="absolute left-1/2 z-10 -translate-x-1/2"
          style={{ top: topCircleTop }}
        >
          <StepCircle step={topStep} />
        </div>

        {/* Nuqtali vertikal chiziq */}
        <div
          className="absolute left-1/2 w-px -translate-x-1/2 border-l border-dashed border-inkc/40 dark:border-paper-line/50"
          style={{ top: connectorTop, height: 10 }}
        />

        {/* Yuqori matn — ikki chiziq orasida */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 px-0.5 ${
            topCentered ? "w-auto max-w-[9rem] xl:max-w-[10rem]" : "w-[8.75rem] xl:w-[10rem]"
          }`}
          style={{ top: topTextTop }}
        >
          <StepLabel step={topStep} centered={topCentered} />
        </div>

        {/* Pastki aylana — pastki chiziq ustida */}
        <div
          className="absolute left-1/2 z-10 -translate-x-1/2"
          style={{ top: bottomCircleTop }}
        >
          <StepCircle step={bottomStep} />
        </div>

        <div
          className="absolute left-1/2 w-px -translate-x-1/2 border-l border-dashed border-inkc/40 dark:border-paper-line/50"
          style={{ top: bottomConnectorTop, height: 10 }}
        />

        {/* Pastki matn — pastki chiziqdan pastda */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 px-0.5 ${
            bottomCentered ? "w-auto max-w-[9rem] xl:max-w-[10rem]" : "w-[8.75rem] xl:w-[10rem]"
          }`}
          style={{ top: bottomConnectorTop + 10 }}
        >
          <StepLabel step={bottomStep} centered={bottomCentered} />
        </div>
      </div>
    </Reveal>
  );
}

function DesktopSnake() {
  return (
    <div className="relative mx-auto hidden w-full max-w-6xl px-6 lg:block xl:px-10">
      {/* Snake path — chap egri, o'ng U-burilish */}
      <svg
        viewBox="0 0 1100 224"
        className="pointer-events-none absolute inset-x-6 top-0 h-[224px] text-inkc xl:inset-x-10 dark:text-paper-line/70"
        fill="none"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d="M 8 88 C 8 24 52 24 96 24 H 1004 A 44 44 0 0 1 1048 68 V 156 A 44 44 0 0 1 1004 200 H 96 C 52 200 8 200 8 136"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative grid grid-cols-5 gap-x-6 xl:gap-x-10">
        {TOP_STEPS.map((topStep, col) => (
          <TimelineColumn
            key={topStep}
            topStep={topStep}
            bottomStep={BOTTOM_BY_COL[col]}
            delay={col * 60}
          />
        ))}
      </div>
    </div>
  );
}

function MobileTimeline() {
  const { t } = useApp();

  return (
    <div className="relative mx-auto max-w-md px-6 lg:hidden">
      <div
        aria-hidden
        className="absolute bottom-4 left-[2.65rem] top-4 w-px border-l border-dashed border-inkc/35 dark:border-paper-line/50"
      />
      <ol className="flex flex-col gap-8">
        {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map((step, i) => (
          <Reveal key={step} delay={i * 50}>
            <li className="flex gap-4">
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-inkc text-xs font-bold text-paper dark:bg-paper dark:text-inkc">
                {padStep(step)}
              </div>
              <p className="pt-1.5 text-sm leading-snug text-inkc-sub dark:text-paper-line/80">
                {t(`home.howItWorks.steps.${step}`)}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useApp();

  return (
    <section className="border-t border-paper-line bg-[#f2efe6] py-12 dark:border-navy-line dark:bg-navy-deep lg:py-16">
      <Reveal>
        <h2 className="text-center font-display text-3xl text-inkc dark:text-paper md:text-4xl lg:text-5xl">
          {t("home.howItWorks.title")}
        </h2>
      </Reveal>

      <div className="mt-10 lg:mt-14">
        <DesktopSnake />
        <MobileTimeline />
      </div>
    </section>
  );
}
