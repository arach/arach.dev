'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider-clean';
import { usePathname } from 'next/navigation';

export default function ThemePicker() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Don't render on styleguide pages - they have their own theme system
  if (pathname?.startsWith('/styleguide')) {
    return null;
  }
  
  // Convert themes object to array for display
  const themeList = Object.values(themes)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 right-0 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-500/20 p-1.5 min-w-[160px]"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="space-y-1">
              {themeList.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id as any);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md
                    transition-all duration-200 text-left
                    ${currentTheme === theme.id 
                      ? 'bg-gray-500/10' 
                      : 'hover:bg-gray-500/5'}
                  `}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {/* Color preview */}
                    <div className="flex gap-0.5">
                      <span 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.colors.bg }}
                      />
                      <span 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    <span className="text-[11px] font-light" style={{ color: 'var(--theme-text)' }}>
                      {theme.name}
                    </span>
                  </div>
                  {currentTheme === theme.id && (
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme toggle button - super subtle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative p-2.5 rounded-full
          backdrop-blur-md
          transition-all duration-500
          group
          ${isOpen 
            ? 'bg-gray-900/90 border-gray-600/50' 
            : 'bg-gray-500/10 hover:bg-gray-500/20 border-gray-500/10 hover:border-gray-500/20'}
          border
        `}
        style={{
          backgroundColor: isOpen ? undefined : 'var(--theme-bg)',
          opacity: isOpen ? 1 : 0.7,
        }}
        aria-label="Change theme"
      >
        <Palette 
          className={`
            w-3.5 h-3.5 transition-all duration-300
            ${isOpen ? 'text-blue-400' : ''}
          `}
          style={{
            color: isOpen ? undefined : 'var(--theme-muted)'
          }}
        />
      </motion.button>
    </div>
  );
}