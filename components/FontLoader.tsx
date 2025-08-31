'use client';

import { useEffect } from 'react';
import { useTheme } from '@/lib/theme-provider-clean';

export default function FontLoader() {
  const { currentTheme, themes } = useTheme();
  
  useEffect(() => {
    if (!currentTheme || typeof window === 'undefined') return;
    
    const theme = themes[currentTheme];
    if (!theme?.fonts || theme.fonts.length === 0) return;
    
    // Create unique ID for this theme's fonts
    const fontId = `theme-fonts-${theme.id}`;
    
    // Check if fonts are already loaded
    if (document.getElementById(fontId)) return;
    
    const loadFonts = () => {
      // Remove any previous theme font links
      document.querySelectorAll('link[data-theme-font]').forEach(link => link.remove());
      
      // Add each font URL as a separate link
      theme.fonts.forEach((fontUrl, index) => {
        const link = document.createElement('link');
        link.id = `${fontId}-${index}`;
        link.rel = 'stylesheet';
        link.href = fontUrl;
        link.setAttribute('data-theme-font', 'true');
        
        // Add media="print" initially to prevent blocking, then switch to "all"
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
        
        document.head.appendChild(link);
      });
    };
    
    // Load fonts after a small delay to ensure critical content renders first
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadFonts);
    } else {
      setTimeout(loadFonts, 1);
    }
  }, [currentTheme, themes]);
  
  // Add preconnect links on mount (these are always useful)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if preconnect links already exist
    const hasPreconnect = document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]');
    if (hasPreconnect) return;
    
    // Preconnect to Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);
    
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);
  }, []);
  
  return null;
}