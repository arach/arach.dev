/**
 * Theme Engine - Converts TypeScript theme objects to CSS
 * This gives us:
 * 1. Type safety for themes
 * 2. Easy to read/write theme files
 * 3. Dynamic CSS generation
 * 4. Only loads the active theme
 */

type Theme = {
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
   * Loads font stylesheets
   */
  private static loadFonts(fonts: readonly string[]): void {
    // Remove old font links not in new theme
    this.fontElements.forEach((element, url) => {
      if (!fonts.includes(url)) {
        element.remove();
        this.fontElements.delete(url);
      }
    });

    // Add new font links
    fonts.forEach(fontUrl => {
      if (!this.fontElements.has(fontUrl)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fontUrl;
        document.head.appendChild(link);
        this.fontElements.set(fontUrl, link);
      }
    });
  }

  /**
   * Gets CSS for all themes (for SSG/SSR)
   */
  static getAllThemesCSS(themes: Theme[]): string {
    return themes.map(theme => this.generateCSS(theme)).join('\n\n');
  }
}