import HomePage from "@/components/home/HomePage";
import DottedBackground from "@/components/DottedBackground";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  const projects = [
    { title: "Grab", description: "Lightweight macOS menu bar app for screenshots & clipboard", link: "https://arach.github.io/grab", github: "https://github.com/arach/grab", tags: ["macOS", "Swift"], preview: "Menu bar capture tool. Screenshots, clipboard history, global hotkeys." },
    { title: "Blink", description: "AI-native spatial notes where notes become intelligent agents", link: "https://arach.github.io/blink", github: "https://github.com/arach/blink", tags: ["desktop", "Tauri"], preview: "Drag-to-detach windows. Notes that think, process, and connect autonomously." },
    { title: "Reflow", description: "Programmatic logo generator using mathematical wave functions", link: "https://arach.github.io/reflow", github: "https://github.com/arach/reflow", tags: ["web", "Next.js"], preview: "Logos as living code. Seed-based identities with real-time preview." },
    { title: "Peal", description: "Web-based notification sound designer", link: "https://arach.github.io/peal", github: "https://github.com/arach/peal", tags: ["web", "TypeScript"], preview: "Batch generate 50 unique sounds. Waveform viz, effects, and CLI: npx peal add" },
    { title: "Scout", description: "Privacy-focused dictation app with local Whisper models", link: "https://arach.github.io/scout", github: "https://github.com/arach/scout", tags: ["desktop", "Tauri"], preview: "Voice to text, all local. Multiple models, file upload, native overlays." },
    { title: "Pomo", description: "Minimal floating Pomodoro timer with multiple watchfaces", link: "https://arach.github.io/pomo", github: "https://github.com/arach/pomo", tags: ["desktop", "Tauri"], preview: "Always-on-top timer. Hyperkey+P access. Terminal, Neon, Rolodex faces." },
    { title: "Tempo", description: "Life enrichment planner - stack by importance, not time", link: "https://arach.github.io/tempo", github: "https://github.com/arach/tempo", tags: ["web", "Next.js"], preview: "No schedules, just priorities. Enrichment, Connection, Growth, Creative." },
    { title: "Konfigurater", description: "Visual editor for Karabiner-Elements keyboard configurations", link: "https://arach.github.io/konfigurater", github: "https://github.com/arach/Konfigurater", tags: ["macOS", "Swift"], preview: "Drag-and-drop keyboard remapping. No more JSON config files." },
    { title: "Kit", description: "Professional text-based icon generator", link: "https://arach.github.io/kit", github: "https://github.com/arach/Kit", tags: ["desktop", "Tauri"], preview: "Generate app icons from text. Perfect for prototypes and MVPs." },
  ];
  return (
    <>
      <InteractiveBackground maxEdges={5} />
      <div className="container mx-auto px-4 py-6 min-h-[90vh]">
        <HomePage projects={projects} />
      </div>
    </>
  );
}