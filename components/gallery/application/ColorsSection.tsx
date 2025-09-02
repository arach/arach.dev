'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface ColorsSectionProps {
  theme?: Theme | null
}

export function ColorsSection({ theme }: ColorsSectionProps) {
  if (!theme) {
    return (
      <section className="space-y-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Colors</h3>
          <p className="text-sm text-muted-foreground">No theme data available</p>
        </div>
      </section>
    )
  }

  // Generate color swatches from theme data
  const getAccentColors = () => {
    if (!theme.colors?.accent) return []
    
    const colors: Array<{
      name: string
      key: string
      value: string
      description: string
      usage: string
    }> = []
    
    Object.entries(theme.colors.accent).forEach(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('#')) {
        colors.push({
          name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
          key,
          value,
          description: `Accent color: ${key}`,
          usage: `color: ${value}`
        })
      }
    })
    
    return colors
  }

  const getGrayColors = () => {
    if (!theme.colors?.gray) return []
    
    const colors: Array<{
      name: string
      key: string
      value: string
      description: string
      usage: string
    }> = []
    
    Object.entries(theme.colors.gray).forEach(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('#')) {
        colors.push({
          name: `Gray ${key}`,
          key,
          value,
          description: `Gray scale: ${key}`,
          usage: `color: ${value}`
        })
      }
    })
    
    return colors
  }

  const accentColors = getAccentColors()
  const grayColors = getGrayColors()

  return (
    <section className="space-y-6">
      {/* Accent Colors */}
      {accentColors.length > 0 && (
        <div className="p-6 glass-panel border-l-2 border-l-primary/30">
          <h3 className="text-lg font-semibold text-foreground mb-1">Accent Colors</h3>
          <p className="text-xs text-muted-foreground/80 mb-6">Primary brand and accent colors for interactive elements</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {accentColors.map((color) => (
              <div 
                key={color.key}
                className="flex flex-col group cursor-pointer"
                data-style-element="color"
                data-element-name={`${color.name} Color`}
                data-description={color.description}
                data-css-var={`--${color.key}`}
                data-variant={color.key}
                data-usage={color.usage}
              >
                <div 
                  className="w-full h-20 rounded-lg border border-border/50 shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all"
                  style={{ backgroundColor: color.value }}
                  title={`${color.name}: ${color.value}`}
                />
                <div className="mt-2 text-center">
                  <div className="font-medium text-foreground text-xs">{color.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground/70 uppercase">{color.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gray Scale */}
      {grayColors.length > 0 && (
        <div className="p-6 glass-panel border-l-2 border-l-muted-foreground/30">
          <h3 className="text-lg font-semibold text-foreground mb-1">Gray Scale</h3>
          <p className="text-xs text-muted-foreground/80 mb-6">Neutral colors for text, backgrounds, and UI elements</p>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
            {grayColors.map((color) => (
              <div 
                key={color.key}
                className="flex flex-col group cursor-pointer"
                data-style-element="color"
                data-element-name={`${color.name} Color`}
                data-description={color.description}
                data-css-var={`--gray-${color.key}`}
                data-variant={`gray-${color.key}`}
                data-usage={color.usage}
              >
                <div 
                  className="w-full h-14 rounded-md border border-border/30 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all"
                  style={{ backgroundColor: color.value }}
                  title={`${color.name}: ${color.value}`}
                />
                <div className="mt-1.5 text-center">
                  <div className="font-mono text-[10px] text-muted-foreground/70 font-semibold">{color.key}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No colors message */}
      {accentColors.length === 0 && grayColors.length === 0 && (
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Colors</h3>
          <p className="text-sm text-muted-foreground">No color data found in the "{theme.name}" theme.</p>
        </div>
      )}
    </section>
  )
}