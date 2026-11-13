"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useHeroTyped } from "@/lib/useHeroTyped";
import { CONTACT } from "@/lib/social";
import { ShiftArrow } from "@/components/ShiftArrow";
import { WhatsappIcon } from "@/components/SocialIcons";

// Botones flotantes abajo a la derecha (mismo tamaño):
// arriba "volver al inicio" (aparece después del hero), abajo WhatsApp (siempre visible).
export function BackToTop() {
  const { language, content } = useLanguage();
  const [visible, setVisible] = useState(false);
  const ready = useHeroTyped();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 md:bottom-8 md:right-8">
      <div
        className={`transition-[opacity,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
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

      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === "es" ? "Escribinos por WhatsApp" : "Message us on WhatsApp"}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgb(37_211_102_/_0.35)] transition-[transform,opacity] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 ${ready ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <WhatsappIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
