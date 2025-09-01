export const sunsetTheme = {
  name: 'Golden Hour',
  id: 'sunset',
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
    bg: 'linear-gradient(135deg, rgba(251, 146, 60, 0.95), rgba(245, 101, 101, 0.95))',
    text: '#ffffff',
    font: '"Playfair Display", "Lora", Georgia, serif',
  },
  typography: {
    heading: '#92400e',
    body: '#78350f',
    code: '"JetBrains Mono", "Fira Code", monospace',
  },
  effects: {
    dotOpacity: '0.4',
    blur: '16px',
  },
  fonts: [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
  ],
} as const;