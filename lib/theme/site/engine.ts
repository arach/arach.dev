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
  // Font definitions - define once, use everywhere
  fonts: {
    sans: string;
    mono: string;
    serif?: string;
    display?: string;
  };
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
    font?: string; // Optional override, defaults to fonts.sans
  };
  typography: {
    headingColor: string;
    headingFont?: string; // Optional override, defaults to fonts.sans
    bodyColor: string;
    bodyFont?: string; // Optional override, defaults to fonts.sans
    codeColor?: string;
    codeFont?: string; // Optional override, defaults to fonts.mono
  };
  effects: {
    dotOpacity: string;
    blur: string;
    [key: string]: any;
  };
  // Google Fonts or other external fonts to load
  fontImports?: readonly string[];
};

export class ThemeEngine {
  private static styleElement: HTMLStyleElement | null = null;
  private static fontElements: Map<string, HTMLLinkElement> = new Map();

  /**
   * Generates CSS from theme object
   */
  static generateCSS(theme: Theme): string {
    // Default font fallbacks
    const defaultSans = 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const defaultMono = 'var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace';
    const defaultSerif = 'Georgia, "Times New Roman", serif';
    
    // Get font definitions with fallbacks
    const fonts = {
      sans: theme.fonts.sans,
      mono: theme.fonts.mono,
      serif: theme.fonts.serif || defaultSerif,
      display: theme.fonts.display || theme.fonts.sans,
    };
    
    // Get typography settings with fallbacks to font definitions
    const headerFont = theme.header.font || fonts.sans;
    const headingFont = theme.typography.headingFont || fonts.sans;
    const bodyFont = theme.typography.bodyFont || fonts.sans;
    const codeFont = theme.typography.codeFont || fonts.mono;
    const codeColor = theme.typography.codeColor || theme.colors.text;
    
    return `
      [data-theme="${theme.id}"] {
        /* Font Definitions */
        --theme-font-sans: ${fonts.sans};
        --theme-font-serif: ${fonts.serif};
        --theme-font-mono: ${fonts.mono};
        --theme-font-display: ${fonts.display};
        
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
        --theme-header-font: ${headerFont};
        
        /* Typography */
        --theme-heading-color: ${theme.typography.headingColor};
        --theme-heading-font: ${headingFont};
        --theme-body-color: ${theme.typography.bodyColor};
        --theme-body-font: ${bodyFont};
        --theme-code-color: ${theme.typography.codeColor || theme.colors.text};
        --theme-code-font: ${codeFont};
        
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

    // Load external font imports if specified
    if (theme.fontImports) {
      this.loadFonts(theme.fontImports);
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
    // Capture any pre-injected theme font links (e.g., added in <head> before interactive)
    // so we don't duplicate them.
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href][data-theme-fonts]').forEach(link => {
      const url = link.getAttribute('href') || '';
      if (url && !this.fontElements.has(url)) {
        this.fontElements.set(url, link);
      }
    });

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
        link.setAttribute('data-theme-fonts', 'true');
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
