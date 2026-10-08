"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Project } from "@/lib/projects";
import { ShiftArrow } from "@/components/ShiftArrow";

const EASE = [0.16, 1, 0.3, 1] as const;

// Entrada escalonada del contenido, después de que el panel termina de subir.
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 400);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [project, onClose]);

  function goToContact() {
    onClose();
    window.setTimeout(() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }), 450);
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[100] flex items-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Fondo */}
          <motion.button
            type="button"
            aria-label="Cerrar proyecto"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Panel que sube desde abajo */}
          <motion.div
            className="relative h-[94vh] w-full overflow-hidden rounded-t-[28px] border-t border-white/10 bg-surface shadow-[0_-30px_80px_rgb(0_0_0_/_0.5)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="group absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-surface/70 text-cream backdrop-blur-md transition-[background-color,border-color,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:rotate-90 hover:border-violet hover:bg-violet md:right-8 md:top-8"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="h-full overflow-y-auto overscroll-contain">
              <motion.div variants={stagger} initial="hidden" animate="show">
                <section className="px-6 pb-16 pt-20 md:px-16 md:pb-24 md:pt-24 lg:px-8">
                  <div className="mx-auto max-w-6xl">
                    <div className="grid items-end gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
                      <div>
                        <motion.p variants={rise} className="mb-6 text-sm uppercase tracking-[0.24em] text-violet">
                          {project.label}
                        </motion.p>
                        <div className="overflow-hidden pb-[0.12em]">
                          <motion.h2
                            id="project-modal-title"
                            className="max-w-4xl text-h1 leading-[0.95]"
                            variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
                          >
                            {project.title}
                          </motion.h2>
                        </div>
                      </div>
                      <motion.p variants={rise} className="max-w-md pb-2 text-h4 leading-tight text-cream/70">
                        {project.intro}
                      </motion.p>
                    </div>

                    <motion.div variants={rise} className="mt-14 overflow-hidden rounded-lg bg-surface-raised md:mt-20">
                      <img src={project.thumbnail} alt={`Vista previa de ${project.title}`} className="aspect-[16/8] h-full w-full object-cover" />
                    </motion.div>
                  </div>
                </section>

                <motion.section variants={rise} className="border-y border-white/10 bg-surface-raised px-6 py-16 md:px-16 md:py-24 lg:px-8">
                  <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-violet">El proyecto</p>
                      <h3 className="mt-5 text-h2 leading-none">{project.client}</h3>
                      <p className="mt-5 text-h5 text-ink">{project.category}</p>
                    </div>
                    <div>
                      <p className="max-w-2xl text-h3 leading-tight text-cream">{project.objective}</p>
                      <div className="mt-10 flex flex-wrap gap-3">
                        {project.services.map((service) => (
                          <span key={service} className="rounded-full border border-white/15 px-4 py-2 text-sm text-cream/70">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.section>

                <section className="px-6 py-16 md:px-16 md:py-24 lg:px-8">
                  <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                    {project.metrics.map(([number, heading, description]) => (
                      <motion.article variants={rise} key={number} className="border-t border-white/20 pt-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                          <h4 className="text-h2">{heading}</h4>
                          <p className="spacegrotesk-bold text-h3 text-violet">{number}</p>
                        </div>
                        <p className="mt-4 max-w-xs text-h4 text-ink">{description}</p>
                      </motion.article>
                    ))}
                  </div>
                </section>

                <motion.section variants={rise} className="bg-surface-raised px-6 py-16 md:px-16 md:py-24 lg:px-8">
                  <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-violet">Siguiente paso</p>
                      <h3 className="mt-5 max-w-2xl text-h2 leading-none">¿Hablamos de tu proyecto?</h3>
                    </div>
                    <button
                      type="button"
                      onClick={goToContact}
                      className="btn btn-violet spacegrotesk-medium inline-flex min-h-[52px] items-center gap-3 rounded-full bg-violet px-7 py-4 text-base text-cream"
                    >
                      <span className="bl"><span data-t="Contactanos">Contactanos</span></span>
                      <ShiftArrow className="btn-ico h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.section>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
