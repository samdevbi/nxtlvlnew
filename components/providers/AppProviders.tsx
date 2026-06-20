"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import uzFallback from "@/locales/uz.json";
import enFallback from "@/locales/en.json";

type Locale = "uz" | "en";
type Theme = "light" | "dark";

interface AppContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  theme: Theme;
  toggleTheme: () => void;
  settings: SiteSettings;
}

export interface SiteSettings {
  email: string;
  telegram: string;
  instagram: string;
  linkedin: string;
  heroDesktopUrl?: string;
  heroMobileUrl?: string;
}

const defaultSettings: SiteSettings = {
  email: "club@nxtlvl.uz",
  telegram: "https://t.me/nxtlvladmin",
  instagram: "https://instagram.com/nxtlvl.club",
  linkedin: "https://linkedin.com/company/nxtlvl-club",
};

const AppContext = createContext<AppContextValue | null>(null);

function resolve(obj: Record<string, unknown>, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      obj
    );
  return typeof value === "string" ? value : key;
}

export function AppProviders({
  children,
  initialMessages,
  initialSettings,
}: {
  children: ReactNode;
  initialMessages?: { uz: Record<string, unknown>; en: Record<string, unknown> };
  initialSettings?: SiteSettings;
}) {
  const [messages, setMessages] = useState<Record<Locale, Record<string, unknown>>>({
    uz: initialMessages?.uz ?? (uzFallback as Record<string, unknown>),
    en: initialMessages?.en ?? (enFallback as Record<string, unknown>),
  });
  const [locale, setLocaleState] = useState<Locale>("uz");
  const [theme, setTheme] = useState<Theme>("light");
  const [settings, setSettings] = useState<SiteSettings>(initialSettings ?? defaultSettings);

  useEffect(() => {
    const storedLocale = localStorage.getItem("nxtlvl-locale");
    if (storedLocale === "uz" || storedLocale === "en") {
      setLocaleState(storedLocale);
    }
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );

    if (!initialMessages) {
      fetch("/api/locales")
        .then((r) => r.json())
        .then((data) => {
          if (data.uz && data.en) setMessages({ uz: data.uz, en: data.en });
        })
        .catch(() => {});
    }

    if (!initialSettings) {
      fetch("/api/settings")
        .then((r) => r.json())
        .then((data) => setSettings({ ...defaultSettings, ...data }))
        .catch(() => {});
    }
  }, [initialMessages, initialSettings]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("nxtlvl-locale", next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("nxtlvl-theme", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string) => resolve(messages[locale], key),
    [locale, messages]
  );

  return (
    <AppContext.Provider value={{ locale, setLocale, t, theme, toggleTheme, settings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
