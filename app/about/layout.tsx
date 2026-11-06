import type { Metadata, ResolvingMetadata } from 'next';

const title = 'About | arach.dev';
const description =
  'Four-time CTO, two-time founder, and former Meta infrastructure engineer, now building local-first tools and agent infrastructure.';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const inherited = await parent;

  return {
    title,
    description,
    alternates: { canonical: '/about' },
    openGraph: { ...inherited.openGraph, title, description, url: '/about' },
    twitter: { ...inherited.twitter, title, description },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
