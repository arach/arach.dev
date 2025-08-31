// Theme Template - Use this as a starting point for new themes
// Copy this file and modify the values to create your own theme

import type { Theme } from '@/types/theme'
import { createTheme } from '@/lib/theme-adapter'

// Example of creating a theme with only the changes you want
export const customTheme = createTheme({
  name: 'Custom Theme',
  description: 'Your theme description here',
  
  // Only override what you want to change
  // Everything else will inherit from the base theme
  
  // Uncomment and modify the sections you want to override:
  
  // colors: {
  //   accent: {
  //     primary: '#0ea5e9',
  //     primaryDim: '#0284c7',
  //     // ... other accent colors
  //   }
  // },
  
  // typography: {
  //   h1: 'text-2xl font-bold text-white tracking-tight uppercase',
  //   // ... other typography overrides
  // },
  
  // components: {
  //   button: {
  //     primary: 'inline-flex items-center justify-center rounded-sm bg-blue-600 px-4 py-2 text-xs font-bold uppercase text-white hover:bg-blue-500',
  //     // ... other button overrides
  //   }
  // }
})

// Full theme example with all properties
export const fullThemeTemplate = {
  name: 'Theme Name',
  description: 'Theme description',
  
  colors: {
    gray: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      850: '#1a1a1a',
      900: '#171717',
      925: '#111111',
      950: '#0a0a0a',
      1000: '#000000',
    },
    accent: {
      primary: '#0ea5e9',
      primaryDim: '#0284c7',
      success: '#10b981',
      successDim: '#059669',
      warning: '#f59e0b',
      warningDim: '#d97706',
      error: '#ef4444',
      errorDim: '#dc2626',
      info: '#3b82f6',
      infoDim: '#2563eb',
    }
  },
  
  typography: {
    h1: 'text-2xl font-light text-gray-100',
    h2: 'text-xl font-light text-gray-200',
    h3: 'text-lg font-normal text-gray-300',
    h4: 'text-base font-normal text-gray-400',
    sectionTitle: 'font-mono text-xs uppercase tracking-wider',
    subsectionTitle: 'font-mono text-[10px] uppercase tracking-wider',
    uiTitle: 'font-sans text-sm font-medium',
    uiSubtitle: 'font-sans text-xs font-normal',
    uiSectionHeader: 'font-sans text-xs font-medium uppercase',
    uiLabel: 'font-sans text-[11px] font-medium',
    body: 'text-sm text-gray-300',
    bodyMono: 'font-mono text-sm',
    bodySmall: 'text-xs text-gray-400',
    bodySmallMono: 'font-mono text-xs',
    label: 'font-mono text-xs uppercase',
    labelRequired: 'font-mono text-xs uppercase after:content-["*"]',
    code: 'font-mono text-sm bg-gray-900',
    codeBlock: 'font-mono text-sm bg-gray-950',
  },
  
  components: {
    input: {
      default: 'input-default-classes',
      active: 'input-active-classes',
      error: 'input-error-classes',
      minimal: 'input-minimal-classes',
    },
    textarea: {
      default: 'textarea-default-classes',
      code: 'textarea-code-classes',
    },
    button: {
      primary: 'button-primary-classes',
      secondary: 'button-secondary-classes',
      ghost: 'button-ghost-classes',
      danger: 'button-danger-classes',
      success: 'button-success-classes',
      icon: 'button-icon-classes',
      warning: 'button-warning-classes',
    },
    card: {
      default: 'card-default-classes',
      elevated: 'card-elevated-classes',
      glass: 'card-glass-classes',
      active: 'card-active-classes',
    },
    badge: {
      default: 'badge-default-classes',
      neutral: 'badge-neutral-classes',
      primary: 'badge-primary-classes',
      success: 'badge-success-classes',
      warning: 'badge-warning-classes',
      error: 'badge-error-classes',
    },
    table: {
      header: 'table-header-classes',
      row: 'table-row-classes',
      cell: 'table-cell-classes',
    },
    status: {
      online: 'status-online-classes',
      offline: 'status-offline-classes',
      error: 'status-error-classes',
      warning: 'status-warning-classes',
    }
  },
  
  layout: {
    container: 'container-classes',
    panel: 'panel-classes',
    sidebar: 'sidebar-classes',
    section: 'section-classes',
    divider: 'divider-classes',
  },
  
  effects: {
    glowPrimary: 'glow-primary-classes',
    glowSuccess: 'glow-success-classes',
    glowError: 'glow-error-classes',
    glowWarning: 'glow-warning-classes',
    scanline: 'scanline-classes',
    grid: 'grid-classes',
  }
}