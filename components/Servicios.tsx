"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Servicios() {
  const { content } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeService = content.services.items[activeIndex];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-services-heading] > *", {
        y: 56,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-services-heading]", start: "top 82%", once: true },
      });

      const mobileItems = gsap.utils.toArray<HTMLElement>("[data-service-mobile-item]");
      gsap.fromTo(mobileItems,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: mobileItems[0], start: "top 86%", once: true },
        },
      );
    });

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-service-desktop-item]");
      if (!items.length) return;

      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-services-stage]", start: "top 82%", once: true },
        },
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-services-heading] > *, [data-service-mobile-item], [data-service-desktop-item]", { clearProps: "all", opacity: 1 });
    });
    return () => mm.revert();
  }, { scope: container });

  useGSAP(() => {
    const details = container.current?.querySelector("[data-service-details]");
    if (!details || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(details,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: true },
    );
  }, { scope: container, dependencies: [activeIndex], revertOnUpdate: true });

  return (
    <section ref={container} id="servicios" className="px-6 py-32 md:px-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div data-services-heading className="flex flex-col gap-6 md:flex-row md:items-end md:gap-28">
          <h2 className="section-title mb-16 text-h2 flex items-start gap-2">
            {content.services.title}
            <span className="section-num self-start text-violet text-h3 spacegrotesk-bold">01</span>
          </h2>
          <p className="mb-16 text-ink text-h4 font-light">{content.services.description}</p>
        </div>

        <ul className="divide-y divide-white/10 lg:hidden">
          {content.services.items.map((servicio, index) => {
            const isOpen = openIndex === index;
            return (
              <li data-service-mobile-item key={servicio.title} className="py-4">
                <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen} className={`flex w-full items-center justify-between gap-3 text-left transition-colors ${isOpen ? "text-cream" : "text-ink hover:text-cream"}`}>
                  <span className="break-words text-h4">{servicio.title}</span>
                  <span aria-hidden className={`shrink-0 text-h4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <ul className="min-h-0 overflow-hidden">
                    {servicio.subitems.map((subitem) => <li key={subitem} className="break-words py-2.5 text-h5 text-ink">{subitem}</li>)}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <div data-services-stage className="hidden lg:flex lg:min-h-[42vh] lg:items-start lg:gap-10">
          <ul className="min-w-0">
            {content.services.items.map((servicio, index) => (
              <li data-service-desktop-item key={servicio.title} onMouseEnter={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)} className={`break-words text-h3 transition-colors cursor-pointer ${index === activeIndex ? "text-cream" : "text-ink hover:text-cream"}`}>
                {servicio.title}
              </li>
            ))}
          </ul>
          <ul data-service-details className="flex min-w-0 flex-col gap-[0.4em] text-h4">
            {activeService.subitems.map((subitem) => <li key={subitem} className="break-words text-h4 text-ink transition-colors hover:text-cream">{subitem}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
