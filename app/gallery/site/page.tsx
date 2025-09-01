'use client';

import { useTheme } from '@/lib/theme/site/provider';
import { useState, useEffect } from 'react';

export default function SiteThemeGallery() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(236,72,153,0.1) 0%, transparent 50%)`
        }} />
      </div>
      
      <div className="relative z-10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Site Theme Gallery
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore and preview all available website themes. Click any theme to apply it instantly.
            </p>
          </div>

          {/* Current Theme Card */}
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            <div className="relative p-6 rounded-2xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Active Theme</h2>
                  <p className="text-3xl font-bold text-white">
                    {themes[currentTheme]?.name || currentTheme}
                  </p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <span className="text-xs font-medium text-blue-400">CURRENTLY ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(themes).map(([id, theme]) => (
              <div
                key={id}
                className="group relative cursor-pointer"
                onClick={() => setTheme(id as any)}
                onMouseEnter={() => setHoveredTheme(id)}
                onMouseLeave={() => setHoveredTheme(null)}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 ${
                  hoveredTheme === id ? 'opacity-100' : 'opacity-0'
                }`} style={{
                  background: `linear-gradient(135deg, ${theme.colors.accent}20, ${theme.colors.accent}10)`
                }} />
                
                <div className={`relative overflow-hidden rounded-xl border bg-gray-900/60 backdrop-blur-sm transition-all duration-300 ${
                  currentTheme === id 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : hoveredTheme === id 
                      ? 'border-gray-700 translate-y-[-2px]' 
                      : 'border-gray-800'
                }`}>
                  {/* Theme Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {theme.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 font-mono">
                          ID: {theme.id}
                        </p>
                      </div>
                      {currentTheme === id && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Color Palette Grid */}
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Background */}
                      <div className="group/color relative">
                        <div 
                          className="h-16 rounded-lg border border-gray-700/50 flex items-end p-2 transition-transform hover:scale-105" 
                          style={{ backgroundColor: theme.colors.bg }}
                        >
                          <span className="text-[10px] font-mono opacity-0 group-hover/color:opacity-100 transition-opacity" 
                                style={{ color: theme.colors.text }}>
                            {theme.colors.bg}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 block">Background</span>
                      </div>
                      
                      {/* Text */}
                      <div className="group/color relative">
                        <div 
                          className="h-16 rounded-lg border border-gray-700/50 flex items-center justify-center transition-transform hover:scale-105" 
                          style={{ backgroundColor: theme.colors.bg }}
                        >
                          <span className="text-lg font-bold" style={{ color: theme.colors.text }}>Aa</span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 block">Text</span>
                      </div>
                      
                      {/* Accent */}
                      <div className="group/color relative">
                        <div 
                          className="h-16 rounded-lg flex items-end p-2 transition-transform hover:scale-105 shadow-lg" 
                          style={{ 
                            backgroundColor: theme.colors.accent,
                            boxShadow: `0 10px 25px -5px ${theme.colors.accent}30`
                          }}
                        >
                          <span className="text-[10px] font-mono text-white opacity-0 group-hover/color:opacity-100 transition-opacity">
                            {theme.colors.accent}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 block">Accent</span>
                      </div>
                      
                      {/* Muted */}
                      <div className="group/color relative">
                        <div 
                          className="h-16 rounded-lg border border-gray-700/50 flex items-center justify-center transition-transform hover:scale-105" 
                          style={{ backgroundColor: theme.colors.bg }}
                        >
                          <span className="text-sm" style={{ color: theme.colors.muted }}>Muted</span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 block">Muted</span>
                      </div>
                    </div>
                  </div>

                  {/* Typography Preview */}
                  <div className="px-6 pb-6 border-t border-gray-800">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 mt-4">Typography</p>
                    <div className="space-y-2">
                      {'display' in theme.fonts && theme.fonts.display && (
                        <div className="text-xs text-gray-400" style={{ fontFamily: theme.fonts.display }}>
                          <span className="text-gray-600">Display:</span> {theme.fonts.display.split(',')[0]}
                        </div>
                      )}
                      <div className="text-xs text-gray-400" style={{ fontFamily: theme.fonts.sans }}>
                        <span className="text-gray-600">Sans:</span> {theme.fonts.sans.split(',')[0]}
                      </div>
                      <div className="text-xs text-gray-400" style={{ fontFamily: theme.fonts.mono }}>
                        <span className="text-gray-600">Mono:</span> {theme.fonts.mono.split(',')[0]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Click to Apply Badge */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-900 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center text-xs font-medium text-white">
                      Click to Apply Theme
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Preview Section */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative p-8 rounded-2xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  Live Preview
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              
              <div className="p-6 rounded-xl" style={{
                backgroundColor: 'var(--theme-bg-color)',
                border: '1px solid var(--theme-border-color)'
              }}>
                <div className="space-y-6">
                  {/* Typography Examples */}
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--theme-heading-color)' }}>
                      Typography Showcase
                    </h3>
                    <p style={{ color: 'var(--theme-text-color)' }}>
                      This is regular body text using the current theme's text color. It demonstrates
                      how your content will appear with the selected theme applied.
                    </p>
                    <p className="mt-2" style={{ color: 'var(--theme-muted-color)' }}>
                      This is muted text, perfect for secondary information, captions, and metadata.
                    </p>
                  </div>
                  
                  {/* Interactive Elements */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--theme-heading-color)' }}>
                      Interactive Elements
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105" style={{
                        backgroundColor: 'var(--theme-accent-color)',
                        color: 'white',
                        boxShadow: `0 4px 14px 0 var(--theme-accent-color)30`
                      }}>
                        Primary Action
                      </button>
                      
                      <button className="px-4 py-2 rounded-lg font-medium border transition-all hover:bg-gray-100/10" style={{
                        borderColor: 'var(--theme-border-color)',
                        color: 'var(--theme-text-color)'
                      }}>
                        Secondary Action
                      </button>
                      
                      <button className="px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-70" style={{
                        color: 'var(--theme-accent-color)'
                      }}>
                        Text Link
                      </button>
                    </div>
                  </div>
                  
                  {/* Code Block */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--theme-heading-color)' }}>
                      Code Example
                    </h4>
                    <div className="p-4 rounded-lg" style={{
                      backgroundColor: 'var(--theme-card-bg)',
                      border: '1px solid var(--theme-border-color)'
                    }}>
                      <pre style={{ 
                        fontFamily: 'var(--theme-code-font)',
                        color: 'var(--theme-text-color)'
                      }}>
                        <code>
{`function applyTheme(theme) {
  document.body.className = theme;
  console.log('Theme applied:', theme);
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  {/* Cards */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--theme-heading-color)' }}>
                      Card Components
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg" style={{
                        backgroundColor: 'var(--theme-card-bg)',
                        border: '1px solid var(--theme-border-color)'
                      }}>
                        <h5 className="font-semibold mb-2" style={{ color: 'var(--theme-heading-color)' }}>
                          Feature Card
                        </h5>
                        <p className="text-sm" style={{ color: 'var(--theme-muted-color)' }}>
                          This card demonstrates how content containers appear with the current theme.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{
                        backgroundColor: 'var(--theme-card-bg)',
                        border: '1px solid var(--theme-border-color)'
                      }}>
                        <h5 className="font-semibold mb-2" style={{ color: 'var(--theme-heading-color)' }}>
                          Info Card
                        </h5>
                        <p className="text-sm" style={{ color: 'var(--theme-muted-color)' }}>
                          Perfect for displaying information in a structured, visually appealing format.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}