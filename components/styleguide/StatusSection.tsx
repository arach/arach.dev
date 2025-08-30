'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface StatusSectionProps {
  theme?: Theme | null
}

export function StatusSection({ theme }: StatusSectionProps) {
  if (!theme?.components?.status) {
    return (
      <section className="space-y-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Status Indicators</h3>
          <p className="text-sm text-muted-foreground">No status indicators defined in this theme</p>
        </div>
      </section>
    )
  }

  const statusIndicators = Object.entries(theme.components.status).map(([name, classes]) => ({
    name,
    classes: typeof classes === 'string' ? classes : '',
    description: `Status indicator: ${name}`,
    usage: `<div className="${typeof classes === 'string' ? classes : ''}">${name}</div>`
  }))

  return (
    <section className="space-y-6">
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Status Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statusIndicators.map((indicator) => (
            <div 
              key={indicator.name}
              className="flex flex-col items-center gap-3 p-4 border border-border rounded-lg"
              data-style-element="status"
              data-element-name={`${indicator.name} Status`}
              data-description={indicator.description}
              data-classes={indicator.classes}
              data-variant={indicator.name}
              data-usage={indicator.usage}
            >
              <div className={indicator.classes} />
              <div className="text-center">
                <span className="text-xs font-medium text-foreground block">{indicator.name}</span>
                <span className="text-xs font-mono text-muted-foreground">{indicator.classes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}