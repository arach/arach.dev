'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface EffectsSectionProps {
  theme?: Theme | null
}

export function EffectsSection({ theme }: EffectsSectionProps) {
  const effects = theme?.effects

  if (!effects) {
    return (
      <section className="space-y-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Visual Effects</h3>
          <p className="text-sm text-muted-foreground">No effects defined in this theme</p>
        </div>
      </section>
    )
  }

  const effectExamples = Object.entries(effects).map(([name, className]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
    key: name,
    classes: className as string,
    description: `Visual effect: ${name}`
  }))

  return (
    <section className="space-y-6">
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Visual Effects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {effectExamples.map((effect) => (
            <div
              key={effect.key}
              className={`p-6 border border-border rounded-lg ${effect.classes}`}
              data-style-element="effect"
              data-element-name={effect.name}
              data-description={effect.description}
              data-classes={effect.classes}
              data-variant={effect.key}
            >
              <h4 className="text-sm font-semibold text-foreground mb-2">{effect.name}</h4>
              <p className="text-xs text-muted-foreground">{effect.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}