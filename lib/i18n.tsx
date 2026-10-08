"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "es" | "en";

type Translation = {
  header: { links: string[]; cta: string; toggleLabel: string; homeLabel: string };
  hero: { eyebrow: string; title: string[]; description: string; cta: string };
  services: { title: string; description: string; items: { title: string; subitems: string[] }[] };
  about: { title: string; description: string; stats: string[]; statsDescription: string[]; statsImages: { image1?: string; image2?: string }[] };
  work: { title: string; description: string; items: { title: string; client: string, category: string; thumbnail: string }[] };
  reviews: { title: string; description: string; client: string; service: string; message: string; score: string; expandLabel: string; items: { client: string; service: string; message: string; score: string }[] };
  contact: { title: string; headline: string; headlineCta: string; description: string; nameLabel: string; namePlaceholder: string; whatsappLabel: string; whatsappPlaceholder: string; emailLabel: string; emailPlaceholder: string; brandLabel: string; brandPlaceholder: string; industryLegend: string; industryOptions: string[]; servicesLegend: string; servicesOptions: string[]; servicesError: string; timingLegend: string; timingOptions: string[]; messageLabel: string; messagePlaceholder: string; whatsappCta: string; submit: string; sentTitle: string; sentText: string; sentAgain: string };
  shiftExperience: { enLabel: string; agency: string; helping: string; brand: string; communicate: string; verse: string; tailWords: string[]; unique: string; decoration: string };
  footer: { navigation: string; socialMedia: string; location: string; rights: string; tagline: string; backToTop: string; ariaLabel: string };
};

export const translations: Record<Language, Translation> = {
  es: {
    header: { links: ["Servicios", "Nosotros", "Trabajos", "Contactanos"], cta: "Contactanos", toggleLabel: "Cambiar idioma a inglés", homeLabel: "Shift Agency - inicio" },
    hero: { eyebrow: "Agencia de Marketing", title: ["Impulsamos", "tu marca hacia", "un cambio real"], description: "Redefinimos la comunicación con estrategia, dirección tecnológica y creatividad aplicada.", cta: "Contactanos" },
    services: { title: "Servicios", description: "Creamos servicios pensados para generar ese cambio que conecta, emociona y deja huella en tu audiencia.", items: [
      { title: "Diseño Web", subitems: ["Sitios institucionales", "E-commerce", "Prototipado UX/UI", "Landing pages"] },
      { title: "Redes Sociales", subitems: ["Estrategia de contenido", "Community management", "Diseño de piezas", "Pauta y segmentación"] },
      { title: "Branding", subitems: ["Identidad visual", "Manual de marca", "Naming", "Tono de comunicación"] },
      { title: "Diseño Gráfico", subitems: ["Piezas digitales", "Piezas impresas", "Packaging", "Ilustración"] },
      { title: "Campañas Performance", subitems: ["Google Ads", "Meta Ads", "Analítica y KPIs", "Optimización de conversión"] },
      { title: "Contenido Multimedia", subitems: ["Fotografía", "Video y motion", "Edición", "Guionado"] },
      { title: "Email MKTG", subitems: ["Automatización", "Segmentación de listas", "Diseño de newsletters", "Reportes de performance"] },
    ] },
    about: { title: "Nosotros", description: "La idea de Shift nació de escuchar a clientes que llegaban desilusionados por experiencias previas con otras agencias: poca atención, contenidos genéricos y estrategias sin identidad. Vimos en esa necesidad una oportunidad para hacer las cosas diferentes. ", stats: ["Años en el mercado", "Trabajos realizados", "Servicio integral", "Trabajo a medida"], statsDescription: ["Acompañamos el crecimiento del mercado digital, adaptándonos y perfeccionando nuestros procesos para ofrecerte siempre lo último.", "Cada proyecto es un mundo y nos encantan los nuevos desafíos. Ya entregamos más de 50 trabajos donde pusimos cabeza, estrategia y mucha creatividad.", "No nos quedamos a medias. Cubrimos todos los frentes para que tu comunicación digital tenga sentido en cada canal y formato.", "Sin estructuras rígidas. Sumamos a los especialistas exactos que tu proyecto necesita en cada etapa para garantizar el mejor resultado."], statsImages: [{ image1: "", image2: "" }, { image1: "", image2: "" }, { image1: "", image2: "" }, { image1: "", image2: "" }] },
    work: { title: "Trabajos", description: "Detrás de cada resultado hay un proceso de transformación, marcas que llegan buscando algo distinto y encuentran en nuestra metodología el impulso que necesitaban. No mostramos solo diseños o campañas, mostramos la evolución de una identidad, el camino que refleja cómo impulsamos el cambio en cada detalle.", items: [{ title: "Diseño Web", client: "Embassy Zona Francia", category: "Logística", thumbnail: "/images/thumbnail.png" }, { title: "Rebranding", client: "Bashem Realty", category: "Inmobiliaria", thumbnail: "/images/thumbnail.png" }, { title: "Creación de contenido", client: "ABRE Desarrollos", category: "Desarrolladora", thumbnail: "/images/thumbnail.png" }]}, /* Acá agregas proyectos, en la misma línea abajo los traducis al inglés*/
    reviews: { title: "Reviews", description: "Estas son algunas de las encuestas generales que les hacemos a nuestros clientes para evaluar nuestros servicios.", client: "Cliente", service: "Servicio", message: "Mensaje", score: "Puntaje", expandLabel: "Ver mensaje completo de", items: [
      // TODO: reemplazar cada mensaje por el texto completo de la encuesta del cliente.
      { client: "Gonzalo Curti", service: "Servicio 360° Completo", message: "Nos brindaron un montón de ayuda [completar con el resto del mensaje de la encuesta]", score: "9/10" },
      { client: "Pablo Vaisberg", service: "Branding", message: "Nos brindaron un montón de ayuda [completar con el resto del mensaje de la encuesta]", score: "9/10" },
      { client: "Alex Blanca", service: "Servicio 360° Completo", message: "Nos brindaron un montón de ayuda [completar con el resto del mensaje de la encuesta]", score: "10/10" },
      { client: "Marcela G. Tedesco", service: "Gestión RRSS | Pauta Publicitaria", message: "Nos brindaron un montón de ayuda [completar con el resto del mensaje de la encuesta]", score: "10/10" },
    ] }, /* Acá agregás clientes; abajo los traducís al inglés */
    contact: { title: "Contactanos", headline: "¿Sentís que tu marca está lista para el cambio?", headlineCta: "Empecemos.", description: "Completá el formulario y te respondemos en menos de 24 hs con una propuesta a medida.", nameLabel: "Nombre", namePlaceholder: "¿Cómo te llamás?", whatsappLabel: "Teléfono", whatsappPlaceholder: "¿A qué número te escribimos?", emailLabel: "Email", emailPlaceholder: "tu@email.com", brandLabel: "Marca o empresa", brandPlaceholder: "¿Cómo se llama tu marca?", industryLegend: "¿De qué rubro es tu marca?", industryOptions: ["Inmobiliaria", "Desarrolladora", "Gastronomía", "Retail / E-commerce", "Servicios profesionales", "Otro"], servicesLegend: "¿Qué necesitás?", servicesOptions: ["Diseño web", "Redes sociales", "Branding", "Diseño gráfico", "Campañas performance", "Contenido multimedia", "Email marketing"], servicesError: "Elegí al menos un servicio.", timingLegend: "¿Cuándo te gustaría arrancar?", timingOptions: ["Lo antes posible", "En 1 a 3 meses", "Estoy explorando"], messageLabel: "Mensaje", messagePlaceholder: "Contanos dónde está tu marca hoy y a dónde la querés llevar…", whatsappCta: "¿Preferís hablar? Escribinos por WhatsApp", submit: "Enviar consulta", sentTitle: "¡Gracias! Recibimos tu consulta.", sentText: "Te respondemos en menos de 24 hs. Mientras tanto, podés escribirnos por WhatsApp.", sentAgain: "Enviar otra consulta" },
    shiftExperience: { enLabel: "En", agency: "Agency", helping: "ayudamos a", brand: "tu marca", communicate: "Comunicar", verse: "Verse", tailWords: ["mejor.", "Sin", "perder", "lo", "que", "la", "hace"], unique: "Única.", decoration: "x } y # / !" },
    footer: { navigation: "Navegación", socialMedia: "Redes sociales", location: "Buenos Aires, Argentina", rights: "Todos los derechos reservados", tagline: "Comunicá y verte mejor.", backToTop: "Volver arriba", ariaLabel: "Navegación del pie de página" },
  },
  en: {
    header: { links: ["Services", "About us", "Work", "Contact us"], cta: "Contact us", toggleLabel: "Switch language to Spanish", homeLabel: "Shift Agency - home" },
    hero: { eyebrow: "Marketing Agency", title: ["We drive", "your brand toward", "real change"], description: "We redefine communication through strategy, technology leadership, and applied creativity.", cta: "Contact us" },
    services: { title: "Services", description: "We create services designed to generate that change that connects, moves, and leaves a mark on your audience.", items: [
      { title: "Web Design", subitems: ["Corporate websites", "E-commerce", "UX/UI Prototyping", "Landing pages"] },
      { title: "Social Media", subitems: ["Content strategy", "Community management", "Asset design", "Ad targeting"] },
      { title: "Branding", subitems: ["Visual identity", "Brand guidelines", "Naming", "Tone of voice"] },
      { title: "Graphic Design", subitems: ["Digital assets", "Print assets", "Packaging", "Illustration"] },
      { title: "Performance Campaigns", subitems: ["Google Ads", "Meta Ads", "Analytics & KPIs", "Conversion optimization"] },
      { title: "Multimedia Content", subitems: ["Photography", "Video & motion", "Editing", "Scriptwriting"] },
      { title: "Email MKTG", subitems: ["Automation", "List segmentation", "Newsletter design", "Performance reports"] },
    ] },
    about: { title: "About us", description: "The idea of Shift was born from listening to clients who arrived disappointed by previous experiences with other agencies: little attention, generic content, and strategies without identity. We saw in that need an opportunity to do things differently.", stats: ["Years in the market", "Completed projects", "Full-service support", "Tailored work"], statsDescription: ["We've been at the forefront of the digital market, adapting and refining our processes to always offer you the latest.", "Every project is a world and we love the new challenges. We've delivered over 50 projects where we put our heads, strategy, and a lot of creativity.", "We don't stop halfway. We cover all fronts so your digital communication makes sense in every channel and format.", "No rigid structures. We bring in the exact specialists your project needs at each stage to guarantee the best outcome."], statsImages: [{ image1: "", image2: "" }, { image1: "", image2: "" }, { image1: "", image2: "" }, { image1: "", image2: "" }] },
    work: { title: "Work", description: "Behind every result is a transformation process—brands that arrive looking for something different and find the momentum they need in our methodology. We don’t just show designs or campaigns; we showcase the evolution of an identity, the path that reflects how we drive change in every detail.", items: [{ title: "Web Design", client: "Embassy Zona Francia", category: "Logistics", thumbnail: "/images/thumbnail.png" }, { title: "Rebranding", client: "Bashem Realty", category: "Real Estate", thumbnail: "/images/thumbnail.png" }, { title: "Content Creation", client: "ABRE Desarrollos", category: "Development", thumbnail: "/images/thumbnail.png" }]},
    reviews: { title: "Reviews", description: "These are some of the general surveys we give our clients to evaluate our services.", client: "Client", service: "Service", message: "Message", score: "Score", expandLabel: "Read the full message from", items: [
      { client: "Gonzalo Curti", service: "Full 360° Service", message: "They gave us a lot of help [complete with the rest of the survey message]", score: "9/10" },
      { client: "Pablo Vaisberg", service: "Branding", message: "They gave us a lot of help [complete with the rest of the survey message]", score: "9/10" },
      { client: "Alex Blanca", service: "Full 360° Service", message: "They gave us a lot of help [complete with the rest of the survey message]", score: "10/10" },
      { client: "Marcela G. Tedesco", service: "Social Media | Paid Ads", message: "They gave us a lot of help [complete with the rest of the survey message]", score: "10/10" },
    ] },
    contact: { title: "Contact us", headline: "Do you feel your brand is ready for change?", headlineCta: "Let's get started.", description: "Fill out the form and we'll get back to you within 24 hours with a tailored proposal.", nameLabel: "Name", namePlaceholder: "What's your name?", whatsappLabel: "Phone", whatsappPlaceholder: "Which number should we call?", emailLabel: "Email", emailPlaceholder: "you@email.com", brandLabel: "Brand or company", brandPlaceholder: "What's your brand called?", industryLegend: "What industry is your brand in?", industryOptions: ["Real estate", "Developer", "Food & beverage", "Retail / E-commerce", "Professional services", "Other"], servicesLegend: "What do you need?", servicesOptions: ["Web design", "Social media", "Branding", "Graphic design", "Performance campaigns", "Multimedia content", "Email marketing"], servicesError: "Pick at least one service.", timingLegend: "When would you like to start?", timingOptions: ["As soon as possible", "In 1 to 3 months", "Just exploring"], messageLabel: "Message", messagePlaceholder: "Tell us where your brand is today and where you want to take it…", whatsappCta: "Rather talk? Message us on WhatsApp", submit: "Send inquiry", sentTitle: "Thanks! We got your inquiry.", sentText: "We'll reply within 24 hours. In the meantime, you can message us on WhatsApp.", sentAgain: "Send another inquiry" },
    shiftExperience: { enLabel: "In", agency: "Agency", helping: "we help", brand: "your brand", communicate: "Communicate", verse: "Look", tailWords: ["better.", "Without", "losing", "what", "makes", "it", "unique"], unique: "Unique.", decoration: "x } y # / !" },
    footer: { navigation: "Navigation", socialMedia: "Social Media", location: "Buenos Aires, Argentina", rights: "All rights reserved", tagline: "Communicate and look better.", backToTop: "Back to top", ariaLabel: "Footer navigation" },
  },
};

const LanguageContext = createContext<{ language: Language; content: Translation; toggleLanguage: () => void }>({ language: "es", content: translations.es, toggleLanguage: () => undefined });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function toggleLanguage() {
    setLanguage((current) => (current === "es" ? "en" : "es"));
  }

  return <LanguageContext.Provider value={{ language, content: translations[language], toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
