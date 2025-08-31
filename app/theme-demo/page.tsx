'use client';

import { useTheme } from '@/lib/theme-provider-clean';

export default function ThemeDemoPage() {
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <div className="min-h-screen p-8" style={{
      backgroundColor: 'var(--theme-bg)',
      color: 'var(--theme-text)',
    }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--theme-heading)' }}>
          Clean Theme System Demo
        </h1>
        
        <p className="mb-8" style={{ color: 'var(--theme-muted)' }}>
          Themes are now TypeScript objects that generate CSS dynamically. 
          Each theme is easy to read, write, and maintain.
        </p>

        {/* Theme Switcher */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(themes).map(([id, theme]) => (
            <button
              key={id}
              onClick={() => setTheme(id as keyof typeof themes)}
              className="p-4 rounded-lg border-2 transition-all"
              style={{
                backgroundColor: currentTheme === id ? 'var(--theme-accent)' : 'var(--theme-card)',
                borderColor: currentTheme === id ? 'var(--theme-accent)' : 'var(--theme-border)',
                color: currentTheme === id ? 'white' : 'var(--theme-text)',
              }}
            >
              <h3 className="font-bold text-lg">{theme.name}</h3>
              <p className="text-sm opacity-80">ID: {theme.id}</p>
            </button>
          ))}
        </div>

        {/* Benefits */}
        <div className="p-6 rounded-lg" style={{ 
          backgroundColor: 'var(--theme-card)',
          border: '1px solid var(--theme-border)'
        }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-heading)' }}>
            Architecture Benefits
          </h2>
          
          <div className="space-y-3">
            <Feature>
              <strong>TypeScript Themes:</strong> Each theme is a readable TS object with type safety
            </Feature>
            <Feature>
              <strong>Dynamic CSS Generation:</strong> Only the active theme CSS is loaded
            </Feature>
            <Feature>
              <strong>Clean Separation:</strong> Theme files are independent and easy to maintain
            </Feature>
            <Feature>
              <strong>Font Management:</strong> Themes can specify their own fonts
            </Feature>
            <Feature>
              <strong>No Effects Spam:</strong> Single theme load, no constant CSS variable manipulation
            </Feature>
            <Feature>
              <strong>SSR Compatible:</strong> Can generate all CSS at build time if needed
            </Feature>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 p-6 rounded-lg" style={{ 
          backgroundColor: 'var(--theme-card)',
          border: '1px solid var(--theme-border)'
        }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-heading)' }}>
            Theme Structure
          </h2>
          <pre className="text-sm overflow-x-auto" style={{ fontFamily: 'var(--theme-code-font)' }}>
{`export const myTheme = {
  name: 'My Theme',
  id: 'my-theme',
  colors: {
    bg: '#ffffff',
    text: '#000000',
    accent: '#0066cc',
    // ... clean, readable structure
  },
  header: {
    bg: 'rgba(0, 0, 0, 0.9)',
    text: '#ffffff',
    font: 'system-ui, sans-serif',
  },
  // Optional: theme-specific fonts
  fonts: [
    'https://fonts.googleapis.com/...'
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span style={{ color: 'var(--theme-accent)' }}>✓</span>
      <div style={{ color: 'var(--theme-text)' }}>{children}</div>
    </div>
  );
}