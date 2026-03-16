import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#1D4E3F",
          light: "#2A6B56",
          dark: "#142F25",
          muted: "#1D4E3F1A",
          50: "#E8F0ED",
          100: "#D1E1DB",
          200: "#A3C3B7",
          300: "#75A593",
          400: "#47876F",
          500: "#1D4E3F",
          600: "#173E32",
          700: "#112F26",
          800: "#0B1F19",
          900: "#05100D",
        },
        mocha: {
          DEFAULT: "#6B4F3A",
          light: "#8B6A52",
          dark: "#4A3528",
          muted: "#6B4F3A1A",
          50: "#EFE9E4",
          100: "#DFD3C9",
          200: "#BFA793",
          300: "#9F7B5D",
          400: "#7F5F47",
          500: "#6B4F3A",
          600: "#563F2E",
          700: "#412F23",
          800: "#2B2017",
          900: "#16100C",
        },
        stone: {
          DEFAULT: "#F5F3EF",
          dark: "#EAE7E1",
          50: "#FFFFFF",
          100: "#F5F3EF",
          200: "#E8E5E0",
          300: "#DBD7D1",
        },
        ink: "#1C1C1C",
        mist: "#E8E5E0",
        fog: "#F9F8F6",
        gold: "#B8933A",
      },
      fontFamily: {
        sans: ["var(--font-body)", "DM Sans", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        btn: "var(--radius-btn)",
        badge: "var(--radius-badge)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },
      transitionDuration: {
        base: "200ms",
      },
    },
  },
  plugins: [],
};
export default config;
