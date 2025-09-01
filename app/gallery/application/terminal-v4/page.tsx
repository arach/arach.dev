'use client';

import { terminalV4, applyTerminalV4Theme, cx } from '@/themes/application/terminal-v4';
import { useEffect, useState } from 'react';

export default function TerminalV4Demo() {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'online' | 'offline' | 'error' | 'warning' | 'pending'>('online');
  
  useEffect(() => {
    // Apply the terminal v4 theme
    applyTerminalV4Theme();
    
    // Cleanup on unmount
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, []);
  
  return (
    <div className="min-h-screen p-8" style={{ background: 'var(--color-gray-950)' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className={cx(terminalV4.card('elevated'), 'p-6')}>
          <h1 className="text-2xl font-bold text-white mb-2">Terminal Theme v4</h1>
          <p className="text-gray-400">Tailwind CSS v4 Aligned Theme System</p>
        </div>
        
        {/* Buttons Section */}
        <div className={cx(terminalV4.card(), 'p-6')}>
          <h2 className="text-lg font-semibold text-white mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className={terminalV4.button('primary')}>
              Primary Action
            </button>
            <button className={terminalV4.button('secondary')}>
              Secondary
            </button>
            <button className="btn-success">
              Success
            </button>
            <button className="btn-danger">
              Danger
            </button>
            <button className="btn-warning">
              Warning
            </button>
          </div>
        </div>
        
        {/* Status Indicators */}
        <div className={cx(terminalV4.card(), 'p-6')}>
          <h2 className="text-lg font-semibold text-white mb-4">Status Indicators</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={terminalV4.status('online')} />
              <span className="text-sm text-gray-300">System Online</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={terminalV4.status('offline')} />
              <span className="text-sm text-gray-300">System Offline</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={terminalV4.status('error')} />
              <span className="text-sm text-gray-300">Error State</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={terminalV4.status('warning')} />
              <span className="text-sm text-gray-300">Warning</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={terminalV4.status('pending')} />
              <span className="text-sm text-gray-300">Processing...</span>
            </div>
          </div>
        </div>
        
        {/* Form Elements */}
        <div className={cx(terminalV4.card(), 'p-6')}>
          <h2 className="text-lg font-semibold text-white mb-4">Form Elements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Default Input
              </label>
              <input
                type="text"
                className={terminalV4.input()}
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Error State
              </label>
              <input
                type="text"
                className={terminalV4.input('error')}
                placeholder="Error input..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Success State
              </label>
              <input
                type="text"
                className={terminalV4.input('success')}
                placeholder="Success input..."
              />
            </div>
          </div>
        </div>
        
        {/* Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={cx(terminalV4.card(), 'p-6')}>
            <h3 className="text-sm font-bold text-white mb-2">Default Card</h3>
            <p className="text-xs text-gray-400">
              Standard card with basic styling and border.
            </p>
          </div>
          
          <div className={cx(terminalV4.card('elevated'), 'p-6')}>
            <h3 className="text-sm font-bold text-white mb-2">Elevated Card</h3>
            <p className="text-xs text-gray-400">
              Card with gradient background and enhanced shadow.
            </p>
          </div>
          
          <div className={cx(terminalV4.card('glass'), 'p-6')}>
            <h3 className="text-sm font-bold text-white mb-2">Glass Card</h3>
            <p className="text-xs text-gray-400">
              Glass morphism effect with backdrop blur.
            </p>
          </div>
        </div>
        
        {/* Table */}
        <div className={terminalV4.table.container()}>
          <table className="w-full">
            <thead>
              <tr>
                <th className={terminalV4.table.header()}>ID</th>
                <th className={terminalV4.table.header()}>Name</th>
                <th className={terminalV4.table.header()}>Status</th>
                <th className={terminalV4.table.header()}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className={terminalV4.table.row()}>
                <td className={terminalV4.table.cell()}>001</td>
                <td className={terminalV4.table.cell()}>System Core</td>
                <td className={terminalV4.table.cell()}>
                  <span className="text-success">Active</span>
                </td>
                <td className={terminalV4.table.cell()}>98.5%</td>
              </tr>
              <tr className={terminalV4.table.row()}>
                <td className={terminalV4.table.cell()}>002</td>
                <td className={terminalV4.table.cell()}>Database</td>
                <td className={terminalV4.table.cell()}>
                  <span className="text-warning">Warning</span>
                </td>
                <td className={terminalV4.table.cell()}>76.2%</td>
              </tr>
              <tr className={terminalV4.table.row()}>
                <td className={terminalV4.table.cell()}>003</td>
                <td className={terminalV4.table.cell()}>Cache Layer</td>
                <td className={terminalV4.table.cell()}>
                  <span className="text-error">Error</span>
                </td>
                <td className={terminalV4.table.cell()}>12.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Special Effects */}
        <div className={cx(terminalV4.card(), 'p-6')}>
          <h2 className="text-lg font-semibold text-white mb-4">Special Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={cx('p-4 border border-gray-800 rounded', terminalV4.effect('scanline'))}>
              <h3 className="text-sm font-bold text-cyan-400">Scanline Effect</h3>
              <p className="text-xs text-gray-400 mt-2">
                Retro CRT monitor scanline animation
              </p>
            </div>
            
            <div className={cx('p-4 border border-gray-800 rounded', terminalV4.effect('gridOverlay'))}>
              <h3 className="text-sm font-bold text-cyan-400">Grid Overlay</h3>
              <p className="text-xs text-gray-400 mt-2">
                Tactical grid background pattern
              </p>
            </div>
            
            <div className={cx('p-4 border border-gray-800 rounded', terminalV4.effect('glass'))}>
              <h3 className="text-sm font-bold text-cyan-400">Glass Effect</h3>
              <p className="text-xs text-gray-400 mt-2">
                Glassmorphism with backdrop blur
              </p>
            </div>
            
            <div className={cx('p-4 border border-cyan-500/50 rounded', terminalV4.effect('glowPrimary'))}>
              <h3 className="text-sm font-bold text-cyan-400">Glow Effect</h3>
              <p className="text-xs text-gray-400 mt-2">
                Neon glow shadow effect
              </p>
            </div>
          </div>
        </div>
        
        {/* Color Palette */}
        <div className={cx(terminalV4.card(), 'p-6')}>
          <h2 className="text-lg font-semibold text-white mb-4">Color System</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Semantic Colors</h3>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-primary rounded flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">PRIMARY</span>
                </div>
                <div className="w-16 h-16 bg-success rounded flex items-center justify-center">
                  <span className="text-[10px] text-black font-bold">SUCCESS</span>
                </div>
                <div className="w-16 h-16 bg-warning rounded flex items-center justify-center">
                  <span className="text-[10px] text-black font-bold">WARNING</span>
                </div>
                <div className="w-16 h-16 bg-error rounded flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">ERROR</span>
                </div>
                <div className="w-16 h-16 bg-info rounded flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">INFO</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Grayscale Palette</h3>
              <div className="flex gap-1">
                {[950, 900, 850, 800, 700, 600, 500, 400, 300, 200, 100, 50].map(shade => (
                  <div
                    key={shade}
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: `var(--color-gray-${shade})` }}
                    title={`Gray ${shade}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS Variables Info */}
        <div className={cx(terminalV4.card('glass'), 'p-6')}>
          <h2 className="text-lg font-semibold text-white mb-4">Tailwind v4 Features Used</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>@theme directive:</strong> CSS-first theme configuration</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>CSS Layers:</strong> Proper cascade control with @layer</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>@property:</strong> Smooth color transitions</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>color-mix():</strong> Dynamic color variations</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>CSS Variables:</strong> Runtime theme switching</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              <span><strong>Namespace conventions:</strong> --color-*, --font-*, --spacing-*</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}