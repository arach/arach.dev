'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useAudioFeedback } from '@/hooks/useAudioFeedback'

interface Project {
  title: string
  description: string
  link?: string
  github?: string
  tags: string[]
  preview: string
}

interface ProjectCategory {
  name: string
  description: string
  projects: Project[]
  icon: string
}

interface KeyboardNavigationProps {
  projects: Project[]
  categories: ProjectCategory[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onProjectSelect: (project: Project) => void
  onProjectGitHub: (project: Project) => void
  audioEnabled: boolean
  onAudioToggle: () => void
  showHelp: boolean
  onHelpToggle: () => void
  showStats: boolean
  onStatsToggle: () => void
}

export function useKeyboardNavigation({
  projects,
  categories,
  selectedCategory,
  onCategoryChange,
  onProjectSelect,
  onProjectGitHub,
  audioEnabled,
  onAudioToggle,
  showHelp,
  onHelpToggle,
  showStats,
  onStatsToggle,
}: KeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [keyboardMode, setKeyboardMode] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { playHoverSound, playClickSound, playButtonHoverSound, playButtonClickSound } = useAudioFeedback({
    enabled: audioEnabled,
    volume: 0.05,
  })

  // Get filtered projects based on selected category
  const filteredProjects = useMemo(() => {
    return selectedCategory === "all" 
      ? projects 
      : categories.find((cat) => cat.name === selectedCategory)?.projects || []
  }, [selectedCategory, projects, categories])

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

      onCategoryChange(allCategories[newIndex])
      setFocusedIndex(0)
      setTimeout(() => scrollToCard(0), 100)
    },
    [selectedCategory, categories, onCategoryChange, scrollToCard],
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
        onHelpToggle()
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
        onAudioToggle()
        return
      }

      // Stats toggle
      if (e.key === "b") {
        e.preventDefault()
        onStatsToggle()
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
          onCategoryChange("all")
          setFocusedIndex(0)
          break
        case "2":
          e.preventDefault()
          if (categories[0]) {
            onCategoryChange(categories[0].name)
            setFocusedIndex(0)
          }
          break
        case "3":
          e.preventDefault()
          if (categories[1]) {
            onCategoryChange(categories[1].name)
            setFocusedIndex(0)
          }
          break

        // Actions
        case "enter":
        case " ":
          e.preventDefault()
          if (focusedIndex >= 0 && filteredProjects[focusedIndex]) {
            onProjectSelect(filteredProjects[focusedIndex])
          }
          break
        case "g":
          e.preventDefault()
          if (focusedIndex >= 0 && filteredProjects[focusedIndex]) {
            onProjectGitHub(filteredProjects[focusedIndex])
          }
          break
        case "escape":
          e.preventDefault()
          setKeyboardMode(false)
          setFocusedIndex(-1)
          onHelpToggle()
          onStatsToggle()
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
      onHelpToggle,
      onStatsToggle,
      onAudioToggle,
      categories,
      onCategoryChange,
      scrollToCard,
      onProjectSelect,
      onProjectGitHub,
    ],
  )

  const handleMouseMove = useCallback(() => {
    if (keyboardMode) {
      setKeyboardMode(false)
      setFocusedIndex(-1)
      onHelpToggle()
    }
  }, [keyboardMode, onHelpToggle])

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

  return {
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
  }
}
