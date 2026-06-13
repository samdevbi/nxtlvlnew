import type { Config } from "tailwindcss";

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
