import type { Config } from "tailwindcss";

// Tokens de marca de Shift Agency.
// El negro de fondo es un placeholder (#0A0A0A) hasta tener el hex exacto del brief.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: {
          DEFAULT: "#614CDE",
          light: "#7C68E8",
          dark: "#4B3AB0",
        },
        cream: "#F2EFEB",
        ink: "#626262", // gris de texto
        surface: {
          DEFAULT: "#000000", // placeholder — confirmar hex exacto del fondo oscuro
          raised: "#141414",
        },
      },
      fontFamily: {
        display: ["var(--font-magnetik)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
      },
      fontSize: {
        h1: "clamp(2.75rem, 5vw, 6.25rem)",
        h2: "clamp(2.25rem, 4vw, 4.375rem)",
        h3: "clamp(1.75rem, 3vw, 2.5rem)",
        h4: "clamp(1.25rem, 2vw, 1.5rem)",
        h5: "clamp(1.125rem, 1.6vw, 1.25rem)",
        body: "0.875rem",
        xxxl: "clamp(3.5rem, 9vw, 9.375rem)",
      },
      maxWidth: {
        prose: "70ch",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
