"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PageMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-page-back]", { y: 18, opacity: 0, duration: 0.45 })
        .from("[data-page-eyebrow]", { y: 32, opacity: 0, duration: 0.55 }, "-=0.2")
        .from("[data-page-title]", { yPercent: 105, opacity: 0, duration: 0.85 }, "-=0.25")
        .from("[data-page-intro]", { y: 30, opacity: 0, duration: 0.65 }, "-=0.4")
        .from("[data-page-media]", { y: 42, opacity: 0, scale: 0.985, duration: 0.8 }, "-=0.3");

      gsap.utils.toArray<HTMLElement>("[data-page-section]").forEach((section) => {
        gsap.from(section, {
          y: 42,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 88%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}
