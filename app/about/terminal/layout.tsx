import type { Metadata, ResolvingMetadata } from 'next';

import '@/components/labs/ops/ops.css';

const title = 'Terminal | arach.dev';
const description =
  'An interactive shell with Arach’s profile, contact information, and browser games. Type help to see the available commands.';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const inherited = await parent;

  return {
    title,
    description,
    alternates: { canonical: '/about/terminal' },
    openGraph: { ...inherited.openGraph, title, description, url: '/about/terminal' },
    twitter: { ...inherited.twitter, title, description },
  };
}

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
