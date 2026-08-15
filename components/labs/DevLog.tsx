'use client';

import { useState, useMemo } from 'react';
import { FEED, type EntryKind, type FeedEntry } from './mock-data';

// ---------------------------------------------------------------------------
// Heatmap — deterministic seed so it always renders the same
// ---------------------------------------------------------------------------

function seededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildHeatmap(days: number): number[] {
  const rand = seededRandom(0xdeadbeef);
  return Array.from({ length: days }, (_, i) => {
    // Simulate "working engineer" cadence: fewer gaps, occasional bursts
    const base = rand();
    const burst = i % 7 === 2 || i % 7 === 3 ? 0.3 : 0;
    const gap = i % 14 === 6 ? -0.4 : 0;
    return Math.min(1, Math.max(0, base + burst + gap));
  });
}

const HEATMAP_DAYS = 60;
const heatmapData = buildHeatmap(HEATMAP_DAYS);

function activityLevel(v: number): 0 | 1 | 2 | 3 | 4 {
  if (v < 0.15) return 0;
  if (v < 0.35) return 1;
  if (v < 0.55) return 2;
  if (v < 0.75) return 3;
  return 4;
}

const LEVEL_OPACITY = ['0%', '15%', '35%', '60%', '90%'];

function Heatmap() {
  // 60 days laid out left-to-right, oldest first
  return (
    <div className="flex items-end gap-[3px]">
      {heatmapData.map((v, i) => {
        const level = activityLevel(v);
        const opacity = LEVEL_OPACITY[level];
        return (
          <div
            key={i}
            title={`${HEATMAP_DAYS - i}d ago — ${level === 0 ? 'no activity' : `level ${level}`}`}
            style={{
              width: 8,
              height: level === 0 ? 8 : 4 + level * 4,
              borderRadius: 2,
              background:
                level === 0
                  ? 'var(--theme-border-color)'
                  : `color-mix(in srgb, var(--theme-accent-color) ${opacity}, transparent)`,
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filter chips
// ---------------------------------------------------------------------------

const FILTERS: { key: EntryKind | 'all'; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'commit', label: 'commits' },
  { key: 'release', label: 'releases' },
  { key: 'landing', label: 'projects' },
  { key: 'idea', label: 'ideas' },
  { key: 'play', label: 'plays' },
];

// ---------------------------------------------------------------------------
// Entry type dot colors
// ---------------------------------------------------------------------------

const KIND_COLOR: Record<EntryKind, string> = {
  commit: 'var(--theme-muted-color)',
  release: '#0ea5e9',
  landing: '#34d399',
  idea: 'var(--theme-accent-color)',
  play: '#f59e0b',
};

// ---------------------------------------------------------------------------
// Individual entry renderers
// ---------------------------------------------------------------------------

function CommitRow({ entry }: { entry: Extract<FeedEntry, { kind: 'commit' }> }) {
  return (
    <div className="flex items-baseline gap-0 min-w-0">
      {/* Timeline dot */}
      <div
        className="relative shrink-0 mr-5"
        style={{ width: 9, marginTop: 2, top: 3 }}
        aria-hidden
      >
        <div
          className="w-[7px] h-[7px] rounded-full border-2"
          style={{
            borderColor: 'var(--theme-border-color)',
            background: 'var(--theme-bg-color)',
          }}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-mono text-[12px] leading-[1.6]">
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.55 }}>{entry.ts}</span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.35 }}>·</span>
        <span
          className="tracking-tight"
          style={{ color: 'var(--theme-accent-color)', opacity: 0.75 }}
        >
          {entry.hash}
        </span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.35 }}>·</span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.7 }}>
          {entry.repo}/{entry.path.split('/').slice(-1)[0]}
        </span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.35 }}>·</span>
        <span
          className="flex-1 min-w-0 break-words"
          style={{ color: 'var(--theme-text-color)' }}
        >
          {entry.message}
        </span>
        <span
          className="shrink-0 tabular-nums"
          style={{ color: 'var(--theme-muted-color)', opacity: 0.55 }}
        >
          <span style={{ color: '#4ade80' }}>+{entry.diff.added}</span>
          {' '}
          <span style={{ color: '#f87171' }}>−{entry.diff.removed}</span>
        </span>
      </div>
    </div>
  );
}

function ReleaseCard({ entry }: { entry: Extract<FeedEntry, { kind: 'release' }> }) {
  return (
    <div className="flex items-start gap-0 min-w-0">
      {/* Timeline dot */}
      <div className="relative shrink-0 mr-5" style={{ width: 9, paddingTop: 18 }} aria-hidden>
        <div
          className="w-[9px] h-[9px] rounded-full"
          style={{ background: entry.accent }}
        />
      </div>

      <article
        className="flex-1 min-w-0 relative overflow-hidden rounded-xl border px-5 py-4"
        style={{
          background: 'var(--theme-card-bg)',
          borderColor: 'var(--theme-border-color)',
          boxShadow: '0 4px 24px -12px var(--theme-shadow-color)',
        }}
      >
        {/* Left accent stripe */}
        <div
          className="absolute inset-y-0 left-0 w-[3px] rounded-l-xl"
          style={{ background: entry.accent }}
          aria-hidden
        />
        <div className="pl-1">
          <div
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            <span>release</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: entry.accent }}>{entry.version}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{entry.project}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.55 }}>{entry.date}</span>
          </div>
          <p
            className="text-[14px] leading-[1.65]"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            {entry.note}
          </p>
        </div>
      </article>
    </div>
  );
}

function LandingCard({ entry }: { entry: Extract<FeedEntry, { kind: 'landing' }> }) {
  return (
    <div className="flex items-start gap-0 min-w-0">
      {/* Timeline dot */}
      <div className="relative shrink-0 mr-5" style={{ width: 9, paddingTop: 22 }} aria-hidden>
        <div
          className="w-[9px] h-[9px] rounded-full"
          style={{ background: entry.accent }}
        />
      </div>

      <article
        className="flex-1 min-w-0 relative overflow-hidden rounded-xl border px-5 py-5"
        style={{
          background: 'var(--theme-card-bg)',
          borderColor: 'var(--theme-border-color)',
          boxShadow: '0 8px 32px -16px var(--theme-shadow-color)',
        }}
      >
        {/* Left accent stripe — thicker for landings */}
        <div
          className="absolute inset-y-0 left-0 w-[4px] rounded-l-xl"
          style={{ background: entry.accent }}
          aria-hidden
        />
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(60% 80% at 0% 0%, color-mix(in srgb, ${entry.accent} 8%, transparent) 0%, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="relative pl-1">
          <div
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] mb-2.5"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            <span style={{ color: entry.accent }}>launched</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{entry.ts}</span>
            {entry.tags.slice(0, 3).map((t) => (
              <span key={t} className="contents">
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{t}</span>
              </span>
            ))}
          </div>

          <h3 className="text-xl font-medium tracking-tight leading-[1.15] mb-2">
            {entry.project}
          </h3>
          <p
            className="text-[14px] leading-[1.65]"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            {entry.description}
          </p>

          <div
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: entry.accent, opacity: 0.8 }}
          >
            {entry.milestone}
          </div>
        </div>
      </article>
    </div>
  );
}

function IdeaCard({ entry }: { entry: Extract<FeedEntry, { kind: 'idea' }> }) {
  return (
    <div className="flex items-start gap-0 min-w-0">
      {/* Timeline dot */}
      <div className="relative shrink-0 mr-5" style={{ width: 9, paddingTop: 22 }} aria-hidden>
        <div
          className="w-[7px] h-[7px] rounded-full border-2"
          style={{
            borderColor: 'var(--theme-accent-color)',
            background: 'var(--theme-bg-color)',
          }}
        />
      </div>

      <article
        className="flex-1 min-w-0 border-b py-4"
        style={{ borderColor: 'var(--theme-border-color)' }}
      >
        <div
          className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          <span style={{ color: 'var(--theme-accent-color)' }}>note</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{entry.ts}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{entry.readTime} read</span>
          {entry.tags.map((t) => (
            <span key={t} className="contents">
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{t}</span>
            </span>
          ))}
        </div>

        <h3 className="text-[17px] font-medium tracking-tight leading-[1.3] mb-2 italic">
          {entry.title}
        </h3>
        <p
          className="text-[14px] leading-[1.7]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          {entry.lede}
        </p>
      </article>
    </div>
  );
}

function PlayRow({ entry }: { entry: Extract<FeedEntry, { kind: 'play' }> }) {
  return (
    <div className="flex items-baseline gap-0 min-w-0">
      {/* Timeline dot */}
      <div
        className="relative shrink-0 mr-5"
        style={{ width: 9, top: 3 }}
        aria-hidden
      >
        <div
          className="w-[7px] h-[7px] rounded-full"
          style={{ background: '#f59e0b', opacity: 0.7 }}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-mono text-[12px]">
        <span style={{ color: '#f59e0b', opacity: 0.8 }} className="uppercase tracking-[0.16em] text-[10px]">play</span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.35 }}>·</span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.55 }}>{entry.ts}</span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.35 }}>·</span>
        <span style={{ color: 'var(--theme-text-color)' }}>{entry.title}</span>
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.45 }}>— {entry.hint}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feed entry dispatcher
// ---------------------------------------------------------------------------

function FeedEntryRow({ entry }: { entry: FeedEntry }) {
  switch (entry.kind) {
    case 'commit':  return <CommitRow  entry={entry} />;
    case 'release': return <ReleaseCard entry={entry} />;
    case 'landing': return <LandingCard entry={entry} />;
    case 'idea':    return <IdeaCard   entry={entry} />;
    case 'play':    return <PlayRow    entry={entry} />;
  }
}

// ---------------------------------------------------------------------------
// Stats derived from feed
// ---------------------------------------------------------------------------

const TOTAL_COMMITS = FEED.filter((e) => e.kind === 'commit').length;
const STREAK_DAYS = 117; // hardcoded plausible streak

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function DevLog() {
  const [filter, setFilter] = useState<EntryKind | 'all'>('all');

  const counts = useMemo(
    () => ({
      all: FEED.length,
      commit: FEED.filter((e) => e.kind === 'commit').length,
      release: FEED.filter((e) => e.kind === 'release').length,
      landing: FEED.filter((e) => e.kind === 'landing').length,
      idea: FEED.filter((e) => e.kind === 'idea').length,
      play: FEED.filter((e) => e.kind === 'play').length,
    }),
    [],
  );

  const filtered = useMemo(
    () => (filter === 'all' ? FEED : FEED.filter((e) => e.kind === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">

      {/* ------------------------------------------------------------------ */}
      {/* Masthead                                                            */}
      {/* ------------------------------------------------------------------ */}
      <header className="mb-10">
        <h1 className="text-[28px] font-medium tracking-[-0.03em] sm:text-[32px] leading-[1.1] mb-2">
          Arach Tchoupani
        </h1>
        <p
          className="font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          {STREAK_DAYS}d streak
          <span style={{ opacity: 0.4 }}> · </span>
          last commit 3h ago
          <span style={{ opacity: 0.4 }}> · </span>
          {TOTAL_COMMITS} commits in view
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Pulse strip                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-10">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.16em] mb-3"
          style={{ color: 'var(--theme-muted-color)', opacity: 0.6 }}
        >
          60d activity
        </div>
        <Heatmap />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Filter bar                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b pb-3"
        style={{ borderColor: 'var(--theme-border-color)' }}
      >
        <h2 className="text-base font-medium tracking-tight">dev log</h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em]">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count = counts[f.key as keyof typeof counts];
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

      {/* ------------------------------------------------------------------ */}
      {/* Timeline rail + feed                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative">
        {/* Vertical rail */}
        <div
          className="absolute top-0 bottom-0 left-[4px] w-px"
          style={{ background: 'var(--theme-border-color)' }}
          aria-hidden
        />

        <div className="space-y-4">
          {filtered.map((entry, i) => {
            // For card-type entries add a bit more vertical gap before them
            const isCard = entry.kind === 'release' || entry.kind === 'landing';
            return (
              <div
                key={i}
                style={isCard ? { paddingTop: '0.5rem' } : undefined}
              >
                <FeedEntryRow entry={entry} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Footer note                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="mt-16 font-mono text-[10px] uppercase tracking-[0.16em]"
        style={{ color: 'var(--theme-muted-color)', opacity: 0.4 }}
      >
        prototype · hardcoded feed · /labs/stream
      </div>
    </div>
  );
}
