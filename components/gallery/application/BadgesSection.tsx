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
      <div className="p-6 glass-panel border-l-2 border-l-accent/30">
        <h3 className="text-lg font-semibold text-foreground mb-1">Badge Variants</h3>
        <p className="text-xs text-muted-foreground/80 mb-6">Status indicators and labels with semantic colors</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {badgeVariants.map((badge) => (
            <span 
              key={badge.variant}
              className={`${badge.classes} cursor-pointer`}
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
        
        {/* Badge Use Cases */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <h4 className="text-sm font-semibold text-foreground/90 mb-4">Common Use Cases</h4>
          <div className="space-y-4">
            {/* Status Badges */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground/70 font-mono uppercase w-20">Status</span>
              <div className="flex gap-2">
                <span className="badge-success text-xs">Active</span>
                <span className="badge-warning text-xs">Pending</span>
                <span className="badge-error text-xs">Failed</span>
                <span className="badge-default text-xs">Inactive</span>
              </div>
            </div>
            
            {/* Feature Badges */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground/70 font-mono uppercase w-20">Features</span>
              <div className="flex gap-2">
                <span className="badge-primary text-xs">New</span>
                <span className="badge-outline text-xs">Beta</span>
                <span className="badge-secondary text-xs">Pro</span>
                <span className="badge-info text-xs">Preview</span>
              </div>
            </div>
            
            {/* Count Badges */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground/70 font-mono uppercase w-20">Counts</span>
              <div className="flex gap-2">
                <span className="badge-primary text-xs">42</span>
                <span className="badge-error text-xs">3</span>
                <span className="badge-success text-xs">99+</span>
                <span className="badge-warning text-xs">!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}