export const defaultTheme = {
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
    ascii: '#111827', // Use text color for ASCII in default theme
  },
  header: {
    bg: 'rgba(0, 0, 0, 1)',
    text: '#ffffff',
    font: 'ui-monospace, SFMono-Regular, monospace',
  },
  typography: {
    heading: '#111827',
    body: '#111827',
    code: 'ui-monospace, SFMono-Regular, monospace',
  },
  effects: {
    dotOpacity: '0.15',
    blur: '12px',
  },
} as const;