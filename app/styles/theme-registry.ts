// Theme registry for dynamic loading
// Each theme CSS is a separate module that can be loaded on demand

export const themeModules = {
  default: () => import('./themes/default.css'),
  dark: () => import('./themes/dark.css'),
  terminal: () => import('./themes/terminal.css'),
  ocean: () => import('./themes/ocean.css'),
  cyberpunk: () => import('./themes/cyberpunk.css'),
} as const;

export type ThemeId = keyof typeof themeModules;