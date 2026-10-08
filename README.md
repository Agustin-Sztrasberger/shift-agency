# Shift Agency

Sitio web de Shift Agency, construido con Next.js y una dirección visual editorial enfocada en estrategia, diseño y comunicación.

## Stack

- Next.js 14 con App Router
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger para la experiencia de zoom y scroll horizontal
- Framer Motion para estadísticas y transiciones de contenido
- Font Awesome y Lucide React para iconografía
- Magnetik y Space Grotesk como tipografías locales

## Desarrollo

```bash
npm install
npm run dev
```

La aplicación queda disponible en [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción
npm run start    # servidor de producción
npm run lint     # lint de Next.js
```

## Estructura

```text
app/
  layout.tsx                 # metadata, fuentes y layout global
  page.tsx                   # composición de la home
  globals.css                # tokens y estilos globales
  proyectos/[slug]/page.tsx  # páginas estáticas de detalle de proyecto

components/
  Header.tsx                 # navegación principal
  Hero.tsx                   # hero con video de Shift Agency
  Servicios.tsx              # servicios de la agencia
  Nosotros.tsx               # presentación y estadísticas animadas
  ShiftExperience.tsx        # zoom grid + scroll horizontal GSAP
  Trabajos.tsx               # tarjetas y enlaces a proyectos
  Reviews.tsx                # tabla de reviews con tooltip de mensajes
  Contacto.tsx               # formulario y datos de contacto
  Footer.tsx                 # pie de página

lib/
  fonts.ts                   # configuración de fuentes locales
  i18n.tsx                   # contenido en español e inglés

public/
  fonts/                     # Magnetik y Space Grotesk
  images/                    # imágenes públicas de proyectos
  videos/                    # videos del hero
```

## Rutas de proyectos

Las tarjetas de `Trabajos` enlazan a páginas generadas estáticamente:

- `/proyectos/diseno-web`
- `/proyectos/rebranding`
- `/proyectos/creacion-de-contenido`

La página dinámica comparte la información del proyecto, objetivo, servicios, métricas, galería y CTA de contacto.

## Contenido y configuración

El contenido actual está definido en `lib/i18n.tsx` y soporta español e inglés. Las miniaturas se sirven desde `public/images` y los videos desde `public/videos`; en URLs públicas no se incluye el segmento `public`.

## Pendientes

- Conectar el formulario de contacto a una server action o API route. Actualmente usa `action="#"` como placeholder.
- Migrar los datos de proyectos y reviews a un CMS cuando comiencen a actualizarse con frecuencia.
- Reemplazar los placeholders visuales por assets finales donde todavía corresponda.