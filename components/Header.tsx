"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { SOCIAL } from "@/lib/social";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

function LanguageToggle({ className = "h-11 w-28" }: { className?: string }) {
  const { language, content, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={content.header.toggleLabel}
      aria-pressed={language === "en"}
      className={`relative flex items-center rounded-full bg-[#1A1A1A] p-1.5 text-xs font-medium text-cream transition-colors hover:bg-[#222] ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-1.5 rounded-full bg-violet transition-[left,right] duration-300 ease-out ${
          language === "en" ? "left-1/2 right-1.5" : "left-1.5 right-1/2"
        }`}
      />
      <span className="relative z-10 flex w-1/2 items-center justify-center">ES</span>
      <span className="relative z-10 flex w-1/2 items-center justify-center">EN</span>
    </button>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <a
        href={SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`flex h-11 w-11 items-center justify-center text-cream/90 transition-colors hover:text-violet-light`}
      >
        <InstagramIcon className="h-[22px] w-[22px]" />
      </a>
      <a
        href={SOCIAL.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={`flex h-11 w-9 items-center justify-center text-cream/90 transition-colors hover:text-violet-light`}
      >
        <FacebookIcon className="h-[22px] w-[22px]" />
      </a>
    </div>
  );
}

export function Header() {
  const { content } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuOpenedAt = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      // Solo ocultar después de bajar un poco, para que no parpadee arriba de todo
      setHidden(scrollingDown && currentScrollY > 80);
      setScrolled(currentScrollY > 40);
      // En celular, la barra del navegador mueve el scroll al tocar: solo cerramos el menú
      // si la persona realmente scrolleó (más de 40px desde que lo abrió).
      if (Math.abs(currentScrollY - menuOpenedAt.current) > 40) setMobileMenuOpen(false);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: content.header.links[0], href: "#servicios" },
    { label: content.header.links[1], href: "#nosotros" },
    { label: content.header.links[2], href: "#trabajos" },
    { label: content.header.links[3], href: "#contacto" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Degradé para que el contenido no se mezcle con la nav al scrollear */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 py-4 sm:px-6 md:px-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-8">
        <a href="#" aria-label={content.header.homeLabel} className="shrink-0 justify-self-start">
          <Image
            src="/images/Logo-Shift-Blanco.svg"
            alt="Shift"
            width={141}
            height={40}
            priority
            className="h-[min(39px,calc((50vw_-_67px)*0.3065))] w-auto lg:h-9"
          />
        </a>

        <ul
          className={`hidden items-center gap-1 rounded-full bg-[#1A1A1A]/80 px-2 py-1 backdrop-blur-xl transition-all duration-300 ease-in-out lg:flex ${
            hidden ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="spacegrotesk block px-4 py-2.5 text-sm text-cream/90 transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop: redes + idioma */}
        <div className="hidden items-center justify-self-end gap-3 lg:flex">
          <SocialLinks />
          <LanguageToggle />
        </div>

        {/* Mobile: solo el switch de idioma, centrado entre el logo y el menú */}
        <div className="flex items-center justify-self-center lg:hidden">
          <LanguageToggle className="h-9 w-[84px] text-[11px]" />
        </div>

        <button
          type="button"
          onClick={() => {
            menuOpenedAt.current = window.scrollY;
            setMobileMenuOpen((open) => !open);
          }}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="relative -mr-2 flex h-11 w-11 shrink-0 items-center justify-center justify-self-end text-cream lg:hidden"
        >
          <span className="relative block h-3.5 w-6" aria-hidden>
            <span className={`absolute left-0 h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`grid px-4 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col rounded-2xl border border-white/10 bg-[#141414] p-2 shadow-[0_20px_50px_rgb(0_0_0_/_0.5)]">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  onClick={() => setMobileMenuOpen(false)}
                  className="spacegrotesk block rounded-xl px-4 py-3.5 text-lg text-cream/85 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
