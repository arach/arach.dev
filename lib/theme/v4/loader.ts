/**
 * Tailwind v4 Theme Loader
 * Dynamically loads CSS theme files
 */

export class ThemeLoaderV4 {
  private static loadedThemes = new Set<string>();
  
  static async loadTheme(themeId: string): Promise<void> {
    // Skip if already loaded
    if (this.loadedThemes.has(themeId)) {
      document.documentElement.setAttribute('data-theme', themeId);
      return;
    }
    
    try {
      // Dynamically import the theme CSS
      await import(`@/themes/v4/${themeId}.css`);
      this.loadedThemes.add(themeId);
      document.documentElement.setAttribute('data-theme', themeId);
    } catch (error) {
      console.error(`Failed to load theme: ${themeId}`, error);
      // Fallback to default
      document.documentElement.setAttribute('data-theme', 'default');
    }
  }
  
  static setTheme(themeId: string): void {
    document.documentElement.setAttribute('data-theme', themeId);
  }
}