import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1B33",
          deep: "#081426",
          card: "#0E2038",
          line: "#1B3050",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8C766",
          ink: "#9A7B1A", // oq fonda matn uchun
        },
        paper: {
          DEFAULT: "#F7F6F2",
          card: "#FFFFFF",
          line: "#E4E1D6",
          chip: "#F1EFE7",
        },
        inkc: {
          DEFAULT: "#0B1B33",
          sub: "#5C6678",
        },
      },
      fontFamily: {
        display: ["var(--font-sulphur)", "Sulphur Point", "sans-serif"],
        sans: ["var(--font-sulphur)", "Sulphur Point", "sans-serif"],
      },
      fontSize: {
        ...defaultTheme.fontSize,
        xs: ["0.8125rem", { lineHeight: "1.25rem" }],
        sm: ["0.9375rem", { lineHeight: "1.4rem" }],
        base: ["1.0625rem", { lineHeight: "1.65rem" }],
        lg: ["1.1875rem", { lineHeight: "1.75rem" }],
        xl: ["1.3125rem", { lineHeight: "1.85rem" }],
        "2xl": ["1.5625rem", { lineHeight: "2rem" }],
        "3xl": ["1.9375rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.375rem", { lineHeight: "2.5rem" }],
        "5xl": ["3.0625rem", { lineHeight: "1.1" }],
        "6xl": ["3.8125rem", { lineHeight: "1" }],
        micro: ["0.5625rem", { lineHeight: "0.875rem" }],
        overline: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.12em" }],
        detail: ["0.875rem", { lineHeight: "1.45rem" }],
        lead: ["1rem", { lineHeight: "1.65rem" }],
      },
      backgroundImage: {
        "navy-grad": "linear-gradient(135deg, #13294A, #081426)",
        "gold-btn": "linear-gradient(135deg, #E8C766, #C9A227)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
