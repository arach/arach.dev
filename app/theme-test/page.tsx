'use client';

import { useState, useEffect } from 'react';
import '../themes.css';

const themes = ['default', 'dark', 'terminal', 'ocean', 'cyberpunk'] as const;

export default function ThemeTestPage() {
  const [currentTheme, setCurrentTheme] = useState<typeof themes[number]>('default');
  
  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem('site-theme') as typeof themes[number];
    if (saved && themes.includes(saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const handleThemeChange = (theme: typeof themes[number]) => {
    // Super simple - just set the attribute, CSS does the rest
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);
    setCurrentTheme(theme);
  };

  return (
    <div style={{
      backgroundColor: 'var(--theme-bg-color)',
      color: 'var(--theme-text-color)',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'var(--theme-header-font)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '1rem',
          color: 'var(--theme-heading-color)'
        }}>
          Clean Theme System Test
        </h1>
        
        <p style={{ 
          marginBottom: '2rem',
          color: 'var(--theme-muted-text)'
        }}>
          This page demonstrates the new CSS-first theme system. 
          No JavaScript manipulation of individual CSS variables - just a single data-theme attribute.
        </p>

        {/* Theme Switcher */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: 'var(--theme-card-bg)',
          border: '1px solid var(--theme-border-color)',
          borderRadius: '0.5rem'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Select Theme:</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentTheme === theme ? 'var(--theme-accent-color)' : 'var(--theme-card-bg)',
                  color: currentTheme === theme ? 'white' : 'var(--theme-text-color)',
                  border: '1px solid var(--theme-border-color)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Color Showcase */}
        <div style={{ 
          padding: '1rem',
          backgroundColor: 'var(--theme-card-bg)',
          border: '1px solid var(--theme-border-color)',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--theme-heading-color)' }}>
            Theme Colors
          </h2>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <ColorSwatch label="Background" variable="--theme-bg-color" />
            <ColorSwatch label="Text" variable="--theme-text-color" />
            <ColorSwatch label="Accent" variable="--theme-accent-color" />
            <ColorSwatch label="Muted" variable="--theme-muted-text" />
            <ColorSwatch label="Border" variable="--theme-border-color" />
            <ColorSwatch label="Card" variable="--theme-card-bg" />
          </div>
        </div>

        {/* Benefits */}
        <div style={{ 
          padding: '1rem',
          backgroundColor: 'var(--theme-card-bg)',
          border: '1px solid var(--theme-border-color)',
          borderRadius: '0.5rem'
        }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--theme-heading-color)' }}>
            Benefits of CSS-First Approach
          </h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>✅ Single source of truth - themes.css</li>
            <li>✅ No JavaScript effects or state management for styles</li>
            <li>✅ CSS handles all transitions naturally</li>
            <li>✅ Browser optimized - uses native CSS cascade</li>
            <li>✅ Easy to add new themes - just add CSS rules</li>
            <li>✅ Works with SSR/SSG without hydration issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ColorSwatch({ label, variable }: { label: string; variable: string }) {
  const [color, setColor] = useState('');
  
  useEffect(() => {
    const computedColor = getComputedStyle(document.documentElement).getPropertyValue(variable);
    setColor(computedColor);
  }, [variable]);

  return (
    <div style={{ 
      padding: '0.75rem',
      backgroundColor: 'var(--theme-bg-color)',
      border: '1px solid var(--theme-border-color)',
      borderRadius: '0.25rem'
    }}>
      <div style={{ 
        width: '100%', 
        height: '3rem', 
        backgroundColor: `var(${variable})`,
        marginBottom: '0.5rem',
        borderRadius: '0.25rem',
        border: '1px solid var(--theme-border-color)'
      }} />
      <div style={{ fontSize: '0.875rem' }}>
        <div style={{ fontWeight: 'bold' }}>{label}</div>
        <div style={{ 
          color: 'var(--theme-muted-text)', 
          fontSize: '0.75rem',
          fontFamily: 'monospace' 
        }}>
          {color || variable}
        </div>
      </div>
    </div>
  );
}