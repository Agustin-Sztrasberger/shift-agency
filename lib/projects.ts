// Datos de los casos de estudio. Se usan en el modal de Trabajos y en /proyectos/[slug].

// Imágenes extra del caso (se muestran una debajo de la otra, a todo el ancho).
// width/height son las medidas reales del archivo: evitan saltos mientras carga.
export type GalleryImage = { src: string; alt: string; width: number; height: number };

export const projectDetails = {
  batter: {
    label: "Caso de estudio 01",
    title: "Branding y sitio web",
    client: "Batter",
    category: "Software gastronómico",
    thumbnail: "/images/proyectos/batter-sitio.webp",
    cover: "/images/proyectos/batter-sitio.webp",
    intro:
      "Una marca y un sitio para un software que pone pedidos, reservas y clientes de bares, cafés y restaurantes en un solo lugar.",
    objective:
      "Darle a Batter una identidad propia y un sitio que explique el producto con claridad y lleve a pedir una demo.",
    services: ["Branding", "Identidad visual", "Diseño Web", "UX/UI"],
    gallery: [
      { src: "/images/proyectos/batter-producto.webp", alt: "Software de Batter en una notebook sobre una piedra verde", width: 2000, height: 1246 },
      { src: "/images/proyectos/batter-marca.webp", alt: "Sistema de marca de Batter: logo, isotipo, paleta de colores y tipografía", width: 1600, height: 5193 },
    ] as GalleryImage[],
    metrics: [
      ["01", "Objetivo", "Una marca reconocible para un producto tecnológico pensado para la gastronomía."],
      ["02", "Planificación", "Un sitio que recorre funciones, planes y preguntas hasta la consulta."],
      ["03", "Resultado", "Una identidad consistente entre la marca, el sitio y el propio software."],
    ],
  },
  "diseno-web": {
    label: "Caso de estudio 02",
    title: "Diseño Web",
    client: "Embassy Zona Franca",
    category: "Logística",
    thumbnail: "/images/thumbnail.png",
    cover: "/images/thumbnail.png",
    intro:
      "Una experiencia digital clara, expresiva y pensada para que cada visita se convierta en una oportunidad.",
    objective:
      "Ordenar la presencia digital de la marca y convertir su identidad en una experiencia web memorable.",
    services: ["Dirección creativa", "Diseño Web", "Contenido digital"],
    gallery: [] as GalleryImage[],
    metrics: [
      ["01", "Objetivo", "Una plataforma más clara, atractiva y fácil de recorrer."],
      ["02", "Planificación", "Una estructura que acompaña el recorrido natural de cada usuario."],
      ["03", "Resultado", "Una identidad consistente en cada pantalla y punto de contacto."],
    ],
  },
  rebranding: {
    label: "Caso de estudio 03",
    title: "Rebranding",
    client: "Bashem Realty",
    category: "Inmobiliaria",
    thumbnail: "/images/thumbnail.png",
    cover: "/images/thumbnail.png",
    intro:
      "Una nueva forma de presentarse, con una identidad que comunica confianza desde el primer vistazo.",
    objective:
      "Construir un sistema visual capaz de acompañar el crecimiento de la marca sin perder cercanía.",
    services: ["Estrategia", "Identidad visual", "Dirección creativa"],
    gallery: [] as GalleryImage[],
    metrics: [
      ["01", "Objetivo", "Hacer visible el diferencial de la marca."],
      ["02", "Planificación", "Traducir la estrategia en un lenguaje visual propio."],
      ["03", "Resultado", "Una marca más reconocible, coherente y preparada para crecer."],
    ],
  },
  "creacion-de-contenido": {
    label: "Caso de estudio 04",
    title: "Creación de contenido",
    client: "ABRE Desarrollos",
    category: "Desarrolladora",
    thumbnail: "/images/thumbnail.png",
    cover: "/images/thumbnail.png",
    intro:
      "Contenido con intención: piezas que detienen el scroll y construyen una relación real con la audiencia.",
    objective:
      "Crear un universo de contenidos reconocible, flexible y alineado con los objetivos de comunicación.",
    services: ["Concepto", "Producción", "Social Media"],
    gallery: [] as GalleryImage[],
    metrics: [
      ["01", "Objetivo", "Comunicar con claridad y personalidad."],
      ["02", "Planificación", "Un sistema de piezas pensado para cada canal."],
      ["03", "Resultado", "Más consistencia y más oportunidades de conexión."],
    ],
  },
} as const;

export type ProjectSlug = keyof typeof projectDetails;
export type Project = (typeof projectDetails)[ProjectSlug];

export function getProjectSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
