'use client';

import { useEffect } from 'react';

interface ThemeLoaderProps {
  themeId: string;
}

export function ThemeLoader({ themeId }: ThemeLoaderProps) {
  useEffect(() => {
    // Remove any existing theme stylesheets
    const existingThemes = document.querySelectorAll('link[data-theme-stylesheet]');
    existingThemes.forEach(link => link.remove());

    // Add the new theme stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/styles/themes/${themeId}.css`;
    link.setAttribute('data-theme-stylesheet', themeId);
    document.head.appendChild(link);

    // Cleanup on unmount or theme change
    return () => {
      const themeLink = document.querySelector(`link[data-theme-stylesheet="${themeId}"]`);
      if (themeLink) {
        themeLink.remove();
      }
    };
  }, [themeId]);

  return null;
}