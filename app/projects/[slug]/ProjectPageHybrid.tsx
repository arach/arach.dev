'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import ProjectPageServer from './ProjectPageServer';
import type { Project } from '@/lib/projects';

// This component hydrates the server-rendered content with theme-aware styles
export default function ProjectPageHybrid({ project }: { project: Project }) {
  const { currentTheme: theme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // If not hydrated yet, return the server-rendered version
  if (!isHydrated) {
    return <ProjectPageServer project={project} />;
  }

  // Once hydrated, we can apply CSS custom properties for smooth theme transitions
  return (
    <div 
      className="project-page"
      style={{
        '--theme-border': theme?.borderColor || 'rgb(229, 231, 235)',
        '--theme-header-bg': theme?.headerBg || 'rgba(255, 255, 255, 0.8)',
        '--theme-text': theme?.textColor || 'rgb(17, 24, 39)',
        '--theme-muted': theme?.mutedTextColor || 'rgb(107, 114, 128)',
        '--theme-heading': theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
        '--theme-card-bg': theme?.cardBg || 'rgb(249, 250, 251)',
        '--theme-accent': theme?.accentColor || 'rgb(59, 130, 246)',
        '--theme-header-font': theme?.headerFont || 'inherit',
        '--theme-body-font': theme?.bodyFont || 'inherit',
      } as React.CSSProperties}
    >
      <ProjectPageServer project={project} />
    </div>
  );
}