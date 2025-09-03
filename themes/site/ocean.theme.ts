export const oceanTheme = {
  name: 'Deep Ocean',
  id: 'ocean',
  // Define fonts - ocean uses clean, modern sans fonts
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-ibm-plex-mono)',
    display: 'var(--font-geist-sans)', // Use site display font
  },
  colors: {
    bg: '#0f172a',
    text: '#cbd5e1',
    accent: '#38bdf8',
    muted: '#94a3b8',
    border: '#1e293b',
    card: '#1e293b',
    shadow: 'rgba(14, 165, 233, 0.15)',
  },
  header: {
    bg: 'rgba(30, 58, 138, 0.9)',
    text: '#e0f2fe',
    font: 'var(--theme-font-display)', // Use Outfit
  },
  typography: {
    headingColor: '#38bdf8',
    headingFont: 'var(--theme-font-display)', // Headings use Outfit
    bodyColor: '#cbd5e1',
    // bodyFont defaults to fonts.sans (DM Sans)
    // codeFont defaults to fonts.mono
  },
  effects: {
    dotOpacity: '0.2',
    blur: '12px',
  },
  // No external font imports; use site fonts for performance
} as const;
