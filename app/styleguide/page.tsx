'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { getAllThemes, type ThemeName, cx } from '@/styles'
import type { Theme } from '@/styles'
import styles from './styleguide.module.css'

interface StyleSpec {
  name: string
  type: 'typography' | 'color' | 'input' | 'button' | 'card' | 'badge' | 'status' | 'effect'
  style: string  // The actual style definition string
  details: Record<string, string>
  extras?: string
}

// Context for style sections to provide category info
const StyleSectionContext = createContext<{ category: StyleSpec['type'] }>({ 
  category: 'typography' 
})

export default function StyleGuidePage() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('terminal')
  const [hoveredSpec, setHoveredSpec] = useState<StyleSpec | null>(null)
  const [pinnedSpecs, setPinnedSpecs] = useState<StyleSpec[]>([])
  const [currentPinnedIndex, setCurrentPinnedIndex] = useState(0)
  
  const themes = getAllThemes()
  const ts = themes[selectedTheme]

  // Utility to detect element type from React children
  const detectElementType = (children: React.ReactNode): string | null => {
    if (!children || typeof children !== 'object') return null
    
    const child = React.Children.toArray(children)[0]
    if (React.isValidElement(child)) {
      const elementType = child.type
      if (typeof elementType === 'string') {
        return `<${elementType}>`
      }
    }
    return null
  }

  // StyleSection component to provide context
  const StyleSection = ({ category, children }: { category: StyleSpec['type'], children: React.ReactNode }) => {
    return (
      <StyleSectionContext.Provider value={{ category }}>
        {children}
      </StyleSectionContext.Provider>
    )
  }

  // Utility to create style spec
  const createStyleSpec = (
    name: string,
    category: StyleSpec['type'],
    styleValue: string,
    elementType: string | null
  ): StyleSpec => {
    return {
      name,
      type: category,
      style: styleValue,
      details: { classes: styleValue },
      extras: elementType || undefined
    }
  }

  // Thin wrapper component - just handles interaction
  const StyleElement = ({ 
    styleValue, 
    children, 
    className = "",
    displayName
  }: { 
    styleValue: string,
    children: React.ReactNode,
    className?: string,
    displayName?: string
  }) => {
    const { category } = useContext(StyleSectionContext)
    const name = displayName || ''
    const elementType = detectElementType(children)
    const spec = createStyleSpec(name, category, styleValue, elementType)

    return (
      <div
        className={`${styles['style-element']} ${className}`}
        role="listitem"
        tabIndex={0}
        onMouseEnter={() => setHoveredSpec(spec)}
        onMouseLeave={() => setHoveredSpec(null)}
        onMouseUp={(e) => {
          const target = e.target as HTMLElement
          // Skip if clicking on actual interactive buttons
          if (target.tagName === 'BUTTON' || target.closest('button')) {
            return
          }
          handleClick(spec)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick(spec)
          }
        }}
      >
        {children}
      </div>
    )
  }

  const handleClick = (spec: StyleSpec) => {
    const existingIndex = pinnedSpecs.findIndex(s => s.name === spec.name)
    if (existingIndex > -1) {
      // Remove if already pinned
      setPinnedSpecs(pinnedSpecs.filter((_, i) => i !== existingIndex))
      // Adjust current index if needed
      if (currentPinnedIndex >= pinnedSpecs.length - 1) {
        setCurrentPinnedIndex(Math.max(0, pinnedSpecs.length - 2))
      }
    } else {
      // Add to pinned stack (no limit)
      setPinnedSpecs([...pinnedSpecs, spec])
      setCurrentPinnedIndex(pinnedSpecs.length)
    }
  }

  // Keyboard navigation for pinned items
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (pinnedSpecs.length <= 1) return
      
      if (e.key === 'ArrowLeft' && currentPinnedIndex > 0) {
        setCurrentPinnedIndex(currentPinnedIndex - 1)
      } else if (e.key === 'ArrowRight' && currentPinnedIndex < pinnedSpecs.length - 1) {
        setCurrentPinnedIndex(currentPinnedIndex + 1)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPinnedIndex, pinnedSpecs.length])

  const handleButtonClick = (variant: string, action: string) => {
    // Simple notification instead of toast
    console.log(`${action.toUpperCase()} INITIATED - ${variant} action triggered`)
  }

  return (
    <main className={styles['styleguide-main']}>
      {/* Grid background effect */}
      <div className={styles['grid-background']} aria-hidden="true" />
      
      {/* Theme Selector - Top left */}
      <aside className={styles['theme-selector']}>
        <label htmlFor="theme-selector-dropdown" className="sr-only">Select theme</label>
        <select
          id="theme-selector-dropdown"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value as ThemeName)}
          className={cx(ts.components.input.default, styles['theme-selector-input'])}
        >
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>
              {theme.name} Theme
            </option>
          ))}
        </select>
      </aside>
      
      {/* Fixed Pinned Specs Carousel - Top right */}
      <aside 
        className={cx(styles['pinned-carousel'], pinnedSpecs.length === 0 && styles['hidden'])}
        aria-live="polite"
        aria-label="Pinned styles carousel"
      >
        <section className={styles['inspector-card-small']}>
          {/* Subtle scanline effect on inspector */}
          <div className={styles['scanline-effect']} aria-hidden="true" />
          <header className="flex items-center justify-between mb-3 relative z-10">
            <h4 className={ts.typography.uiSectionHeader + ' text-amber-500'}>Pinned Styles</h4>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500">{currentPinnedIndex + 1}/{pinnedSpecs.length}</span>
            </div>
          </header>
          
          {/* Carousel Container */}
          <nav className={styles['carousel-nav']} aria-label="Carousel navigation">
            {/* Previous Button */}
            {pinnedSpecs.length > 1 && currentPinnedIndex > 0 && (
              <button
                onClick={() => setCurrentPinnedIndex(currentPinnedIndex - 1)}
                className={cx(styles['carousel-button'], styles['prev'])}
                aria-label="Previous"
              >
                ‹
              </button>
            )}
            
            {/* Next Button */}
            {pinnedSpecs.length > 1 && currentPinnedIndex < pinnedSpecs.length - 1 && (
              <button
                onClick={() => setCurrentPinnedIndex(currentPinnedIndex + 1)}
                className={cx(styles['carousel-button'], styles['next'])}
                aria-label="Next"
              >
                ›
              </button>
            )}
            
            <div className={styles['carousel-container']}>
              <div 
                className={styles['carousel-track']}
                style={{ transform: `translateX(-${currentPinnedIndex * 100}%)` }}
              >
                {pinnedSpecs.map((spec, index) => (
                  <div 
                    key={spec.name}
                    className={styles['carousel-item']}
                  >
                    <div className={styles['pinned-card']}>
                      <div className={styles['pinned-header']}>
                        <span className={styles['pinned-title']}>
                          <span className={styles['pinned-indicator']}></span>
                          <span>{spec.name}</span>
                        </span>
                        <button 
                          className={styles['pinned-close']}
                          onClick={(e) => {
                            e.stopPropagation()
                            setPinnedSpecs(pinnedSpecs.filter((_, i) => i !== index))
                            // Adjust current index if needed
                            if (currentPinnedIndex >= pinnedSpecs.length - 1) {
                              setCurrentPinnedIndex(Math.max(0, pinnedSpecs.length - 2))
                            }
                          }}
                          title="Unpin"
                        >
                          ×
                        </button>
                      </div>
                      <div className={styles['pinned-type']}>{spec.type}</div>
                      <div className={styles['pinned-details']}>
                        {spec.extras && (
                          <div className={styles['pinned-detail-row']}>
                            <span className={styles['pinned-detail-label']}>element</span>
                            <span className={styles['pinned-detail-value']}>{spec.extras}</span>
                          </div>
                        )}
                        {spec.details && Object.entries(spec.details).slice(0, 4).map(([key, value]) => {
                            if (key === 'classes') {
                              return (
                                <div key={key} className={styles['pinned-classes']}>
                                  <span className={styles['pinned-classes-label']}>CLASSES:</span>
                                  <div className={styles['pinned-classes-value']}>
                                    {value.slice(0, 100)}{value.length > 100 ? '...' : ''}
                                  </div>
                                </div>
                              )
                            }
                            return (
                              <div key={key} className={cx(styles['pinned-detail-row'], 'text-[10px]')}>
                                <span className={styles['pinned-detail-label']}>{key}</span>
                                <span className="text-gray-400 truncate ml-2" style={{ maxWidth: '150px' }}>{value}</span>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Indicators */}
            {pinnedSpecs.length > 1 && (
              <nav className={styles['carousel-indicators']} role="tablist">
                {pinnedSpecs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPinnedIndex(index)}
                    className={cx(
                      styles['carousel-dot'],
                      index === currentPinnedIndex ? styles['active'] : styles['inactive']
                    )}
                    role="tab"
                    aria-selected={index === currentPinnedIndex}
                    aria-label={`Go to pinned style ${index + 1}`}
                  />
                ))}
              </nav>
            )}
          </nav>
        </section>
      </aside>

      {/* Fixed Active Preview - Middle right */}
      <aside className={styles['preview-panel']} aria-label="Active style preview">
        <article className={cx(
          styles['inspector-card'],
          'w-[280px] transition-all duration-300',
          hoveredSpec ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        )}>
          {/* Subtle scanline effect on inspector */}
          <div className={styles['scanline-effect-blue']} aria-hidden="true" />
          <header>
            <h4 className={cx(ts.typography.uiSectionHeader, 'mb-3 relative z-10')}>Active Preview</h4>
          </header>
          {hoveredSpec && (
            <div className={styles['preview-content']}>
              <header className={styles['preview-header']}>
                <p className={styles['preview-title']}>{hoveredSpec.name}</p>
                <span className={styles['preview-type']}>{hoveredSpec.type}</span>
              </header>
              <dl className={styles['preview-details']}>
                  {hoveredSpec.extras && (
                    <div className={styles['preview-detail-row']}>
                      <dt className={styles['preview-detail-label']}>element</dt>
                      <dd className={styles['preview-detail-value']}>{hoveredSpec.extras}</dd>
                    </div>
                  )}
                  {hoveredSpec.details && Object.entries(hoveredSpec.details).map(([key, value]) => {
                  if (key === 'classes') {
                    return (
                      <div key={key} className={styles['preview-classes']}>
                        <dt className={styles['preview-classes-label']}>CLASSES:</dt>
                        <dd className={styles['preview-classes-value']}>
                          {value}
                        </dd>
                      </div>
                    )
                  }
                  return (
                    <div key={key} className={styles['preview-detail-row']}>
                      <dt className={styles['preview-detail-label']}>{key}</dt>
                      <dd className={styles['preview-detail-value']}>{value}</dd>
                    </div>
                  )
                  })}
                </dl>
              <footer className={styles['preview-footer']}>
                <span className={styles['preview-hint']}>Click to pin</span>
              </footer>
            </div>
          )}
        </article>
      </aside>
      
      <div className={styles['content-wrapper']}>
        {/* Header with scanline effect */}
        <header className={styles['page-header']}>
          <div className={styles['scanline-effect-blue']} aria-hidden="true" />
          <div className={styles['header-card']}>
            <h1 className={styles['header-title']}>
              {ts.name.toUpperCase()} {/* STYLE GUIDE */}
            </h1>
            <p className={ts.typography.bodyMono}>{ts.description}</p>
            <div className={styles['status-indicator']}>
              <span className={ts.components.status.online} aria-hidden="true" />
              <span className={ts.typography.bodySmallMono}>SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </header>

        {/* Design Philosophy */}
        <section id="design-philosophy" className={styles['section-container']}>
          <h2 className={ts.typography.sectionTitle}>DESIGN PHILOSOPHY</h2>
          
          <article className={cx(ts.components.card.default, styles['section-card'])}>
            <div className="space-y-8">
              {/* Core Principles */}
              <section>
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>CORE PRINCIPLES</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className={ts.typography.h4}>MILITARY-GRADE PRECISION</h4>
                    <p className={ts.typography.bodySmall}>Every element serves a purpose. No decorative flourishes without function. Interfaces should feel like they're built for operators who need to make split-second decisions with perfect clarity.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className={ts.typography.h4}>TACTICAL INFORMATION HIERARCHY</h4>
                    <p className={ts.typography.bodySmall}>Information is weaponized. The most critical data gets the highest visual weight. Use typography, spacing, and color to create clear information hierarchies.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className={ts.typography.h4}>OPERATIONAL EFFICIENCY</h4>
                    <p className={ts.typography.bodySmall}>Every interaction should feel like it's been optimized for speed and accuracy. Buttons are sized for precision clicking, text is legible at a glance.</p>
                  </div>
                </div>
              </section>

              {/* Design Philosophy in Practice */}
              <section>
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>PHILOSOPHY IN PRACTICE</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className={ts.typography.h4}>TYPOGRAPHY: THE COMMAND STRUCTURE</h4>
                      <ul className={cx(ts.typography.bodySmall, 'space-y-1')}>
                        <li>• Headers are commands: Uppercase, bold weights, tight tracking</li>
                        <li>• Body text is intelligence: Clean, readable fonts</li>
                        <li>• Labels are coordinates: Monospace for technical precision</li>
                        <li>• Hierarchy through weight: Vary weight and spacing</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className={ts.typography.h4}>SPACING: TACTICAL BREATHING ROOM</h4>
                      <ul className={cx(ts.typography.bodySmall, 'space-y-1')}>
                        <li>• Tight but not cramped: 4px/8px/16px spacing system</li>
                        <li>• Group related elements: Visual groups support logic</li>
                        <li>• Respect the grid: Everything aligns consistently</li>
                        <li>• Negative space as weapon: Direct attention and focus</li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className={ts.typography.h4}>COLOR: STRATEGIC DEPLOYMENT</h4>
                      <ul className={cx(ts.typography.bodySmall, 'space-y-1')}>
                        <li>• Grayscale foundation: Sophisticated contrast</li>
                        <li>• Accent colors are alerts: Signal important information</li>
                        <li>• Semantic color coding: Green/Red/Blue/Amber meanings</li>
                        <li>• Color as hierarchy: Brighter = higher priority</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className={ts.typography.h4}>LAYOUT: COMMAND CENTER ARCHITECTURE</h4>
                      <ul className={cx(ts.typography.bodySmall, 'space-y-1')}>
                        <li>• Sidebars are control panels: Navigation and controls</li>
                        <li>• Headers are status displays: Current state and critical info</li>
                        <li>• Content areas are mission control: Tactical displays</li>
                        <li>• Grids are intelligence networks: Organize data systematically</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interface Patterns */}
              <section>
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>INTERFACE PATTERNS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className={ts.typography.h4}>DASHBOARD PHILOSOPHY</h4>
                    <p className={ts.typography.bodySmall}>Dashboards should feel like mission control. The most important metrics get the largest visual weight. Use cards to group related data, and always provide context for what the numbers mean.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className={ts.typography.h4}>NAVIGATION PHILOSOPHY</h4>
                    <p className={ts.typography.bodySmall}>Navigation should feel like switching between tactical displays. Use clear, descriptive labels. Group related functions together. The current location should always be obvious.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className={ts.typography.h4}>DATA DISPLAY PHILOSOPHY</h4>
                    <p className={ts.typography.bodySmall}>Data should feel like intelligence reports. Use monospace fonts for numbers and technical data. Provide context and units. Use color to highlight anomalies or important trends.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className={ts.typography.h4}>FORM PHILOSOPHY</h4>
                    <p className={ts.typography.bodySmall}>Forms should feel like configuring tactical systems. Use clear labels and helpful hints. Group related fields together. Provide immediate feedback on errors.</p>
                  </div>
                </div>
              </section>

              {/* Implementation Guidelines */}
              <section>
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>IMPLEMENTATION GUIDELINES</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className={ts.typography.h4}>WHEN BUILDING INTERFACES</h4>
                    <ol className={cx(ts.typography.bodySmall, 'space-y-1 mt-2')}>
                      <li>1. Start with the mission: What is the user trying to accomplish?</li>
                      <li>2. Identify critical information: What data is most important for decision-making?</li>
                      <li>3. Create clear hierarchy: Use typography, spacing, and color to guide attention</li>
                      <li>4. Optimize for speed: Every interaction should feel fast and precise</li>
                      <li>5. Maintain consistency: Use the design system consistently across all interfaces</li>
                    </ol>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={ts.typography.h4}>COMMON PATTERNS</h4>
                      <ul className={cx(ts.typography.bodySmall, 'space-y-1 mt-2')}>
                        <li>• Status displays: Consistent indicators (online/offline/error/warning)</li>
                        <li>• Data tables: Monospace fonts and clear column headers</li>
                        <li>• Action buttons: Consistent styles with clear labels</li>
                        <li>• Navigation: Clear, descriptive labels and logical grouping</li>
                        <li>• Forms: Clear labels, helpful hints, immediate validation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className={ts.typography.h4}>AVOID THESE ANTI-PATTERNS</h4>
                      <ul className={cx(ts.typography.bodySmall, 'space-y-1 mt-2')}>
                        <li>• Decorative elements without purpose</li>
                        <li>• Inconsistent spacing or typography</li>
                        <li>• Color used without semantic meaning</li>
                        <li>• Complex animations that don't guide attention</li>
                        <li>• Interfaces that feel "cute" instead of precise</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Terminal Aesthetic */}
              <section>
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>THE TERMINAL AESTHETIC</h3>
                <div className="space-y-4">
                  <p className={ts.typography.body}>The goal is to create interfaces that feel like they belong in a high-tech command center. They should be:</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 border border-gray-800 rounded">
                      <h5 className={ts.typography.h5}>PRECISE</h5>
                      <p className={ts.typography.bodySmall}>Every element intentionally placed</p>
                    </div>
                    <div className="text-center p-3 border border-gray-800 rounded">
                      <h5 className={ts.typography.h5}>PROFESSIONAL</h5>
                      <p className={ts.typography.bodySmall}>Serious and business-focused</p>
                    </div>
                    <div className="text-center p-3 border border-gray-800 rounded">
                      <h5 className={ts.typography.h5}>EFFICIENT</h5>
                      <p className={ts.typography.bodySmall}>Optimized for speed and accuracy</p>
                    </div>
                    <div className="text-center p-3 border border-gray-800 rounded">
                      <h5 className={ts.typography.h5}>INTELLIGENT</h5>
                      <p className={ts.typography.bodySmall}>Smart use of data hierarchy</p>
                    </div>
                    <div className="text-center p-3 border border-gray-800 rounded">
                      <h5 className={ts.typography.h5}>TACTICAL</h5>
                      <p className={ts.typography.bodySmall}>Built for quick decisions</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 border-l-4 border-cyan-500 bg-cyan-950/20">
                    <p className={cx(ts.typography.bodySmall, 'font-semibold')}>
                      When in doubt, ask: "Would this feel at home in a military command center or intelligence platform?" If the answer is no, reconsider the design choice.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </article>
        </section>

        {/* Typography */}
        <StyleSection category="typography">
          <section id="typography-section" className={styles['section-container']}>
            <h2 className={ts.typography.sectionTitle}>TYPOGRAPHY SYSTEM</h2>
            
            <article className={cx(ts.components.card.default, styles['section-card'])}>
              {/* Headers Section */}
              <section id="typography-headers" className={styles['subsection']}>
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>HEADERS</h3>
                <div className={styles['typography-list']} role="list">
                  <StyleElement 
                    styleValue={ts.typography.h1}
                    displayName="Primary Header"
                  >
                    <h1 className={ts.typography.h1}>Primary Header</h1>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.h2}
                    displayName="Section Header"
                  >
                    <h2 className={ts.typography.h2}>Section Header</h2>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.h3}
                    displayName="Subsection Header"
                  >
                    <h3 className={ts.typography.h3}>Subsection Header</h3>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.h4}
                    displayName="Component Header"
                  >
                    <h4 className={ts.typography.h4}>Component Header</h4>
                  </StyleElement>
                </div>
              </section>
              
              {/* Titles & Labels Section */}
              <section id="typography-titles-labels" className={styles['subsection']}>
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>TITLES & LABELS</h3>
                <div className={styles['typography-list-compact']} role="list">
                  <StyleElement
                    styleValue={ts.typography.sectionTitle}
                    displayName="SECTION TITLE"
                  >
                    <p className={ts.typography.sectionTitle}>SECTION TITLE</p>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.subsectionTitle}
                    displayName="SUBSECTION TITLE"
                  >
                    <p className={ts.typography.subsectionTitle}>SUBSECTION TITLE</p>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.label}
                    displayName="INPUT LABEL"
                  >
                    <label className={ts.typography.label}>INPUT LABEL</label>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.labelRequired}
                    displayName="REQUIRED FIELD"
                  >
                    <label className={ts.typography.labelRequired}>REQUIRED FIELD</label>
                  </StyleElement>
                </div>
              </section>
              
              {/* Body Text Section */}
              <section id="typography-body-text">
                <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>BODY TEXT</h3>
                <div className={styles['typography-list-compact']} role="list">
                  <StyleElement
                    styleValue={ts.typography.body}
                    displayName="Standard body text"
                  >
                    <p className={ts.typography.body}>Standard body text for general content</p>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.bodyMono}
                    displayName="Monospace body text"
                  >
                    <p className={ts.typography.bodyMono}>Monospace body text for technical content</p>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.bodySmall}
                    displayName="Small text"
                  >
                    <p className={ts.typography.bodySmall}>Small text for secondary information</p>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.bodySmallMono}
                    displayName="Small monospace"
                  >
                    <p className={ts.typography.bodySmallMono}>Small monospace for metadata</p>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.typography.code}
                    displayName="Inline code"
                  >
                    <div>
                      <code className={ts.typography.code}>inline.code()</code>
                    </div>
                  </StyleElement>
                </div>
              </section>
            </article>
          </section>
        </StyleSection>

        {/* Color Palette */}
        <StyleSection category="color">
          <section id="color-palette" className={styles['section-container']}>
            <h2 className={ts.typography.sectionTitle}>COLOR PROTOCOL</h2>
            
            <div className={styles['color-grid']}>
              {/* Grayscale */}
              <article id="color-grayscale" className={cx(ts.components.card.default, styles['section-card'])}>
                <h3 className={ts.typography.subsectionTitle}>GRAYSCALE FOUNDATION</h3>
                <div className={styles['grayscale-grid']} role="list">
                  {Object.entries(ts.colors.gray).slice(0, 5).map(([key, value]) => (
                    <StyleElement
                      key={key}
                      styleValue={value}
                      displayName={`Gray ${key}`}
                      className="h-16"
                    >
                      <div 
                        className={styles['color-swatch']}
                        style={{ backgroundColor: value }}
                      >
                        <span className={styles['color-swatch-label']}>{key}</span>
                      </div>
                    </StyleElement>
                  ))}
                </div>
              </article>
              
              {/* Accent Colors */}
              <article id="color-accent" className={cx(ts.components.card.default, styles['section-card'])}>
                <h3 className={ts.typography.subsectionTitle}>CRITICAL STATE INDICATORS</h3>
                <div className={styles['accent-list']} role="list">
                  <StyleElement
                    styleValue={ts.colors.accent.primary}
                    displayName="Primary Action"
                  >
                    <div className={styles['accent-item']}>
                      <div 
                        className={styles['accent-preview']}
                        style={{ 
                          backgroundColor: ts.colors.accent.primary + '33',
                          borderColor: ts.colors.accent.primary + '80'
                        }}
                      />
                      <span className={styles['accent-label']} style={{ color: ts.colors.accent.primary }}>PRIMARY ACTION</span>
                    </div>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.colors.accent.success}
                    displayName="Success State"
                  >
                    <div className={styles['accent-item']}>
                      <div 
                        className={styles['accent-preview']}
                        style={{ 
                          backgroundColor: ts.colors.accent.success + '33',
                          borderColor: ts.colors.accent.success + '80'
                        }}
                      />
                      <span className={styles['accent-label']} style={{ color: ts.colors.accent.success }}>SUCCESS STATE</span>
                    </div>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.colors.accent.warning}
                    displayName="Warning State"
                  >
                    <div className={styles['accent-item']}>
                      <div 
                        className={styles['accent-preview']}
                        style={{ 
                          backgroundColor: ts.colors.accent.warning + '33',
                          borderColor: ts.colors.accent.warning + '80'
                        }}
                      />
                      <span className={styles['accent-label']} style={{ color: ts.colors.accent.warning }}>WARNING STATE</span>
                    </div>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.colors.accent.error}
                    displayName="Error State"
                  >
                    <div className={styles['accent-item']}>
                      <div 
                        className={styles['accent-preview']}
                        style={{ 
                          backgroundColor: ts.colors.accent.error + '33',
                          borderColor: ts.colors.accent.error + '80'
                        }}
                      />
                      <span className={styles['accent-label']} style={{ color: ts.colors.accent.error }}>ERROR STATE</span>
                    </div>
                  </StyleElement>
                </div>
              </article>
            </div>
          </section>
        </StyleSection>

        {/* Components */}
        <section id="component-library" className={styles['section-container']}>
          <h2 className={ts.typography.sectionTitle}>COMPONENT LIBRARY</h2>
          
          <div className={styles['component-grid']}>
            {/* Inputs */}
            <StyleSection category="input">
              <article id="component-inputs" className={cx(ts.components.card.default, styles['section-card-spacing'])}>
                <h3 className={ts.typography.subsectionTitle}>INPUT FIELDS</h3>
              
              <StyleElement
                styleValue={ts.components.input.default}
                displayName="Default Input"
              >
                <div>
                  <label htmlFor="input-default" className={ts.typography.label}>DEFAULT INPUT</label>
                  <input id="input-default" className={ts.components.input.default} placeholder="Enter command..." />
                </div>
              </StyleElement>
              
              <StyleElement
                styleValue={ts.components.input.active}
                displayName="Active Input"
              >
                <div>
                  <label htmlFor="input-active" className={ts.typography.label}>ACTIVE INPUT</label>
                  <input id="input-active" className={ts.components.input.active} placeholder="Active state..." />
                </div>
              </StyleElement>
              
              <StyleElement
                styleValue={ts.components.input.error}
                displayName="Error Input"
              >
                <div>
                  <label htmlFor="input-error" className={ts.typography.label}>ERROR INPUT</label>
                  <input id="input-error" className={ts.components.input.error} placeholder="Error state..." aria-invalid="true" />
                </div>
              </StyleElement>
              
              <StyleElement
                styleValue={ts.components.input.minimal}
                displayName="Minimal Input"
              >
                <div>
                  <label htmlFor="input-minimal" className={ts.typography.label}>MINIMAL INPUT</label>
                  <input id="input-minimal" className={ts.components.input.minimal} placeholder="Minimal style..." />
                </div>
                </StyleElement>
              </article>
            </StyleSection>
            
            {/* Buttons */}
            <StyleSection category="button">
              <article id="component-buttons" className={cx(ts.components.card.default, styles['section-card-spacing-large'])}>
                <h3 className={ts.typography.subsectionTitle}>ACTION BUTTONS</h3>
              
              <div className="space-y-3">
                <div className={styles['button-grid']}>
                  <StyleElement
                    styleValue={ts.components.button.primary}
                    displayName="Primary Button"
                  >
                    <button className={ts.components.button.primary}>
                      EXECUTE
                    </button>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.components.button.secondary}
                    displayName="Secondary Button"
                  >
                    <button className={ts.components.button.secondary}>
                      CONFIGURE
                    </button>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.components.button.ghost}
                    displayName="Ghost Button"
                  >
                    <button className={ts.components.button.ghost}>
                      CANCEL
                    </button>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.components.button.danger}
                    displayName="Danger Button"
                  >
                    <button className={ts.components.button.danger}>
                      TERMINATE
                    </button>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.components.button.success}
                    displayName="Success Button"
                  >
                    <button className={ts.components.button.success}>
                      CONFIRM
                    </button>
                  </StyleElement>
                  
                  <StyleElement
                    styleValue={ts.components.button.warning}
                    displayName="Warning Button"
                  >
                    <button className={ts.components.button.warning}>
                      WARNING
                    </button>
                  </StyleElement>
                </div>
                
                <div className={styles['button-section-divider']}>
                  <p className={cx(ts.typography.label, styles['button-disabled-label'])}>DISABLED STATE</p>
                  <button className={ts.components.button.primary} disabled aria-disabled="true">
                    DISABLED
                  </button>
                </div>
              </div>
            </article>
          </StyleSection>
        </div>
      </section>

        {/* Cards */}
        <StyleSection category="card">
          <section id="container-types" className={styles['section-container']}>
            <h2 className={ts.typography.sectionTitle}>CONTAINER TYPES</h2>
            
            <div className={styles['component-grid-triple']}>
              <StyleElement
                styleValue={ts.components.card.default}
                displayName="Default Card"
              >
                <article className={cx(ts.components.card.default, 'p-4')}>
                  <h3 className={ts.typography.subsectionTitle}>DEFAULT CARD</h3>
                  <p className={ts.typography.bodySmallMono}>Standard container with border</p>
                </article>
              </StyleElement>
              
              <StyleElement
                styleValue={ts.components.card.elevated}
                displayName="Elevated Card"
              >
                <article className={cx(ts.components.card.elevated, 'p-4')}>
                  <h3 className={ts.typography.subsectionTitle}>ELEVATED CARD</h3>
                  <p className={ts.typography.bodySmallMono}>Enhanced depth with shadow</p>
                </article>
              </StyleElement>
              
              <StyleElement
                styleValue={ts.components.card.glass}
                displayName="Glass Card"
              >
                <article className={cx(ts.components.card.glass, 'p-4')}>
                  <h3 className={ts.typography.subsectionTitle}>GLASS CARD</h3>
                  <p className={ts.typography.bodySmallMono}>Transparent with backdrop blur</p>
                </article>
              </StyleElement>
            </div>
          </section>
        </StyleSection>

        {/* Badges */}
        <StyleSection category="badge">
          <section id="status-badges" className={styles['section-container']}>
            <h2 className={ts.typography.sectionTitle}>STATUS BADGES</h2>
            
            <article className={cx(ts.components.card.default, styles['section-card'])}>
              <div className={styles['badge-list']}>
                <StyleElement
                  styleValue={`${ts.components.badge.default} ${ts.components.badge.neutral}`}
                  displayName="Neutral Badge"
                >
                  <span className={cx(ts.components.badge.default, ts.components.badge.neutral)}>NEUTRAL</span>
                </StyleElement>
                
                <StyleElement
                  styleValue={`${ts.components.badge.default} ${ts.components.badge.primary}`}
                  displayName="Primary Badge"
                >
                  <span className={cx(ts.components.badge.default, ts.components.badge.primary)}>PRIMARY</span>
                </StyleElement>
                
                <StyleElement
                  styleValue={`${ts.components.badge.default} ${ts.components.badge.success}`}
                  displayName="Success Badge"
                >
                  <span className={cx(ts.components.badge.default, ts.components.badge.success)}>SUCCESS</span>
                </StyleElement>
                
                <StyleElement
                  styleValue={`${ts.components.badge.default} ${ts.components.badge.warning}`}
                  displayName="Warning Badge"
                >
                  <span className={cx(ts.components.badge.default, ts.components.badge.warning)}>WARNING</span>
                </StyleElement>
                
                <StyleElement
                  styleValue={`${ts.components.badge.default} ${ts.components.badge.error}`}
                  displayName="Error Badge"
                >
                  <span className={cx(ts.components.badge.default, ts.components.badge.error)}>ERROR</span>
                </StyleElement>
              </div>
            </article>
          </section>
        </StyleSection>

        {/* Data Table */}
        <StyleSection category="status">
          <section id="data-table" className={styles['section-container']}>
            <h2 className={ts.typography.sectionTitle}>DATA VISUALIZATION</h2>
            
            <article className={ts.components.card.default}>
              <table className={styles['data-table']}>
                <thead>
                  <tr className={ts.components.table.header}>
                    <th className="text-left px-3 py-2" scope="col">ID</th>
                    <th className="text-left px-3 py-2" scope="col">SIGNAL</th>
                    <th className="text-left px-3 py-2" scope="col">FREQUENCY</th>
                    <th className="text-left px-3 py-2" scope="col">STATUS</th>
                    <th className="text-left px-3 py-2" scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cx(ts.components.table.row, styles['table-row-hover'])}>
                    <td className={ts.components.table.cell}>001</td>
                    <td className={ts.components.table.cell}>ALPHA</td>
                    <td className={ts.components.table.cell}>440Hz</td>
                    <td className={ts.components.table.cell}>
                      <StyleElement
                        styleValue={ts.components.status.online}
                        displayName="Online Status"
                      >
                        <div className="flex items-center gap-2">
                          <span className={ts.components.status.online} />
                          <span style={{ color: ts.colors.accent.success }}>ACTIVE</span>
                        </div>
                      </StyleElement>
                    </td>
                    <td className={ts.components.table.cell}>
                      <button className="text-sky-500 hover:text-sky-400 text-xs">MODIFY</button>
                    </td>
                  </tr>
                  <tr className={cx(ts.components.table.row, styles['table-row-hover'])}>
                    <td className={ts.components.table.cell}>002</td>
                    <td className={ts.components.table.cell}>BETA</td>
                    <td className={ts.components.table.cell}>880Hz</td>
                    <td className={ts.components.table.cell}>
                      <StyleElement
                        styleValue={ts.components.status.warning}
                        displayName="Warning Status"
                      >
                        <div className="flex items-center gap-2">
                          <span className={ts.components.status.warning} />
                          <span style={{ color: ts.colors.accent.warning }}>PENDING</span>
                        </div>
                      </StyleElement>
                    </td>
                    <td className={ts.components.table.cell}>
                      <button className="text-sky-500 hover:text-sky-400 text-xs">MODIFY</button>
                    </td>
                  </tr>
                  <tr className={cx(ts.components.table.row, styles['table-row-hover'])}>
                    <td className={ts.components.table.cell}>003</td>
                    <td className={ts.components.table.cell}>GAMMA</td>
                    <td className={ts.components.table.cell}>220Hz</td>
                    <td className={ts.components.table.cell}>
                      <StyleElement
                        styleValue={ts.components.status.offline}
                        displayName="Offline Status"
                      >
                        <div className="flex items-center gap-2">
                          <span className={ts.components.status.offline} />
                          <span className="text-gray-500">OFFLINE</span>
                        </div>
                      </StyleElement>
                    </td>
                    <td className={ts.components.table.cell}>
                      <button className="text-sky-500 hover:text-sky-400 text-xs">MODIFY</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          </section>
        </StyleSection>

        {/* Special Effects */}
        {ts.effects && (ts.effects.glowPrimary || ts.effects.scanline || ts.effects.grid) && (
          <StyleSection category="effect">
            <section id="special-effects" className={styles['section-container']}>
              <h2 className={ts.typography.sectionTitle}>SPECIAL EFFECTS</h2>
              
              <article className={cx(ts.components.card.default, styles['section-card'])}>
                {ts.effects.glowPrimary && (
                  <section id="effect-glow">
                    <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>GLOW EFFECTS</h3>
                    <div className={styles['effects-grid']}>
                      <StyleElement
                        styleValue={ts.effects.glowPrimary}
                        displayName="Primary Glow"
                      >
                        <button className={cx(ts.components.button.primary, ts.effects.glowPrimary)}>
                          PRIMARY
                        </button>
                      </StyleElement>
                      
                      <StyleElement
                        styleValue={ts.effects.glowSuccess}
                        displayName="Success Glow"
                      >
                        <button className={cx(ts.components.button.success, ts.effects.glowSuccess)}>
                          SUCCESS
                        </button>
                      </StyleElement>
                      
                      <StyleElement
                        styleValue={ts.effects.glowWarning}
                        displayName="Warning Glow"
                      >
                        <button className={cx(ts.components.button.warning, ts.effects.glowWarning)}>
                          WARNING
                        </button>
                      </StyleElement>
                      
                      <StyleElement
                        styleValue={ts.effects.glowError}
                        displayName="Error Glow"
                      >
                        <button className={cx(ts.components.button.danger, ts.effects.glowError)}>
                          ERROR
                        </button>
                      </StyleElement>
                    </div>
                  </section>
                )}
                
                {ts.effects.scanline && (
                  <section id="effect-scanline" className="mb-6">
                    <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>SCANLINE EFFECT</h3>
                    <StyleElement
                      styleValue={ts.effects.scanline}
                      displayName="Scanline Animation"
                    >
                      <div className={cx(
                        ts.components.card.elevated,
                        ts.effects.scanline,
                        styles['effect-card']
                      )}>
                        <p className={ts.typography.body}>Terminal scanline animation</p>
                      </div>
                    </StyleElement>
                  </section>
                )}
                
                {ts.effects.grid && (
                  <section id="effect-grid">
                    <h3 className={cx(ts.typography.subsectionTitle, styles['subsection-title'])}>GRID BACKGROUND</h3>
                    <StyleElement
                      styleValue={ts.effects.grid}
                      displayName="Grid Pattern"
                    >
                      <div className={cx(
                        ts.components.card.elevated,
                        ts.effects.grid,
                        styles['effect-card']
                      )}>
                        <p className={ts.typography.body}>Grid pattern background</p>
                      </div>
                    </StyleElement>
                  </section>
                )}
              </article>
            </section>
          </StyleSection>
        )}

        {/* Footer */}
        <footer className={styles['page-footer']}>
          <p className={ts.typography.bodySmallMono}>
            <time dateTime={new Date().getFullYear().toString()}>
              {ts.name.toUpperCase()} THEME // VERSION 1.0.0 // {new Date().getFullYear()}
            </time>
          </p>
        </footer>
      </div>
    </main>
  )
}