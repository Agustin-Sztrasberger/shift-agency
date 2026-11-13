"use client";

import { useEffect, useState } from "react";

// true cuando el título del hero terminó de escribirse (o si no hay hero en la página).
export function useHeroTyped() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as unknown as { __shiftHeroTyped?: boolean };
    if (w.__shiftHeroTyped || !document.getElementById("hero")) {
      setReady(true);
      return;
    }
    const onTyped = () => setReady(true);
    window.addEventListener("shift:hero-typed", onTyped, { once: true });
    return () => window.removeEventListener("shift:hero-typed", onTyped);
  }, []);

  return ready;
}
