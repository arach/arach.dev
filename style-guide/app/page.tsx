'use client'

import { useState } from 'react'

// Import themes from parent directory
import { terminalTheme } from '../styles/terminal-theme'
import { cyberpunkTheme } from '../styles/cyberpunk-theme'
import { minimalTheme } from '../styles/minimal-theme'
import { retroTheme } from '../styles/retro-theme'

const themes = {
  terminal: terminalTheme,
  cyberpunk: cyberpunkTheme,
  minimal: minimalTheme,
  retro: retroTheme,
}

type ThemeName = keyof typeof themes

export default function StyleGuidePage() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('terminal')
  const [activeSection, setActiveSection] = useState('typography')
  
  const currentTheme = themes[activeTheme]

  const sections = [
    { id: 'all', label: 'All' },
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Colors' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Form Elements' },
    { id: 'cards', label: 'Cards' },
    { id: 'badges', label: 'Badges' },
    { id: 'tables', label: 'Tables' },
  ]

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Style Guide</h1>
              <p className="text-sm text-gray-400 mt-1">Interactive design system showcase</p>
            </div>
            
            {/* Theme Selector */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-300">Theme:</label>
              <select 
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value as ThemeName)}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 min-h-screen border-r border-gray-800 bg-gray-900/30">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Sections</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
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
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-white capitalize">{activeSection}</h2>
              <p className="text-gray-400 mt-2">
                {currentTheme.description}
              </p>
            </header>

            {/* Content based on active section */}
            <div className="space-y-12">
              {activeSection === 'all' ? (
                // All sections view
                <>
                  <section id="typography-section">
                    <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-800">Typography</h3>
                    <TypographySection theme={currentTheme} />
                  </section>
                  
                  <section id="colors-section">
                    <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-800">Colors</h3>
                    <ColorsSection theme={currentTheme} />
                  </section>
                  
                  <section id="buttons-section">
                    <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-800">Buttons</h3>
                    <ButtonsSection theme={currentTheme} />
                  </section>
                  
                  <section id="inputs-section">
                    <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-800">Form Elements</h3>
                    <InputsSection theme={currentTheme} />
                  </section>
                  
                  <section id="cards-section">
                    <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-800">Cards</h3>
                    <CardsSection theme={currentTheme} />
                  </section>
                  
                  <section id="badges-section">
                    <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-800">Badges</h3>
                    <BadgesSection theme={currentTheme} />
                  </section>
                  
                  <section id="tables-section">
                    <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-800">Tables</h3>
                    <TablesSection theme={currentTheme} />
                  </section>
                </>
              ) : (
                // Individual section views
                <div className="space-y-8">
                  {activeSection === 'typography' && (
                    <TypographySection theme={currentTheme} />
                  )}
                  {activeSection === 'colors' && (
                    <ColorsSection theme={currentTheme} />
                  )}
                  {activeSection === 'buttons' && (
                    <ButtonsSection theme={currentTheme} />
                  )}
                  {activeSection === 'inputs' && (
                    <InputsSection theme={currentTheme} />
                  )}
                  {activeSection === 'cards' && (
                    <CardsSection theme={currentTheme} />
                  )}
                  {activeSection === 'badges' && (
                    <BadgesSection theme={currentTheme} />
                  )}
                  {activeSection === 'tables' && (
                    <TablesSection theme={currentTheme} />
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </main>
  )
}

// Typography Section Component
function TypographySection({ theme }: { theme: any }) {
  return (
    <section className="space-y-6">
      <div className="grid gap-4">
        <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Headings</h3>
          <div className="space-y-3">
            <h1 className={theme.typography.h1}>Heading 1</h1>
            <h2 className={theme.typography.h2}>Heading 2</h2>
            <h3 className={theme.typography.h3}>Heading 3</h3>
            <h4 className={theme.typography.h4}>Heading 4</h4>
          </div>
        </div>

        <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Body Text</h3>
          <div className="space-y-3">
            <p className={theme.typography.body}>
              This is body text. It should be readable and have good contrast against the background.
            </p>
            <p className={theme.typography.bodySmall}>
              This is small body text for secondary information.
            </p>
            <code className={theme.typography.code}>console.log('Hello, world!')</code>
          </div>
        </div>
      </div>
    </section>
  )
}

// Colors Section Component
function ColorsSection({ theme }: { theme: any }) {
  // Show only key gray shades for conciseness
  const keyGrayShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  const grayColors = keyGrayShades.map(shade => [shade, theme.colors.gray[shade]]).filter(([,color]) => color)

  return (
    <section className="space-y-6">
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Gray Scale</h3>
          <div className="flex gap-1">
            {grayColors.map(([shade, color]) => (
              <div key={shade} className="flex-1 group relative">
                <div 
                  className="w-full h-12 rounded-sm"
                  style={{ backgroundColor: color as string }}
                  title={`${shade}: ${color}`}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/80 text-white text-xs p-1 rounded-b-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {shade}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Accent Colors</h3>
          <div className="flex gap-3">
            {Object.entries(theme.colors.accent)
              .filter(([name]) => !name.includes('Dim') && !name.includes('Dark') && !name.includes('Glow'))
              .map(([name, color]) => (
              <div key={name} className="flex-1 group relative">
                <div 
                  className="w-full h-16 rounded-lg"
                  style={{ backgroundColor: color as string }}
                  title={`${name}: ${color}`}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/80 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="font-medium capitalize">{name}</div>
                  <div className="font-mono">{color as string}</div>
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
function ButtonsSection({ theme }: { theme: any }) {
  return (
    <section className="space-y-6">
      <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <button className={theme.components.button.primary}>Primary</button>
          <button className={theme.components.button.secondary}>Secondary</button>
          <button className={theme.components.button.ghost}>Ghost</button>
          <button className={theme.components.button.danger}>Danger</button>
          <button className={theme.components.button.success}>Success</button>
        </div>
      </div>
    </section>
  )
}

// Form Elements Section Component
function InputsSection({ theme }: { theme: any }) {
  return (
    <section className="space-y-6">
      <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Form Elements</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className={theme.typography.label}>Default Input</label>
            <input 
              type="text" 
              placeholder="Enter text..." 
              className={theme.components.input.default}
            />
          </div>
          <div>
            <label className={theme.typography.label}>Active Input</label>
            <input 
              type="text" 
              placeholder="Active state..." 
              className={theme.components.input.active}
            />
          </div>
          <div>
            <label className={theme.typography.label}>Error Input</label>
            <input 
              type="text" 
              placeholder="Error state..." 
              className={theme.components.input.error}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Cards Section Component
function CardsSection({ theme }: { theme: any }) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className={`p-6 ${theme.components.card.default}`}>
          <h4 className={theme.typography.h4}>Default Card</h4>
          <p className={theme.typography.body}>This is a default card component.</p>
        </div>
        <div className={`p-6 ${theme.components.card.elevated}`}>
          <h4 className={theme.typography.h4}>Elevated Card</h4>
          <p className={theme.typography.body}>This is an elevated card component.</p>
        </div>
      </div>
    </section>
  )
}

// Badges Section Component
function BadgesSection({ theme }: { theme: any }) {
  return (
    <section className="space-y-6">
      <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Badge Variants</h3>
        <div className="flex flex-wrap gap-3">
          <span className={`${theme.components.badge.default} ${theme.components.badge.neutral}`}>
            Neutral
          </span>
          <span className={`${theme.components.badge.default} ${theme.components.badge.primary}`}>
            Primary
          </span>
          <span className={`${theme.components.badge.default} ${theme.components.badge.success}`}>
            Success
          </span>
          <span className={`${theme.components.badge.default} ${theme.components.badge.warning}`}>
            Warning
          </span>
          <span className={`${theme.components.badge.default} ${theme.components.badge.error}`}>
            Error
          </span>
        </div>
      </div>
    </section>
  )
}

// Tables Section Component
function TablesSection({ theme }: { theme: any }) {
  return (
    <section className="space-y-6">
      <div className={theme.components.table.container}>
        <table className="w-full">
          <thead>
            <tr>
              <th className={theme.components.table.header}>Name</th>
              <th className={theme.components.table.header}>Status</th>
              <th className={theme.components.table.header}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className={theme.components.table.row}>
              <td className={theme.components.table.cell}>Terminal Theme</td>
              <td className={theme.components.table.cell}>
                <span className={`${theme.components.badge.default} ${theme.components.badge.success}`}>
                  Active
                </span>
              </td>
              <td className={theme.components.table.cellNumeric}>100%</td>
            </tr>
            <tr className={theme.components.table.row}>
              <td className={theme.components.table.cell}>Cyberpunk Theme</td>
              <td className={theme.components.table.cell}>
                <span className={`${theme.components.badge.default} ${theme.components.badge.neutral}`}>
                  Inactive
                </span>
              </td>
              <td className={theme.components.table.cellNumeric}>75%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}