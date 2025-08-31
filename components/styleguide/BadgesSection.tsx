'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface BadgesSectionProps {
  theme?: Theme | null
}

export function BadgesSection({ theme }: BadgesSectionProps) {
  const badgeVariants = [
    {
      name: 'Default',
      variant: 'default',
      classes: 'badge-default',
      description: 'Standard badge with secondary styling and subtle appearance'
    },
    {
      name: 'Primary',
      variant: 'primary',
      classes: 'badge-primary',
      description: 'Primary colored badge for important information and key tags'
    },
    {
      name: 'Success',
      variant: 'success',
      classes: 'badge-success',
      description: 'Success state badge for positive status indicators'
    },
    {
      name: 'Warning',
      variant: 'warning', 
      classes: 'badge-warning',
      description: 'Warning state badge for attention-requiring items'
    },
    {
      name: 'Error',
      variant: 'error',
      classes: 'badge-error',
      description: 'Error badge for error states and failed operations'
    },
    {
      name: 'Outline',
      variant: 'outline',
      classes: 'badge-outline',
      description: 'Outlined badge variant with border and minimal fill'
    }
  ]

  return (
    <section className="space-y-6">
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Badge Variants</h3>
        <div className="flex flex-wrap gap-3">
          {badgeVariants.map((badge) => (
            <span 
              key={badge.variant}
              className={badge.classes}
              data-style-element="badge"
              data-element-name={`${badge.name} Badge`}
              data-description={badge.description}
              data-classes={badge.classes}
              data-variant={badge.variant}
              data-usage={`<span className='${badge.classes}'>${badge.name}</span>`}
              title={`${badge.name} Badge - Click to inspect`}
            >
              {badge.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}