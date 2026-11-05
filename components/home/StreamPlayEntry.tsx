import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface StreamPlayEntryProps {
  title: string;
  href: string;
  hint?: string;
}

export function StreamPlayEntry({ title, href, hint }: StreamPlayEntryProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 border-y py-4"
      style={{ borderColor: 'var(--theme-border-color)' }}
    >
      <span className="fig" style={{ color: 'var(--theme-accent-color)' }}>Play</span>
      <span className="font-mono text-sm transition-colors group-hover:text-[color:var(--theme-accent-color)]">
        {title}
      </span>
      {hint ? <span className="fig hidden sm:inline">{hint}</span> : null}
      <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-80" />
    </Link>
  );
}
