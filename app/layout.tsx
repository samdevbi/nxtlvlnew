import type { Metadata } from "next";
import { Sulphur_Point } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { fetchLocales, fetchSettings } from "@/lib/data-server";
import uzFallback from "@/locales/uz.json";
import enFallback from "@/locales/en.json";
import "./globals.css";

const sulphurPoint = Sulphur_Point({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sulphur",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NXTLVL CLUB",
  description: "NXTLVL CLUB — keyingi bosqichga birga ko'tarilamiz.",
};

export const revalidate = 60;

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("nxtlvl-theme");
    var dark = stored === "dark";
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialMessages = {
    uz: uzFallback as Record<string, unknown>,
    en: enFallback as Record<string, unknown>,
  };
  let initialSettings;

  try {
    const locales = await fetchLocales();
    if (locales.uz && locales.en) {
      initialMessages = {
        uz: locales.uz as Record<string, unknown>,
        en: locales.en as Record<string, unknown>,
      };
    }
    const settings = await fetchSettings();
    if (settings) {
      initialSettings = {
        email: settings.email,
        telegram: settings.telegram,
        instagram: settings.instagram,
        linkedin: settings.linkedin,
        heroDesktopUrl: settings.heroDesktopUrl,
        heroMobileUrl: settings.heroMobileUrl,
      };
    }
  } catch {
    // MongoDB ulanmasa static fallback
  }

  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={sulphurPoint.variable}>
        <AppProviders initialMessages={initialMessages} initialSettings={initialSettings}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
