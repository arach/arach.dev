export const sunsetTheme = {
  name: 'Golden Hour',
  id: 'sunset',
  // Define fonts - sunset uses elegant serif fonts
  fonts: {
    sans: '"Lora", var(--font-geist-sans)',
    serif: '"Playfair Display", Georgia, serif',
    mono: '"JetBrains Mono", "Fira Code", var(--font-ibm-plex-mono)',
    display: '"Playfair Display"', // Elegant serif for headings
  },
  colors: {
    bg: '#fef3c7',
    text: '#78350f',
    accent: '#f59e0b',
    muted: '#92400e',
    border: '#fcd34d',
    card: '#fffbeb',
    shadow: 'rgba(251, 146, 60, 0.2)'
  },
  header: {
    bg: 'linear-gradient(135deg, rgba(251, 146, 60, 0.95), rgba(255, 143, 46, 0.95))',
    text: '#ffffff',
    font: 'var(--theme-font-display)', 
  },
  typography: {
    headingColor: '#92400e',
    headingFont: 'var(--theme-font-display)', 
    bodyColor: '#78350f',
    bodyFont: 'var(--theme-font-sans)',
    codeColor: '#78350f',
    codeFont: 'var(--theme-font-mono)',
  },
  effects: {
    dotOpacity: '0.4',
    blur: '16px',
  },
  fontImports: [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap',
  ],
} as const;
