/**
 * Hybrid Terminal Theme - CSS Variables + Tailwind
 * Demonstrates how to combine CSS custom properties with Tailwind classes
 * for true dynamic theming while maintaining Tailwind compatibility.
 */

export const terminalThemeHybrid = {
  name: 'Terminal Hybrid',
  description: 'Terminal interface with CSS variables for dynamic theming',
  
  // CSS Custom Properties - Core theme values
  cssVariables: {
    // Colors
    '--color-primary': '#00b4d8',
    '--color-primary-dim': '#0096c7',
    '--color-primary-dark': '#0077b6',
    '--color-success': '#00f5a0',
    '--color-success-dim': '#00d97e',
    '--color-warning': '#ffd60a',
    '--color-error': '#ff4444',
    '--color-info': '#0ea5e9',
    
    // Grays
    '--color-gray-50': '#f4f4f5',
    '--color-gray-100': '#e4e4e7',
    '--color-gray-200': '#d1d1d6',
    '--color-gray-300': '#a1a1aa',
    '--color-gray-400': '#71717a',
    '--color-gray-500': '#52525b',
    '--color-gray-600': '#3f3f46',
    '--color-gray-700': '#27272a',
    '--color-gray-800': '#1a1a1d',
    '--color-gray-900': '#121214',
    '--color-gray-950': '#09090b',
    
    // Fonts
    '--font-sans': '"Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    '--font-mono': '"JetBrains Mono", "Fira Code", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    '--font-display': '"IBM Plex Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    
    // Spacing
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '2rem',
    
    // Border radius
    '--radius-sm': '0.125rem',
    '--radius-md': '0.25rem',
    '--radius-lg': '0.5rem',
    
    // Shadows
    '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  
  // Font definitions - Typography system
  fonts: {
    // Primary interface font - Geist Sans for clean readability
    sans: {
      name: 'Geist Sans',
      family: 'var(--font-sans)',
      provider: 'google',
      import: 'Geist_Sans'
    },
    
    // Monospace font for code and technical content
    mono: {
      name: 'JetBrains Mono',
      family: 'var(--font-mono)',
      provider: 'google',
      import: 'JetBrains_Mono'
    },
    
    // Alternative sans-serif for UI elements (if needed)
    ui: {
      name: 'Geist Sans',
      family: 'var(--font-sans)',
      provider: 'google',
      import: 'Geist_Sans'
    },
    
    // Display font for headers and titles
    display: {
      name: 'IBM Plex Mono',
      family: 'var(--font-display)',
      provider: 'google',
      import: 'IBM_Plex_Mono'
    }
  },
  
  // Components using CSS variables + Tailwind
  components: {
    // Inputs - Using CSS variables for colors
    input: {
      default: 'w-full bg-[var(--color-gray-900)] border border-[var(--color-gray-700)] text-[var(--color-gray-100)] px-3 py-2 text-sm rounded-[var(--radius-sm)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/20 placeholder:text-[var(--color-gray-400)] transition-all duration-200',
      
      active: 'w-full bg-[var(--color-gray-900)] border border-[var(--color-primary)] text-[var(--color-gray-50)] px-3 py-2 text-sm rounded-[var(--radius-sm)] focus:border-[var(--color-primary-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 placeholder:text-[var(--color-gray-500)] transition-all duration-200 shadow-[0_0_0_1px_rgba(0,180,216,0.1)]',
      
      error: 'w-full bg-[var(--color-gray-900)] border border-[var(--color-error)] text-[var(--color-gray-100)] px-3 py-2 text-sm rounded-[var(--radius-sm)] focus:border-[var(--color-error)] focus:outline-none focus:ring-2 focus:ring-[var(--color-error)]/30 placeholder:text-[var(--color-gray-400)] transition-all duration-200 shadow-[0_0_0_1px_rgba(255,68,68,0.1)]',
      
      success: 'w-full bg-[var(--color-gray-900)] border border-[var(--color-success)] text-[var(--color-gray-100)] px-3 py-2 text-sm rounded-[var(--radius-sm)] focus:border-[var(--color-success)] focus:outline-none focus:ring-2 focus:ring-[var(--color-success)]/30 placeholder:text-[var(--color-gray-400)] transition-all duration-200 shadow-[0_0_0_1px_rgba(0,245,160,0.1)]',
    },
    
    // Buttons - Using CSS variables
    button: {
      primary: 'inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dim)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:from-[var(--color-primary-dim)] hover:to-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-gray-950)] active:from-[var(--color-primary-dark)] active:to-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-40 transition-all duration-200 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]',
      
      secondary: 'inline-flex items-center justify-center rounded-[var(--radius-sm)] border-2 border-[var(--color-gray-700)] bg-[var(--color-gray-800)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gray-200)] hover:bg-[var(--color-gray-800)] hover:border-[var(--color-gray-600)] hover:text-[var(--color-gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gray-600)] focus:ring-offset-2 focus:ring-offset-[var(--color-gray-950)] active:bg-[var(--color-gray-900)] disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      success: 'inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-success)]/50 bg-[var(--color-success)]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-success)] hover:bg-[var(--color-success)]/20 hover:border-[var(--color-success)] hover:text-[var(--color-success)] focus:outline-none focus:ring-2 focus:ring-[var(--color-success)] focus:ring-offset-2 focus:ring-offset-[var(--color-gray-950)] active:bg-[var(--color-success)]/30 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      error: 'inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-error)]/50 bg-[var(--color-error)]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-error)] hover:bg-[var(--color-error)]/20 hover:border-[var(--color-error)] hover:text-[var(--color-error)] focus:outline-none focus:ring-2 focus:ring-[var(--color-error)] focus:ring-offset-2 focus:ring-offset-[var(--color-gray-950)] active:bg-[var(--color-error)]/30 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
    },
    
    // Cards - Using CSS variables
    card: {
      default: 'bg-[var(--color-gray-900)] border border-[var(--color-gray-700)] rounded-[var(--radius-sm)] shadow-[var(--shadow-lg)] shadow-black/30',
      
      elevated: 'bg-gradient-to-b from-[var(--color-gray-800)] to-[var(--color-gray-900)] border border-[var(--color-gray-700)] rounded-[var(--radius-sm)] shadow-[var(--shadow-lg)] shadow-black/40',
      
      glass: 'bg-[var(--color-gray-900)]/60 border border-[var(--color-gray-700)]/50 rounded-[var(--radius-sm)] backdrop-blur-md shadow-[var(--shadow-lg)]',
      
      active: 'bg-gradient-to-b from-[var(--color-gray-800)] to-[var(--color-gray-900)] border border-[var(--color-primary)]/30 rounded-[var(--radius-sm)] shadow-[var(--shadow-lg)] shadow-[var(--color-primary)]/5',
    },
    
    // Badges - Using CSS variables
    badge: {
      default: 'inline-flex items-center px-2.5 py-1 rounded-[var(--radius-sm)] font-mono text-[10px] font-bold uppercase tracking-[0.15em] border shadow-[var(--shadow-sm)]',
      
      primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20 shadow-[var(--color-primary)]/10',
      success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20 shadow-[var(--color-success)]/10',
      warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20 shadow-[var(--color-warning)]/10',
      error: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20 shadow-[var(--color-error)]/10',
    },
  },
  
  // Status indicators - Using CSS variables for dynamic theming
  status: {
    // Simple structure for testing CSS variable approach
    online: 'h-2 w-2 rounded-full bg-[var(--color-success)]',
    offline: 'h-2 w-2 rounded-full bg-[var(--color-gray-600)]',
    error: 'h-2 w-2 rounded-full bg-[var(--color-error)]',
    warning: 'h-2 w-2 rounded-full bg-[var(--color-warning)]',
    pending: 'h-2 w-2 rounded-full bg-[var(--color-info)] animate-pulse',
  },

  // Typography - Using CSS variables
  typography: {
    h1: 'text-xl font-bold text-white tracking-tight uppercase',
    h2: 'text-lg font-semibold text-white tracking-tight',
    h3: 'text-base font-semibold text-[var(--color-gray-50)]',
    body: 'text-sm text-white leading-relaxed tracking-normal',
    bodyMono: 'font-mono text-xs text-[var(--color-gray-50)] leading-relaxed tracking-tight',
    code: 'font-mono text-xs text-[var(--color-primary)] bg-[var(--color-gray-900)]/80 px-1.5 py-0.5 rounded-[var(--radius-sm)] border border-[var(--color-gray-700)]',
  },
  
  // Layout - Using CSS variables
  layout: {
    container: 'bg-[var(--color-gray-950)] text-[var(--color-gray-100)] min-h-screen antialiased',
    panel: 'rounded-[var(--radius-sm)] bg-[var(--color-gray-900)] p-4',
    sidebar: 'bg-[var(--color-gray-900)] border-r border-[var(--color-gray-700)] min-h-screen',
  },
  
  // Utility function to apply CSS variables
  applyTheme: (element: HTMLElement = document.documentElement) => {
    const theme = terminalThemeHybrid
    Object.entries(theme.cssVariables).forEach(([property, value]) => {
      element.style.setProperty(property, value)
    })
  },
  
  // Utility function to generate CSS
  generateCSS: () => {
    const theme = terminalThemeHybrid
    return Object.entries(theme.cssVariables)
      .map(([property, value]) => `${property}: ${value};`)
      .join('\n  ')
  }
} as const

// Usage Examples:

/*
// 1. Apply theme to document
terminalThemeHybrid.applyTheme()

// 2. Generate CSS for stylesheet
const css = terminalThemeHybrid.generateCSS()
// Returns:
// --color-primary: #00b4d8;
// --color-primary-dim: #0096c7;
// --color-primary-dark: #0077b6;
// ... etc

// 3. Use in components
<button className={terminalThemeHybrid.components.button.primary}>
  Click me
</button>

// 4. Dynamic theme switching
function switchTheme(newTheme) {
  // Remove old theme
  document.documentElement.classList.remove('theme-terminal')
  
  // Apply new theme CSS variables
  newTheme.applyTheme()
  
  // Add new theme class
  document.documentElement.classList.add(`theme-${newTheme.name.toLowerCase()}`)
}
*/
