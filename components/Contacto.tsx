"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";
import { CONTACT } from "@/lib/social";
import { ShiftArrow } from "@/components/ShiftArrow";
import { WhatsappIcon } from "@/components/SocialIcons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function CheckIcon() {
  return (
    <svg className="chip-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Chips({
  legend,
  options,
  selected,
  onToggle,
  required,
}: {
  legend: string;
  options: string[];
  selected: number[];
  onToggle: (index: number) => void;
  required?: boolean;
}) {
  return (
    <fieldset data-contact-field className="chip-set">
      <legend className="uf-label">
        {legend}
        {required && <span className="req" aria-hidden>*</span>}
      </legend>
      <div className="chips">
        {options.map((option, index) => {
          const on = selected.includes(index);
          return (
            <button key={option} type="button" aria-pressed={on} onClick={() => onToggle(index)} className={`chip ${on ? "on" : ""}`}>
              <CheckIcon />
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div data-contact-field className="uf">
      <label htmlFor={id} className="uf-label">
        {label}
        {required && <span className="req" aria-hidden>*</span>}
      </label>
      <input className="uf-input" id={id} name={id} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} />
      <span className="uf-line" aria-hidden />
    </div>
  );
}

export function Contacto() {
  const { content } = useLanguage();
  const c = content.contact;
  const container = useRef<HTMLElement>(null);

  // Rubro y momento: una sola opción. Servicios: varias.
  const [industry, setIndustry] = useState<number[]>([]);
  const [services, setServices] = useState<number[]>([]);
  const [timing, setTiming] = useState<number[]>([]);
  const [sent, setSent] = useState(false);
  const [servicesError, setServicesError] = useState(false);

  const toggleMulti = (index: number) => {
    setServicesError(false);
    setServices((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!services.length) {
      setServicesError(true);
      return;
    }
    // TODO: conectar el envío (Formspree, Resend, API route, etc.). Datos disponibles:
    // new FormData(event.currentTarget) + rubro: c.industryOptions[industry[0]],
    // servicios: services.map((i) => c.servicesOptions[i]), momento: c.timingOptions[timing[0]]
    setSent(true);
  }

  function resetForm() {
    setIndustry([]);
    setServices([]);
    setTiming([]);
    setServicesError(false);
    setSent(false);
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: { trigger: "[data-contact-title]", start: "top 85%", once: true },
          })
          .from("[data-contact-title]", { y: 56, opacity: 0, duration: 0.9 })
          .from("[data-contact-intro]", { y: 28, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6");

        gsap.set("[data-contact-field], [data-contact-cta]", { y: 26, opacity: 0 });
        ScrollTrigger.batch("[data-contact-field], [data-contact-cta]", {
          start: "top 90%",
          once: true,
          onEnter: (batch: Element[]) =>
            gsap.to(batch, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });
      });
      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section ref={container} id="contacto" className="bg-surface-raised px-6 py-32 text-cream md:px-16 lg:px-8">
      <div className="mx-auto max-w-[720px]">
        <div className="text-center">
          <h2 data-contact-title className="section-title section-title-lg inline-flex items-start justify-center gap-3 text-h1 leading-none text-cream">
            {c.title}
            <span className="section-num spacegrotesk mt-[0.08em] text-h3 text-violet">04</span>
          </h2>
        </div>

        <div data-contact-intro className="mt-10 rounded-[22px] bg-[#222222] px-6 py-10 text-center md:px-12 md:py-12">
          <p className="mx-auto max-w-xl text-h3 leading-tight text-cream">
            {c.headline} <span className="text-violet-light">{c.headlineCta}</span>
          </p>
          <p className="spacegrotesk mx-auto mt-5 max-w-sm text-base leading-snug text-cream/55">{c.description}</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-9">
            <Field id="nombre" label={c.nameLabel} placeholder={c.namePlaceholder} required autoComplete="name" />

            <div className="grid gap-9 sm:grid-cols-2">
              <Field id="telefono" label={c.whatsappLabel} placeholder={c.whatsappPlaceholder} type="tel" required autoComplete="tel" />
              <Field id="email" label={c.emailLabel} placeholder={c.emailPlaceholder} type="email" required autoComplete="email" />
            </div>

            <Field id="marca" label={c.brandLabel} placeholder={c.brandPlaceholder} required autoComplete="organization" />

            <Chips legend={c.industryLegend} options={c.industryOptions} selected={industry} onToggle={(i) => setIndustry([i])} />
            <div>
              <Chips legend={c.servicesLegend} options={c.servicesOptions} selected={services} onToggle={toggleMulti} required />
              {servicesError && (
                <p role="alert" className="spacegrotesk mt-3 text-sm text-violet-light">{c.servicesError}</p>
              )}
            </div>
            <Chips legend={c.timingLegend} options={c.timingOptions} selected={timing} onToggle={(i) => setTiming([i])} />

            <div data-contact-field className="uf">
              <label htmlFor="mensaje" className="uf-label">{c.messageLabel}</label>
              <textarea className="uf-input min-h-[120px] resize-y" id="mensaje" name="mensaje" rows={4} placeholder={c.messagePlaceholder} />
              <span className="uf-line" aria-hidden />
            </div>

            <div data-contact-cta className="mt-1 flex flex-wrap items-center justify-between gap-5">
              <a className="wa-link" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-5 w-5 text-violet-light" />
                {c.whatsappCta}
              </a>
              <button
                type="submit"
                className="btn btn-violet spacegrotesk-medium flex min-h-[60px] items-center gap-3 rounded-full bg-violet px-8 py-4 text-h5 text-cream shadow-[0_16px_36px_rgb(97_76_222_/_0.28)]"
              >
                <span className="bl"><span data-t={c.submit}>{c.submit}</span></span>
                <ShiftArrow direction="down-right" className="btn-ico h-4 w-4" />
              </button>
            </div>
          </form>
        ) : (
          <div role="status" className="sent-card mt-12 rounded-[28px] bg-[#222222] px-8 py-14 text-center md:px-10">
            <div className="sent-ico mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-violet text-cream">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-6 text-h3">{c.sentTitle}</h3>
            <p className="spacegrotesk mx-auto mt-3 max-w-md text-h5 font-light leading-snug text-ink">{c.sentText}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-violet spacegrotesk-medium inline-flex min-h-[50px] items-center gap-2.5 rounded-full bg-violet px-6 py-3 text-base text-cream"
              >
                <span className="bl"><span data-t="WhatsApp">WhatsApp</span></span>
                <ShiftArrow className="btn-ico h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-line spacegrotesk-medium inline-flex min-h-[50px] items-center rounded-full border border-white/25 px-6 py-3 text-base text-cream"
              >
                <span className="bl"><span data-t={c.sentAgain}>{c.sentAgain}</span></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
