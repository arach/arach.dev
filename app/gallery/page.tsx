'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GalleryIndex() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated background dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative z-10 px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with gradient text */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Theme Gallery
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore our collection of carefully crafted themes for websites and applications.
              Each theme is designed with accessibility and modern aesthetics in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Site Themes Card */}
            <Link 
              href="/gallery/site"
              className="group relative"
              onMouseEnter={() => setHoveredCard('site')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8 transition-all duration-300 group-hover:border-gray-700 group-hover:translate-y-[-2px]">
                {/* Icon */}
                <div className="mb-6 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-3 shadow-lg shadow-blue-500/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-white">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 3v18" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  Site Themes
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Beautiful, minimal themes perfect for landing pages, portfolios, and content-focused websites.
                  Features elegant typography and cohesive color palettes.
                </p>
                
                {/* Preview dots */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-gray-500 ml-2">7 themes available</span>
                </div>
                
                <div className="flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
                  <span>Explore Site Themes</span>
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Application Themes Card */}
            <Link 
              href="/gallery/application"
              className="group relative"
              onMouseEnter={() => setHoveredCard('app')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8 transition-all duration-300 group-hover:border-gray-700 group-hover:translate-y-[-2px]">
                {/* Icon */}
                <div className="mb-6 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg shadow-purple-500/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-white">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M8 8h8" />
                    <path d="M8 12h6" />
                    <path d="M8 16h4" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                  Application Themes
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Comprehensive UI component themes with buttons, forms, tables, cards, and interactive elements.
                  Built for complex applications and dashboards.
                </p>
                
                {/* Component preview */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-2 py-1 text-xs rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">Buttons</span>
                  <span className="px-2 py-1 text-xs rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">Forms</span>
                  <span className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Tables</span>
                  <span className="text-xs text-gray-500">+12 more</span>
                </div>
                
                <div className="flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                  <span>Explore Application Themes</span>
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">12+</div>
              <div className="text-sm text-gray-500">Total Themes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-gray-500">UI Components</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-gray-500">Customizable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}