'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface SpacingSectionProps {
  theme?: Theme | null
}

export function SpacingSection({ theme }: SpacingSectionProps) {
  const spacing = theme?.spacing

  if (!spacing) {
    return (
      <section className="space-y-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Spacing System</h3>
          <p className="text-sm text-muted-foreground">No spacing system defined in this theme</p>
        </div>
      </section>
    )
  }

  const spacingExamples = [
    { name: 'Extra Small', value: spacing.component?.xs || '0.25rem', class: 'p-1' },
    { name: 'Small', value: spacing.component?.sm || '0.5rem', class: 'p-2' },
    { name: 'Medium', value: spacing.component?.md || '1rem', class: 'p-4' },
    { name: 'Large', value: spacing.component?.lg || '1.5rem', class: 'p-6' },
    { name: 'Extra Large', value: spacing.component?.xl || '2rem', class: 'p-8' },
  ]

  return (
    <section className="space-y-6">
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Spacing System</h3>
        <div className="space-y-4">
          {spacingExamples.map((space) => (
            <div key={space.name} className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium text-foreground">{space.name}</div>
              <div className="flex-1">
                <div className={`bg-primary/20 border border-primary/40 ${space.class}`}>
                  <div className="bg-primary/40 h-4"></div>
                </div>
              </div>
              <div className="w-20 text-xs font-mono text-muted-foreground">{space.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}