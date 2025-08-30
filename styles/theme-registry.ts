// Theme Registry - Easy theme loading and management
import type { Theme } from './terminal-theme'
import { terminalTheme } from './terminal-theme'

// Registry to store all themes
const themeRegistry = new Map<string, Theme>()

// Register a theme
export function registerTheme(id: string, theme: Theme) {
  themeRegistry.set(id, theme)
  return theme
}

// Get a theme by ID
export function getTheme(id: string): Theme | undefined {
  return themeRegistry.get(id)
}


// Get theme IDs
export function getThemeIds(): string[] {
  return Array.from(themeRegistry.keys())
}

// Check if theme exists
export function hasTheme(id: string): boolean {
  return themeRegistry.has(id)
}

// Batch register themes
export function registerThemes(themes: Record<string, Theme>) {
  Object.entries(themes).forEach(([id, theme]) => {
    registerTheme(id, theme)
  })
}

// Theme loader for dynamic imports (disabled to avoid webpack warnings)
// Use registerTheme() to manually register themes instead
/*
export async function loadTheme(path: string): Promise<Theme | null> {
  try {
    const module = await import(path)
    return module.default || module.theme || null
  } catch (error) {
    console.error(`Failed to load theme from ${path}:`, error)
    return null
  }
}
*/

// Get all registered themes
export function getAllThemes(): Record<string, Theme> {
  const themes: Record<string, Theme> = {}
  themeRegistry.forEach((theme, id) => {
    themes[id] = theme
  })
  return themes
}

// Export a hook for React components
export function useTheme(themeId: string): Theme | undefined {
  return getTheme(themeId)
}

// Theme creator helper - ensures all required fields
export function createTheme(partial: Partial<Theme> & { name: string; description: string }): Theme {
  // Merge the partial theme with the base terminal theme
  return {
    ...terminalTheme,
    ...partial,
    name: partial.name,
    description: partial.description,
  } as Theme
}