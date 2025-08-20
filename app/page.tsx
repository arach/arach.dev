'use client';

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HomePage from "@/components/home/HomePage";
import StaticPathBackground from "@/components/StaticPathBackground";
import { backgroundThemes, type BackgroundTheme } from "@/components/InteractiveBackground";
import { DebugToolbar } from "@/components/debug/DebugToolbar";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get theme from URL or default to first theme
  const getThemeFromParams = () => {
    const themeName = searchParams.get('theme');
    if (themeName) {
      const theme = backgroundThemes.find(t => t.name === themeName);
      if (theme) return theme;
    }
    return backgroundThemes[0];
  };
  
  const [currentTheme, setCurrentTheme] = useState<BackgroundTheme>(getThemeFromParams());
  const [themeChangeNotification, setThemeChangeNotification] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Ensure we're on the client
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Update theme when URL changes
  useEffect(() => {
    const theme = getThemeFromParams();
    setCurrentTheme(theme);
  }, [searchParams]);
  
  // Handle theme changes by updating URL
  const handleThemeChange = useCallback((theme: BackgroundTheme) => {
    // Update URL with new theme
    const params = new URLSearchParams(searchParams.toString());
    params.set('theme', theme.name);
    router.push(`?${params.toString()}`, { scroll: false });
    
    // Show notification
    setThemeChangeNotification(`Theme changed to ${theme.name}`);
    setTimeout(() => setThemeChangeNotification(null), 3000);
  }, [searchParams, router]);
  
  const projects = [
    { title: "Scout", description: "Privacy-focused dictation app with local Whisper models", link: "https://arach.github.io/scout", github: "https://github.com/arach/scout", tags: ["desktop", "Tauri"], preview: "Voice to text, all local. Multiple models, file upload, native overlays." },
    { title: "Blink", description: "AI-native spatial notes where notes become intelligent agents", link: "https://arach.github.io/blink", github: "https://github.com/arach/blink", tags: ["desktop", "Tauri"], preview: "Drag-to-detach windows. Notes that think, process, and connect autonomously." },
    { title: "Pomo", description: "Minimal floating Pomodoro timer with multiple watchfaces", link: "https://arach.github.io/pomo", github: "https://github.com/arach/pomo", tags: ["desktop", "Tauri"], preview: "Always-on-top timer. Hyperkey+P access. Terminal, Neon, Rolodex faces." },
    { title: "Speakeasy", description: "Unified text-to-speech CLI with multi-provider support", link: "https://speakeasy.arach.dev", github: "https://github.com/arach/speakeasy", tags: ["CLI", "TTS"], preview: "16x faster caching, OpenAI/ElevenLabs/Groq support, single config file." },
    { title: "Reflow", description: "Programmatic logo generator using mathematical wave functions", link: "https://arach.github.io/reflow", github: "https://github.com/arach/reflow", tags: ["web", "Next.js"], preview: "Logos as living code. Seed-based identities with real-time preview." },
    { title: "2048ish", description: "Modern twist on the classic 2048 puzzle game", link: "https://arach.github.io/2048ish", github: "https://github.com/arach/2048ish", tags: ["web", "game"], preview: "Addictive number puzzle with smooth animations and clean design." },
    { title: "Grab", description: "Lightweight macOS menu bar app for screenshots & clipboard", link: "https://arach.github.io/grab", github: "https://github.com/arach/grab", tags: ["macOS", "Swift"], preview: "Menu bar capture tool. Screenshots, clipboard history, global hotkeys." },
    { title: "Tempo", description: "Life enrichment planner - stack by importance, not time", link: "https://arach.github.io/tempo", github: "https://github.com/arach/tempo", tags: ["web", "Next.js"], preview: "No schedules, just priorities. Enrichment, Connection, Growth, Creative." },
    { title: "Peal", description: "Web-based notification sound designer", link: "https://arach.github.io/peal", github: "https://github.com/arach/peal", tags: ["web", "TypeScript"], preview: "Batch generate 50 unique sounds. Waveform viz, effects, and CLI: npx peal add" },
  ];
  return (
    <>
      <StaticPathBackground theme={currentTheme} maxActivePaths={5} />
      <div className="container mx-auto px-4 py-6 min-h-[90vh] relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <HomePage projects={projects} />
        </div>
      </div>
      
      {/* Theme Change Notification */}
      {themeChangeNotification && (
        <div className="fixed top-4 right-4 z-[10000] px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm animate-fade-in">
          ✓ {themeChangeNotification}
        </div>
      )}
      
      {/* Debug Toolbar with Theme Picker - Only render on client after mount */}
      {mounted && (
        <DebugToolbar 
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          backgroundThemes={backgroundThemes}
        />
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-6 min-h-[90vh] relative z-10">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}