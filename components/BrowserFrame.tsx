'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface BrowserFrameProps {
  url: string;
  alt: string;
  className?: string;
  /** Render a live iframe instead of a static screenshot */
  live?: boolean;
  /** Static screenshot path (used when live is false) */
  src?: string;
  /** Mono caption on the left of the strip, e.g. "FIG. 01" */
  label?: string;
  /** Load eagerly when the frame is above the fold */
  priority?: boolean;
}

/**
 * A quiet hairline frame: one mono strip with the URL, then the surface.
 * When `live` is true, renders a live iframe of the URL.
 * Otherwise renders a static screenshot (requires `src`).
 */
export function BrowserFrame({ src, url, alt, live = false, label, priority = false, className = '' }: BrowserFrameProps) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <figure
      className={`overflow-hidden border ${className}`}
      style={{ borderColor: 'var(--theme-border-color)', background: 'var(--theme-card-bg)' }}
    >
      <figcaption
        className="flex items-center justify-between gap-3 border-b px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
        style={{ borderColor: 'var(--theme-border-color)', color: 'var(--theme-muted-color)' }}
      >
        <span className="shrink-0">{label ?? (live ? 'Live' : 'Fig.')}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet inline-flex min-w-0 items-center gap-1 normal-case tracking-normal"
        >
          <span className="truncate">{displayUrl}</span>
          <ArrowUpRight className="h-3 w-3 shrink-0" />
        </a>
      </figcaption>

      {live ? (
        <div className="relative aspect-[16/10]" style={{ background: 'var(--theme-bg-color)' }}>
          <iframe
            src={url}
            title={alt}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/10]"
          style={{ background: 'var(--theme-bg-color)' }}
        >
          <Image
            src={src ?? ''}
            alt={alt}
            fill
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </a>
      )}
    </figure>
  );
}
