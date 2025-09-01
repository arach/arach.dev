/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Dark mode using data attribute
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Define CSS variables that themes will provide
      colors: {
        // These reference CSS variables that each theme defines
        'theme-bg': 'var(--theme-bg)',
        'theme-text': 'var(--theme-text)',
        'theme-accent': 'var(--theme-accent)',
        'theme-muted': 'var(--theme-muted)',
        'theme-border': 'var(--theme-border)',
        'theme-card': 'var(--theme-card)',
      },
      backgroundColor: {
        'primary': 'var(--theme-bg)',
        'card': 'var(--theme-card)',
      },
      textColor: {
        'primary': 'var(--theme-text)',
        'muted': 'var(--theme-muted)',
        'accent': 'var(--theme-accent)',
      },
      borderColor: {
        'primary': 'var(--theme-border)',
      },
    },
  },
  plugins: [
    // Plugin to add theme utilities
    function({ addBase, theme }) {
      addBase({
        ':root, [data-theme="default"]': {
          '--theme-bg': '#ffffff',
          '--theme-text': '#111827',
          '--theme-accent': '#3b82f6',
          '--theme-muted': '#6b7280',
          '--theme-border': '#e5e7eb',
          '--theme-card': '#f9fafb',
        },
        '[data-theme="dark"]': {
          '--theme-bg': '#0a0a0a',
          '--theme-text': '#e5e5e5',
          '--theme-accent': '#60a5fa',
          '--theme-muted': '#a3a3a3',
          '--theme-border': '#262626',
          '--theme-card': '#171717',
        },
        '[data-theme="terminal"]': {
          '--theme-bg': '#0a0a0b',
          '--theme-text': '#ffffff',
          '--theme-accent': '#00b4d8',
          '--theme-muted': '#a1a1aa',
          '--theme-border': '#27272a',
          '--theme-card': '#27272a',
        },
      });
    },
  ],
}