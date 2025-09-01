/**
 * Theme Engine for Tailwind v4 - Converts TypeScript theme objects to CSS
 * This gives us:
 * 1. Type safety for themes
 * 2. Easy to read/write theme files
 * 3. Dynamic CSS generation
 * 4. Only loads the active theme
 */

export type Theme = {
  name: string;
  id: string;
  colors: {
    bg: string;
    text: string;
    accent: string;
    muted: string;
    border: string;
    card: string;
    shadow: string;
  };
  header: {
    bg: string;
    text: string;
    font: string;
  };
  typography: {
    heading: string;
    body: string;
    code: string;
  };
  effects: {
    dotOpacity: string;
    blur: string;
    [key: string]: any;
  };
  fonts?: readonly string[];
};

export class ThemeEngine {
  private static styleElement: HTMLStyleElement | null = null;
  private static fontElements: Map<string, HTMLLinkElement> = new Map();

  /**
   * Generates CSS from theme object
   */
  static generateCSS(theme: Theme): string {
    return `
      [data-theme="${theme.id}"] {
        /* Colors */
        --theme-bg-color: ${theme.colors.bg};
        --theme-text-color: ${theme.colors.text};
        --theme-accent-color: ${theme.colors.accent};
        --theme-muted-color: ${theme.colors.muted};
        --theme-border-color: ${theme.colors.border};
        --theme-card-bg: ${theme.colors.card};
        --theme-shadow-color: ${theme.colors.shadow};
        
        /* Header */
        --theme-header-bg: ${theme.header.bg};
        --theme-header-text-color: ${theme.header.text};
        --theme-header-font: ${theme.header.font};
        
        /* Typography */
        --theme-heading-color: ${theme.typography.heading};
        --theme-body-color: ${theme.typography.body};
        --theme-code-font: ${theme.typography.code};
        
        /* Effects */
        --theme-dot-opacity: ${theme.effects.dotOpacity};
        --theme-blur: ${theme.effects.blur};
      }
    `.trim();
  }

  /**
   * Loads a theme dynamically
   */
  static async loadTheme(theme: Theme): Promise<void> {
    // Remove previous theme styles
    if (this.styleElement) {
      this.styleElement.remove();
    }

    // Create new style element with theme CSS
    this.styleElement = document.createElement('style');
    this.styleElement.id = `theme-${theme.id}`;
    this.styleElement.textContent = this.generateCSS(theme);
    document.head.appendChild(this.styleElement);

    // Load theme fonts if specified
    if (theme.fonts) {
      this.loadFonts(theme.fonts);
    }

    // Set data attribute
    document.documentElement.setAttribute('data-theme', theme.id);
    
    // Save preference
    localStorage.setItem('site-theme', theme.id);
  }

  /**
   * Loads fonts for a theme
   */
  private static loadFonts(fonts: readonly string[]): void {
    // Remove previous font elements
    this.fontElements.forEach(element => element.remove());
    this.fontElements.clear();

    // Load new fonts
    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;600;700&display=swap`;
      link.id = `font-${font}`;
      
      document.head.appendChild(link);
      this.fontElements.set(font, link);
    });
  }

  /**
   * Gets the currently active theme ID
   */
  static getActiveTheme(): string | null {
    return document.documentElement.getAttribute('data-theme');
  }

  /**
   * Gets the saved theme preference
   */
  static getSavedTheme(): string | null {
    return localStorage.getItem('site-theme');
  }

  /**
   * Clears the current theme
   */
  static clearTheme(): void {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
    
    this.fontElements.forEach(element => element.remove());
    this.fontElements.clear();
    
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('site-theme');
  }

  /**
   * Initializes the theme engine with a default theme
   */
  static async init(defaultTheme: Theme): Promise<void> {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;
    
    // Check if a theme is already loaded
    const activeTheme = this.getActiveTheme();
    if (activeTheme) return;
    
    // Load the default theme
    await this.loadTheme(defaultTheme);
  }
}
