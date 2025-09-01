/**
 * Theme System for Tailwind CSS v4
 * Comprehensive theme management with TypeScript support
 */

// Theme definitions
export const themes = {
  // Site themes
  default: {
    id: 'default',
    name: 'Default',
    description: 'Clean default theme with system fonts',
    type: 'site' as const,
    colorScheme: 'light' as const,
    cssFile: '/themes/site/default.css',
  },
  dark: {
    id: 'dark',
    name: 'Midnight',
    description: 'Dark theme with Space Grotesk fonts and blue accents',
    type: 'site' as const,
    colorScheme: 'dark' as const,
    cssFile: '/themes/site/dark.css',
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    description: 'Terminal-inspired theme with monospace fonts',
    type: 'site' as const,
    colorScheme: 'dark' as const,
    cssFile: '/themes/site/terminal.css',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyber Neon',
    description: 'Cyberpunk theme with Orbitron fonts and vibrant colors',
    type: 'site' as const,
    colorScheme: 'dark' as const,
    cssFile: '/themes/site/cyberpunk.css',
  },
  ocean: {
    id: 'ocean',
    name: 'Deep Ocean',
    description: 'Ocean theme with DM Sans and Outfit fonts',
    type: 'site' as const,
    colorScheme: 'dark' as const,
    cssFile: '/themes/site/ocean.css',
  },
  paper: {
    id: 'paper',
    name: 'Vintage Paper',
    description: 'Paper theme with serif fonts and warm tones',
    type: 'site' as const,
    colorScheme: 'light' as const,
    cssFile: '/themes/site/paper.css',
  },
  sunset: {
    id: 'sunset',
    name: 'Golden Hour',
    description: 'Sunset theme with Playfair Display and golden colors',
    type: 'site' as const,
    colorScheme: 'light' as const,
    cssFile: '/themes/site/sunset.css',
  },
  // Application themes
  'terminal-v4': {
    id: 'terminal-v4',
    name: 'Terminal v4',
    description: 'Terminal interface aligned with Tailwind v4',
    type: 'application' as const,
    colorScheme: 'dark' as const,
    cssFile: '/themes/application/terminal-v4.css',
  },
  'terminal-hybrid': {
    id: 'terminal-hybrid',
    name: 'Terminal Hybrid',
    description: 'Hybrid approach with CSS variables and Tailwind',
    type: 'application' as const,
    colorScheme: 'dark' as const,
    cssFile: '/themes/application/terminal-hybrid.css',
  },
  directory: {
    id: 'directory',
    name: 'Directory',
    description: 'Professional directory-focused design',
    type: 'application' as const,
    colorScheme: 'light' as const,
    cssFile: '/themes/application/directory.css',
  },
} as const;

// Theme types
export type ThemeId = keyof typeof themes;
export type Theme = typeof themes[ThemeId];
export type ThemeType = 'site' | 'application';
export type ColorScheme = 'light' | 'dark';

// Get theme by ID
export function getTheme(id: ThemeId): Theme {
  return themes[id];
}

// Get all themes
export function getAllThemes(): Theme[] {
  return Object.values(themes);
}

// Get themes by type
export function getThemesByType(type: ThemeType): Theme[] {
  return Object.values(themes).filter(theme => theme.type === type);
}

// Get themes by color scheme
export function getThemesByColorScheme(colorScheme: ColorScheme): Theme[] {
  return Object.values(themes).filter(theme => theme.colorScheme === colorScheme);
}

// Theme application functions
export function applyTheme(themeId: ThemeId): void {
  if (typeof document === 'undefined') return;
  
  const theme = getTheme(themeId);
  if (!theme) {
    console.warn(`Theme "${themeId}" not found`);
    return;
  }

  // Set data-theme attribute
  document.documentElement.setAttribute('data-theme', theme.id);
  
  // Set color-scheme for browser integration
  document.documentElement.style.colorScheme = theme.colorScheme;
  
  // Store theme preference
  localStorage.setItem('theme', theme.id);
  
  // Dispatch theme change event
  document.dispatchEvent(new CustomEvent('themechange', {
    detail: { theme, previousTheme: getCurrentTheme() }
  }));
}

// Get current theme
export function getCurrentTheme(): Theme | null {
  if (typeof document === 'undefined') return null;
  
  const themeId = document.documentElement.getAttribute('data-theme') as ThemeId;
  return themeId ? getTheme(themeId) : null;
}

// Get stored theme preference
export function getStoredTheme(): ThemeId | null {
  if (typeof localStorage === 'undefined') return null;
  
  const stored = localStorage.getItem('theme') as ThemeId;
  return stored && themes[stored] ? stored : null;
}

// Get system preference
export function getSystemTheme(): ColorScheme {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Auto-apply theme based on preference
export function autoApplyTheme(): void {
  // Try stored preference first
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
    return;
  }

  // Fall back to system preference
  const systemScheme = getSystemTheme();
  const defaultTheme = systemScheme === 'dark' ? 'dark' : 'default';
  applyTheme(defaultTheme);
}

// Watch for system theme changes
export function watchSystemTheme(callback: (scheme: ColorScheme) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handler);
}

// Theme validation
export function isValidThemeId(id: string): id is ThemeId {
  return id in themes;
}

// CSS variable helpers
export function getCSSVariable(variable: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

export function setCSSVariable(variable: string, value: string): void {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty(variable, value);
}

// Theme class utilities
export function getThemeClasses(themeId: ThemeId): Record<string, string> {
  const theme = getTheme(themeId);
  const prefix = theme.id.replace('-', '-');
  
  return {
    // Component classes
    button: `${prefix}-button`,
    buttonSecondary: `${prefix}-button-secondary`,
    card: `${prefix}-card`,
    input: `${prefix}-input`,
    header: `${prefix}-header`,
    
    // Utility classes
    textPrimary: `text-${prefix}-primary`,
    textAccent: `text-${prefix}-accent`,
    textMuted: `text-${prefix}-muted`,
    bgPrimary: `bg-${prefix}-primary`,
    bgCard: `bg-${prefix}-card`,
    borderPrimary: `border-${prefix}`,
  };
}

// Utility function to combine classes (like clsx/cn)
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// React hook for theme management (if using React)
export function useTheme() {
  const currentTheme = getCurrentTheme();
  
  return {
    theme: currentTheme,
    themes: getAllThemes(),
    applyTheme,
    getTheme,
    getThemesByType,
    getThemesByColorScheme,
    isValidThemeId,
    cx,
  };
}

// Initialize theme system
export function initThemeSystem(): void {
  if (typeof document === 'undefined') return;

  // Apply theme on load
  autoApplyTheme();
  
  // Watch for system changes
  watchSystemTheme((scheme) => {
    // Only auto-switch if no stored preference
    const stored = getStoredTheme();
    if (!stored) {
      const defaultTheme = scheme === 'dark' ? 'dark' : 'default';
      applyTheme(defaultTheme);
    }
  });
  
  // Handle theme switching via keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.key === 'T') {
      // Cycle through themes
      const allThemes = getAllThemes();
      const current = getCurrentTheme();
      const currentIndex = current ? allThemes.findIndex(t => t.id === current.id) : -1;
      const nextIndex = (currentIndex + 1) % allThemes.length;
      applyTheme(allThemes[nextIndex].id as ThemeId);
    }
  });
}

// Export default theme system
export const themeSystem = {
  themes,
  getTheme,
  getAllThemes,
  getThemesByType,
  getThemesByColorScheme,
  applyTheme,
  getCurrentTheme,
  getStoredTheme,
  getSystemTheme,
  autoApplyTheme,
  watchSystemTheme,
  isValidThemeId,
  getCSSVariable,
  setCSSVariable,
  getThemeClasses,
  cx,
  initThemeSystem,
} as const;