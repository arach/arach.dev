'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface ButtonsSectionProps {
  theme?: Theme | null
}

export function ButtonsSection({ theme }: ButtonsSectionProps) {
  const buttonVariants = [
    {
      name: 'Primary',
      variant: 'primary',
      classes: 'btn-primary btn-md',
      description: 'Main call-to-action button with primary brand color and subtle border'
    },
    {
      name: 'Secondary',
      variant: 'secondary', 
      classes: 'btn-secondary btn-md',
      description: 'Secondary action button with refined styling and border'
    },
    {
      name: 'Ghost',
      variant: 'ghost',
      classes: 'btn-ghost btn-md',
      description: 'Subtle button with hover states and minimal visual weight'
    },
    {
      name: 'Destructive',
      variant: 'destructive',
      classes: 'btn-destructive btn-md',
      description: 'Destructive action button for critical operations with enhanced styling'
    },
    {
      name: 'Success',
      variant: 'success',
      classes: 'btn-success btn-md',
      description: 'Success state button for positive actions with consistent theming'
    },
    {
      name: 'Outline',
      variant: 'outline',
      classes: 'btn-outline btn-md',
      description: 'Outline button with transparent background and border'
    },
    {
      name: 'Warning',
      variant: 'warning',
      classes: 'btn-warning btn-md',
      description: 'Warning state button for attention-requiring actions'
    }
  ]

  return (
    <section className="space-y-6">
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          {buttonVariants.map((btn) => (
            <button 
              key={btn.variant}
              className={btn.classes}
              data-style-element="button"
              data-element-name={`${btn.name} Button`}
              data-description={btn.description}
              data-classes={btn.classes}
              data-variant={btn.variant}
              data-usage={`<button className="${btn.classes}">${btn.name}</button>`}
              title={`${btn.name} Button - Click to inspect`}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}