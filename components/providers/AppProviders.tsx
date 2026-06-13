"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import uz from "@/locales/uz.json";
import en from "@/locales/en.json";

type Locale = "uz" | "en";
type Theme = "light" | "dark";

const messages: Record<Locale, Record<string, unknown>> = { uz, en };

interface AppContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  theme: Theme;
  toggleTheme: () => void;
}

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

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uz");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedLocale = localStorage.getItem("nxtlvl-locale");
    if (storedLocale === "uz" || storedLocale === "en") {
      setLocaleState(storedLocale);
    }
    // Inline script html'ga klassni allaqachon qo'ygan — state'ni moslaymiz
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

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
    [locale]
  );

  return (
    <AppContext.Provider value={{ locale, setLocale, t, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
