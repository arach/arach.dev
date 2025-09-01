import type { Theme } from '@/lib/theme-engine';

export const defaultTheme: Theme = {
  name: 'Default',
  id: 'default',
  colors: {
    bg: '#ffffff',
    text: '#111827',
    accent: '#3b82f6',
    muted: '#6b7280',
    border: '#e5e7eb',
    card: '#f9fafb',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  header: {
    bg: 'rgba(0, 0, 0, 1)',
    text: '#ffffff',
    font: 'var(--font-geist-sans)',
  },
  typography: {
    heading: '#111827',
    body: '#111827',
    code: 'var(--font-ibm-plex-mono)',
  },
  effects: {
    dotOpacity: '0.15',
    blur: '12px',
  },
  fonts: ['Inter', 'JetBrains+Mono'],
};
