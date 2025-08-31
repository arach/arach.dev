'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeEngine } from './theme-engine';
import { defaultTheme } from './themes/default.theme';
import { darkTheme } from './themes/dark.theme';
import { terminalTheme } from './themes/terminal.theme';
import { oceanTheme } from './themes/ocean.theme';
import { sunsetTheme } from './themes/sunset.theme';
import { cyberpunkTheme } from './themes/cyberpunk.theme';
import { paperTheme } from './themes/paper.theme';

// All available themes
const themes = {
  default: defaultTheme,
  dark: darkTheme,
  terminal: terminalTheme,
  ocean: oceanTheme,
  sunset: sunsetTheme,
  cyberpunk: cyberpunkTheme,
  paper: paperTheme,
} as const;

type ThemeId = keyof typeof themes;

interface ThemeContextValue {
  currentTheme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('default');
  const [isClient, setIsClient] = useState(false);

  // Handle client-side only operations
  useEffect(() => {
    setIsClient(true);
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('site-theme') as ThemeId;
    const themeToLoad = savedTheme && themes[savedTheme] ? savedTheme : 'default';
    
    // Load the theme CSS
    ThemeEngine.loadTheme(themes[themeToLoad]).then(() => {
      setCurrentTheme(themeToLoad);
      // Remove no-transitions class after theme loads
      document.documentElement.classList.remove('no-transitions');
    });
  }, []);

  const setTheme = (id: ThemeId) => {
    const theme = themes[id];
    if (!theme) return;

    // Add transition class
    document.documentElement.classList.add('theme-transition');
    
    // Load new theme
    ThemeEngine.loadTheme(theme).then(() => {
      setCurrentTheme(id);
    });
  };

  // During SSR, render with default theme to avoid hydration mismatch
  if (!isClient) {
    return (
      <ThemeContext.Provider value={{ currentTheme: 'default', setTheme, themes }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}