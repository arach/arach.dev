import HomePage from "@/components/home/HomePage";
import DottedBackground from "@/components/DottedBackground";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  const projects = [
    { title: "arach.io", description: "🙋🏻 website.", link: "https://arach.io", github: "https://github.com/arach/arach-io" },
    { title: "Grab", description: "Modern clipboard manager for macOS", link: "https://arach.github.io/grab", github: "https://github.com/arach/grab" },
    { title: "Blink", description: "Fast screenshot and screen recording tool", link: "https://arach.github.io/blink", github: "https://github.com/arach/blink" },
    { title: "Reflow", description: "Modern terminal text reflow and formatting tool", link: "https://arach.github.io/reflow", github: "https://github.com/arach/reflow" },
    { title: "Peal", description: "Lightweight audio processing and visualization library", link: "https://arach.github.io/peal", github: "https://github.com/arach/peal" },
    { title: "arach.dev", description: "✋🏼 {here} ✋🏼", link: "https://arach.dev", github: "https://github.com/arach/arach.dev" },
    { title: "Scout", description: "Cross-platform local-first dictation app optimized for agentic use cases", link: "https://arach.github.io/scout", github: "https://github.com/arach/scout" },
    { title: "Pomo", description: "Beautifully designed floating Pomodoro timer", link: "https://arach.github.io/pomo", github: "https://github.com/arach/pomo" },
    { title: "Tempo", description: "A mindful weekly planner without the pressure of exact times", link: "https://arach.github.io/tempo", github: "https://github.com/arach/tempo" },
    { title: "Konfigurater", description: "Visual editor for Karabiner-Elements keyboard configurations", link: "https://arach.github.io/konfigurater", github: "https://github.com/arach/Konfigurater" },
    { title: "Kit", description: "Professional text-based icon generator", link: "https://arach.github.io/kit", github: "https://github.com/arach/Kit" },
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