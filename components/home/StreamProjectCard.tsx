'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

import type { Project } from '@/lib/projects';

interface StreamProjectCardProps {
  project: Project;
  rank: number;
  featured?: boolean;
}

const cardSurface: React.CSSProperties = {
  background: 'var(--theme-card-bg)',
  borderColor: 'var(--theme-border-color)',
  boxShadow: '0 12px 40px -28px var(--theme-shadow-color)',
};

function Logo({ src, alt, accent, size = 'md' }: { src: string; alt: string; accent: string; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-14 w-14 sm:h-16 sm:w-16' : 'h-11 w-11 sm:h-12 sm:w-12';
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl ${dim}`}
      style={{
        background: `color-mix(in srgb, ${accent} 6%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 18%, transparent)`,
      }}
    >
      {/* Plain <img> so SVGs render at intrinsic crisp resolution and PNG/WebP both work. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-[70%] w-[70%] object-contain" />
    </div>
  );
}

export function StreamProjectCard({ project, rank, featured = false }: StreamProjectCardProps) {
  const slug = project.slug;
  const number = String(rank + 1).padStart(2, '0');
  const accent = project.color || 'var(--theme-accent-color)';
  const liveUrl = project.links.website || project.links.demo;

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group relative overflow-hidden rounded-2xl border transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5"
        style={cardSurface}
      >
        <div
          className="absolute inset-y-0 left-0 w-[3px] transition-all duration-500 group-hover:w-[5px]"
          style={{ background: accent }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(60% 80% at 0% 0%, ${accent}14 0%, transparent 60%)` }}
          aria-hidden
        />

        <div className="relative px-6 py-7 sm:px-8 sm:py-9">
          <div className={project.logo ? 'flex items-start gap-5 sm:gap-6' : 'min-w-0'}>
            {project.logo ? (
              <Logo src={project.logo} alt={`${project.title} logo`} accent={accent} size="lg" />
            ) : null}
            <div className="min-w-0 flex-1">
              <div
                className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{ color: 'var(--theme-muted-color)' }}
              >
                <span className="tabular-nums" style={{ opacity: 0.6 }}>{number}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span style={{ color: accent }}>featured</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>project</span>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="contents">
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <h2 className="text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl">
                <Link
                  href={`/projects/${slug}`}
                  className="transition-colors before:absolute before:inset-0 before:content-[''] group-hover:opacity-90"
                >
                  {project.title}
                </Link>
              </h2>

              <p
                className="mt-3 text-[16px] leading-[1.65] sm:text-[17px]"
                style={{ color: 'var(--theme-muted-color)' }}
              >
                {project.preview}
              </p>

              <ActionRow accent={accent} liveUrl={liveUrl} githubUrl={project.links.github} />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl border transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5"
      style={cardSurface}
    >
      <div
        className="absolute inset-y-0 left-0 w-[2px] transition-all duration-500 group-hover:w-[3px]"
        style={{ background: accent }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(70% 100% at 0% 50%, ${accent}10 0%, transparent 60%)` }}
        aria-hidden
      />

      <div className="relative px-5 py-5 sm:px-6 sm:py-5">
        <div className={project.logo ? 'flex items-start gap-4 sm:gap-5' : 'min-w-0'}>
          {project.logo ? (
            <Logo src={project.logo} alt={`${project.title} logo`} accent={accent} />
          ) : null}
          <div className="min-w-0 flex-1">
            <div
              className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: 'var(--theme-muted-color)' }}
            >
              <span className="tabular-nums" style={{ opacity: 0.55 }}>{number}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>project</span>
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="contents">
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            <h2 className="text-xl font-medium leading-[1.2] tracking-tight sm:text-[22px]">
              <Link
                href={`/projects/${slug}`}
                className="transition-colors before:absolute before:inset-0 before:content-[''] group-hover:opacity-90"
              >
                {project.title}
              </Link>
            </h2>

            <p
              className="mt-1.5 text-[14px] leading-[1.6] sm:text-[15px]"
              style={{ color: 'var(--theme-muted-color)' }}
            >
              {project.description}
            </p>

            <ActionRow accent={accent} liveUrl={liveUrl} githubUrl={project.links.github} compact />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ActionRow({
  accent,
  liveUrl,
  githubUrl,
  compact = false,
}: {
  accent: string;
  liveUrl?: string;
  githubUrl?: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative z-[1] flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] ${compact ? 'mt-3' : 'mt-5'}`}>
      <span className="inline-flex items-center gap-1.5" style={{ color: accent }}>
        read
        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          <ExternalLink className="h-3 w-3" />
          live
        </a>
      ) : null}
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          <Github className="h-3 w-3" />
          source
        </a>
      ) : null}
    </div>
  );
}
