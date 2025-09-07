'use client'

import React, { useState } from 'react'
import type { Theme } from '@/types/theme'

interface TypographySectionProps {
  theme?: Theme | null
}

interface FontSample {
  text: string
  size: string
  weight: string
  className?: string
}

interface ThemeFont {
  name: string
  type: string
  usage: string
  description: string
  classes: string
  family?: string
  provider?: string
  import?: string
  isThemeFont: boolean
  samples: FontSample[]
  key: string
}

interface TypographyScale {
  name: string
  className: string
  size: string
  lineHeight: string
  letterSpacing?: string
  example: string
}

export function TypographySection({ theme }: TypographySectionProps) {
  const [activeTab, setActiveTab] = useState<'fonts' | 'scale' | 'hierarchy' | 'specimens'>('fonts')

  if (!theme) {
    return (
      <section className="space-y-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Typography</h3>
          <p className="text-sm text-muted-foreground">No theme data available</p>
        </div>
      </section>
    )
  }

  // Generate theme fonts from theme data
  const getThemeFonts = (): ThemeFont[] => {
    if (!theme.fonts) return []
    
    const fonts: ThemeFont[] = []
    const addedFonts = new Set<string>() // Track fonts we've already added to avoid duplicates
    
    // Define font order: sans-serif first, then display, then mono
    const fontOrder = ['sans', 'ui', 'display', 'mono']
    const orderedFontEntries = Object.entries(theme.fonts).sort(([a], [b]) => {
      const aIndex = fontOrder.indexOf(a)
      const bIndex = fontOrder.indexOf(b)
      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
    
    orderedFontEntries.forEach(([fontKey, fontData]) => {
      // Handle new format (objects with name/family)
      if (typeof fontData === 'object' && fontData.name && fontData.family) {
        // Skip if we've already added this font (e.g., Geist Sans used for both sans and ui)
        if (addedFonts.has(fontData.name)) {
          return
        }
        addedFonts.add(fontData.name)
        
        const isMono = fontKey === 'mono' || fontData.family.includes('mono') || fontData.family.includes('Mono')
        const isDisplay = fontKey === 'display'
        
        let type = 'Sans-serif'
        let usage = 'Body text and UI elements'
        let description = `${theme.name} theme ${fontKey} font`
        
        if (isMono && !isDisplay) {
          type = 'Monospace'
          usage = 'Code blocks, data, and technical content'
          description = `${theme.name} theme monospace font optimized for code readability`
        } else if (isDisplay && isMono) {
          type = 'Display Monospace'
          usage = 'Large monospace headlines and feature text'
          description = `${theme.name} theme display font for impactful monospace headers`
        } else if (isDisplay) {
          type = 'Display'
          usage = 'Large headlines and hero text'
          description = `${theme.name} theme display font for impactful headers`
        }
        
        fonts.push({
          name: fontData.name,
          type,
          usage,
          description,
          classes: `font-${fontKey}`,
          family: fontData.family,
          provider: fontData.provider,
          import: fontData.import,
          isThemeFont: true,
          samples: [],
          key: `font-${fontData.name.replace(/\s+/g, '-').toLowerCase()}`
        })
      }
      // Handle old format (just strings) - like Directory theme
      else if (typeof fontData === 'string') {
        const fontString = fontData as string
        const isMono = fontKey === 'mono' || fontString.includes('mono')
        
        let name = isMono ? 'System Monospace' : 'System Sans'
        let type = isMono ? 'Monospace' : 'Sans-serif'
        let usage = isMono ? 'Code and technical content' : 'Body text and UI elements'
        
        // Skip if we've already added a system font of this type
        if (addedFonts.has(name)) {
          return
        }
        addedFonts.add(name)
        
        fonts.push({
          name,
          type,
          usage,
          description: `${theme.name} theme ${fontKey} font stack`,
          classes: `font-${fontKey}`,
          family: fontString,
          provider: 'system',
          isThemeFont: true,
          samples: [],
          key: `font-${fontKey}`
        })
      }
    })
    
    return fonts
  }

  // Generate type scale
  const getTypeScale = (): TypographyScale[] => {
    return [
      { name: 'Display XL', className: 'text-6xl', size: '60px', lineHeight: '1', letterSpacing: '-0.02em', example: 'Display Extra Large' },
      { name: 'Display L', className: 'text-5xl', size: '48px', lineHeight: '1', letterSpacing: '-0.02em', example: 'Display Large' },
      { name: 'Display M', className: 'text-4xl', size: '36px', lineHeight: '1.1', letterSpacing: '-0.01em', example: 'Display Medium' },
      { name: 'Heading 1', className: 'text-3xl', size: '30px', lineHeight: '1.2', example: 'Heading Level 1' },
      { name: 'Heading 2', className: 'text-2xl', size: '24px', lineHeight: '1.3', example: 'Heading Level 2' },
      { name: 'Heading 3', className: 'text-xl', size: '20px', lineHeight: '1.4', example: 'Heading Level 3' },
      { name: 'Heading 4', className: 'text-lg', size: '18px', lineHeight: '1.5', example: 'Heading Level 4' },
      { name: 'Body Large', className: 'text-base', size: '16px', lineHeight: '1.6', example: 'Large body text for emphasis' },
      { name: 'Body', className: 'text-sm', size: '14px', lineHeight: '1.5', example: 'Regular body text for content' },
      { name: 'Body Small', className: 'text-xs', size: '12px', lineHeight: '1.5', example: 'Small body text for captions' },
      { name: 'Caption', className: 'text-xs', size: '11px', lineHeight: '1.4', letterSpacing: '0.01em', example: 'Caption or metadata' },
      { name: 'Overline', className: 'text-xs uppercase', size: '10px', lineHeight: '1.5', letterSpacing: '0.1em', example: 'OVERLINE TEXT' }
    ]
  }

  // Get typography hierarchy examples
  const getHierarchyExamples = () => {
    return [
      {
        title: 'Article Layout',
        elements: [
          { label: 'Category', className: 'text-xs uppercase tracking-wider text-muted-foreground font-semibold', text: 'TECHNOLOGY' },
          { label: 'Headline', className: 'text-4xl font-bold mt-2 mb-3', text: 'The Future of Design Systems' },
          { label: 'Subtitle', className: 'text-xl text-muted-foreground mb-4', text: 'How modern tools are reshaping digital experiences' },
          { label: 'Meta', className: 'text-sm text-muted-foreground mb-6', text: 'By Sarah Chen • 5 min read • Dec 15, 2024' },
          { label: 'Body', className: 'text-base leading-relaxed', text: 'Design systems have evolved from simple style guides to comprehensive platforms that enable teams to build consistent, scalable digital products. This transformation reflects broader changes in how we approach design and development.' }
        ]
      },
      {
        title: 'Dashboard Metrics',
        elements: [
          { label: 'Label', className: 'text-xs uppercase tracking-wider text-muted-foreground font-medium', text: 'TOTAL REVENUE' },
          { label: 'Value', className: 'text-5xl font-bold tracking-tight mt-1', text: '$47,892' },
          { label: 'Change', className: 'text-sm font-medium text-green-500 mt-2', text: '↑ 12.5% from last month' },
          { label: 'Description', className: 'text-xs text-muted-foreground mt-3', text: 'Based on 1,429 transactions' }
        ]
      },
      {
        title: 'Card Component',
        elements: [
          { label: 'Eyebrow', className: 'text-xs font-semibold text-primary uppercase tracking-wider', text: 'NEW FEATURE' },
          { label: 'Title', className: 'text-lg font-semibold mt-2', text: 'Advanced Analytics' },
          { label: 'Description', className: 'text-sm text-muted-foreground mt-2', text: 'Get deeper insights with our new analytics dashboard featuring real-time data visualization.' },
          { label: 'CTA', className: 'text-sm font-medium text-primary mt-4', text: 'Learn more →' }
        ]
      }
    ]
  }

  const themeFonts = getThemeFonts()
  const typeScale = getTypeScale()
  const hierarchyExamples = getHierarchyExamples()

  return (
    <section className="space-y-6">
      {/* Tab Navigation */}
      <div className="relative">
        {/* Background container */}
        <div className="flex gap-1 p-1 bg-black/20 rounded-xl backdrop-blur-sm">
          {[
            { id: 'fonts', label: 'Font Families', icon: '◉' },
            { id: 'scale', label: 'Type Scale', icon: '▤' },
            { id: 'hierarchy', label: 'Hierarchy', icon: '☰' },
            { id: 'specimens', label: 'Specimens', icon: '✎' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm shadow-lg shadow-black/20'
                  : 'text-muted-foreground hover:text-white hover:bg-slate-800/20'
              }`}
            >
              {/* Active tab indicator */}
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 via-slate-500/5 to-slate-600/10 rounded-lg" />
              )}
              
              {/* Content */}
              <div className="relative flex items-center gap-2">
                <span className={`text-base ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
                  {tab.icon}
                </span>
                <span className="font-semibold">{tab.label}</span>
              </div>
              
              {/* Active tab glow effect */}
              {activeTab === tab.id && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-slate-500/3 to-transparent" />
              )}
            </button>
          ))}
        </div>
        
        {/* Subtle border */}
        <div className="absolute inset-0 rounded-xl border border-gray-800/20 pointer-events-none" />
      </div>

      {/* Font Families Tab */}
      {activeTab === 'fonts' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {themeFonts.map((font, index) => {
            const isMono = font.type.includes('Monospace')
            const isDisplay = font.type.includes('Display')
            const bgGradient = isMono 
              ? 'from-slate-900/40 via-slate-800/30 to-slate-900/40' 
              : isDisplay 
                ? 'from-purple-900/30 via-indigo-900/20 to-purple-900/30'
                : 'from-blue-900/30 via-cyan-900/20 to-blue-900/30'
            
            return (
              <div 
                key={font.key}
                className="group relative overflow-hidden rounded-xl border border-gray-800/30 bg-gradient-to-br backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-gray-600/50 transition-all duration-300"
                data-style-element="font"
                data-element-name={`${font.name} Font`}
                data-description={font.description}
                data-classes={font.classes}
                data-variant={font.type}
                data-usage={`font-family: ${font.family}`}
                data-provider={font.provider}
                data-family={font.family}
                data-type={font.type}
                data-usage-context={font.usage}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${isMono ? 'bg-green-400' : isDisplay ? 'bg-purple-400' : 'bg-blue-400'} shadow-lg shadow-current/30`} />
                          <h4 className="text-xl font-bold text-white tracking-tight">{font.name}</h4>
                        </div>
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border shadow-sm ${
                          isMono 
                            ? 'bg-green-500/15 text-green-400 border-green-500/30' 
                            : isDisplay 
                              ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                              : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        }`}>
                          {font.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-2xl">{font.description}</p>
                      <p className="text-xs text-muted-foreground/80 font-medium">Use for: {font.usage}</p>
                    </div>
                  </div>

                  {/* Enhanced Font Preview */}
                  <div className="space-y-6" style={{ fontFamily: font.family }}>
                    {/* Hero Preview */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg" />
                      <div className="relative p-6 bg-black/20 rounded-lg">
                        <div className="text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                          {isMono ? 'Aa' : 'Aa'}
                        </div>
                        <div className="text-xl text-muted-foreground/90 leading-relaxed">
                          The quick brown fox jumps over the lazy dog
                        </div>
                        {isMono && (
                          <div className="mt-6 space-y-3">
                            <div className="text-sm text-white font-sans uppercase tracking-wider">Code Examples</div>
                            <div className="space-y-2">
                              <div className="text-lg text-green-400 font-mono">
                                <span className="text-blue-400">const</span> <span className="text-yellow-400">message</span> = <span className="text-orange-400">'Hello, World!'</span>;
                              </div>
                              <div className="text-lg text-green-400 font-mono">
                                <span className="text-blue-400">function</span> <span className="text-yellow-400">calculate</span>(<span className="text-orange-400">x</span>, <span className="text-orange-400">y</span>) <span className="text-blue-400">{'{'}</span>
                              </div>
                              <div className="text-lg text-green-400 font-mono ml-4">
                                <span className="text-blue-400">return</span> <span className="text-orange-400">x</span> + <span className="text-orange-400">y</span>;
                              </div>
                              <div className="text-lg text-green-400 font-mono">
                                <span className="text-blue-400">{'}'}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Character Sets */}
                    <div className="grid gap-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <span className="text-xs text-white font-sans block mb-1 font-semibold uppercase tracking-wider">UPPERCASE</span>
                        <div className="text-base font-medium tracking-wide text-foreground/90">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <span className="text-xs text-white font-sans block mb-1 font-semibold uppercase tracking-wider">LOWERCASE</span>
                        <div className="text-base font-medium text-foreground/90">abcdefghijklmnopqrstuvwxyz</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <span className="text-xs text-white font-sans block mb-1 font-semibold uppercase tracking-wider">NUMBERS & SYMBOLS</span>
                        <div className="text-base font-medium text-foreground/90">{'0123456789 !@#$%^&*()_+-=[]{}|;:,.<>?'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Technical Specifications</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-white font-medium uppercase tracking-wider">CSS Class</span>
                        <code className="block font-mono text-xs text-foreground bg-black/30 px-2 py-1 rounded border border-border/20">
                          {font.classes}
                        </code>
                      </div>
                      {font.provider && (
                        <div className="space-y-1">
                          <span className="text-xs text-white font-medium uppercase tracking-wider">Provider</span>
                          <div className="text-xs text-foreground bg-black/20 px-2 py-1 rounded border border-border/20">
                            {font.provider}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1 md:col-span-2 lg:col-span-1">
                        <span className="text-xs text-white font-medium uppercase tracking-wider">Font Stack</span>
                        <code className="block font-mono text-xs text-foreground bg-black/30 px-2 py-1 rounded border border-border/20 break-all">
                          {font.family}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Type Scale Tab */}
      {activeTab === 'scale' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-white tracking-tight">Type Scale</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive typographic hierarchy designed for optimal readability and visual impact across all interface elements.
            </p>
          </div>

          {/* Scale Overview */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
            <div className="relative p-6">
              <div className="space-y-6">
                {typeScale.map((item, index) => {
                  const isDisplay = item.name.includes('Display')
                  const isHeading = item.name.includes('Heading')
                  const isBody = item.name.includes('Body')
                  const isMeta = item.name.includes('Caption') || item.name.includes('Overline')
                  
                  return (
                    <div 
                      key={index}
                      className="group relative p-4 rounded-lg hover:bg-white/5 transition-colors"
                      data-style-element="type-scale"
                      data-element-name={item.name}
                      data-classes={item.className}
                      data-size={item.size}
                      data-line-height={item.lineHeight}
                      data-letter-spacing={item.letterSpacing}
                      data-category={isDisplay ? 'display' : isHeading ? 'heading' : isBody ? 'body' : 'meta'}
                    >
                      <div className="flex items-center gap-6">
                        {/* Metadata */}
                        <div className="w-32 flex-shrink-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${
                              isDisplay ? 'bg-purple-400' : 
                              isHeading ? 'bg-blue-400' : 
                              isBody ? 'bg-green-400' : 'bg-orange-400'
                            } shadow-sm`} />
                            <h4 className="text-sm font-semibold text-white">
                              {item.name}
                            </h4>
                          </div>
                          <div className="text-xs text-muted-foreground font-mono space-y-1">
                            <div>{item.size}</div>
                            <div>LH: {item.lineHeight}</div>
                            {item.letterSpacing && <div>LS: {item.letterSpacing}</div>}
                          </div>
                        </div>

                        {/* Typography Preview */}
                        <div className="flex-1 min-w-0">
                          <div className={`${item.className} font-medium leading-none text-white`}>
                            {item.example}
                          </div>
                        </div>

                        {/* CSS Class */}
                        <div className="flex-shrink-0">
                          <code className="text-xs font-mono text-muted-foreground bg-black/30 px-3 py-2 rounded border border-gray-700/30 group-hover:bg-black/40 transition-colors">
                            {item.className}
                          </code>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <h4 className="text-sm font-semibold text-white">Display</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Large, impactful text for hero sections, marketing headlines, and key messaging.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <h4 className="text-sm font-semibold text-white">Headings</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Section titles, navigation labels, and content hierarchy markers.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <h4 className="text-sm font-semibold text-white">Body</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Primary content text, descriptions, and general interface copy.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-orange-900/20 to-orange-800/10 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <h4 className="text-sm font-semibold text-white">Meta</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Captions, labels, metadata, and secondary information.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hierarchy Tab */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-white tracking-tight">Typography Hierarchy</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world examples demonstrating how typography creates clear information architecture and guides user attention.
            </p>
          </div>

          <div className="space-y-8">
            {hierarchyExamples.map((example, index) => {
              const bgGradient = index === 0 
                ? 'from-blue-900/20 via-indigo-900/10 to-blue-900/20'
                : index === 1 
                  ? 'from-green-900/20 via-emerald-900/10 to-green-900/20'
                  : 'from-purple-900/20 via-violet-900/10 to-purple-900/20'
              
              return (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br backdrop-blur-sm"
                  data-style-element="hierarchy"
                  data-element-name={`${example.title} Example`}
                  data-description={`Typography hierarchy example: ${example.title}`}
                  data-type="hierarchy"
                  data-variant={example.title.toLowerCase().replace(/\s+/g, '-')}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
                  
                  <div className="relative p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-400' : 
                        index === 1 ? 'bg-green-400' : 'bg-purple-400'
                      } shadow-lg shadow-current/30`} />
                      <h4 className="text-xl font-bold text-white tracking-tight">
                        {example.title}
                      </h4>
                    </div>
                    
                    <div className="space-y-4">
                      {example.elements.map((element, elemIndex) => (
                        <div 
                          key={elemIndex} 
                          className="group relative p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                          data-style-element="hierarchy-element"
                          data-element-name={element.label}
                          data-classes={element.className}
                          data-type="hierarchy-element"
                          data-variant={element.label.toLowerCase().replace(/\s+/g, '-')}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-xs text-white font-mono mt-1 w-24 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity font-semibold uppercase tracking-wider">
                              {element.label}
                            </span>
                            <div className={`${element.className} flex-1`}>
                              {element.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Specimens Tab - Enhanced with more comprehensive examples */}
      {activeTab === 'specimens' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-white tracking-tight">Typography Specimens</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive examples showcasing typography in real-world contexts, from editorial content to data visualization.
            </p>
          </div>

          {/* Reading Experience */}
          <div 
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-blue-900/20 backdrop-blur-sm"
            data-style-element="specimen"
            data-element-name="Reading Experience"
            data-description="Long-form content typography optimized for readability"
            data-type="specimen"
            data-variant="reading"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
            <div className="relative p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <span className="text-2xl">📖</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    Reading Experience
                  </h4>
                  <p className="text-sm text-muted-foreground">Optimized for long-form content and editorial layouts</p>
                </div>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="p-8 bg-black/20 rounded-xl border border-white/10 space-y-6">
                  <p className="text-xl leading-relaxed font-medium text-foreground">
                    Typography is the craft of endowing human language with a durable visual form, and thus with an independent existence.
                  </p>
                  <p className="text-base leading-relaxed text-foreground/90">
                    In the evolving landscape of digital design, typography serves as the foundation of user experience. 
                    Well-chosen typefaces not only convey information but also establish mood, hierarchy, and brand identity. 
                    The interplay between different font weights, sizes, and spacing creates a visual rhythm that guides users 
                    through content naturally and intuitively.
                  </p>
                  <p className="text-base leading-relaxed text-foreground/90">
                    Modern design systems recognize that typography is more than aesthetic choice—it's a functional tool that 
                    impacts readability, accessibility, and user engagement. By establishing clear typographic scales and 
                    consistent application rules, teams can create cohesive experiences across diverse platforms and devices.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The relationship between typography and user interface design continues to evolve with technological advancement. 
                    Variable fonts, responsive type scales, and dynamic layouts present new opportunities for creating adaptive, 
                    accessible typography systems that respond intelligently to context and user preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Article Structure */}
          <div 
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/20 via-emerald-900/10 to-green-900/20 backdrop-blur-sm"
            data-style-element="specimen"
            data-element-name="Article Structure"
            data-description="Editorial content hierarchy and article layout"
            data-type="specimen"
            data-variant="article"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
            <div className="relative p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                  <span className="text-2xl">📰</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    Article Structure
                  </h4>
                  <p className="text-sm text-muted-foreground">Editorial content hierarchy and structured layouts</p>
                </div>
              </div>
              <article className="max-w-4xl mx-auto">
                <div className="p-8 bg-black/20 rounded-xl space-y-8">
                  <header className="space-y-4">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">DESIGN SYSTEMS</div>
                    <h2 className="text-4xl font-bold leading-tight">Building Scalable Typography Systems</h2>
                    <p className="text-xl text-muted-foreground">A comprehensive guide to creating flexible and maintainable type scales</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <span>By Alex Rivera</span>
                      <span>•</span>
                      <span>December 15, 2024</span>
                      <span>•</span>
                      <span>12 min read</span>
                    </div>
                  </header>
                  
                  <div className="space-y-6">
                    <div className="text-lg leading-relaxed font-medium">
                      A well-designed typography system is the foundation of any successful digital product. It ensures consistency, 
                      improves readability, and enhances the overall user experience.
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold mt-8 mb-3">Key Principles</h3>
                      <p className="text-base leading-relaxed">
                        When building a typography system, consider these fundamental principles:
                      </p>
                      <ul className="space-y-3 ml-6">
                        <li className="text-base flex items-start">
                          <span className="text-primary mr-3 mt-1">→</span>
                          <div>
                            <strong className="font-semibold">Hierarchy:</strong>
                            <span className="text-muted-foreground ml-1">Establish clear visual relationships between different text elements</span>
                          </div>
                        </li>
                        <li className="text-base flex items-start">
                          <span className="text-primary mr-3 mt-1">→</span>
                          <div>
                            <strong className="font-semibold">Consistency:</strong>
                            <span className="text-muted-foreground ml-1">Maintain uniform treatment across all touchpoints</span>
                          </div>
                        </li>
                        <li className="text-base flex items-start">
                          <span className="text-primary mr-3 mt-1">→</span>
                          <div>
                            <strong className="font-semibold">Flexibility:</strong>
                            <span className="text-muted-foreground ml-1">Design for various contexts and screen sizes</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <blockquote className="border-l-4 border-primary/50 pl-6 py-4 my-8 bg-primary/5 rounded-r-lg">
                      <p className="text-lg italic text-foreground/80 mb-2">
                        "Typography is two-dimensional architecture, based on experience and imagination, and guided by rules and readability."
                      </p>
                      <cite className="text-sm text-muted-foreground not-italic">— Hermann Zapf</cite>
                    </blockquote>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* Data Display */}
          <div 
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-purple-900/20 backdrop-blur-sm"
            data-style-element="specimen"
            data-element-name="Data & Tables"
            data-description="Tabular data presentation and data visualization typography"
            data-type="specimen"
            data-variant="data"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
            <div className="relative p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    Data & Tables
                  </h4>
                  <p className="text-sm text-muted-foreground">Tabular data presentation and structured information</p>
                </div>
              </div>
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">Type Scale</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">Size</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">Line Height</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-medium text-foreground">Display</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">48-60px</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">1.0-1.1</td>
                      <td className="py-4 text-sm text-muted-foreground">Hero sections, marketing</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-medium text-foreground">Heading</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">18-30px</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">1.2-1.5</td>
                      <td className="py-4 text-sm text-muted-foreground">Section titles, navigation</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-medium text-foreground">Body</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">14-16px</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">1.5-1.6</td>
                      <td className="py-4 text-sm text-muted-foreground">Content, descriptions</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-medium text-foreground">Caption</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">10-12px</td>
                      <td className="py-4 font-mono text-sm text-muted-foreground">1.4-1.5</td>
                      <td className="py-4 text-sm text-muted-foreground">Labels, metadata</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Code Specimen */}
          {themeFonts.some(f => f.type === 'Monospace' || f.type === 'Display Monospace') && (
            <div 
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 backdrop-blur-sm"
              data-style-element="specimen"
              data-element-name="Code Display"
              data-description="Monospace font rendering for code and technical content"
              data-type="specimen"
              data-variant="code"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    Code Display
                  </h4>
                    <p className="text-sm text-muted-foreground">Monospace font rendering for code and technical content</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <pre className="font-mono text-sm bg-black/40 p-8 rounded-xl overflow-x-auto border border-border/30 shadow-lg">
                    <code className="text-foreground/90">{`// Typography System Configuration
import { defineTypeScale } from '@design-system/core';

export const typography = defineTypeScale({
  // Display sizes for impact
  display: {
    xl: { 
      fontSize: '3.75rem',   // 60px
      lineHeight: 1,
      letterSpacing: '-0.025em',
      fontWeight: 700
    },
    lg: { 
      fontSize: '3rem',      // 48px
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      fontWeight: 700
    }
  },
  
  // Heading sizes for structure
  heading: {
    h1: { fontSize: '1.875rem', lineHeight: 1.25, fontWeight: 600 },
    h2: { fontSize: '1.5rem', lineHeight: 1.35, fontWeight: 600 },
    h3: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 500 },
    h4: { fontSize: '1.125rem', lineHeight: 1.5, fontWeight: 500 }
  },
  
  // Body text for content
  body: {
    large: { fontSize: '1rem', lineHeight: 1.625 },
    regular: { fontSize: '0.875rem', lineHeight: 1.5 },
    small: { fontSize: '0.75rem', lineHeight: 1.5 }
  },
  
  // Utility sizes
  meta: {
    caption: { fontSize: '0.75rem', lineHeight: 1.4 },
    overline: { 
      fontSize: '0.625rem', 
      lineHeight: 1.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }
});`}</code>
                  </pre>
                  
                  {/* Inline code examples */}
                  <div className="p-6 bg-black/20 rounded-xl space-y-4">
                    <h5 className="text-sm font-semibold text-white uppercase tracking-wider">Inline Code Examples</h5>
                    <div className="space-y-3">
                      <p className="text-sm text-foreground/90">
                        Inline code like <code className="font-mono text-sm bg-black/30 px-2 py-1 rounded text-primary border border-primary/20">const value = 42;</code> uses 
                        the monospace font family.
                      </p>
                      <p className="text-sm text-foreground/90">
                        Terminal commands: <code className="font-mono text-sm bg-black/30 px-2 py-1 rounded text-green-400 border border-green-500/20">$ npm install typography</code>
                      </p>
                      <p className="text-sm text-foreground/90">
                        File paths: <code className="font-mono text-sm bg-black/30 px-2 py-1 rounded text-blue-400 border border-blue-500/20">/src/styles/typography.css</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Typography Combinations */}
          <div 
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-900/20 via-amber-900/10 to-orange-900/20 backdrop-blur-sm"
            data-style-element="specimen"
            data-element-name="Style Combinations"
            data-description="Font weight and style variations for comprehensive typography"
            data-type="specimen"
            data-variant="combinations"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
            <div className="relative p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    Style Combinations
                  </h4>
                  <p className="text-sm text-muted-foreground">Font weight and style variations for comprehensive typography</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weights */}
                <div className="p-6 bg-black/20 rounded-xl">
                  <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    Font Weights
                  </h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-muted-foreground font-mono">100</span>
                      <p className="text-lg text-foreground" style={{ fontWeight: 100 }}>Thin Weight</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-muted-foreground font-mono">300</span>
                      <p className="text-lg text-foreground" style={{ fontWeight: 300 }}>Light Weight</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-muted-foreground font-mono">400</span>
                      <p className="text-lg text-foreground" style={{ fontWeight: 400 }}>Regular Weight</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-muted-foreground font-mono">500</span>
                      <p className="text-lg text-foreground" style={{ fontWeight: 500 }}>Medium Weight</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-muted-foreground font-mono">600</span>
                      <p className="text-lg text-foreground" style={{ fontWeight: 600 }}>Semibold Weight</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-muted-foreground font-mono">700</span>
                      <p className="text-lg text-foreground" style={{ fontWeight: 700 }}>Bold Weight</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-muted-foreground font-mono">900</span>
                      <p className="text-lg text-foreground" style={{ fontWeight: 900 }}>Black Weight</p>
                    </div>
                  </div>
                </div>
                
                {/* Styles */}
                <div className="p-6 bg-black/20 rounded-xl">
                  <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    Text Styles
                  </h5>
                  <div className="space-y-4">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-lg text-foreground">Regular Style</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-lg italic text-foreground">Italic Style</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-lg underline text-foreground">Underlined Text</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-lg line-through text-foreground">Strikethrough Text</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-lg uppercase text-foreground">Uppercase Text</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-lg lowercase text-foreground">LOWERCASE TEXT</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-lg capitalize text-foreground">capitalized text</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}