'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from '@/lib/theme/site/provider';
import { usePathname } from 'next/navigation';

export function ThemePicker() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide on gallery pages (they have their own controls)
  if (pathname?.startsWith('/gallery')) return null;

  const themeList = Object.values(themes);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-12 right-0 rounded-md shadow-lg border p-1.5 min-w-[160px] backdrop-blur-md"
            style={{
              backgroundColor: 'var(--theme-bg-color)',
              borderColor: 'var(--theme-border-color)'
            }}
            role="menu"
            aria-label="Theme menu"
          >
            <div className="space-y-1">
              {themeList.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id as any);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors duration-150 text-left ${
                    currentTheme === theme.id ? 'bg-black/5 dark:bg-white/5' : 'hover:bg-black/4 dark:hover:bg-white/4'
                  }`}
                  role="menuitemradio"
                  aria-checked={currentTheme === theme.id}
                  data-theme-id={theme.id}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full border border-black/10 dark:border-white/10" style={{ backgroundColor: theme.colors.bg }} />
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.text }} />
                    </div>
                    <span className="text-[11px] font-light" style={{ color: 'var(--theme-text-color)' }}>{theme.name}</span>
                  </div>
                  {currentTheme === theme.id && <span className="w-1 h-1 rounded-full bg-[color:var(--theme-accent-color)]" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm"
        style={{
          backgroundColor: 'var(--theme-bg-color)',
          borderColor: 'var(--theme-border-color)',
          opacity: isOpen ? 0.9 : 0.72,
        }}
        aria-label="Change theme"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Palette className="w-3.5 h-3.5 transition-colors duration-200" style={{ color: isOpen ? 'var(--theme-accent-color)' : 'var(--theme-muted-color)' }} />
      </motion.button>
    </div>
  );
}
