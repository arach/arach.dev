'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const themes = {
  terminal: 'theme-terminal',
  cyberpunk: 'theme-cyberpunk', 
  minimal: 'theme-minimal',
  retro: 'theme-retro',
}

type ThemeName = keyof typeof themes

// Centralized element enhancement system
function useElementEnhancer(onElementSelect?: (element: any) => void) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !onElementSelect) return

    const container = containerRef.current
    
    // Element selectors and their metadata extractors
    const elementTargets = [
      {
        selector: '[data-style-element="typography"]',
        extractor: (el: HTMLElement) => ({
          name: el.getAttribute('data-element-name') || 'Typography Element',
          description: el.getAttribute('data-description') || 'Typography element',
          classes: el.getAttribute('data-classes') || el.className,
          type: 'typography',
          variant: el.getAttribute('data-variant') || 'default',
          usage: el.getAttribute('data-usage') || `<${el.tagName.toLowerCase()} className="${el.className}">${el.textContent}</${el.tagName.toLowerCase()}>`
        })
      },
      {
        selector: '[data-style-element="color"]',
        extractor: (el: HTMLElement) => ({
          name: el.getAttribute('data-element-name') || 'Color Element',
          description: el.getAttribute('data-description') || 'Color swatch',
          classes: el.getAttribute('data-classes') || el.className,
          cssVar: el.getAttribute('data-css-var') || '',
          type: 'color',
          variant: el.getAttribute('data-variant') || 'default',
          usage: el.getAttribute('data-usage') || `<div className="${el.getAttribute('data-classes')}">Content</div>`
        })
      },
      {
        selector: '[data-style-element="button"]',
        extractor: (el: HTMLElement) => ({
          name: el.getAttribute('data-element-name') || 'Button Element',
          description: el.getAttribute('data-description') || 'Button component',
          classes: el.getAttribute('data-classes') || el.className,
          type: 'button',
          variant: el.getAttribute('data-variant') || 'default',
          usage: el.getAttribute('data-usage') || `<button className="${el.getAttribute('data-classes')}">${el.textContent}</button>`
        })
      },
      {
        selector: '[data-style-element="input"]',
        extractor: (el: HTMLElement) => ({
          name: el.getAttribute('data-element-name') || 'Input Element',
          description: el.getAttribute('data-description') || 'Form input',
          classes: el.getAttribute('data-classes') || '',
          labelClasses: el.getAttribute('data-label-classes') || '',
          type: 'input',
          variant: el.getAttribute('data-variant') || 'default',
          usage: el.getAttribute('data-usage') || `<input className="${el.getAttribute('data-classes')}" />`
        })
      },
      {
        selector: '[data-style-element="card"]',
        extractor: (el: HTMLElement) => ({
          name: el.getAttribute('data-element-name') || 'Card Element',
          description: el.getAttribute('data-description') || 'Card component',
          classes: el.getAttribute('data-classes') || el.className,
          type: 'card',
          variant: el.getAttribute('data-variant') || 'default',
          usage: el.getAttribute('data-usage') || `<div className="${el.getAttribute('data-classes')}">Card content</div>`
        })
      },
      {
        selector: '[data-style-element="badge"]',
        extractor: (el: HTMLElement) => ({
          name: el.getAttribute('data-element-name') || 'Badge Element',
          description: el.getAttribute('data-description') || 'Badge component',
          classes: el.getAttribute('data-classes') || el.className,
          type: 'badge',
          variant: el.getAttribute('data-variant') || 'default',
          usage: el.getAttribute('data-usage') || `<span className="${el.getAttribute('data-classes')}">${el.textContent}</span>`
        })
      }
    ]

    // Attach handlers to all target elements
    const attachedHandlers: { element: Element; handler: (e: Event) => void }[] = []

    elementTargets.forEach(({ selector, extractor }) => {
      const elements = container.querySelectorAll(selector)
      
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement
        
        // Create click handler
        const clickHandler = (event: Event) => {
          event.stopPropagation()
          const elementData = extractor(htmlElement)
          onElementSelect(elementData)
        }

        // Add visual enhancements
        htmlElement.style.cursor = 'pointer'
        htmlElement.classList.add('group', 'relative')
        
        // Add hover effects (only if UI animations are enabled)
        const hoverEnhancement = () => {
          const animationsEnabled = document.documentElement.getAttribute('data-ui-animations') === 'true'
          if (animationsEnabled) {
            htmlElement.style.transform = 'scale(1.02)'
            htmlElement.style.boxShadow = '0 8px 25px -8px rgba(0,0,0,0.2)'
            htmlElement.style.transition = 'all 300ms'
          }
        }
        
        const hoverReset = () => {
          htmlElement.style.transform = 'scale(1)'
          htmlElement.style.boxShadow = 'none'
          htmlElement.style.transition = ''
        }

        // Attach event listeners
        htmlElement.addEventListener('click', clickHandler)
        htmlElement.addEventListener('mouseenter', hoverEnhancement)
        htmlElement.addEventListener('mouseleave', hoverReset)
        
        // Store for cleanup
        attachedHandlers.push({ element: htmlElement, handler: clickHandler })
      })
    })

    // Cleanup function
    return () => {
      attachedHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler)
        const htmlElement = element as HTMLElement
        htmlElement.removeEventListener('mouseenter', () => {})
        htmlElement.removeEventListener('mouseleave', () => {})
        htmlElement.style.cursor = ''
        htmlElement.style.transform = ''
        htmlElement.style.boxShadow = ''
      })
    }
  }, [onElementSelect])

  return containerRef
}

// Helper functions for section metadata
function getSectionId(section: string): string {
  const ids: Record<string, string> = {
    typography: 'TYP-001',
    colors: 'CLR-002',
    buttons: 'BTN-003',
    inputs: 'FRM-004',
    cards: 'CRD-005',
    badges: 'BDG-006',
    tables: 'TBL-007',
    all: 'ALL-000'
  }
  return ids[section] || 'UNK-999'
}

function getSectionTitle(section: string): string {
  const titles: Record<string, string> = {
    typography: 'Typography System',
    colors: 'Color Palette',
    buttons: 'Button Components',
    inputs: 'Form Elements',
    cards: 'Card Containers',
    badges: 'Badge Indicators',
    tables: 'Data Tables',
    all: 'Complete System'
  }
  return titles[section] || section.replace(/([A-Z])/g, ' $1').trim()
}

function getSectionDescription(section: string): string {
  const descriptions: Record<string, string> = {
    typography: 'Hierarchical text system with tactical precision and clear information architecture',
    colors: 'Strategic color deployment for semantic states and visual hierarchy',
    buttons: 'Action triggers with purposeful styling and interaction states',
    inputs: 'Data entry components optimized for accuracy and validation',
    cards: 'Container elements with glass morphism and tactical framing',
    badges: 'Status indicators and categorical labels with semantic coloring',
    tables: 'Mission-critical data grids with sortable columns and inline actions',
    all: 'Complete design system overview with all component categories'
  }
  return descriptions[section] || 'Theme-aware components using CSS variables'
}

function getSectionComponentCount(section: string): number {
  const counts: Record<string, number> = {
    typography: 7,
    colors: 10,
    buttons: 7,
    inputs: 7,
    cards: 4,
    badges: 6,
    tables: 3,
    all: 44
  }
  return counts[section] || 0
}

function getSectionVariantCount(section: string): number {
  const counts: Record<string, number> = {
    typography: 14,
    colors: 4,
    buttons: 7,
    inputs: 10,
    cards: 4,
    badges: 6,
    tables: 5,
    all: 50
  }
  return counts[section] || 0
}

// Section Header Component - Integrated tactical display
interface SectionHeaderProps {
  title: string
  id: string
  status: 'active' | 'inactive' | 'loading'
  componentCount: number
  variantCount: number
}

function SectionHeader({ title, id, status, componentCount, variantCount }: SectionHeaderProps) {
  return (
    <div className="mb-6 relative">
      {/* Background scan effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-transparent rounded-sm" />
      
      {/* Main header container */}
      <div className="relative border border-border/40 bg-card/20 backdrop-blur-sm rounded-sm overflow-hidden section-header-tactical">
        {/* Top telemetry bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent telemetry-bar" />
        
        {/* Header content */}
        <div className="flex items-center">
          {/* Left accent */}
          <div className="w-0.5 self-stretch bg-gradient-to-b from-primary/80 via-primary/40 to-transparent" />
          
          {/* Main content */}
          <div className="flex-1 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Section ID badge */}
                <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-sm">
                  <span className="text-[10px] font-mono text-primary/90 uppercase tracking-wider">
                    {id}
                  </span>
                </div>
                
                {/* Section title */}
                <h3 className="text-base font-bold text-foreground uppercase tracking-tight">
                  {title}
                </h3>
                
                {/* Status indicator */}
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full status-indicator ${
                    status === 'active' ? 'bg-success' :
                    status === 'loading' ? 'bg-warning' :
                    'bg-muted'
                  }`} />
                  <span className="text-[9px] font-mono text-muted-foreground uppercase">
                    {status}
                  </span>
                </div>
              </div>
              
              {/* Right side metrics */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Components:</span>
                  <span className="text-xs font-mono text-foreground">{componentCount}</span>
                </div>
                <div className="h-3 w-px bg-border/50" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Variants:</span>
                  <span className="text-xs font-mono text-foreground">{variantCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom telemetry bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent telemetry-bar" />
      </div>
    </div>
  )
}

export default function StyleGuidePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [activeTheme, setActiveTheme] = useState<ThemeName>('terminal')
  const [activeSection, setActiveSection] = useState('typography')
  const [selectedElement, setSelectedElement] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [pinnedStyles, setPinnedStyles] = useState<any[]>([])
  const [showPinnedPanel, setShowPinnedPanel] = useState(false)
  const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [showRightSidebar, setShowRightSidebar] = useState(true)
  const [uiAnimations, setUiAnimations] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle hydration and localStorage loading
  useEffect(() => {
    setIsHydrated(true)
    const savedAnimations = localStorage.getItem('ui-animations')
    const savedDarkMode = localStorage.getItem('dark-mode')
    if (savedAnimations !== null) {
      setUiAnimations(savedAnimations === 'true')
    }
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true')
    }
  }, [])

  // Sync with URL params
  useEffect(() => {
    const section = searchParams.get('section')
    const theme = searchParams.get('theme') as ThemeName
    
    if (section) setActiveSection(section)
    if (theme && themes[theme]) setActiveTheme(theme)
  }, [searchParams])

  // Update URL when section/theme changes
  const updateURL = (section?: string, theme?: ThemeName) => {
    const params = new URLSearchParams(searchParams.toString())
    if (section) params.set('section', section)
    if (theme) params.set('theme', theme)
    router.push(`?${params.toString()}`)
  }
  
  const currentThemeClass = themes[activeTheme]

  // Use the centralized element enhancer
  const containerRef = useElementEnhancer((element) => {
    setSelectedElement(element)
    setShowPinnedPanel(false)
    setShowRightSidebar(true) // Auto-expand preview on element click
  })

  // Apply theme to document body
  useEffect(() => {
    document.body.className = currentThemeClass
  }, [currentThemeClass])

  // Save UI animations preference (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('ui-animations', String(uiAnimations))
      // Apply data attribute to control CSS
      document.documentElement.setAttribute('data-ui-animations', String(uiAnimations))
    }
  }, [uiAnimations, isHydrated])

  // Handle dark mode
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('dark-mode', String(darkMode))
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkMode, isHydrated])

  // Handle scroll detection for header sizing
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smart element inspection system
  const handleElementClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    
    // Skip if clicking on typography elements (they handle their own clicks)
    if (target.getAttribute('title')?.includes('Click to inspect')) {
      return
    }
    
    // Skip if clicking on text or non-interactive elements
    if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'SPAN') {
      return
    }
    
    event.stopPropagation()
    
    // Extract style information from the element
    const elementData = inspectElement(target)
    if (elementData) {
      setSelectedElement(elementData)
      setShowPinnedPanel(false)
      setShowRightSidebar(true) // Auto-expand preview on element click
    }
  }

  // Inspect an element and extract relevant style information
  const inspectElement = (element: HTMLElement) => {
    const tagName = element.tagName.toLowerCase()
    const className = element.className
    
    // Button inspection
    if (tagName === 'button') {
      const variant = getButtonVariant(className)
      return {
        name: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Button`,
        description: getButtonDescription(variant),
        classes: className,
        type: 'button',
        variant: variant,
        usage: `<button className="${className}">
  Button Text
</button>`
      }
    }
    
    // Color swatch inspection
    if (element.style.backgroundColor) {
      const color = element.style.backgroundColor
      return {
        name: 'Color Swatch',
        description: 'Theme color from the color palette',
        color: color,
        colorName: 'theme-color',
        classes: className,
        type: 'color'
      }
    }
    
    // Card inspection
    if (className.includes('bg-card') || className.includes('border')) {
      return {
        name: 'Card Component',
        description: 'Container element with theme styling',
        classes: className,
        type: 'card',
        usage: `<div className="${className}">
  Card content
</div>`
      }
    }
    
    return null
  }

  const getButtonVariant = (className: string) => {
    if (className.includes('bg-primary')) return 'primary'
    if (className.includes('bg-secondary')) return 'secondary'
    if (className.includes('bg-transparent')) return 'ghost'
    if (className.includes('bg-destructive')) return 'danger'
    if (className.includes('bg-success')) return 'success'
    return 'unknown'
  }

  const getButtonDescription = (variant: string) => {
    const descriptions: Record<string, string> = {
      primary: 'Main call-to-action button',
      secondary: 'Secondary actions and alternatives',
      ghost: 'Subtle actions with minimal visual weight',
      danger: 'Destructive actions like delete or cancel',
      success: 'Positive confirmations and successful actions'
    }
    return descriptions[variant] || 'Button component'
  }

  // Pin/unpin functionality
  const pinStyle = (element: any) => {
    const elementWithId = { ...element, id: `${element.type}-${Date.now()}` }
    setPinnedStyles(prev => [...prev, elementWithId])
  }

  const unpinStyle = (id: string) => {
    setPinnedStyles(prev => prev.filter(item => item.id !== id))
  }

  const isStylePinned = (element: any) => {
    return pinnedStyles.some(pinned => 
      pinned.type === element?.type && 
      pinned.variant === element?.variant &&
      pinned.classes === element?.classes
    )
  }

  const clearAllPinned = () => {
    setPinnedStyles([])
  }

  const sections = [
    { id: 'all', label: 'All' },
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Colors' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Form Elements' },
    { id: 'cards', label: 'Cards' },
    { id: 'badges', label: 'Badges' },
    { id: 'tables', label: 'Data Tables' },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 ${
        isScrolled ? 'py-2 shadow-sm' : 'py-4'
      } ${uiAnimations ? 'transition-all duration-300' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className={`${uiAnimations ? 'transition-all duration-300' : ''} ${isScrolled ? 'scale-90' : ''}`}>
              <h1 className={`font-bold text-foreground ${
                isScrolled ? 'text-lg' : 'text-2xl'
              } ${uiAnimations ? 'transition-all duration-300' : ''}`}>Style Guide</h1>
              {!isScrolled && (
                <p className={`text-sm text-muted-foreground mt-1 ${uiAnimations ? 'transition-opacity duration-300' : ''}`}>
                  Interactive design system showcase
                </p>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn-ghost btn-sm flex items-center gap-2"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {darkMode ? (
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  ) : (
                    <>
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </>
                  )}
                </svg>
                <span className="text-xs">{darkMode ? 'Dark' : 'Light'}</span>
              </button>

              {/* UI Animations Toggle */}
              <button
                onClick={() => setUiAnimations(!uiAnimations)}
                className={`btn-ghost btn-sm flex items-center gap-2`}
                title={uiAnimations ? 'Disable UI Chrome animations' : 'Enable UI Chrome animations'}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={uiAnimations ? '' : 'opacity-50'}
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  {uiAnimations && <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>}
                </svg>
                <span className="text-xs">{uiAnimations ? 'UI FX On' : 'UI FX Off'}</span>
              </button>

              {/* Pinned Styles Button */}
              <button
                onClick={() => setShowPinnedPanel(!showPinnedPanel)}
                className={`relative ${
                  showPinnedPanel || pinnedStyles.length > 0
                    ? 'btn-primary btn-sm' 
                    : 'btn-secondary btn-sm'
                }`}
              >
                Pinned
                {pinnedStyles.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pinnedStyles.length}
                  </span>
                )}
              </button>

              {/* Theme Selector */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-muted-foreground">Theme:</label>
                <select 
                  value={activeTheme}
                  onChange={(e) => setActiveTheme(e.target.value as ThemeName)}
                  className="bg-input border border-border rounded-md px-3 py-1 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {Object.keys(themes).map((theme) => (
                    <option key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-full mx-auto flex">
        {/* Sidebar Navigation */}
        <nav className={`${showLeftSidebar ? 'w-64' : 'w-12'} h-[calc(100vh-theme(spacing.16))] border-r border-white/10 bg-card/20 backdrop-blur-md sticky top-16 overflow-hidden shadow-xl shadow-black/10 ${uiAnimations ? 'transition-all duration-200' : ''}`}>
          {showLeftSidebar ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sections</h2>
                <button
                  onClick={() => setShowLeftSidebar(false)}
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  title="Collapse sidebar"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
              </div>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        setActiveSection(section.id)
                        updateURL(section.id)
                        setSelectedElement(null)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary/10 text-primary border-l-2 border-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-3 flex justify-center">
                <button
                  onClick={() => setShowLeftSidebar(true)}
                  className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  title="Expand navigation sidebar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main ref={containerRef} className="flex-1 p-8 transition-all duration-200" onClick={handleElementClick}>
          <div className="max-w-4xl">
            {/* Tactical Section Header - Integrated Command Center Display */}
            <header className="mb-8 relative">
              {/* Background scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent" />
              
              {/* Main header container with tactical frame */}
              <div className="relative border border-border/50 bg-card/30 backdrop-blur-sm rounded-sm overflow-hidden section-header-tactical">
                {/* Top status bar */}
                <div className="flex items-center justify-between px-4 py-1 bg-muted/20 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    {/* Status indicators */}
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-[10px] font-mono text-success uppercase">ACTIVE</span>
                    </div>
                    <div className="h-3 w-px bg-border/50" />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      SECTION: {activeSection.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      THEME: {activeTheme.toUpperCase()}
                    </span>
                    <div className="h-3 w-px bg-border/50" />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      REV: 2.0.1
                    </span>
                  </div>
                </div>
                
                {/* Main content area with left accent */}
                <div className="flex">
                  {/* Tactical accent bar */}
                  <div className="w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="flex-1 px-6 py-4">
                    {/* Section identifier */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-2 py-0.5 bg-primary/10 border border-primary/30 rounded-sm">
                        <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
                          {getSectionId(activeSection)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                        <span>/</span>
                        <span>STYLEGUIDE</span>
                        <span>/</span>
                        <span>COMPONENTS</span>
                      </div>
                    </div>
                    
                    {/* Section title */}
                    <h2 className="text-xl font-bold text-foreground uppercase tracking-tight mb-1">
                      {getSectionTitle(activeSection)}
                    </h2>
                    
                    {/* Section description */}
                    <p className="text-xs text-muted-foreground font-mono">
                      {getSectionDescription(activeSection)}
                    </p>
                  </div>
                  
                  {/* Right side metrics */}
                  <div className="px-4 py-4 border-l border-border/30 bg-muted/5">
                    <div className="space-y-2">
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Components</div>
                        <div className="text-sm font-mono text-foreground">{getSectionComponentCount(activeSection)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Variants</div>
                        <div className="text-sm font-mono text-foreground">{getSectionVariantCount(activeSection)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom telemetry bar */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>
            </header>

            {/* Content based on active section */}
            <div className="space-y-12">
              {activeSection === 'all' ? (
                <>
                  <section id="typography-section">
                    <SectionHeader 
                      title="Typography" 
                      id="TYP-001"
                      status="active"
                      componentCount={7}
                      variantCount={14}
                    />
                    <TypographySection activeTheme={activeTheme} />
                  </section>
                  
                  <section id="colors-section">
                    <SectionHeader 
                      title="Colors" 
                      id="CLR-002"
                      status="active"
                      componentCount={10}
                      variantCount={4}
                    />
                    <ColorsSection />
                  </section>
                  
                  <section id="buttons-section">
                    <SectionHeader 
                      title="Buttons" 
                      id="BTN-003"
                      status="active"
                      componentCount={7}
                      variantCount={7}
                    />
                    <ButtonsSection />
                  </section>
                  
                  <section id="inputs-section">
                    <SectionHeader 
                      title="Form Elements" 
                      id="FRM-004"
                      status="active"
                      componentCount={7}
                      variantCount={10}
                    />
                    <InputsSection />
                  </section>
                  
                  <section id="cards-section">
                    <SectionHeader 
                      title="Cards" 
                      id="CRD-005"
                      status="active"
                      componentCount={4}
                      variantCount={4}
                    />
                    <CardsSection />
                  </section>
                  
                  <section id="badges-section">
                    <SectionHeader 
                      title="Badges" 
                      id="BDG-006"
                      status="active"
                      componentCount={6}
                      variantCount={6}
                    />
                    <BadgesSection />
                  </section>
                  
                  <section id="tables-section">
                    <SectionHeader 
                      title="Data Tables" 
                      id="TBL-007"
                      status="active"
                      componentCount={3}
                      variantCount={5}
                    />
                    <TablesSection />
                  </section>
                </>
              ) : (
                <>
                  {activeSection === 'typography' && <TypographySection activeTheme={activeTheme} />}
                  {activeSection === 'colors' && <ColorsSection />}
                  {activeSection === 'buttons' && <ButtonsSection />}
                  {activeSection === 'inputs' && <InputsSection />}
                  {activeSection === 'cards' && <CardsSection />}
                  {activeSection === 'badges' && <BadgesSection />}
                  {activeSection === 'tables' && <TablesSection />}
                </>
              )}
            </div>
          </div>
        </main>

        {/* Right Panel - Style Details or Pinned Styles */}
        {(selectedElement || showPinnedPanel) && showRightSidebar && (
          <aside className="w-96 h-[calc(100vh-4rem)] border-l border-white/10 bg-card/80 backdrop-blur-md sticky top-16 overflow-y-auto transition-all duration-200 shadow-xl shadow-black/20">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-card/95 backdrop-blur-sm pb-4 border-b border-border">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {showPinnedPanel ? 'Pinned Styles' : 'Style Details'}
                </h2>
                <div className="flex items-center gap-2">
                  {showPinnedPanel && pinnedStyles.length > 0 && (
                    <button
                      onClick={clearAllPinned}
                      className={`text-xs text-destructive hover:text-destructive/80 px-2 py-1 rounded hover:bg-destructive/10 ${uiAnimations ? 'transition-colors' : ''}`}
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowRightSidebar(false)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    title="Collapse sidebar"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {showPinnedPanel ? (
                /* Pinned Styles Collection */
                <div className="space-y-4">
                  {pinnedStyles.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📋</div>
                      <p className="text-muted-foreground text-sm">No styles pinned yet</p>
                      <p className="text-muted-foreground text-xs mt-2">Click on components to inspect and pin them</p>
                    </div>
                  ) : (
                    pinnedStyles.map((pinnedStyle) => (
                      <div key={pinnedStyle.id} className="border border-border rounded-lg p-4 bg-muted/30">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-foreground font-medium text-sm">{pinnedStyle.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{pinnedStyle.description}</p>
                          </div>
                          <button
                            onClick={() => unpinStyle(pinnedStyle.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1 hover:bg-destructive/10 rounded"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {pinnedStyle.classes && (
                          <div className="mb-3">
                            <div className="bg-background rounded p-2 font-mono text-xs text-foreground overflow-x-auto">
                              <code>{pinnedStyle.classes}</code>
                            </div>
                            <button
                              onClick={() => navigator.clipboard.writeText(pinnedStyle.classes)}
                              className="mt-1 text-xs text-primary hover:text-primary/80 transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                        )}

                        {pinnedStyle.usage && (
                          <details className="group">
                            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                              View Usage
                            </summary>
                            <div className="mt-2 glass-card p-3 font-mono text-xs text-foreground">
                              <pre className="whitespace-pre-wrap break-all leading-relaxed">{pinnedStyle.usage}</pre>
                            </div>
                          </details>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : selectedElement && (
                /* Selected Element Details */
                <div className="space-y-6">
                  {/* Element Info */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-foreground font-medium">{selectedElement.name}</h3>
                      <button
                        onClick={() => pinStyle(selectedElement)}
                        disabled={isStylePinned(selectedElement)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          isStylePinned(selectedElement)
                            ? 'text-muted-foreground bg-muted cursor-not-allowed'
                            : 'text-primary bg-primary/10 hover:bg-primary/20'
                        }`}
                      >
                        {isStylePinned(selectedElement) ? 'Pinned' : 'Pin'}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{selectedElement.description}</p>
                  </div>

                  {/* CSS Classes */}
                  {selectedElement.classes && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">CSS Classes</h4>
                      <div className="bg-muted rounded-md p-3 font-mono text-xs text-foreground overflow-x-auto">
                        <code>{selectedElement.classes}</code>
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedElement.classes)}
                        className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Copy classes
                      </button>
                    </div>
                  )}

                  {/* Color Info */}
                  {selectedElement.color && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Color</h4>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-md border border-border"
                          style={{ backgroundColor: selectedElement.color }}
                        />
                        <div>
                          <div className="text-sm text-foreground font-mono">{selectedElement.color}</div>
                          <div className="text-xs text-muted-foreground">{selectedElement.colorName}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Usage Examples */}
                  {selectedElement.usage && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Usage</h4>
                      <div className="glass-card p-3 font-mono text-xs text-foreground">
                        <pre className="whitespace-pre-wrap break-all leading-relaxed">{selectedElement.usage}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Right Sidebar Expand Button */}
        {(selectedElement || showPinnedPanel) && !showRightSidebar && (
          <div className="sticky top-16 h-[calc(100vh-4rem)] flex items-start pt-6">
            <button
              onClick={() => setShowRightSidebar(true)}
              className="p-2 border-l border-border bg-card/95 text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 rounded-l-md"
              title="Expand details sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

// Typography Section Component
function TypographySection({ activeTheme }: { activeTheme: string }) {

  // Current Theme Fonts (dynamic based on active theme)
  const getThemeFonts = () => {
    return [
      {
        name: 'Manrope',
        type: 'Sans-serif',
        usage: 'UI components and content',
        description: 'Modern geometric sans-serif for clean, readable interface design',
        classes: 'font-sans',
        isThemeFont: true,
        samples: [
          { text: 'Primary Interface Typography', size: 'text-2xl', weight: 'font-bold' },
          { text: 'User interface elements and content', size: 'text-lg', weight: 'font-normal' },
          { text: 'Body text and readable content', size: 'text-base', weight: 'font-medium' },
          { text: 'Labels and smaller interface text', size: 'text-sm', weight: 'font-normal' }
        ]
      },
      {
        name: 'JetBrains Mono',
        type: 'Monospace',
        usage: 'Code and technical content',
        description: 'Developer-focused monospace font optimized for coding and technical readability',
        classes: 'font-mono',
        isThemeFont: true,
        samples: [
          { text: 'const example = "Hello World"', size: 'text-base', weight: 'font-normal' },
          { text: 'function setup() { return true; }', size: 'text-sm', weight: 'font-normal' },
          { text: '// Comments and code annotations', size: 'text-sm', weight: 'font-normal' },
          { text: 'npm install @package/name', size: 'text-xs', weight: 'font-normal' }
        ]
      }
    ]
  }

  const typographyElements = [
    {
      element: 'h1',
      name: 'Heading 1',
      classes: 'text-4xl font-bold text-foreground',
      description: 'Primary page heading - largest and boldest text',
      usage: '<h1 className="text-4xl font-bold text-foreground">Heading 1</h1>'
    },
    {
      element: 'h2', 
      name: 'Heading 2',
      classes: 'text-3xl font-semibold text-foreground',
      description: 'Section heading - secondary level hierarchy',
      usage: '<h2 className="text-3xl font-semibold text-foreground">Heading 2</h2>'
    },
    {
      element: 'h3',
      name: 'Heading 3', 
      classes: 'text-2xl font-medium text-foreground',
      description: 'Subsection heading - tertiary level hierarchy',
      usage: '<h3 className="text-2xl font-medium text-foreground">Heading 3</h3>'
    },
    {
      element: 'h4',
      name: 'Heading 4',
      classes: 'text-xl font-medium text-foreground', 
      description: 'Minor heading - fourth level hierarchy',
      usage: '<h4 className="text-xl font-medium text-foreground">Heading 4</h4>'
    },
    {
      element: 'p',
      name: 'Body Text',
      classes: 'text-base text-foreground leading-relaxed',
      description: 'Standard paragraph text with optimal readability',
      usage: '<p className="text-base text-foreground leading-relaxed">Body text</p>'
    },
    {
      element: 'small',
      name: 'Small Text', 
      classes: 'text-sm text-muted-foreground leading-relaxed',
      description: 'Secondary text for captions and metadata',
      usage: '<p className="text-sm text-muted-foreground leading-relaxed">Small text</p>'
    },
    {
      element: 'code',
      name: 'Inline Code',
      classes: 'text-sm font-mono bg-muted px-2 py-1 rounded text-foreground',
      description: 'Inline code snippets with monospace font',
      usage: '<code className="text-sm font-mono bg-muted px-2 py-1 rounded text-foreground">code</code>'
    }
  ]

  // Peal-inspired typography variants
  const pealTypographyVariants = [
    {
      name: 'Component Header Large (Peal Copy)',
      classes: 'text-base font-medium text-foreground',
      description: 'Large component header for cards and modals',
      usage: '<h3 className="text-base font-medium text-foreground">Component Header</h3>'
    },
    {
      name: 'Component Header Medium (Peal Copy)',
      classes: 'text-sm font-medium text-muted-foreground',
      description: 'Medium component header for nested sections',
      usage: '<h4 className="text-sm font-medium text-muted-foreground">Component Header</h4>'
    },
    {
      name: 'Component Header Small (Peal Copy)',
      classes: 'text-xs font-medium text-muted-foreground uppercase tracking-wider',
      description: 'Small uppercase header for labels and categories',
      usage: '<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">SMALL HEADER</span>'
    },
    {
      name: 'Body Large (Peal Copy)',
      classes: 'text-base text-foreground',
      description: 'Large body text for important content',
      usage: '<p className="text-base text-foreground">Large body text</p>'
    },
    {
      name: 'Body Small (Peal Copy)',
      classes: 'text-xs text-muted-foreground',
      description: 'Small body text for less important information',
      usage: '<p className="text-xs text-muted-foreground">Small body text</p>'
    },
    {
      name: 'Muted Text (Peal Copy)',
      classes: 'text-sm text-muted-foreground/70',
      description: 'Muted text for secondary information',
      usage: '<p className="text-sm text-muted-foreground/70">Muted text</p>'
    },
    {
      name: 'Mono Small (Peal Copy)',
      classes: 'font-mono text-xs text-muted-foreground',
      description: 'Small monospace text for code comments',
      usage: '<code className="font-mono text-xs text-muted-foreground">// comment</code>'
    }
  ]

  return (
    <section className="space-y-6">
      {/* Theme Typography */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Theme Typography</h3>
        <p className="text-sm text-muted-foreground">Typography system for the {activeTheme ? activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1) : 'current'} theme</p>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {getThemeFonts().map((font) => (
              <div 
                key={font.name}
                className="glass-panel p-6"
                data-style-element="typography"
                data-element-name={`${font.name} Font (Theme)`}
                data-description={font.description}
                data-classes={font.classes}
                data-variant={font.type.toLowerCase()}
                data-usage={`<div className="${font.classes}">Sample text</div>`}
              >
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                    {font.name}
                    <span className="badge-success">{font.type}</span>
                    <span className="badge-warning">Theme Font</span>
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{font.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Used for: {font.usage}</p>
                </div>
                <div className={`space-y-3 ${font.classes}`}>
                  {font.samples.map((sample, index) => (
                    <div key={index} className={`${sample.size} ${sample.weight} text-foreground`}>
                      {sample.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Headings</h3>
          <div className="space-y-3">
            {typographyElements.slice(0, 4).map((typo) => {
              const Element = typo.element as keyof React.JSX.IntrinsicElements
              return (
                <Element 
                  key={typo.element}
                  className={typo.classes}
                  data-style-element="typography"
                  data-element-name={typo.name}
                  data-description={typo.description}
                  data-classes={typo.classes}
                  data-variant={typo.element}
                  data-usage={typo.usage}
                  title={`${typo.name} - Click to inspect`}
                >
                  {typo.name}
                </Element>
              )
            })}
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Body Text</h3>
          <div className="space-y-3">
            {typographyElements.slice(4).map((typo) => {
              return typo.element === 'p' ? (
                <p 
                  key={typo.element}
                  className={typo.classes}
                  data-style-element="typography"
                  data-element-name={typo.name}
                  data-description={typo.description}
                  data-classes={typo.classes}
                  data-variant={typo.element}
                  data-usage={typo.usage}
                  title={`${typo.name} - Click to inspect`}
                >
                  This is body text. It should be readable and have good contrast against the background.
                </p>
              ) : typo.element === 'small' ? (
                <p 
                  key={typo.element}
                  className={typo.classes}
                  data-style-element="typography"
                  data-element-name={typo.name}
                  data-description={typo.description}
                  data-classes={typo.classes}
                  data-variant={typo.element}
                  data-usage={typo.usage}
                  title={`${typo.name} - Click to inspect`}
                >
                  This is small body text for secondary information.
                </p>
              ) : (
                <code 
                  key={typo.element}
                  className={typo.classes}
                  data-style-element="typography"
                  data-element-name={typo.name}
                  data-description={typo.description}
                  data-classes={typo.classes}
                  data-variant={typo.element}
                  data-usage={typo.usage}
                  title={`${typo.name} - Click to inspect`}
                >
                  console.log('Hello, world!')
                </code>
              )
            })}
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Peal Typography Variants</h3>
          <div className="space-y-3">
            {pealTypographyVariants.map((variant) => (
              <div
                key={variant.name}
                className={variant.classes}
                data-style-element="typography"
                data-element-name={variant.name}
                data-description={variant.description}
                data-classes={variant.classes}
                data-variant="peal"
                data-usage={variant.usage}
                title={`${variant.name} - Click to inspect`}
              >
                {variant.name.includes('Header') ? variant.name.split(' (')[0] : 
                 variant.name.includes('Mono') ? '// Code comment example' :
                 'Sample text content for this variant'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Colors Section Component
function ColorsSection() {
  const colorVariables = [
    { name: 'Primary', var: 'primary', desc: 'Main brand color' },
    { name: 'Secondary', var: 'secondary', desc: 'Secondary brand color' },
    { name: 'Accent', var: 'accent', desc: 'Accent color for highlights' },
    { name: 'Success', var: 'success', desc: 'Success state color' },
    { name: 'Warning', var: 'warning', desc: 'Warning state color' },
    { name: 'Destructive', var: 'destructive', desc: 'Error/danger state color' },
  ]

  const surfaceColors = [
    { name: 'Background', var: 'background', desc: 'Main background color' },
    { name: 'Card', var: 'card', desc: 'Card background color' },
    { name: 'Muted', var: 'muted', desc: 'Muted background color' },
    { name: 'Accent', var: 'accent', desc: 'Accent background color' },
  ]

  return (
    <section className="space-y-6">
      <div className="grid gap-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorVariables.map((color) => (
              <div key={color.var}>
                <div 
                  className={`w-full h-16 bg-${color.var} border border-border rounded-lg`}
                  data-style-element="color"
                  data-element-name={`${color.name} Color`}
                  data-description={color.desc}
                  data-classes={`bg-${color.var}`}
                  data-css-var={`--${color.var}`}
                  data-variant={color.var}
                  data-usage={`<div className="bg-${color.var}">Content</div>`}
                  title={`${color.name}: var(--${color.var})`}
                />
                <div className="mt-2">
                  <div className="font-medium text-foreground text-sm">{color.name}</div>
                  <div className="text-xs text-muted-foreground">{color.desc}</div>
                  <div className="font-mono text-xs text-muted-foreground">--{color.var}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Surface Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {surfaceColors.map((surface) => (
              <div key={surface.var}>
                <div 
                  className={`w-full h-16 bg-${surface.var} border border-border rounded-lg`}
                  data-style-element="color"
                  data-element-name={`${surface.name} Color`}
                  data-description={surface.desc}
                  data-classes={`bg-${surface.var}`}
                  data-css-var={`--${surface.var}`}
                  data-variant={surface.var}
                  data-usage={`<div className="bg-${surface.var}">Content</div>`}
                  title={`${surface.name}: var(--${surface.var})`}
                />
                <div className="mt-2">
                  <div className="font-medium text-foreground text-sm">{surface.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">--{surface.var}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Buttons Section Component
function ButtonsSection() {
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
      name: 'Outline (Peal Copy)',
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

// Form Elements Section Component (Enhanced with Peal variants)
function InputsSection() {
  const inputVariants = [
    {
      name: 'Default Input',
      variant: 'default',
      inputClass: 'input-default',
      labelClass: 'label-default',
      description: 'Standard glass morphism input with backdrop blur',
      placeholder: 'Enter text...'
    },
    {
      name: 'Monospace Input (Peal Copy)',
      variant: 'mono',
      inputClass: 'input-mono',
      labelClass: 'label-default',
      description: 'Monospace input for code or technical content',
      placeholder: 'Code input...'
    },
    {
      name: 'Dark Input (Peal Copy)',
      variant: 'dark',
      inputClass: 'input-dark',
      labelClass: 'label-default',
      description: 'Dark themed input with reduced opacity',
      placeholder: 'Dark themed input...'
    },
    {
      name: 'Transparent Input (Peal Copy)',
      variant: 'transparent',
      inputClass: 'input-transparent',
      labelClass: 'label-default',
      description: 'Minimal input with bottom border only',
      placeholder: 'Minimal input...'
    }
  ]

  const labelVariants = [
    {
      name: 'Default Label',
      classes: 'label-default',
      text: 'Standard Label',
      description: 'Standard form label'
    },
    {
      name: 'Required Label (Peal Copy)',
      classes: 'label-required',
      text: 'Required Field',
      description: 'Label with required indicator'
    },
    {
      name: 'Small Label (Peal Copy)',
      classes: 'label-small',
      text: 'SMALL UPPERCASE LABEL',
      description: 'Small uppercase label for compact forms'
    }
  ]

  return (
    <section className="space-y-6">
      <div className="grid gap-6">
        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Input Fields</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {inputVariants.map((input) => (
              <div key={input.variant}>
                <label className={input.labelClass}>{input.name}</label>
                <input 
                  type="text" 
                  placeholder={input.placeholder}
                  className={input.inputClass}
                  data-style-element="input"
                  data-element-name={input.name}
                  data-description={input.description}
                  data-classes={input.inputClass}
                  data-label-classes={input.labelClass}
                  data-variant={input.variant}
                  data-usage={`<input type='text' className='${input.inputClass}' placeholder='${input.placeholder}' />`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Textareas</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-default">Default Textarea</label>
              <textarea 
                className="textarea-default"
                rows={3}
                placeholder="Enter description..."
                data-style-element="input"
                data-element-name="Default Textarea"
                data-description="Standard textarea with glass morphism styling"
                data-classes="textarea-default"
                data-variant="textarea"
                data-usage="<textarea className='textarea-default' rows={3} />"
              />
            </div>
            <div>
              <label className="label-default">Monospace Textarea (Peal Copy)</label>
              <textarea 
                className="textarea-mono"
                rows={3}
                placeholder="// Enter code..."
                data-style-element="input"
                data-element-name="Monospace Textarea"
                data-description="Code textarea with monospace font"
                data-classes="textarea-mono"
                data-variant="textarea-mono"
                data-usage="<textarea className='textarea-mono' rows={3} />"
              />
            </div>
            <div>
              <label className="label-default">Dark Textarea (Peal Copy)</label>
              <textarea 
                className="textarea-dark"
                rows={3}
                placeholder="Dark themed textarea..."
                data-style-element="input"
                data-element-name="Dark Textarea"
                data-description="Dark variant textarea"
                data-classes="textarea-dark"
                data-variant="textarea-dark"
                data-usage="<textarea className='textarea-dark' rows={3} />"
              />
            </div>
          </div>
        </div>

        <div className="p-6 glass-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Label Variants</h3>
          <div className="space-y-3">
            {labelVariants.map((label) => (
              <label 
                key={label.name}
                className={label.classes}
                data-style-element="typography"
                data-element-name={label.name}
                data-description={label.description}
                data-classes={label.classes}
                data-variant="label"
                data-usage={`<label className='${label.classes}'>${label.text}</label>`}
              >
                {label.text}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Cards Section Component (Simplified)
function CardsSection() {
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

// Badges Section Component
function BadgesSection() {
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

// Data Tables Section Component
function TablesSection() {
  const tableData = [
    { id: 1, name: 'api-server-01', status: 'online', cpu: '45%', memory: '2.1 GB', uptime: '15 days', lastCheck: '2 min ago' },
    { id: 2, name: 'db-primary', status: 'online', cpu: '78%', memory: '8.3 GB', uptime: '45 days', lastCheck: '1 min ago' },
    { id: 3, name: 'cache-redis', status: 'processing', cpu: '23%', memory: '512 MB', uptime: '7 days', lastCheck: '5 min ago' },
    { id: 4, name: 'worker-node-02', status: 'error', cpu: '92%', memory: '3.8 GB', uptime: '2 hours', lastCheck: '30 sec ago' },
    { id: 5, name: 'cdn-edge-west', status: 'offline', cpu: '0%', memory: '0 MB', uptime: '-', lastCheck: '10 min ago' },
  ]

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'online': return 'badge-online'
      case 'offline': return 'badge-offline'
      case 'processing': return 'badge-processing'
      case 'error': return 'badge-error'
      default: return 'badge-default'
    }
  }

  return (
    <section className="space-y-6 max-w-6xl">
      <div className="glass-panel overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-foreground mb-4">Server Status Table</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-border bg-input" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                  Server Name ↓
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                  CPU Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                  Memory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Check
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-border bg-input" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground font-mono">{row.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadgeClass(row.status)}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {row.cpu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {row.memory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {row.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {row.lastCheck}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-primary/80 mr-3 transition-colors">Edit</button>
                    <button className="text-muted-foreground hover:text-foreground mr-3 transition-colors">View</button>
                    <button className="text-destructive hover:text-destructive/80 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Showing 1-5 of 24 results</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost btn-sm" disabled>Previous</button>
            <button className="btn-primary btn-sm">1</button>
            <button className="btn-ghost btn-sm">2</button>
            <button className="btn-ghost btn-sm">3</button>
            <button className="btn-ghost btn-sm">...</button>
            <button className="btn-ghost btn-sm">5</button>
            <button className="btn-ghost btn-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Compact Table Example */}
      <div className="glass-panel overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-foreground mb-4">Compact Data Table</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Task</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Priority</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border hover:bg-muted/10">
                <td className="px-4 py-2">Database migration</td>
                <td className="px-4 py-2"><span className="badge-error">High</span></td>
                <td className="px-4 py-2"><span className="badge-processing">In Progress</span></td>
                <td className="px-4 py-2 text-muted-foreground">Dec 15, 2024</td>
              </tr>
              <tr className="border-b border-border hover:bg-muted/10">
                <td className="px-4 py-2">API documentation</td>
                <td className="px-4 py-2"><span className="badge-warning">Medium</span></td>
                <td className="px-4 py-2"><span className="badge-default">Pending</span></td>
                <td className="px-4 py-2 text-muted-foreground">Dec 20, 2024</td>
              </tr>
              <tr className="border-b border-border hover:bg-muted/10">
                <td className="px-4 py-2">Security audit</td>
                <td className="px-4 py-2"><span className="badge-success">Low</span></td>
                <td className="px-4 py-2"><span className="badge-success">Complete</span></td>
                <td className="px-4 py-2 text-muted-foreground">Dec 10, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table with Mixed Content */}
      <div className="p-6 glass-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Table Elements Showcase</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Comprehensive table demonstrating inline badges, actions, selection, sorting, and pagination controls.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-medium text-foreground">Inline Status Badges:</h4>
            <span className="badge-online">Online</span>
            <span className="badge-offline">Offline</span>
            <span className="badge-processing">Processing</span>
            <span className="badge-error">Error</span>
            <span className="badge-warning">Warning</span>
            <span className="badge-success">Success</span>
          </div>
          
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-medium text-foreground">Inline Actions:</h4>
            <button className="text-primary hover:text-primary/80 text-sm transition-colors">Edit</button>
            <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">View</button>
            <button className="text-destructive hover:text-destructive/80 text-sm transition-colors">Delete</button>
          </div>
          
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-medium text-foreground">Table Controls:</h4>
            <input type="checkbox" className="rounded border-border bg-input" />
            <span className="text-xs text-muted-foreground">Select All</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">↑↓ Sort</button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Filter</button>
          </div>
        </div>
      </div>
    </section>
  )
}