import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { IdeaSummary } from '@/lib/ideas';

interface StreamIdeaCardProps {
  idea: IdeaSummary;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function StreamIdeaCard({ idea }: StreamIdeaCardProps) {
  return (
    <article className="group relative">
      <Link href={`/ideas/${idea.slug}`} className="grid gap-3 py-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
        <div className="fig flex flex-wrap gap-x-2.5 sm:flex-col sm:gap-y-1">
          <span style={{ color: 'var(--theme-accent-color)' }}>Note</span>
          <time dateTime={idea.date}>{formatDate(idea.date)}</time>
        </div>

        <div className="min-w-0">
          <h3 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.025em] transition-colors group-hover:text-[color:var(--theme-accent-color)] sm:text-[28px]">
            {idea.title}
            <ArrowUpRight className="ml-1 inline h-4 w-4 align-baseline opacity-40" />
          </h3>
          <p
            className="mt-2 max-w-2xl text-[15px] font-normal leading-[1.65] sm:text-[16px]"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            {idea.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
