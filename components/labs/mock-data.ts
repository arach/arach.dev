export type EntryKind = 'commit' | 'release' | 'landing' | 'idea' | 'play';

export interface CommitEntry {
  kind: 'commit';
  ts: string;
  hash: string;
  repo: string;
  path: string;
  message: string;
  diff: { added: number; removed: number };
  branch?: string;
}

export interface ReleaseEntry {
  kind: 'release';
  ts: string;
  version: string;
  project: string;
  slug: string;
  note: string;
  date: string;
  accent: string;
}

export interface LandingEntry {
  kind: 'landing';
  ts: string;
  project: string;
  slug: string;
  description: string;
  milestone: string;
  accent: string;
  tags: string[];
}

export interface IdeaEntry {
  kind: 'idea';
  ts: string;
  title: string;
  lede: string;
  readTime: string;
  tags: string[];
}

export interface PlayEntry {
  kind: 'play';
  ts: string;
  title: string;
  hint: string;
  href?: string;
}

export type FeedEntry =
  | CommitEntry
  | ReleaseEntry
  | LandingEntry
  | IdeaEntry
  | PlayEntry;

export const FEED: FeedEntry[] = [
  {
    kind: 'commit',
    ts: '3h ago',
    hash: 'a4f82c1',
    repo: 'openscout',
    path: 'packages/broker/src/invocations.ts',
    message: 'feat(broker): addressable invocations with stable content-hash keys',
    diff: { added: 74, removed: 9 },
    branch: 'main',
  },
  {
    kind: 'commit',
    ts: '5h ago',
    hash: 'b91e3d7',
    repo: 'openscout',
    path: 'packages/broker/src/state.ts',
    message: 'fix: replay cursor not advancing on resumption from stored record',
    diff: { added: 18, removed: 31 },
  },
  {
    kind: 'commit',
    ts: '9h ago',
    hash: 'c73a0f4',
    repo: 'lattices',
    path: 'Sources/Lattices/WindowTiler.swift',
    message: 'fix: hairline alignment in canvas stroke renderer on Retina displays',
    diff: { added: 12, removed: 4 },
  },
  {
    kind: 'release',
    ts: 'yesterday',
    version: 'v0.4.0',
    project: 'OpenScout',
    slug: 'openscout',
    note: 'Stable broker API surface. Invocations are now addressable, replayable, and observable without terminal scrollback.',
    date: 'Apr 27, 2026',
    accent: '#0ea5e9',
  },
  {
    kind: 'commit',
    ts: 'yesterday',
    hash: 'd2b5e91',
    repo: 'openscout',
    path: 'packages/scout-cli/src/index.ts',
    message: 'chore: bump @openscout/scout to 0.4.0, update README install path',
    diff: { added: 8, removed: 8 },
  },
  {
    kind: 'commit',
    ts: '2d ago',
    hash: 'e14f3c8',
    repo: 'hooked',
    path: 'src/loops/until.ts',
    message: 'feat(until): expose --max-attempts flag, default 120 iterations',
    diff: { added: 47, removed: 12 },
    branch: 'main',
  },
  {
    kind: 'commit',
    ts: '2d ago',
    hash: 'f67a9b2',
    repo: 'dewey',
    path: 'src/scorer/structural.ts',
    message: 'refactor: collapse heading-depth and link-density into single quality signal',
    diff: { added: 29, removed: 61 },
  },
  {
    kind: 'idea',
    ts: '3d ago',
    title: 'State as the real product of an agent runtime',
    lede: 'Most agent frameworks treat state as plumbing. The interesting question is what happens when you promote it to the surface — addressable, diffable, replayable. That changes the debugging story entirely.',
    readTime: '4 min',
    tags: ['agents', 'systems'],
  },
  {
    kind: 'commit',
    ts: '3d ago',
    hash: 'a83c1d4',
    repo: 'linea',
    path: 'Sources/Linea/Annotations/HighlightLayer.swift',
    message: 'fix: annotation hit-test area misaligned after scroll offset change',
    diff: { added: 21, removed: 7 },
  },
  {
    kind: 'commit',
    ts: '4d ago',
    hash: 'b52e8f7',
    repo: 'vif',
    path: 'src/storyboard/renderer.ts',
    message: 'feat: YAML storyboard v2 — support parallel track composition',
    diff: { added: 103, removed: 44 },
    branch: 'feat/parallel-tracks',
  },
  {
    kind: 'landing',
    ts: '4d ago',
    project: 'Hooked',
    slug: 'hooked',
    description: 'Voice alerts and until loops for Claude Code. Spoken notifications when Claude needs input; completion-criteria loops that keep agents working autonomously.',
    milestone: 'v1.0 shipped to npm',
    accent: '#f472b6',
    tags: ['CLI', 'TypeScript', 'AI'],
  },
  {
    kind: 'commit',
    ts: '5d ago',
    hash: 'c09d2e1',
    repo: 'hooked',
    path: 'src/voice/speakeasy-bridge.ts',
    message: 'feat(voice): streaming TTS with per-sentence flush for lower latency',
    diff: { added: 56, removed: 14 },
  },
  {
    kind: 'commit',
    ts: '5d ago',
    hash: 'd71b4a9',
    repo: 'fabric',
    path: 'images/base/Dockerfile.agent',
    message: 'chore: pin node 22 LTS, add ca-certificates and git to base image',
    diff: { added: 6, removed: 3 },
  },
  {
    kind: 'play',
    ts: '6d ago',
    title: 'canvas-wave-shader — WebGL fragment shader experiment',
    hint: 'sinusoidal displacement map on a grid mesh, ~80 lines',
  },
  {
    kind: 'commit',
    ts: '6d ago',
    hash: 'e38f0c5',
    repo: 'arc',
    path: 'src/canvas/connector-router.ts',
    message: 'fix: orthogonal connector routing produces crossed segments on dense graphs',
    diff: { added: 38, removed: 22 },
  },
  {
    kind: 'commit',
    ts: 'last week',
    hash: 'f84e7b1',
    repo: 'lattices',
    path: 'Sources/Lattices/OCR/TextIndexer.swift',
    message: 'feat(ocr): incremental index — only re-scan dirty screen regions',
    diff: { added: 91, removed: 18 },
    branch: 'feat/incremental-ocr',
  },
  {
    kind: 'release',
    ts: 'last week',
    version: 'v0.3.2',
    project: 'Dewey',
    slug: 'dewey',
    note: 'Structural scorer now emits per-section breakdowns. CLI --format=json output stabilised.',
    date: 'Apr 21, 2026',
    accent: '#a855f7',
  },
  {
    kind: 'commit',
    ts: 'last week',
    hash: 'a19c5d8',
    repo: 'speakeasy',
    path: 'src/cache/disk-lru.ts',
    message: 'perf: LRU eviction now O(1) — swap linked-list for doubly-indexed map',
    diff: { added: 44, removed: 67 },
  },
  {
    kind: 'commit',
    ts: 'Apr 20',
    hash: 'b63f1e2',
    repo: 'talkie',
    path: 'ios/Talkie/AudioEngine/PTTSession.swift',
    message: 'fix: push-to-talk gate not releasing on backgrounded state transition',
    diff: { added: 15, removed: 9 },
  },
  {
    kind: 'idea',
    ts: 'Apr 18',
    title: 'Local-first is not about offline — it is about ownership',
    lede: 'The offline argument is a proxy for something harder to articulate: that your data should not require a live connection to a third-party service to exist. Sync is infrastructure, not a feature gatekeeping your own files.',
    readTime: '6 min',
    tags: ['local-first', 'design'],
  },
  {
    kind: 'commit',
    ts: 'Apr 17',
    hash: 'c42e9a3',
    repo: 'blink',
    path: 'src/canvas/spatial-index.ts',
    message: 'feat: R-tree spatial index for note collision queries at 10k nodes',
    diff: { added: 130, removed: 12 },
    branch: 'feat/rtree-index',
  },
  {
    kind: 'landing',
    ts: 'Apr 15',
    project: 'Linea',
    slug: 'linea',
    description: 'Local-first PDF reading studio for macOS. Annotations, highlights, fast full-text search — everything stays on device. No cloud, no subscription.',
    milestone: 'Public beta launched',
    accent: '#f59e0b',
    tags: ['macOS', 'Swift', 'productivity'],
  },
  {
    kind: 'release',
    ts: 'Apr 14',
    version: 'v2.1.0',
    project: 'Speakeasy',
    slug: 'speakeasy',
    note: 'Groq provider added. Cache hit rate up 23% after LRU rewrite. Streaming now stable across all three providers.',
    date: 'Apr 14, 2026',
    accent: '#f59e0b',
  },
  {
    kind: 'commit',
    ts: 'Apr 13',
    hash: 'd87b0f6',
    repo: 'og',
    path: 'src/templates/editor-dark.ts',
    message: 'fix: syntax highlight contrast ratio failing WCAG AA on amber tokens',
    diff: { added: 11, removed: 11 },
  },
  {
    kind: 'landing',
    ts: 'Apr 10',
    project: 'Lattices',
    slug: 'lattices',
    description: 'Agentic window manager for macOS. Tiling, tmux orchestration, and on-screen text indexing — gives AI agents a structured view of the real desktop.',
    milestone: 'First public release',
    accent: '#06b6d4',
    tags: ['macOS', 'AI', 'developer-tools'],
  },
  {
    kind: 'commit',
    ts: 'Apr 9',
    hash: 'e53c2d7',
    repo: 'fabric',
    path: 'src/runtime/executor.ts',
    message: 'feat(executor): sandbox each task run in an ephemeral container slice',
    diff: { added: 77, removed: 23 },
    branch: 'main',
  },
];
