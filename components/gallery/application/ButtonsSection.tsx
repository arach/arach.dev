'use client'

import React, { useState } from 'react'
import type { Theme } from '@/types/theme'

interface ButtonsSectionProps {
  theme?: Theme | null
}

export function ButtonsSection({ theme }: ButtonsSectionProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  
  // Get button variants from theme or use defaults
  const getButtonVariants = () => {
    if (!theme?.components?.button) {
      // Fallback to default button classes
      return [
        {
          name: 'Primary',
          variant: 'primary',
          classes: 'btn-primary btn-md',
          description: 'Main call-to-action button'
        },
        {
          name: 'Secondary',
          variant: 'secondary',
          classes: 'btn-secondary btn-md',
          description: 'Secondary action button'
        },
        {
          name: 'Ghost',
          variant: 'ghost',
          classes: 'btn-ghost btn-md',
          description: 'Subtle button with hover states'
        }
      ]
    }
    
    // Use theme button definitions
    const variants = []
    const buttonDefs = theme.components.button
    
    if (buttonDefs.primary) {
      variants.push({
        name: 'Primary',
        variant: 'primary',
        classes: buttonDefs.primary,
        description: 'Main call-to-action button with gradient effect'
      })
    }
    
    if (buttonDefs.secondary) {
      variants.push({
        name: 'Secondary',
        variant: 'secondary',
        classes: buttonDefs.secondary,
        description: 'Secondary action button with border emphasis'
      })
    }
    
    if (buttonDefs.ghost) {
      variants.push({
        name: 'Ghost',
        variant: 'ghost',
        classes: buttonDefs.ghost,
        description: 'Minimal button that appears on hover'
      })
    }
    
    if (buttonDefs.success) {
      variants.push({
        name: 'Success',
        variant: 'success',
        classes: buttonDefs.success,
        description: 'Positive action confirmation button'
      })
    }
    
    if (buttonDefs.error || buttonDefs.destructive) {
      variants.push({
        name: 'Destructive',
        variant: 'destructive',
        classes: buttonDefs.error || buttonDefs.destructive,
        description: 'Destructive action requiring confirmation'
      })
    }
    
    if (buttonDefs.warning) {
      variants.push({
        name: 'Warning',
        variant: 'warning',
        classes: buttonDefs.warning,
        description: 'Warning state for attention-requiring actions'
      })
    }
    
    if (buttonDefs.outline) {
      variants.push({
        name: 'Outline',
        variant: 'outline',
        classes: buttonDefs.outline,
        description: 'Outline variant with transparent background'
      })
    }
    
    return variants
  }
  
  const buttonVariants = getButtonVariants()

  return (
    <section className="space-y-6">
      {/* Button Variants */}
      <div className="p-6 glass-panel border-l-2 border-l-primary/30">
        <h3 className="text-lg font-semibold text-foreground mb-1">Button Variants</h3>
        <p className="text-xs text-muted-foreground/80 mb-6">Interactive button components with multiple states and styles</p>
        <div className="flex flex-wrap gap-4 mb-6">
          {buttonVariants.map((btn) => (
            <button 
              key={btn.variant}
              className={btn.classes}
              onClick={() => setActiveDemo(activeDemo === btn.variant ? null : btn.variant)}
              data-style-element="button"
              data-element-name={`${btn.name} Button`}
              data-description={btn.description}
              data-classes={btn.classes}
              data-variant={btn.variant}
              title={`${btn.name} Button - Click to see states`}
            >
              {btn.name}
            </button>
          ))}
        </div>
        
        {/* Button States Demo */}
        {activeDemo && (
          <div className="mt-6 p-4 bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg border border-border/50 shadow-inner">
            <h4 className="text-sm font-semibold text-foreground/90 mb-3">Button States - {buttonVariants.find(b => b.variant === activeDemo)?.name}</h4>
            <div className="flex flex-wrap gap-3">
              {buttonVariants
                .filter(btn => btn.variant === activeDemo)
                .map(btn => (
                  <React.Fragment key={btn.variant}>
                    <button className={btn.classes}>Normal</button>
                    <button className={`${btn.classes} hover`}>Hover</button>
                    <button className={`${btn.classes} active`}>Active</button>
                    <button className={btn.classes} disabled>Disabled</button>
                  </React.Fragment>
                ))
              }
            </div>
          </div>
        )}
      </div>
      
      {/* Button Sizes */}
      {buttonVariants.length > 0 && (
        <div className="p-6 glass-panel border-l-2 border-l-secondary/30">
          <h3 className="text-lg font-semibold text-foreground mb-1">Button Sizes</h3>
          <p className="text-xs text-muted-foreground/80 mb-6">Size variations for different contexts and hierarchies</p>
          <div className="space-y-4">
            {/* Using primary button as example */}
            {buttonVariants.slice(0, 1).map(btn => (
              <div key={`sizes-${btn.variant}`} className="flex items-center gap-4">
                <button className={`${btn.classes} text-[10px] px-2 py-1`}>Tiny</button>
                <button className={`${btn.classes} text-xs px-3 py-1.5`}>Small</button>
                <button className={btn.classes}>Default</button>
                <button className={`${btn.classes} text-sm px-6 py-3`}>Large</button>
                <button className={`${btn.classes} text-base px-8 py-4`}>Extra Large</button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Button Groups */}
      <div className="p-6 glass-panel border-l-2 border-l-accent/30">
        <h3 className="text-lg font-semibold text-foreground mb-1">Button Groups</h3>
        <p className="text-xs text-muted-foreground/80 mb-6">Combined button layouts for related actions</p>
        <div className="space-y-4">
          {/* Segmented Control */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/80 mb-3">Segmented Control</h4>
            <div className="inline-flex rounded-lg border border-border/50 shadow-sm bg-card/30">
              {['Left', 'Center', 'Right'].map((label, i) => (
                <button
                  key={label}
                  className={`px-4 py-2 text-xs font-semibold ${
                    i === 0 ? 'rounded-l-lg' : i === 2 ? 'rounded-r-lg' : ''
                  } ${
                    i === 1 ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'
                  } border-r last:border-r-0 border-border transition-colors`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Action Group */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/80 mb-3">Action Group</h4>
            <div className="flex gap-2">
              {buttonVariants.slice(0, 3).map(btn => (
                <button key={`group-${btn.variant}`} className={btn.classes}>
                  {btn.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}