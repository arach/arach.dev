'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getThemeIds, getTheme } from '@/lib/theme/application/registry'
import '@/lib/theme/application/init'
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
} from '@/components/gallery/application'
import {
  GalleryHeader,
  SidebarNavigation,
  RightPanel
} from './components'

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
      <div className="sticky z-30 bg-muted/10 border-b border-border/20 backdrop-blur-xl backdrop-saturate-150 gallery-top-offset"
           role="status" 
           aria-label="System status">
        <div className="flex items-center">
          <div className="w-1 h-5 mr-4 bg-frame-ring" aria-hidden="true"></div>
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
      <header className="z-20 relative bg-background/95 backdrop-blur-md border-b border-border/30" role="banner" aria-label="Section header">
        {/* Background scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent" aria-hidden="true" />
        
        {/* Main header container with tactical frame */}
        <div className="relative bg-card/30 backdrop-blur-sm overflow-hidden section-header-tactical mr-6 border-l-2 border-primary/40" role="region" aria-label="Tactical header frame">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />
          
          {/* Main content area with left accent */}
          <div className="flex" role="region" aria-label="Header content">
            {/* Tactical accent bar */}
            <div className="w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent" aria-hidden="true" />
            
            {/* Content */}
            <div className="flex-1 px-6 py-3" role="main">
              {/* Section identifier */}
              <nav className="flex items-center gap-2 mb-1.5" aria-label="Breadcrumb navigation">
                <div className="px-2 py-0.5 bg-primary/10 border border-primary/30 rounded-sm shadow-sm shadow-primary/20">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-wider font-semibold">
                    {getSectionId(activeSection)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/80">
                  <span className="text-primary/60">/</span>
                  <span>GALLERY</span>
                  <span className="text-primary/60">/</span>
                  <span>COMPONENTS</span>
                </div>
              </nav>
              
              {/* Section title */}
              <h1 className="text-xl font-bold text-foreground uppercase tracking-tight mb-0.5 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {getSectionTitle(activeSection)}
              </h1>
              
              {/* Section description */}
              <p className="text-xs text-muted-foreground/90 font-mono leading-relaxed">
                {getSectionDescription(activeSection, theme)}
              </p>
            </div>
            
            {/* Right side metrics */}
            {showMetrics && (
              <aside className="px-6 py-3 border-l border-border/30 bg-gradient-to-br from-muted/10 to-muted/5" role="complementary" aria-label="Section metrics">
                <div className="space-y-2">
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">Components</div>
                    <div className="text-lg font-mono font-bold text-primary">{getSectionComponentCount(activeSection, theme)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">Variants</div>
                    <div className="text-lg font-mono font-bold text-foreground">{getSectionVariantCount(activeSection, theme)}</div>
                  </div>
                </div>
              </aside>
            )}
          </div>
          
          {/* Bottom telemetry bar */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent telemetry-bar" aria-hidden="true" />
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
    <div className="mb-6 relative">
      {/* Background scan effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent rounded-sm" />
      
      {/* Main header container */}
      <div className="relative border border-border/30 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-sm overflow-hidden section-header-tactical shadow-sm">
        {/* Top telemetry bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent telemetry-bar" />
        
        {/* Header content */}
        <div className="flex items-center">
          {/* Left accent */}
          <div className="w-1 self-stretch bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
          
          {/* Main content */}
          <div className="flex-1 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Section ID badge */}
                <div className="px-2.5 py-1 bg-primary/15 border border-primary/30 rounded-sm shadow-sm shadow-primary/10">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-wider font-semibold">
                    {id}
                  </span>
                </div>
                
                {/* Section title */}
                <h3 className="frame-heading text-lg tracking-tight">
                  {title}
                </h3>
              </div>
              
              {/* Right side metrics */}
              <div className="flex items-center gap-4 px-4 py-1.5 bg-muted/10 rounded-sm border border-border/20">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">Components:</span>
                  <span className="text-sm font-mono font-semibold text-primary">{componentCount}</span>
                </div>
                <div className="h-4 w-px bg-border/30" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">Variants:</span>
                  <span className="text-sm font-mono font-semibold text-foreground">{variantCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom telemetry bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent telemetry-bar" />
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

function GalleryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [activeTheme, setActiveTheme] = useState<ThemeName>(() => {
    const ids = getThemeIds()
    return ids.includes('terminal') ? 'terminal' : ids[0] || 'terminal'
  })
  const [activeSection, setActiveSection] = useState<string>('typography')
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

  // Keep gallery chrome independent from global site/theme
  useEffect(() => {
    // Do not toggle global theme classes here
    
    // Set CSS variables for layout measurements
    document.documentElement.style.setProperty('--header-height', '39px')
    document.documentElement.style.setProperty('--sidebar-width', '256px')
    document.documentElement.style.setProperty('--sidebar-collapsed-width', '48px')
    document.documentElement.style.setProperty('--right-panel-width', '384px')
  }, [])

  // Save UI animations preference (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('ui-animations', String(uiAnimations))
      // Apply data attribute to control CSS
      document.documentElement.setAttribute('data-ui-animations', String(uiAnimations))
    }
  }, [uiAnimations, isHydrated])

  // Handle dark mode (scoped to preview only; avoid global class toggles)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('dark-mode', String(darkMode))
      // No global class changes
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
    <main id="gallery-container" className={`min-h-screen gallery-frame ${darkMode ? '' : 'gallery-light'} bg-background text-foreground`}>
      {/* Header */}
      <GalleryHeader 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        uiAnimations={uiAnimations}
        setUiAnimations={setUiAnimations}
        pinnedStyles={pinnedStyles}
        showPinnedPanel={showPinnedPanel}
        setShowPinnedPanel={setShowPinnedPanel}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        activeSection={activeSection}
        updateURL={updateURL}
      />

      <div className="max-w-full mx-auto flex relative">
        {/* Sidebar Navigation - Fixed position */}
        <SidebarNavigation 
          showLeftSidebar={showLeftSidebar}
          setShowLeftSidebar={setShowLeftSidebar}
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          updateURL={updateURL}
          setSelectedElement={setSelectedElement}
          uiAnimations={uiAnimations}
        />

        {/* Main Content - with containerRef for element enhancement */}
        <main id="gallery-main-content" ref={containerRef} className={`flex-1 relative ${showLeftSidebar ? 'ml-64' : 'ml-12'} ${(selectedElement || showPinnedPanel) && showRightSidebar ? 'mr-96' : ''} ${uiAnimations ? 'transition-all duration-200' : ''}`} onClick={handleElementClick} role="main" aria-label="Gallery content">
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
            <div className="space-y-12 px-6 pt-4 pb-12">
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

        {/* Right Panel */}
        <RightPanel 
          selectedElement={selectedElement}
          showPinnedPanel={showPinnedPanel}
          showRightSidebar={showRightSidebar}
          setShowRightSidebar={setShowRightSidebar}
          pinnedStyles={pinnedStyles}
          clearAllPinned={clearAllPinned}
          pinStyle={pinStyle}
          isStylePinned={isStylePinned}
          unpinStyle={unpinStyle}
          uiAnimations={uiAnimations}
        />
      </div>
    </main>
  )
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="text-lg">Loading gallery...</div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  )
}
