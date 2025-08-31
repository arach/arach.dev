'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeLoader } from '@/app/styles/theme-loader';

// Theme metadata - no styles, just info
export const themes = [
  { id: 'default', name: 'Default', description: 'Light, clean aesthetic' },
  { id: 'dark', name: 'Midnight', description: 'Dark mode with blue accents' },
  { id: 'terminal', name: 'Terminal', description: 'Monospace, high contrast' },
  { id: 'ocean', name: 'Deep Ocean', description: 'Deep blues and aqua tones' },
  { id: 'cyberpunk', name: 'Cyber Neon', description: 'Neon purple and pink' },
] as const;

export type ThemeId = typeof themes[number]['id'];

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (themeId: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('default');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('site-theme') as ThemeId;
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const setTheme = (themeId: ThemeId) => {
    // Simple: just set the data attribute and save preference
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('site-theme', themeId);
    setCurrentTheme(themeId);
    
    // Optional: dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('theme-change', { detail: themeId }));
  };

  // Apply theme on changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme, mounted]);

  // Prevent flash of unstyled content
  useEffect(() => {
    document.documentElement.classList.remove('no-transitions');
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <ThemeLoader themeId={currentTheme} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}