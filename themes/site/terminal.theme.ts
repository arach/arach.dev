export const terminalTheme = {
  name: 'Terminal',
  id: 'terminal',
  // Define fonts - terminal uses monospace fonts throughout
  fonts: {
    sans: 'var(--font-ibm-plex-mono)',
    mono: 'var(--font-ibm-plex-mono)',
    display: 'var(--font-ibm-plex-mono)', // Monospace for everything
  },
  colors: {
    bg: '#0a0a0b',
    text: '#ffffff',
    accent: '#00b4d8',
    muted: '#a1a1aa',
    border: '#27272a',
    card: '#27272a',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    bg: 'rgba(39, 39, 42, 0.95)',
    text: '#ffffff',
    font: 'var(--theme-font-mono)', // Use mono font
  },
  typography: {
    headingColor: '#ffffff',
    headingFont: 'var(--theme-font-mono)', // Headings use mono
    bodyColor: '#ffffff',
    bodyFont: 'var(--theme-font-mono)', // Body uses mono
    // codeFont defaults to fonts.mono
  },
  effects: {
    dotOpacity: '0.08',
    blur: '8px',
    // Terminal-specific effects
    scanlines: true,
    glow: true,
  },
} as const;