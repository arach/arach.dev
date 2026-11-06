'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { themes, type ThemeId, STORAGE_KEY } from './themes';

interface ThemeContextValue {
  currentTheme: ThemeId;
  setTheme: (id: ThemeId) => void;
  toggleTheme: () => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Theme CSS is server-rendered and the boot script in app/layout.tsx sets
// data-theme before first paint. This provider only mirrors and changes it.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('default');

  useEffect(() => {
    const root = document.documentElement;
    const read = () => {
      const id = root.getAttribute('data-theme') as ThemeId | null;
      setCurrentTheme(id && id in themes ? id : 'default');
    };
    read();

    // Follow the OS setting until the visitor picks a theme.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch {}
      if (saved) return;
      root.setAttribute('data-theme', media.matches ? 'dark' : 'default');
      read();
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    if (!(id in themes)) return;
    document.documentElement.setAttribute('data-theme', id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch {}
    setCurrentTheme(id);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === 'dark' ? 'default' : 'dark');
  }, [currentTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, toggleTheme, themes }}>
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
