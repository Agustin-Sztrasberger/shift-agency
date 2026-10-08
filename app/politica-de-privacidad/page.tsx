import { ShiftArrow } from "@/components/ShiftArrow";
import Link from "next/link";
import { PageMotion } from "@/components/animations/PageMotion";

const sections = [
  {
    title: "1. Información que recopilamos",
    body: "Cuando completás nuestro formulario de contacto o nos escribís por WhatsApp o email, recopilamos datos como tu nombre, email, teléfono y el contenido de tu mensaje. También podemos recopilar información técnica básica (como el tipo de navegador o la página desde la que llegaste) a través de herramientas de analítica.",
  },
  {
    title: "2. Uso de la información",
    body: "Utilizamos tus datos exclusivamente para responder tus consultas, elaborar propuestas comerciales y, si nos autorizás, enviarte novedades sobre Shift Agency. Nunca vendemos ni cedemos tu información a terceros con fines comerciales ajenos a nuestro servicio.",
  },
  {
    title: "3. Cookies",
    body: "El Sitio puede utilizar cookies propias y de terceros para mejorar tu experiencia de navegación y analizar el uso general de la web. Podés configurar tu navegador para rechazar cookies, aunque esto podría afectar algunas funcionalidades.",
  },
  {
    title: "4. Compartir información con terceros",
    body: "Solo compartimos información personal con proveedores que nos ayudan a operar el Sitio (por ejemplo, hosting o herramientas de email marketing), quienes están obligados a resguardar la confidencialidad de tus datos, o cuando así lo exija la ley.",
  },
  {
    title: "5. Seguridad de los datos",
    body: "Adoptamos medidas técnicas y organizativas razonables para proteger tu información contra accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema es 100% infalible, por lo que no podemos garantizar seguridad absoluta.",
  },
  {
    title: "6. Tus derechos",
    body: "Podés solicitarnos en cualquier momento el acceso, la rectificación o la eliminación de tus datos personales, escribiéndonos a info@shiftagency.com.ar. Responderemos tu solicitud a la brevedad posible.",
  },
  {
    title: "7. Retención de datos",
    body: "Conservamos tu información personal durante el tiempo necesario para cumplir con los fines descritos en esta política, o hasta que nos solicités su eliminación.",
  },
  {
    title: "8. Cambios en esta política",
    body: "Podemos actualizar esta Política de Privacidad periódicamente. Te recomendamos revisarla de tanto en tanto para estar al tanto de cualquier cambio.",
  },
  {
    title: "9. Contacto",
    body: "Si tenés dudas sobre cómo tratamos tu información personal, podés contactarnos a info@shiftagency.com.ar o por WhatsApp al +54 11 3201-6027.",
  },
];

export default function PoliticaDePrivacidadPage() {
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

          <div className="overflow-hidden"><h1 data-page-title className="mt-10 text-h1 leading-[0.95]">Política de Privacidad</h1></div>
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
