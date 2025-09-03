export const paperTheme = {
  name: 'Vintage Paper',
  id: 'paper',
  // Define fonts - paper uses classic serif fonts
  fonts: {
    sans: 'var(--font-geist-sans)',
    serif: 'var(--font-geist-sans)',
    mono: 'var(--font-ibm-plex-mono)',
    display: 'var(--font-geist-sans)',
  },
  colors: {
    bg: '#faf8f3',
    text: '#3d2817',
    accent: '#8b7355',
    muted: '#6b5d4f',
    border: '#d4c5b0',
    card: '#f5f2eb',
    shadow: 'rgba(92, 79, 59, 0.15)'
  },
  header: {
    bg: 'rgba(92, 79, 59, 0.95)',
    text: '#faf8f3',
    font: 'var(--theme-font-display)', // Use Libre Baskerville
  },
  typography: {
    headingColor: '#451a03',
    headingFont: 'var(--theme-font-display)', // Headings use Libre Baskerville
    bodyColor: '#3d2817',
    bodyFont: 'var(--theme-font-sans)', // Body uses Crimson Text
    // codeFont defaults to fonts.mono (Courier Prime)
  },
  effects: {
    dotOpacity: '0.08',
    blur: '8px',
    texture: 'paper',
  },
  // No external font imports; use site fonts for performance
} as const;
