// The Training Lab is a separate app served under /lab. Set LAB_ORIGIN
// (e.g. http://localhost:3018) to preview a local lab in development.
const LAB_ORIGIN = process.env.LAB_ORIGIN || 'https://lab-plum-iota.vercel.app';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/blog', destination: '/ideas', permanent: true },
      { source: '/blog/:slug*', destination: '/ideas/:slug*', permanent: true },
      { source: '/projects/blink', destination: '/projects/canvas', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/lab',
        destination: `${LAB_ORIGIN}/lab`,
      },
      {
        source: '/lab/:path*',
        destination: `${LAB_ORIGIN}/lab/:path*`,
      },
    ];
  },
};

export default nextConfig;
