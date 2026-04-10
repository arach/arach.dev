export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  tech: string[];
  links: {
    github?: string;
    website?: string;
    demo?: string;
    docs?: string;
  };
  features: string[];
  status: 'active' | 'maintained' | 'archived';
  preview: string;
  color: string; // Accent color for this project
  icon?: string; // Emoji or icon
  websiteUrl?: string; // Live website URL for screenshots/previews
  screenshots?: string[];
  metrics?: {
    stars?: number;
    downloads?: number;
    users?: string;
  };
}

// Projects ordered by most recent GitHub activity
export const projects: Project[] = [
  {
    slug: 'openscout',
    title: 'OpenScout',
    description: 'Multi-agent broker runtime for AI coding harnesses',
    longDescription: `OpenScout is a desktop app, CLI, and broker runtime for coordinating multiple AI coding agents. The broker is the only writer of canonical state — conversations, work, deliveries, and bindings are addressable, replayable, and observable. Harness-agnostic across Claude Code, Codex, tmux, and future tools.`,
    tags: ['desktop', 'CLI', 'AI'],
    tech: ['Bun', 'TypeScript', 'Electron', 'React'],
    links: {
      github: 'https://github.com/arach/openscout',
      website: 'https://openscout.app',
    },
    features: [
      'Broker as the canonical state writer',
      'Addressable agents, conversations, messages, invocations',
      'Replayable from stored records, not terminal scrollback',
      'Harness-agnostic (Claude Code, Codex, tmux)',
      'Published @openscout/scout CLI wrapper',
    ],
    status: 'active',
    preview: 'Multi-agent broker for AI coding. Canonical state, harness-agnostic, replayable.',
    color: '#0ea5e9',
    icon: '🔭',
    websiteUrl: 'https://openscout.app',
  },
  {
    slug: 'lattices',
    title: 'Lattices',
    description: 'Agentic window manager for macOS with tmux, OCR, and desktop APIs',
    longDescription: `Lattices turns the desktop into a programmable workspace for AI agents and power users. It combines tiling window management, tmux session orchestration, screen text indexing, and a desktop control surface so agents can work across real apps with structure instead of chaos.`,
    tags: ['macOS', 'AI', 'developer-tools'],
    tech: ['Swift', 'SwiftUI', 'Node.js', 'tmux', 'OCR'],
    links: {
      github: 'https://github.com/arach/lattices',
      website: 'https://lattices.dev',
    },
    features: [
      'Tile and manage real app windows',
      'Coordinate tmux sessions and desktop workspaces',
      'Index on-screen text for agent workflows',
      'Expose a rich desktop API for automation',
      'Bridge AI agents into real macOS environments',
    ],
    status: 'active',
    preview: 'Agentic window manager for macOS. Tiles windows, manages tmux, indexes the screen.',
    color: '#06b6d4',
    icon: '🪟',
    websiteUrl: 'https://lattices.dev',
  },
  {
    slug: 'linea',
    title: 'Linea',
    description: 'Local-first PDF reading studio',
    longDescription: `Linea is a local-first PDF reader and annotation studio. Built for deep reading without cloud sync or subscriptions — your documents stay on your device. Designed for researchers, engineers, and anyone who needs focused, distraction-free reading with powerful annotation tools.`,
    tags: ['desktop', 'macOS', 'productivity'],
    tech: ['Swift', 'SwiftUI', 'PDFKit', 'Core Data'],
    links: {
      github: 'https://github.com/arach/linea',
    },
    features: [
      'Local-first — no cloud, no subscriptions',
      'Annotation and highlighting tools',
      'Distraction-free reading mode',
      'Fast document indexing and search',
      'Native macOS performance',
    ],
    status: 'active',
    preview: 'Local-first PDF reading. No cloud, no subscriptions. Annotations, search, native performance.',
    color: '#f59e0b',
    icon: '📄',
  },
  {
    slug: 'hud',
    title: 'Hudson',
    description: 'Multi-app canvas workspace and HUD-style chrome for React apps',
    longDescription: `Hudson is a workspace system for canvas-first apps. It combines a multi-app world, HUD chrome, and structured panel primitives so products can feel more like operating environments than pages. The component layer includes navigation bars, resizable side panels, command surfaces, terminal drawers, and a minimap-ready frame model.`,
    tags: ['web', 'React', 'UI'],
    tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Lucide'],
    links: {
      github: 'https://github.com/arach/hudson',
      website: 'https://hudson-arach.vercel.app',
    },
    features: [
      'Canvas-first workspace shell for multi-app environments',
      'HUD chrome primitives for navigation, panels, and commands',
      'Pan and zoom world layer with structured overlays',
      'Terminal drawers, status surfaces, and workspace framing',
      'Built for rich React tools instead of plain marketing sites',
    ],
    status: 'active',
    preview: 'Canvas workspace + HUD chrome. A richer shell for multi-app React tools.',
    color: '#34d399',
    icon: '🎛️',
    websiteUrl: 'https://hudson-arach.vercel.app',
  },
  {
    slug: 'talkie',
    title: 'Talkie',
    description: 'Multi-platform communication app with iOS, macOS, and backend',
    longDescription: `Talkie is a cross-platform walkie-talkie app for instant voice communication. Push-to-talk interface with real-time audio streaming across iOS, macOS, and web. Built for teams who need quick, low-latency voice chat without the overhead of video calls.`,
    tags: ['iOS', 'macOS', 'Swift'],
    tech: ['Swift', 'SwiftUI', 'WebRTC', 'Node.js', 'WebSockets'],
    links: {
      github: 'https://github.com/arach/usetalkie.com',
      website: 'https://usetalkie.com',
    },
    features: [
      'Push-to-talk interface',
      'Real-time audio streaming',
      'Cross-platform (iOS, macOS, web)',
      'Low-latency voice chat',
      'Team channels and direct messages',
    ],
    status: 'active',
    preview: 'Cross-platform walkie-talkie. Push-to-talk, real-time audio, native apps.',
    color: '#6366f1',
    icon: '📻',
    websiteUrl: 'https://usetalkie.com',
  },
  {
    slug: 'fabric',
    title: 'Fabric',
    description: 'Containers and execution surfaces for agentic development',
    longDescription: `Fabric is a systems layer for building and running agentic workflows in more controlled environments. It explores images, execution surfaces, and repeatable environments so coding agents can do real work with cleaner runtime assumptions and less setup drift.`,
    tags: ['developer-tools', 'AI', 'containers'],
    tech: ['TypeScript', 'Docker', 'Container tooling', 'Node.js'],
    links: {
      github: 'https://github.com/arach/fabric',
    },
    features: [
      'Agent-oriented container and runtime experiments',
      'Repeatable execution surfaces for coding workflows',
      'Image-first thinking for dev environments',
      'Supports reproducible agent tasks and demos',
      'Explores cleaner infrastructure for agentic tools',
    ],
    status: 'active',
    preview: 'Containers for agentic development. Cleaner environments, less setup drift.',
    color: '#ea580c',
    icon: '🧱',
  },
  {
    slug: 'dewey',
    title: 'Dewey',
    description: 'Documentation toolkit for AI-agent-ready docs and static doc sites',
    longDescription: `Dewey helps teams audit, score, generate, and publish documentation that both humans and AI agents can actually use. It treats docs as an operational asset—something that should be navigable, structured, and production-ready instead of a pile of disconnected pages.`,
    tags: ['developer-tools', 'docs', 'AI'],
    tech: ['TypeScript', 'Node.js', 'Static site tooling', 'Content pipelines'],
    links: {
      github: 'https://github.com/arach/dewey',
      website: 'https://dewey.arach.dev/',
    },
    features: [
      'Audit and score documentation quality',
      'Generate and refine agent-ready docs',
      'Produce static doc sites from structured content',
      'Designed for both human readers and coding agents',
      'Turns docs into a maintained product surface',
    ],
    status: 'active',
    preview: 'Audit, score, and publish docs that humans and AI agents can both use.',
    color: '#a855f7',
    icon: '📚',
    websiteUrl: 'https://dewey.arach.dev/',
  },
  {
    slug: 'og',
    title: 'OG',
    description: 'Declarative Open Graph image generation with zero design effort',
    longDescription: `OG is a Node.js library for generating beautiful social media preview images programmatically.
    Four pre-built templates (branded, minimal, docs, editor-dark) handle common use cases. Includes CLI tools for batch generation, URL validation, and sitemap-wide auditing.`,
    tags: ['npm', 'TypeScript', 'developer-tools'],
    tech: ['Node.js', 'TypeScript', 'Puppeteer', 'Google Fonts'],
    links: {
      github: 'https://github.com/arach/og',
      website: 'https://og.arach.dev',
    },
    features: [
      'Four pre-built templates (branded/minimal/docs/editor-dark)',
      'CLI for batch generation from config files',
      'URL validator for checking existing OG tags',
      'Sitemap auditor for site-wide validation',
      'Local preview server for rapid iteration',
    ],
    status: 'active',
    preview: 'Beautiful OG images with zero design. 4 templates, CLI batch generation, sitemap auditor.',
    color: '#f97316',
    icon: '🖼️',
    websiteUrl: 'https://og.arach.dev',
  },
  {
    slug: 'vif',
    title: 'Vif',
    description: 'Declarative screen capture built for AI agents',
    longDescription: `Vif is a CLI tool for automating video and screenshot generation on macOS. Designed for AI agents with a file-first architecture—everything is YAML storyboards, version-controlled takes, and CLI commands. Perfect for generating app demos, documentation assets, and marketing materials through conversation.`,
    tags: ['CLI', 'macOS', 'AI'],
    tech: ['Node.js', 'TypeScript', 'FFmpeg', 'macOS APIs'],
    links: {
      github: 'https://github.com/arach/vif',
      website: 'https://vif.jdi.sh',
    },
    features: [
      'YAML storyboards for declarative video composition',
      'Version-controlled takes for iteration',
      'Audio analysis with BPM detection and mixing',
      'Window discovery by app name',
      'Agent-first: edit YAML, run vif, iterate',
    ],
    status: 'active',
    preview: 'Screen capture for AI agents. YAML storyboards, versioned takes, audio mixing.',
    color: '#38bdf8',
    icon: '🎬',
    websiteUrl: 'https://vif.jdi.sh',
  },
  {
    slug: 'arc',
    title: 'Arc',
    description: 'Visual diagram editor with TypeScript export',
    longDescription: `Arc is a drag-and-drop diagram editor for creating architecture diagrams. Design system architectures visually, then export to clean TypeScript for embedding in documentation sites. Features infinite canvas, grid snapping, multiple node sizes, and customizable connector styles.`,
    tags: ['web', 'React', 'developer-tools'],
    tech: ['React', 'TypeScript', 'Canvas API', 'Framer Motion'],
    links: {
      github: 'https://github.com/arach/arc',
      website: 'https://arc.jdi.sh',
    },
    features: [
      'Drag-and-drop node placement',
      'Export to TypeScript, JSON, SVG, PNG',
      'Multiple node sizes and color themes',
      'Customizable connector styles with labels',
      'Shareable diagram links',
    ],
    status: 'active',
    preview: 'Visual diagrams to TypeScript. Drag-drop editor, multiple exports, shareable links.',
    color: '#8b5cf6',
    icon: '📐',
    websiteUrl: 'https://arc.jdi.sh',
  },
  {
    slug: 'speakeasy',
    title: 'Speakeasy',
    description: 'Unified text-to-speech CLI with multi-provider support',
    longDescription: `Speakeasy provides a unified interface for multiple TTS providers. With intelligent caching,
    it's 16x faster on repeated text and supports OpenAI, ElevenLabs, and Groq out of the box.`,
    tags: ['CLI', 'TTS', 'developer-tools'],
    tech: ['Node.js', 'TypeScript', 'OpenAI', 'ElevenLabs', 'Groq'],
    links: {
      github: 'https://github.com/arach/speakeasy',
      website: 'https://speakeasy.arach.dev',
    },
    features: [
      '16x faster with intelligent caching',
      'Multiple TTS provider support',
      'Single configuration file',
      'Streaming support',
      'Voice selection and customization',
    ],
    status: 'active',
    preview: '16x faster caching, OpenAI/ElevenLabs/Groq support, single config file.',
    color: '#f59e0b',
    icon: '🔊',
  },
  {
    slug: 'hooked',
    title: 'Hooked',
    description: 'Voice alerts and task loops for Claude Code',
    longDescription: `Hooked is a TypeScript toolkit that supercharges Claude Code with voice notifications and automated continuation loops. Get spoken alerts when Claude needs attention, and define completion criteria like "tests passing" to keep Claude working autonomously until goals are met.`,
    tags: ['CLI', 'TypeScript', 'AI'],
    tech: ['TypeScript', 'Node.js', 'SpeakEasy', 'Claude Code Hooks'],
    links: {
      github: 'https://github.com/arach/hooked',
      website: 'https://hooked.arach.dev',
    },
    features: [
      'Voice alerts via SpeakEasy integration',
      'Until loops: keep working until tests/build pass',
      'Multiple preset modes (test/build/typecheck/lint)',
      'Web dashboard for history and configuration',
      'Multi-session support with separate objectives',
    ],
    status: 'active',
    preview: 'Voice alerts + until loops. "Keep working until tests pass." Web dashboard included.',
    color: '#f472b6',
    icon: '🪝',
    websiteUrl: 'https://hooked.arach.dev',
  },
  {
    slug: 'blink',
    title: 'Blink',
    description: 'AI-native spatial notes where notes become intelligent agents',
    longDescription: `Blink reimagines note-taking with spatial canvas and AI agents. Each note can think, process,
    and connect autonomously. Drag-to-detach windows create a fluid workspace where your thoughts can evolve.`,
    tags: ['desktop', 'Tauri', 'AI'],
    tech: ['Tauri', 'React', 'TypeScript', 'AI Agents', 'Canvas'],
    links: {
      github: 'https://github.com/arach/blink',
      website: 'https://arach.github.io/blink',
    },
    features: [
      'Spatial canvas for notes',
      'AI agents for each note',
      'Drag-to-detach windows',
      'Autonomous note connections',
      'Real-time collaboration',
    ],
    status: 'active',
    preview: 'Drag-to-detach windows. Notes that think, process, and connect autonomously.',
    color: '#8b5cf6',
    icon: '✨',
  },
  {
    slug: '2048ish',
    title: '2048ish',
    description: 'Modern twist on the classic 2048 puzzle game',
    longDescription: `A fresh take on the addictive 2048 puzzle game with smooth animations,
    clean design, and new gameplay mechanics that add depth to the classic formula.`,
    tags: ['web', 'game'],
    tech: ['React', 'TypeScript', 'Framer Motion', 'TailwindCSS'],
    links: {
      github: 'https://github.com/arach/2048ish',
      website: 'https://arach.github.io/2048ish',
    },
    features: [
      'Smooth gesture controls',
      'Multiple board sizes',
      'Achievement system',
      'Clean, modern design',
      'Mobile responsive',
    ],
    status: 'maintained',
    preview: 'Addictive number puzzle with smooth animations and clean design.',
    color: '#fb923c',
    icon: '🎮',
  },
];

export function getHomepageProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(p => p.tags.includes(tag));
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter(p => p.status === status);
}
