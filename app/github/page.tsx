import GitHubActivityPage from "@/components/github/GitHubActivityPage"
import InteractiveBackground from "@/components/InteractiveBackground"
import { GitHubProvider } from "@/lib/github-context"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "GitHub Activity - arach.dev",
  description: "Detailed GitHub contribution analytics and repository insights",
  openGraph: {
    title: 'GitHub Activity - arach.dev',
    description: 'Detailed GitHub contribution analytics and repository insights',
    images: [
      {
        url: '/api/og?title=GitHub%20Activity&subtitle=Contributions%20%26%20Statistics&path=/github',
        width: 1200,
        height: 630,
        alt: 'GitHub Activity - arach.dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Activity - arach.dev',
    description: 'Detailed GitHub contribution analytics and repository insights',
    images: ['/api/og?title=[ARACH.DEV]&subtitle=GitHub%20Activity%20%26%20Contributions&path=/github'],
  },
}

export default function GitHubPage() {
  return (
    <GitHubProvider username="arach">
      <InteractiveBackground maxEdges={3} />
      <div className="container mx-auto px-4 py-6 min-h-[90vh] relative z-10">
        <GitHubActivityPage />
      </div>
    </GitHubProvider>
  )
}