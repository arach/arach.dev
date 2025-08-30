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
  
  // Border radius system - subtle, consistent curves
  borderRadius: {
    none: "0",
    xs: "0.125rem",      // 2px - very subtle
    sm: "0.25rem",       // 4px - small elements
    DEFAULT: "0.5rem",   // 8px - standard buttons/inputs
    md: "0.625rem",      // 10px - cards, main components (agentlist.io standard)
    lg: "0.75rem",       // 12px - larger containers
    xl: "1rem",          // 16px - major sections
    full: "9999px"       // circular elements
  },

  // Visual effects and treatments
  effects: {
    // Backdrop blur for overlays and headers
    backdrop: {
      blur: "backdrop-blur",
      blurSm: "backdrop-blur-sm",
      blurMd: "backdrop-blur-md"
    },

    // Transparency levels using alpha values
    transparency: {
      // Background transparencies
      subtle: "0.4",       // /40 - very light overlay
      light: "0.6",        // /60 - moderate overlay  
      medium: "0.8",       // /80 - strong overlay
      heavy: "0.9",        // /90 - almost opaque
      
      // Component transparencies
      overlay: "0.5",      // /50 - modal overlays
      card: "0.02",        // /[0.02] - subtle card enhancement
      accent: "0.12",      // /[0.12] - mix-blend overlay
      border: "0.04",      // /[0.04] - subtle border highlights
    },

    // Shadow system - minimal, precise shadows
    shadows: {
      // Inset shadows for depth and texture
      cardInset: "inset 0 0 0 1px rgba(255,255,255,0.02), 0 6px 20px rgba(0,0,0,0.30)",
      buttonInset: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.55)",
      surfaceInset: "inset 0 1px 0 rgba(255,255,255,0.04)",
      
      // Complex inset shadows for premium feel
      premiumInset: "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03)",
      
      // Standard shadows
      xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      
      // Special shadows
      overlay: "0 10px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.02)"
    },

    // Mix-blend modes for subtle overlays
    blending: {
      overlay: "mix-blend-overlay",
      multiply: "mix-blend-multiply",
      screen: "mix-blend-screen"
    }
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
  
  // Component variants with complete visual treatments
  components: {
    // Card styling - premium depth with inset shadows
    card: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: "1.5rem",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02), 0 6px 20px rgba(0,0,0,0.30)",
      
      // Overlay treatment for depth
      overlay: {
        position: "absolute",
        inset: "0",
        opacity: "0.12",
        mixBlendMode: "overlay",
        pointerEvents: "none"
      },
      
      // Inner content styling
      inner: {
        position: "relative",
        zIndex: "1"
      }
    },
    
    // Button variants with sophisticated treatments
    button: {
      primary: {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        border: "none",
        borderRadius: "var(--radius)",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
      },
      
      secondary: {
        background: "var(--accent)/40", // Semi-transparent
        color: "var(--accent-foreground)", 
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        backdropFilter: "blur(8px)"
      },
      
      outline: {
        background: "transparent",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        // Subtle inset shadow for premium feel
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.55)"
      },
      
      ghost: {
        background: "transparent",
        color: "var(--foreground)",
        border: "none",
        borderRadius: "var(--radius)"
      }
    },
    
    // Input styling with consistent visual language
    input: {
      background: "var(--surface)/30", // Semi-transparent
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "0.5rem 0.75rem",
      fontSize: "var(--text-sm)",
      fontFamily: "var(--font-mono)",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      
      // Focus state
      focus: {
        borderColor: "var(--ring)",
        boxShadow: "0 0 0 3px var(--ring)/50",
        outline: "none"
      }
    },
    
    // Badge/pill components
    badge: {
      base: {
        background: "var(--surface)/80",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-xs)", // Very small radius
        padding: "0.125rem 0.375rem",
        fontSize: "0.625rem", // 10px
        fontFamily: "var(--font-mono)",
        fontWeight: "500",
        textTransform: "uppercase"
      },
      
      outline: {
        background: "transparent",
        border: "1px solid var(--border)",
        color: "var(--muted-foreground)"
      }
    },
    
    // Headers with backdrop blur
    header: {
      background: "var(--background)/80",
      backdropFilter: "blur(8px)",
      border: "none",
      borderBottom: "1px solid var(--border)",
      
      // Enhanced backdrop support
      enhanced: {
        background: "var(--background)/60",
        backdropFilter: "blur(12px)",
        supports: "backdrop-filter"
      }
    },
    
    // Modal/overlay treatments
    modal: {
      overlay: {
        background: "black/50",
        backdropFilter: "blur(4px)"
      },
      
      content: {
        background: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.02)"
      }
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

// Export the directory theme for registration

export type DirectoryTheme = typeof directoryTheme