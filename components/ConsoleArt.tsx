'use client';

import { useEffect } from 'react';
import { initConsoleArt } from '@/lib/console-art';
import { useTheme } from '@/lib/theme/site/provider';

export function ConsoleArt() {
  const { currentTheme } = useTheme();
  
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