"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLanguage } from "@/lib/i18n";
import { RotatingBadge } from "@/components/RotatingBadge";
import { ShiftArrow } from "@/components/ShiftArrow";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const { content } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = "[data-hero-eyebrow], [data-hero-title], [data-hero-secondary], [data-hero-cta], [data-hero-badge], [data-hero-media]";
      gsap.set(elements, { opacity: 0 });

      let entrance: gsap.core.Timeline | undefined;

      const startHero = () => {
        if (entrance) return;

        entrance = gsap.timeline({ defaults: { ease: "power4.out" } });

        entrance
          .fromTo("[data-hero-eyebrow]", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
          .fromTo("[data-hero-title]", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.35")
          .fromTo("[data-hero-secondary]", { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.45")
          .fromTo("[data-hero-cta]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.45")
          .fromTo("[data-hero-badge]", { y: 36, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.65 }, "-=0.45")
          .fromTo("[data-hero-media]", { y: 52, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.9 }, "-=0.4");
      };

      const phase = container.current?.closest("[data-preloader-phase]")?.getAttribute("data-preloader-phase");
      if (phase === "done") startHero();
      else window.addEventListener("shift:preloader-complete", startHero, { once: true });

      return () => {
        window.removeEventListener("shift:preloader-complete", startHero);
        entrance?.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-hero-eyebrow], [data-hero-title], [data-hero-secondary], [data-hero-cta], [data-hero-badge], [data-hero-media]", {
        clearProps: "all",
        opacity: 1,
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section ref={container} id="hero" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 md:px-16 lg:px-8">
      <div data-hero-badge className="flex justify-end lg:hidden">
        <RotatingBadge className="relative z-10 mb-8 h-24 w-24 md:h-32 md:w-32" />
      </div>
      <div data-hero-badge>
        <RotatingBadge className="hero-badge z-10 hidden lg:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p data-hero-eyebrow className="mb-4 text-ink text-h4 font-light">{content.hero.eyebrow}</p>
        <h1 data-hero-title className="max-w-l leading-[1.05] text-h1 font-medium">
          {content.hero.title[0]}<br />
          {content.hero.title[1]}<br />
          <span className="text-violet text-h1">{content.hero.title[2]}</span>
        </h1>
        <p data-hero-secondary className="mt-6 max-w-l text-ink text-h4 font-light">{content.hero.description}</p>
        <div data-hero-cta className="mt-10">
          <a
            href="#contacto"
            className="btn btn-violet spacegrotesk-medium inline-flex min-h-[56px] items-center gap-3 rounded-full bg-violet px-7 py-4 text-h5 text-cream shadow-[0_14px_34px_rgb(97_76_222_/_0.3)]"
          >
            <span className="bl"><span data-t={content.hero.cta}>{content.hero.cta}</span></span>
            <ShiftArrow direction="down-right" className="btn-ico h-4 w-4" />
          </a>
        </div>
      </div>

      <div data-hero-media className="relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden bg-surface-raised opacity-60">
        <video className="aspect-[4/3] h-full w-full object-cover" autoPlay muted loop playsInline aria-label="Video de Shift Agency">
          <source src="/videos/Video-Shift%20Agency.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
