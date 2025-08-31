export const darkTheme = {
  name: 'Midnight',
  id: 'dark',
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
    font: '"Space Grotesk", "Inter", system-ui, sans-serif',
  },
  typography: {
    heading: '#60a5fa',
    body: '#e5e5e5',
    code: 'ui-monospace, SFMono-Regular, monospace',
  },
  effects: {
    dotOpacity: '0.25',
    blur: '16px',
  },
  // Theme can include custom fonts to load
  fonts: [
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
  ],
} as const;