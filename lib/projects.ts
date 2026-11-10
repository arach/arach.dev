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
  /** Logo path resolved at server-time from public/logos/{slug}.{svg,png,webp}.
   *  Drop a file there and it appears automatically. */
  logo?: string;
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
    tech: ['Bun', 'TypeScript', 'React'],
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
      website: 'https://lineareads.com',
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
    websiteUrl: 'https://lineareads.com',
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
      github: 'https://github.com/hudsonkit/hudson',
      website: 'https://hudsonkit.com',
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
    websiteUrl: 'https://hudsonkit.com',
  },
  {
    slug: 'talkie',
    title: 'Talkie',
    description: 'Capture thoughts with context on Mac and iPhone',
    longDescription: `Talkie brings dictation, voice memos, notes, and Mac meeting capture into one searchable library. Captures keep their work context so you can pick up a thought later or hand it to an agent through the CLI. On Mac, dictation and voice memos support on-device transcription. You start each meeting recording manually. A cloud provider transcribes the meeting when Cloud annotation is enabled and the selected provider has a key. Otherwise, Talkie saves the meeting recording without a transcript. You can use workflows to process your captures later.`,
    tags: ['iOS', 'macOS', 'Swift'],
    tech: ['Swift', 'SwiftUI', 'CloudKit', 'TypeScript', 'Bun'],
    links: {
      website: 'https://www.talkie.to/',
    },
    features: [
      'Mac dictation with a global hotkey',
      'Searchable voice memos and notes',
      'Manual meeting recording on Mac',
      'App and window context for later retrieval',
      'Workflows and CLI access for agents',
    ],
    status: 'active',
    preview: 'Dictation, memos, notes, and Mac meetings in a searchable library with CLI access for agents.',
    color: '#6366f1',
    icon: '📻',
    websiteUrl: 'https://www.talkie.to/',
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
      website: 'https://deweydocs.com',
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
    websiteUrl: 'https://deweydocs.com',
  },
  {
    slug: 'fab',
    title: 'Fab',
    description: 'Hold a key and say it. Your words land in the app you are using',
    longDescription: `Fab is a macOS app for voice and screen input. Hold a key and talk, and the words are typed into the app in front, along with anything you grab and mark up. Transcription and screen reading run on your Mac. Paired Macs know each other over your own network, so words and clipboards can land on another machine.`,
    tags: ['desktop', 'macOS', 'voice'],
    tech: ['Swift', 'AppKit', 'TypeScript', 'Bun'],
    links: {
      website: 'https://fab.run',
    },
    features: [
      'Talk: hold fn and the words are typed into the app in front',
      'Grab an area, a window or a short video, marked up inline',
      'Recent grabs and words kept by the pointer for pasting',
      'Pair two Macs once; talk there, or tunnel the clipboard over pinned TLS',
      'Hush mutes open mics and muffles audio while you talk',
    ],
    status: 'active',
    preview: 'Hold a key and say it. Words, grabs and marks land in the app you are using.',
    color: '#0ea5e9',
    icon: '🎙️',
    websiteUrl: 'https://fab.run',
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
    slug: 'vox',
    title: 'Vox',
    description: 'Local transcription and text-to-speech for Mac apps',
    longDescription: `Vox powers transcription and text-to-speech on macOS. Apple apps embed the engine directly through Swift packages. Browser apps and Node tools connect through Vox Companion, a local daemon that keeps models warm and shares them over WebSocket JSON-RPC and an HTTP bridge.`,
    tags: ['macOS', 'speech', 'developer-tools'],
    tech: ['Swift', 'TypeScript', 'Bun', 'MLX'],
    links: {
      github: 'https://github.com/hudsonkit/vox',
      website: 'https://voxd.cc',
      docs: 'https://voxd.cc/docs/start',
    },
    features: [
      'Transcription of files or live microphone audio, with word timings',
      'Text-to-speech with system voices, local models or a provider',
      'Swift packages for macOS and iOS apps',
      'Vox Companion daemon with Node and browser SDKs',
      'Model warm-up, timing metrics, catalog and plugins',
    ],
    status: 'active',
    preview: 'Audio to text and back, on your Mac. Swift packages, a local daemon and SDKs.',
    color: '#10b981',
    icon: '🔊',
    websiteUrl: 'https://voxd.cc',
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
    slug: 'canvas',
    title: 'Canvas',
    description: 'Spatial markdown notes for your Mac, open to your agents',
    longDescription: `Canvas is a native menu bar app for spatial notes. Press Hyper+N anywhere and a glass note lands on your screen, placed in space and remembered there. Notes are plain markdown files in a folder you own, so agents and the CLI write the same files the panels render, live.`,
    tags: ['desktop', 'macOS', 'agents'],
    tech: ['Swift', 'AppKit', 'Markdown', 'CLI'],
    links: {
      github: 'https://github.com/arach/blink',
      website: 'https://blink.arach.dev',
    },
    features: [
      'Glass note panels that remember position and size',
      'Global hotkeys without an accessibility grant',
      'Plain markdown with YAML frontmatter, in files you own',
      'The filesystem is the API: agents and the CLI edit live',
      'No account and no cloud; notes stay local',
    ],
    status: 'active',
    preview: 'Glass notes placed in space. Plain markdown you own, open to your agents.',
    color: '#8b5cf6',
    icon: '✨',
    websiteUrl: 'https://blink.arach.dev',
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
