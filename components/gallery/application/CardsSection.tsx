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
      description: 'Standard glass morphism card with subtle backdrop blur and border',
      borderColor: 'border-l-primary/30'
    },
    {
      name: 'Elevated Card',
      variant: 'elevated', 
      classes: 'card-elevated p-6',
      description: 'Enhanced shadow for important content that needs emphasis',
      borderColor: 'border-l-accent/30'
    },
    {
      name: 'Dark Card',
      variant: 'dark',
      classes: 'card-dark p-6', 
      description: 'Darker variant for special use cases or dark themed sections',
      borderColor: 'border-l-muted-foreground/30'
    },
    {
      name: 'Glass Panel',
      variant: 'panel',
      classes: 'glass-panel p-8',
      description: 'Larger panel with stronger blur effect for major sections',
      borderColor: 'border-l-secondary/30'
    }
  ]

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardVariants.map((card) => (
          <div
            key={card.variant}
            className={`${card.classes} border-l-2 ${card.borderColor} hover:shadow-xl transition-all cursor-pointer group`}
            data-style-element="card"
            data-element-name={card.name}
            data-description={card.description}
            data-classes={card.classes}
            data-variant={card.variant}
            data-usage={`<div className='${card.classes}'>Card content</div>`}
          >
            <div className="card-header">
              <h4 className="card-title text-lg font-semibold group-hover:text-primary transition-colors">{card.name}</h4>
              <p className="card-description text-xs opacity-80">{card.description}</p>
            </div>
            <div className="card-content">
              <p className="text-card-foreground text-sm leading-relaxed">
                This demonstrates the {card.name.toLowerCase()} styling with proper spacing and typography.
              </p>
              <div className="mt-4 flex gap-2">
                <div className="h-8 w-8 rounded bg-primary/20 border border-primary/30" />
                <div className="h-8 w-8 rounded bg-secondary/20 border border-secondary/30" />
                <div className="h-8 w-8 rounded bg-accent/20 border border-accent/30" />
              </div>
            </div>
            <div className="card-footer flex items-center justify-between">
              <span className="badge-info text-xs">#{card.variant}</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase">Component</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Complex Card Examples */}
      <div className="glass-panel p-6 border-l-2 border-l-primary/30">
        <h3 className="text-lg font-semibold text-foreground mb-1">Complex Card Layouts</h3>
        <p className="text-xs text-muted-foreground/80 mb-6">Advanced card compositions with multiple elements</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">2,847</span>
              <span className="badge-success text-xs">+12%</span>
            </div>
            <h5 className="text-sm font-medium text-foreground mb-1">Total Users</h5>
            <p className="text-xs text-muted-foreground">Active in the last 30 days</p>
          </div>
          
          {/* Profile Card */}
          <div className="card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
              <div>
                <h5 className="text-sm font-medium text-foreground">John Doe</h5>
                <p className="text-xs text-muted-foreground">Software Engineer</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost btn-sm flex-1">Message</button>
              <button className="btn-primary btn-sm flex-1">Follow</button>
            </div>
          </div>
          
          {/* Feature Card */}
          <div className="card p-6">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-primary text-lg">⚡</span>
            </div>
            <h5 className="text-sm font-medium text-foreground mb-1">Lightning Fast</h5>
            <p className="text-xs text-muted-foreground">Optimized performance with edge caching</p>
          </div>
        </div>
      </div>
    </section>
  )
}