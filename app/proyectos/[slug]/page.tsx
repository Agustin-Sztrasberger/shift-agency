import { ShiftArrow } from "@/components/ShiftArrow";
import Link from "next/link";
import { PageMotion } from "@/components/animations/PageMotion";
import { notFound } from "next/navigation";
import { projectDetails, type ProjectSlug } from "@/lib/projects";




export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug as ProjectSlug;
  const project = projectDetails[slug];

  if (!project) {
    notFound();
  }

  return (
    <PageMotion>
    <main className="min-h-screen bg-surface text-cream">
      <section className="px-6 pb-20 pt-8 md:px-16 md:pb-32 md:pt-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            data-page-back
            href="/#trabajos"
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-cream"
          >
            <ShiftArrow direction="left" className="h-3 w-3" /> Volver a trabajos
          </Link>

          <div className="mt-16 grid items-end gap-12 md:mt-24 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
            <div>
              <p data-page-eyebrow className="mb-6 text-sm uppercase tracking-[0.24em] text-violet">
                {project.label}
              </p>
              <div className="overflow-hidden">
                <h1 data-page-title className="max-w-4xl text-h1 leading-[0.95]">
                  {project.title}
                </h1>
              </div>
            </div>
            <p data-page-intro className="max-w-md pb-2 text-h4 leading-tight text-cream/70">
              {project.intro}
            </p>
          </div>

          <div data-page-media className="mt-16 overflow-hidden rounded-lg bg-surface-raised md:mt-24">
            <img
              src={project.thumbnail}
              alt={`Vista previa de ${project.title}`}
              className="aspect-[16/8] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section data-page-section className="border-y border-white/10 bg-surface-raised px-6 py-20 md:px-16 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-violet">El proyecto</p>
            <h2 className="mt-5 text-h2 leading-none">{project.client}</h2>
            <p className="mt-5 text-ink text-h5">{project.category}</p>
          </div>
          <div>
            <p className="max-w-2xl text-h3 leading-tight text-cream">
              {project.objective}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-cream/70"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-page-section className="px-6 py-20 md:px-16 md:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {project.metrics.map(([number, heading, description]) => (
              <article key={number} className="border-t border-white/20 pt-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <h2 className="text-h2">{heading}</h2>
                  <p className="text-h3 text-violet spacegrotesk-bold">{number}</p>
                </div>
                <p className="mt-4 max-w-xs text-ink text-h4">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[1.35fr_0.65fr]">
            <img
              src={project.thumbnail}
              alt="Detalle visual del proyecto"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <div className="flex min-h-72 items-end rounded-lg bg-violet p-8 text-surface md:p-10">
              <p className="text-h2 leading-none">
                Ideas que se ven. Resultados que se sienten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-page-section className="bg-surface-raised px-6 py-24 md:px-16 md:py-32 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-violet">Siguiente paso</p>
            <h2 className="mt-5 max-w-2xl text-h2 leading-none">
              ¿Hablamos de tu proyecto?
            </h2>
          </div>
          <Link
            href="/#contacto"
            className="btn btn-violet inline-flex min-h-[52px] items-center gap-3 rounded-full bg-violet px-7 py-4 text-sm font-medium text-cream"
          >
            <span className="bl"><span data-t="Contactanos">Contactanos</span></span>
            <ShiftArrow className="btn-ico h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
    </PageMotion>
  );
}
