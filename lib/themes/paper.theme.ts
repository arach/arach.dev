export const paperTheme = {
  name: 'Vintage Paper',
  id: 'paper',
  colors: {
    bg: '#faf8f3',
    text: '#3d2817',
    accent: '#8b7355',
    muted: '#6b5d4f',
    border: '#d4c5b0',
    card: '#f5f2eb',
    shadow: 'rgba(92, 79, 59, 0.15)',
  },
  header: {
    bg: 'rgba(92, 79, 59, 0.95)',
    text: '#faf8f3',
    font: '"Libre Baskerville", "Crimson Text", "Times New Roman", serif',
  },
  typography: {
    heading: '#451a03',
    body: '#3d2817',
    code: '"Courier Prime", "Courier New", monospace',
  },
  effects: {
    dotOpacity: '0.08',
    blur: '8px',
    texture: 'paper',
  },
  fonts: [
    'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap',
  ],
} as const;