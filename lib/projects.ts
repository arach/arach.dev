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
  screenshots?: string[];
  metrics?: {
    stars?: number;
    downloads?: number;
    users?: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'scout',
    title: 'Scout',
    description: 'Privacy-focused dictation app with local Whisper models',
    longDescription: `Scout is a native macOS/Windows dictation app that runs Whisper AI models entirely on your device. 
    No cloud services, no API keys, no subscriptions - just fast, private, and accurate voice-to-text conversion.`,
    tags: ['desktop', 'Tauri', 'AI'],
    tech: ['Tauri', 'React', 'TypeScript', 'Whisper AI', 'Rust'],
    links: {
      github: 'https://github.com/arach/scout',
      website: 'https://arach.github.io/scout',
    },
    features: [
      'Multiple Whisper model sizes',
      'File upload and batch processing',
      'Native OS overlays',
      'Global hotkeys',
      'No internet required',
    ],
    status: 'active',
    preview: 'Voice to text, all local. Multiple models, file upload, native overlays.',
    color: '#10b981',
    icon: '🎙️',
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
    slug: 'pomo',
    title: 'Pomo',
    description: 'Minimal floating Pomodoro timer with multiple watchfaces',
    longDescription: `Pomo is a beautifully minimal Pomodoro timer that stays out of your way. 
    With multiple watchfaces and always-on-top functionality, it helps you maintain focus without the clutter.`,
    tags: ['desktop', 'Tauri', 'productivity'],
    tech: ['Tauri', 'React', 'TypeScript', 'Framer Motion'],
    links: {
      github: 'https://github.com/arach/pomo',
      website: 'https://arach.github.io/pomo',
    },
    features: [
      'Always-on-top floating timer',
      'Multiple watchfaces (Terminal, Neon, Rolodex)',
      'Global hotkey access (Hyperkey+P)',
      'Minimal resource usage',
      'Custom session lengths',
    ],
    status: 'active',
    preview: 'Always-on-top timer. Hyperkey+P access. Terminal, Neon, Rolodex faces.',
    color: '#ef4444',
    icon: '🍅',
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
    slug: 'reflow',
    title: 'Reflow',
    description: 'Programmatic logo generator using mathematical wave functions',
    longDescription: `Reflow generates unique, deterministic logos using mathematical wave functions. 
    Each logo is a piece of living code, with seed-based generation ensuring consistent brand identities.`,
    tags: ['web', 'Next.js', 'creative'],
    tech: ['Next.js', 'TypeScript', 'Canvas API', 'Mathematical Functions'],
    links: {
      github: 'https://github.com/arach/reflow',
      website: 'https://arach.github.io/reflow',
    },
    features: [
      'Seed-based deterministic generation',
      'Mathematical wave functions',
      'Real-time preview',
      'Export to SVG/PNG',
      'Customizable parameters',
    ],
    status: 'active',
    preview: 'Logos as living code. Seed-based identities with real-time preview.',
    color: '#06b6d4',
    icon: '🌊',
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
  {
    slug: 'grab',
    title: 'Grab',
    description: 'Lightweight macOS menu bar app for screenshots & clipboard',
    longDescription: `Grab is a native macOS menu bar utility for capturing screenshots and managing clipboard history.
    Built with Swift for maximum performance and minimal resource usage.`,
    tags: ['macOS', 'Swift'],
    tech: ['Swift', 'SwiftUI', 'AppKit', 'Core Graphics'],
    links: {
      github: 'https://github.com/arach/grab',
      website: 'https://arach.github.io/grab',
    },
    features: [
      'Menu bar integration',
      'Screenshot capture',
      'Clipboard history',
      'Global hotkeys',
      'Automatic file naming',
    ],
    status: 'active',
    preview: 'Menu bar capture tool. Screenshots, clipboard history, global hotkeys.',
    color: '#3b82f6',
    icon: '📸',
  },
  {
    slug: 'tempo',
    title: 'Tempo',
    description: 'Life enrichment planner - stack by importance, not time',
    longDescription: `Tempo reimagines planning by focusing on importance rather than schedules. 
    Organize your life into Enrichment, Connection, Growth, and Creative categories.`,
    tags: ['web', 'Next.js', 'productivity'],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    links: {
      github: 'https://github.com/arach/tempo',
      website: 'https://arach.github.io/tempo',
    },
    features: [
      'Priority-based planning',
      'Four life categories',
      'No rigid schedules',
      'Progress tracking',
      'Minimalist interface',
    ],
    status: 'active',
    preview: 'No schedules, just priorities. Enrichment, Connection, Growth, Creative.',
    color: '#a855f7',
    icon: '⏱️',
  },
  {
    slug: 'peal',
    title: 'Peal',
    description: 'Web-based notification sound designer',
    longDescription: `Peal lets you design and generate custom notification sounds right in your browser. 
    Batch generate variations, visualize waveforms, and integrate via CLI with npx peal add.`,
    tags: ['web', 'TypeScript', 'audio'],
    tech: ['TypeScript', 'Web Audio API', 'Canvas', 'Next.js'],
    links: {
      github: 'https://github.com/arach/peal',
      website: 'https://arach.github.io/peal',
    },
    features: [
      'Batch generate 50 unique sounds',
      'Waveform visualization',
      'Effects and modulation',
      'CLI integration: npx peal add',
      'Export to various formats',
    ],
    status: 'maintained',
    preview: 'Batch generate 50 unique sounds. Waveform viz, effects, and CLI: npx peal add',
    color: '#ec4899',
    icon: '🔔',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(p => p.tags.includes(tag));
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter(p => p.status === status);
}