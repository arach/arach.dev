export const cyberpunkTheme = {
  name: 'Cyber Neon',
  id: 'cyberpunk',
  // Define fonts once - cyberpunk uses special display fonts
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-ibm-plex-mono)',
    display: 'var(--font-geist-sans)',
  },
  colors: {
    bg: '#0a0014',
    text: '#e0f2fe',
    accent: '#f472b6',
    muted: '#94a3b8',
    border: '#6366f1',
    card: '#1e1b4b',
    shadow: 'rgba(139, 92, 246, 0.3)',
  },
  header: {
    bg: 'linear-gradient(90deg, rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.9))',
    text: '#ffffff',
    font: 'var(--theme-font-display)', // Use the display font
  },
  typography: {
    headingColor: '#fbbf24',
    headingFont: 'var(--theme-font-display)', // Headings use display font
    bodyColor: '#e0f2fe',
    // bodyFont defaults to fonts.sans (Exo 2)
    // codeFont defaults to fonts.mono (Fira Code)
  },
  effects: {
    dotOpacity: '0.3',
    blur: '20px',
    glow: true,
    neon: true,
  },
  // No external font imports; use site fonts for performance
} as const;
