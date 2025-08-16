import GitHubActivityPage from "@/components/github/GitHubActivityPage"
import InteractiveBackground from "@/components/InteractiveBackground"

export const metadata = {
  title: "GitHub Activity - arach.dev",
  description: "Detailed GitHub contribution analytics and repository insights",
}

export default function GitHubPage() {
  return (
    <>
      <InteractiveBackground maxEdges={3} />
      <div className="container mx-auto px-4 py-6 min-h-[90vh] relative z-10">
        <GitHubActivityPage />
      </div>
    </>
  )
}