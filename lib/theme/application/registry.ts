/**
 * Theme registry - manages theme loading and access
 * Uses the new generic Theme interface
 */

import type { Theme, ThemeRegistry } from '@/types/theme'
import { validateAndNormalize, validateTheme } from './factory'

// Registry of all available themes - starts empty and gets populated by init-themes.ts
const themeRegistry: ThemeRegistry = {}

// Get a theme by ID
export function getTheme(themeId: string): Theme | null {
  const theme = themeRegistry[themeId]
  if (!theme) {
    console.warn(`Theme "${themeId}" not found`)
    return null
  }
  
  // Validate the theme
  const validation = validateTheme(theme)
  if (!validation.isValid) {
    console.error(`Theme "${themeId}" is invalid:`, validation.errors)
    return null
  }
  
  return theme
}

// Get all available theme IDs
export function getThemeIds(): string[] {
  return Object.keys(themeRegistry)
}

// Get all available themes
export function getAllThemes(): Theme[] {
  return Object.values(themeRegistry).filter(theme => {
    const validation = validateTheme(theme)
    return validation.isValid
  })
}

// Register a new theme
export function registerTheme(themeId: string, theme: Theme): boolean {
  const validation = validateTheme(theme)
  if (!validation.isValid) {
    console.error(`Cannot register invalid theme "${themeId}":`, validation.errors)
    return false
  }
  
  themeRegistry[themeId] = theme
  return true
}

// Unregister a theme
export function unregisterTheme(themeId: string): boolean {
  if (!themeRegistry[themeId]) {
    return false
  }
  
  delete themeRegistry[themeId]
  return true
}

// Check if a theme exists
export function hasTheme(themeId: string): boolean {
  return themeId in themeRegistry
}

// Get theme metadata (name, description) without loading full theme
export function getThemeMetadata(themeId: string): { name: string; description: string } | null {
  const theme = themeRegistry[themeId]
  if (!theme) return null
  
  return {
    name: theme.name,
    description: theme.description
  }
}

// Font utilities using the new interface
export function getFontsFromTheme(theme: Theme) {
  return theme.fonts || {}
}

export function getFontsByProvider(theme: Theme, provider: string) {
  const fonts = theme.fonts || {}
  return Object.entries(fonts).filter(([_, font]) => font?.provider === provider)
}

export function getAllFonts(): Array<{ themeId: string; fontKey: string; font: any }> {
  const allFonts: Array<{ themeId: string; fontKey: string; font: any }> = []
  
  Object.entries(themeRegistry).forEach(([themeId, theme]) => {
    const fonts = theme.fonts || {}
    Object.entries(fonts).forEach(([fontKey, font]) => {
      allFonts.push({ themeId, fontKey, font })
    })
  })
  
  return allFonts
}

export function getAllFontsByProvider(provider: string) {
  return getAllFonts().filter(({ font }) => font?.provider === provider)
}

export function generateFontImports(provider: string): string {
  const fonts = getAllFontsByProvider(provider)
  const imports = fonts.map(({ font }) => font?.import).filter(Boolean)
  
  return imports.map(importName => 
    `import { ${importName} } from 'next/font/google'`
  ).join('\n')
}

export function generateFontConfigs(provider: string): string {
  const fonts = getAllFontsByProvider(provider)
  
  return fonts.map(({ themeId, fontKey, font }) => 
    `const ${fontKey} = ${font.import}({
  subsets: ['latin'],
  display: 'swap',
})`
  ).join('\n\n')
}