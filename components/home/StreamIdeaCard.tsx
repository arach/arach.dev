'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      <Link
        href={`/ideas/${idea.slug}`}
        className="block rounded-2xl px-2 py-6 transition-colors duration-300 sm:px-4"
      >
        {/* Eyebrow row */}
        <div
          className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          <span style={{ color: 'var(--theme-accent-color)' }}>idea</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <time dateTime={idea.date}>{formatDate(idea.date)}</time>
          {idea.tags.slice(0, 2).map((tag, i) => (
            <span key={tag} className="contents">
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Title — italic display, slightly more typographic than projects */}
        <h2
          className="text-2xl font-medium leading-[1.15] tracking-tight transition-colors group-hover:opacity-80 sm:text-3xl"
          style={{ fontStyle: 'italic' }}
        >
          {idea.title}
        </h2>

        {/* Pull-quote style description */}
        <p
          className="mt-3 max-w-2xl text-[15px] leading-[1.65] sm:text-[16px]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          {idea.description}
        </p>

        <div
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: 'var(--theme-accent-color)' }}
        >
          read
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </motion.article>
  );
}
