"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLanguage } from "@/lib/i18n";
import { ShiftArrow } from "@/components/ShiftArrow";

gsap.registerPlugin(useGSAP);

// Evento que avisa al resto del sitio (header, etc.) que el título terminó de escribirse.
export const HERO_TYPED_EVENT = "shift:hero-typed";

const CHAR_DELAY = 55; // ms por letra
const LINE_PAUSE = 220; // pausa extra al terminar cada renglón
const START_DELAY = 350;

function markTyped() {
  (window as unknown as { __shiftHeroTyped?: boolean }).__shiftHeroTyped = true;
  window.dispatchEvent(new CustomEvent(HERO_TYPED_EVENT));
}

/**
 * Título con efecto máquina de escribir.
 * - La letra que se acaba de tipear es violeta; las anteriores pasan a crema.
 * - El último renglón ("un cambio real") queda violeta entero.
 * - Las letras sin tipear existen pero son transparentes, así el texto no se mueve.
 * - Al terminar, el cursor titila un par de veces y desaparece.
 */
function TypewriterTitle({ lines, onDone }: { lines: string[]; onDone: () => void }) {
  const total = lines.reduce((sum, line) => sum + line.length, 0);
  const [typed, setTyped] = useState(0);
  const [cursorGone, setCursorGone] = useState(false);
  const doneRef = useRef(false);

  // Si cambia el idioma después de terminar, mostramos el texto completo sin volver a tipear.
  useEffect(() => {
    if (doneRef.current) setTyped(total);
  }, [total]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doneRef.current = true;
      setTyped(total);
      setCursorGone(true);
      onDone();
      return;
    }

    // Final de cada renglón (en cantidad de letras acumuladas) para hacer la pausa.
    const lineEnds = lines.reduce<number[]>((acc, line) => [...acc, (acc[acc.length - 1] ?? 0) + line.length], []);
    let count = 0;
    let timer: number;

    const step = () => {
      count += 1;
      setTyped(count);
      if (count >= total) {
        doneRef.current = true;
        onDone();
        timer = window.setTimeout(() => setCursorGone(true), 1400); // ~2 parpadeos y se va
        return;
      }
      timer = window.setTimeout(step, CHAR_DELAY + (lineEnds.includes(count) ? LINE_PAUSE : 0));
    };

    timer = window.setTimeout(step, START_DELAY);
    return () => window.clearTimeout(timer);
    // Solo al montar: el efecto corre una vez como entrada del sitio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let index = 0;
  const cursor = (
    <span className="relative inline-block w-0 align-baseline" aria-hidden>
      <span
        className={`absolute bottom-[-0.08em] left-[0.04em] h-[0.95em] w-[0.06em] rounded-full bg-violet transition-opacity duration-500 ${
          cursorGone ? "opacity-0" : "animate-caret"
        }`}
      />
    </span>
  );

  return (
    <h1
      aria-label={lines.join(" ")}
      className="text-[clamp(2.9rem,8.4vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.01em]"
    >
      {lines.map((line, lineIndex) => {
        const isLast = lineIndex === lines.length - 1;
        return (
          <span key={lineIndex} className="block" aria-hidden>
            {Array.from(line).map((char, charIndex) => {
              index += 1;
              const position = index;
              const isTyped = position <= typed;
              const isCurrent = position === typed && typed < total;
              const color = !isTyped ? "text-transparent" : isLast || isCurrent ? "text-violet" : "text-cream";
              return (
                <span key={charIndex} className={`${color} transition-colors duration-150`}>
                  {typed === 0 && position === 1 && cursor}
                  {char}
                  {position === typed && cursor}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

export function Hero() {
  const { content } = useLanguage();
  const container = useRef<HTMLElement>(null);
  const [typed, setTyped] = useState(false);

  // Lo demás del hero aparece recién cuando termina de escribirse el título.
  useGSAP(() => {
    if (!typed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-hero-eyebrow], [data-hero-secondary], [data-hero-cta]", { opacity: 1 });
      gsap.set("[data-hero-media]", { opacity: 0.6 });
      return;
    }
    gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .fromTo("[data-hero-eyebrow]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
      .fromTo("[data-hero-secondary]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo("[data-hero-cta]", { y: 24, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7 }, "-=0.55")
      .fromTo("[data-hero-media]", { y: 60, opacity: 0 }, { y: 0, opacity: 0.6, duration: 1 }, "-=0.45");
  }, { scope: container, dependencies: [typed] });

  return (
    <section ref={container} id="hero" className="relative overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:px-16 lg:px-8">
        <p data-hero-eyebrow className="opacity-0 mb-5 text-h5 font-light text-ink">{content.hero.eyebrow}</p>

        <TypewriterTitle
          lines={content.hero.title}
          onDone={() => {
            setTyped(true);
            markTyped();
          }}
        />

        <p data-hero-secondary className="opacity-0 mt-8 max-w-xl text-h5 font-light leading-snug text-ink">
          {content.hero.description}
        </p>

        <div data-hero-cta className="opacity-0 mt-10">
          <a
            href="#contacto"
            className="btn btn-violet spacegrotesk-medium inline-flex min-h-[56px] items-center gap-3 rounded-full bg-violet px-7 py-4 text-h5 text-cream shadow-[0_14px_34px_rgb(97_76_222_/_0.3)]"
          >
            <span className="bl"><span data-t={content.hero.cta}>{content.hero.cta}</span></span>
            <ShiftArrow direction="down-right" className="btn-ico h-4 w-4" />
          </a>
        </div>
      </div>

      <div data-hero-media className="relative w-full overflow-hidden bg-surface-raised opacity-0">
        <video className="aspect-[4/3] h-full w-full object-cover" autoPlay muted loop playsInline aria-label="Video de Shift Agency">
          <source src="/videos/Video-Shift%20Agency.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
