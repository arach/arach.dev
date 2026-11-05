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
        destination: 'https://lab-plum-iota.vercel.app/lab',
      },
      {
        source: '/lab/:path*',
        destination: 'https://lab-plum-iota.vercel.app/lab/:path*',
      },
    ];
  },
};

export default nextConfig;
