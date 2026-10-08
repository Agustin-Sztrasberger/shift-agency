"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: 5, suffix: "+" },
  { value: 50, suffix: "+" },
  { value: 360, suffix: "°" },
  { value: 100, suffix: "%" },
];

const imagePositions = [
  {
    image1: { top: "15%", left: "8%" },
    image2: { top: "68%", left: "80%" },
  },
  {
    image1: { top: "62%", left: "10%" },
    image2: { top: "18%", left: "78%" },
  },
  {
    image1: { top: "20%", left: "75%" },
    image2: { top: "64%", left: "12%" },
  },
  {
    image1: { top: "66%", left: "68%" },
    image2: { top: "16%", left: "16%" },
  },
];

function SpringCounter({
  target,
  suffix,
  active,
  onComplete,
}: {
  target: number;
  suffix: string;
  active: boolean;
  onComplete: () => void;
}) {
  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [display, setDisplay] = useState(0);

  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
  }, [target]);

  useEffect(() => {
    if (!active) return;

    motionValue.set(target);
  }, [active, target, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.round(latest));

      if (
        !completedRef.current &&
        Math.abs(latest - target) < 0.5
      ) {
        completedRef.current = true;
        onComplete();
      }
    });
  }, [springValue, target, onComplete]);

  return (
    <h2 className="spacegrotesk flex items-start gap-2 text-[clamp(7rem,18vw,18.75rem)] leading-none tabular-nums">
      {display}

      <span className="spacegrotesk py-2 text-[clamp(5.5rem,10vw,12.5rem)] leading-none text-violet">
        {suffix}
      </span>
    </h2>
  );
}

function VerticalProgress({
  activeIndex,
  total,
  activeLabel,
}: {
  activeIndex: number;
  total: number;
  activeLabel: string;
}) {
  const percent =
    total > 1 ? (activeIndex / (total - 1)) * 100 : 0;

  return (
    <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 md:right-10 md:flex">
      <div className="relative h-40 w-px bg-white/15">
        <motion.span
          aria-hidden
          className="absolute left-1/2 h-6 w-[3px] -translate-x-1/2 rounded-full bg-violet"
          animate={{ top: `${percent}%` }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ marginTop: "-12px" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.span
          key={activeLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs tracking-widest text-ink [writing-mode:vertical-rl]"
        >
          {activeLabel}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function FloatingImage({
  position,
  floatDuration,
  floatDelay = 0,
  imageSrc,
}: {
  position: { top: string; left: string };
  floatDuration: number;
  floatDelay?: number;
  imageSrc?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className="absolute z-0 h-20 w-28 sm:h-28 sm:w-36 lg:h-36 lg:w-44"
      animate={position}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="h-full w-full overflow-hidden rounded-lg bg-surface"
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-lg bg-surface" />
        )}
      </motion.div>
    </motion.div>
  );
}

export function Nosotros() {
  const { content } = useLanguage();

  const pinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: introRef.current, start: "top 80%", once: true },
        })
        .from("[data-about-title]", { y: 56, opacity: 0, duration: 0.9 })
        .from("[data-about-intro]", { y: 32, opacity: 0, duration: 0.75 }, "-=0.6");
    });
    return () => mm.revert();
  }, { scope: introRef });

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEnteredStats, setHasEnteredStats] =
    useState(false);
  const [isCounterAnimating, setIsCounterAnimating] =
    useState(false);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  /*
   * Detectamos cuándo entramos realmente al scroll-jacking.
   */
  useMotionValueEvent(
    scrollYProgress,
    "change",
    (progress) => {
      if (progress > 0 && !hasEnteredStats) {
        setHasEnteredStats(true);
        setIsCounterAnimating(true);
      }

      const index = Math.min(
        stats.length - 1,
        Math.floor(progress * stats.length)
      );

      if (index !== activeIndex) {
        setIsCounterAnimating(true);
        setActiveIndex(index);
      }
    }
  );

  /*
   * Bloqueamos nuevos movimientos de rueda mientras
   * el contador está haciendo su animación.
   *
   * El movimiento que provoca el cambio de stat ya ocurrió;
   * lo que bloqueamos es que el usuario pueda seguir
   * avanzando antes de que termine el counter.
   */
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isCounterAnimating) return;

      event.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isCounterAnimating]);

  const handleCounterComplete = useCallback(() => {
    setIsCounterAnimating(false);
  }, []);

  const current = stats[activeIndex];

  const currentLabel =
    content.about.stats[activeIndex];

  const currentDescription =
    content.about.statsDescription[activeIndex];

  const currentPositions =
    imagePositions[activeIndex];

  const currentImage1 =
    content.about.statsImages?.[activeIndex]?.image1 ?? "";

  const currentImage2 =
    content.about.statsImages?.[activeIndex]?.image2 ?? "";

  return (
    <section id="nosotros">
      {/* Presentación de la sección — scroll normal */}
      <div ref={introRef} className="bg-surface-raised px-6 py-32 backdrop-blur-xl md:px-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 data-about-title className="section-title mb-10 flex items-start gap-2 text-h2">
            {content.about.title}

            <span className="section-num self-start text-h3 text-violet spacegrotesk-bold">
              02
            </span>
          </h2>

          <p data-about-intro className="max-w-2xl text-h5 text-ink">
            {content.about.description}
          </p>
        </div>
      </div>

      {/* Stats — scroll-jacking */}
      <div
        ref={pinRef}
        className="relative bg-surface-raised backdrop-blur-xl"
        style={{
          height: `${stats.length * 100}vh`,
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden px-6 md:px-16 lg:px-8">
          <FloatingImage
            position={currentPositions.image1}
            floatDuration={6}
            imageSrc={currentImage1}
          />

          <FloatingImage
            position={currentPositions.image2}
            floatDuration={7}
            floatDelay={1}
            imageSrc={currentImage2}
          />

          <VerticalProgress
            activeIndex={activeIndex}
            total={stats.length}
            activeLabel={currentLabel}
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2 text-h3 text-ink"
              >
                {currentLabel}
              </motion.p>
            </AnimatePresence>

            <SpringCounter
              target={current.value}
              suffix={current.suffix}
              active={hasEnteredStats}
              onComplete={handleCounterComplete}
            />

            <AnimatePresence mode="wait">
              <motion.p
                key={currentDescription}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-6 max-w-xl text-h4 text-ink"
              >
                {currentDescription}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}