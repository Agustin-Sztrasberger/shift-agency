import type { Metadata } from "next";

import { magnetik, spaceGrotesk } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Shift Agency",

  description:
    "En Shift Agency ayudamos a tu marca a comunicar y verse mejor, sin perder lo que la hace única.",

  openGraph: {
    title: "Shift Agency",

    description:
      "En Shift Agency ayudamos a tu marca a comunicar y verse mejor, sin perder lo que la hace única.",

    type: "website",

    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Shift Agency",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${magnetik.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
