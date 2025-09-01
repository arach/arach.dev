export const oceanTheme = {
  name: 'Deep Ocean',
  id: 'ocean',
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
    font: '"Outfit", "DM Sans", system-ui, sans-serif',
  },
  typography: {
    heading: '#38bdf8',
    body: '#cbd5e1',
    code: 'ui-monospace, SFMono-Regular, monospace',
  },
  effects: {
    dotOpacity: '0.2',
    blur: '12px',
  },
  fonts: [
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap',
  ],
} as const;