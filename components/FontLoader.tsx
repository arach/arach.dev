'use client';

import { useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';

// Map of theme fonts to Google Fonts URLs
const themeFonts: Record<string, string> = {
  'Space Grotesk': 'Space+Grotesk:wght@400;500;600',
  'Outfit': 'Outfit:wght@400;500;600',
  'DM Sans': 'DM+Sans:wght@400;500;600',
  'Playfair Display': 'Playfair+Display:wght@400;600;700',
  'Orbitron': 'Orbitron:wght@400;600;700',
  'Libre Baskerville': 'Libre+Baskerville:wght@400;700',
  'Exo 2': 'Exo+2:wght@400;600',
  'Crimson Text': 'Crimson+Text:wght@400;600',
  'Lora': 'Lora:wght@400;600',
  'JetBrains Mono': 'JetBrains+Mono:wght@400;500',
  'Fira Code': 'Fira+Code:wght@400;500',
};

export default function FontLoader() {
  const { currentTheme } = useTheme();
  
  useEffect(() => {
    if (!currentTheme || typeof window === 'undefined') return;
    
    // Extract unique fonts from current theme
    const fontsToLoad = new Set<string>();
    
    // Check headerFont
    if (currentTheme.headerFont) {
      // Parse font family string to extract individual fonts
      const fonts = currentTheme.headerFont.split(',').map(f => f.trim().replace(/['"]/g, ''));
      fonts.forEach(font => {
        if (themeFonts[font]) {
          fontsToLoad.add(font);
        }
      });
    }
    
    // Check codeFont
    if (currentTheme.codeFont) {
      const fonts = currentTheme.codeFont.split(',').map(f => f.trim().replace(/['"]/g, ''));
      fonts.forEach(font => {
        if (themeFonts[font]) {
          fontsToLoad.add(font);
        }
      });
    }
    
    // If no custom fonts needed, exit early
    if (fontsToLoad.size === 0) return;
    
    // Create unique ID for this font combination
    const fontId = `theme-fonts-${currentTheme.name}`;
    
    // Check if fonts are already loaded
    if (document.getElementById(fontId)) return;
    
    // Build Google Fonts URL
    const fontParams = Array.from(fontsToLoad).map(font => themeFonts[font]).join('&family=');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontParams}&display=swap`;
    
    const loadFonts = () => {
      // Remove any previous theme font links
      document.querySelectorAll('link[data-theme-font]').forEach(link => link.remove());
      
      // Create link element for Google Fonts
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.setAttribute('data-theme-font', 'true');
      
      // Add media="print" initially to prevent blocking, then switch to "all"
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      
      document.head.appendChild(link);
    };
    
    // Load fonts after a small delay to ensure critical content renders first
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadFonts);
    } else {
      setTimeout(loadFonts, 1);
    }
    
    // Cleanup function
    return () => {
      // Optionally remove font when theme changes
      // const oldLink = document.getElementById(fontId);
      // if (oldLink) oldLink.remove();
    };
  }, [currentTheme]);
  
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