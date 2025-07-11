import HomePage from "@/components/home/HomePage";
import DottedBackground from "@/components/DottedBackground";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  const projects = [
    { title: "Grab", description: "Modern clipboard manager for macOS", link: "https://arach.github.io/grab", github: "https://github.com/arach/grab", tags: ["macOS", "Swift"], preview: "⌘+Shift+V for instant clipboard history. Smart search and preview." },
    { title: "Blink", description: "Fast screenshot and screen recording tool", link: "https://arach.github.io/blink", github: "https://github.com/arach/blink", tags: ["macOS", "Swift"], preview: "⌘+Shift+5 to capture. Instant uploads with shareable links." },
    { title: "Reflow", description: "Modern terminal text reflow and formatting tool", link: "https://arach.github.io/reflow", github: "https://github.com/arach/reflow", tags: ["CLI", "Rust"], preview: "Pipe any text through reflow for perfect formatting. Fast and memory-efficient." },
    { title: "Peal", description: "Lightweight audio processing and visualization library", link: "https://arach.github.io/peal", github: "https://github.com/arach/peal", tags: ["library", "TypeScript"], preview: "Real-time audio analysis with WebAudio API. Perfect for music visualizers." },
    { title: "Scout", description: "Cross-platform local-first dictation app optimized for agentic use cases", link: "https://arach.github.io/scout", github: "https://github.com/arach/scout", tags: ["desktop", "Tauri"], preview: "Voice to text with AI agents. Local Whisper model for privacy." },
    { title: "Pomo", description: "Beautifully designed floating Pomodoro timer", link: "https://arach.github.io/pomo", github: "https://github.com/arach/pomo", tags: ["macOS", "Swift"], preview: "Minimal floating timer. 25 min focus, 5 min break. Always on top." },
    { title: "Tempo", description: "A mindful weekly planner without the pressure of exact times", link: "https://arach.github.io/tempo", github: "https://github.com/arach/tempo", tags: ["desktop", "Tauri"], preview: "Time-blocking without the stress. Drag tasks into your week, not specific times." },
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