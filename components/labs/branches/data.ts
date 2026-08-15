// Branch tree mock data — fabricated plausible repo stats
// Projects pulled from lib/projects.ts, stats invented

export type CardStyle = 'ledger' | 'index-card' | 'type-specimen';
export type Status = 'active' | 'maintained' | 'archived';

export interface LangDot {
  name: string;
  color: string;
}

export interface ProjectNode {
  slug: string;
  title: string;
  description: string;
  color: string;          // accent
  status: Status;
  lang: LangDot;
  version: string;
  stars: number;
  forks: number;
  lastPushed: string;
  license: string;
  openIssues: number;
  branch: string;
  contributors: number;
  cardStyle: CardStyle;
  // visual rhythm
  branchLength: 'short' | 'medium' | 'long'; // how far the branch line extends
  dependsOn?: string;    // slug — for merge-line rendering
}

const TS: LangDot = { name: 'TypeScript', color: '#3178c6' };
const SWIFT: LangDot = { name: 'Swift', color: '#f05138' };

export const NODES: ProjectNode[] = [
  // ── SECTION 1: Ledger style (5 projects) ─────────────────────────────────
  {
    slug: 'openscout',
    title: 'OpenScout',
    description: 'Multi-agent broker runtime for AI coding harnesses',
    color: '#0ea5e9',
    status: 'active',
    lang: TS,
    version: 'v0.9.2',
    stars: 312,
    forks: 28,
    lastPushed: '2h ago',
    license: 'MIT',
    openIssues: 7,
    branch: 'main',
    contributors: 1,
    cardStyle: 'ledger',
    branchLength: 'long',
  },
  {
    slug: 'lattices',
    title: 'Lattices',
    description: 'Agentic window manager for macOS — tiles, tmux, OCR, desktop APIs',
    color: '#06b6d4',
    status: 'active',
    lang: SWIFT,
    version: 'v0.6.1',
    stars: 187,
    forks: 11,
    lastPushed: '1d ago',
    license: 'MIT',
    openIssues: 4,
    branch: 'main',
    contributors: 1,
    cardStyle: 'ledger',
    branchLength: 'medium',
    dependsOn: 'openscout', // lattices depends on openscout for broker
  },
  {
    slug: 'fabric',
    title: 'Fabric',
    description: 'Containers and execution surfaces for agentic development',
    color: '#ea580c',
    status: 'active',
    lang: TS,
    version: 'v0.3.0',
    stars: 94,
    forks: 6,
    lastPushed: '3d ago',
    license: 'MIT',
    openIssues: 2,
    branch: 'main',
    contributors: 1,
    cardStyle: 'ledger',
    branchLength: 'short',
  },
  {
    slug: 'dewey',
    title: 'Dewey',
    description: 'Documentation toolkit for AI-agent-ready docs and static doc sites',
    color: '#a855f7',
    status: 'active',
    lang: TS,
    version: 'v1.2.0',
    stars: 141,
    forks: 14,
    lastPushed: '5d ago',
    license: 'MIT',
    openIssues: 3,
    branch: 'main',
    contributors: 1,
    cardStyle: 'ledger',
    branchLength: 'medium',
  },
  {
    slug: 'vif',
    title: 'Vif',
    description: 'Declarative screen capture built for AI agents — YAML storyboards',
    color: '#38bdf8',
    status: 'active',
    lang: TS,
    version: 'v0.5.3',
    stars: 78,
    forks: 5,
    lastPushed: 'last week',
    license: 'MIT',
    openIssues: 1,
    branch: 'main',
    contributors: 1,
    cardStyle: 'ledger',
    branchLength: 'short',
  },

  // ── SECTION 2: Index card style (5 projects) ─────────────────────────────
  {
    slug: 'linea',
    title: 'Linea',
    description: 'Local-first PDF reading studio — no cloud, no subscriptions',
    color: '#f59e0b',
    status: 'active',
    lang: SWIFT,
    version: 'v1.0.4',
    stars: 223,
    forks: 18,
    lastPushed: '2d ago',
    license: 'MIT',
    openIssues: 5,
    branch: 'main',
    contributors: 1,
    cardStyle: 'index-card',
    branchLength: 'long',
  },
  {
    slug: 'hud',
    title: 'Hudson',
    description: 'Multi-app canvas workspace and HUD-style chrome for React apps',
    color: '#34d399',
    status: 'active',
    lang: TS,
    version: 'v0.7.0',
    stars: 156,
    forks: 21,
    lastPushed: '4d ago',
    license: 'MIT',
    openIssues: 8,
    branch: 'main',
    contributors: 1,
    cardStyle: 'index-card',
    branchLength: 'medium',
  },
  {
    slug: 'arc',
    title: 'Arc',
    description: 'Visual diagram editor with TypeScript export',
    color: '#8b5cf6',
    status: 'active',
    lang: TS,
    version: 'v0.4.2',
    stars: 89,
    forks: 7,
    lastPushed: 'last week',
    license: 'MIT',
    openIssues: 2,
    branch: 'main',
    contributors: 1,
    cardStyle: 'index-card',
    branchLength: 'short',
  },
  {
    slug: 'talkie',
    title: 'Talkie',
    description: 'Cross-platform push-to-talk — iOS, macOS, web, real-time audio',
    color: '#6366f1',
    status: 'active',
    lang: SWIFT,
    version: 'v2.0.1',
    stars: 198,
    forks: 24,
    lastPushed: '6d ago',
    license: 'MIT',
    openIssues: 11,
    branch: 'main',
    contributors: 1,
    cardStyle: 'index-card',
    branchLength: 'medium',
  },
  {
    slug: 'og',
    title: 'OG',
    description: 'Declarative Open Graph image generation — 4 templates, CLI batch',
    color: '#f97316',
    status: 'active',
    lang: TS,
    version: 'v1.4.0',
    stars: 267,
    forks: 31,
    lastPushed: '2d ago',
    license: 'MIT',
    openIssues: 4,
    branch: 'main',
    contributors: 1,
    cardStyle: 'index-card',
    branchLength: 'short',
  },

  // ── SECTION 3: Type specimen style (4 projects) ──────────────────────────
  {
    slug: 'speakeasy',
    title: 'Speakeasy',
    description: 'Unified TTS CLI — 16x faster with intelligent caching, multi-provider',
    color: '#f59e0b',
    status: 'active',
    lang: TS,
    version: 'v1.1.0',
    stars: 134,
    forks: 9,
    lastPushed: '3d ago',
    license: 'MIT',
    openIssues: 2,
    branch: 'main',
    contributors: 1,
    cardStyle: 'type-specimen',
    branchLength: 'medium',
  },
  {
    slug: 'hooked',
    title: 'Hooked',
    description: 'Voice alerts and until-loops for Claude Code — spoken notifications',
    color: '#f472b6',
    status: 'active',
    lang: TS,
    version: 'v0.8.0',
    stars: 201,
    forks: 17,
    lastPushed: '1d ago',
    license: 'MIT',
    openIssues: 3,
    branch: 'main',
    contributors: 1,
    cardStyle: 'type-specimen',
    branchLength: 'long',
    dependsOn: 'speakeasy', // hooked depends on speakeasy for TTS
  },
  {
    slug: 'blink',
    title: 'Blink',
    description: 'AI-native spatial notes — each note thinks, processes, connects',
    color: '#8b5cf6',
    status: 'active',
    lang: TS,
    version: 'v0.2.1',
    stars: 77,
    forks: 4,
    lastPushed: '2 wk ago',
    license: 'MIT',
    openIssues: 6,
    branch: 'main',
    contributors: 1,
    cardStyle: 'type-specimen',
    branchLength: 'short',
  },
  {
    slug: '2048ish',
    title: '2048ish',
    description: 'Modern twist on the classic 2048 puzzle — smooth animations',
    color: '#fb923c',
    status: 'maintained',
    lang: TS,
    version: 'v1.0.0',
    stars: 44,
    forks: 8,
    lastPushed: '3 mo ago',
    license: 'MIT',
    openIssues: 0,
    branch: 'main',
    contributors: 1,
    cardStyle: 'type-specimen',
    branchLength: 'short',
  },
];

export const SECTION_RANGES = {
  ledger: NODES.filter(n => n.cardStyle === 'ledger'),
  indexCard: NODES.filter(n => n.cardStyle === 'index-card'),
  typeSpecimen: NODES.filter(n => n.cardStyle === 'type-specimen'),
};
