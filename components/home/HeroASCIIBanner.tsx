'use client';

import React from 'react';

// ASCII art banner component optimized for fast initial render
export default function HeroASCIIBanner() {
  return (
    <>
      {/* Inline critical CSS for immediate render */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-ascii {
          font-size: 4px;
          font-family: Monaco, Consolas, "Courier New", monospace;
          margin: 0 0 0.5rem 0;
          line-height: 1;
          white-space: pre;
          overflow: hidden;
          text-align: center;
          opacity: 1;
          transform: translateZ(0);
          will-change: auto;
          contain: layout style paint;
          color: var(--theme-ascii-color, #000);
        }
        @media (min-width: 475px) {
          .hero-ascii { font-size: 5px; }
        }
        @media (min-width: 640px) {
          .hero-ascii { 
            font-size: 8px;
            text-align: left;
            margin-bottom: 1.5rem;
          }
        }
        @media (min-width: 768px) {
          .hero-ascii { font-size: 10px; }
        }
        @media (min-width: 1024px) {
          .hero-ascii { font-size: 12px; }
        }
        .hero-wrapper {
          margin-bottom: 0;
        }
      `}} />
      
      {/* Hero ASCII with immediate render - no animations */}
      <div className="hero-wrapper">
        <div style={{ marginBottom: '1rem' }}>
          <pre className="hero-ascii" suppressHydrationWarning>
{`╔──────────────────────────────────────────────────────────────────────────╗
│                                                                          │
│    █████╗ ██████╗  █████╗  ██████╗██╗  ██╗   ██████╗ ███████╗██╗   ██╗   │
│   ██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║   ██╔══██╗██╔════╝██║   ██║   │
│   ███████║██████╔╝███████║██║     ███████║   ██║  ██║█████╗  ██║   ██║   │
│   ██╔══██║██╔══██╗██╔══██║██║     ██╔══██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝   │
│   ██║  ██║██║  ██║██║  ██║╚██████╗██║  ██║██╗██████╔╝███████╗ ╚████╔╝    │
│   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝     │
│                                                                          │
╚──────────────────────────────────────────────────────────────────────────╝`}
          </pre>
        </div>
      </div>
    </>
  );
}