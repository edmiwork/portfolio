/** @type {import('next').NextConfig} */

// For GitHub Pages project sites served at https://<user>.github.io/<repo>/
// set NEXT_PUBLIC_BASE_PATH="/<repo>" at build time. Leave empty for Vercel
// or a custom/apex domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
