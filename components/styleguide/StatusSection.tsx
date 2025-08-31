'use client'

import React, { useState } from 'react'
import type { Theme } from '@/types/theme'

interface StatusSectionProps {
  theme?: Theme | null
}

interface StatusIndicator {
  name: string
  classes: string
  label: string
  description: string
  animated?: boolean
  glow?: boolean
}

export function StatusSection({ theme }: StatusSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dots' | 'badges' | 'text'>('all')

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

  // Extract status indicators from theme
  const getStatusIndicators = (): { dots: StatusIndicator[], badges: StatusIndicator[], text: StatusIndicator[] } => {
    const result: { dots: StatusIndicator[], badges: StatusIndicator[], text: StatusIndicator[] } = { 
      dots: [], 
      badges: [], 
      text: [] 
    }
    
    if (!theme.components?.status) return result
    
    const seenIndicators = new Set<string>()
    
    // Check if it's the new structure (with states, variants, classes)
    if (theme.components.status.classes && theme.components.status.states) {
      // NEW STRUCTURE - Terminal theme with organized structure
      const { states, classes } = theme.components.status
      
      // Process each class entry
      Object.entries(classes).forEach(([classKey, classValue]) => {
        if (typeof classValue === 'string') {
          // Parse the key format: "variant-state" (e.g., "dot-online")
          const [variant, stateName] = classKey.split('-')
          const category = variant === 'dot' ? 'dots' : 
                          variant === 'bar' ? 'badges' : 
                          variant === 'text' ? 'text' : 'dots'
          
          // Get state info if available
          const stateInfo = typeof states === 'object' && stateName in states ? 
            (states as any)[stateName] : null
          const isAnimated = classValue.includes('animate-')
          const hasGlow = classValue.includes('shadow-') || 
            (typeof stateInfo === 'object' && stateInfo !== null && 'glow' in stateInfo && stateInfo.glow !== null)
          
          const uniqueId = `${category}-${stateName}`
          if (!seenIndicators.has(uniqueId) && category === 'dots') { // Only show dots for now
            seenIndicators.add(uniqueId)
            result[category].push({
              name: stateName,
              classes: classValue,
              label: (typeof stateInfo === 'object' && stateInfo !== null && 'label' in stateInfo) ? 
                stateInfo.label : stateName.charAt(0).toUpperCase() + stateName.slice(1),
              description: (typeof stateInfo === 'object' && stateInfo !== null && 'description' in stateInfo) ? 
                stateInfo.description : getStatusDescription(stateName),
              animated: isAnimated || (typeof stateInfo === 'object' && stateInfo !== null && 
                'animation' in stateInfo && stateInfo.animation === 'pulse'),
              glow: hasGlow
            })
          }
        }
      })
    } else {
      // OLD STRUCTURE - fallback for hybrid theme or legacy themes
      // Process flat status indicators
      Object.entries(theme.components.status).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const isAnimated = value.includes('animate-')
          const hasGlow = value.includes('shadow-')
          
          const uniqueId = `dots-${key}`
          if (!seenIndicators.has(uniqueId)) {
            seenIndicators.add(uniqueId)
            result.dots.push({
              name: key,
              classes: value,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              description: getStatusDescription(key),
              animated: isAnimated,
              glow: hasGlow
            })
          }
        }
      })
      
      // Process nested structures (old format)
      Object.entries(theme.components.status).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && key !== 'states' && key !== 'variants' && key !== 'classes') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              const isAnimated = subValue.includes('animate-')
              const hasGlow = subValue.includes('shadow-')
              const category = key === 'dot' ? 'dots' : key === 'badge' ? 'badges' : 'text'
              const uniqueId = `${category}-${subKey}`
              
              if (!seenIndicators.has(uniqueId)) {
                seenIndicators.add(uniqueId)
                result[category].push({
                  name: subKey,
                  classes: subValue,
                  label: subKey.charAt(0).toUpperCase() + subKey.slice(1),
                  description: getStatusDescription(subKey),
                  animated: isAnimated,
                  glow: hasGlow
                })
              }
            }
          })
        }
      })
    }
    
    return result
  }

  const getStatusDescription = (status: string): string => {
    const descriptions: Record<string, string> = {
      online: 'Active and operational',
      offline: 'Inactive or disconnected',
      error: 'Error or critical state',
      warning: 'Warning or caution needed',
      pending: 'Processing or loading',
      success: 'Successful completion',
      info: 'Informational state',
      idle: 'Idle or waiting',
      busy: 'Busy or occupied',
      disabled: 'Disabled or unavailable'
    }
    return descriptions[status] || `${status} state`
  }

  const indicators = getStatusIndicators()
  
  // When showing "all", deduplicate by name to avoid showing the same status multiple times
  const displayIndicators = selectedCategory === 'all' 
    ? (() => {
        const seen = new Set<string>()
        const unique: StatusIndicator[] = []
        
        // Priority order: dots, badges, then text
        ;[...indicators.dots, ...indicators.badges, ...indicators.text].forEach(indicator => {
          if (!seen.has(indicator.name)) {
            seen.add(indicator.name)
            unique.push(indicator)
          }
        })
        
        return unique
      })()
    : indicators[selectedCategory] || []

  // Example use cases - using only available status indicators
  const exampleUseCases = [
    {
      title: 'Server Status',
      items: [
        { label: 'API Server', status: 'online', uptime: '99.9%', responseTime: '45ms' },
        { label: 'Database', status: 'online', uptime: '99.7%', responseTime: '12ms' },
        { label: 'Cache Server', status: 'warning', uptime: '98.2%', responseTime: '125ms' },
        { label: 'CDN', status: 'offline', uptime: '0%', responseTime: 'N/A' }
      ]
    },
    {
      title: 'Task Pipeline',
      items: [
        { label: 'Data Collection', status: 'online', time: '2m ago' },  // Complete = online
        { label: 'Processing', status: 'pending', time: 'In progress' },
        { label: 'Validation', status: 'offline', time: 'Waiting' },     // Idle = offline
        { label: 'Deployment', status: 'offline', time: 'Queued' }       // Idle = offline
      ]
    }
  ]

  return (
    <section className="space-y-6">
      {/* Category Selector */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All Indicators' },
          { id: 'dots', label: 'Dot Indicators' },
          { id: 'badges', label: 'Badge Indicators' },
          { id: 'text', label: 'Text Indicators' }
        ].map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/20 text-muted-foreground hover:bg-muted/30'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Status Indicator Grid */}
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-6">Status Indicators</h3>
        
        {displayIndicators.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayIndicators.map((indicator) => (
              <div 
                key={`${indicator.name}-${indicator.classes}`}
                className="group relative p-4 border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg"
                data-style-element="status"
                data-element-name={`${indicator.label} Status`}
                data-description={indicator.description}
                data-classes={indicator.classes}
                data-variant={indicator.name}
                data-animated={indicator.animated}
                data-glow={indicator.glow}
              >
                {/* Visual Preview - Actual size */}
                <div className="flex items-center justify-center h-16 mb-3">
                  <div 
                    className={indicator.classes}
                    style={{
                      // Fallback inline styles for colors that might not be in Tailwind
                      backgroundColor: indicator.name === 'online' ? '#10b981' :
                                     indicator.name === 'offline' ? '#4b5563' :
                                     indicator.name === 'error' ? '#ef4444' :
                                     indicator.name === 'warning' ? '#f59e0b' :
                                     indicator.name === 'pending' ? '#06b6d4' : undefined,
                      boxShadow: indicator.glow ? (
                        indicator.name === 'online' ? '0 0 4px rgba(16,185,129,0.6)' :
                        indicator.name === 'error' ? '0 0 4px rgba(239,68,68,0.6)' :
                        indicator.name === 'warning' ? '0 0 4px rgba(245,158,11,0.6)' :
                        indicator.name === 'pending' ? '0 0 4px rgba(6,182,212,0.6)' : undefined
                      ) : undefined
                    }}
                  />
                </div>
                
                {/* Info */}
                <div className="text-center space-y-1">
                  <div className="text-sm font-semibold text-foreground">
                    {indicator.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {indicator.description}
                  </div>
                  
                  {/* Features */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {indicator.animated && (
                      <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
                        Animated
                      </span>
                    )}
                    {indicator.glow && (
                      <span className="px-2 py-0.5 text-xs bg-accent/10 text-accent-foreground rounded">
                        Glow
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Copy classes on hover - with rounded bottom corners to match card */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-background/95 backdrop-blur-sm border-t border-border opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                  <code className="text-xs font-mono text-muted-foreground block truncate">
                    {indicator.classes}
                  </code>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No indicators in this category</p>
        )}
      </div>

      {/* Usage Examples */}
      <div className="grid md:grid-cols-2 gap-6">
        {exampleUseCases.map((useCase, index) => (
          <div key={index} className="p-6 glass-panel">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              {useCase.title}
            </h4>
            <div className="space-y-3">
              {useCase.items.map((item, itemIndex) => {
                const statusIndicator = indicators.dots.find(ind => ind.name === item.status)
                return (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      {statusIndicator && (
                        <div 
                          className={statusIndicator.classes}
                          style={{
                            backgroundColor: item.status === 'online' ? '#10b981' :
                                           item.status === 'offline' ? '#4b5563' :
                                           item.status === 'error' ? '#ef4444' :
                                           item.status === 'warning' ? '#f59e0b' :
                                           item.status === 'pending' ? '#06b6d4' : undefined,
                            boxShadow: statusIndicator.glow ? (
                              item.status === 'online' ? '0 0 4px rgba(16,185,129,0.6)' :
                              item.status === 'error' ? '0 0 4px rgba(239,68,68,0.6)' :
                              item.status === 'warning' ? '0 0 4px rgba(245,158,11,0.6)' :
                              item.status === 'pending' ? '0 0 4px rgba(6,182,212,0.6)' : undefined
                            ) : undefined
                          }}
                        />
                      )}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {'uptime' in item && <span>Uptime: {item.uptime}</span>}
                      {'responseTime' in item && <span>{item.responseTime}</span>}
                      {'time' in item && <span>{item.time}</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Status Combinations */}
      <div className="p-6 glass-panel">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Common Patterns
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Connection Status */}
          <div className="p-4 border border-border rounded-lg">
            <h5 className="text-sm font-medium mb-3">Connection Status</h5>
            <div className="space-y-2">
              {['online', 'offline', 'pending'].map(status => {
                const indicator = indicators.dots.find(ind => ind.name === status)
                if (!indicator) return null
                return (
                  <div key={status} className="flex items-center gap-2">
                    <div 
                      className={indicator.classes}
                      style={{
                        backgroundColor: status === 'online' ? '#10b981' :
                                       status === 'offline' ? '#4b5563' :
                                       status === 'error' ? '#ef4444' :
                                       status === 'warning' ? '#f59e0b' :
                                       status === 'pending' ? '#06b6d4' : undefined,
                        boxShadow: indicator.glow ? (
                          status === 'online' ? '0 0 4px rgba(16,185,129,0.6)' :
                          status === 'error' ? '0 0 4px rgba(239,68,68,0.6)' :
                          status === 'warning' ? '0 0 4px rgba(245,158,11,0.6)' :
                          status === 'pending' ? '0 0 4px rgba(6,182,212,0.6)' : undefined
                        ) : undefined
                      }}
                    />
                    <span className="text-sm">{indicator.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Alert Levels */}
          <div className="p-4 border border-border rounded-lg">
            <h5 className="text-sm font-medium mb-3">Alert Levels</h5>
            <div className="space-y-2">
              {['error', 'warning', 'online'].map(status => {
                const indicator = indicators.dots.find(ind => ind.name === status)
                if (!indicator) return null
                return (
                  <div key={status} className="flex items-center gap-2">
                    <div 
                      className={indicator.classes}
                      style={{
                        backgroundColor: status === 'online' ? '#10b981' :
                                       status === 'error' ? '#ef4444' :
                                       status === 'warning' ? '#f59e0b' : undefined,
                        boxShadow: indicator.glow ? (
                          status === 'online' ? '0 0 4px rgba(16,185,129,0.6)' :
                          status === 'error' ? '0 0 4px rgba(239,68,68,0.6)' :
                          status === 'warning' ? '0 0 4px rgba(245,158,11,0.6)' : undefined
                        ) : undefined
                      }}
                    />
                    <span className="text-sm">
                      {status === 'error' ? 'Critical' : 
                       status === 'warning' ? 'Warning' : 
                       status === 'online' ? 'Normal' : status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Processing States */}
          <div className="p-4 border border-border rounded-lg">
            <h5 className="text-sm font-medium mb-3">Processing States</h5>
            <div className="space-y-2">
              {['pending', 'online', 'offline'].map(status => {
                const indicator = indicators.dots.find(ind => ind.name === status)
                if (!indicator) return null
                return (
                  <div key={status} className="flex items-center gap-2">
                    <div 
                      className={indicator.classes}
                      style={{
                        backgroundColor: status === 'online' ? '#10b981' :
                                       status === 'offline' ? '#4b5563' :
                                       status === 'pending' ? '#06b6d4' : undefined,
                        boxShadow: indicator.glow ? (
                          status === 'online' ? '0 0 4px rgba(16,185,129,0.6)' :
                          status === 'pending' ? '0 0 4px rgba(6,182,212,0.6)' : undefined
                        ) : undefined
                      }}
                    />
                    <span className="text-sm">
                      {status === 'pending' ? 'Processing' : 
                       status === 'online' ? 'Complete' : 
                       'Failed'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}