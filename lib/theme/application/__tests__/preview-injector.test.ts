/**
 * Tests for Preview Theme Injector
 * 
 * Verifies that theme injection works correctly and provides proper isolation
 */

import { injectPreviewTheme, clearPreviewTheme, updatePreviewTheme, getPreviewTheme, hasPreviewTheme } from '../preview-injector'
import type { Theme } from '@/types/theme'

// Mock theme for testing
const mockTheme: Theme = {
  id: 'test-theme',
  name: 'Test Theme',
  colors: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#3b82f6',
    secondary: '#6b7280',
    accent: '#10b981',
    muted: '#f3f4f6',
    border: '#e5e7eb',
    card: '#ffffff',
    destructive: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b'
  },
  fonts: {
    sans: 'Inter, sans-serif',
    mono: 'JetBrains Mono, monospace'
  },
  typography: {
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
    codeFont: 'JetBrains Mono, monospace'
  },
  effects: {
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)'
  }
}

describe('Preview Theme Injector', () => {
  let container: HTMLElement

  beforeEach(() => {
    // Create a test container
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // Clean up
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  })

  describe('injectPreviewTheme', () => {
    it('should inject theme variables into container', () => {
      injectPreviewTheme(mockTheme, container)

      // Check that CSS variables are set
      expect(container.style.getPropertyValue('--background')).toBe('0 0% 100%')
      expect(container.style.getPropertyValue('--foreground')).toBe('0 0% 0%')
      expect(container.style.getPropertyValue('--primary')).toBe('221.2 83.2% 53.3%')
      expect(container.style.getPropertyValue('--border')).toBe('220 13% 91%')

      // Check that theme attribute is set
      expect(container.getAttribute('data-theme')).toBe('test-theme')
    })

    it('should handle missing theme gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      
      injectPreviewTheme(null as any, container)
      
      expect(consoleSpy).toHaveBeenCalledWith('Preview theme injection: missing theme or container')
      consoleSpy.mockRestore()
    })

    it('should handle missing container gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      
      injectPreviewTheme(mockTheme, null as any)
      
      expect(consoleSpy).toHaveBeenCalledWith('Preview theme injection: missing theme or container')
      consoleSpy.mockRestore()
    })
  })

  describe('clearPreviewTheme', () => {
    it('should clear theme variables from container', () => {
      // First inject a theme
      injectPreviewTheme(mockTheme, container)
      expect(hasPreviewTheme(container)).toBe(true)

      // Then clear it
      clearPreviewTheme(container)

      // Check that variables are cleared
      expect(container.style.getPropertyValue('--background')).toBe('')
      expect(container.style.getPropertyValue('--foreground')).toBe('')
      expect(container.getAttribute('data-theme')).toBeNull()
      expect(container.classList.contains('dark')).toBe(false)
    })
  })

  describe('updatePreviewTheme', () => {
    it('should clear and inject new theme', () => {
      const newTheme: Theme = {
        ...mockTheme,
        id: 'new-theme',
        colors: {
          ...mockTheme.colors,
          background: '#000000',
          foreground: '#ffffff'
        }
      }

      // Inject initial theme
      injectPreviewTheme(mockTheme, container)
      expect(getPreviewTheme(container)).toBe('test-theme')

      // Update to new theme
      updatePreviewTheme(newTheme, container)

      // Check that new theme is applied
      expect(getPreviewTheme(container)).toBe('new-theme')
      expect(container.style.getPropertyValue('--background')).toBe('0 0% 0%')
      expect(container.style.getPropertyValue('--foreground')).toBe('0 0% 100%')
    })
  })

  describe('getPreviewTheme', () => {
    it('should return current theme ID', () => {
      injectPreviewTheme(mockTheme, container)
      expect(getPreviewTheme(container)).toBe('test-theme')
    })

    it('should return null when no theme is applied', () => {
      expect(getPreviewTheme(container)).toBeNull()
    })
  })

  describe('hasPreviewTheme', () => {
    it('should return true when theme is applied', () => {
      injectPreviewTheme(mockTheme, container)
      expect(hasPreviewTheme(container)).toBe(true)
    })

    it('should return false when no theme is applied', () => {
      expect(hasPreviewTheme(container)).toBe(false)
    })
  })
})
