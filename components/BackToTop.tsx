"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { ShiftArrow } from "@/components/ShiftArrow";

// Flecha flotante abajo a la derecha: aparece después del hero y vuelve al inicio.
export function BackToTop() {
  const { content } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 transition-[opacity,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-75 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={content.footer.backToTop}
        tabIndex={visible ? 0 : -1}
        className="btn btn-violet flex h-14 w-14 items-center justify-center rounded-full bg-violet text-cream shadow-[0_12px_30px_rgb(97_76_222_/_0.4)]"
      >
        <ShiftArrow direction="up" className="btn-ico h-4 w-4" />
      </button>
    </div>
  );
}
