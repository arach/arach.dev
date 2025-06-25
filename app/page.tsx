import HomePage from "@/components/home/HomePage";
import DottedBackground from "@/components/DottedBackground";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  const projects = [
    { title: "arach.io", description: "🙋🏻 website.", link: "https://arach.io", github: "https://github.com/arach/arach-io" },
    { title: "clueso.xyz", description: "AI agent that monitors top github repos and generates reports.", link: "https://clueso.xyz", github: "https://github.com/arach/clueso.xyz" },
    { title: "highlight", description: "Raycast Extension that shares screenshots and content from your browser", link: "https://highlight.xyz", github: "https://github.com/arach/highlight" },
    { title: "arach.dev", description: "✋🏼 {here} ✋🏼", link: "https://arach.dev", github: "https://github.com/arach/arach.dev" },
    { title: "Scout", description: "Cross-platform local-first dictation app optimized for agentic use cases", link: "https://github.com/arach/scout", github: "https://github.com/arach/scout" },
    { title: "Pomo", description: "Beautifully designed floating Pomodoro timer", link: "https://github.com/arach/pomo", github: "https://github.com/arach/pomo" },
    { title: "Tempo", description: "A mindful weekly planner without the pressure of exact times", link: "https://github.com/arach/tempo", github: "https://github.com/arach/tempo" },
    { title: "Konfigurater", description: "Visual editor for Karabiner-Elements keyboard configurations", link: "https://github.com/arach/Konfigurater", github: "https://github.com/arach/Konfigurater" },
    { title: "Kit", description: "Professional text-based icon generator", link: "https://github.com/arach/Kit", github: "https://github.com/arach/Kit" },
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