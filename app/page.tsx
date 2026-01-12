'use client';

import { useState, useEffect } from "react";
import { HomePage } from "@/components/home/HomePage";
import ThemedDottedGrid from "@/components/ThemedDottedGrid";
import { DebugToolbar } from "@/components/debug/DebugToolbar";
import { GitHubProvider } from "@/lib/github-context";

function HomeContent() {
  const [mounted, setMounted] = useState(false);
  const [showDebugToolbar, setShowDebugToolbar] = useState(true);
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Ensure we're on the client and setup keyboard shortcuts
  useEffect(() => {
    setMounted(true);
    
    // Add keyboard shortcut for debug toolbar toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + D to toggle debug toolbar
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        setShowDebugToolbar(prev => !prev);
      }
    };
    
    if (isDevelopment) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDevelopment]);
  
  // Projects ordered by most recent GitHub activity
  const projects = [
    { title: "Talkie", description: "Multi-platform communication app with iOS, macOS, and backend", link: "https://usetalkie.com", github: "https://github.com/arach/talkie", tags: ["iOS", "macOS", "Swift"], preview: "Cross-platform walkie-talkie. Push-to-talk, real-time audio, native apps." },
    { title: "OG", description: "Declarative Open Graph image generation with zero design effort", link: "https://og.arach.dev", github: "https://github.com/arach/og", tags: ["npm", "TypeScript"], preview: "Beautiful OG images with zero design. 4 templates, CLI batch generation, sitemap auditor." },
    { title: "Vif", description: "Declarative screen capture built for AI agents", link: "https://vif.jdi.sh", github: "https://github.com/arach/vif", tags: ["CLI", "macOS"], preview: "Screen capture for AI agents. YAML storyboards, versioned takes, audio mixing." },
    { title: "Arc", description: "Visual diagram editor with TypeScript export", link: "https://arc.jdi.sh", github: "https://github.com/arach/arc", tags: ["web", "React"], preview: "Visual diagrams to TypeScript. Drag-drop editor, multiple exports, shareable links." },
    { title: "Speakeasy", description: "Unified text-to-speech CLI with multi-provider support", link: "https://speakeasy.arach.dev", github: "https://github.com/arach/speakeasy", tags: ["CLI", "TTS"], preview: "16x faster caching, OpenAI/ElevenLabs/Groq support, single config file." },
    { title: "Hooked", description: "Voice alerts and task loops for Claude Code", link: "https://hooked.arach.dev", github: "https://github.com/arach/hooked", tags: ["CLI", "TypeScript"], preview: "Voice alerts + until loops. \"Keep working until tests pass.\" Web dashboard included." },
    { title: "Clipper", description: "Video compression TUI with presets and watch mode", github: "https://github.com/arach/clipper", tags: ["CLI", "TUI", "Python"], preview: "Drop, compress, share. 4 presets (social/web/archive/tiny), watch folders, clipboard copy." },
    { title: "Blink", description: "AI-native spatial notes where notes become intelligent agents", link: "https://arach.github.io/blink", github: "https://github.com/arach/blink", tags: ["desktop", "Tauri"], preview: "Drag-to-detach windows. Notes that think, process, and connect autonomously." },
    { title: "Scout", description: "Privacy-focused dictation app with local Whisper models", link: "https://arach.github.io/scout", github: "https://github.com/arach/scout", tags: ["desktop", "Tauri"], preview: "Voice to text, all local. Multiple models, file upload, native overlays." },
    { title: "Peal", description: "Web-based notification sound designer", link: "https://arach.github.io/peal", github: "https://github.com/arach/peal", tags: ["web", "TypeScript"], preview: "Batch generate 50 unique sounds. Waveform viz, effects, and CLI: npx peal add" },
    { title: "Pomo", description: "Minimal floating Pomodoro timer with multiple watchfaces", link: "https://arach.github.io/pomo", github: "https://github.com/arach/pomo", tags: ["desktop", "Tauri"], preview: "Always-on-top timer. Hyperkey+P access. Terminal, Neon, Rolodex faces." },
    { title: "2048ish", description: "Modern twist on the classic 2048 puzzle game", link: "https://arach.github.io/2048ish", github: "https://github.com/arach/2048ish", tags: ["web", "game"], preview: "Addictive number puzzle with smooth animations and clean design." },
    { title: "Grab", description: "Lightweight macOS menu bar app for screenshots & clipboard", link: "https://arach.github.io/grab", github: "https://github.com/arach/grab", tags: ["macOS", "Swift"], preview: "Menu bar capture tool. Screenshots, clipboard history, global hotkeys." },
    { title: "Tempo", description: "Life enrichment planner - stack by importance, not time", link: "https://arach.github.io/tempo", github: "https://github.com/arach/tempo", tags: ["web", "Next.js"], preview: "No schedules, just priorities. Enrichment, Connection, Growth, Creative." },
    { title: "Reflow", description: "Programmatic logo generator using mathematical wave functions", link: "https://arach.github.io/reflow", github: "https://github.com/arach/reflow", tags: ["web", "Next.js"], preview: "Logos as living code. Seed-based identities with real-time preview." },
  ];
  return (
    <GitHubProvider username="arach">
      {/* Simple dotted grid background - always visible, theme-aware */}
      <ThemedDottedGrid />
      
      <div className="container mx-auto px-4 py-6 min-h-[90vh] relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <HomePage projects={projects} />
        </div>
      </div>
      
      {/* Debug Toolbar - Only render in development mode, toggle with Cmd/Ctrl + D */}
      {mounted && isDevelopment && showDebugToolbar && <DebugToolbar />}
      
      {/* Debug toolbar hint when hidden */}
      {mounted && isDevelopment && !showDebugToolbar && (
        <div className="fixed top-4 right-4 text-[10px] text-gray-400 font-mono opacity-50 pointer-events-none">
          Cmd+D for debug
        </div>
      )}
    </GitHubProvider>
  );
}

export default function Home() {
  return <HomeContent />;
}