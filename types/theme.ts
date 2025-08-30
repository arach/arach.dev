/**
 * Core theme interface definitions
 * These are generic and not tied to any specific theme implementation
 */

// Font definition interface
export interface ThemeFont {
  name: string
  family: string
  provider?: string
  import?: string
}

// Font collection interface
export interface ThemeFonts {
  sans?: ThemeFont
  mono?: ThemeFont
  ui?: ThemeFont
  display?: ThemeFont
  [key: string]: ThemeFont | undefined
}

// Color palette interface
export interface ThemeColors {
  gray?: Record<string | number, string>
  accent?: Record<string, string>
  [key: string]: Record<string | number, string> | undefined
}

// Typography styles interface
export interface ThemeTypography {
  [key: string]: string | Record<string, string>
}

// Component styles interface
export interface ThemeComponents {
  input?: Record<string, string>
  button?: Record<string, string>
  card?: Record<string, string>
  badge?: Record<string, string>
  status?: Record<string, string>
  table?: Record<string, string>
  [key: string]: Record<string, string> | undefined
}

// Layout utilities interface
export interface ThemeLayout {
  container?: string
  panel?: string
  sidebar?: string
  section?: string
  [key: string]: string | undefined
}

// Effects interface
export interface ThemeEffects {
  glow?: Record<string, string>
  glass?: string
  [key: string]: string | Record<string, string> | undefined
}

// Animations interface
export interface ThemeAnimations {
  [key: string]: string
}

// Utilities interface
export interface ThemeUtilities {
  [key: string]: string
}

// Main theme interface
export interface Theme {
  name: string
  description: string
  colors?: ThemeColors
  fonts?: ThemeFonts
  typography?: ThemeTypography
  components?: ThemeComponents
  layout?: ThemeLayout
  effects?: ThemeEffects
  animations?: ThemeAnimations
  utilities?: ThemeUtilities
  [key: string]: any // Allow for additional theme-specific properties
}

// Theme registry interface
export interface ThemeRegistry {
  [themeId: string]: Theme
}

// Theme context interface (for React context)
export interface ThemeContextType {
  currentTheme: Theme | null
  setTheme: (themeId: string) => void
  availableThemes: string[]
}

// Theme loading interface
export interface ThemeLoader {
  loadTheme: (themeId: string) => Promise<Theme>
  getAvailableThemes: () => Promise<string[]>
}

// CSS Variables interface
export interface CSSVariables {
  [variableName: string]: string
}

// Theme CSS generator interface
export interface ThemeCSSGenerator {
  generateCSS: (theme: Theme) => string
  generateVariables: (theme: Theme) => CSSVariables
}

// Theme validation interface
export interface ThemeValidator {
  validate: (theme: Theme) => { isValid: boolean; errors: string[] }
  validateRequired: (theme: Theme) => { isValid: boolean; errors: string[] }
}

// Export commonly used types
export type ThemeId = string
export type ThemeName = string
export type ThemeDescription = string
export type ThemeProvider = 'google' | 'local' | 'custom'
export type ThemeVariant = 'light' | 'dark' | 'auto'
