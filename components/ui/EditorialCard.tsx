'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface EditorialCardProps {
  /** Small mono-caps row above the title (date, number, $-prompt, etc.). */
  eyebrow?: React.ReactNode;
  /** Big mono number rendered as a "track mark" on the left of the card. */
  leadingNumber?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Tags rendered after the body, mono-caps. */
  tags?: string[];
  /** Show the top-right arrow indicator. Defaults to true. */
  showArrow?: boolean;
  /** Keyboard/visual focus state — soft accent border, no harsh ring. */
  focused?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Shared editorial surface used across Home, Ideas, and About.
 * Theme-aware via CSS vars; no harsh shadows, no frosted glass — just rhythm.
 */
export function EditorialCard({
  eyebrow,
  leadingNumber,
  title,
  description,
  tags,
  showArrow = true,
  focused = false,
  className,
  children,
}: EditorialCardProps) {
  return (
    <div
      className={cn(
        'group relative h-full rounded-2xl border px-5 py-5 sm:px-6 sm:py-6',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        'hover:-translate-y-0.5',
        focused && 'ring-1 ring-offset-0',
        className,
      )}
      style={{
        background: 'var(--theme-card-bg)',
        borderColor: focused ? 'var(--theme-accent-color)' : 'var(--theme-border-color)',
        boxShadow: '0 12px 40px -28px var(--theme-shadow-color)',
      }}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        {leadingNumber ? (
          <div
            className="font-mono text-3xl font-light leading-none tabular-nums sm:text-4xl"
            style={{
              color: focused ? 'var(--theme-accent-color)' : 'var(--theme-muted-color)',
              opacity: focused ? 0.95 : 0.45,
            }}
            aria-hidden
          >
            {leadingNumber}
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <div
              className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono uppercase tracking-[0.16em]"
              style={{ color: 'var(--theme-muted-color)' }}
            >
              {eyebrow}
            </div>
          ) : null}

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-medium tracking-tight transition-colors group-hover:opacity-80 sm:text-2xl">
                {title}
              </h3>
              {description ? (
                <p
                  className="mt-2 text-[15px] leading-7 sm:text-base"
                  style={{ color: 'var(--theme-muted-color)' }}
                >
                  {description}
                </p>
              ) : null}
              {tags && tags.length > 0 ? (
                <div
                  className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-[0.14em]"
                  style={{ color: 'var(--theme-muted-color)' }}
                >
                  {tags.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
              {children}
            </div>
            {showArrow ? (
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 opacity-30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
