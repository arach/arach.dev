// Cyanotype — cool paper, navy ink, blueprint grid, one cobalt accent.
// Shares its tokens with arach.io's classic template.
export const defaultTheme = {
  name: 'Light',
  id: 'default',
  fonts: {
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
  },
  colors: {
    bg: '#f4f5f7',
    text: '#0b1640',
    accent: '#2340f0',
    muted: 'rgba(11, 22, 64, 0.72)',
    faint: 'rgba(11, 22, 64, 0.42)',
    border: 'rgba(11, 22, 64, 0.12)',
    rule: 'rgba(11, 22, 64, 0.85)',
    grid: 'rgba(35, 64, 240, 0.07)',
    card: '#ffffff',
    shadow: 'rgba(11, 22, 64, 0.08)',
  },
  header: {
    bg: 'rgba(244, 245, 247, 0.86)',
    text: '#0b1640',
  },
  typography: {
    headingColor: '#0b1640',
    bodyColor: '#0b1640',
  },
  effects: {
    dotOpacity: '0.15',
    blur: '10px',
  },
} as const;
