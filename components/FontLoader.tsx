'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Load theme fonts asynchronously after initial render
    // This prevents render blocking
    const loadFonts = () => {
      // Create link element for Google Fonts
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Orbitron:wght@400;600;700&family=Space+Grotesk:wght@400;500;600&family=Outfit:wght@400;500;600&family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;600&family=Exo+2:wght@400;600&family=Crimson+Text:wght@400;600&family=Lora:wght@400;600&display=swap';
      
      // Add media="print" initially to prevent blocking, then switch to "all"
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      
      document.head.appendChild(link);
      
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
    };
    
    // Load fonts after a small delay to ensure critical content renders first
    if (typeof window !== 'undefined') {
      // Use requestIdleCallback if available, otherwise setTimeout
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadFonts);
      } else {
        setTimeout(loadFonts, 1);
      }
    }
  }, []);
  
  return null;
}