'use client'

import { useState, useRef, useEffect } from 'react'
import { getAllThemes, getTheme, getThemeIds, cx } from '@/themes/application'
import type { Theme } from '@/types/theme'

// Helper to get nested value from theme using dot notation
function getThemeValue(theme: Theme, path: string): string {
  const keys = path.split('.')
  let value: any = theme
  for (const key of keys) {
    value = value?.[key]
  }
  return typeof value === 'string' ? value : ''
}

// Component to render style preview
function StylePreview({ 
  theme, 
  path, 
  label,
  isInteractive = false 
}: { 
  theme: Theme
  path: string
  label: string
  isInteractive?: boolean
}) {
  const classes = getThemeValue(theme, path)
  const [copied, setCopied] = useState(false)
  const [pinned, setPinned] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(classes)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // Determine the type of element to render based on the path
  const renderElement = () => {
    if (path.includes('typography')) {
      const text = label.includes('h1') ? 'Heading 1' :
                  label.includes('h2') ? 'Heading 2' :
                  label.includes('h3') ? 'Heading 3' :
                  label.includes('h4') ? 'Heading 4' :
                  label.includes('section') ? 'SECTION TITLE' :
                  label.includes('label') ? 'Label Text' :
                  label.includes('code') && !label.includes('Block') ? 'code_example' :
                  label.includes('codeBlock') ? 'const example = "code block"' :
                  'Sample text content'
                  
      if (label.includes('codeBlock')) {
        return <pre className={classes}>{text}</pre>
      }
      return <div className={classes}>{text}</div>
    }
    
    if (path.includes('button')) {
      return (
        <button className={classes} disabled={false}>
          {label.includes('icon') ? '⚡' : 'Button'}
        </button>
      )
    }
    
    if (path.includes('input')) {
      return (
        <input 
          type="text" 
          className={classes} 
          placeholder="Type something..."
          defaultValue=""
        />
      )
    }
    
    if (path.includes('textarea')) {
      return (
        <textarea 
          className={classes} 
          placeholder="Enter text..."
          rows={3}
          defaultValue=""
        />
      )
    }
    
    if (path.includes('card')) {
      return (
        <div className={classes + ' p-4'}>
          <h3 className="font-semibold mb-2">Card Title</h3>
          <p className="text-sm">Card content goes here.</p>
        </div>
      )
    }
    
    if (path.includes('badge')) {
      return (
        <span className={classes}>Badge</span>
      )
    }
    
    if (path.includes('status')) {
      return (
        <div className="flex items-center gap-2">
          <div className={classes}></div>
          <span className="text-sm">{label}</span>
        </div>
      )
    }
    
    if (path.includes('table')) {
      if (label.includes('header')) {
        return (
          <table className="w-full">
            <thead>
              <tr>
                <th className={classes + ' px-4 py-2'}>Table Header</th>
              </tr>
            </thead>
          </table>
        )
      }
      if (label.includes('cell')) {
        return (
          <table className="w-full">
            <tbody>
              <tr>
                <td className={classes}>Table Cell</td>
              </tr>
            </tbody>
          </table>
        )
      }
      return (
        <table className="w-full">
          <tbody>
            <tr className={classes}>
              <td className="px-4 py-2">Row Content</td>
            </tr>
          </tbody>
        </table>
      )
    }
    
    // Color swatches
    if (path.includes('colors')) {
      const colorValue = getThemeValue(theme, path)
      return (
        <div className="flex items-center gap-2">
          <div 
            className="w-12 h-12 rounded border border-gray-700"
            style={{ backgroundColor: colorValue }}
          />
          <div className="font-mono text-xs">{colorValue}</div>
        </div>
      )
    }
    
    // Layout elements
    if (path.includes('layout') || path.includes('effects')) {
      return (
        <div className={classes + ' p-4 min-h-[60px]'}>
          <div className="text-sm opacity-70">{label}</div>
        </div>
      )
    }
    
    // Default: show as text sample
    return (
      <div className={classes}>
        Sample Element
      </div>
    )
  }
  
  return (
    <div 
      className={cx(
        'relative group',
        pinned && 'ring-2 ring-blue-500 bg-blue-500/5'
      )}
    >
      <div className="p-4 border border-gray-800 rounded hover:border-gray-600 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="font-mono text-xs text-gray-500 mb-1">{path}</div>
            <div className="text-sm font-medium text-gray-300">{label}</div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200"
              title="Copy classes"
            >
              {copied ? '✓' : '📋'}
            </button>
            {isInteractive && (
              <button
                onClick={() => setPinned(!pinned)}
                className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200"
                title={pinned ? 'Unpin' : 'Pin for comparison'}
              >
                {pinned ? '📍' : '📌'}
              </button>
            )}
          </div>
        </div>
        
        <div className="mb-3">
          {renderElement()}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-900">
          <code className="text-[10px] text-gray-600 break-all">
            {classes.substring(0, 150)}{classes.length > 150 ? '...' : ''}
          </code>
        </div>
      </div>
    </div>
  )
}

export default function StylesPage() {
  const themes = getAllThemes()
  const themeIds = getThemeIds()
  const [selectedThemeId, setSelectedThemeId] = useState<string>('terminal')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const theme = getTheme(selectedThemeId)
  
  // Get all style paths from theme
  const getAllPaths = (obj: any, prefix = ''): Array<{ path: string, label: string }> => {
    const paths: Array<{ path: string, label: string }> = []
    
    if (!obj) return paths
    
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = prefix ? `${prefix}.${key}` : key
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        paths.push(...getAllPaths(value, currentPath))
      } else if (typeof value === 'string') {
        // Create a readable label from the path
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim()
        
        paths.push({ path: currentPath, label })
      }
    })
    
    return paths
  }
  
  const allStyles = theme ? getAllPaths(theme) : []
  
  // Filter styles based on search and category
  const filteredStyles = allStyles.filter(({ path, label }) => {
    const matchesSearch = searchQuery === '' || 
      path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      label.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
      path.startsWith(selectedCategory)
    
    return matchesSearch && matchesCategory
  })
  
  // Categories from theme structure
  const categories = [
    { value: 'all', label: 'All Styles' },
    { value: 'colors', label: 'Colors' },
    { value: 'typography', label: 'Typography' },
    { value: 'components', label: 'Components' },
    { value: 'layout', label: 'Layout' },
    { value: 'effects', label: 'Effects' },
  ]
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-light">Style System Viewer</h1>
              <p className="text-sm text-gray-400 mt-1">
                Explore and test different theme styles
              </p>
            </div>
            
            {/* Theme Selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-400">Theme:</label>
              <select
                value={selectedThemeId}
                onChange={(e) => setSelectedThemeId(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-gray-100 px-3 py-1.5 rounded text-sm focus:border-gray-500 focus:outline-none"
              >
                {themeIds.map((id) => {
                  const themeOption = getTheme(id)
                  return themeOption ? (
                    <option key={id} value={id}>
                      {themeOption.name}
                    </option>
                  ) : null
                })}
              </select>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 text-gray-100 px-3 py-1.5 rounded text-sm placeholder-gray-500 focus:border-gray-500 focus:outline-none"
            />
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-gray-100 px-3 py-1.5 rounded text-sm focus:border-gray-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Theme Description */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gray-900 border border-gray-800 rounded p-4 mb-8">
          <h2 className="text-lg font-medium mb-2">{theme?.name} Theme</h2>
          <p className="text-sm text-gray-400">{theme?.description}</p>
        </div>
        
        {/* Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {theme && filteredStyles.map(({ path, label }) => (
            <StylePreview
              key={path}
              theme={theme}
              path={path}
              label={label}
              isInteractive={true}
            />
          ))}
        </div>
        
        {filteredStyles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No styles found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}