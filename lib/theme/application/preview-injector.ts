/**
 * Preview Theme Injector
 * 
 * This module handles theme injection specifically for gallery preview areas,
 * providing CSS variable isolation to prevent cascade conflicts with the gallery frame.
 */

import type { Theme } from '@/types/theme'
import { themeToCSSVariables } from './css-generator'

/**
 * Injects theme CSS variables into a preview container
 * This creates a clean isolation boundary for theme variables
 */
export function injectPreviewTheme(theme: Theme, container: HTMLElement): void {
  if (!theme || !container) {
    console.warn('Preview theme injection: missing theme or container')
    return
  }

  // Get theme variables
  const variables = themeToCSSVariables(theme)
  
  // Apply variables to the container
  Object.entries(variables).forEach(([key, value]) => {
    container.style.setProperty(key, value)
  })
  
  // Set theme attribute for CSS selectors
  container.setAttribute('data-theme', theme.id)
  
  // Add dark mode class if theme is dark
  if (theme.colors?.backgroundDark) {
    container.classList.add('dark')
  } else {
    container.classList.remove('dark')
  }
  
  console.log(`Injected theme "${theme.id}" into preview container`)
}

/**
 * Clears theme variables from a preview container
 * Resets to default values defined in CSS
 */
export function clearPreviewTheme(container: HTMLElement): void {
  if (!container) return
  
  // Remove all custom CSS properties
  const variables = themeToCSSVariables({} as Theme)
  Object.keys(variables).forEach(key => {
    container.style.removeProperty(key)
  })
  
  // Remove theme attributes
  container.removeAttribute('data-theme')
  container.classList.remove('dark')
  
  console.log('Cleared preview theme from container')
}

/**
 * Updates theme in a preview container
 * Combines clear and inject operations
 */
export function updatePreviewTheme(theme: Theme, container: HTMLElement): void {
  clearPreviewTheme(container)
  injectPreviewTheme(theme, container)
}

/**
 * Gets the current theme from a preview container
 */
export function getPreviewTheme(container: HTMLElement): string | null {
  return container.getAttribute('data-theme')
}

/**
 * Checks if a container has a theme applied
 */
export function hasPreviewTheme(container: HTMLElement): boolean {
  return container.hasAttribute('data-theme')
}
