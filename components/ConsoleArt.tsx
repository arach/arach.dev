'use client';

import { useEffect } from 'react';
import { initConsoleArt } from '@/lib/console-art';
import { useTheme } from '@/lib/theme/site/provider';
import type { ThemeId } from '@/lib/theme/site/themes';

export function ConsoleArt() {
  const { currentTheme, setTheme } = useTheme();

  // arach.theme(id) in the console dispatches this event
  useEffect(() => {
    const onChange = (event: Event) => {
      setTheme((event as CustomEvent<{ theme: ThemeId }>).detail.theme);
    };
    window.addEventListener('console-theme-change', onChange);
    return () => window.removeEventListener('console-theme-change', onChange);
  }, [setTheme]);
  
  useEffect(() => {
    // Initialize console art when theme is ready
    // Using requestAnimationFrame to ensure DOM and CSS are fully rendered
    const raf = requestAnimationFrame(() => {
      initConsoleArt();
    });
    
    return () => cancelAnimationFrame(raf);
  }, [currentTheme]); // Re-initialize when theme changes

  return null;
}