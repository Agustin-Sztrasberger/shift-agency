"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLanguage } from "@/lib/i18n";
import { ShiftArrow } from "@/components/ShiftArrow";

gsap.registerPlugin(useGSAP);

// Evento que avisa al resto del sitio (header, etc.) que el título terminó de escribirse.
export const HERO_TYPED_EVENT = "shift:hero-typed";

const START_DELAY = 250; // respiro después de que cargan las fuentes
const LINE_PAUSE = 230; // pausa al terminar cada renglón
const SPACE_PAUSE = 45; // mini pausa entre palabras

function markTyped() {
  (window as unknown as { __shiftHeroTyped?: boolean }).__shiftHeroTyped = true;
  window.dispatchEvent(new CustomEvent(HERO_TYPED_EVENT));
}

/** Ritmo humano: variación leve y determinística (siempre se ve igual), con pausas en espacios y renglones. */
function buildSchedule(lines: string[]) {
  const times: number[] = [];
  let t = START_DELAY;
  let n = 0;
  lines.forEach((line, lineIndex) => {
    Array.from(line).forEach((char) => {
      n += 1;
      const jitter = (Math.sin(n * 12.9898) * 43758.5453) % 1; // -1..1 → ~33 a ~59 ms por letra
      t += 46 + Math.abs(jitter) * 26 - 13;
      if (char === " ") t += SPACE_PAUSE;
      times.push(t);
    });
    if (lineIndex < lines.length - 1) t += LINE_PAUSE;
  });
  return times;
}

/**
 * Título con efecto máquina de escribir.
 * - La letra recién tipeada aparece al instante en violeta; la anterior pasa a crema con un fundido corto.
 * - El último renglón ("un cambio real") queda violeta.
 * - Las letras ya ocupan su lugar (transparentes), así el texto no se mueve.
 * - Se anima con requestAnimationFrame tocando el DOM directo: no se re-renderiza React en cada letra.
 * - El cursor queda fijo mientras escribe; al terminar titila un par de veces y desaparece.
 */
function TypewriterTitle({ lines, onDone }: { lines: string[]; onDone: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const title = titleRef.current;
    const caret = caretRef.current;
    if (!title || !caret) return;
    const chars = Array.from(title.querySelectorAll<HTMLSpanElement>("[data-tw-char]"));

    const finish = () => {
      setDone(true);
      onDoneRef.current();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      caret.style.opacity = "0";
      finish();
      return;
    }

    const placeCaret = (index: number) => {
      // index = cantidad de letras tipeadas; el cursor va a la derecha de la última (o antes de la primera)
      const ref = chars[Math.max(index - 1, 0)];
      if (!ref) return;
      const box = title.getBoundingClientRect();
      const r = ref.getBoundingClientRect();
      const x = (index === 0 ? r.left : r.right) - box.left;
      caret.style.height = `${r.height * 0.78}px`;
      caret.style.transform = `translate3d(${x + r.height * 0.03}px, ${r.top - box.top + r.height * 0.13}px, 0)`;
    };

    const schedule = buildSchedule(lines);
    let raf = 0;
    let typed = 0;
    let startAt = 0;
    let fadeTimer = 0;

    const tick = (now: number) => {
      if (!startAt) startAt = now;
      const elapsed = now - startAt;
      let changed = false;
      // Revela todas las letras que ya "tocaba" escribir (si un frame se atrasa, no se pierde el ritmo)
      while (typed < chars.length && elapsed >= schedule[typed]) {
        chars[typed - 1]?.classList.remove("cur");
        chars[typed].classList.add("on", "cur");
        typed += 1;
        changed = true;
      }
      if (changed) placeCaret(typed);

      if (typed >= chars.length) {
        caret.classList.add("animate-caret");
        fadeTimer = window.setTimeout(() => {
          caret.classList.remove("animate-caret"); // si no, el parpadeo pisa el fundido
          caret.style.opacity = "0";
        }, 1300);
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    let cancelled = false;
    // Arrancamos cuando las fuentes ya cargaron: evita saltos y tirones en las primeras letras
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return;
      placeCaret(0);
      caret.style.opacity = "1";
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(fadeTimer);
    };
    // Solo al montar: es la entrada del sitio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1
      ref={titleRef}
      aria-label={lines.join(" ")}
      className="relative text-[clamp(2.9rem,8.4vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.01em]"
    >
      <span
        ref={caretRef}
        aria-hidden
        className="tw-caret pointer-events-none absolute left-0 top-0 w-[0.055em] rounded-full bg-violet opacity-0"
      />
      {lines.map((line, lineIndex) => {
        const isLast = lineIndex === lines.length - 1;
        return (
          <span key={`${lineIndex}-${line}`} className="block" aria-hidden>
            {Array.from(line).map((char, charIndex) => (
              <span
                key={charIndex}
                data-tw-char
                className={`tw-char${isLast ? " tw-last" : ""}${done ? " on" : ""}`}
              >
                {char}
              </span>
            ))}
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // El video (pesado) empieza a cargar y reproducirse recién cuando termina el título
  useEffect(() => {
    if (!typed || !videoRef.current) return;
    const video = videoRef.current;
    video.preload = "auto";
    video.play().catch(() => undefined);
  }, [typed]);

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
        <video ref={videoRef} className="aspect-[4/3] h-full w-full object-cover" muted loop playsInline preload="none" aria-label="Video de Shift Agency">
          <source src="/videos/Video-Shift%20Agency.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
