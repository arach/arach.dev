/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/lab',
        destination: 'https://training-lab-nine.vercel.app/lab',
      },
      {
        source: '/lab/:path*',
        destination: 'https://training-lab-nine.vercel.app/lab/:path*',
      },
    ];
  },
};

export default nextConfig;
