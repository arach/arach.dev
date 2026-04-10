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
      {
        source: '/share/cc',
        destination: 'https://narrative-studio-arach.vercel.app/share/cc',
      },
      {
        source: '/share/cc/:path*',
        destination: 'https://narrative-studio-arach.vercel.app/share/cc/:path*',
      },
    ];
  },
};

export default nextConfig;
