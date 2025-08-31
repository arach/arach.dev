'use client';

import React, { useState, useEffect } from 'react';
import DottedGrid from './DottedGrid';
import { useTheme } from '@/lib/theme-provider-clean';

export default function ThemedDottedGrid() {
  const [mounted, setMounted] = useState(false);
  const { currentTheme, themes } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  const theme = themes[currentTheme];
  
  // Use site theme's accent color for dots
  const getDotColor = () => {
    return theme?.colors?.accent || '#3b82f6';
  };
  
  // Vary dot size based on site theme for more character
  const getDotSize = () => {
    switch(currentTheme) {
      case 'cyberpunk':
        return 1.5; // Larger dots for cyber aesthetic
      case 'dark':
        return 0.8; // Smaller dots for dark theme
      case 'paper':
        return 2; // Bold dots for vintage look
      default:
        return 1;
    }
  };
  
  // Use site theme's dot opacity
  const getDotOpacity = () => {
    return theme?.effects?.dotOpacity ? parseFloat(theme.effects.dotOpacity) : 0.15;
  };
  
  return (
    <DottedGrid
      dotSize={getDotSize()}
      dotSpacing={30}
      dotOpacity={getDotOpacity()}
      dotColor={getDotColor()}
    />
  );
}