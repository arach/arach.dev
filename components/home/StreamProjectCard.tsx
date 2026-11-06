'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { ProjectPreviewFrame, ProjectPreviewTile } from '@/components/ProjectPreview';
import type { Project } from '@/lib/projects';

interface StreamProjectCardProps {
  project: Project;
  rank: number;
  featured?: boolean;
}

function Logo({ src, alt, size = 'md' }: { src: string; alt: string; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-12 w-12' : 'h-8 w-8';
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden border ${dim}`}
      style={{ borderColor: 'var(--theme-border-color)', background: 'var(--theme-card-bg)' }}
    >
      {/* Plain <img> so SVGs render at intrinsic crisp resolution and PNG/WebP both work. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-[70%] w-[70%] object-contain" />
    </div>
  );
}

function Meta({ number, tags, lead }: { number: string; tags: string[]; lead?: string }) {
  return (
    <div className="fig flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span className="tabular-nums" style={{ color: 'var(--theme-muted-color)' }}>{number}</span>
      {lead ? <span style={{ color: 'var(--theme-accent-color)' }}>{lead}</span> : null}
      {tags.slice(0, 3).map((tag) => (
        <span key={tag} className="contents">
          <span style={{ color: 'var(--theme-faint-color)' }}>/</span>
          <span>{tag}</span>
        </span>
      ))}
    </div>
  );
}

export function StreamProjectCard({ project, rank, featured = false }: StreamProjectCardProps) {
  const slug = project.slug;
  const number = String(rank + 1).padStart(2, '0');
  const liveUrl = project.links.website || project.links.demo;

  if (featured) {
    return (
      <article className="group relative grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <div className="flex min-w-0 flex-col">
          <Meta number={number} tags={project.tags} lead="Featured" />
          <div className="mt-5 flex items-center gap-4">
            {project.logo ? <Logo src={project.logo} alt={`${project.title} logo`} size="lg" /> : null}
            <h3 className="text-[34px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[40px]">
              <Link
                href={`/projects/${slug}`}
                className="transition-colors before:absolute before:inset-0 before:content-[''] group-hover:text-[color:var(--theme-accent-color)]"
              >
                {project.title}
              </Link>
            </h3>
          </div>
          <p
            className="mt-4 max-w-[46ch] text-[16px] font-normal leading-[1.65] sm:text-[17px]"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            {project.preview}
          </p>
          <ActionRow slug={slug} title={project.title} liveUrl={liveUrl} githubUrl={project.links.github} />
        </div>

        <ProjectPreviewFrame project={project} label={`Fig. ${number}`} className="relative z-[1] self-start" />
      </article>
    );
  }

  return (
    <article
      className="group relative flex h-full flex-col border transition-colors duration-200 hover:border-[color:var(--theme-muted-color)]"
      style={{ background: 'var(--theme-card-bg)', borderColor: 'var(--theme-border-color)' }}
    >
      <ProjectPreviewTile project={project} />

      <div className="flex flex-1 flex-col px-5 py-5">
        <Meta number={number} tags={project.tags} />

        <div className="mt-3 flex items-center gap-3">
          {project.logo ? <Logo src={project.logo} alt={`${project.title} logo`} /> : null}
          <h3 className="text-[22px] font-semibold leading-[1.15] tracking-[-0.025em]">
            <Link
              href={`/projects/${slug}`}
              className="transition-colors before:absolute before:inset-0 before:content-[''] group-hover:text-[color:var(--theme-accent-color)]"
            >
              {project.title}
            </Link>
          </h3>
        </div>

        <p
          className="mt-2 text-[15px] font-normal leading-[1.6]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          {project.description}
        </p>

        <div className="mt-auto">
          <ActionRow slug={slug} title={project.title} liveUrl={liveUrl} githubUrl={project.links.github} compact />
        </div>
      </div>
    </article>
  );
}

function ActionRow({
  slug,
  title,
  liveUrl,
  githubUrl,
  compact = false,
}: {
  slug: string;
  title: string;
  liveUrl?: string;
  githubUrl?: string;
  compact?: boolean;
}) {
  return (
    <div className={`fig relative z-[1] flex items-center gap-5 ${compact ? 'pt-4' : 'mt-6'}`}>
      <Link
        href={`/projects/${slug}`}
        aria-label={`Read about ${title}`}
        className="inline-flex items-center gap-1 hover:underline"
        style={{ color: 'var(--theme-accent-color)' }}
      >
        Read
        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
      </Link>
      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">
          Live ↗
        </a>
      ) : null}
      {githubUrl ? (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">
          Source ↗
        </a>
      ) : null}
    </div>
  );
}
