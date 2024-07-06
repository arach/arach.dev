import HomePage from "@/components/home/HomePage";
import DottedBackground from "@/components/DottedBackground";

export default function Home() {
  const projects = [
    { title: "arach.io", description: "Personal website.", link: "https://arach.io", github: "https://github.com/arach/arach-io" },
    { title: "clueso.xyz", description: "AI agent that monitors top github repos and generates reports.", link: "https://clueso.xyz", github: "https://github.com/arach/clueso.xyz" },
  ];
  return (
    <DottedBackground>
      <div className="container mx-auto px-4 py-6 min-h-[90vh]">
        <HomePage projects={projects} />
      </div>
    </DottedBackground>
  );
}