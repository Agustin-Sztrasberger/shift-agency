import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Nosotros } from "@/components/Nosotros";
import { ShiftExperience } from "@/components/ShiftExperience";
import { Trabajos } from "@/components/Trabajos";
import { Reviews } from "@/components/Reviews";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { LanguageProvider } from "../lib/i18n";

export default function Home() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Nosotros />
        <ShiftExperience />
        <Trabajos />
        <Reviews />
        <Contacto />
      </main>
      <Footer />
      <BackToTop />
    </LanguageProvider>
  );
}
