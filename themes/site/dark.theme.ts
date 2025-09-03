export const darkTheme = {
  name: 'Midnight',
  id: 'dark',
  // Define fonts - dark theme uses modern sans fonts
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-ibm-plex-mono)',
    display: 'var(--font-geist-sans)',
  },
  colors: {
    bg: '#0a0a0a',
    text: '#e5e5e5',
    accent: '#60a5fa',
    muted: '#a3a3a3',
    border: '#262626',
    card: '#171717',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    bg: 'rgba(17, 17, 17, 0.95)',
    text: '#ffffff',
    // font defaults to fonts.sans (Space Grotesk)
  },
  typography: {
    headingColor: '#60a5fa',
    bodyColor: '#e5e5e5',
    // headingFont defaults to fonts.sans
    // bodyFont defaults to fonts.sans
    // codeFont defaults to fonts.mono
  },
  effects: {
    dotOpacity: '0.25',
    blur: '16px',
  },
  // No external font imports; use site fonts for performance
} as const;
