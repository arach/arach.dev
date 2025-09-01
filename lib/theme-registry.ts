import type { Theme } from './theme-engine';
import { defaultTheme } from '@/themes/default';
import { darkTheme } from '@/themes/dark';

// Registry of all available themes
const themeRegistry = new Map<string, Theme>([
  ['default', defaultTheme],
  ['dark', darkTheme],
]);

/**
 * Theme Registry - Manages all available themes
 */
export class ThemeRegistry {
  /**
   * Get a theme by ID
   */
  static getTheme(id: string): Theme | undefined {
    return themeRegistry.get(id);
  }

  /**
   * Get all available theme IDs
   */
  static getThemeIds(): string[] {
    return Array.from(themeRegistry.keys());
  }

  /**
   * Get all available themes
   */
  static getAllThemes(): Theme[] {
    return Array.from(themeRegistry.values());
  }

  /**
   * Check if a theme exists
   */
  static hasTheme(id: string): boolean {
    return themeRegistry.has(id);
  }

  /**
   * Register a new theme
   */
  static registerTheme(theme: Theme): void {
    themeRegistry.set(theme.id, theme);
  }

  /**
   * Unregister a theme
   */
  static unregisterTheme(id: string): boolean {
    return themeRegistry.delete(id);
  }

  /**
   * Get the default theme
   */
  static getDefaultTheme(): Theme {
    return defaultTheme;
  }

  /**
   * Get theme metadata (name, description, etc.)
   */
  static getThemeMetadata(id: string): Pick<Theme, 'name' | 'id'> | undefined {
    const theme = themeRegistry.get(id);
    if (!theme) return undefined;
    
    return {
      name: theme.name,
      id: theme.id,
    };
  }
}

// Export individual themes for convenience
export { defaultTheme, darkTheme };

// Export the registry instance
export const themeRegistryInstance = ThemeRegistry;
