// Initialize built-in themes
// Note: With Tailwind v4, themes are now CSS-first and configured in CSS files
// The theme registry system is maintained for backward compatibility but themes
// are now defined in CSS using @theme directive in terminal.css

import { registerTheme } from './registry'
import { validateAndNormalize } from './factory'

// Create comprehensive theme objects for backward compatibility with gallery application
const terminalThemeCompat = {
  name: 'Terminal',
  description: 'Terminal interface with precision and sophisticated data visualization (CSS-first)',
  colors: { 
    gray: { 950: '#09090b', 900: '#121214', 800: '#27272a' },
    accent: { primary: '#00b4d8', success: '#00f5a0', warning: '#ffd60a', error: '#ff4444' }
  },
  fonts: { 
    mono: { name: 'JetBrains Mono', family: 'monospace' },
    sans: { name: 'Geist Sans', family: 'sans-serif' }
  },
  typography: {
    h1: 'text-xl font-bold text-white tracking-tight uppercase',
    h2: 'text-lg font-semibold text-white tracking-tight',
    body: 'text-sm text-white leading-relaxed tracking-normal',
    code: 'font-mono text-xs text-cyan-400 bg-gray-900/80 px-1.5 py-0.5 rounded border border-gray-800'
  },
  components: {
    button: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      destructive: 'btn-destructive',
      outline: 'btn-outline',
      ghost: 'btn-ghost',
      success: 'btn-success',
      warning: 'btn-warning'
    },
    input: {
      default: 'input input-default',
      mono: 'input input-mono',
      dark: 'input input-dark',
      transparent: 'input-transparent'
    },
    textarea: {
      default: 'textarea textarea-default',
      mono: 'textarea textarea-mono',
      dark: 'textarea textarea-dark'
    },
    card: {
      default: 'card',
      elevated: 'card card-elevated',
      dark: 'card-dark',
      glass: 'glass-panel'
    },
    badge: {
      default: 'badge badge-default',
      success: 'badge badge-success',
      warning: 'badge badge-warning',
      error: 'badge badge-error',
      info: 'badge badge-info',
      primary: 'badge badge-primary'
    },
    table: {
      container: 'table',
      header: 'table th',
      row: 'table tr',
      cell: 'table td'
    },
    status: {
      states: {
        online: { color: { hex: '#10b981' } },
        offline: { color: { hex: '#4b5563' } },
        error: { color: { hex: '#ef4444' } },
        warning: { color: { hex: '#f59e0b' } },
        pending: { color: { hex: '#06b6d4' } }
      },
      classes: {
        'dot-online': 'h-2 w-2 rounded-full bg-emerald-500',
        'dot-offline': 'h-2 w-2 rounded-full bg-gray-600',
        'dot-error': 'h-2 w-2 rounded-full bg-red-500',
        'dot-warning': 'h-2 w-2 rounded-full bg-amber-500',
        'dot-pending': 'h-2 w-2 rounded-full bg-cyan-500 animate-pulse'
      }
    }
  },
  effects: {
    glowPrimary: 'glow-primary',
    glowSuccess: 'glow-success',
    glowError: 'glow-error',
    glowWarning: 'glow-warning',
    scanline: 'relative after:absolute after:inset-0 after:bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)]',
    grid: 'bg-[linear-gradient(rgba(0,180,216,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,216,0.03)_1px,transparent_1px)] bg-[size:20px_20px]',
    glass: 'backdrop-blur-md bg-gray-900/30'
  },
  layout: {
    container: 'tactical-container',
    containerGrid: 'tactical-grid',
    panel: 'bg-gray-900 p-4 rounded-sm',
    section: 'space-y-6'
  },
  utilities: {
    selection: 'tactical-selection',
    scrollbar: 'tactical-scrollbar',
    focusRing: 'tactical-focus'
  }
}

const terminalHybridCompat = {
  ...terminalThemeCompat,
  name: 'Terminal Hybrid',
  description: 'Hybrid terminal theme with CSS variables'
}

const directoryCompat = {
  ...terminalThemeCompat,
  name: 'Directory',
  description: 'Directory-style theme'
}

// Register compatibility themes
registerTheme('terminal', validateAndNormalize(terminalThemeCompat))
registerTheme('terminal-hybrid', validateAndNormalize(terminalHybridCompat))
registerTheme('directory', validateAndNormalize(directoryCompat))