// Warm graphite with a CRT-amber accent — the dark side of arach.io's classic template.
export const darkTheme = {
  name: 'Dark',
  id: 'dark',
  fonts: {
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
  },
  colors: {
    bg: '#0b0a09',
    text: '#eee8dc',
    accent: '#f2ac3e',
    muted: 'rgba(238, 232, 220, 0.7)',
    faint: 'rgba(238, 232, 220, 0.38)',
    border: 'rgba(238, 232, 220, 0.1)',
    rule: 'rgba(238, 232, 220, 0.2)',
    grid: 'rgba(242, 172, 62, 0.05)',
    card: '#141311',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    bg: 'rgba(11, 10, 9, 0.86)',
    text: '#eee8dc',
  },
  typography: {
    headingColor: '#eee8dc',
    bodyColor: '#eee8dc',
  },
  effects: {
    dotOpacity: '0.2',
    blur: '10px',
  },
} as const;
