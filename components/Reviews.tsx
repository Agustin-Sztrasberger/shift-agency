"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Columnas de la tabla en desktop: Cliente | Servicio | Mensaje | Puntaje
const COLS = "lg:grid-cols-[1fr_1.15fr_1.75fr_100px]";

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function getAverage(scores: string[]) {
  const values = scores.map((score) => parseFloat(score)).filter((n) => !Number.isNaN(n));
  if (!values.length) return "–";
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Number.isInteger(avg) ? String(avg) : avg.toFixed(1);
}

export function Reviews() {
  const { content } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const average = getAverage(content.reviews.items.map((item) => item.score));

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: container.current, start: "top 78%", once: true } })
        .from("[data-reviews-title]", { y: 50, opacity: 0, duration: 0.75, ease: "power3.out" })
        .from("[data-reviews-intro]", { y: 28, opacity: 0, duration: 0.65, ease: "power3.out" }, "-=0.45")
        .from("[data-reviews-score]", { y: 36, opacity: 0, scale: 0.96, duration: 0.7, ease: "power3.out" }, "-=0.5");

      gsap.timeline({ scrollTrigger: { trigger: "[data-reviews-table]", start: "top 84%", once: true } })
        .from("[data-reviews-head]", { y: 24, opacity: 0, duration: 0.55, ease: "power3.out" })
        .from("[data-review-row]", { y: 30, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" }, "-=0.25");
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reviews-title], [data-reviews-score], [data-reviews-intro], [data-reviews-head], [data-review-row]", { clearProps: "all", opacity: 1 });
    });
    return () => mm.revert();
  }, { scope: container });

  return (
    <section ref={container} id="reviews" className="px-6 py-32 md:px-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado: título + bajada a la izquierda, promedio a la derecha */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <h2 data-reviews-title className="section-title text-h2 leading-none">{content.reviews.title}</h2>
            <p data-reviews-intro className="mt-6 text-h5 font-light leading-snug text-ink">{content.reviews.description}</p>
          </div>

          <p data-reviews-score className="spacegrotesk flex items-start leading-[0.8] text-cream md:mr-[6%]" aria-label={`${average} / 10`}>
            <span className="text-[clamp(6rem,17vw,14.5rem)] tracking-[-0.04em]">{average}</span>
            <span className="spacegrotesk-light ml-3 mt-[0.35em] text-h2 text-violet">/10</span>
          </p>
        </div>

        {/* Tabla / acordeón */}
        <div data-reviews-table className="mt-20 lg:mt-24">
          <div data-reviews-head className={`dash-line hidden items-center gap-8 pb-6 lg:grid ${COLS}`}>
            <span className="spacegrotesk-medium pl-12 text-h5 text-cream">{content.reviews.client}</span>
            <span className="spacegrotesk-medium text-h5 text-cream">{content.reviews.service}</span>
            <span className="spacegrotesk-medium text-h5 text-cream">{content.reviews.message}</span>
            <span className="spacegrotesk-medium flex w-[100px] items-center justify-center rounded-lg bg-violet py-2.5 text-h5 text-cream">
              {content.reviews.score}
            </span>
          </div>

          {content.reviews.items.map((review, index) => {
            const isOpen = openIndex === index;
            const panelId = `review-panel-${index}`;
            return (
              <div data-review-row key={review.client} className={`dash-line ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={`${content.reviews.expandLabel} ${review.client}`}
                  className={`group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 text-left lg:gap-8 ${COLS}`}
                >
                  <span className="spacegrotesk text-h5 text-cream/90 transition-colors lg:pl-12 lg:text-cream/55 lg:group-hover:text-cream">{review.client}</span>

                  <span className="spacegrotesk order-3 col-span-2 text-base text-cream/55 lg:order-none lg:col-span-1 lg:text-h5">{review.service}</span>

                  <span className="spacegrotesk order-4 col-span-2 mt-2 flex min-w-0 items-center gap-3 text-base text-cream/55 lg:order-none lg:col-span-1 lg:mt-0 lg:text-h5">
                    <span className={`min-w-0 truncate transition-opacity duration-300 ${isOpen ? "opacity-40" : ""}`}>“{review.message}</span>
                    <span className="acc-ic flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-violet text-cream group-hover:bg-violet-light">
                      <PlusIcon />
                    </span>
                  </span>

                  <span className="spacegrotesk-medium order-2 flex w-[84px] items-center justify-center rounded-lg bg-violet py-2.5 text-base text-cream lg:order-none lg:w-[100px] lg:text-h5">
                    {review.score}
                  </span>
                </button>

                <div id={panelId} className="acc-body" role="region" aria-label={review.client}>
                  <div>
                    <div className={`grid pb-8 ${COLS} lg:gap-8`}>
                      <p className="spacegrotesk text-base leading-relaxed text-cream/85 lg:col-start-3 lg:col-end-5 lg:pr-[100px] lg:text-h5 lg:leading-relaxed">
                        “{review.message}”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
