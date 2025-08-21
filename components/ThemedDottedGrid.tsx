'use client';

import React, { useState, useEffect } from 'react';
import DottedGrid from './DottedGrid';

export default function ThemedDottedGrid() {
  const [mounted, setMounted] = useState(false);
  const [dotOpacity, setDotOpacity] = useState(0.15);
  const [dotColor, setDotColor] = useState('#000000');
  
  useEffect(() => {
    setMounted(true);
    
    // Function to update dot appearance based on CSS variables
    const updateDotAppearance = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      // Get theme-specific dot opacity
      const themeOpacity = computedStyle.getPropertyValue('--theme-dot-opacity');
      if (themeOpacity) {
        setDotOpacity(parseFloat(themeOpacity));
      }
      
      // Get theme text color for dots (or use a specific dot color if defined)
      const themeTextColor = computedStyle.getPropertyValue('--theme-text-color');
      if (themeTextColor) {
        setDotColor(themeTextColor.trim());
      }
    };
    
    // Initial update
    updateDotAppearance();
    
    // Watch for theme changes
    const observer = new MutationObserver(updateDotAppearance);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <DottedGrid
      dotSize={1}
      dotSpacing={30}
      dotOpacity={dotOpacity}
      dotColor={dotColor}
    />
  );
}