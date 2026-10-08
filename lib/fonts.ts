import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";

// Magnetik es de pago (Bold Monday) — necesitás la licencia web y los .woff2
// en /public/fonts. Mientras no los tengas, esto cae al fallback de Tailwind
// (sans-serif) sin romper nada.
export const magnetik = localFont({
  src: [
    {
      path: "../public/fonts/Magnetik-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Magnetik-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-magnetik",
  display: "swap",
  fallback: ["sans-serif"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
