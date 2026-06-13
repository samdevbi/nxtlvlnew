"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { useApp } from "@/components/providers/AppProviders";

const NAV_LINKS = [
  { href: "/about", key: "nav.about" },
  { href: "/members", key: "nav.members" },
  { href: "/meetings", key: "nav.meetings" },
  { href: "/activities", key: "nav.activities" },
  { href: "/join", key: "nav.join" },
];

function LocaleSwitch() {
  const { locale, setLocale } = useApp();
  return (
    <div className="flex items-center rounded-full bg-paper-chip p-0.5 text-xs font-semibold dark:bg-navy-card">
      {(["uz", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
            locale === l
              ? "bg-navy text-paper dark:bg-gold dark:text-navy"
              : "text-inkc-sub hover:text-gold-ink dark:text-paper-line dark:hover:text-gold-light"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme, t } = useApp();
  return (
    <button
      onClick={toggleTheme}
      aria-label={t("header.toggleTheme")}
      className="flex h-9 w-9 items-center justify-center rounded-full text-inkc-sub transition-colors hover:bg-paper-chip hover:text-gold-ink dark:text-paper-line dark:hover:bg-navy-card dark:hover:text-gold-light"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);

  // Menyu ochiq paytda fon scroll bo'lmasin, Escape bilan yopilsin
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* backdrop-blur ichki div'da — aks holda fixed menyu overlay header'ga "bog'lanib" qoladi */}
      <div className="border-b border-paper-line bg-paper/90 backdrop-blur dark:border-navy-line dark:bg-navy-deep/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="NXTLVL CLUB — bosh sahifa" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-inkc-sub transition-colors hover:text-gold-ink dark:text-paper-line dark:hover:text-gold-light"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitch />
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label={t("header.menu")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-inkc transition-colors hover:bg-paper-chip dark:text-paper dark:hover:bg-navy-card"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
        </div>
      </div>
      </div>

      {/* Mobile slide-in menyu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-72 flex-col border-l border-paper-line bg-paper transition-transform duration-300 ease-out will-change-transform dark:border-navy-line dark:bg-navy ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-paper-line px-4 dark:border-navy-line">
            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-gold-ink dark:text-gold-light">
              NXTLVL CLUB
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("header.closeMenu")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-inkc hover:bg-paper-chip dark:text-paper dark:hover:bg-navy-card"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base text-inkc transition-colors hover:bg-paper-chip hover:text-gold-ink dark:text-paper dark:hover:bg-navy-card dark:hover:text-gold-light"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-paper-line px-4 py-5 dark:border-navy-line">
            <LocaleSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
