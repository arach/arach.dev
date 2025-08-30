/**
 * Directory Theme
 * 
 * A professional, modern design system inspired by directory interfaces
 * and technical documentation. Clean neutrals, monospace typography,
 * and subtle interactions create a focused, developer-friendly experience.
 */

export const directoryTheme = {
  name: "Directory",
  description: "Professional directory-focused design with clean neutrals and monospace typography",
  
  // Core Color System - OKLCH-based neutral palette
  colors: {
    // Backgrounds
    background: "oklch(1 0 0)", // Pure white
    backgroundDark: "oklch(0.145 0 0)", // Deep neutral
    
    // Surface variants
    card: "oklch(1 0 0)",
    cardDark: "oklch(0.145 0 0)",
    surface: "oklch(0.97 0 0)", // Light neutral
    surfaceDark: "oklch(0.269 0 0)", // Medium dark neutral
    
    // Text hierarchy
    foreground: "oklch(0.145 0 0)", // Near black
    foregroundDark: "oklch(0.985 0 0)", // Near white
    muted: "oklch(0.556 0 0)", // Mid gray
    mutedDark: "oklch(0.708 0 0)", // Light gray
    
    // Interactive elements
    primary: "oklch(0.205 0 0)", // Dark neutral
    primaryDark: "oklch(0.985 0 0)", // Light neutral
    accent: "oklch(0.97 0 0)", // Very light neutral
    accentDark: "oklch(0.269 0 0)", // Medium neutral
    
    // Borders and dividers
    border: "oklch(0.922 0 0)", // Light border
    borderDark: "oklch(0.269 0 0)", // Dark border
    
    // Status colors (minimal accent colors)
    success: "oklch(0.646 0.222 41.116)", // Subtle green
    warning: "oklch(0.828 0.189 84.429)", // Subtle amber
    error: "oklch(0.577 0.245 27.325)", // Subtle red
    info: "oklch(0.6 0.118 184.704)", // Subtle blue
  },
  
  // Typography - Monospace-first approach
  typography: {
    // Font stacks
    fonts: {
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Noto Sans Mono", "Droid Sans Mono", "Liberation Mono", "Consolas", "Courier New", monospace',
      sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    
    // Scale (emphasis on small, readable sizes)
    scale: {
      xs: "0.625rem",    // 10px - badges, micro text
      sm: "0.75rem",     // 12px - captions, labels
      base: "0.875rem",  // 14px - body text (smaller than typical)
      md: "1rem",        // 16px - emphasis
      lg: "1.125rem",    // 18px - large body
      xl: "1.25rem",     // 20px - small headings
      "2xl": "1.5rem",   // 24px - headings
      "3xl": "2rem",     // 32px - large headings
    },
    
    // Spacing and rhythm
    leading: {
      tight: "1.25",
      relaxed: "1.6",
    },
    
    tracking: {
      wide: "0.08em",
      wider: "0.2em",
    }
  },
  
  // Layout and spacing
  spacing: {
    // Container and section spacing
    container: "1200px",
    section: {
      sm: "3rem",
      md: "4rem", 
      lg: "6rem"
    },
    
    // Component spacing
    component: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem"
    }
  },
  
  // Border radius system
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    DEFAULT: "0.5rem",
    md: "0.625rem", // 10px - matches agentlist.io
    lg: "0.75rem",
    full: "9999px"
  },
  
  // Animation and transitions
  motion: {
    // Timing functions
    easing: {
      smooth: "cubic-bezier(0.22, 1, 0.36, 1)", // Main easing
      linear: "linear",
      easeOut: "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    
    // Durations
    duration: {
      fast: "140ms",
      normal: "180ms",
      slow: "300ms"
    },
    
    // Common transforms
    transforms: {
      lift: "translateY(-1px)",
      press: "translateY(0.5px) scale(0.997)",
      cardHover: "translateY(-1px)",
      cardActive: "translateY(0) scale(0.999)"
    }
  },
  
  // Component variants
  components: {
    // Card styling
    card: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "1.5rem",
      boxShadow: "none" // Minimal shadows
    },
    
    // Button variants
    button: {
      primary: {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        border: "none"
      },
      secondary: {
        background: "var(--accent)",
        color: "var(--accent-foreground)", 
        border: "1px solid var(--border)"
      },
      outline: {
        background: "transparent",
        color: "var(--foreground)",
        border: "1px solid var(--border)"
      }
    },
    
    // Input styling
    input: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "0.5rem 0.75rem",
      fontSize: "var(--text-sm)"
    }
  },
  
  // Grid and layout utilities
  grid: {
    // Background patterns
    dotGrid: {
      size: "32px",
      opacity: "0.3",
      color: "rgba(80,80,80,0.13)"
    }
  }
}

// CSS Custom Properties mapping
export const directoryCSSVariables = {
  // Colors
  "--color-background": directoryTheme.colors.background,
  "--color-background-dark": directoryTheme.colors.backgroundDark,
  "--color-foreground": directoryTheme.colors.foreground,
  "--color-foreground-dark": directoryTheme.colors.foregroundDark,
  "--color-primary": directoryTheme.colors.primary,
  "--color-primary-dark": directoryTheme.colors.primaryDark,
  "--color-muted": directoryTheme.colors.muted,
  "--color-muted-dark": directoryTheme.colors.mutedDark,
  "--color-border": directoryTheme.colors.border,
  "--color-border-dark": directoryTheme.colors.borderDark,
  "--color-surface": directoryTheme.colors.surface,
  "--color-surface-dark": directoryTheme.colors.surfaceDark,
  
  // Typography
  "--font-mono": directoryTheme.typography.fonts.mono,
  "--font-sans": directoryTheme.typography.fonts.sans,
  
  // Spacing
  "--radius": directoryTheme.borderRadius.DEFAULT,
  "--radius-md": directoryTheme.borderRadius.md,
  
  // Motion
  "--ease-smooth": directoryTheme.motion.easing.smooth,
  "--duration-normal": directoryTheme.motion.duration.normal,
}

// Utility classes for micro-animations (inspired by agentlist.io)
export const directoryAnimationClasses = {
  // Base animation class
  ".u-anim": {
    "transition-property": "transform, opacity, box-shadow, background-color, border-color, color, filter",
    "transition-duration": directoryTheme.motion.duration.normal,
    "transition-timing-function": directoryTheme.motion.easing.smooth,
    "will-change": "transform"
  },
  
  // Hover effects
  ".u-lift:hover": {
    "transform": directoryTheme.motion.transforms.lift
  },
  
  ".u-press:active": {
    "transform": directoryTheme.motion.transforms.press
  },
  
  // Card animations
  ".u-card": {
    "transition": `transform ${directoryTheme.motion.duration.normal} ${directoryTheme.motion.easing.smooth}, border-color ${directoryTheme.motion.duration.normal} ${directoryTheme.motion.easing.smooth}, box-shadow ${directoryTheme.motion.duration.normal} ${directoryTheme.motion.easing.smooth}, background-color ${directoryTheme.motion.duration.normal} ${directoryTheme.motion.easing.smooth}`,
    "will-change": "transform"
  },
  
  ".u-card:hover": {
    "transform": directoryTheme.motion.transforms.cardHover
  },
  
  ".u-card:active": {
    "transform": directoryTheme.motion.transforms.cardActive
  },
  
  // Reduced motion support
  "@media (prefers-reduced-motion: reduce)": {
    ".u-anim, .u-card": {
      "transition": "none !important"
    },
    ".u-lift:hover, .u-press:active, .u-card:hover, .u-card:active": {
      "transform": "none !important"
    }
  }
}

export type DirectoryTheme = typeof directoryTheme