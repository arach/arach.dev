'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThemeEngine } from '@/lib/theme-engine';
import { ThemeRegistry } from '@/lib/theme-registry';
import type { Theme } from '@/lib/theme-engine';

interface UseThemeReturn {
  currentTheme: string;
  themes: Theme[];
  themeIds: string[];
  switchTheme: (themeId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for managing themes
 */
export function useTheme(): UseThemeReturn {
  const [currentTheme, setCurrentTheme] = useState<string>('default');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [themeIds, setThemeIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize themes on mount
  useEffect(() => {
    const initializeThemes = () => {
      try {
        const availableThemes = ThemeRegistry.getAllThemes();
        const availableThemeIds = ThemeRegistry.getThemeIds();
        
        setThemes(availableThemes);
        setThemeIds(availableThemeIds);
        
        // Get saved theme preference or use default
        const savedTheme = ThemeEngine.getSavedTheme();
        const activeTheme = ThemeEngine.getActiveTheme();
        
        if (savedTheme && ThemeRegistry.hasTheme(savedTheme)) {
          setCurrentTheme(savedTheme);
        } else if (activeTheme && ThemeRegistry.hasTheme(activeTheme)) {
          setCurrentTheme(activeTheme);
        } else {
          setCurrentTheme('default');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize themes');
      }
    };

    initializeThemes();
  }, []);

  // Switch to a different theme
  const switchTheme = useCallback(async (themeId: string) => {
    if (!ThemeRegistry.hasTheme(themeId)) {
      setError(`Theme '${themeId}' not found`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const theme = ThemeRegistry.getTheme(themeId);
      if (!theme) {
        throw new Error(`Theme '${themeId}' not found`);
      }

      await ThemeEngine.loadTheme(theme);
      setCurrentTheme(themeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch theme');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentTheme,
    themes,
    themeIds,
    switchTheme,
    isLoading,
    error,
  };
}

/**
 * Hook for getting the current theme object
 */
export function useCurrentTheme(): Theme | null {
  const { currentTheme, themes } = useTheme();
  return themes.find(theme => theme.id === currentTheme) || null;
}
