"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useApp } from "@/components/providers/AppProviders";

const NAV_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/members", key: "nav.members" },
  { href: "/meetings", key: "nav.meetings" },
  { href: "/activities", key: "nav.activities" },
  { href: "/join", key: "nav.join" },
];

const SOCIALS = [
  {
    name: "Telegram",
    href: "https://t.me/nxtlvladmin",
    icon: (
      <path d="M21.5 4.5 2.9 11.7c-1 .4-1 1.2-.2 1.4l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2 1-.5l2.3-2.3 4.9 3.6c.9.5 1.5.2 1.7-.8l3.2-15c.3-1.3-.5-1.9-1.8-1.5ZM8.7 14.6l9.8-6.2c.5-.3.9-.1.5.2l-8.3 7.5-.3 3.4-1.7-4.9Z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nxtlvl.club",
    icon: (
      <path d="M12 2c2.7 0 3 .01 4.1.06a7.4 7.4 0 0 1 2.4.46 5 5 0 0 1 2.9 2.9c.3.77.43 1.55.46 2.43.05 1.06.06 1.4.06 4.1s-.01 3-.06 4.1a7.4 7.4 0 0 1-.46 2.4 5 5 0 0 1-2.9 2.9 7.4 7.4 0 0 1-2.43.47c-1.06.04-1.4.05-4.1.05s-3-.01-4.1-.05a7.4 7.4 0 0 1-2.4-.47 5 5 0 0 1-2.9-2.9 7.4 7.4 0 0 1-.47-2.43C2.02 15.04 2 14.7 2 12s.01-3 .06-4.1c.03-.88.16-1.66.46-2.43a5 5 0 0 1 2.9-2.9c.77-.3 1.55-.42 2.43-.45C8.96 2.01 9.3 2 12 2Zm0 4.9a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 1.8a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Zm5.3-3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/nxtlvl-club",
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.1 3.77-2.1 4 0 4.78 2.6 4.78 6V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4V9Z" />
    ),
  },
];

export default function Footer() {
  const { t, settings } = useApp();

  const socials = [
    { name: "Telegram", href: settings.telegram, icon: SOCIALS[0].icon },
    { name: "Instagram", href: settings.instagram, icon: SOCIALS[1].icon },
    { name: "LinkedIn", href: settings.linkedin, icon: SOCIALS[2].icon },
  ];

  return (
    <footer className="border-b-2 border-gold bg-navy-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6 md:py-16">
        {/* Logo + slogan */}
        <div>
          <Logo className="text-paper" />
          <p className="mt-4 max-w-xs text-base text-paper-line/80">
            {t("footer.slogan")}
          </p>
        </div>

        {/* Sahifalar */}
        <div>
          <p className="flex items-center gap-2.5 text-overline font-semibold uppercase tracking-[3px] text-gold-light">
            <span aria-hidden className="h-px w-[18px] bg-gold" />
            {t("footer.pages")}
          </p>
          <nav className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-paper-line/80 transition-colors hover:text-gold-light"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Kontakt */}
        <div>
          <p className="flex items-center gap-2.5 text-overline font-semibold uppercase tracking-[3px] text-gold-light">
            <span aria-hidden className="h-px w-[18px] bg-gold" />
            {t("footer.contact")}
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-base">
            <a href={`mailto:${settings.email}`} className="text-paper-line/80 transition-colors hover:text-gold-light">
              {settings.email}
            </a>
            <a href={settings.telegram} target="_blank" rel="noopener noreferrer" className="text-paper-line/80 transition-colors hover:text-gold-light">
              {settings.telegram.replace("https://t.me/", "@")}
            </a>
          </div>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-line text-paper-line/80 transition-colors hover:border-gold hover:text-gold-light"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-navy-line">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-paper-line/60 md:px-6">
          © {new Date().getFullYear()} NXTLVL CLUB. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
