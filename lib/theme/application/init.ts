// Initialize built-in themes
// Note: With Tailwind v4, themes are now CSS-first and configured in CSS files
// The theme registry system is maintained for backward compatibility but themes
// are now defined in CSS using @theme directive in terminal.css

import { registerTheme } from './registry'
import { validateAndNormalize } from './factory'

// Create comprehensive theme objects for backward compatibility with gallery application
const terminalThemeCompat = {
  id: 'terminal',
  name: 'Terminal',
  description: 'LatticeOS-inspired military-grade interface with tactical aesthetics and precision-focused UI',
  colors: { 
    // Core colors for CSS generator compatibility
    background: '#0a0a0a',        // Deep tactical black
    foreground: '#e8e8e8',        // High-contrast white
    card: '#1a1a1a',              // Dark panel background
    cardForeground: '#e8e8e8',
    popover: '#1f1f1f',           // Slightly lighter for popovers
    popoverForeground: '#e8e8e8',
    
    // Primary colors
    primary: '#0066cc',           // Military blue
    primaryForeground: '#ffffff',
    
    // Secondary colors
    secondary: '#1a1a1a',         // Dark panel background
    secondaryForeground: '#d0d0d0',
    
    // Muted colors
    muted: '#1f1f1f',             // Slightly lighter than secondary
    mutedForeground: '#888888',   // Reduced contrast for secondary text
    
    // Border and input
    border: '#333333',            // Tactical gray borders
    input: '#2a2a2a',             // Input background
    ring: '#0066cc',              // Focus ring color
    
    // Status colors
    destructive: '#cc0000',       // Tactical red
    destructiveForeground: '#ffffff',
    
    // Legacy structure for backward compatibility
    gray: { 950: '#0a0a0a', 900: '#1a1a1a', 800: '#1f1f1f', 700: '#2a2a2a', 600: '#333333' },
    accent: { 
      primary: '#0066cc',    // Military blue
      success: '#00cc66',    // Tactical green  
      warning: '#ffaa00',    // Tactical amber
      error: '#cc0000'       // Tactical red
    }
  },
  fonts: { 
    mono: { name: 'JetBrains Mono', family: 'monospace' },
    sans: { name: 'Inter', family: 'sans-serif' }  // LatticeOS uses clean sans-serif
  },
  typography: {
    h1: 'text-xl font-bold text-foreground tracking-tight',
    h2: 'text-lg font-semibold text-foreground tracking-tight', 
    body: 'text-sm text-foreground leading-relaxed tracking-normal',
    code: 'font-mono text-xs text-primary bg-muted px-1.5 py-0.5 rounded border border-border'
  },
  components: {
    button: {
      primary: 'btn-tactical btn-primary btn-md',
      secondary: 'btn-tactical btn-secondary btn-md',
      destructive: 'btn-tactical btn-destructive btn-md',
      outline: 'btn-tactical btn-outline btn-md',
      ghost: 'btn-tactical btn-ghost btn-md',
      success: 'btn-tactical btn-success btn-md',
      warning: 'btn-tactical btn-warning btn-md'
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
    glowPrimary: 'shadow-[0_0_8px_hsl(var(--color-primary)/0.3)]',
    glowSuccess: 'shadow-[0_0_8px_hsl(var(--color-success)/0.3)]',
    glowError: 'shadow-[0_0_8px_hsl(var(--color-destructive)/0.3)]',
    glowWarning: 'shadow-[0_0_8px_hsl(var(--color-warning)/0.3)]',
    scanline: 'scanlines',
    grid: 'tactical-grid',
    glass: 'backdrop-blur-md bg-card/30',
    tactical: 'tactical-panel',
    focus: 'tactical-focus'
  },
  layout: {
    container: 'tactical-panel',
    containerGrid: 'tactical-grid',
    panel: 'tactical-panel',
    section: 'space-y-6'
  },
  utilities: {
    selection: 'selection:bg-primary/20 selection:text-primary-foreground',
    scrollbar: 'scrollbar-thin scrollbar-track-muted scrollbar-thumb-border',
    focusRing: 'tactical-focus',
    table: 'tactical-table'
  }
}

const terminalHybridCompat = {
  ...terminalThemeCompat,
  id: 'terminal-hybrid',
  name: 'Terminal Hybrid',
  description: 'Hybrid terminal theme with CSS variables'
}

const directoryCompat = {
  ...terminalThemeCompat,
  id: 'directory',
  name: 'Directory',
  description: 'Directory-style theme'
}

// Register compatibility themes
registerTheme('terminal', validateAndNormalize(terminalThemeCompat))
registerTheme('terminal-hybrid', validateAndNormalize(terminalHybridCompat))
registerTheme('directory', validateAndNormalize(directoryCompat))