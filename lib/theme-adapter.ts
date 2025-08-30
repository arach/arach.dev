/**
 * Theme adapter utilities
 * Converts between different theme formats and ensures compatibility
 */

import type { Theme, ThemeFonts, ThemeColors, ThemeComponents, ThemeTypography } from '@/types/theme'

// Adapter for terminal theme format to generic format
export function adaptTerminalTheme(terminalTheme: any): Theme {
  return {
    name: terminalTheme.name || 'Unknown Theme',
    description: terminalTheme.description || 'Theme description not available',
    colors: adaptColors(terminalTheme.colors),
    fonts: adaptFonts(terminalTheme.fonts),
    typography: adaptTypography(terminalTheme.typography),
    components: adaptComponents(terminalTheme.components),
    layout: terminalTheme.layout,
    effects: terminalTheme.effects,
    animations: terminalTheme.animations,
    utilities: terminalTheme.utilities,
  }
}

// Adapter for colors
function adaptColors(colors: any): ThemeColors {
  if (!colors) return {}
  
  return {
    gray: colors.gray,
    accent: colors.accent,
    ...colors
  }
}

// Adapter for fonts
function adaptFonts(fonts: any): ThemeFonts {
  if (!fonts) return {}
  
  const adapted: ThemeFonts = {}
  
  Object.entries(fonts).forEach(([key, font]: [string, any]) => {
    if (typeof font === 'object' && font.name && font.family) {
      adapted[key] = {
        name: font.name,
        family: font.family,
        provider: font.provider,
        import: font.import
      }
    }
  })
  
  return adapted
}

// Adapter for typography
function adaptTypography(typography: any): ThemeTypography {
  if (!typography) return {}
  
  return typography
}

// Adapter for components
function adaptComponents(components: any): ThemeComponents {
  if (!components) return {}
  
  return {
    input: components.input,
    button: components.button,
    card: components.card,
    badge: components.badge,
    status: components.status,
    table: components.table,
    ...components
  }
}

// Theme validation
export function validateTheme(theme: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!theme) {
    errors.push('Theme is null or undefined')
    return { isValid: false, errors }
  }
  
  if (!theme.name) {
    errors.push('Theme name is required')
  }
  
  if (!theme.description) {
    errors.push('Theme description is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Theme compatibility check
export function isCompatibleTheme(theme: any): theme is Theme {
  const validation = validateTheme(theme)
  return validation.isValid
}

// Theme merger - combines multiple themes
export function mergeThemes(baseTheme: Theme, ...overrides: Partial<Theme>[]): Theme {
  let merged = { ...baseTheme }
  
  for (const override of overrides) {
    merged = {
      ...merged,
      ...override,
      colors: { ...merged.colors, ...override.colors },
      fonts: { ...merged.fonts, ...override.fonts },
      typography: { ...merged.typography, ...override.typography },
      components: { ...merged.components, ...override.components },
      layout: { ...merged.layout, ...override.layout },
      effects: { ...merged.effects, ...override.effects },
      animations: { ...merged.animations, ...override.animations },
      utilities: { ...merged.utilities, ...override.utilities },
    }
  }
  
  return merged
}

// Theme diff - finds differences between themes
export function diffThemes(theme1: Theme, theme2: Theme): Partial<Theme> {
  const diff: Partial<Theme> = {}
  
  // Compare basic properties
  if (theme1.name !== theme2.name) diff.name = theme2.name
  if (theme1.description !== theme2.description) diff.description = theme2.description
  
  // Compare colors
  if (JSON.stringify(theme1.colors) !== JSON.stringify(theme2.colors)) {
    diff.colors = theme2.colors
  }
  
  // Compare fonts
  if (JSON.stringify(theme1.fonts) !== JSON.stringify(theme2.fonts)) {
    diff.fonts = theme2.fonts
  }
  
  // Compare typography
  if (JSON.stringify(theme1.typography) !== JSON.stringify(theme2.typography)) {
    diff.typography = theme2.typography
  }
  
  // Compare components
  if (JSON.stringify(theme1.components) !== JSON.stringify(theme2.components)) {
    diff.components = theme2.components
  }
  
  return diff
}

// Theme serializer - converts theme to JSON
export function serializeTheme(theme: Theme): string {
  return JSON.stringify(theme, null, 2)
}

// Theme deserializer - converts JSON to theme
export function deserializeTheme(json: string): Theme {
  const parsed = JSON.parse(json)
  if (!isCompatibleTheme(parsed)) {
    throw new Error('Invalid theme format')
  }
  return parsed
}

// Theme factory - creates a new theme with defaults
export function createTheme(overrides: Partial<Theme> = {}): Theme {
  const defaultTheme: Theme = {
    name: 'Default Theme',
    description: 'A default theme',
    colors: {},
    fonts: {},
    typography: {},
    components: {},
    layout: {},
    effects: {},
    animations: {},
    utilities: {},
  }
  
  return mergeThemes(defaultTheme, overrides)
}
