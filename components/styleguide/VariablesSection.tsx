'use client'

import React from 'react'
import type { Theme } from '@/types/theme'
import { 
  themeToCSSVariables, 
  variableDisplayNames, 
  groupVariablesByCategory,
  extractColorValue 
} from '@/lib/theme-to-css-variables'

interface VariablesSectionProps {
  theme?: Theme | null
}

export function VariablesSection({ theme }: VariablesSectionProps) {
  if (!theme) {
    return (
      <section className="space-y-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">CSS Variables</h3>
          <p className="text-sm text-muted-foreground">No theme data available</p>
        </div>
      </section>
    )
  }

  const cssVariables = themeToCSSVariables(theme)
  const groupedVariables = groupVariablesByCategory(cssVariables)

  const categoryTitles: Record<string, string> = {
    core: 'Core Colors',
    surfaces: 'Surface Colors',
    colors: 'Semantic Colors',
    states: 'State Colors',
    ui: 'UI Elements',
    charts: 'Chart Colors',
    layout: 'Layout'
  }

  // Check if the color value appears to be a color (oklch, hex, hsl, etc.)
  const isColorValue = (value: any): boolean => {
    const stringValue = String(value || '')
    return stringValue.startsWith('oklch(') || 
           stringValue.startsWith('#') || 
           stringValue.startsWith('hsl(') || 
           stringValue.startsWith('rgb(')
  }

  return (
    <section className="space-y-6">
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-2">CSS Variables (shadcn Compatible)</h3>
        <p className="text-sm text-muted-foreground mb-6">
          These CSS variables follow shadcn/ui conventions for easy integration with shadcn components.
        </p>
        
        <div className="space-y-8">
          {Object.entries(groupedVariables).map(([category, variables]) => {
            if (Object.keys(variables).length === 0) return null
            
            return (
              <div key={category}>
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  {categoryTitles[category] || category}
                </h4>
                
                <div className="grid gap-2">
                  {Object.entries(variables).map(([varName, value]) => {
                    const displayName = variableDisplayNames[varName] || varName
                    const colorValue = extractColorValue(value)
                    const isColor = isColorValue(colorValue)
                    
                    return (
                      <div 
                        key={varName}
                        className="flex items-center gap-4 p-3 border border-border rounded-lg bg-background/50"
                        data-style-element="css-variable"
                        data-element-name={displayName}
                        data-css-var={varName}
                        data-value={colorValue}
                        data-description={`CSS variable ${varName}`}
                        data-usage={`var(${varName})`}
                      >
                        {isColor && (
                          <div 
                            className="w-12 h-12 rounded border border-border flex-shrink-0"
                            style={{ 
                              backgroundColor: colorValue.startsWith('oklch') 
                                ? `oklch(${colorValue.slice(6, -1)})` 
                                : colorValue 
                            }}
                            title={colorValue}
                          />
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">
                              {displayName}
                            </span>
                            <code className="text-xs font-mono text-muted-foreground">
                              {varName}
                            </code>
                          </div>
                          <div className="text-xs font-mono text-muted-foreground truncate">
                            {colorValue}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <code className="text-xs font-mono text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                            var({varName})
                          </code>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Usage example */}
        <div className="mt-8 p-4 bg-muted/10 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Usage Example</h4>
          <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`.my-component {
  background: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.my-button {
  background: var(--primary);
  color: var(--primary-foreground);
}

/* Dark mode automatically handled via .dark class */
.dark .my-component {
  /* Variables automatically swap to dark values */
}`}</pre>
        </div>
      </div>
    </section>
  )
}