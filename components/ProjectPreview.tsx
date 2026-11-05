'use client';

import Image from 'next/image';

import { BrowserFrame } from '@/components/BrowserFrame';
import type { Project } from '@/lib/projects';

interface ProjectPreviewProps {
  project: Project;
  className?: string;
  label?: string;
  priority?: boolean;
}

function getPreviewHref(project: Project) {
  return project.links.website || project.links.demo || project.links.github || `/projects/${project.slug}`;
}

/** Full-width preview for featured projects. Renders nothing without a surface to show. */
export function ProjectPreviewFrame({ project, label, priority, className = '' }: ProjectPreviewProps) {
  const href = getPreviewHref(project);
  const screenshot = project.screenshots?.[0];

  if (screenshot) {
    return (
      <BrowserFrame
        src={screenshot}
        url={href}
        label={label}
        priority={priority}
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
        label={label}
        alt={`${project.title} live preview`}
        className={className}
      />
    );
  }

  return null;
}

/** Cropped screenshot at the top of a grid cell. Renders nothing without one. */
export function ProjectPreviewTile({ project, className = '' }: ProjectPreviewProps) {
  const screenshot = project.screenshots?.[0];
  if (!screenshot) return null;

  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden border-b ${className}`}
      style={{ borderColor: 'var(--theme-border-color)', background: 'var(--theme-bg-color)' }}
    >
      <Image
        src={screenshot}
        alt={`${project.title} preview`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, 500px"
      />
    </div>
  );
}
