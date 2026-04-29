'use client';

import { Fragment, useMemo, useState } from 'react';

import type { Project } from '@/lib/projects';
import type { IdeaSummary } from '@/lib/ideas';
import { buildStream, type StreamEntry } from '@/lib/stream';

import { Masthead } from './Masthead';
import { StreamProjectCard } from './StreamProjectCard';
import { StreamIdeaCard } from './StreamIdeaCard';
import { StreamPlayEntry } from './StreamPlayEntry';

interface StreamProps {
  projects: Project[];
  ideas: IdeaSummary[];
}

type FilterKey = 'all' | 'project' | 'idea' | 'play';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'project', label: 'projects' },
  { key: 'idea', label: 'ideas' },
  { key: 'play', label: 'plays' },
];

type Group =
  | { kind: 'featured'; entry: Extract<StreamEntry, { kind: 'project' }> }
  | { kind: 'project-grid'; entries: Extract<StreamEntry, { kind: 'project' }>[] }
  | { kind: 'idea'; entry: Extract<StreamEntry, { kind: 'idea' }> }
  | { kind: 'play'; entry: Extract<StreamEntry, { kind: 'play' }> };

/** Group consecutive non-featured projects so they can render as a 2-up grid.
 *  Featured projects, ideas, and plays each become their own full-width group. */
function groupEntries(entries: StreamEntry[]): Group[] {
  const groups: Group[] = [];
  let bucket: Extract<StreamEntry, { kind: 'project' }>[] = [];

  const flushBucket = () => {
    if (bucket.length > 0) {
      groups.push({ kind: 'project-grid', entries: bucket });
      bucket = [];
    }
  };

  for (const entry of entries) {
    if (entry.kind === 'project') {
      if (entry.featured) {
        flushBucket();
        groups.push({ kind: 'featured', entry });
      } else {
        bucket.push(entry);
      }
    } else if (entry.kind === 'idea') {
      flushBucket();
      groups.push({ kind: 'idea', entry });
    } else if (entry.kind === 'play') {
      flushBucket();
      groups.push({ kind: 'play', entry });
    }
  }
  flushBucket();
  return groups;
}

export function Stream({ projects, ideas }: StreamProps) {
  const stream = useMemo(() => buildStream({ projects, ideas }), [projects, ideas]);
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? stream : stream.filter((e) => e.kind === filter)),
    [stream, filter],
  );

  const groups = useMemo(() => groupEntries(filtered), [filtered]);

  const counts = useMemo(() => ({
    all: stream.length,
    project: stream.filter((e) => e.kind === 'project').length,
    idea: stream.filter((e) => e.kind === 'idea').length,
    play: stream.filter((e) => e.kind === 'play').length,
  }), [stream]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <Masthead />

      {/* Stream eyebrow + filters */}
      <div
        className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b pb-3"
        style={{ borderColor: 'var(--theme-border-color)' }}
      >
        <h2 className="text-base font-medium tracking-tight sm:text-lg">stream</h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em]">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count = counts[f.key];
            if (count === 0 && f.key !== 'all') return null;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className="relative pb-1 transition-opacity hover:opacity-80"
                style={{
                  color: active ? 'var(--theme-accent-color)' : 'var(--theme-muted-color)',
                }}
              >
                <span>{f.label}</span>
                <span
                  className="ml-1.5 tabular-nums"
                  style={{ opacity: active ? 0.85 : 0.55 }}
                >
                  {count}
                </span>
                <span
                  className="absolute -bottom-px left-0 h-px w-full transition-opacity"
                  style={{
                    background: 'var(--theme-accent-color)',
                    opacity: active ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped layout: featured = full width, regular projects = 2-up grid,
          ideas + plays = full-width breaks */}
      <div className="space-y-6 sm:space-y-8">
        {groups.map((group, i) => (
          <Fragment key={i}>
            {group.kind === 'featured' && (
              <StreamProjectCard
                project={group.entry.project}
                rank={group.entry.rank}
                featured
              />
            )}
            {group.kind === 'project-grid' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {group.entries.map((entry) => (
                  <StreamProjectCard
                    key={entry.slug}
                    project={entry.project}
                    rank={entry.rank}
                  />
                ))}
              </div>
            )}
            {group.kind === 'idea' && (
              <div
                className="border-y py-2"
                style={{ borderColor: 'var(--theme-border-color)' }}
              >
                <StreamIdeaCard idea={group.entry.idea} />
              </div>
            )}
            {group.kind === 'play' && (
              <StreamPlayEntry
                title={group.entry.title}
                hint={group.entry.hint}
                href={group.entry.href}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
