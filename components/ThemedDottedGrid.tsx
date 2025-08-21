'use client';

import React, { useState, useEffect } from 'react';
import DottedGrid from './DottedGrid';
import { useTheme } from '@/lib/theme-context';

export default function ThemedDottedGrid() {
  const [mounted, setMounted] = useState(false);
  const { currentTheme: siteTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  // Use site theme's accent color for dots
  const getDotColor = () => {
    return siteTheme.accentColor || '#3b82f6';
  };
  
  // Vary dot size based on site theme for more character
  const getDotSize = () => {
    switch(siteTheme.name) {
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
    return siteTheme.dotOpacity || 0.15;
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