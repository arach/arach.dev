'use client'

import React from 'react'
import type { Theme } from '@/types/theme'

interface CardsSectionProps {
  theme?: Theme | null
}

export function CardsSection({ theme }: CardsSectionProps) {
  const cardVariants = [
    {
      name: 'Default Card',
      variant: 'default',
      classes: 'card p-6',
      description: 'Standard glass morphism card with subtle backdrop blur and border'
    },
    {
      name: 'Elevated Card',
      variant: 'elevated', 
      classes: 'card-elevated p-6',
      description: 'Enhanced shadow for important content that needs emphasis'
    },
    {
      name: 'Dark Card',
      variant: 'dark',
      classes: 'card-dark p-6', 
      description: 'Darker variant for special use cases or dark themed sections'
    },
    {
      name: 'Glass Panel',
      variant: 'panel',
      classes: 'glass-panel p-8',
      description: 'Larger panel with stronger blur effect for major sections'
    }
  ]

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardVariants.map((card) => (
          <div
            key={card.variant}
            className={card.classes}
            data-style-element="card"
            data-element-name={card.name}
            data-description={card.description}
            data-classes={card.classes}
            data-variant={card.variant}
            data-usage={`<div className='${card.classes}'>Card content</div>`}
          >
            <div className="card-header">
              <h4 className="card-title">{card.name}</h4>
              <p className="card-description">{card.description}</p>
            </div>
            <div className="card-content">
              <p className="text-card-foreground">
                This demonstrates the {card.name.toLowerCase()} styling with proper spacing and typography.
              </p>
            </div>
            <div className="card-footer">
              <span className="badge-info">#{card.variant}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}