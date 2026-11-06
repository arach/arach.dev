import type { Metadata } from 'next';

const title = 'About | arach.dev';
const description =
  'Four-time CTO, two-time founder, and former Meta infrastructure engineer, now building local-first tools and agent infrastructure.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: { title, description, url: '/about' },
  twitter: { title, description },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
