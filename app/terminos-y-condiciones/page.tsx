import { ShiftArrow } from "@/components/ShiftArrow";
import Link from "next/link";
import { PageMotion } from "@/components/animations/PageMotion";

const sections = [
  {
    title: "1. Aceptación de los términos",
    body: "Al acceder y utilizar el sitio web de Shift Agency (\"el Sitio\") aceptás quedar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguno de los puntos aquí descritos, te pedimos que no continúes utilizando el Sitio.",
  },
  {
    title: "2. Uso del sitio",
    body: "El contenido del Sitio se ofrece únicamente con fines informativos y comerciales. Te comprometés a utilizarlo de forma lícita, sin infringir derechos de terceros ni realizar acciones que puedan dañar, inutilizar o sobrecargar nuestros servidores o redes.",
  },
  {
    title: "3. Propiedad intelectual",
    body: "Todos los textos, imágenes, videos, marcas, logotipos y demás contenidos publicados en el Sitio son propiedad de Shift Agency o de sus respectivos titulares, y están protegidos por las leyes de propiedad intelectual vigentes. Queda prohibida su reproducción total o parcial sin autorización previa por escrito.",
  },
  {
    title: "4. Servicios y contrataciones",
    body: "La información publicada sobre nuestros servicios (diseño web, branding, redes sociales, campañas de performance, contenido multimedia, entre otros) tiene carácter orientativo. El alcance, los plazos y los costos definitivos de cada proyecto se establecen mediante una propuesta comercial específica acordada entre Shift Agency y el cliente.",
  },
  {
    title: "5. Enlaces a sitios de terceros",
    body: "El Sitio puede contener enlaces a sitios web de terceros (por ejemplo, redes sociales). Shift Agency no se responsabiliza por el contenido, las políticas de privacidad ni las prácticas de dichos sitios externos.",
  },
  {
    title: "6. Limitación de responsabilidad",
    body: "Shift Agency no garantiza que el Sitio esté libre de errores o interrupciones. En ningún caso seremos responsables por daños directos o indirectos derivados del uso o la imposibilidad de uso del Sitio.",
  },
  {
    title: "7. Modificaciones",
    body: "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigencia desde su publicación en esta misma página.",
  },
  {
    title: "8. Ley aplicable y jurisdicción",
    body: "Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Para cualquier controversia derivada de su interpretación o cumplimiento, las partes se someten a los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.",
  },
  {
    title: "9. Contacto",
    body: "Ante cualquier consulta sobre estos Términos y Condiciones, podés escribirnos a info@shiftagency.com.ar.",
  },
];

export default function TerminosYCondicionesPage() {
  return (
    <PageMotion>
    <main className="min-h-screen bg-surface text-cream">
      <section className="px-6 py-20 md:px-16 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            data-page-back
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-cream"
          >
            <ShiftArrow direction="left" className="h-3 w-3" /> Volver al inicio
          </Link>

          <div className="overflow-hidden"><h1 data-page-title className="mt-10 text-h1 leading-[0.95]">Términos y Condiciones</h1></div>
          <p data-page-intro className="mt-6 max-w-2xl text-h5 text-ink">
            Última actualización: 23 de septiembre de 2026
          </p>

          <div className="mt-16 flex flex-col gap-12">
            {sections.map((section) => (
              <article data-page-section key={section.title}>
                <h2 className="text-h4 text-cream">{section.title}</h2>
                <p className="mt-3 max-w-3xl text-ink">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
    </PageMotion>
  );
}
