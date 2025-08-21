'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  name: string;
  displayName: string;
  bgColor: string;
  textColor: string;
  headerBg: string;
  headerText: string;
  headerFont?: string;
  borderColor?: string;
  accentColor?: string;
  shadowColor?: string;
  mutedTextColor?: string;
  cardBg?: string;
  codeFont?: string;
  asciiColor?: string;
  projectCardText?: string;
  projectCardBg?: string;
  dotOpacity?: number;
  headingColor?: string; // For h1, h2, h3, h4
}

export const themes: Theme[] = [
  {
    name: 'default',
    displayName: 'Default',
    bgColor: '#ffffff',
    textColor: '#111827',
    headerBg: 'rgba(0, 0, 0, 1)',
    headerText: '#ffffff',
    borderColor: '#e5e7eb',
    accentColor: '#3b82f6',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    mutedTextColor: '#6b7280',
    cardBg: '#f9fafb',
    asciiColor: '#000000',
    projectCardText: '#111827',
    projectCardBg: '#ffffff',
    dotOpacity: 0.15,
    headingColor: '#111827',
  },
  {
    name: 'dark',
    displayName: 'Midnight',
    bgColor: '#0a0a0a',
    textColor: '#e5e5e5',
    headerBg: 'rgba(17, 17, 17, 0.95)',
    headerText: '#ffffff',
    headerFont: '"Space Grotesk", "Inter", system-ui, sans-serif',
    borderColor: '#262626',
    accentColor: '#60a5fa',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    mutedTextColor: '#a3a3a3',
    cardBg: '#171717',
    asciiColor: '#f5f5f5',
    projectCardText: '#e5e5e5',
    projectCardBg: '#1a1a1a',
    dotOpacity: 0.25,
    headingColor: '#60a5fa',
  },
  {
    name: 'ocean',
    displayName: 'Deep Ocean',
    bgColor: '#0f172a',
    textColor: '#cbd5e1',
    headerBg: 'rgba(30, 58, 138, 0.9)',
    headerText: '#e0f2fe',
    headerFont: '"Outfit", "DM Sans", system-ui, sans-serif',
    borderColor: '#1e293b',
    accentColor: '#38bdf8',
    shadowColor: 'rgba(14, 165, 233, 0.15)',
    mutedTextColor: '#94a3b8',
    cardBg: '#1e293b',
    asciiColor: '#e0f2fe',
    projectCardText: '#cbd5e1',
    projectCardBg: '#1e293b',
    dotOpacity: 0.2,
    headingColor: '#38bdf8',
  },
  {
    name: 'sunset',
    displayName: 'Golden Hour',
    bgColor: '#fef3c7',
    textColor: '#78350f',
    headerBg: 'linear-gradient(135deg, rgba(251, 146, 60, 0.95), rgba(245, 101, 101, 0.95))',
    headerText: '#ffffff',
    headerFont: '"Playfair Display", "Lora", Georgia, serif',
    borderColor: '#fcd34d',
    accentColor: '#f59e0b',
    shadowColor: 'rgba(251, 146, 60, 0.2)',
    mutedTextColor: '#92400e',
    cardBg: '#fffbeb',
    codeFont: '"JetBrains Mono", "Fira Code", monospace',
    asciiColor: '#7c2d12',
    projectCardText: '#78350f',
    projectCardBg: '#fef9e7',
    dotOpacity: 0.4,
    headingColor: '#92400e',
  },
  {
    name: 'cyberpunk',
    displayName: 'Cyber Neon',
    bgColor: '#0a0014',
    textColor: '#e0f2fe',
    headerBg: 'linear-gradient(90deg, rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.9))',
    headerText: '#ffffff',
    headerFont: '"Orbitron", "Exo 2", "Space Mono", monospace',
    borderColor: '#6366f1',
    accentColor: '#f472b6',
    shadowColor: 'rgba(139, 92, 246, 0.3)',
    mutedTextColor: '#94a3b8',
    cardBg: '#1e1b4b',
    codeFont: '"Fira Code", "Victor Mono", monospace',
    asciiColor: '#f472b6',
    projectCardText: '#e0f2fe',
    projectCardBg: '#2e1065',
    dotOpacity: 0.3,
    headingColor: '#fbbf24',
  },
  {
    name: 'paper',
    displayName: 'Vintage Paper',
    bgColor: '#faf8f3',
    textColor: '#3d2817',
    headerBg: 'rgba(92, 79, 59, 0.95)',
    headerText: '#faf8f3',
    headerFont: '"Libre Baskerville", "Crimson Text", "Times New Roman", serif',
    borderColor: '#d4c5b0',
    accentColor: '#8b7355',
    shadowColor: 'rgba(92, 79, 59, 0.15)',
    mutedTextColor: '#6b5d4f',
    cardBg: '#f5f2eb',
    codeFont: '"Courier Prime", "Courier New", monospace',
    asciiColor: '#5c4f3b',
    projectCardText: '#3d2817',
    projectCardBg: '#f5f2eb',
    dotOpacity: 0.35,
    headingColor: '#451a03',
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  const setTheme = (theme: Theme) => {
    console.log('[ThemeContext] Setting theme:', theme.name, theme);
    setCurrentTheme(theme);
    localStorage.setItem('site-theme', theme.name);
    
    // Apply theme class to body
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    
    if (theme.name !== 'default') {
      document.body.classList.add(`theme-${theme.name}`);
    }
    
    // Also update CSS variables directly for immediate effect
    const root = document.documentElement;
    console.log('[ThemeContext] Setting CSS vars - bg:', theme.bgColor, 'text:', theme.textColor);
    root.style.setProperty('--theme-bg-color', theme.bgColor);
    root.style.setProperty('--theme-text-color', theme.textColor);
    root.style.setProperty('--theme-header-bg', theme.headerBg);
    root.style.setProperty('--theme-header-text', theme.headerText);
    root.style.setProperty('--theme-header-font', theme.headerFont || 'inherit');
    root.style.setProperty('--theme-border-color', theme.borderColor || '#e5e7eb');
    root.style.setProperty('--theme-accent-color', theme.accentColor || '#3b82f6');
    root.style.setProperty('--theme-shadow-color', theme.shadowColor || 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--theme-muted-text', theme.mutedTextColor || '#6b7280');
    root.style.setProperty('--theme-card-bg', theme.cardBg || '#f9fafb');
    root.style.setProperty('--theme-code-font', theme.codeFont || 'inherit');
    root.style.setProperty('--theme-ascii-color', theme.asciiColor || '#000000');
    root.style.setProperty('--theme-project-card-text', theme.projectCardText || '#111827');
    root.style.setProperty('--theme-project-card-bg', theme.projectCardBg || '#ffffff');
    root.style.setProperty('--theme-dot-opacity', theme.dotOpacity?.toString() || '0.15');
    root.style.setProperty('--theme-heading-color', theme.headingColor || '#111827');
  };

  useEffect(() => {
    // Apply initial theme
    console.log('[ThemeContext] Applying initial theme:', currentTheme.name, currentTheme);
    if (currentTheme.name !== 'default') {
      document.body.classList.add(`theme-${currentTheme.name}`);
    }
    
    // Set initial CSS variables
    const root = document.documentElement;
    console.log('[ThemeContext] Initial CSS vars - bg:', currentTheme.bgColor, 'text:', currentTheme.textColor);
    root.style.setProperty('--theme-bg-color', currentTheme.bgColor);
    root.style.setProperty('--theme-text-color', currentTheme.textColor);
    root.style.setProperty('--theme-header-bg', currentTheme.headerBg);
    root.style.setProperty('--theme-header-text', currentTheme.headerText);
    root.style.setProperty('--theme-header-font', currentTheme.headerFont || 'inherit');
    root.style.setProperty('--theme-border-color', currentTheme.borderColor || '#e5e7eb');
    root.style.setProperty('--theme-accent-color', currentTheme.accentColor || '#3b82f6');
    root.style.setProperty('--theme-shadow-color', currentTheme.shadowColor || 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--theme-muted-text', currentTheme.mutedTextColor || '#6b7280');
    root.style.setProperty('--theme-card-bg', currentTheme.cardBg || '#f9fafb');
    root.style.setProperty('--theme-code-font', currentTheme.codeFont || 'inherit');
    root.style.setProperty('--theme-ascii-color', currentTheme.asciiColor || '#000000');
    root.style.setProperty('--theme-project-card-text', currentTheme.projectCardText || '#111827');
    root.style.setProperty('--theme-project-card-bg', currentTheme.projectCardBg || '#ffffff');
    root.style.setProperty('--theme-dot-opacity', currentTheme.dotOpacity?.toString() || '0.15');
    root.style.setProperty('--theme-heading-color', currentTheme.headingColor || '#111827');
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}