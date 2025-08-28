// Cyberpunk theme - Neon-soaked future aesthetic
// High contrast with vibrant accent colors and tech-noir vibes

import type { Theme } from './terminal-theme'

export const cyberpunkTheme: Theme = {
  name: 'Cyberpunk',
  description: 'Neon-soaked future aesthetic with high contrast and vibrant accents',
  
  colors: {
    gray: {
      0: '#ffffff',
      50: '#f0f0ff',
      100: '#e0e0ff',
      200: '#c0c0e0',
      300: '#a0a0c0',
      400: '#8080a0',
      500: '#606080',
      600: '#404060',
      700: '#303050',
      800: '#202040',
      850: '#181830',
      900: '#101020',
      925: '#0c0c18',
      950: '#080810',
      1000: '#000000',
    },
    
    accent: {
      primary: '#ff00ff', // Magenta
      primaryDim: '#cc00cc',
      
      success: '#00ff88', // Mint green
      successDim: '#00cc66',
      
      warning: '#ffaa00', // Orange
      warningDim: '#cc8800',
      
      error: '#ff0055', // Hot pink
      errorDim: '#cc0044',
      
      info: '#00ffff', // Cyan
      infoDim: '#00cccc',
    }
  },

  typography: {
    h1: 'text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 tracking-tight',
    h2: 'text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight',
    h3: 'text-lg font-semibold text-cyan-300',
    h4: 'text-base font-semibold text-purple-300',
    
    sectionTitle: 'font-mono text-xs uppercase tracking-[0.3em] text-pink-400 drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]',
    subsectionTitle: 'font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400',
    
    uiTitle: 'font-sans text-sm font-bold text-cyan-300 tracking-wide',
    uiSubtitle: 'font-sans text-xs font-medium text-purple-400',
    uiSectionHeader: 'font-sans text-xs font-bold text-pink-400 tracking-wider uppercase',
    uiLabel: 'font-sans text-[11px] font-semibold text-cyan-500',
    
    body: 'text-sm text-gray-300 font-normal',
    bodyMono: 'font-mono text-sm text-cyan-200',
    bodySmall: 'text-xs text-gray-400',
    bodySmallMono: 'font-mono text-xs text-purple-300',
    
    label: 'font-mono text-xs uppercase tracking-[0.3em] text-pink-400',
    labelRequired: 'font-mono text-xs uppercase tracking-[0.3em] text-pink-400 after:content-["*"] after:ml-0.5 after:text-cyan-400',
    
    code: 'font-mono text-sm text-cyan-300 bg-purple-900/30 px-1.5 py-0.5 rounded border border-cyan-500/30',
    codeBlock: 'font-mono text-sm text-cyan-300 bg-purple-950/50 border border-pink-500/30 rounded-sm p-4',
  },

  components: {
    input: {
      default: 'w-full bg-purple-950/30 border-2 border-cyan-500/50 text-cyan-100 font-mono text-sm rounded px-3 py-2 placeholder-purple-400 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] focus:outline-none transition-all',
      
      active: 'w-full bg-purple-950/50 border-2 border-cyan-400 text-cyan-100 font-mono text-sm rounded px-3 py-2 placeholder-purple-400 focus:border-pink-400 focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all',
      
      error: 'w-full bg-red-950/30 border-2 border-red-400 text-red-100 font-mono text-sm rounded px-3 py-2 placeholder-red-600 focus:border-red-300 focus:shadow-[0_0_20px_rgba(255,0,85,0.3)] focus:outline-none transition-all',
      
      minimal: 'w-full bg-transparent border-b-2 border-cyan-500/50 text-cyan-100 font-mono text-sm px-1 py-2 placeholder-purple-400 focus:border-pink-400 focus:shadow-[0_2px_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all',
    },
    
    textarea: {
      default: 'w-full bg-purple-950/30 border-2 border-cyan-500/50 text-cyan-100 font-mono text-sm rounded px-3 py-2 placeholder-purple-400 resize-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] focus:outline-none transition-all',
      
      code: 'w-full bg-black/80 border-2 border-pink-500/50 text-cyan-300 font-mono text-sm rounded px-3 py-2 placeholder-purple-400 resize-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all',
    },
    
    button: {
      primary: 'relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] hover:from-cyan-400 hover:to-pink-400 active:from-cyan-600 active:to-pink-600 transition-all duration-150 transform hover:scale-105 active:scale-95',
      
      secondary: 'relative inline-flex items-center justify-center px-6 py-2.5 bg-transparent border-2 border-purple-400 text-purple-300 font-bold text-xs uppercase tracking-wider rounded hover:bg-purple-400/20 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] active:bg-purple-500/30 transition-all duration-150',
      
      ghost: 'relative inline-flex items-center justify-center px-6 py-2.5 text-cyan-400 font-bold text-xs uppercase tracking-wider rounded hover:text-pink-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] active:bg-pink-400/20 transition-all duration-150',
      
      danger: 'relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_20px_rgba(255,0,85,0.5)] hover:shadow-[0_0_30px_rgba(255,0,85,0.7)] hover:from-red-500 hover:to-pink-500 active:from-red-700 active:to-pink-700 transition-all duration-150 transform hover:scale-105 active:scale-95',
      
      success: 'relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] hover:from-green-400 hover:to-cyan-400 active:from-green-600 active:to-cyan-600 transition-all duration-150 transform hover:scale-105 active:scale-95',
      
      icon: 'relative inline-flex items-center justify-center p-2 bg-purple-900/50 border-2 border-cyan-500/50 text-cyan-400 rounded hover:bg-purple-800/50 hover:border-pink-400 hover:text-pink-400 hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] active:bg-purple-700/50 transition-all duration-150',
      
      warning: 'relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_20px_rgba(255,170,0,0.5)] hover:shadow-[0_0_30px_rgba(255,170,0,0.7)] hover:from-orange-400 hover:to-yellow-400 active:from-orange-600 active:to-yellow-600 transition-all duration-150 transform hover:scale-105 active:scale-95',
    },
    
    card: {
      default: 'bg-purple-950/40 border-2 border-cyan-500/30 rounded shadow-[0_0_20px_rgba(138,43,226,0.2)]',
      elevated: 'bg-black/80 border-2 border-pink-500/40 rounded shadow-[0_0_30px_rgba(255,0,255,0.3)]',
      glass: 'bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-2 border-white/10 rounded',
      active: 'bg-purple-900/60 border-2 border-cyan-400 rounded shadow-[0_0_25px_rgba(0,255,255,0.4)]',
    },
    
    badge: {
      default: 'inline-flex items-center px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded',
      neutral: 'bg-purple-900/50 text-purple-300 border border-purple-500/50',
      primary: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,255,255,0.3)]',
      success: 'bg-green-500/20 text-green-300 border border-green-400/50 shadow-[0_0_10px_rgba(0,255,136,0.3)]',
      warning: 'bg-orange-500/20 text-orange-300 border border-orange-400/50 shadow-[0_0_10px_rgba(255,170,0,0.3)]',
      error: 'bg-red-500/20 text-red-300 border border-red-400/50 shadow-[0_0_10px_rgba(255,0,85,0.3)]',
    },
    
    table: {
      header: 'font-mono text-[10px] uppercase tracking-wider text-cyan-400 bg-purple-950/50 border-b-2 border-cyan-500/30',
      row: 'border-b border-purple-800/30 hover:bg-purple-900/30 transition-colors',
      cell: 'font-mono text-xs text-cyan-200 px-3 py-2',
    },
    
    status: {
      online: 'w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(0,255,136,0.8)] animate-pulse',
      offline: 'w-2 h-2 rounded-full bg-gray-600',
      error: 'w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(255,0,85,0.8)] animate-pulse',
      warning: 'w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(255,170,0,0.8)]',
    }
  },
  
  layout: {
    container: 'bg-gradient-to-br from-purple-950 via-black to-cyan-950 text-cyan-100',
    panel: 'bg-purple-950/40 border-2 border-cyan-500/30 rounded backdrop-blur-sm',
    sidebar: 'bg-black/80 border-r-2 border-pink-500/30',
    
    section: 'border-b-2 border-purple-800/50 pb-6 mb-6',
    divider: 'border-t-2 border-cyan-500/30',
  },
  
  effects: {
    glowPrimary: 'drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] hover:drop-shadow-[0_0_30px_rgba(0,255,255,1)]',
    glowSuccess: 'drop-shadow-[0_0_20px_rgba(0,255,136,0.8)] hover:drop-shadow-[0_0_30px_rgba(0,255,136,1)]',
    glowError: 'drop-shadow-[0_0_20px_rgba(255,0,85,0.8)] hover:drop-shadow-[0_0_30px_rgba(255,0,85,1)]',
    glowWarning: 'drop-shadow-[0_0_20px_rgba(255,170,0,0.8)] hover:drop-shadow-[0_0_30px_rgba(255,170,0,1)]',
    
    scanline: 'relative after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-cyan-400/10 after:to-transparent after:animate-scan',
    
    grid: 'bg-[linear-gradient(rgba(0,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,.1)_1px,transparent_1px)] bg-[size:30px_30px]',
  }
} as const

