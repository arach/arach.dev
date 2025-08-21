'use client';

import React, { useMemo } from 'react';

interface DottedGridProps {
  dotSize?: number;
  dotSpacing?: number;
  dotOpacity?: number;
  dotColor?: string;
}

export default function DottedGrid({ 
  dotSize = 1,
  dotSpacing = 30,
  dotOpacity = 0.15,
  dotColor = '#000000'
}: DottedGridProps) {
  // Create SVG pattern for dots
  const patternId = useMemo(() => `dotted-grid-${Math.random().toString(36).substr(2, 9)}`, []);
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={dotSpacing}
            height={dotSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSpacing / 2}
              cy={dotSpacing / 2}
              r={dotSize}
              fill={dotColor}
              opacity={dotOpacity}
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </svg>
    </div>
  );
}