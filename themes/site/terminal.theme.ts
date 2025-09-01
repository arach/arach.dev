export const terminalTheme = {
  name: 'Terminal',
  id: 'terminal',
  colors: {
    bg: '#0a0a0b',
    text: '#ffffff',
    accent: '#00b4d8',
    muted: '#a1a1aa',
    border: '#27272a',
    card: '#27272a',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    bg: 'rgba(39, 39, 42, 0.95)',
    text: '#ffffff',
    font: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  typography: {
    heading: '#ffffff',
    body: '#ffffff',
    code: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  effects: {
    dotOpacity: '0.08',
    blur: '8px',
    // Terminal-specific effects
    scanlines: true,
    glow: true,
  },
} as const;