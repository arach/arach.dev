import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './themes/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'monospace'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
  // Tailwind v4 specific configuration
  future: {
    hoverOnlyWhenSupported: true,
  },
}

export default config