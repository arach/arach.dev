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
  const [selectedFont, setSelectedFont] = useState<string | null>(null)

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
    
    Object.entries(theme.fonts).forEach(([fontKey, fontData]) => {
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
      <div className="flex gap-1 p-1 bg-muted/20 rounded-lg border border-border">
        {[
          { id: 'fonts', label: 'Font Families', icon: '◉' },
          { id: 'scale', label: 'Type Scale', icon: '▤' },
          { id: 'hierarchy', label: 'Hierarchy', icon: '☰' },
          { id: 'specimens', label: 'Specimens', icon: '✎' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/30 shadow-sm shadow-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/20 border border-transparent'
            }`}
          >
            <span className="opacity-60">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Font Families Tab */}
      {activeTab === 'fonts' && (
        <div className="space-y-6">
          {themeFonts.map((font) => (
            <div 
              key={font.key}
              className="p-6 glass-panel hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer border-l-2 border-l-primary/20"
              onClick={() => setSelectedFont(selectedFont === font.key ? null : font.key)}
              data-style-element="font"
              data-element-name={`${font.name} Font`}
              data-description={font.description}
              data-classes={font.classes}
              data-variant={font.type}
              data-usage={`font-family: ${font.family}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-semibold text-foreground">{font.name}</h4>
                    <span className="px-2.5 py-1 text-xs font-medium bg-primary/15 text-primary rounded-md border border-primary/20 shadow-sm">
                      {font.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{font.description}</p>
                  <p className="text-xs text-muted-foreground">Use for: {font.usage}</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {selectedFont === font.key ? (
                      <path d="m18 15-6-6-6 6"/>
                    ) : (
                      <path d="m6 9 6 6 6-6"/>
                    )}
                  </svg>
                </button>
              </div>

              {/* Font Preview */}
              <div className="space-y-4" style={{ fontFamily: font.family }}>
                {/* Large preview */}
                <div className="pb-4 border-b border-border/50">
                  <div className="text-6xl font-bold tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Aa</div>
                  <div className="text-2xl text-muted-foreground/90">
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>

                {/* Character sets */}
                {(selectedFont === font.key || !selectedFont) && (
                  <div className="grid gap-3 text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground font-sans block mb-1">UPPERCASE</span>
                      <div className="font-medium tracking-wide">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-sans block mb-1">LOWERCASE</span>
                      <div className="font-medium">abcdefghijklmnopqrstuvwxyz</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-sans block mb-1">NUMBERS & SYMBOLS</span>
                      <div className="font-medium">{'0123456789 !@#$%^&*()_+-=[]{}|;:,.<>?'}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Technical details (expanded view) */}
              {selectedFont === font.key && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground block mb-1">CSS Class</span>
                      <code className="font-mono text-foreground bg-muted/30 px-2 py-1 rounded">
                        {font.classes}
                      </code>
                    </div>
                    {font.provider && (
                      <div>
                        <span className="text-muted-foreground block mb-1">Provider</span>
                        <span className="text-foreground">{font.provider}</span>
                      </div>
                    )}
                    <div className="col-span-2">
                      <span className="text-muted-foreground block mb-1">Font Stack</span>
                      <code className="font-mono text-foreground text-xs break-all">
                        {font.family}
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Type Scale Tab */}
      {activeTab === 'scale' && (
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-6">Type Scale</h3>
          <div className="space-y-6">
            {typeScale.map((item, index) => (
              <div 
                key={index}
                className="flex items-baseline gap-6 pb-6 border-b border-border last:border-0"
                data-style-element="type-scale"
                data-element-name={item.name}
                data-classes={item.className}
                data-size={item.size}
                data-line-height={item.lineHeight}
                data-letter-spacing={item.letterSpacing}
              >
                <div className="w-32 flex-shrink-0">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">
                    {item.size} / {item.lineHeight}
                    {item.letterSpacing && ` / ${item.letterSpacing}`}
                  </div>
                </div>
                <div className={`flex-1 ${item.className} font-medium`}>
                  {item.example}
                </div>
                <code className="text-xs font-mono text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                  {item.className}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hierarchy Tab */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6">
          {hierarchyExamples.map((example, index) => (
            <div key={index} className="p-6 glass-panel">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                {example.title}
              </h4>
              <div className="space-y-1">
                {example.elements.map((element, elemIndex) => (
                  <div key={elemIndex} className="group">
                    <div className="flex items-start gap-4">
                      <span className="text-xs text-muted-foreground font-mono mt-1 w-20 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {element.label}
                      </span>
                      <div className={element.className}>
                        {element.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
          )}
        </div>
      )}

      {/* Specimens Tab - Enhanced with more comprehensive examples */}
      {activeTab === 'specimens' && (
        <div className="space-y-6">
          {/* Reading Experience */}
          <div className="p-8 glass-panel">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📖</span>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Reading Experience
                </h4>
                <p className="text-xs text-muted-foreground">Optimized for long-form content</p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed font-medium text-foreground">
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

          {/* Article Structure */}
          <div className="p-8 glass-panel">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📰</span>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Article Structure
                </h4>
                <p className="text-xs text-muted-foreground">Editorial content hierarchy</p>
              </div>
            </div>
            <article className="max-w-3xl mx-auto space-y-6">
              <header className="space-y-3">
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
            </article>
          </div>

          {/* Data Display */}
          <div className="p-8 glass-panel">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Data & Tables
                </h4>
                <p className="text-xs text-muted-foreground">Tabular data presentation</p>
              </div>
            </div>
            <div className="space-y-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3">Type Scale</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3">Size</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3">Line Height</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3">Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr className="hover:bg-muted/10 transition-colors">
                    <td className="py-3 font-medium">Display</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">48-60px</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">1.0-1.1</td>
                    <td className="py-3 text-sm text-muted-foreground">Hero sections, marketing</td>
                  </tr>
                  <tr className="hover:bg-muted/10 transition-colors">
                    <td className="py-3 font-medium">Heading</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">18-30px</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">1.2-1.5</td>
                    <td className="py-3 text-sm text-muted-foreground">Section titles, navigation</td>
                  </tr>
                  <tr className="hover:bg-muted/10 transition-colors">
                    <td className="py-3 font-medium">Body</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">14-16px</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">1.5-1.6</td>
                    <td className="py-3 text-sm text-muted-foreground">Content, descriptions</td>
                  </tr>
                  <tr className="hover:bg-muted/10 transition-colors">
                    <td className="py-3 font-medium">Caption</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">10-12px</td>
                    <td className="py-3 font-mono text-sm text-muted-foreground">1.4-1.5</td>
                    <td className="py-3 text-sm text-muted-foreground">Labels, metadata</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Specimen */}
          {themeFonts.some(f => f.type === 'Monospace' || f.type === 'Display Monospace') && (
            <div className="p-8 glass-panel">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">💻</span>
                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    Code Display
                  </h4>
                  <p className="text-xs text-muted-foreground">Monospace font rendering</p>
                </div>
              </div>
              <div className="space-y-4">
                <pre className="font-mono text-sm bg-black/30 p-6 rounded-lg overflow-x-auto border border-border/20">
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
                <div className="p-4 bg-muted/10 rounded-lg border border-border/20 space-y-2">
                  <p className="text-sm">
                    Inline code like <code className="font-mono text-sm bg-black/20 px-1.5 py-0.5 rounded text-primary">const value = 42;</code> uses 
                    the monospace font family.
                  </p>
                  <p className="text-sm">
                    Terminal commands: <code className="font-mono text-sm bg-black/20 px-1.5 py-0.5 rounded text-green-400">$ npm install typography</code>
                  </p>
                  <p className="text-sm">
                    File paths: <code className="font-mono text-sm bg-black/20 px-1.5 py-0.5 rounded text-blue-400">/src/styles/typography.css</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Typography Combinations */}
          <div className="p-8 glass-panel">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🎨</span>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Style Combinations
                </h4>
                <p className="text-xs text-muted-foreground">Font weight and style variations</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weights */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Weights</h5>
                <div className="space-y-2">
                  <p className="text-lg" style={{ fontWeight: 100 }}>Thin (100)</p>
                  <p className="text-lg" style={{ fontWeight: 300 }}>Light (300)</p>
                  <p className="text-lg" style={{ fontWeight: 400 }}>Regular (400)</p>
                  <p className="text-lg" style={{ fontWeight: 500 }}>Medium (500)</p>
                  <p className="text-lg" style={{ fontWeight: 600 }}>Semibold (600)</p>
                  <p className="text-lg" style={{ fontWeight: 700 }}>Bold (700)</p>
                  <p className="text-lg" style={{ fontWeight: 900 }}>Black (900)</p>
                </div>
              </div>
              
              {/* Styles */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Styles</h5>
                <div className="space-y-2">
                  <p className="text-lg">Regular Style</p>
                  <p className="text-lg italic">Italic Style</p>
                  <p className="text-lg underline">Underlined Text</p>
                  <p className="text-lg line-through">Strikethrough Text</p>
                  <p className="text-lg uppercase">Uppercase Text</p>
                  <p className="text-lg lowercase">LOWERCASE TEXT</p>
                  <p className="text-lg capitalize">capitalized text</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}