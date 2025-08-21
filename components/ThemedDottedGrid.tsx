'use client';

import React, { useState, useEffect } from 'react';
import DottedGrid from './DottedGrid';
import { type BackgroundTheme } from '@/components/InteractiveBackground';

interface ThemedDottedGridProps {
  theme?: BackgroundTheme;
}

export default function ThemedDottedGrid({ theme }: ThemedDottedGridProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  // Default theme if none provided
  const defaultTheme: BackgroundTheme = {
    name: 'default',
    dotColor: '#6b7280',
    lineColor: '#e5e7eb',
    targetColor: '#3b82f6',
    dotOpacity: 0.15,
    lineOpacity: 0.1,
  };
  
  const currentTheme = theme || defaultTheme;
  
  // Use theme-specific dot colors for visual interest
  const getDotColor = () => {
    // Map theme names to better dot colors
    switch(currentTheme.name) {
      case 'Purple Haze':
        return '#a855f7'; // Bright purple
      case 'Green Matrix':
        return '#10b981'; // Emerald green
      case 'Orange Glow':
        return '#fb923c'; // Bright orange
      case 'Cyberpunk':
        return '#ec4899'; // Hot pink
      case 'Ocean':
        return '#22d3ee'; // Cyan
      case 'Sunset':
        return '#f87171'; // Red/pink
      case 'Blue Tech':
      default:
        return currentTheme.dotColor;
    }
  };
  
  // Vary dot size based on theme for more character
  const getDotSize = () => {
    switch(currentTheme.name) {
      case 'Cyberpunk':
        return 1.5; // Larger dots for cyber aesthetic
      case 'Green Matrix':
        return 0.8; // Smaller dots for matrix rain feel
      case 'Monochrome':
        return 2; // Bold dots for minimalist look
      default:
        return 1;
    }
  };
  
  return (
    <DottedGrid
      dotSize={getDotSize()}
      dotSpacing={30}
      dotOpacity={currentTheme.dotOpacity}
      dotColor={getDotColor()}
    />
  );
}