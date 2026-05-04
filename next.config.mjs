/** @type {import('next').NextConfig} */
const nextConfig = {
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
