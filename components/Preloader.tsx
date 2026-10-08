"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Phase = "loading" | "exiting" | "done";

export function Preloader({ children }: { children: React.ReactNode }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    if (percent >= 100) return;

    // Incrementos aleatorios para que el conteo no se sienta lineal/robótico
    const timeout = setTimeout(() => {
      setPercent((prev) => Math.min(prev + Math.floor(Math.random() * 8) + 4, 100));
    }, 150);

    return () => clearTimeout(timeout);
  }, [percent]);

  useEffect(() => {
    if (percent < 100) return;
    const exitTimeout = setTimeout(() => setPhase("exiting"), 350);
    return () => clearTimeout(exitTimeout);
  }, [percent]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const doneTimeout = setTimeout(() => {
      setPhase("done");
      window.dispatchEvent(new CustomEvent("shift:preloader-complete"));
    }, 900);
    return () => clearTimeout(doneTimeout);
  }, [phase]);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
  }, [phase]);

  return (
    <>
      {phase !== "done" && (
        <div
          className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-surface transition-all duration-700 ease-in-out ${
            phase === "exiting"
              ? "pointer-events-none scale-110 opacity-0"
              : "opacity-100"
          }`}
        >
          <div className="relative h-24 w-24 md:h-32 md:w-32">
            <Image
              src="/images/Icono shift.svg"
              alt=""
              fill
              priority
              className="object-contain opacity-15"
            />
            <div
              className="absolute inset-0 overflow-hidden transition-[clip-path] duration-150 ease-out"
              style={{ clipPath: `inset(${100 - percent}% 0 0 0)` }}
            >
              <Image
                src="/images/Icono shift.svg"
                alt="Shift"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <span className="spacegrotesk-medium text-h4 tabular-nums text-cream">
            {percent}%
          </span>
        </div>
      )}
      <div data-preloader-phase={phase}>{children}</div>
    </>
  );
}
