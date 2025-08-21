'use client';

import { useState, useEffect } from 'react';
import { Bug, Database, Activity, X, ChevronRight, ChevronDown, RefreshCw, Trash2, Copy, Check, Maximize2, Minimize2, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { backgroundThemes as defaultThemes, type BackgroundTheme } from '@/components/InteractiveBackground';
import { useTheme, themes as siteThemes } from '@/lib/theme-context';
import './debug-animations.css';

interface CacheStats {
  hits: number;
  misses: number;
  totalEntries: number;
  hitRate: string;
  lastAccess?: string;
  totalSize?: string;
  pathCache?: {
    totalPaths: number;
    uniqueViewports: number;
    avgPathLength: number;
    totalPathSize: string;
  };
}

interface CacheEntry {
  key: string;
  value: any;
  expiry: string;
  createdAt: string;
  size?: number;
}

interface DebugToolbarProps {
  currentTheme?: BackgroundTheme;
  onThemeChange?: (theme: BackgroundTheme) => void;
  backgroundThemes?: BackgroundTheme[];
}

export function DebugToolbar({ 
  currentTheme, 
  onThemeChange, 
  backgroundThemes = defaultThemes 
}: DebugToolbarProps) {
  const bgThemes = backgroundThemes.length > 0 ? backgroundThemes : defaultThemes;
  const { currentTheme: siteTheme, setTheme: setSiteTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'entries' | 'background' | 'theme'>('stats');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<CacheEntry | null>(null);
  const [showEntryDetails, setShowEntryDetails] = useState(false);
  const [themeChangeMessage, setThemeChangeMessage] = useState<string | null>(null);

  // Fetch cache statistics
  const fetchCacheStats = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/debug/cache-stats');
      if (response.ok) {
        const data = await response.json();
        setCacheStats(data.stats);
        setCacheEntries(data.entries || []);
      }
    } catch (error) {
      console.error('Failed to fetch cache stats:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Clear cache
  const clearCache = async () => {
    try {
      const response = await fetch('/api/debug/cache-clear', { method: 'POST' });
      if (response.ok) {
        await fetchCacheStats();
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  // Copy cache stats to clipboard
  const copyCacheStats = async () => {
    if (!cacheStats) return;
    const statsText = JSON.stringify(cacheStats, null, 2);
    await navigator.clipboard.writeText(statsText);
    setCopiedAction('stats');
    setTimeout(() => setCopiedAction(null), 2000);
  };

  // Handle cache entry click
  const handleEntryClick = (entry: CacheEntry) => {
    setSelectedEntry(entry);
    setShowEntryDetails(true);
  };

  // Copy cache entry to clipboard
  const copyCacheEntry = async () => {
    if (!selectedEntry) return;
    const entryText = JSON.stringify(selectedEntry.value, null, 2);
    await navigator.clipboard.writeText(entryText);
    setCopiedAction('entry');
    setTimeout(() => setCopiedAction(null), 2000);
  };

  useEffect(() => {
    if (!isCollapsed) {
      fetchCacheStats();
      // No auto-refresh - manual refresh only via button
    }
  }, [isCollapsed]);


  // Only show in development
  // if (process.env.NODE_ENV !== 'development') {
  //   return null;
  // }

  return (
    <>
      {/* Bug button - always visible */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsCollapsed(!isCollapsed);
        }}
        className={`fixed bottom-4 right-4 w-10 h-10 rounded-full
                   bg-gray-900 dark:bg-black
                   border border-gray-700 dark:border-gray-800
                   shadow-lg shadow-black/50
                   flex items-center justify-center
                   text-white hover:text-white
                   hover:bg-gray-800
                   transition-colors duration-150
                   z-[9999]
                   ${isRefreshing ? 'debug-button-loading' : ''}`}
        title={isCollapsed ? "Show debug toolbar" : "Hide debug toolbar"}
      >
        <Bug className={`w-5 h-5 ${
          isRefreshing ? '' : `transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`
        }`} />
      </button>

      {/* Debug panel - only visible when not collapsed */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed bottom-16 right-4 rounded-xl text-xs font-sans z-[9998] 
                       bg-gray-900/95 dark:bg-black/95 
                       backdrop-blur-sm
                       border border-gray-700/50 dark:border-gray-800
                       transition-all duration-700
                       max-h-[80vh] overflow-hidden
                       pointer-events-auto
                       ${isExpanded 
                         ? 'w-[90vw] sm:w-[640px] max-w-[640px] shadow-[0_20px_50px_rgba(0,0,0,0.7)]' 
                         : 'w-[90vw] sm:w-[480px] max-w-[480px] shadow-2xl shadow-black/50'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-700/50">
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4 text-gray-400" />
                <h3 className="font-semibold text-white">Debug Toolbar</h3>
              </div>
              <div className="flex items-center gap-2">
                {/* Copy Stats Button */}
                <button
                  onClick={copyCacheStats}
                  className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                  title="Copy cache stats"
                >
                  {copiedAction === 'stats' ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                
                {/* Expand/Collapse Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 max-h-[calc(80vh-60px)] overflow-y-auto">
              {/* Tab Navigation */}
              <div className="flex gap-1 mb-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('stats');
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                            flex items-center justify-center gap-2
                            ${activeTab === 'stats' 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800'}`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Statistics</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('entries');
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                            flex items-center justify-center gap-2
                            ${activeTab === 'entries' 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800'}`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Cache Entries</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('background');
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                            flex items-center justify-center gap-2
                            ${activeTab === 'background' 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800'}`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Background</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('theme');
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                            flex items-center justify-center gap-2
                            ${activeTab === 'theme' 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800'}`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Theme</span>
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'stats' && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Cache Statistics Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`p-3 rounded-lg border transition-all duration-200 ${
                        cacheStats && parseFloat(cacheStats.hitRate) > 50
                          ? 'bg-green-500/20 border-green-500/30' 
                          : 'bg-yellow-500/20 border-yellow-500/30'
                      }`}>
                        <div className="font-medium text-xs text-gray-300">Hit Rate</div>
                        <div className={`text-sm font-semibold mt-1 ${
                          cacheStats && parseFloat(cacheStats.hitRate) > 50 ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {cacheStats?.hitRate || '0%'}
                        </div>
                        <div className="text-[10px] mt-1 text-gray-400">
                          {cacheStats?.hits || 0} hits / {cacheStats?.misses || 0} misses
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-blue-500/20 border-blue-500/30">
                        <div className="font-medium text-xs text-gray-300">Total Entries</div>
                        <div className="text-sm font-semibold mt-1 text-blue-400">
                          {cacheStats?.totalEntries || 0}
                        </div>
                        <div className="text-[10px] mt-1 text-gray-400">
                          {cacheStats?.totalSize || '0 B'}
                        </div>
                      </div>
                    </div>

                    {/* Path Cache Statistics */}
                    {cacheStats?.pathCache && (
                      <div className="p-3 rounded-lg border bg-purple-500/20 border-purple-500/30">
                        <div className="font-medium text-xs text-gray-300 mb-2">Path Cache</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-gray-400">Paths:</span>
                            <span className="text-purple-400 ml-1 font-semibold">{cacheStats.pathCache.totalPaths}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Viewports:</span>
                            <span className="text-purple-400 ml-1 font-semibold">{cacheStats.pathCache.uniqueViewports}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Avg Length:</span>
                            <span className="text-purple-400 ml-1 font-semibold">{cacheStats.pathCache.avgPathLength} pts</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Size:</span>
                            <span className="text-purple-400 ml-1 font-semibold">{cacheStats.pathCache.totalPathSize}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Last Access Time */}
                    {cacheStats?.lastAccess && (
                      <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Last Access</span>
                          <span className="text-xs font-mono text-gray-300">
                            {new Date(cacheStats.lastAccess).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={fetchCacheStats}
                        disabled={isRefreshing}
                        className="flex-1 px-3 py-2.5 rounded-lg text-xs font-medium
                                 bg-blue-500/20 hover:bg-blue-500/30 
                                 text-blue-400
                                 border border-blue-500/30 hover:border-blue-500/40
                                 transition-all duration-200
                                 flex items-center justify-center gap-2
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>
                      <button
                        onClick={clearCache}
                        className="flex-1 px-3 py-2.5 rounded-lg text-xs font-medium
                                 bg-red-500/20 hover:bg-red-500/30 
                                 text-red-400
                                 border border-red-500/30 hover:border-red-500/40
                                 transition-all duration-200
                                 flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear Cache</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'background' && (
                  <motion.div
                    key="background"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Success Message */}
                    <AnimatePresence>
                      {themeChangeMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-xs text-center"
                        >
                          ✓ {themeChangeMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Current Background Theme */}
                    <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                      <div className="text-xs text-gray-400 mb-2">Active Background Animation</div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="inline-block w-4 h-4 rounded-full border border-gray-600"
                          style={{ backgroundColor: currentTheme?.dotColor }}
                        />
                        <span className="text-sm font-medium text-white">
                          {currentTheme?.name || 'Default'}
                        </span>
                      </div>
                    </div>

                    {/* Background Theme Selection */}
                    <div className="grid grid-cols-2 gap-2">
                      {bgThemes.map((theme) => (
                        <button
                          key={theme.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onThemeChange) {
                              onThemeChange(theme);
                              setThemeChangeMessage(`Background changed to ${theme.name}`);
                              setTimeout(() => setThemeChangeMessage(null), 2000);
                            }
                          }}
                          className={`p-3 rounded-lg border transition-all duration-200
                                    ${theme.name === currentTheme?.name
                                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
                                      : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-800 hover:border-gray-600'}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <span 
                                className="inline-block w-3 h-3 rounded-full"
                                style={{ backgroundColor: theme.dotColor }}
                              />
                              <span 
                                className="inline-block w-3 h-3 rounded-full"
                                style={{ backgroundColor: theme.lineColor }}
                              />
                            </div>
                            <span className="text-xs font-medium">{theme.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Grid Debug Controls */}
                    <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <div className="text-xs text-gray-300 mb-2">Grid Visualization</div>
                      <div className="text-[10px] text-gray-400 mb-3">
                        Toggle debug mode to see grid system, hotspots, and path indicators
                      </div>
                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined' && (window as any).__toggleDebug) {
                            (window as any).__toggleDebug();
                            setThemeChangeMessage('Grid debug visualization toggled');
                            setTimeout(() => setThemeChangeMessage(null), 2000);
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg text-xs font-medium
                                 bg-cyan-500/20 hover:bg-cyan-500/30 
                                 text-cyan-400
                                 border border-cyan-500/30 hover:border-cyan-500/40
                                 transition-all duration-200
                                 flex items-center justify-center gap-2"
                      >
                        <Bug className="w-3.5 h-3.5" />
                        <span>Toggle Grid Debug (Ctrl+Shift+D)</span>
                      </button>
                    </div>

                    {/* Path Cache Controls */}
                    <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                      <div className="text-xs text-gray-300 mb-2">Path Cache Management</div>
                      <div className="text-[10px] text-gray-400 mb-3">
                        Regenerate paths to update animations for current viewport
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).__storePaths) {
                              (window as any).__storePaths();
                              setThemeChangeMessage('Storing current paths to database...');
                              setTimeout(() => setThemeChangeMessage(null), 3000);
                            }
                          }}
                          className="flex-1 px-3 py-2 rounded-lg text-xs font-medium
                                   bg-green-500/20 hover:bg-green-500/30 
                                   text-green-400
                                   border border-green-500/30 hover:border-green-500/40
                                   transition-all duration-200
                                   flex items-center justify-center gap-2"
                        >
                          <Database className="w-3.5 h-3.5" />
                          <span>Store to DB</span>
                        </button>
                        <button
                          onClick={async () => {
                            setIsRefreshing(true);
                            try {
                              // Clear path cache
                              const response = await fetch('/api/paths/clear', { 
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  viewport: { 
                                    width: window.innerWidth, 
                                    height: window.innerHeight 
                                  }
                                })
                              });
                              if (response.ok) {
                                // Force reload of the page to regenerate paths
                                window.location.reload();
                              }
                            } catch (error) {
                              console.error('Failed to regenerate paths:', error);
                            } finally {
                              setIsRefreshing(false);
                            }
                          }}
                          disabled={isRefreshing}
                          className="flex-1 px-3 py-2 rounded-lg text-xs font-medium
                                   bg-purple-500/20 hover:bg-purple-500/30 
                                   text-purple-400
                                   border border-purple-500/30 hover:border-purple-500/40
                                   transition-all duration-200
                                   flex items-center justify-center gap-2
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                          <span>Regenerate</span>
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch('/api/paths/clear', { 
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({})
                              });
                              if (response.ok) {
                                window.location.reload();
                              }
                            } catch (error) {
                              console.error('Failed to clear all paths:', error);
                            }
                          }}
                          className="px-3 py-2 rounded-lg text-xs font-medium
                                   bg-red-500/20 hover:bg-red-500/30 
                                   text-red-400
                                   border border-red-500/30 hover:border-red-500/40
                                   transition-all duration-200
                                   flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear All</span>
                        </button>
                      </div>
                    </div>

                    {/* Background Details */}
                    <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700/30">
                      <div className="text-xs text-gray-400 mb-2">Background Configuration</div>
                      <div className="space-y-1.5 text-[10px] font-mono">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Dot Color:</span>
                          <span className="text-gray-300">{currentTheme?.dotColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Line Color:</span>
                          <span className="text-gray-300">{currentTheme?.lineColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Target Color:</span>
                          <span className="text-gray-300">{currentTheme?.targetColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Dot Opacity:</span>
                          <span className="text-gray-300">{currentTheme?.dotOpacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Line Opacity:</span>
                          <span className="text-gray-300">{currentTheme?.lineOpacity}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'theme' && (
                  <motion.div
                    key="theme"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Success Message */}
                    <AnimatePresence>
                      {themeChangeMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-xs text-center"
                        >
                          ✓ {themeChangeMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Site Theme Selection */}
                    <div className="p-3 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                      <div className="text-xs text-gray-300 mb-2">Site Theme</div>
                      <div className="text-[10px] text-gray-400 mb-3">
                        Changes background, text colors, and header styling only
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {siteThemes.map((theme) => (
                          <button
                            key={theme.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSiteTheme(theme);
                              setThemeChangeMessage(`Site theme changed to ${theme.displayName}`);
                              setTimeout(() => setThemeChangeMessage(null), 2000);
                            }}
                            className={`p-2 rounded-lg border transition-all duration-200 text-xs
                                      ${theme.name === siteTheme.name
                                        ? 'bg-indigo-500/30 border-indigo-500/40 text-indigo-400' 
                                        : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-800 hover:border-gray-600'}`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex gap-0.5">
                                <span 
                                  className="inline-block w-2 h-2 rounded-sm border border-gray-600"
                                  style={{ backgroundColor: theme.bgColor }}
                                />
                                <span 
                                  className="inline-block w-2 h-2 rounded-sm border border-gray-600"
                                  style={{ backgroundColor: theme.headerBg }}
                                />
                              </div>
                              <span className="text-[10px] font-medium">{theme.displayName}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Current Theme Details */}
                    <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                      <div className="text-xs text-gray-400 mb-2">Current Theme Settings</div>
                      <div className="space-y-1.5 text-[10px] font-mono">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Background:</span>
                          <span className="text-gray-300">{siteTheme.bgColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Text Color:</span>
                          <span className="text-gray-300">{siteTheme.textColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Header BG:</span>
                          <span className="text-gray-300">{siteTheme.headerBg}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Header Text:</span>
                          <span className="text-gray-300">{siteTheme.headerText}</span>
                        </div>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <div className="text-xs text-yellow-400 mb-1">ℹ️ Theme System</div>
                      <div className="text-[10px] text-gray-400 leading-relaxed">
                        The theme system only modifies specific elements: background color, main text color, 
                        and header appearance. UI components, tooltips, and overlays maintain their default 
                        styling to ensure readability.
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'entries' && (
                  <motion.div
                    key="entries"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className={`rounded-lg bg-gray-800/50 border border-gray-700/50 p-3 
                                    ${isExpanded ? 'max-h-96' : 'max-h-64'} overflow-y-auto`}>
                      {cacheEntries.length > 0 ? (
                        <div className="space-y-2">
                          {cacheEntries.map((entry, index) => (
                            <button
                              key={index} 
                              onClick={() => handleEntryClick(entry)}
                              className="w-full p-2.5 rounded-lg bg-gray-900/50 border border-gray-700/30
                                       hover:bg-gray-900/70 hover:border-gray-600/40
                                       transition-all duration-200 text-left
                                       cursor-pointer group">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-mono text-blue-400 truncate flex-1 group-hover:text-blue-300">
                                  {entry.key}
                                </span>
                                <span className="text-[10px] text-gray-500 ml-2">
                                  {Math.round((new Date(entry.expiry).getTime() - Date.now()) / 1000)}s TTL
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-gray-500">
                                <span>
                                  Created: {new Date(entry.createdAt).toLocaleTimeString()}
                                </span>
                                <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                  Click to view →
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No cache entries</p>
                          <p className="text-xs mt-1 opacity-75">Cache will populate as you browse</p>
                        </div>
                      )}
                    </div>

                    {/* Refresh Button for Entries */}
                    <button
                      onClick={fetchCacheStats}
                      disabled={isRefreshing}
                      className="w-full px-3 py-2.5 rounded-lg text-xs font-medium
                               bg-gray-800/50 hover:bg-gray-800 
                               text-gray-400 hover:text-gray-300
                               border border-gray-700/50 hover:border-gray-600/50
                               transition-all duration-200
                               flex items-center justify-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span>Refresh Entries</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cache Entry Details Modal */}
      <AnimatePresence>
        {showEntryDetails && selectedEntry && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEntryDetails(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         w-[90vw] max-w-4xl max-h-[80vh] 
                         bg-gray-900 border border-gray-700 rounded-xl shadow-2xl
                         overflow-hidden z-[9999]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-400" />
                  <div>
                    <h3 className="font-semibold text-white">Cache Entry Details</h3>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedEntry.key}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCacheEntry}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                    title="Copy JSON"
                  >
                    {copiedAction === 'entry' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowEntryDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
                {/* Metadata */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                    <div className="text-xs text-gray-400 mb-1">Created</div>
                    <div className="text-sm text-white font-mono">
                      {new Date(selectedEntry.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                    <div className="text-xs text-gray-400 mb-1">Expires</div>
                    <div className="text-sm text-white font-mono">
                      {new Date(selectedEntry.expiry).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                    <div className="text-xs text-gray-400 mb-1">TTL Remaining</div>
                    <div className="text-sm text-white font-mono">
                      {Math.round((new Date(selectedEntry.expiry).getTime() - Date.now()) / 1000)}s
                    </div>
                  </div>
                </div>

                {/* JSON Data */}
                <div className="rounded-lg bg-gray-950 border border-gray-700/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-300">Cached Data</h4>
                    {selectedEntry.size && (
                      <span className="text-xs text-gray-500">
                        Size: {selectedEntry.size.toLocaleString()} bytes
                      </span>
                    )}
                  </div>
                  <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                    <code>{JSON.stringify(selectedEntry.value, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}