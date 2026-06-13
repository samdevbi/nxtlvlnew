import type { Metadata } from "next";
import { Sulphur_Point } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
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

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("nxtlvl-theme");
    var dark = stored === "dark";
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={sulphurPoint.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
