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

  const statusIndicators = Object.entries(theme.components.status)

  return (
    <section className="space-y-6">
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Status Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statusIndicators.map(([name, classes]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className={typeof classes === 'string' ? classes : ''} />
              <span className="text-xs font-mono text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}