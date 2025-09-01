'use client';

import { useEffect } from 'react';
import { ThemeEngine } from '@/lib/theme-engine';
import { defaultTheme } from '@/themes/default';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Initialize the theme engine with the default theme
    const initTheme = async () => {
      try {
        await ThemeEngine.init(defaultTheme);
        console.log('✅ Theme initialized successfully:', defaultTheme.id);
        
        // Check if theme was applied
        const activeTheme = ThemeEngine.getActiveTheme();
        console.log('🎨 Active theme:', activeTheme);
        
        // Check if CSS variables are set
        const root = document.documentElement;
        const bgColor = getComputedStyle(root).getPropertyValue('--theme-bg-color');
        console.log('🎨 Background color variable:', bgColor);
      } catch (error) {
        console.error('❌ Failed to initialize theme:', error);
      }
    };
    
    initTheme();
  }, []);

  return <>{children}</>;
}
