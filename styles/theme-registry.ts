// Theme Registry - Easy theme loading and management
import type { Theme } from './terminal-theme'

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

// Theme loader for dynamic imports
export async function loadTheme(path: string): Promise<Theme | null> {
  try {
    const module = await import(path)
    return module.default || module.theme || null
  } catch (error) {
    console.error(`Failed to load theme from ${path}:`, error)
    return null
  }
}

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
  // Base theme structure with defaults
  const baseTheme = {
    colors: {
      gray: {
        0: '#ffffff', 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4',
        400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626',
        850: '#1a1a1a', 900: '#171717', 925: '#111111', 950: '#0a0a0a', 1000: '#000000',
      },
      accent: {
        primary: '#0ea5e9', primaryDim: '#0284c7', success: '#10b981', successDim: '#059669',
        warning: '#f59e0b', warningDim: '#d97706', error: '#ef4444', errorDim: '#dc2626',
        info: '#3b82f6', infoDim: '#2563eb',
      }
    },
    typography: {
      h1: 'text-2xl font-light text-gray-100 tracking-tight',
      h2: 'text-xl font-light text-gray-200 tracking-tight',
      h3: 'text-lg font-normal text-gray-300',
      h4: 'text-base font-normal text-gray-400',
      sectionTitle: 'font-mono text-xs uppercase tracking-[0.2em] text-gray-500',
      subsectionTitle: 'font-mono text-[10px] uppercase tracking-[0.15em] text-gray-600',
      uiTitle: 'font-sans text-sm font-medium text-gray-300 tracking-wide',
      uiSubtitle: 'font-sans text-xs font-normal text-gray-400',
      uiSectionHeader: 'font-sans text-xs font-medium text-gray-400 tracking-wide uppercase',
      uiLabel: 'font-sans text-[11px] font-medium text-gray-500',
      body: 'text-sm text-gray-300 font-light',
      bodyMono: 'font-mono text-sm text-gray-300',
      bodySmall: 'text-xs text-gray-400',
      bodySmallMono: 'font-mono text-xs text-gray-400',
      label: 'font-mono text-xs uppercase tracking-wider text-gray-500',
      labelRequired: 'font-mono text-xs uppercase tracking-wider text-gray-500 after:content-["*"] after:ml-0.5 after:text-red-500/70',
      code: 'font-mono text-sm text-gray-300 bg-gray-900/50 px-1.5 py-0.5 rounded',
      codeBlock: 'font-mono text-sm text-gray-300 bg-gray-950 border border-gray-800 rounded-sm p-4',
    },
    components: {
      input: {
        default: 'w-full bg-transparent border border-gray-800 text-gray-100 font-mono text-sm rounded-sm px-3 py-2 placeholder-gray-600 focus:border-gray-600 focus:outline-none transition-colors',
        active: 'w-full bg-transparent border border-gray-600 text-gray-100 font-mono text-sm rounded-sm px-3 py-2 placeholder-gray-600 focus:border-sky-500/50 focus:outline-none transition-colors',
        error: 'w-full bg-transparent border border-red-500/50 text-gray-100 font-mono text-sm rounded-sm px-3 py-2 placeholder-gray-600 focus:border-red-500 focus:outline-none transition-colors',
        minimal: 'w-full bg-transparent border-b border-gray-800 text-gray-100 font-mono text-sm px-1 py-2 placeholder-gray-600 focus:border-gray-500 focus:outline-none transition-colors',
      },
      textarea: {
        default: 'w-full bg-transparent border border-gray-800 text-gray-100 font-mono text-sm rounded-sm px-3 py-2 placeholder-gray-600 resize-none focus:border-gray-600 focus:outline-none transition-colors',
        code: 'w-full bg-gray-950 border border-gray-800 text-gray-100 font-mono text-sm rounded-sm px-3 py-2 placeholder-gray-600 resize-none focus:border-gray-600 focus:outline-none transition-colors',
      },
      button: {
        primary: 'inline-flex items-center justify-center px-6 py-2.5 bg-sky-500 text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-sky-400 active:bg-sky-600 transition-colors',
        secondary: 'inline-flex items-center justify-center px-6 py-2.5 bg-gray-800 border border-gray-700 text-gray-200 font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-gray-700 active:bg-gray-900 transition-colors',
        ghost: 'inline-flex items-center justify-center px-6 py-2.5 text-gray-400 font-mono text-xs uppercase tracking-wider rounded-sm hover:text-gray-200 hover:bg-gray-800/30 active:bg-gray-900/60 transition-colors',
        danger: 'inline-flex items-center justify-center px-6 py-2.5 bg-red-600 text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-red-500 active:bg-red-700 transition-colors',
        success: 'inline-flex items-center justify-center px-6 py-2.5 bg-green-600 text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-green-500 active:bg-green-700 transition-colors',
        icon: 'inline-flex items-center justify-center p-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-sm hover:bg-gray-700 active:bg-gray-900 transition-colors',
        warning: 'inline-flex items-center justify-center px-6 py-2.5 bg-yellow-600 text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-yellow-500 active:bg-yellow-700 transition-colors',
      },
      card: {
        default: 'bg-gray-950/50 border border-gray-800 rounded-sm',
        elevated: 'bg-gray-925 border border-gray-800 rounded-sm shadow-xl shadow-black/50',
        glass: 'bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-sm',
        active: 'bg-gray-900 border border-gray-700 rounded-sm',
      },
      badge: {
        default: 'inline-flex items-center px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded-sm',
        neutral: 'bg-gray-800 text-gray-400 border border-gray-700',
        primary: 'bg-sky-500/10 text-sky-500 border border-sky-500/30',
        success: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30',
        warning: 'bg-amber-500/10 text-amber-500 border border-amber-500/30',
        error: 'bg-red-500/10 text-red-500 border border-red-500/30',
      },
      table: {
        header: 'font-mono text-[10px] uppercase tracking-wider text-gray-500 bg-gray-900 border-b border-gray-800',
        row: 'border-b border-gray-900 hover:bg-gray-925/50 transition-colors',
        cell: 'font-mono text-xs text-gray-300 px-3 py-2',
      },
      status: {
        online: 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse',
        offline: 'w-2 h-2 rounded-full bg-gray-600',
        error: 'w-2 h-2 rounded-full bg-red-500 animate-pulse',
        warning: 'w-2 h-2 rounded-full bg-amber-500',
      }
    },
    layout: {
      container: 'bg-gray-950 text-gray-100',
      panel: 'bg-gray-925 border border-gray-800 rounded-sm',
      sidebar: 'bg-gray-950 border-r border-gray-800',
      section: 'border-b border-gray-900 pb-6 mb-6',
      divider: 'border-t border-gray-800',
    },
    effects: {
      glowPrimary: '',
      glowSuccess: '',
      glowError: '',
      glowWarning: '',
      scanline: '',
      grid: '',
    }
  }
  
  return {
    name: partial.name,
    description: partial.description,
    colors: {
      gray: { ...baseTheme.colors.gray, ...partial.colors?.gray },
      accent: { ...baseTheme.colors.accent, ...partial.colors?.accent },
    },
    typography: { ...baseTheme.typography, ...partial.typography },
    components: {
      input: { ...baseTheme.components.input, ...partial.components?.input },
      textarea: { ...baseTheme.components.textarea, ...partial.components?.textarea },
      button: { ...baseTheme.components.button, ...partial.components?.button },
      card: { ...baseTheme.components.card, ...partial.components?.card },
      badge: { ...baseTheme.components.badge, ...partial.components?.badge },
      table: { ...baseTheme.components.table, ...partial.components?.table },
      status: { ...baseTheme.components.status, ...partial.components?.status },
    },
    layout: { ...baseTheme.layout, ...partial.layout },
    effects: { ...baseTheme.effects, ...partial.effects },
  }
}