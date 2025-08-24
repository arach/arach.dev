"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Github, Globe, Volume2, VolumeX, HelpCircle, BarChart3, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { fadeInUp } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"
import GitHubContributions from "@/components/GitHubContributions"
import HeroLCP from "./HeroLCP"
import CompactTypographyCard from "./CompactTypographyCard"
import { useTheme } from "@/lib/theme-context"

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

export default function HomePage({ projects }: { projects: Project[] }) {
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0)
  const [keyboardMode, setKeyboardMode] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const { playHoverSound, playClickSound, playButtonHoverSound, playButtonClickSound } = useAudioFeedback({
    enabled: audioEnabled,
    volume: 0.05,
  })

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") {
      return projects
    }
    const category = categories.find((cat) => cat.name === selectedCategory)
    return category ? category.projects : []
  }, [selectedCategory, categories, projects])

  // Suppress ResizeObserver errors
  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.stopImmediatePropagation()
      }
    }

    window.addEventListener("error", handleResizeObserverError)

    return () => {
      window.removeEventListener("error", handleResizeObserverError)
    }
  }, [])

  const handleCardHover = () => {
    if (audioEnabled) playHoverSound()
  }

  const handleCardClick = () => {
    if (audioEnabled) playClickSound()
  }

  const handleButtonHover = () => {
    if (audioEnabled) playButtonHoverSound()
  }

  const handleButtonClick = () => {
    if (audioEnabled) playButtonClickSound()
  }

  const scrollToCard = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (card && containerRef.current) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })
    }
  }, [])

  const navigateDown = useCallback(() => {
    setFocusedIndex((prev) => {
      const newIndex = prev < filteredProjects.length - 1 ? prev + 1 : 0
      setTimeout(() => scrollToCard(newIndex), 0)
      return newIndex
    })
  }, [filteredProjects.length, scrollToCard])

  const navigateUp = useCallback(() => {
    setFocusedIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : filteredProjects.length - 1
      setTimeout(() => scrollToCard(newIndex), 0)
      return newIndex
    })
  }, [filteredProjects.length, scrollToCard])

  const navigateRight = useCallback(() => {
    setFocusedIndex((prev) => {
      const currentCol = prev % 2
      let newIndex

      if (currentCol === 0) {
        newIndex = prev + 1 < filteredProjects.length ? prev + 1 : prev
      } else {
        newIndex = prev + 1 < filteredProjects.length ? prev + 1 : 0
      }

      setTimeout(() => scrollToCard(newIndex), 0)
      return newIndex
    })
  }, [filteredProjects.length, scrollToCard])

  const navigateLeft = useCallback(() => {
    setFocusedIndex((prev) => {
      const currentCol = prev % 2
      let newIndex

      if (currentCol === 1) {
        newIndex = prev - 1
      } else {
        newIndex = prev > 0 ? prev - 1 : filteredProjects.length - 1
      }

      setTimeout(() => scrollToCard(newIndex), 0)
      return newIndex
    })
  }, [filteredProjects.length, scrollToCard])

  const navigateCategory = useCallback(
    (direction: "next" | "prev") => {
      const allCategories = ["all", ...categories.map((cat) => cat.name)]
      const currentIndex = allCategories.indexOf(selectedCategory)

      let newIndex
      if (direction === "next") {
        newIndex = currentIndex < allCategories.length - 1 ? currentIndex + 1 : 0
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : allCategories.length - 1
      }

      setSelectedCategory(allCategories[newIndex])
      setFocusedIndex(0)
      setTimeout(() => scrollToCard(0), 100)
    },
    [selectedCategory, categories, scrollToCard],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Check if this is a navigation key
      const isNavigationKey = [
        "arrowdown", "arrowup", "arrowright", "arrowleft",
        "j", "k", "l", "h"
      ].includes(e.key.toLowerCase())

      // Auto-enter keyboard mode when navigation keys are pressed
      if (isNavigationKey && !keyboardMode) {
        e.preventDefault()
        setKeyboardMode(true)
        if (focusedIndex === -1) {
          setFocusedIndex(0)
          setTimeout(() => scrollToCard(0), 0)
        }
        // Don't process the key on the first press that activates keyboard mode
        // This gives visual feedback that keyboard mode is active
        return
      }

      // Always handle help toggle
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault()
        setShowHelp(!showHelp)
        if (!keyboardMode) {
          setKeyboardMode(true)
          if (focusedIndex === -1) {
            setFocusedIndex(0)
          }
        }
        return
      }

      // Sound toggle (works in any mode)
      if (e.key === "s") {
        e.preventDefault()
        setAudioEnabled(!audioEnabled)
        return
      }

      // Exit if not in keyboard mode (shouldn't happen now with auto-enter)
      if (!keyboardMode) return

      switch (e.key.toLowerCase()) {
        // Arrow keys
        case "arrowdown":
          e.preventDefault()
          navigateDown()
          break
        case "arrowup":
          e.preventDefault()
          navigateUp()
          break
        case "arrowright":
          e.preventDefault()
          navigateRight()
          break
        case "arrowleft":
          e.preventDefault()
          navigateLeft()
          break

        // Vim-style navigation
        case "j":
          e.preventDefault()
          navigateDown()
          break
        case "k":
          e.preventDefault()
          navigateUp()
          break
        case "l":
          e.preventDefault()
          navigateRight()
          break
        case "h":
          e.preventDefault()
          navigateLeft()
          break

        // Category navigation
        case "n":
          e.preventDefault()
          navigateCategory("next")
          break
        case "p":
          e.preventDefault()
          navigateCategory("prev")
          break

        // Quick category selection
        case "1":
          e.preventDefault()
          setSelectedCategory("all")
          setFocusedIndex(0)
          break
        case "2":
          e.preventDefault()
          if (categories[0]) {
            setSelectedCategory(categories[0].name)
            setFocusedIndex(0)
          }
          break
        case "3":
          e.preventDefault()
          if (categories[1]) {
            setSelectedCategory(categories[1].name)
            setFocusedIndex(0)
          }
          break

        // Actions
        case "enter":
        case " ":
          e.preventDefault()
          if (focusedIndex >= 0 && filteredProjects[focusedIndex]) {
            window.open(filteredProjects[focusedIndex].link, "_blank")
          }
          break
        case "g":
          e.preventDefault()
          if (focusedIndex >= 0 && filteredProjects[focusedIndex]) {
            window.open(filteredProjects[focusedIndex].github, "_blank")
          }
          break
        case "escape":
          e.preventDefault()
          setKeyboardMode(false)
          setFocusedIndex(-1)
          setShowHelp(false)
          setShowStats(false)
          break
      }
    },
    [
      keyboardMode,
      focusedIndex,
      filteredProjects,
      navigateDown,
      navigateUp,
      navigateRight,
      navigateLeft,
      navigateCategory,
      showHelp,
      categories,
      scrollToCard,
      audioEnabled,
    ],
  )

  const handleMouseMove = useCallback(() => {
    if (keyboardMode) {
      setKeyboardMode(false)
      setFocusedIndex(-1)
      setShowHelp(false)
    }
  }, [keyboardMode])

  const enterKeyboardMode = useCallback(() => {
    setKeyboardMode(true)
    if (focusedIndex === -1) {
      setFocusedIndex(0)
      setTimeout(() => scrollToCard(0), 0)
    }
  }, [focusedIndex, scrollToCard])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleKeyDown, handleMouseMove])

  // Reset focused index when category changes
  useEffect(() => {
    setFocusedIndex(0)
    cardRefs.current = []
  }, [selectedCategory])

  const StatBar = ({
    label,
    count,
    percentage,
    projects,
  }: { label: string; count: number; percentage: number; projects?: string[] }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium" style={{ color: 'var(--theme-text-color)' }}>{label}</span>
            <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>
              {count} ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      </TooltipTrigger>
      {projects && (
        <TooltipContent>
          <div className="text-xs">
            <p className="font-medium mb-1">{label} projects:</p>
            <p>{projects.join(", ")}</p>
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  )

  return (
    <TooltipProvider>
      <div ref={containerRef} className="max-w-4xl mx-auto py-4 sm:py-8 text-xs relative z-45" style={{ color: 'var(--theme-text-color)' }}>
        {/* Optimized Hero for LCP - renders immediately without animation */}
        <HeroLCP />
        
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
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowStats(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                style={{ backgroundColor: 'var(--theme-card-bg)', boxShadow: '0 20px 50px var(--theme-shadow-color)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold" style={{ color: 'var(--theme-heading-color)' }}>Project Statistics</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowStats(false)} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Overview */}
                    <Card className="p-4">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-sm">Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>Total Projects</span>
                            <span className="text-sm font-bold text-blue-600">{projectStats.totalProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>Categories</span>
                            <span className="text-sm font-bold text-green-600">{projectStats.categories.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>Technologies</span>
                            <span className="text-sm font-bold text-purple-600">
                              {projectStats.technologies.length}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Project Categories */}
                    <Card className="p-4">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-sm">Project Categories</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {projectStats.categories.map((category) => (
                          <StatBar
                            key={category.name}
                            label={category.name}
                            count={category.count}
                            percentage={category.percentage}
                          />
                        ))}
                      </CardContent>
                    </Card>

                    {/* Technologies */}
                    <Card className="p-4">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-sm">Technologies</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {projectStats.technologies.map((tech) => (
                          <StatBar
                            key={tech.name}
                            label={tech.name}
                            count={tech.count}
                            percentage={tech.percentage}
                            projects={tech.projects}
                          />
                        ))}
                      </CardContent>
                    </Card>

                    {/* Platforms */}
                    <Card className="p-4">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-sm">Platforms</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {projectStats.platforms.map((platform) => (
                          <StatBar
                            key={platform.name}
                            label={platform.name}
                            count={platform.count}
                            percentage={platform.percentage}
                            projects={platform.projects}
                          />
                        ))}
                      </CardContent>
                    </Card>

                    {/* Languages */}
                    <Card className="p-4">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-sm">Languages</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {projectStats.languages.map((language) => (
                          <StatBar
                            key={language.name}
                            label={language.name}
                            count={language.count}
                            percentage={language.percentage}
                            projects={language.projects}
                          />
                        ))}
                      </CardContent>
                    </Card>

                    {/* Top Technologies */}
                    <Card className="p-4">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-sm">Most Used</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-3">
                          {[...projectStats.technologies, ...projectStats.platforms, ...projectStats.languages]
                            .sort((a, b) => b.count - a.count)
                            .slice(0, 5)
                            .map((item, index) => (
                              <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                                  <span className="text-xs font-medium">{item.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">{item.count} projects</span>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Section title="Projects" headerAction={
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <GitHubContributions username="arach" />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowStats(!showStats)}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Show project statistics</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setShowHelp(!showHelp)
                    if (!keyboardMode) enterKeyboardMode()
                  }}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Show keyboard shortcuts (?)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-400 hover:text-gray-600"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                >
                  {audioEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{audioEnabled ? "Disable" : "Enable"} audio feedback</p>
              </TooltipContent>
            </Tooltip>
          </div>
        }>
          {/* Category Filter - Desktop only */}
          <div className="mb-4 sm:mb-6 relative z-45">
            {/* Mobile projects header */}
            <div className="sm:hidden mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Projects</span>
                  <span className="text-xs text-gray-500">({projects.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="block sm:hidden">
                    <GitHubContributions username="arach" />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowStats(!showStats)}
                      >
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Show project statistics</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        onClick={() => {
                          setShowHelp(!showHelp)
                          if (!keyboardMode) enterKeyboardMode()
                        }}
                      >
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Show keyboard shortcuts (?)</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        onClick={() => setAudioEnabled(!audioEnabled)}
                      >
                        {audioEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{audioEnabled ? "Disable" : "Enable"} audio feedback</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            
            {/* Desktop category buttons */}
            <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
              <button
                className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm transition-all duration-500 backdrop-blur-md border"
                style={{
                  backgroundColor: selectedCategory === "all" 
                    ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.1) : 'rgba(59, 130, 246, 0.1)') 
                    : (theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)'),
                  borderColor: selectedCategory === "all"
                    ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.2) : 'rgba(59, 130, 246, 0.2)')
                    : 'rgba(107, 114, 128, 0.05)',
                  color: selectedCategory === "all" 
                    ? (theme?.accentColor || 'rgb(59, 130, 246)') 
                    : (theme?.mutedTextColor || 'rgb(156, 163, 175)'),
                  fontWeight: 400
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== "all") {
                    e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.05) : 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== "all") {
                    e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.05)';
                  }
                }}
                onClick={() => {
                  handleButtonClick()
                  setSelectedCategory("all")
                  setFocusedIndex(0)
                }}
              >
                All Projects ({projects.length})
              </button>
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm transition-all duration-500 backdrop-blur-md border"
                  style={{
                    backgroundColor: selectedCategory === category.name 
                      ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.1) : 'rgba(59, 130, 246, 0.1)') 
                      : (theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)'),
                    borderColor: selectedCategory === category.name
                      ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.2) : 'rgba(59, 130, 246, 0.2)')
                      : 'rgba(107, 114, 128, 0.05)',
                    color: selectedCategory === category.name 
                      ? (theme?.accentColor || 'rgb(59, 130, 246)') 
                      : (theme?.mutedTextColor || 'rgb(156, 163, 175)'),
                    fontWeight: 400
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category.name) {
                      e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.05) : 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category.name) {
                      e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)';
                      e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.05)';
                    }
                  }}
                  onClick={() => {
                    handleButtonClick()
                    setSelectedCategory(category.name)
                    setFocusedIndex(0)
                  }}
                >
                  {category.icon} {category.name} ({category.projects.length})
                </button>
              ))}
            </div>

            {selectedCategory !== "all" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-md mb-4"
                style={{ 
                  backgroundColor: 'var(--theme-card-bg)', 
                  border: '1px solid var(--theme-border-color)' 
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{categories.find((cat) => cat.name === selectedCategory)?.icon}</span>
                  <h3 className="font-medium text-sm" style={{ color: 'var(--theme-heading-color)' }}>{selectedCategory}</h3>
                </div>
                <p className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>
                  {categories.find((cat) => cat.name === selectedCategory)?.description}
                </p>
              </motion.div>
            )}
          </div>

          {(keyboardMode || showHelp) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden sm:block mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800 relative z-45"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <p className="font-medium">Keyboard Navigation {keyboardMode ? "Active" : "Available"}</p>
                  {keyboardMode && !showHelp && (
                    <div className="flex items-center gap-3 text-blue-600">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-white border border-blue-200 rounded">Esc</kbd>
                        <span>to exit</span>
                      </span>
                      <span className="text-blue-400">•</span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-white border border-blue-200 rounded">?</kbd>
                        <span>for help</span>
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-2 text-blue-600 hover:text-blue-800"
                  onClick={() => setShowHelp(!showHelp)}
                >
                  {showHelp ? "Hide" : "Show"} Help
                </Button>
              </div>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-1 text-xs"
                >
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="font-medium mb-1">Navigation:</p>
                      <p>• ↑↓←→ or hjkl - Move between cards</p>
                      <p>• ? - Toggle this help</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Categories:</p>
                      <p>• n/p - Next/Previous category</p>
                      <p>• 1/2/3 - Quick category select</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Actions:</p>
                      <p>• Enter/Space - Open project</p>
                      <p>• g - Open GitHub repo</p>
                      <p>• s - Toggle sound</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Other:</p>
                      <p>• Esc - Exit keyboard mode</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

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
                    if (!keyboardMode) handleCardHover()
                  }}
                  onClick={() => {
                    handleCardClick()
                    window.open(project.link, "_blank")
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