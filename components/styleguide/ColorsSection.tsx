'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface ColorsSectionProps {
  theme?: Theme | null
}

export function ColorsSection({ theme }: ColorsSectionProps) {
  const colorVariables = [
    { name: 'Primary', var: 'primary', desc: 'Main brand color' },
    { name: 'Secondary', var: 'secondary', desc: 'Secondary brand color' },
    { name: 'Accent', var: 'accent', desc: 'Accent color for highlights' },
    { name: 'Success', var: 'success', desc: 'Success state color' },
    { name: 'Warning', var: 'warning', desc: 'Warning state color' },
    { name: 'Destructive', var: 'destructive', desc: 'Error/danger state color' },
  ]

  const surfaceColors = [
    { name: 'Background', var: 'background', desc: 'Main background color' },
    { name: 'Card', var: 'card', desc: 'Card background color' },
    { name: 'Muted', var: 'muted', desc: 'Muted background color' },
    { name: 'Accent', var: 'accent', desc: 'Accent background color' },
  ]

  return (
    <section className="space-y-6">
      <div className="grid gap-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorVariables.map((color) => (
              <div key={color.var}>
                <div 
                  className={`w-full h-16 bg-${color.var} border border-border rounded-lg`}
                  data-style-element="color"
                  data-element-name={`${color.name} Color`}
                  data-description={color.desc}
                  data-classes={`bg-${color.var}`}
                  data-css-var={`--${color.var}`}
                  data-variant={color.var}
                  data-usage={`<div className="bg-${color.var}">Content</div>`}
                  title={`${color.name}: var(--${color.var})`}
                />
                <div className="mt-2">
                  <div className="font-medium text-foreground text-sm">{color.name}</div>
                  <div className="text-xs text-muted-foreground">{color.desc}</div>
                  <div className="font-mono text-xs text-muted-foreground">--{color.var}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Surface Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {surfaceColors.map((surface) => (
              <div key={surface.var}>
                <div 
                  className={`w-full h-16 bg-${surface.var} border border-border rounded-lg`}
                  data-style-element="color"
                  data-element-name={`${surface.name} Color`}
                  data-description={surface.desc}
                  data-classes={`bg-${surface.var}`}
                  data-css-var={`--${surface.var}`}
                  data-variant={surface.var}
                  data-usage={`<div className="bg-${surface.var}">Content</div>`}
                  title={`${surface.name}: var(--${surface.var})`}
                />
                <div className="mt-2">
                  <div className="font-medium text-foreground text-sm">{surface.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">--{surface.var}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}