/**
 * Terminal Theme v4 - Tailwind CSS v4 Aligned
 * 
 * This file provides TypeScript types and utilities for the terminal-v4.css theme.
 * The actual theme is defined in CSS using Tailwind v4's @theme directive.
 */

import './terminal-v4.css';

/**
 * Theme configuration that matches the CSS @theme variables
 */
export const terminalV4Theme = {
  name: 'Terminal v4',
  description: 'Terminal interface with Tailwind v4 alignment',
  id: 'terminal',
  
  // CSS file reference
  cssFile: './terminal-v4.css',
  
  // Color system matching CSS variables
  colors: {
    // Grayscale palette
    gray: {
      0: 'var(--color-gray-0)',
      25: 'var(--color-gray-25)',
      50: 'var(--color-gray-50)',
      75: 'var(--color-gray-75)',
      100: 'var(--color-gray-100)',
      150: 'var(--color-gray-150)',
      200: 'var(--color-gray-200)',
      250: 'var(--color-gray-250)',
      300: 'var(--color-gray-300)',
      350: 'var(--color-gray-350)',
      400: 'var(--color-gray-400)',
      450: 'var(--color-gray-450)',
      500: 'var(--color-gray-500)',
      550: 'var(--color-gray-550)',
      600: 'var(--color-gray-600)',
      650: 'var(--color-gray-650)',
      700: 'var(--color-gray-700)',
      750: 'var(--color-gray-750)',
      800: 'var(--color-gray-800)',
      825: 'var(--color-gray-825)',
      850: 'var(--color-gray-850)',
      875: 'var(--color-gray-875)',
      900: 'var(--color-gray-900)',
      925: 'var(--color-gray-925)',
      950: 'var(--color-gray-950)',
      975: 'var(--color-gray-975)',
      1000: 'var(--color-gray-1000)',
    },
    
    // Semantic colors
    primary: 'var(--color-primary)',
    primaryDim: 'var(--color-primary-dim)',
    primaryDark: 'var(--color-primary-dark)',
    primaryGlow: 'var(--color-primary-glow)',
    
    success: 'var(--color-success)',
    successDim: 'var(--color-success-dim)',
    successDark: 'var(--color-success-dark)',
    successGlow: 'var(--color-success-glow)',
    
    warning: 'var(--color-warning)',
    warningDim: 'var(--color-warning-dim)',
    warningDark: 'var(--color-warning-dark)',
    warningGlow: 'var(--color-warning-glow)',
    
    error: 'var(--color-error)',
    errorDim: 'var(--color-error-dim)',
    errorDark: 'var(--color-error-dark)',
    errorGlow: 'var(--color-error-glow)',
    
    info: 'var(--color-info)',
    infoDim: 'var(--color-info-dim)',
    infoDark: 'var(--color-info-dark)',
    infoGlow: 'var(--color-info-glow)',
  },
  
  // Font system
  fonts: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
    ui: 'var(--font-ui)',
  },
  
  // Spacing system
  spacing: {
    micro: 'var(--spacing-micro)',
    tiny: 'var(--spacing-tiny)',
    small: 'var(--spacing-small)',
    base: 'var(--spacing-base)',
    large: 'var(--spacing-large)',
    xl: 'var(--spacing-xl)',
  },
  
  // Border radius
  radius: {
    sm: 'var(--radius-sm)',
    base: 'var(--radius-base)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
  
  // Shadows
  shadow: {
    sm: 'var(--shadow-sm)',
    base: 'var(--shadow-base)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },
  
  // Animation durations
  duration: {
    fast: 'var(--duration-fast)',
    base: 'var(--duration-base)',
    slow: 'var(--duration-slow)',
    slower: 'var(--duration-slower)',
  },
  
  // Component classes defined in CSS
  components: {
    // Buttons
    button: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      danger: 'btn-danger',
      success: 'btn-success',
      warning: 'btn-warning',
    },
    
    // Cards
    card: {
      default: 'card',
      elevated: 'card-elevated',
      glass: 'card-glass',
    },
    
    // Status indicators
    status: {
      dot: 'status-dot',
      online: 'status-online',
      offline: 'status-offline',
      error: 'status-error',
      warning: 'status-warning',
      pending: 'status-pending',
    },
    
    // Form elements
    input: {
      default: 'input',
      error: 'input input-error',
      success: 'input input-success',
    },
    
    // Tables
    table: {
      container: 'table',
      header: 'table-header',
      row: 'table-row',
      cell: 'table-cell',
    },
  },
  
  // Utility classes
  utilities: {
    // Text colors
    text: {
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-info',
    },
    
    // Backgrounds
    bg: {
      primary: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      info: 'bg-info',
    },
    
    // Borders
    border: {
      primary: 'border-primary',
      success: 'border-success',
      warning: 'border-warning',
      error: 'border-error',
      info: 'border-info',
    },
    
    // Effects
    effects: {
      glowPrimary: 'glow-primary',
      glowSuccess: 'glow-success',
      glowWarning: 'glow-warning',
      glowError: 'glow-error',
      glowInfo: 'glow-info',
      scanline: 'scanline',
      gridOverlay: 'grid-overlay',
      glass: 'glass',
      glassDark: 'glass-dark',
    },
  },
} as const;

/**
 * Helper function to apply theme
 */
export function applyTerminalV4Theme() {
  document.documentElement.setAttribute('data-theme', 'terminal');
}

/**
 * Helper function to get CSS variable value
 */
export function getCSSVariable(variable: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

/**
 * Helper function to set CSS variable value
 */
export function setCSSVariable(variable: string, value: string): void {
  document.documentElement.style.setProperty(variable, value);
}

/**
 * Utility function to combine classes (like clsx/cn)
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Type for theme values
 */
export type TerminalV4Theme = typeof terminalV4Theme;

/**
 * Export component builder functions that use the CSS classes
 */
export const terminalV4 = {
  // Button builder
  button: (variant: keyof typeof terminalV4Theme.components.button = 'primary') => {
    return terminalV4Theme.components.button[variant];
  },
  
  // Card builder
  card: (variant: keyof typeof terminalV4Theme.components.card = 'default') => {
    return terminalV4Theme.components.card[variant];
  },
  
  // Status builder
  status: (state: 'online' | 'offline' | 'error' | 'warning' | 'pending') => {
    return cx(terminalV4Theme.components.status.dot, terminalV4Theme.components.status[state]);
  },
  
  // Input builder
  input: (state?: 'error' | 'success') => {
    if (state) {
      return cx(terminalV4Theme.components.input.default, `input-${state}`);
    }
    return terminalV4Theme.components.input.default;
  },
  
  // Table builders
  table: {
    container: () => terminalV4Theme.components.table.container,
    header: () => terminalV4Theme.components.table.header,
    row: () => terminalV4Theme.components.table.row,
    cell: () => terminalV4Theme.components.table.cell,
  },
  
  // Effect builders
  effect: (type: keyof typeof terminalV4Theme.utilities.effects) => {
    return terminalV4Theme.utilities.effects[type];
  },
};

// Export theme application on import (can be opt-in)
if (typeof window !== 'undefined' && !window.location.pathname.includes('gallery')) {
  // Auto-apply theme if not in gallery
  // applyTerminalV4Theme();
}