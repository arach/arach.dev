import type { Theme } from '@/lib/theme-engine';

export const darkTheme: Theme = {
  name: 'Dark',
  id: 'dark',
  colors: {
    bg: '#0f172a',
    text: '#f1f5f9',
    accent: '#60a5fa',
    muted: '#94a3b8',
    border: '#334155',
    card: '#1e293b',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    bg: 'rgba(255, 255, 255, 0.1)',
    text: '#f1f5f9',
    font: 'var(--font-geist-sans)',
  },
  typography: {
    heading: '#f1f5f9',
    body: '#cbd5e1',
    code: 'var(--font-ibm-plex-mono)',
  },
  effects: {
    dotOpacity: '0.25',
    blur: '16px',
  },
  fonts: ['Inter', 'JetBrains+Mono'],
};
