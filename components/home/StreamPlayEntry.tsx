'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface StreamPlayEntryProps {
  title: string;
  href: string;
  hint?: string;
}

export function StreamPlayEntry({ title, href, hint }: StreamPlayEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-300 sm:px-4 sm:py-4"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ color: 'var(--theme-accent-color)' }}
        >
          play
        </span>
        <span
          className="font-mono text-sm transition-opacity group-hover:opacity-80"
          style={{ color: 'var(--theme-text-color)' }}
        >
          {title}
        </span>
        {hint ? (
          <span
            className="hidden font-mono text-[11px] uppercase tracking-[0.16em] sm:inline"
            style={{ color: 'var(--theme-muted-color)', opacity: 0.7 }}
          >
            {hint}
          </span>
        ) : null}
        <ArrowUpRight
          className="ml-auto h-3 w-3 opacity-30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
        />
      </Link>
    </motion.div>
  );
}
