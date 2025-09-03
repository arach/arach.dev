import type { Theme } from '@/types/theme'

// Simple theme switching - CSS handles all styling
export const availableThemes = {
  default: 'Default',
  terminal: 'Terminal',
  'terminal-hybrid': 'Terminal Hybrid', 
  directory: 'Directory'
} as const

export type ThemeId = keyof typeof availableThemes

// Create theme objects for component compatibility
const createThemeObject = (name: string): Theme => ({
  name,
  description: `${name} theme with CSS-first architecture`,
  colors: {
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    accent: {
      primary: '#0ea5e9',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  fonts: {
    sans: { name: 'Geist Sans', family: 'sans-serif' },
    mono: { name: 'JetBrains Mono', family: 'monospace' }
  },
  typography: {
    h1: 'text-2xl font-bold text-white tracking-tight uppercase',
    h2: 'text-xl font-semibold text-white tracking-tight',
    h3: 'text-lg font-medium text-white',
    body: 'text-sm text-white leading-relaxed',
    code: 'font-mono text-xs text-cyan-400 bg-gray-900/80 px-1.5 py-0.5 rounded border border-gray-800'
  },
  components: {
    button: {
      primary: 'btn btn-primary',
      secondary: 'btn btn-secondary',
      destructive: 'btn btn-destructive',
      outline: 'btn btn-outline',
      ghost: 'btn btn-ghost',
      success: 'btn btn-success',
      warning: 'btn btn-warning'
    },
    input: {
      default: 'input input-default',
      mono: 'input input-mono',
      dark: 'input input-dark'
    },
    card: {
      default: 'card',
      elevated: 'card card-elevated',
      dark: 'card-dark'
    },
    badge: {
      default: 'badge badge-default',
      success: 'badge badge-success',
      warning: 'badge badge-warning',
      error: 'badge badge-error',
      info: 'badge badge-info'
    },
    table: {
      container: 'table',
      header: 'table th',
      row: 'table tr',
      cell: 'table td'
    }
  }
})

export const themeObjects: Record<ThemeId, Theme> = {
  default: createThemeObject('Default'),
  terminal: createThemeObject('Terminal'),
  'terminal-hybrid': createThemeObject('Terminal Hybrid'),
  directory: createThemeObject('Directory')
}

export function getThemeIds(): string[] {
  return Object.keys(availableThemes)
}

export function getThemeName(id: string): string {
  return availableThemes[id as ThemeId] || id
}

export function loadTheme(themeId: string): boolean {
  // Validate theme exists
  if (!isValidTheme(themeId)) {
    console.warn(`Theme "${themeId}" not found. Available themes:`, getThemeIds())
    return false
  }

  // Set data attribute for CSS to respond to
  document.documentElement.setAttribute('data-theme', themeId)
  
  console.log(`Applied theme: ${themeId}`)
  return true
}

export function getCurrentTheme(): string | null {
  return document.documentElement.getAttribute('data-theme')
}

export function isValidTheme(themeId: string): boolean {
  return themeId in availableThemes
}

export function getThemeObject(themeId: string): Theme | null {
  return themeObjects[themeId as ThemeId] || null
}

// Simple className utility
export function cx(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}