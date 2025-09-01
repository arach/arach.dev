export const cyberpunkTheme = {
  name: 'Cyber Neon',
  id: 'cyberpunk',
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
    font: '"Orbitron", "Exo 2", "Space Mono", monospace',
  },
  typography: {
    heading: '#fbbf24',
    body: '#e0f2fe',
    code: '"Fira Code", "Victor Mono", monospace',
  },
  effects: {
    dotOpacity: '0.3',
    blur: '20px',
    glow: true,
    neon: true,
  },
  fonts: [
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap',
    'https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap',
  ],
} as const;