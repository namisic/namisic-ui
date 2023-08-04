/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Necesario según documentación para desplegar con Docker. https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects
  output: 'standalone',
};

module.exports = nextConfig;
