export const defaultTheme = {
  name: 'Default',
  id: 'default',
  // Define fonts once
  fonts: {
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, monospace',
  },
  colors: {
    bg: '#ffffff',
    text: '#111827',
    accent: '#3b82f6',
    muted: '#6b7280',
    border: '#e5e7eb',
    card: '#f9fafb',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  header: {
    bg: 'rgba(0, 0, 0, 1)',
    text: '#ffffff',
    // font will default to fonts.sans
  },
  typography: {
    headingColor: '#111827',
    // headingFont defaults to fonts.sans
    bodyColor: '#111827',
    // bodyFont defaults to fonts.sans
    // codeFont defaults to fonts.mono
  },
  effects: {
    dotOpacity: '0.15',
    blur: '12px',
  },
} as const;