'use client';

import { useTheme } from '@/lib/theme/site/provider';
import { useState } from 'react';

export default function SiteThemeGallery() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--theme-heading-color)' }}>
            Site Theme Gallery
          </h1>
          <p className="text-lg" style={{ color: 'var(--theme-muted-color)' }}>
            Explore and preview all available website themes. Click any theme to apply it.
          </p>
        </div>

        {/* Current Theme */}
        <div className="mb-8 p-6 rounded-lg border" style={{ 
          backgroundColor: 'var(--theme-card-bg)',
          borderColor: 'var(--theme-border-color)'
        }}>
          <h2 className="text-xl font-semibold mb-2">Current Theme</h2>
          <p className="text-2xl font-bold" style={{ color: 'var(--theme-accent-color)' }}>
            {themes[currentTheme]?.name || currentTheme}
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(themes).map(([id, theme]) => (
            <div
              key={id}
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                currentTheme === id ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                borderColor: currentTheme === id 
                  ? 'var(--theme-accent-color)' 
                  : hoveredTheme === id 
                    ? 'var(--theme-accent-color)' 
                    : 'var(--theme-border-color)',
                backgroundColor: 'var(--theme-card-bg)',
                transform: hoveredTheme === id ? 'translateY(-4px)' : 'none'
              }}
              onClick={() => setTheme(id as any)}
              onMouseEnter={() => setHoveredTheme(id)}
              onMouseLeave={() => setHoveredTheme(null)}
            >
              {/* Theme Name */}
              <h3 className="text-xl font-bold mb-2">{theme.name}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--theme-muted-color)' }}>
                {theme.id}
              </p>

              {/* Color Palette Preview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-20">Background:</span>
                  <div className="flex-1 h-6 rounded" style={{ backgroundColor: theme.colors.bg }}>
                    <span className="px-2 text-xs" style={{ color: theme.colors.text }}>
                      {theme.colors.bg}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs w-20">Text:</span>
                  <div className="flex-1 h-6 rounded border" style={{ 
                    backgroundColor: theme.colors.bg,
                    borderColor: theme.colors.border 
                  }}>
                    <span className="px-2 text-xs" style={{ color: theme.colors.text }}>
                      {theme.colors.text}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs w-20">Accent:</span>
                  <div className="flex-1 h-6 rounded" style={{ backgroundColor: theme.colors.accent }}>
                    <span className="px-2 text-xs text-white">
                      {theme.colors.accent}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs w-20">Muted:</span>
                  <div className="flex-1 h-6 rounded border" style={{ 
                    backgroundColor: theme.colors.bg,
                    borderColor: theme.colors.muted
                  }}>
                    <span className="px-2 text-xs" style={{ color: theme.colors.muted }}>
                      {theme.colors.muted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Typography Preview */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.colors.border }}>
                <p className="text-xs mb-2" style={{ color: theme.colors.muted }}>Typography:</p>
                <div className="text-xs space-y-1">
                  {'display' in theme.fonts && theme.fonts.display && (
                    <div style={{ fontFamily: theme.fonts.display }}>Display: {theme.fonts.display.split(',')[0]}</div>
                  )}
                  <div style={{ fontFamily: theme.fonts.sans }}>Sans: {theme.fonts.sans.split(',')[0]}</div>
                  <div style={{ fontFamily: theme.fonts.mono }}>Mono: {theme.fonts.mono.split(',')[0]}</div>
                </div>
              </div>

              {/* Active Indicator */}
              {currentTheme === id && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs rounded" style={{
                    backgroundColor: 'var(--theme-accent-color)',
                    color: 'white'
                  }}>
                    Active
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Live Preview Section */}
        <div className="mt-12 p-8 rounded-lg" style={{
          backgroundColor: 'var(--theme-card-bg)',
          border: '1px solid var(--theme-border-color)'
        }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--theme-heading-color)' }}>
            Live Preview
          </h2>
          
          <div className="space-y-4">
            <p style={{ color: 'var(--theme-text-color)' }}>
              This is regular text using the current theme's text color.
            </p>
            
            <p style={{ color: 'var(--theme-muted-color)' }}>
              This is muted text, perfect for secondary information.
            </p>
            
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded" style={{
                backgroundColor: 'var(--theme-accent-color)',
                color: 'white'
              }}>
                Accent Button
              </button>
              
              <button className="px-4 py-2 rounded border" style={{
                borderColor: 'var(--theme-border-color)',
                color: 'var(--theme-text-color)'
              }}>
                Outlined Button
              </button>
            </div>
            
            <div className="p-4 rounded" style={{
              backgroundColor: 'var(--theme-bg-color)',
              border: '1px solid var(--theme-border-color)'
            }}>
              <code style={{ 
                fontFamily: 'var(--theme-code-font)',
                color: 'var(--theme-accent-color)'
              }}>
                console.log('Code preview with theme font');
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}