export const oceanTheme = {
  name: 'Deep Ocean',
  id: 'ocean',
  // Define fonts - ocean uses clean, modern sans fonts
  fonts: {
    sans: '"DM Sans", var(--font-geist-sans)',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
    display: '"Outfit"', // Modern display font for headings
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
  fontImports: [
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap',
  ],
} as const;