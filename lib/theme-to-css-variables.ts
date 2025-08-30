/**
 * Utilities for converting theme objects to shadcn-compatible CSS variables
 */

import type { Theme } from '@/types/theme'

/**
 * Maps theme colors to shadcn CSS variable format
 * Converts oklch colors to CSS custom properties
 */
export function themeToCSSVariables(theme: Theme): Record<string, string> {
  const variables: Record<string, string> = {}
  
  if (!theme.colors) return variables
  
  // Map core color variables following shadcn conventions
  // Background and foreground
  if (theme.colors.background) {
    variables['--background'] = theme.colors.background
  }
  if (theme.colors.backgroundDark) {
    // For dark mode support
    variables['--background-dark'] = theme.colors.backgroundDark
  }
  if (theme.colors.foreground) {
    variables['--foreground'] = theme.colors.foreground
  }
  if (theme.colors.foregroundDark) {
    variables['--foreground-dark'] = theme.colors.foregroundDark
  }
  
  // Card colors
  if (theme.colors.card) {
    variables['--card'] = theme.colors.card
    variables['--card-foreground'] = theme.colors.foreground || theme.colors.card
  }
  
  // Popover (use card or surface as fallback)
  variables['--popover'] = theme.colors.popover || theme.colors.surface || theme.colors.card || variables['--background']
  variables['--popover-foreground'] = theme.colors.popoverForeground || variables['--foreground']
  
  // Primary colors
  if (theme.colors.primary) {
    variables['--primary'] = theme.colors.primary
    variables['--primary-foreground'] = theme.colors.primaryForeground || theme.colors.primaryDark || '#ffffff'
  }
  
  // Secondary colors (use accent as fallback)
  variables['--secondary'] = theme.colors.secondary || theme.colors.accent || theme.colors.muted || variables['--muted']
  variables['--secondary-foreground'] = theme.colors.secondaryForeground || variables['--foreground']
  
  // Muted colors
  if (theme.colors.muted) {
    variables['--muted'] = theme.colors.muted
    variables['--muted-foreground'] = theme.colors.mutedForeground || theme.colors.mutedDark || variables['--foreground']
  }
  
  // Accent colors
  if (theme.colors.accent) {
    // Handle accent as an object or single value
    if (typeof theme.colors.accent === 'object') {
      // Pick the first accent color as the main accent
      const firstAccent = Object.values(theme.colors.accent)[0]
      if (firstAccent) {
        variables['--accent'] = firstAccent
        variables['--accent-foreground'] = theme.colors.accentForeground || variables['--foreground']
      }
    } else {
      variables['--accent'] = theme.colors.accent
      variables['--accent-foreground'] = theme.colors.accentForeground || theme.colors.accentDark || variables['--foreground']
    }
  }
  
  // Destructive (use error/warning as fallback)
  variables['--destructive'] = theme.colors.destructive || theme.colors.error || theme.colors.warning || 'oklch(0.577 0.245 27.325)'
  variables['--destructive-foreground'] = theme.colors.destructiveForeground || '#ffffff'
  
  // UI elements
  variables['--border'] = theme.colors.border || theme.colors.borderDark || variables['--muted']
  variables['--input'] = theme.colors.input || variables['--border']
  variables['--ring'] = theme.colors.ring || theme.colors.accent || variables['--primary']
  
  // Chart colors (if available in accent colors)
  if (typeof theme.colors.accent === 'object') {
    const accentColors = Object.values(theme.colors.accent)
    accentColors.slice(0, 5).forEach((color, index) => {
      variables[`--chart-${index + 1}`] = color
    })
  }
  
  // Border radius
  if (theme.borderRadius) {
    variables['--radius'] = theme.borderRadius.DEFAULT || theme.borderRadius.md || '0.5rem'
  }
  
  return variables
}

/**
 * Generates CSS string from theme for injection
 */
export function generateThemeCSS(theme: Theme, selector: string = ':root'): string {
  const variables = themeToCSSVariables(theme)
  const cssLines = Object.entries(variables).map(([key, value]) => `  ${key}: ${value};`)
  
  return `${selector} {\n${cssLines.join('\n')}\n}`
}

/**
 * Generates dark mode CSS from theme
 */
export function generateDarkModeCSS(theme: Theme): string {
  const variables: Record<string, string> = {}
  
  if (!theme.colors) return ''
  
  // Map dark mode colors
  if (theme.colors.backgroundDark) {
    variables['--background'] = theme.colors.backgroundDark
  }
  if (theme.colors.foregroundDark) {
    variables['--foreground'] = theme.colors.foregroundDark
  }
  if (theme.colors.cardDark) {
    variables['--card'] = theme.colors.cardDark
    variables['--card-foreground'] = theme.colors.foregroundDark || variables['--foreground']
  }
  if (theme.colors.surfaceDark) {
    variables['--popover'] = theme.colors.surfaceDark
    variables['--popover-foreground'] = theme.colors.foregroundDark || variables['--foreground']
  }
  if (theme.colors.primaryDark) {
    variables['--primary'] = theme.colors.primaryDark
    variables['--primary-foreground'] = theme.colors.primary || '#000000'
  }
  if (theme.colors.accentDark) {
    variables['--accent'] = theme.colors.accentDark
    variables['--accent-foreground'] = theme.colors.accent || variables['--foreground']
  }
  if (theme.colors.mutedDark) {
    variables['--muted'] = theme.colors.mutedDark
    variables['--muted-foreground'] = theme.colors.muted || variables['--foreground']
  }
  if (theme.colors.borderDark) {
    variables['--border'] = theme.colors.borderDark
    variables['--input'] = theme.colors.borderDark
  }
  
  const cssLines = Object.entries(variables).map(([key, value]) => `  ${key}: ${value};`)
  return `.dark {\n${cssLines.join('\n')}\n}`
}

/**
 * Extract color value for display in styleguide
 */
export function extractColorValue(value: string): string {
  // If it's an oklch value, return as-is
  if (value.startsWith('oklch(')) {
    return value
  }
  // If it's a hex value, return as-is
  if (value.startsWith('#')) {
    return value
  }
  // If it's an hsl value, return as-is
  if (value.startsWith('hsl(')) {
    return value
  }
  // If it's a CSS variable reference, indicate that
  if (value.startsWith('var(--')) {
    return value
  }
  // Otherwise return the raw value
  return value
}

/**
 * Maps shadcn variable names to display names
 */
export const variableDisplayNames: Record<string, string> = {
  '--background': 'Background',
  '--foreground': 'Foreground',
  '--card': 'Card',
  '--card-foreground': 'Card Foreground',
  '--popover': 'Popover',
  '--popover-foreground': 'Popover Foreground',
  '--primary': 'Primary',
  '--primary-foreground': 'Primary Foreground',
  '--secondary': 'Secondary',
  '--secondary-foreground': 'Secondary Foreground',
  '--muted': 'Muted',
  '--muted-foreground': 'Muted Foreground',
  '--accent': 'Accent',
  '--accent-foreground': 'Accent Foreground',
  '--destructive': 'Destructive',
  '--destructive-foreground': 'Destructive Foreground',
  '--border': 'Border',
  '--input': 'Input',
  '--ring': 'Ring',
  '--radius': 'Border Radius',
  '--chart-1': 'Chart 1',
  '--chart-2': 'Chart 2',
  '--chart-3': 'Chart 3',
  '--chart-4': 'Chart 4',
  '--chart-5': 'Chart 5',
}

/**
 * Groups variables by category for display
 */
export function groupVariablesByCategory(variables: Record<string, string>) {
  const categories = {
    core: ['--background', '--foreground'],
    surfaces: ['--card', '--card-foreground', '--popover', '--popover-foreground'],
    colors: ['--primary', '--primary-foreground', '--secondary', '--secondary-foreground', '--accent', '--accent-foreground'],
    states: ['--muted', '--muted-foreground', '--destructive', '--destructive-foreground'],
    ui: ['--border', '--input', '--ring'],
    charts: ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'],
    layout: ['--radius']
  }
  
  const grouped: Record<string, Record<string, string>> = {}
  
  for (const [category, keys] of Object.entries(categories)) {
    grouped[category] = {}
    for (const key of keys) {
      if (variables[key]) {
        grouped[category][key] = variables[key]
      }
    }
  }
  
  return grouped
}