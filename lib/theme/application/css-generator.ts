/**
 * Utilities for converting theme objects to shadcn-compatible CSS variables
 */

import type { Theme } from '@/types/theme'

/**
 * Helper to safely get a string color value from a theme color property
 */
function getColorString(color: any): string | undefined {
  if (typeof color === 'string') return color
  if (typeof color === 'object' && color && typeof color.DEFAULT === 'string') return color.DEFAULT
  return undefined
}

/**
 * Maps theme colors to shadcn CSS variable format
 * Converts oklch colors to CSS custom properties
 */
export function themeToCSSVariables(theme: Theme): Record<string, string> {
  const variables: Record<string, string> = {}
  
  if (!theme.colors) return variables
  
  // Map core color variables following shadcn conventions
  // Background and foreground
  if (theme.colors.background && typeof theme.colors.background === 'string') {
    variables['--background'] = theme.colors.background
  }
  if (theme.colors.backgroundDark && typeof theme.colors.backgroundDark === 'string') {
    // For dark mode support
    variables['--background-dark'] = theme.colors.backgroundDark
  }
  if (theme.colors.foreground && typeof theme.colors.foreground === 'string') {
    variables['--foreground'] = theme.colors.foreground
  }
  if (theme.colors.foregroundDark && typeof theme.colors.foregroundDark === 'string') {
    variables['--foreground-dark'] = theme.colors.foregroundDark
  }
  
  // Card colors
  if (theme.colors.card && typeof theme.colors.card === 'string') {
    variables['--card'] = theme.colors.card
    variables['--card-foreground'] = (typeof theme.colors.foreground === 'string' ? theme.colors.foreground : theme.colors.card)
  }
  
  // Popover (use card or surface as fallback)
  const popoverColor = getColorString(theme.colors.popover) || getColorString(theme.colors.surface) || getColorString(theme.colors.card) || variables['--background']
  if (popoverColor) variables['--popover'] = popoverColor
  const popoverForeground = getColorString(theme.colors.popoverForeground) || variables['--foreground']
  if (popoverForeground) variables['--popover-foreground'] = popoverForeground
  
  // Primary colors
  const primaryColor = getColorString(theme.colors.primary)
  if (primaryColor) {
    variables['--primary'] = primaryColor
    variables['--primary-foreground'] = getColorString(theme.colors.primaryForeground) || getColorString(theme.colors.primaryDark) || '#ffffff'
  }
  
  // Secondary colors (use accent as fallback)
  let secondaryFallback = getColorString(theme.colors.muted) || variables['--muted']
  if (theme.colors.accent) {
    if (typeof theme.colors.accent === 'object' && !('DEFAULT' in theme.colors.accent)) {
      const firstAccent = Object.values(theme.colors.accent)[0]
      if (typeof firstAccent === 'string') secondaryFallback = firstAccent
    } else {
      const accentStr = getColorString(theme.colors.accent)
      if (accentStr) secondaryFallback = accentStr
    }
  }
  const secondaryColor = getColorString(theme.colors.secondary) || secondaryFallback
  if (secondaryColor) variables['--secondary'] = secondaryColor
  const secondaryForeground = getColorString(theme.colors.secondaryForeground) || variables['--foreground']
  if (secondaryForeground) variables['--secondary-foreground'] = secondaryForeground
  
  // Muted colors
  const mutedColor = getColorString(theme.colors.muted)
  if (mutedColor) {
    variables['--muted'] = mutedColor
    variables['--muted-foreground'] = getColorString(theme.colors.mutedForeground) || getColorString(theme.colors.mutedDark) || variables['--foreground']
  }
  
  // Accent colors
  if (theme.colors.accent) {
    // Handle accent as an object or single value
    if (typeof theme.colors.accent === 'object' && !('DEFAULT' in theme.colors.accent)) {
      // Pick the first accent color as the main accent
      const firstAccent = Object.values(theme.colors.accent)[0]
      if (typeof firstAccent === 'string') {
        variables['--accent'] = firstAccent
        variables['--accent-foreground'] = getColorString(theme.colors.accentForeground) || variables['--foreground']
      }
    } else {
      const accentStr = getColorString(theme.colors.accent)
      if (accentStr) {
        variables['--accent'] = accentStr
        variables['--accent-foreground'] = getColorString(theme.colors.accentForeground) || getColorString(theme.colors.accentDark) || variables['--foreground']
      }
    }
  }
  
  // Destructive (use error/warning as fallback)
  const destructiveColor = getColorString(theme.colors.destructive) || getColorString(theme.colors.error) || getColorString(theme.colors.warning) || 'oklch(0.577 0.245 27.325)'
  variables['--destructive'] = destructiveColor
  variables['--destructive-foreground'] = getColorString(theme.colors.destructiveForeground) || '#ffffff'
  
  // UI elements
  const borderColor = getColorString(theme.colors.border) || getColorString(theme.colors.borderDark) || variables['--muted']
  if (borderColor) variables['--border'] = borderColor
  const inputColor = getColorString(theme.colors.input) || variables['--border']
  if (inputColor) variables['--input'] = inputColor
  
  // Ring color with proper accent fallback
  let ringFallback = variables['--primary']
  const accentStr = getColorString(theme.colors.accent)
  if (accentStr) {
    ringFallback = accentStr
  }
  const ringColor = getColorString(theme.colors.ring) || ringFallback
  if (ringColor) variables['--ring'] = ringColor
  
  // Chart colors (if available in accent colors)
  if (typeof theme.colors.accent === 'object' && !('DEFAULT' in theme.colors.accent)) {
    const accentColors = Object.values(theme.colors.accent).filter(c => typeof c === 'string')
    accentColors.slice(0, 5).forEach((color, index) => {
      if (typeof color === 'string') {
        variables[`--chart-${index + 1}`] = color
      }
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
  const bgDark = getColorString(theme.colors.backgroundDark)
  if (bgDark) {
    variables['--background'] = bgDark
  }
  const fgDark = getColorString(theme.colors.foregroundDark)
  if (fgDark) {
    variables['--foreground'] = fgDark
  }
  const cardDark = getColorString(theme.colors.cardDark)
  if (cardDark) {
    variables['--card'] = cardDark
    variables['--card-foreground'] = getColorString(theme.colors.foregroundDark) || variables['--foreground'] || ''
  }
  const surfaceDark = getColorString(theme.colors.surfaceDark)
  if (surfaceDark) {
    variables['--popover'] = surfaceDark
    variables['--popover-foreground'] = getColorString(theme.colors.foregroundDark) || variables['--foreground'] || ''
  }
  const primaryDark = getColorString(theme.colors.primaryDark)
  if (primaryDark) {
    variables['--primary'] = primaryDark
    variables['--primary-foreground'] = getColorString(theme.colors.primary) || '#000000'
  }
  const accentDark = getColorString(theme.colors.accentDark)
  if (accentDark) {
    variables['--accent'] = accentDark
    variables['--accent-foreground'] = getColorString(theme.colors.accent) || variables['--foreground'] || ''
  }
  const mutedDark = getColorString(theme.colors.mutedDark)
  if (mutedDark) {
    variables['--muted'] = mutedDark
    variables['--muted-foreground'] = getColorString(theme.colors.muted) || variables['--foreground'] || ''
  }
  const borderDark = getColorString(theme.colors.borderDark)
  if (borderDark) {
    variables['--border'] = borderDark
    variables['--input'] = borderDark
  }
  
  const cssLines = Object.entries(variables).map(([key, value]) => `  ${key}: ${value};`)
  return `.dark {\n${cssLines.join('\n')}\n}`
}

/**
 * Extract color value for display in styleguide
 */
export function extractColorValue(value: any): string {
  // Ensure value is a string
  const stringValue = String(value || '')
  
  // If it's an oklch value, return as-is
  if (stringValue.startsWith('oklch(')) {
    return stringValue
  }
  // If it's a hex value, return as-is
  if (stringValue.startsWith('#')) {
    return stringValue
  }
  // If it's an hsl value, return as-is
  if (stringValue.startsWith('hsl(')) {
    return stringValue
  }
  // If it's a CSS variable reference, indicate that
  if (stringValue.startsWith('var(--')) {
    return stringValue
  }
  // Otherwise return the raw value
  return stringValue
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