/**
 * usePreviewTheme Hook
 * 
 * Manages theme injection for gallery preview containers,
 * providing a clean React interface for theme switching.
 */

import { useEffect, useRef, useCallback } from 'react'
import type { Theme } from '@/types/theme'
import { injectPreviewTheme, clearPreviewTheme, updatePreviewTheme } from '@/lib/theme/application/preview-injector'

interface UsePreviewThemeOptions {
  /** Initial theme to apply */
  initialTheme?: Theme | null
  /** Whether to auto-clear theme on unmount */
  autoClear?: boolean
}

interface UsePreviewThemeReturn {
  /** Reference to attach to preview container */
  containerRef: React.RefObject<HTMLDivElement>
  /** Apply a theme to the preview container */
  applyTheme: (theme: Theme) => void
  /** Clear the current theme */
  clearTheme: () => void
  /** Update to a new theme */
  updateTheme: (theme: Theme) => void
  /** Check if a theme is currently applied */
  hasTheme: () => boolean
}

export function usePreviewTheme(options: UsePreviewThemeOptions = {}): UsePreviewThemeReturn {
  const { initialTheme, autoClear = true } = options
  const containerRef = useRef<HTMLDivElement>(null)

  // Apply theme to container
  const applyTheme = useCallback((theme: Theme) => {
    if (containerRef.current) {
      injectPreviewTheme(theme, containerRef.current)
    }
  }, [])

  // Clear theme from container
  const clearTheme = useCallback(() => {
    if (containerRef.current) {
      clearPreviewTheme(containerRef.current)
    }
  }, [])

  // Update theme in container
  const updateTheme = useCallback((theme: Theme) => {
    if (containerRef.current) {
      updatePreviewTheme(theme, containerRef.current)
    }
  }, [])

  // Check if theme is applied
  const hasTheme = useCallback(() => {
    return containerRef.current?.hasAttribute('data-theme') ?? false
  }, [])

  // Apply initial theme on mount
  useEffect(() => {
    if (initialTheme && containerRef.current) {
      applyTheme(initialTheme)
    }
  }, [initialTheme, applyTheme])

  // Auto-clear theme on unmount
  useEffect(() => {
    return () => {
      if (autoClear && containerRef.current) {
        clearPreviewTheme(containerRef.current)
      }
    }
  }, [autoClear])

  return {
    containerRef,
    applyTheme,
    clearTheme,
    updateTheme,
    hasTheme
  }
}
