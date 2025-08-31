'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getThemeIds, getTheme } from '@/styles/theme-registry'
import '@/styles/init-themes'
import type { Theme } from '@/types/theme'
import {
  TypographySection,
  ColorsSection,
  ButtonsSection,
  InputsSection,
  CardsSection,
  BadgesSection,
  StatusSection,
  EffectsSection,
  SpacingSection,
  TablesSection,
  VariablesSection
} from '@/components/styleguide'




type ThemeName = string // Dynamic based on registry

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

// Dynamic section detection from theme
function getThemeSections(theme: Theme | null): string[] {
  if (!theme) return ['colors', 'typography', 'components']
  
  const sections: string[] = []
  
  // Always include CSS variables section (always available for themes)
  sections.push('variables')
  
  // Always include colors if present
  if (theme.colors) sections.push('colors')
  
  // Include typography if present
  if (theme.typography) sections.push('typography')
  
  // Detect component sections from theme.components
  if (theme.components) {
    const componentKeys = Object.keys(theme.components)
    // Add individual component sections if they exist
    if (componentKeys.includes('button')) sections.push('buttons')
    if (componentKeys.includes('input') || componentKeys.includes('textarea')) sections.push('inputs')
    if (componentKeys.includes('card')) sections.push('cards')
    if (componentKeys.includes('badge')) sections.push('badges')
    if (componentKeys.includes('table')) sections.push('tables')
    if (componentKeys.includes('status')) sections.push('status')
  }
  
  // Add effects section if present
  if ((theme as any).effects) sections.push('effects')
  
  // Add spacing section if present
  if ((theme as any).spacing) sections.push('spacing')
  
  return sections
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
    status: 'STS-008',
    effects: 'EFX-009',
    spacing: 'SPC-010',
    all: 'ALL-000'
  }
  return ids[section] || `${section.toUpperCase().slice(0, 3)}-999`
}

function getSectionTitle(section: string): string {
  const titles: Record<string, string> = {
    typography: 'Typography System',
    colors: 'Color Palette',
    variables: 'CSS Variables',
    buttons: 'Button Components',
    inputs: 'Form Elements',
    cards: 'Card Containers',
    badges: 'Badge Indicators',
    tables: 'Data Tables',
    status: 'Status Indicators',
    effects: 'Visual Effects',
    spacing: 'Spacing System',
    all: 'Complete System'
  }
  return titles[section] || section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1').trim()
}

function getSectionDescription(section: string, theme: Theme | null): string {
  // Theme-aware descriptions
  const themePrefix = theme ? `${theme.name} theme ` : ''
  
  const descriptions: Record<string, string> = {
    typography: `${themePrefix}hierarchical text system with precision and clear information architecture`,
    colors: `${themePrefix}color deployment for semantic states and visual hierarchy`,
    variables: `${themePrefix}CSS custom properties following shadcn/ui conventions for seamless integration`,
    buttons: `${themePrefix}action triggers with purposeful styling and interaction states`,
    inputs: `${themePrefix}data entry components optimized for accuracy and validation`,
    cards: `${themePrefix}container elements with distinctive styling and framing`,
    badges: `${themePrefix}status indicators and categorical labels with semantic coloring`,
    tables: `${themePrefix}data grids with sortable columns and inline actions`,
    status: `${themePrefix}visual status indicators and state representations`,
    effects: `${themePrefix}visual effects including shadows, blur, and transparency`,
    spacing: `${themePrefix}spacing system for consistent layout rhythm`,
    all: `Complete ${themePrefix}design system overview with all component categories`
  }
  return descriptions[section] || `${themePrefix}components using theme variables`
}

function getSectionComponentCount(section: string, theme: Theme | null): number {
  if (!theme || !theme.components) return 0
  
  // Dynamic count based on actual theme data
  switch(section) {
    case 'typography':
      return theme.typography ? Object.keys(theme.typography).length : 0
    case 'colors':
      return theme.colors ? Object.keys(theme.colors).flat().length : 0
    case 'buttons':
      return theme.components.button ? Object.keys(theme.components.button).length : 0
    case 'inputs':
      const inputCount = theme.components.input ? Object.keys(theme.components.input).length : 0
      const textareaCount = theme.components.textarea ? Object.keys(theme.components.textarea).length : 0
      return inputCount + textareaCount
    case 'cards':
      return theme.components.card ? Object.keys(theme.components.card).length : 0
    case 'badges':
      return theme.components.badge ? Object.keys(theme.components.badge).length : 0
    case 'tables':
      return theme.components.table ? Object.keys(theme.components.table).length : 0
    case 'status':
      return theme.components.status ? Object.keys(theme.components.status).length : 0
    case 'all':
      return getThemeSections(theme).reduce((sum, sec) => 
        sum + getSectionComponentCount(sec, theme), 0
      )
    default:
      return 0
  }
}

function getSectionVariantCount(section: string, theme: Theme | null): number {
  // For now, return component count as variant count
  // This can be enhanced to count actual variants within each component type
  return getSectionComponentCount(section, theme)
}

// Unified Tactical Header Component with Sticky Status Bar
interface TacticalHeaderProps {
  activeSection: string
  activeTheme: string
  theme?: Theme | null
  status?: 'active' | 'inactive' | 'loading'
  statusColor?: string
  accentColor?: string
  revision?: string
  showMetrics?: boolean
}

function TacticalHeader({ 
  activeSection, 
  activeTheme,
  theme = null,
  status = 'active',
  statusColor = 'success',
  accentColor = 'var(--theme-accent-color)',
  revision = '2.0.1',
  showMetrics = true
}: TacticalHeaderProps) {
  const statusColorClass = status === 'active' ? `bg-${statusColor}` : 
                           status === 'loading' ? 'bg-warning' : 'bg-muted'
  
  return (
    <>
      {/* Sticky Status Bar */}
      <div className="sticky top-[40px] z-30 bg-muted/10 border-b border-border/20 backdrop-blur-xl backdrop-saturate-150" role="status" aria-label="System status">
        <div className="flex items-center">
          <div className="w-1 mr-4" style={{ height: '20px', backgroundColor: accentColor }} aria-hidden="true"></div>
          <div className="flex items-center gap-3 mr-6">
            {/* Status indicators */}
            <div className="flex items-center gap-1" role="status" aria-label={`${status} status`}>
              <div className={`w-2 h-2 rounded-full ${statusColorClass} ${status === 'active' ? 'animate-pulse' : ''}`} aria-hidden="true" />
              <span className={`text-[10px] font-mono text-${statusColor} uppercase`}>{status.toUpperCase()}</span>
            </div>
            <div className="h-3 w-px bg-border/50" aria-hidden="true" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              SECTION: {activeSection.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto mr-6" role="status" aria-label="System information">
            <span className="text-[10px] font-mono text-muted-foreground">
              THEME: {activeTheme.toUpperCase()}
            </span>
            <div className="h-3 w-px bg-border/50" aria-hidden="true" />
            <span className="text-[10px] font-mono text-muted-foreground">
              REV: {revision}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tactical Section Header */}
      <header className="z-20 relative bg-background/95 backdrop-blur-md" role="banner" aria-label="Section header">
        {/* Background scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent" aria-hidden="true" />
        
        {/* Main header container with tactical frame */}
        <div className="relative bg-card/30 backdrop-blur-sm overflow-hidden section-header-tactical mr-6" role="region" aria-label="Tactical header frame">
          
          {/* Main content area with left accent */}
          <div className="flex" role="region" aria-label="Header content">
            {/* Tactical accent bar */}
            <div className="w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent" aria-hidden="true" />
            
            {/* Content */}
            <div className="flex-1 px-6 py-4" role="main">
              {/* Section identifier */}
              <nav className="flex items-center gap-2 mb-2" aria-label="Breadcrumb navigation">
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
              </nav>
              
              {/* Section title */}
              <h1 className="text-xl font-bold text-foreground uppercase tracking-tight mb-1">
                {getSectionTitle(activeSection)}
              </h1>
              
              {/* Section description */}
              <p className="text-xs text-muted-foreground font-mono">
                {getSectionDescription(activeSection, theme)}
              </p>
            </div>
            
            {/* Right side metrics */}
            {showMetrics && (
              <aside className="px-4 py-4 border-l border-border/30 bg-muted/5" role="complementary" aria-label="Section metrics">
                <div className="space-y-2">
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Components</div>
                    <div className="text-sm font-mono text-foreground">{getSectionComponentCount(activeSection, theme)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Variants</div>
                    <div className="text-sm font-mono text-foreground">{getSectionVariantCount(activeSection, theme)}</div>
                  </div>
                </div>
              </aside>
            )}
          </div>
          
          {/* Bottom telemetry bar */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
        </div>
      </header>
    </>
  )
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
    <div className="mb-4 relative">
      {/* Background scan effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-transparent rounded-sm" />
      
      {/* Main header container */}
      <div className="relative border border-border/40 bg-card/20 backdrop-blur-sm rounded-sm overflow-hidden section-header-tactical">
        {/* Top telemetry bar */}
        <div className="h-px telemetry-bar" />
        
        {/* Header content */}
        <div className="flex items-center">
          {/* Left accent */}
          <div className="w-0.5 self-stretch" />
          
          {/* Main content */}
          <div className="flex-1 px-6 py-2">
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

// Dynamic Section Component - Renders sections based on theme data
interface DynamicSectionProps {
  sectionId: string
  theme: Theme | null
  activeTheme: string
}

function DynamicSection({ sectionId, theme, activeTheme }: DynamicSectionProps) {
  if (!theme) {
    return <div className="p-6 text-muted-foreground">No theme data available</div>
  }

  switch (sectionId) {
    case 'typography':
      return <TypographySection theme={theme} />
    case 'colors':
      return <ColorsSection theme={theme} />
    case 'variables':
      return <VariablesSection theme={theme} />
    case 'buttons':
      return <ButtonsSection theme={theme} />
    case 'inputs':
      return <InputsSection theme={theme} />
    case 'cards':
      return <CardsSection theme={theme} />
    case 'badges':
      return <BadgesSection theme={theme} />
    case 'tables':
      return <TablesSection theme={theme} />
    case 'status':
      return <StatusSection theme={theme} />
    case 'effects':
      return <EffectsSection theme={theme} />
    case 'spacing':
      return <SpacingSection theme={theme} />
    default:
      return <div className="p-6 text-muted-foreground">Section "{sectionId}" not implemented</div>
  }
}

export default function StyleGuidePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [activeTheme, setActiveTheme] = useState<ThemeName>(() => {
    const ids = getThemeIds()
    return ids.includes('terminal') ? 'terminal' : ids[0] || 'terminal'
  })
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
    if (theme && getThemeIds().includes(theme)) setActiveTheme(theme)
  }, [searchParams])

  // Update URL when section/theme changes
  const updateURL = (section?: string, theme?: ThemeName) => {
    const params = new URLSearchParams(searchParams.toString())
    if (section) params.set('section', section)
    if (theme) params.set('theme', theme)
    router.push(`?${params.toString()}`)
  }
  
  // Use the centralized element enhancer for automatic element inspection
  const containerRef = useElementEnhancer((element) => {
    setSelectedElement(element)
    setShowPinnedPanel(false)
    setShowRightSidebar(true) // Auto-expand preview on element click
  })

  // Apply base UI theme (terminal) to body for consistent chrome
  // Component themes are passed via props and don't affect global styles
  useEffect(() => {
    // Always use theme-terminal for the UI chrome to maintain dark mode
    // The actual component theme is passed as props to each section
    document.body.className = 'theme-terminal'
  }, [])

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

  // Smart element inspection system (backup for elements without data-style-element)
  const handleElementClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    
    // The useElementEnhancer handles data-style-element clicks
    // This is for fallback manual inspection only
    if (target.getAttribute('data-style-element')) {
      return // Let the enhancer handle it
    }
    
    // Skip if clicking on non-interactive elements without styling
    if (!target.className || target.className === '') {
      return
    }
    
    event.stopPropagation()
    
    // Try to extract style information from the element
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

  // Get current theme object
  const currentTheme = getTheme(activeTheme) || null
  
  // Dynamically generate sections based on theme
  const themeSections = getThemeSections(currentTheme)
  const sections = [
    { id: 'all', label: 'All' },
    ...themeSections.map(sectionId => ({
      id: sectionId,
      label: getSectionTitle(sectionId)
    }))
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-30 py-1 px-6 ${uiAnimations ? 'transition-all duration-300' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Back to Home Link */}
              <a
                href="/"
                className="flex items-center gap-1.5 px-2.5 py-1 text-sm text-muted-foreground hover:text-foreground bg-card/50 hover:bg-card border border-border rounded-md transition-all duration-200"
                title="Back to arach.dev"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                arach.dev
              </a>
              
              <div className={`${uiAnimations ? 'transition-all duration-300' : ''}`}>
                <h1 className="font-mono text-lg font-bold text-foreground uppercase tracking-wide">
                  Style Guide
                </h1>
              </div>
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
                  width="14"
                  height="14"
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
                <span className="text-[10px]">{darkMode ? 'Dark' : 'Light'}</span>
              </button>

              {/* UI Animations Toggle */}
              <button
                onClick={() => setUiAnimations(!uiAnimations)}
                className={`btn-ghost btn-sm flex items-center gap-2`}
                title={uiAnimations ? 'Disable UI Chrome animations' : 'Enable UI Chrome animations'}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={uiAnimations ? '' : 'opacity-50'}
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  {uiAnimations && <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>}
                </svg>
                <span className="text-[10px]">{uiAnimations ? 'UI FX On' : 'UI FX Off'}</span>
              </button>

              {/* Pinned Styles Button */}
              <button
                onClick={() => setShowPinnedPanel(!showPinnedPanel)}
                className={`relative text-[10px] px-2 py-1 ${
                  showPinnedPanel || pinnedStyles.length > 0
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
              >
                Pinned
                {pinnedStyles.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {pinnedStyles.length}
                  </span>
                )}
              </button>

              {/* Theme Selector */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-muted-foreground">Theme:</label>
                <select 
                  value={activeTheme}
                  onChange={(e) => {
                    setActiveTheme(e.target.value as ThemeName)
                    updateURL(activeSection, e.target.value as ThemeName)
                  }}
                  className="bg-input border border-border rounded-md px-2 py-0.5 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {getThemeIds().map((themeId) => (
                    <option key={themeId} value={themeId}>
                      {themeId.charAt(0).toUpperCase() + themeId.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
      </header>

      <div className="max-w-full mx-auto flex relative">
        {/* Sidebar Navigation - Fixed position */}
        <nav className={`${showLeftSidebar ? 'w-64' : 'w-12'} fixed left-0 top-[45px] h-[calc(100vh-45px)] border-r border-white/10 bg-card/20 backdrop-blur-md shadow-xl shadow-black/10 ${uiAnimations ? 'transition-all duration-200' : ''} overflow-y-auto z-20`}>
          {showLeftSidebar ? (
            <div>
              <div className="flex items-center justify-between mb-4 px-6 pt-6">
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
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        setActiveSection(section.id)
                        updateURL(section.id)
                        setSelectedElement(null)
                      }}
                      className={`w-full text-left px-6 py-2.5 text-sm transition-colors ${
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
              <div className="p-6 flex justify-center">
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

        {/* Main Content - with containerRef for element enhancement */}
        <main ref={containerRef} className={`flex-1 relative ${showLeftSidebar ? 'ml-64' : 'ml-12'} ${(selectedElement || showPinnedPanel) && showRightSidebar ? 'mr-96' : ''} ${uiAnimations ? 'transition-all duration-200' : ''}`} onClick={handleElementClick} role="main" aria-label="Style guide content">
          {/* Tactical Header with Sticky Status Bar */}
          <TacticalHeader 
            activeSection={activeSection}
            activeTheme={activeTheme}
            theme={currentTheme}
            status="active"
            statusColor="success"
            revision="2.0.1"
            showMetrics={true}
          />

            {/* Content based on active section */}
            <div className="space-y-12 px-6 pb-12">
              {activeSection === 'all' ? (
                <>
                  {themeSections.map((sectionId) => (
                    <section key={sectionId} id={`${sectionId}-section`}>
                      <SectionHeader 
                        title={getSectionTitle(sectionId)}
                        id={getSectionId(sectionId)}
                        status="active"
                        componentCount={getSectionComponentCount(sectionId, currentTheme)}
                        variantCount={getSectionVariantCount(sectionId, currentTheme)}
                      />
                      <DynamicSection 
                        sectionId={sectionId} 
                        theme={currentTheme} 
                        activeTheme={activeTheme}
                      />
                    </section>
                  ))}
                </>
              ) : (
                <DynamicSection 
                  sectionId={activeSection} 
                  theme={currentTheme} 
                  activeTheme={activeTheme}
                />
              )}
            </div>
        </main>

        {/* Right Panel - Style Details or Pinned Styles - Fixed position */}
        {(selectedElement || showPinnedPanel) && showRightSidebar && (
          <aside className="w-96 fixed right-0 top-[45px] h-[calc(100vh-45px)] border-l border-white/10 bg-card/80 backdrop-blur-md overflow-y-auto transition-all duration-200 shadow-xl shadow-black/20 z-20">
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
          <div className="flex items-start pt-6">
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
// All duplicate component definitions removed - now imported from @/components/styleguide
