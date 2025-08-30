'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface TypographySectionProps {
  theme?: Theme | null
}

interface FontSample {
  text: string
  size: string
  weight: string
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
  key: string // Unique key for React rendering
}

interface TypographyElement {
  name: string
  description: string
  classes: string
  usage: string
  element?: keyof React.JSX.IntrinsicElements
  key: string // Unique key for React rendering
}

export function TypographySection({ theme }: TypographySectionProps) {
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
    
    Object.entries(theme.fonts).forEach(([fontKey, fontData]) => {
      if (typeof fontData === 'object' && fontData.name && fontData.family) {
        // Determine font type based on key or family
        const isMono = fontKey === 'mono' || fontData.family.includes('mono') || fontData.family.includes('Mono')
        const isDisplay = fontKey === 'display'
        const isUI = fontKey === 'ui'
        
        let type = 'Sans-serif'
        let usage = 'UI components and content'
        let description = `${theme.name} theme ${fontKey} font`
        
        if (isMono) {
          type = 'Monospace'
          usage = 'Code and technical content'
          description = `${theme.name} theme monospace font for code and technical content`
        } else if (isDisplay) {
          type = 'Display'
          usage = 'Headers and titles'
          description = `${theme.name} theme display font for headers and titles`
        } else if (isUI) {
          type = 'UI'
          usage = 'User interface elements'
          description = `${theme.name} theme UI font for interface elements`
        }
        
        // Generate samples from theme typography
        const samples = generateFontSamples(theme, fontKey, isMono)
        
        fonts.push({
          name: fontData.name,
          type,
          usage,
          description,
          classes: fontData.family.startsWith('var(--') ? fontData.family : `font-${fontKey}`,
          family: fontData.family,
          provider: fontData.provider,
          import: fontData.import,
          isThemeFont: true,
          samples,
          key: `font-${fontKey}` // Ensure unique key
        })
      }
    })
    
    return fonts
  }

  // Generate font samples from theme typography
  const generateFontSamples = (theme: Theme, fontKey: string, isMono: boolean): FontSample[] => {
    if (!theme.typography) return []
    
    const samples: FontSample[] = []
    const typographyEntries = Object.entries(theme.typography)
    
    // Find typography entries that match this font type
    const relevantEntries = typographyEntries.filter(([key, value]) => {
      if (typeof value !== 'string') return false
      
      // For monospace fonts, look for code-related typography
      if (isMono) {
        return key.includes('code') || key.includes('mono') || key.includes('data')
      }
      
      // For display fonts, look for header-related typography
      if (fontKey === 'display') {
        return key.includes('display') || key.includes('h1') || key.includes('h2') || key.includes('title')
      }
      
      // For UI fonts, look for UI-related typography
      if (fontKey === 'ui') {
        return key.includes('ui') || key.includes('label') || key.includes('button')
      }
      
      // For sans fonts, look for body and general typography
      return key.includes('body') || key.includes('h3') || key.includes('h4') || key.includes('p') || 
             (!key.includes('code') && !key.includes('mono') && !key.includes('display'))
    })

    // Generate samples from relevant typography entries
    relevantEntries.slice(0, 4).forEach(([key, classes], index) => {
      if (typeof classes === 'string') {
        // Extract size and weight from the classes
        const sizeMatch = classes.match(/text-(xs|sm|base|lg|xl|2xl|3xl|4xl)/)
        const weightMatch = classes.match(/font-(thin|light|normal|medium|semibold|bold|extrabold)/)
        
        const size = sizeMatch ? sizeMatch[0] : 'text-base'
        const weight = weightMatch ? weightMatch[0] : 'font-normal'
        
        // Generate appropriate sample text based on typography type
        let sampleText = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        
        if (isMono) {
          const codeSamples = [
            'const example = "Hello World"',
            'function setup() { return true; }',
            '// Comments and code annotations',
            'npm install @package/name'
          ]
          sampleText = codeSamples[index % codeSamples.length]
        } else if (key.includes('h1') || key.includes('display')) {
          sampleText = 'Primary Heading'
        } else if (key.includes('h2') || key.includes('title')) {
          sampleText = 'Section Title'
        } else if (key.includes('body')) {
          sampleText = 'Body text content'
        } else if (key.includes('label')) {
          sampleText = 'Form Label'
        } else if (key.includes('button')) {
          sampleText = 'Button Text'
        }
        
        samples.push({ text: sampleText, size, weight })
      }
    })

    return samples.slice(0, 4)
  }

  // Generate typography elements from theme
  const getTypographyElements = (): TypographyElement[] => {
    if (!theme.typography) return []
    
    const elements: TypographyElement[] = []
    const usedKeys = new Set<string>()
    
    // Look for heading typography
    const headingEntries = Object.entries(theme.typography).filter(([key, value]) => 
      typeof value === 'string' && (key.includes('h1') || key.includes('h2') || key.includes('h3') || key.includes('h4') || key.includes('display'))
    )
    
    headingEntries.forEach(([key, classes]) => {
      if (typeof classes === 'string') {
        const element = key.includes('h1') ? 'h1' : key.includes('h2') ? 'h2' : key.includes('h3') ? 'h3' : key.includes('h4') ? 'h4' : 'h1'
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
        
        // Ensure unique key
        let uniqueKey = `heading-${key}`
        let counter = 1
        while (usedKeys.has(uniqueKey)) {
          uniqueKey = `heading-${key}-${counter}`
          counter++
        }
        usedKeys.add(uniqueKey)
        
        elements.push({
          name,
          description: `Theme typography: ${key}`,
          classes,
          usage: `<${element} className="${classes}">${name}</${element}>`,
          element: element as keyof React.JSX.IntrinsicElements,
          key: uniqueKey
        })
      }
    })
    
    // Look for body text typography
    const bodyEntries = Object.entries(theme.typography).filter(([key, value]) => 
      typeof value === 'string' && (key.includes('body') || key.includes('p') || key.includes('text'))
    )
    
    bodyEntries.forEach(([key, classes]) => {
      if (typeof classes === 'string') {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
        
        // Ensure unique key
        let uniqueKey = `body-${key}`
        let counter = 1
        while (usedKeys.has(uniqueKey)) {
          uniqueKey = `body-${key}-${counter}`
          counter++
        }
        usedKeys.add(uniqueKey)
        
        elements.push({
          name,
          description: `Theme typography: ${key}`,
          classes,
          usage: `<p className="${classes}">Body text content</p>`,
          element: 'p',
          key: uniqueKey
        })
      }
    })
    
    // Look for code typography
    const codeEntries = Object.entries(theme.typography).filter(([key, value]) => 
      typeof value === 'string' && (key.includes('code') || key.includes('mono'))
    )
    
    codeEntries.forEach(([key, classes]) => {
      if (typeof classes === 'string') {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
        
        // Ensure unique key
        let uniqueKey = `code-${key}`
        let counter = 1
        while (usedKeys.has(uniqueKey)) {
          uniqueKey = `code-${key}-${counter}`
          counter++
        }
        usedKeys.add(uniqueKey)
        
        elements.push({
          name,
          description: `Theme typography: ${key}`,
          classes,
          usage: `<code className="${classes}">console.log('Hello, world!')</code>`,
          element: 'code',
          key: uniqueKey
        })
      }
    })
    
    return elements
  }

  // Generate typography variants from theme
  const getTypographyVariants = (): TypographyElement[] => {
    if (!theme.typography) return []
    
    const variants: TypographyElement[] = []
    const usedKeys = new Set<string>()
    
    // Add all typography entries as variants
    Object.entries(theme.typography).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const formattedName = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim()
        
        // Ensure unique key
        let uniqueKey = `variant-${key}`
        let counter = 1
        while (usedKeys.has(uniqueKey)) {
          uniqueKey = `variant-${key}-${counter}`
          counter++
        }
        usedKeys.add(uniqueKey)
        
        variants.push({
          name: formattedName,
          description: `Theme typography: ${key}`,
          classes: value,
          usage: `<div className="${value}">${formattedName} example text</div>`,
          key: uniqueKey
        })
      }
    })
    
    return variants
  }

  const themeFonts = getThemeFonts()
  const typographyElements = getTypographyElements()
  const typographyVariants = getTypographyVariants()

  return (
    <section className="space-y-6">
      {/* Theme Fonts */}
      {themeFonts.length > 0 && (
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Fonts</h3>
          <div className="grid gap-6">
            {themeFonts.map((font) => (
              <div 
                key={font.key}
                className="p-4 border border-border rounded-lg"
                data-style-element="font"
                data-element-name={`${font.name} Font`}
                data-description={font.description}
                data-classes={font.classes}
                data-variant={font.type}
                data-usage={`font-family: ${font.family}`}
                data-provider={font.provider}
                data-import={font.import}
              >
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{font.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{font.description}</p>
                  <p className="text-xs text-muted-foreground">Used for: {font.usage}</p>
                </div>
                <div className="space-y-2">
                  {font.samples.map((sample, index) => (
                    <div 
                      key={`${font.key}-sample-${index}`}
                      className={`${sample.size} ${sample.weight} ${font.classes}`}
                      style={{ fontFamily: font.family }}
                    >
                      {sample.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Typography Elements */}
      {typographyElements.length > 0 && (
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Typography Elements</h3>
          <div className="space-y-4">
            {typographyElements.map((element) => {
              const Element = element.element || 'div'
              return (
                <div 
                  key={element.key}
                  data-style-element="typography"
                  data-element-name={element.name}
                  data-description={element.description}
                  data-classes={element.classes}
                  data-variant={element.element}
                  data-usage={element.usage}
                >
                  <Element className={element.classes}>
                    {element.name}
                  </Element>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Typography Variants */}
      {typographyVariants.length > 0 && (
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">{theme.name} Typography Variants</h3>
          <div className="grid gap-4">
            {typographyVariants.map((variant) => (
              <div 
                key={variant.key}
                className={variant.classes}
                data-style-element="typography"
                data-element-name={variant.name}
                data-description={variant.description}
                data-classes={variant.classes}
                data-variant="variant"
                data-usage={variant.usage}
              >
                {variant.name.includes('Header') ? variant.name.split(' (')[0] : 
                 variant.name.includes('Mono') ? '// Code comment example' :
                 'Sample text content for this variant'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No typography data message */}
      {themeFonts.length === 0 && typographyElements.length === 0 && typographyVariants.length === 0 && (
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Typography</h3>
          <p className="text-sm text-muted-foreground">No typography data found in the "{theme.name}" theme.</p>
        </div>
      )}
    </section>
  )
}