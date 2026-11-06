import { defaultTheme } from '@/themes/site/default.theme';
import { darkTheme } from '@/themes/site/dark.theme';
import { ThemeEngine } from './engine';

export const themes = {
  default: defaultTheme,
  dark: darkTheme,
} as const;

export type ThemeId = keyof typeof themes;

export const STORAGE_KEY = 'site-theme';

export const themesCSS = ThemeEngine.getAllThemesCSS(Object.values(themes));

// Runs before first paint: saved choice, else the OS preference.
export const themeBootScript = `(function(){var t;try{t=localStorage.getItem('${STORAGE_KEY}')}catch(e){}if(t!=='default'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'default'}document.documentElement.setAttribute('data-theme',t)})();`;
