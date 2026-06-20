"use client";

import { useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import CutCard from "@/components/CutCard";
import Reveal from "@/components/Reveal";
import { useApp } from "@/components/providers/AppProviders";

const BENEFIT_KEYS = ["circle", "knowledge", "growth"] as const;
const REQUIREMENT_KEYS = ["goal", "attend", "read", "respect"] as const;
const STEP_KEYS = ["form", "cv", "interview"] as const;
const FIELD_KEYS = ["name", "phone", "telegram", "profession"] as const;

const BENEFIT_ICONS: Record<(typeof BENEFIT_KEYS)[number], JSX.Element> = {
  circle: (
    <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 19c.5-3 2.5-4.5 5-4.5s4.5 1.5 5 4.5m1-1c.4-1.8 1.6-2.8 3.2-2.8 1.4 0 2.6.8 3.1 2.3" />
  ),
  knowledge: (
    <path d="M12 6.5C10.5 5 8.4 4.5 5.5 4.5c-.8 0-1.5.7-1.5 1.5v11c0 .8.7 1.5 1.5 1.5 2.9 0 5 .5 6.5 2 1.5-1.5 3.6-2 6.5-2 .8 0 1.5-.7 1.5-1.5V6c0-.8-.7-1.5-1.5-1.5-2.9 0-5 .5-6.5 2Zm0 0v14" />
  ),
  growth: <path d="M4 19h16M6 16l4-5 3 2.5L18 8m0 0h-4m4 0v4" />,
};

const inputClasses =
  "w-full rounded-lg border border-paper-line bg-paper-card px-4 py-3 text-sm text-inkc placeholder:text-inkc-sub/60 transition-colors focus:border-gold focus:outline-none dark:border-navy-line dark:bg-navy-card dark:text-paper dark:placeholder:text-paper-line/50";

export default function JoinPage() {
  const { t, settings } = useApp();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    telegram: "",
    profession: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const setField = (key: keyof typeof values) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Xato");
      }
      setSubmitted(true);
      setValues({ name: "", phone: "", telegram: "", profession: "", reason: "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Xato");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
        {/* ===== Hero ===== */}
        <section className="pb-8 pt-10 lg:pt-16">
          <Reveal>
            <SectionLabel>{t("join.overline")}</SectionLabel>
            <h1 className="mt-4 max-w-2xl font-display text-[2.75rem] leading-[1.08] md:text-6xl">
              {t("join.titleStart")}{" "}
              <span className="text-gold-ink dark:text-gold-light">
                {t("join.titleGold")}
              </span>
            </h1>
            <p className="mt-4 max-w-md text-lead leading-relaxed text-inkc-sub dark:text-paper-line/90">
              {t("join.subtitle")}
            </p>
          </Reveal>
        </section>

        <div className="grid gap-10 pb-12 lg:grid-cols-2 lg:gap-16 lg:pb-20">
          {/* ===== Chap ustun: afzalliklar, talablar, qadamlar ===== */}
          <div>
            {/* Nima olasan */}
            <section>
              <Reveal>
                <SectionLabel>{t("join.benefits.overline")}</SectionLabel>
              </Reveal>
              <div className="mt-4 flex flex-col gap-3.5">
                {BENEFIT_KEYS.map((key, i) => (
                  <Reveal key={key} delay={i * 80}>
                    <CutCard className="flex items-center gap-4 p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-ink dark:text-gold-light">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          {BENEFIT_ICONS[key]}
                        </svg>
                      </span>
                      <span>
                        <h3 className="text-base font-semibold">
                          {t(`join.benefits.items.${key}.title`)}
                        </h3>
                        <p className="mt-1 text-detail leading-snug text-inkc-sub dark:text-paper-line/80">
                          {t(`join.benefits.items.${key}.text`)}
                        </p>
                      </span>
                    </CutCard>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Talablar */}
            <section className="pt-10">
              <Reveal>
                <SectionLabel>{t("join.requirements.overline")}</SectionLabel>
                <ul className="mt-4 flex flex-col gap-3">
                  {REQUIREMENT_KEYS.map((key) => (
                    <li key={key} className="flex items-start gap-3 text-lead leading-relaxed">
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
                      {t(`join.requirements.items.${key}`)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            {/* Jarayon — 3 qadam */}
            <section className="pt-10">
              <Reveal>
                <SectionLabel>{t("join.process.overline")}</SectionLabel>
              </Reveal>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {STEP_KEYS.map((key, i) => (
                  <Reveal key={key} delay={i * 80}>
                    <CutCard className="h-full p-4">
                      <span className="font-display text-2xl leading-none text-gold-ink dark:text-gold-light">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2.5 text-detail font-semibold leading-snug">
                        {t(`join.process.steps.${key}`)}
                      </p>
                    </CutCard>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>

          {/* ===== O'ng ustun: ariza formasi ===== */}
          <Reveal delay={150}>
            <form
              onSubmit={handleSubmit}
              className="clip-cut border border-paper-line bg-paper-card p-6 dark:border-navy-line dark:border-b-2 dark:border-b-gold dark:bg-navy-card md:p-8"
            >
              <h2 className="font-display text-3xl">{t("join.form.title")}</h2>
              <p className="mt-1 text-xs text-inkc-sub dark:text-paper-line/70">
                {t("join.form.subtitle")}
              </p>

              <div className="mt-6 flex flex-col gap-5">
                {FIELD_KEYS.map((key) => (
                  <label key={key} className="block">
                    <span className="mb-1.5 block text-overline font-semibold uppercase tracking-[2px] text-inkc-sub dark:text-paper-line/70">
                      {t(`join.form.${key}.label`)}
                    </span>
                    <input
                      type={key === "phone" ? "tel" : "text"}
                      required={key === "name" || key === "phone"}
                      value={values[key]}
                      onChange={(e) => setField(key)(e.target.value)}
                      placeholder={t(`join.form.${key}.placeholder`)}
                      className={inputClasses}
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="mb-1.5 block text-overline font-semibold uppercase tracking-[2px] text-inkc-sub dark:text-paper-line/70">
                    {t("join.form.reason.label")}
                  </span>
                  <textarea
                    rows={3}
                    value={values.reason}
                    onChange={(e) => setField("reason")(e.target.value)}
                    placeholder={t("join.form.reason.placeholder")}
                    className={`${inputClasses} resize-none`}
                  />
                </label>

                {/* CV yuborish */}
                <div>
                  <span className="mb-2 block text-overline font-semibold uppercase tracking-[2px] text-inkc-sub dark:text-paper-line/70">
                    {t("join.form.cv")}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      href={settings.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                        <path d="M21.5 4.5 2.9 11.7c-1 .4-1 1.2-.2 1.4l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2 1-.5l2.3-2.3 4.9 3.6c.9.5 1.5.2 1.7-.8l3.2-15c.3-1.3-.5-1.9-1.8-1.5Z" />
                      </svg>
                      {t("join.form.cvTelegram")}
                    </Button>
                    <Button variant="primary" size="sm" href={`mailto:${settings.email}`}>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                        <path d="m4.5 7 7.5 6 7.5-6" />
                      </svg>
                      {t("join.form.cvEmail")}
                    </Button>
                  </div>
                </div>

                <Button variant="gold" size="lg" type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "..." : t("join.form.submit")}
                </Button>
                {submitted && (
                  <p className="text-center text-sm text-gold-ink dark:text-gold-light">
                    Ariza qabul qilindi!
                  </p>
                )}
                {submitError && (
                  <p className="text-center text-sm text-red-500">{submitError}</p>
                )}
                <p className="text-center text-xs text-inkc-sub dark:text-paper-line/70">
                  {t("join.form.note")}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
