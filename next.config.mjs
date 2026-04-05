/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/lab',
        destination: 'https://training-lab-nine.vercel.app/',
      },
      {
        source: '/lab/:path*',
        destination: 'https://training-lab-nine.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
