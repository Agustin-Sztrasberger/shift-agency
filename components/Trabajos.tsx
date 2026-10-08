"use client";

import { ShiftArrow } from "@/components/ShiftArrow";
import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";
import { projectDetails, type Project } from "@/lib/projects";
import { ProjectModal } from "@/components/ProjectModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Placeholder de datos — cuando esté el CMS, esto se reemplaza por un fetch.

export function Trabajos() {
  const { content } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setActiveProject(null), []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: "[data-work-heading]", start: "top 84%", once: true } })
        .from("[data-work-title]", { y: 52, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from("[data-work-intro]", { y: 32, opacity: 0, duration: 0.65, ease: "power3.out" }, "-=0.38");

      gsap.from("[data-work-card]", {
        y: 54,
        opacity: 0,
        scale: 0.985,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-work-grid]", start: "top 82%", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-work-image]").forEach((image, index) => {
        gsap.fromTo(image, { yPercent: index % 2 === 0 ? -3 : 3 }, {
          yPercent: index % 2 === 0 ? 3 : -3,
          ease: "none",
          scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-work-title], [data-work-intro], [data-work-card], [data-work-image]", { clearProps: "all", opacity: 1 });
    });
    return () => mm.revert();
  }, { scope: container });

  return (
    <section ref={container} id="trabajos" className="px-6 py-32 md:px-16 lg:px-8">
      <div data-work-heading className="mx-auto max-w-6xl pb-[4em]">
          <h2 data-work-title className="section-title mb-10 flex items-start gap-2 text-h2">
            {content.work.title}
            <span className="section-num self-start text-violet text-h3 spacegrotesk-bold">
              03
            </span>
          </h2>

          <p data-work-intro className="max-w-2xl text-h5 text-ink">
            {content.work.description}
          </p>
        </div>

        <div data-work-grid className="grid gap-8 md:grid-cols-3 mx-auto max-w-6xl">
          {content.work.items.map((trabajo, index) => (
            <article data-work-card key={trabajo.title}>
              <button
                type="button"
                onClick={() => {
                  // Mismo orden que lib/projects.ts (sirve en ES y EN)
                  const project = Object.values(projectDetails)[index];
                  if (project) setActiveProject(project);
                }}
                aria-label={`Ver proyecto ${trabajo.title} - ${trabajo.client}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-raised text-left"
              >
                <img
                  src={trabajo.thumbnail}
                  alt=""
                  data-work-image
                  className="h-full w-full scale-[1.06] rounded-lg object-cover transition-[filter] duration-500 group-hover:brightness-75"
                />

                <span
                  aria-hidden
                  className="absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-violet text-cream transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:translate-y-3 lg:scale-75 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:scale-100 lg:group-focus-visible:opacity-100"
                >
                  <ShiftArrow className="h-3.5 w-3.5" />
                </span>
              </button>
              <h3 className="mt-4 text-h3">{trabajo.title}</h3>
              <p className="text-ink text-h5">{trabajo.client} | {trabajo.category}</p>
            </article>
          ))}
        </div>

        <ProjectModal project={activeProject} onClose={closeProject} />
    </section>
  );
}
