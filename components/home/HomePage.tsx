"use client"

import type React from "react"
import { useState, useMemo } from "react"

import { motion, AnimatePresence } from "framer-motion"

import { fadeInUp } from "./animations"
import { TooltipProvider } from "@/components/ui"
import {
  HeroASCIIBanner,
  CompactTypographyCard,
  useKeyboardNavigation,
  ProjectStatsModal,
  HeaderActions,
  HelpModal,
  ProjectCategoryFilter,
  GitHubContributions,
} from "./"

interface Project {
  title: string
  description: string
  link: string
  github: string
  tags: string[]
  preview: string
}

interface ProjectCategory {
  name: string
  description: string
  projects: Project[]
  icon: string
}

interface TechStat {
  name: string
  count: number
  percentage: number
  projects: string[]
}

interface ProjectStats {
  totalProjects: number
  categories: { name: string; count: number; percentage: number }[]
  technologies: TechStat[]
  platforms: TechStat[]
  languages: TechStat[]
}

export function HomePage({ projects }: { projects: Project[] }) {
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Categorize projects
  const categories = useMemo((): ProjectCategory[] => {
    const categoryMap = new Map<string, Project[]>()

    projects.forEach((project) => {
      // Determine category based on tags
      let category = "Other"

      if (project.tags.some((tag) => ["desktop", "Tauri"].includes(tag))) {
        category = "Desktop Apps"
      } else if (project.tags.some((tag) => ["web", "Next.js", "TypeScript"].includes(tag))) {
        category = "Web Apps"
      } else if (project.tags.some((tag) => ["CLI", "TTS"].includes(tag))) {
        category = "CLI Tools"
      } else if (project.tags.some((tag) => ["macOS", "Swift"].includes(tag))) {
        category = "Native Apps"
      } else if (project.tags.some((tag) => ["game"].includes(tag))) {
        category = "Games"
      }

      if (!categoryMap.has(category)) {
        categoryMap.set(category, [])
      }
      categoryMap.get(category)!.push(project)
    })

    const categoryInfo: Record<string, { description: string; icon: string }> = {
      "Desktop Apps": {
        description: "Cross-platform desktop applications built with modern frameworks",
        icon: "🖥️",
      },
      "Web Apps": {
        description: "Interactive web applications and tools",
        icon: "🌐",
      },
      "CLI Tools": {
        description: "Command-line utilities and developer tools",
        icon: "⚡",
      },
      "Native Apps": {
        description: "Platform-specific native applications",
        icon: "📱",
      },
      Games: {
        description: "Interactive games and entertainment",
        icon: "🎮",
      },
      Other: {
        description: "Miscellaneous projects and experiments",
        icon: "🔧",
      },
    }

    return Array.from(categoryMap.entries())
      .map(([name, projects]) => ({
        name,
        description: categoryInfo[name]?.description || "Various projects",
        projects: projects.sort((a, b) => a.title.localeCompare(b.title)),
        icon: categoryInfo[name]?.icon || "📁",
      }))
      .sort((a, b) => b.projects.length - a.projects.length) // Sort by project count
  }, [projects])

  // Calculate detailed statistics
  const projectStats = useMemo((): ProjectStats => {
    const totalProjects = projects.length

    // Category stats
    const categoryStats = categories.map((cat) => ({
      name: cat.name,
      count: cat.projects.length,
      percentage: Math.round((cat.projects.length / totalProjects) * 100),
    }))

    // Technology mapping
    const techMapping: Record<string, { category: "technology" | "platform" | "language"; displayName: string }> = {
      Tauri: { category: "technology", displayName: "Tauri" },
      "Next.js": { category: "technology", displayName: "Next.js" },
      TypeScript: { category: "language", displayName: "TypeScript" },
      Swift: { category: "language", displayName: "Swift" },
      CLI: { category: "technology", displayName: "CLI" },
      TTS: { category: "technology", displayName: "Text-to-Speech" },
      desktop: { category: "platform", displayName: "Desktop" },
      web: { category: "platform", displayName: "Web" },
      macOS: { category: "platform", displayName: "macOS" },
      game: { category: "technology", displayName: "Game Development" },
    }

    // Count technologies, platforms, and languages
    const techCounts = new Map<string, { count: number; projects: string[] }>()
    const platformCounts = new Map<string, { count: number; projects: string[] }>()
    const languageCounts = new Map<string, { count: number; projects: string[] }>()

    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        const mapping = techMapping[tag]
        if (mapping) {
          const targetMap =
            mapping.category === "technology"
              ? techCounts
              : mapping.category === "platform"
                ? platformCounts
                : languageCounts

          if (!targetMap.has(mapping.displayName)) {
            targetMap.set(mapping.displayName, { count: 0, projects: [] })
          }
          const current = targetMap.get(mapping.displayName)!
          current.count++
          current.projects.push(project.title)
        }
      })
    })

    const createStatArray = (countMap: Map<string, { count: number; projects: string[] }>): TechStat[] => {
      return Array.from(countMap.entries())
        .map(([name, { count, projects }]) => ({
          name,
          count,
          percentage: Math.round((count / totalProjects) * 100),
          projects,
        }))
        .sort((a, b) => b.count - a.count)
    }

    return {
      totalProjects,
      categories: categoryStats,
      technologies: createStatArray(techCounts),
      platforms: createStatArray(platformCounts),
      languages: createStatArray(languageCounts),
    }
  }, [projects, categories])

  // Use keyboard navigation hook
  const {
    focusedIndex,
    keyboardMode,
    cardRefs,
    containerRef,
    filteredProjects,
    enterKeyboardMode,
    playHoverSound,
    playClickSound,
    playButtonHoverSound,
    playButtonClickSound,
  } = useKeyboardNavigation({
    projects,
    categories,
    selectedCategory,
    onCategoryChange: setSelectedCategory,
    onProjectSelect: (project) => {
      // Extract slug from project title (simplified - you may want to add slug to project data)
      const slug = project.title.toLowerCase().replace(/\s+/g, '-')
      window.location.href = `/projects/${slug}`
    },
    onProjectGitHub: (project) => {
      window.open(project.github, "_blank")
    },
    audioEnabled,
    onAudioToggle: () => setAudioEnabled(!audioEnabled),
    showHelp,
    onHelpToggle: () => setShowHelp(!showHelp),
    showStats,
    onStatsToggle: () => setShowStats(!showStats),
  })

  return (
    <TooltipProvider>
      <div ref={containerRef} className="max-w-4xl mx-auto py-4 sm:py-8 text-xs relative z-45" style={{ color: 'var(--theme-text-color)' }}>
        {/* Optimized Hero for LCP - renders immediately without animation */}
        <HeroASCIIBanner />
        
        <motion.div className="mb-4 sm:mb-8" {...fadeInUp}>
          <div className="border-l-2 pl-2 sm:pl-4 text-[10px] sm:text-xs mb-4 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" style={{ borderColor: 'var(--theme-border-color)', color: 'var(--theme-muted-text)' }}>
            <div>
              <span className="text-[10px] sm:text-xs">4x ex-CTO, 2x ex-founder, ex-Meta Engineering</span>{" "}
              <a
                href="https://arach.io"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-[10px] sm:text-xs underline cursor-pointer relative z-20 hover:opacity-80"
                style={{ color: 'var(--theme-muted-text)' }}
              >
                → more info
              </a>
            </div>
          </div>
        </motion.div>

        {/* Statistics Modal */}
        <ProjectStatsModal 
          showStats={showStats}
          onClose={() => setShowStats(false)}
          projectStats={projectStats}
        />

        <Section title="Projects" headerAction={
          <HeaderActions
            audioEnabled={audioEnabled}
            onAudioToggle={() => setAudioEnabled(!audioEnabled)}
            showHelp={showHelp}
            onHelpToggle={() => setShowHelp(!showHelp)}
            showStats={showStats}
            onStatsToggle={() => setShowStats(!showStats)}
            keyboardMode={keyboardMode}
            onEnterKeyboardMode={enterKeyboardMode}
          />
        }>
          {/* Category Filter */}
          <ProjectCategoryFilter
            projects={projects}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onButtonClick={playButtonClickSound}
            headerActions={
              <div className="flex items-center gap-1">
                <div className="mr-2">
                  <GitHubContributions username="arach" />
                </div>
                <HeaderActions
                  audioEnabled={audioEnabled}
                  onAudioToggle={() => setAudioEnabled(!audioEnabled)}
                  showHelp={showHelp}
                  onHelpToggle={() => setShowHelp(!showHelp)}
                  showStats={showStats}
                  onStatsToggle={() => setShowStats(!showStats)}
                  keyboardMode={keyboardMode}
                  onEnterKeyboardMode={enterKeyboardMode}
                  isMobile={true}
                />
              </div>
            }
          />

          {/* Help Modal */}
          <HelpModal
            showHelp={showHelp}
            keyboardMode={keyboardMode}
            onToggleHelp={() => setShowHelp(!showHelp)}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
            >
              {filteredProjects.map((project, index) => (
                <CompactTypographyCard
                  key={`${selectedCategory}-${project.title}`}
                  project={project}
                  index={index}
                  isKeyboardFocused={focusedIndex === index && keyboardMode}
                  onMouseEnter={() => {
                    if (!keyboardMode) playHoverSound()
                  }}
                  onClick={() => {
                    playClickSound()
                    const slug = project.title.toLowerCase().replace(/\s+/g, '-')
                    window.location.href = `/projects/${slug}`
                  }}
                  cardRef={(el) => {
                    if (el) cardRefs.current[index] = el;
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </Section>
      </div>
    </TooltipProvider>
  )
}

const Section = ({ title, children, headerAction }: { title: string; children: React.ReactNode; headerAction?: React.ReactNode }) => (
  <motion.section className="mb-6 sm:mb-10" {...fadeInUp}>
    <div className="hidden sm:flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      {headerAction}
    </div>
    {children}
  </motion.section>
)