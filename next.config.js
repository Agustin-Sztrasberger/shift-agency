/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Sumá acá los dominios de donde vengan las imágenes de proyectos
      // (CMS, Cloudinary, etc.) cuando los tengas definidos.
    ],
  },
};

module.exports = nextConfig;
