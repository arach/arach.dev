'use client';

import { NODES, type ProjectNode } from './data';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const TRUNK_LEFT = 28; // px from left edge — the x-coord of the trunk line
const BRANCH_LABEL_OFFSET = 52; // px from left edge where cards start

const BRANCH_LINE_WIDTH: Record<'short' | 'medium' | 'long', number> = {
  short: 24,
  medium: 32,
  long: 44,
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared micro-components
// ─────────────────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 8 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="3" cy="2.5" r="1.2" />
      <circle cx="9" cy="2.5" r="1.2" />
      <circle cx="6" cy="9.5" r="1.2" />
      <path d="M3 3.7v2c0 1 .9 1.8 2 1.8h2c1.1 0 2-.8 2-1.8v-2M6 7.5v-.8" />
    </svg>
  );
}

function LangDot({ color, name }: { color: string; name: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="inline-block w-[9px] h-[9px] rounded-full shrink-0"
        style={{ background: color }}
        aria-hidden
      />
      <span>{name}</span>
    </span>
  );
}

function StatusPill({ status }: { status: ProjectNode['status'] }) {
  const colors: Record<ProjectNode['status'], { bg: string; text: string }> = {
    active:     { bg: 'color-mix(in srgb, #22c55e 12%, transparent)', text: '#22c55e' },
    maintained: { bg: 'color-mix(in srgb, #94a3b8 14%, transparent)', text: '#94a3b8' },
    archived:   { bg: 'color-mix(in srgb, #f59e0b 12%, transparent)', text: '#f59e0b' },
  };
  const c = colors[status];
  return (
    <span
      className="font-mono text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-sm"
      style={{ background: c.bg, color: c.text }}
    >
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card Style 1: Ledger Row
// A flat, hairline-ruled row. Magazine TOC / track listing aesthetic.
// ─────────────────────────────────────────────────────────────────────────────

function LedgerCard({ node }: { node: ProjectNode }) {
  return (
    <div
      className="w-full"
      style={{
        borderTop: '1px solid var(--theme-border-color)',
        borderBottom: '1px solid var(--theme-border-color)',
        marginTop: -1, // collapse adjacent borders
      }}
    >
      <div className="py-3 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-0">
        {/* Left: title + description */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
          <span
            className="text-[15px] font-medium tracking-tight shrink-0"
            style={{ color: 'var(--theme-text-color)' }}
          >
            {node.title}
          </span>
          <span
            className="text-[12px] leading-[1.5] truncate"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            {node.description}
          </span>
        </div>

        {/* Right: stats row */}
        <div
          className="shrink-0 flex items-center gap-3 font-mono text-[11px]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          {/* Language */}
          <LangDot color={node.lang.color} name={node.lang.name} />
          {/* Stars */}
          <span className="flex items-center gap-1">
            <StarIcon />
            <span className="tabular-nums">{node.stars}</span>
          </span>
          {/* Version */}
          <span
            className="font-mono text-[10px] tracking-wide"
            style={{ color: node.color, opacity: 0.85 }}
          >
            {node.version}
          </span>
          {/* Last pushed */}
          <span style={{ opacity: 0.55 }}>{node.lastPushed}</span>
          {/* Status */}
          <StatusPill status={node.status} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card Style 2: Index Card with Corner Mark
// Paper-like, minimal border. Tiny accent mark in one corner.
// ─────────────────────────────────────────────────────────────────────────────

function IndexCard({ node }: { node: ProjectNode }) {
  return (
    <div
      className="relative w-full px-4 py-4"
      style={{
        background: `color-mix(in srgb, ${node.color} 4%, var(--theme-card-bg))`,
      }}
    >
      {/* Corner triangle mark — top-right */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 22px 22px 0',
          borderColor: `transparent ${node.color} transparent transparent`,
          opacity: 0.55,
        }}
        aria-hidden
      />

      {/* Title + version row */}
      <div className="flex items-baseline justify-between gap-2 mb-1.5 pr-4">
        <h3
          className="text-[15px] font-medium tracking-tight leading-[1.2]"
          style={{ color: 'var(--theme-text-color)' }}
        >
          {node.title}
        </h3>
        <span
          className="font-mono text-[10px] tracking-wider shrink-0"
          style={{ color: node.color, opacity: 0.9 }}
        >
          {node.version}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-[12px] leading-[1.6] mb-3"
        style={{ color: 'var(--theme-muted-color)' }}
      >
        {node.description}
      </p>

      {/* Stats footer */}
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px]"
        style={{ color: 'var(--theme-muted-color)' }}
      >
        <LangDot color={node.lang.color} name={node.lang.name} />
        <span className="flex items-center gap-1">
          <StarIcon /><span className="tabular-nums">{node.stars}</span>
        </span>
        <span className="flex items-center gap-1">
          <ForkIcon /><span className="tabular-nums">{node.forks}</span>
        </span>
        <span style={{ opacity: 0.6 }}>{node.lastPushed}</span>
        <StatusPill status={node.status} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card Style 3: Type Specimen
// Pure typography. Big title, muted description, tiny mono stats row. No surface.
// ─────────────────────────────────────────────────────────────────────────────

function TypeSpecimenCard({ node }: { node: ProjectNode }) {
  return (
    <div className="w-full py-1">
      {/* Big title */}
      <h3
        className="text-[26px] sm:text-[30px] font-medium tracking-[-0.03em] leading-[1.1] mb-1"
        style={{ color: 'var(--theme-text-color)' }}
      >
        {node.title}
      </h3>

      {/* Description */}
      <p
        className="text-[13px] leading-[1.65] mb-2.5 max-w-[42ch]"
        style={{ color: 'var(--theme-muted-color)' }}
      >
        {node.description}
      </p>

      {/* Mono stats row */}
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em]"
        style={{ color: 'var(--theme-muted-color)' }}
      >
        <span style={{ color: node.color, opacity: 0.9 }}>{node.version}</span>
        <span style={{ opacity: 0.35 }}>·</span>
        <LangDot color={node.lang.color} name={node.lang.name} />
        <span style={{ opacity: 0.35 }}>·</span>
        <span className="flex items-center gap-1">
          <StarIcon /><span className="tabular-nums">{node.stars}</span>
        </span>
        <span style={{ opacity: 0.35 }}>·</span>
        <span>{node.lastPushed}</span>
        <span style={{ opacity: 0.35 }}>·</span>
        <StatusPill status={node.status} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card dispatcher
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ node }: { node: ProjectNode }) {
  switch (node.cardStyle) {
    case 'ledger':        return <LedgerCard node={node} />;
    case 'index-card':    return <IndexCard node={node} />;
    case 'type-specimen': return <TypeSpecimenCard node={node} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Branch row — trunk dot + horizontal branch line + card
// ─────────────────────────────────────────────────────────────────────────────

function BranchRow({ node }: { node: ProjectNode }) {
  const lineWidth = BRANCH_LINE_WIDTH[node.branchLength];

  return (
    <div className="relative flex items-start" style={{ paddingLeft: BRANCH_LABEL_OFFSET + lineWidth }}>
      {/* Branch dot on trunk */}
      <div
        className="absolute rounded-full z-10"
        style={{
          left: TRUNK_LEFT - 5,
          top: node.cardStyle === 'type-specimen' ? 10 : node.cardStyle === 'ledger' ? 14 : 16,
          width: 10,
          height: 10,
          background: node.color,
          boxShadow: `0 0 0 3px var(--theme-bg-color), 0 0 0 4px ${node.color}40`,
        }}
        aria-hidden
      />

      {/* Horizontal branch line */}
      <div
        className="absolute"
        style={{
          left: TRUNK_LEFT + 5,
          top: node.cardStyle === 'type-specimen' ? 14 : node.cardStyle === 'ledger' ? 18 : 20,
          width: lineWidth + (BRANCH_LABEL_OFFSET - TRUNK_LEFT - 5),
          height: 1,
          background: `linear-gradient(to right, ${node.color}90, ${node.color}30)`,
        }}
        aria-hidden
      />

      {/* Card */}
      <div className="flex-1 min-w-0">
        <ProjectCard node={node} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section label — "// style: ledger" etc.
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ label, description }: { label: string; description: string }) {
  return (
    <div
      className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.16em] py-1"
      style={{ color: 'var(--theme-muted-color)', paddingLeft: BRANCH_LABEL_OFFSET }}
    >
      <span style={{ opacity: 0.45 }}>// style: </span>
      <span style={{ color: 'var(--theme-accent-color)', opacity: 0.8 }}>{label}</span>
      <span style={{ opacity: 0.35 }}>—</span>
      <span style={{ opacity: 0.45 }}>{description}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Merge annotation — a subtle visual between dependent pairs
// ─────────────────────────────────────────────────────────────────────────────

function MergeAnnotation({ fromTitle, toTitle, fromColor }: {
  fromTitle: string;
  toTitle: string;
  fromColor: string;
}) {
  return (
    <div
      className="flex items-center gap-2 font-mono text-[9px] tracking-wider"
      style={{ color: 'var(--theme-muted-color)', paddingLeft: BRANCH_LABEL_OFFSET, opacity: 0.55 }}
    >
      <span style={{ color: fromColor, opacity: 0.7 }}>{fromTitle}</span>
      <svg width="28" height="10" viewBox="0 0 28 10" fill="none" aria-hidden>
        <path d="M0 5 Q6 5 10 2 Q18 -1 28 5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
      <span style={{ opacity: 0.6 }}>{toTitle}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HEAD marker at the bottom of the trunk
// ─────────────────────────────────────────────────────────────────────────────

function HeadMarker() {
  return (
    <div
      className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em]"
      style={{ paddingLeft: TRUNK_LEFT - 7, color: 'var(--theme-muted-color)' }}
    >
      {/* Diamond shape */}
      <div
        className="shrink-0"
        style={{
          width: 10,
          height: 10,
          background: 'var(--theme-accent-color)',
          transform: 'rotate(45deg)',
          opacity: 0.6,
        }}
        aria-hidden
      />
      <span className="uppercase tracking-[0.16em] text-[9px]" style={{ opacity: 0.5 }}>
        HEAD · main
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Vertical spacer between sections
// ─────────────────────────────────────────────────────────────────────────────

function TrunkSpacer({ height = 16 }: { height?: number }) {
  return <div style={{ height }} aria-hidden />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main BranchTree component
// ─────────────────────────────────────────────────────────────────────────────

export function BranchTree() {
  const ledgerNodes    = NODES.filter(n => n.cardStyle === 'ledger');
  const indexCardNodes = NODES.filter(n => n.cardStyle === 'index-card');
  const typeNodes      = NODES.filter(n => n.cardStyle === 'type-specimen');

  // Build a lookup for dependency relationships
  const nodeBySlug = Object.fromEntries(NODES.map(n => [n.slug, n]));

  function renderSection(nodes: ProjectNode[], gapClass: string) {
    return nodes.map((node, i) => {
      const dep = node.dependsOn ? nodeBySlug[node.dependsOn] : null;
      return (
        <div key={node.slug} className={i > 0 ? gapClass : ''}>
          {dep && (
            <MergeAnnotation
              fromTitle={dep.title}
              toTitle={node.title}
              fromColor={dep.color}
            />
          )}
          <BranchRow node={node} />
        </div>
      );
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">

      {/* ──────────────────── Masthead ──────────────────── */}
      <header className="mb-12" style={{ paddingLeft: BRANCH_LABEL_OFFSET }}>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3"
          style={{ color: 'var(--theme-muted-color)', opacity: 0.6 }}
        >
          arach.dev · branches
        </div>
        <h1 className="text-[28px] sm:text-[32px] font-medium tracking-[-0.03em] leading-[1.1] mb-2">
          Project tree
        </h1>
        <p
          className="text-[13px] leading-[1.7]"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          14 repositories · 3 card styles under evaluation
        </p>
      </header>

      {/* ──────────────────── Trunk + branches ──────────────────── */}
      <div className="relative">
        {/* The trunk */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: TRUNK_LEFT,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, var(--theme-border-color) 4%, var(--theme-border-color) 96%, transparent)',
          }}
          aria-hidden
        />

        <div className="space-y-0">

          {/* ── Section 1: Ledger ── */}
          <TrunkSpacer height={8} />
          <SectionLabel label="ledger" description="flat row · hairline rules · magazine TOC" />
          <TrunkSpacer height={12} />

          <div className="space-y-0">
            {renderSection(ledgerNodes, 'mt-0')}
          </div>

          {/* ── Section divider ── */}
          <TrunkSpacer height={32} />
          <SectionLabel label="index-card" description="paper surface · corner mark · no stripe" />
          <TrunkSpacer height={12} />

          {/* ── Section 2: Index Card ── */}
          <div className="space-y-4">
            {renderSection(indexCardNodes, '')}
          </div>

          {/* ── Section divider ── */}
          <TrunkSpacer height={32} />
          <SectionLabel label="type-specimen" description="pure typography · big title · no surface" />
          <TrunkSpacer height={12} />

          {/* ── Section 3: Type Specimen ── */}
          <div className="space-y-6">
            {renderSection(typeNodes, '')}
          </div>

          {/* ── HEAD marker ── */}
          <TrunkSpacer height={32} />
          <HeadMarker />
          <TrunkSpacer height={8} />

        </div>
      </div>

      {/* ──────────────────── Footer ──────────────────── */}
      <div
        className="mt-12 font-mono text-[10px] uppercase tracking-[0.16em]"
        style={{ color: 'var(--theme-muted-color)', opacity: 0.35, paddingLeft: BRANCH_LABEL_OFFSET }}
      >
        prototype · hardcoded data · /labs/branches
      </div>
    </div>
  );
}
