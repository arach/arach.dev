import HomePage from "@/components/home/HomePage";
import DottedBackground from "@/components/DottedBackground";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  const projects = [
    { title: "arach.io", description: "🙋🏻 website.", link: "https://arach.io", github: "https://github.com/arach/arach-io" },
    { title: "clueso.xyz", description: "AI agent that monitors top github repos and generates reports.", link: "https://clueso.xyz", github: "https://github.com/arach/clueso.xyz" },
    { title: "highlight", description: "Raycast Extension that shares screenshots and content from your browser", link: "https://highlight.xyz", github: "https://github.com/arach/highlight" },
    { title: "arach.dev", description: "✋🏼 {here} ✋🏼", link: "https://arach.dev", github: "https://github.com/arach/arach.dev" },
    { title: "fwdhq.com", description: "Forward helps vertical SaaS companies develop automation APIs", link: "https://fwdhq.com", github: "https://github.com/arach/fwdhq" },
    { title: "browsermate.co", description: "A website where people can learn about browser automation and find the right tool for the job", link: "https://browsermate.co", github: "https://github.com/arach/browsermate" },
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