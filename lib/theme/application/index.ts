// Theme System - Easy theme loading and management
export type { Theme } from '@/types/theme'
export { cx } from '@/themes/application/terminal'

// Initialize built-in themes
import './init'

// Export theme registry functions
export {
  registerTheme,
  getTheme,
  getAllThemes,
  getThemeIds,
  hasTheme
} from './registry'

// Export theme creation utility
export { createTheme, validateAndNormalize } from './factory'

// For backward compatibility and convenience
import { getAllThemes } from './registry'
export const themes = getAllThemes()
export type ThemeName = keyof typeof themes

// HOW TO ADD A NEW THEME:
// 1. Create a new file: themes/application/your-theme.ts
// 2. Use createTheme() helper or copy an existing theme
// 3. Import and register it here or in your component
// 4. It will automatically appear in all theme selectors

// Example of adding a theme at runtime:
// import { registerTheme, createTheme } from '@/lib/theme/application'
// 
// const myTheme = createTheme({
//   name: 'My Theme',
//   description: 'Custom theme',
//   colors: { accent: { primary: '#ff0000' } }
// })
// 
// registerTheme('my-theme', myTheme)