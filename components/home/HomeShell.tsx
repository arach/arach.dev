'use client';

import { useEffect, useState } from 'react';

import { DebugToolbar } from '@/components/debug/DebugToolbar';
import { GitHubProvider } from '@/lib/github-context';
import type { Project } from '@/lib/projects';
import type { IdeaSummary } from '@/lib/ideas';

import { Stream } from './Stream';

interface HomeShellProps {
  projects: Project[];
  ideas: IdeaSummary[];
}

export function HomeShell({ projects, ideas }: HomeShellProps) {
  const [mounted, setMounted] = useState(false);
  const [showDebugToolbar, setShowDebugToolbar] = useState(true);
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        setShowDebugToolbar((prev) => !prev);
      }
    };

    if (isDevelopment) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDevelopment]);

  return (
    <GitHubProvider username="arach">
      {/* Soft ambient backdrop — no dotted grid. A pair of very low-opacity
          accent washes anchor the page without competing with content. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 12% -10%, color-mix(in srgb, var(--theme-accent-color) 6%, transparent) 0%, transparent 70%), radial-gradient(50% 40% at 95% 100%, color-mix(in srgb, var(--theme-accent-color) 4%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 min-h-[90vh]">
        <Stream projects={projects} ideas={ideas} />
      </div>

      {mounted && isDevelopment && showDebugToolbar && <DebugToolbar />}
      {mounted && isDevelopment && !showDebugToolbar && (
        <div className="pointer-events-none fixed top-4 right-4 font-mono text-[10px] uppercase tracking-[0.16em] opacity-50" style={{ color: 'var(--theme-muted-color)' }}>
          ⌘D for debug
        </div>
      )}
    </GitHubProvider>
  );
}
