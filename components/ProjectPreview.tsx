'use client';

import { BrowserFrame } from '@/components/BrowserFrame';
import type { Project } from '@/lib/projects';

interface ProjectPreviewProps {
  project: Project;
  className?: string;
}

function getPreviewHref(project: Project) {
  return project.links.website || project.links.demo || project.links.github || `/projects/${project.slug}`;
}

function getLinkKind(href: string) {
  if (href.includes('github.com')) return 'source';
  if (href.includes('/projects/')) return 'project';
  return 'link';
}

function formatPreviewHost(href: string) {
  if (href.startsWith('/')) return href;

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, '');
    const path = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
    return `${host}${path}`;
  } catch {
    return href.replace(/^https?:\/\//, '');
  }
}

function getExternalLinkProps(href: string) {
  return href.startsWith('http')
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
}

function PreviewFallbackFrame({ project, className = '' }: ProjectPreviewProps) {
  const href = getPreviewHref(project);
  const accent = project.color || 'var(--theme-accent-color)';
  const host = formatPreviewHost(href);
  const linkKind = getLinkKind(href);

  return (
    <a
      href={href}
      {...getExternalLinkProps(href)}
      className={`group block overflow-hidden rounded-md border ${className}`}
      style={{
        borderColor: 'var(--theme-border-color)',
        background: 'var(--theme-card-bg)',
        boxShadow: '0 12px 40px -28px var(--theme-shadow-color)',
      }}
    >
      <div
        className="flex items-center gap-3 border-b px-3 py-2"
        style={{
          background: 'var(--theme-card-bg)',
          borderColor: 'var(--theme-border-color)',
        }}
      >
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <span
            className="max-w-md truncate rounded-sm px-3 py-0.5 font-mono text-[11px]"
            style={{
              background: 'var(--theme-bg-color)',
              color: 'var(--theme-muted-color)',
            }}
          >
            {host}
          </span>
        </div>

        <div className="flex w-12 justify-end">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: accent, opacity: 0.8 }}
          >
            {linkKind}
          </span>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '16 / 10',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--theme-card-bg) 88%, transparent), color-mix(in srgb, var(--theme-bg-color) 86%, transparent))',
        }}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(100% 100% at 0% 0%, color-mix(in srgb, ${accent} 9%, transparent) 0%, transparent 65%)`,
          }}
          aria-hidden
        />

        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: 'var(--theme-muted-color)', opacity: 0.75 }}
          >
            preview surface
          </div>

          <p
            className="max-w-2xl text-[15px] leading-[1.65] sm:text-[16px]"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            {project.preview}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em]">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded px-2 py-1"
                style={{
                  background: 'color-mix(in srgb, var(--theme-text-color) 4%, transparent)',
                  color: 'var(--theme-muted-color)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export function ProjectPreviewFrame({ project, className = '' }: ProjectPreviewProps) {
  const href = getPreviewHref(project);
  const screenshot = project.screenshots?.[0];

  if (screenshot) {
    return (
      <BrowserFrame
        src={screenshot}
        url={href}
        alt={`${project.title} preview`}
        className={className}
      />
    );
  }

  if (project.websiteUrl) {
    return (
      <BrowserFrame
        live
        url={project.websiteUrl}
        alt={`${project.title} live preview`}
        className={className}
      />
    );
  }

  return <PreviewFallbackFrame project={project} className={className} />;
}

export function ProjectPreviewTile({ project, className = '' }: ProjectPreviewProps) {
  const href = getPreviewHref(project);
  const screenshot = project.screenshots?.[0];
  const accent = project.color || 'var(--theme-accent-color)';
  const host = formatPreviewHost(href);
  const hasWebsite = Boolean(project.links.website || project.links.demo);

  if (screenshot) {
    return (
      <div
        className={`relative overflow-hidden border-t ${className}`}
        style={{
          height: '156px',
          borderColor: 'var(--theme-border-color)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12"
          style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-bg-color) 54%, transparent), transparent)' }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 px-4 py-3">
          <span
            className="truncate font-mono text-[11px]"
            style={{ color: 'var(--theme-text-color)' }}
          >
            {host}
          </span>
          <span
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--theme-muted-color)', opacity: 0.8 }}
          >
            {project.tags[0] || 'project'}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshot}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden border-t ${className}`}
        style={{
          height: '156px',
          borderColor: 'var(--theme-border-color)',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--theme-card-bg) 92%, transparent), color-mix(in srgb, var(--theme-bg-color) 88%, transparent))',
      }}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(110% 100% at 0% 0%, color-mix(in srgb, ${accent} 8%, transparent) 0%, transparent 68%)`,
        }}
        aria-hidden
      />

      <div className="relative flex h-full flex-col justify-between px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            {hasWebsite ? 'live link' : 'source link'}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--theme-muted-color)', opacity: 0.7 }}
          >
            preview pending
          </span>
        </div>

        <p
          className="max-w-[28ch] text-[13px] leading-[1.55]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          {project.preview}
        </p>

        <div className="flex items-end justify-between gap-3">
          <span
            className="truncate font-mono text-[11px]"
            style={{ color: 'var(--theme-text-color)' }}
          >
            {host}
          </span>
          <span
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--theme-muted-color)', opacity: 0.75 }}
          >
            {project.tech[0] || project.tags[0] || 'project'}
          </span>
        </div>
      </div>
    </div>
  );
}
