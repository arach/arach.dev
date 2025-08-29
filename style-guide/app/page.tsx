'use client'

import { useState, useEffect } from 'react'

const themes = {
  terminal: 'theme-terminal',
  cyberpunk: 'theme-cyberpunk', 
  minimal: 'theme-minimal',
  retro: 'theme-retro',
}

type ThemeName = keyof typeof themes

export default function StyleGuidePage() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('terminal')
  const [activeSection, setActiveSection] = useState('typography')
  const [selectedElement, setSelectedElement] = useState<any>(null)
  
  const currentThemeClass = themes[activeTheme]

  // Apply theme to document body
  useEffect(() => {
    document.body.className = currentThemeClass
  }, [currentThemeClass])

  // Smart element inspection system
  const handleElementClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    
    // Skip if clicking on text or non-interactive elements
    if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'SPAN') {
      return
    }
    
    event.stopPropagation()
    
    // Extract style information from the element
    const elementData = inspectElement(target)
    if (elementData) {
      setSelectedElement(elementData)
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

  const sections = [
    { id: 'all', label: 'All' },
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Colors' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Form Elements' },
    { id: 'cards', label: 'Cards' },
    { id: 'badges', label: 'Badges' },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Style Guide</h1>
              <p className="text-sm text-muted-foreground mt-1">Interactive design system showcase</p>
            </div>
            
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
      </header>

      <div className="max-w-full mx-auto flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 min-h-screen border-r border-border bg-card/30">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Sections</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id)
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
        </nav>

        {/* Main Content */}
        <main className={`flex-1 p-8 ${selectedElement ? 'max-w-3xl' : ''}`} onClick={handleElementClick}>
          <div className="max-w-4xl">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-foreground capitalize">{activeSection}</h2>
              <p className="text-muted-foreground mt-2">
                Theme-aware components using CSS variables
              </p>
            </header>

            {/* Content based on active section */}
            <div className="space-y-12">
              {activeSection === 'all' ? (
                <>
                  <section id="typography-section">
                    <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Typography</h3>
                    <TypographySection />
                  </section>
                  
                  <section id="colors-section">
                    <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Colors</h3>
                    <ColorsSection />
                  </section>
                  
                  <section id="buttons-section">
                    <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Buttons</h3>
                    <ButtonsSection />
                  </section>
                  
                  <section id="inputs-section">
                    <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Form Elements</h3>
                    <InputsSection />
                  </section>
                  
                  <section id="cards-section">
                    <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Cards</h3>
                    <CardsSection />
                  </section>
                  
                  <section id="badges-section">
                    <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Badges</h3>
                    <BadgesSection />
                  </section>
                </>
              ) : (
                <>
                  {activeSection === 'typography' && <TypographySection />}
                  {activeSection === 'colors' && <ColorsSection />}
                  {activeSection === 'buttons' && <ButtonsSection />}
                  {activeSection === 'inputs' && <InputsSection />}
                  {activeSection === 'cards' && <CardsSection />}
                  {activeSection === 'badges' && <BadgesSection />}
                </>
              )}
            </div>
          </div>
        </main>

        {/* Right Panel - Style Details */}
        {selectedElement && (
          <aside className="w-80 min-h-screen border-l border-border bg-card/30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Style Details</h2>
                <button
                  onClick={() => setSelectedElement(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Element Info */}
                <div>
                  <h3 className="text-foreground font-medium mb-2">{selectedElement.name}</h3>
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
                    <div className="bg-muted rounded-md p-3 font-mono text-xs text-muted-foreground">
                      <pre>{selectedElement.usage}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
    </main>
  )
}

// Typography Section Component
function TypographySection() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4">
        <div className="p-6 bg-card/50 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Headings</h3>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
            <h2 className="text-3xl font-semibold text-foreground">Heading 2</h2>
            <h3 className="text-2xl font-medium text-foreground">Heading 3</h3>
            <h4 className="text-xl font-medium text-foreground">Heading 4</h4>
          </div>
        </div>

        <div className="p-6 bg-card/50 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Body Text</h3>
          <div className="space-y-3">
            <p className="text-base text-foreground leading-relaxed">
              This is body text. It should be readable and have good contrast against the background.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is small body text for secondary information.
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded text-foreground">console.log('Hello, world!')</code>
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

  return (
    <section className="space-y-6">
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Theme Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorVariables.map((color) => (
              <div key={color.var} className="group relative">
                <div 
                  className={`w-full h-16 rounded-lg cursor-pointer hover:ring-2 hover:ring-ring transition-all bg-${color.var} border border-border`}
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

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Surface Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group relative">
              <div className="w-full h-16 rounded-lg cursor-pointer hover:ring-2 hover:ring-ring transition-all bg-background border border-border" />
              <div className="mt-2">
                <div className="font-medium text-foreground text-sm">Background</div>
                <div className="font-mono text-xs text-muted-foreground">--background</div>
              </div>
            </div>
            <div className="group relative">
              <div className="w-full h-16 rounded-lg cursor-pointer hover:ring-2 hover:ring-ring transition-all bg-card border border-border" />
              <div className="mt-2">
                <div className="font-medium text-foreground text-sm">Card</div>
                <div className="font-mono text-xs text-muted-foreground">--card</div>
              </div>
            </div>
            <div className="group relative">
              <div className="w-full h-16 rounded-lg cursor-pointer hover:ring-2 hover:ring-ring transition-all bg-muted border border-border" />
              <div className="mt-2">
                <div className="font-medium text-foreground text-sm">Muted</div>
                <div className="font-mono text-xs text-muted-foreground">--muted</div>
              </div>
            </div>
            <div className="group relative">
              <div className="w-full h-16 rounded-lg cursor-pointer hover:ring-2 hover:ring-ring transition-all bg-accent border border-border" />
              <div className="mt-2">
                <div className="font-medium text-foreground text-sm">Accent</div>
                <div className="font-mono text-xs text-muted-foreground">--accent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Buttons Section Component
function ButtonsSection() {
  return (
    <section className="space-y-6">
      <div className="p-6 bg-card/50 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">Primary</button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/80 transition-colors">Secondary</button>
          <button className="bg-transparent border border-border text-foreground px-4 py-2 rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Ghost</button>
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-medium hover:bg-destructive/90 transition-colors">Danger</button>
          <button className="bg-success text-success-foreground px-4 py-2 rounded-md font-medium hover:bg-success/90 transition-colors">Success</button>
        </div>
      </div>
    </section>
  )
}

// Form Elements Section Component
function InputsSection() {
  return (
    <section className="space-y-6">
      <div className="p-6 bg-card/50 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Form Elements</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Default Input</label>
            <input 
              type="text" 
              placeholder="Enter text..." 
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Select</label>
            <select className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Textarea</label>
            <textarea 
              placeholder="Enter your message..."
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="checkbox" className="rounded border-border text-primary focus:ring-ring" />
            <label htmlFor="checkbox" className="text-sm font-medium text-foreground">Checkbox</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="radio" name="radio" className="border-border text-primary focus:ring-ring" />
            <label htmlFor="radio" className="text-sm font-medium text-foreground">Radio Button</label>
          </div>
        </div>
      </div>
    </section>
  )
}

// Cards Section Component
function CardsSection() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-card rounded-lg border border-border">
          <h4 className="text-lg font-semibold text-foreground mb-2">Default Card</h4>
          <p className="text-muted-foreground mb-4">
            This is a default card component with standard styling.
          </p>
          <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm hover:bg-primary/90 transition-colors">
            Action
          </button>
        </div>
        
        <div className="p-6 bg-card rounded-lg border border-border shadow-lg">
          <h4 className="text-lg font-semibold text-foreground mb-2">Elevated Card</h4>
          <p className="text-muted-foreground mb-4">
            This card has elevation with a shadow effect for visual hierarchy.
          </p>
          <button className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded text-sm hover:bg-secondary/80 transition-colors">
            Learn More
          </button>
        </div>
        
        <div className="p-6 bg-muted rounded-lg border border-border">
          <h4 className="text-lg font-semibold text-foreground mb-2">Muted Card</h4>
          <p className="text-muted-foreground mb-4">
            This card uses muted background for subtle differentiation.
          </p>
          <button className="bg-accent text-accent-foreground px-3 py-1.5 rounded text-sm hover:bg-accent/80 transition-colors">
            Details
          </button>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <h4 className="text-lg font-semibold text-foreground mb-2">Gradient Card</h4>
          <p className="text-muted-foreground mb-4">
            This card features a subtle gradient background for visual interest.
          </p>
          <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm hover:bg-primary/90 transition-colors">
            Explore
          </button>
        </div>
      </div>
    </section>
  )
}

// Badges Section Component
function BadgesSection() {
  return (
    <section className="space-y-6">
      <div className="p-6 bg-card/50 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Badge Variants</h3>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            Default
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            Primary
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-success-foreground">
            Success
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning text-warning-foreground">
            Warning
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive text-destructive-foreground">
            Error
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
            Outline
          </span>
        </div>
      </div>
      
      <div className="p-6 bg-card/50 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Badge Sizes</h3>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-primary-foreground">
            Small
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary text-primary-foreground">
            Default
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-md text-base font-medium bg-primary text-primary-foreground">
            Large
          </span>
        </div>
      </div>
    </section>
  )
}