/**
 * Debug Utilities for Theme System
 * 
 * Provides debugging tools to inspect CSS variable cascades
 * and understand theme injection behavior.
 */

/**
 * Inspects CSS variables on an element and its ancestors
 */
export function inspectCSSVariables(element: HTMLElement, variableName: string): {
  element: HTMLElement
  value: string
  source: 'inline' | 'computed' | 'inherited'
}[] {
  const results: {
    element: HTMLElement
    value: string
    source: 'inline' | 'computed' | 'inherited'
  }[] = []

  let current: HTMLElement | null = element

  while (current) {
    const inlineValue = current.style.getPropertyValue(variableName)
    const computedValue = getComputedStyle(current).getPropertyValue(variableName)

    if (inlineValue) {
      results.push({
        element: current,
        value: inlineValue,
        source: 'inline'
      })
    } else if (computedValue && computedValue !== 'initial') {
      results.push({
        element: current,
        value: computedValue,
        source: 'computed'
      })
    }

    current = current.parentElement
  }

  return results
}

/**
 * Logs the CSS variable cascade for debugging
 */
export function debugCSSVariable(element: HTMLElement, variableName: string): void {
  const cascade = inspectCSSVariables(element, variableName)
  
  console.group(`🔍 CSS Variable Cascade: ${variableName}`)
  
  if (cascade.length === 0) {
    console.log('❌ Variable not found in cascade')
  } else {
    cascade.forEach((item, index) => {
      const selector = item.element.className ? `.${item.element.className.split(' ').join('.')}` : item.element.tagName.toLowerCase()
      const source = item.source === 'inline' ? '🎯 inline' : '📋 computed'
      
      console.log(`${index + 1}. ${source} ${selector}: ${item.value}`)
    })
  }
  
  console.groupEnd()
}

/**
 * Inspects all theme-related CSS variables on an element
 */
export function inspectThemeVariables(element: HTMLElement): Record<string, string> {
  const themeVariables = [
    '--background',
    '--foreground', 
    '--card',
    '--card-foreground',
    '--popover',
    '--popover-foreground',
    '--primary',
    '--primary-foreground',
    '--secondary',
    '--secondary-foreground',
    '--muted',
    '--muted-foreground',
    '--accent',
    '--accent-foreground',
    '--destructive',
    '--destructive-foreground',
    '--border',
    '--input',
    '--ring',
    '--radius'
  ]

  const result: Record<string, string> = {}
  
  themeVariables.forEach(variable => {
    const computedValue = getComputedStyle(element).getPropertyValue(variable)
    if (computedValue && computedValue !== 'initial') {
      result[variable] = computedValue
    }
  })

  return result
}

/**
 * Logs all theme variables for an element
 */
export function debugThemeVariables(element: HTMLElement): void {
  const variables = inspectThemeVariables(element)
  
  console.group(`🎨 Theme Variables on ${element.tagName.toLowerCase()}`)
  
  if (Object.keys(variables).length === 0) {
    console.log('❌ No theme variables found')
  } else {
    Object.entries(variables).forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    })
  }
  
  console.groupEnd()
}

/**
 * Global debug function for browser console
 */
if (typeof window !== 'undefined') {
  (window as any).debugTheme = {
    inspectCSSVariables,
    debugCSSVariable,
    inspectThemeVariables,
    debugThemeVariables
  }
  
  console.log('🔧 Theme debug utilities available as window.debugTheme')
}
