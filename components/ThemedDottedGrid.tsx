'use client';

import React, { useState, useEffect } from 'react';
import DottedGrid from './DottedGrid';

export default function ThemedDottedGrid() {
  const [mounted, setMounted] = useState(false);
  const [dotValues, setDotValues] = useState({
    color: '#3b82f6',
    size: 1,
    opacity: 0.15
  });
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    
    // Read CSS variables from computed styles
    const updateDotValues = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      // Get dot color from CSS variable (accent color) with fallback
      const accentColor = computedStyle.getPropertyValue('--theme-accent-color').trim() || 
                         computedStyle.getPropertyValue('--theme-accent').trim() || 
                         '#3b82f6';
      
      // Get dot opacity from CSS variable with fallback
      const dotOpacity = computedStyle.getPropertyValue('--theme-dot-opacity').trim();
      const opacity = dotOpacity ? parseFloat(dotOpacity) : 0.15;
      
      // Get current theme for dot size calculation
      const currentTheme = root.getAttribute('data-theme') || 'default';
      
      // Vary dot size based on theme
      let dotSize = 1;
      switch(currentTheme) {
        case 'cyberpunk':
          dotSize = 1.5; // Larger dots for cyber aesthetic
          break;
        case 'dark':
          dotSize = 0.8; // Smaller dots for dark theme
          break;
        case 'paper':
          dotSize = 2; // Bold dots for vintage look
          break;
        default:
          dotSize = 1;
      }
      
      setDotValues({
        color: accentColor,
        size: dotSize,
        opacity: opacity
      });
    };
    
    // Initial update
    updateDotValues();
    
    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateDotValues();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, [mounted]);
  
  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <DottedGrid
      dotSize={dotValues.size}
      dotSpacing={30}
      dotOpacity={dotValues.opacity}
      dotColor={dotValues.color}
    />
  );
}