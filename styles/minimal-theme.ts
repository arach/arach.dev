// Minimal theme - Clean, modern, almost invisible
// Focus on content with subtle boundaries

export const minimalTheme = {
  name: 'Minimal',
  description: 'Clean and modern with almost invisible UI elements',
  
  colors: {
    gray: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      850: '#1f1f23',
      900: '#18181b',
      925: '#121215',
      950: '#09090b',
      1000: '#000000',
    },
    
    accent: {
      primary: '#3b82f6', // Blue
      primaryDim: '#2563eb',
      
      success: '#22c55e', // Green
      successDim: '#16a34a',
      
      warning: '#eab308', // Yellow
      warningDim: '#ca8a04',
      
      error: '#ef4444', // Red
      errorDim: '#dc2626',
      
      info: '#6366f1', // Indigo
      infoDim: '#4f46e5',
    }
  },

  typography: {
    h1: 'text-3xl font-light text-gray-900 dark:text-gray-100',
    h2: 'text-2xl font-light text-gray-800 dark:text-gray-200',
    h3: 'text-xl font-normal text-gray-700 dark:text-gray-300',
    h4: 'text-lg font-normal text-gray-600 dark:text-gray-400',
    
    sectionTitle: 'text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide',
    subsectionTitle: 'text-xs font-normal text-gray-400 dark:text-gray-600',
    
    uiTitle: 'text-sm font-medium text-gray-700 dark:text-gray-300',
    uiSubtitle: 'text-xs font-normal text-gray-500 dark:text-gray-500',
    uiSectionHeader: 'text-xs font-medium text-gray-400 dark:text-gray-600 uppercase tracking-wide',
    uiLabel: 'text-xs font-medium text-gray-600 dark:text-gray-400',
    
    body: 'text-sm text-gray-600 dark:text-gray-400 leading-relaxed',
    bodyMono: 'font-mono text-sm text-gray-600 dark:text-gray-400',
    bodySmall: 'text-xs text-gray-500 dark:text-gray-500',
    bodySmallMono: 'font-mono text-xs text-gray-500 dark:text-gray-500',
    
    label: 'text-xs font-medium text-gray-700 dark:text-gray-300',
    labelRequired: 'text-xs font-medium text-gray-700 dark:text-gray-300 after:content-["*"] after:ml-0.5 after:text-red-500',
    
    code: 'font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded',
    codeBlock: 'font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded p-4',
  },

  components: {
    input: {
      default: 'w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors',
      
      active: 'w-full bg-white dark:bg-gray-900 border border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100 text-sm rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-600 focus:border-blue-600 dark:focus:border-blue-300 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors',
      
      error: 'w-full bg-white dark:bg-gray-900 border border-red-500 dark:border-red-400 text-gray-900 dark:text-gray-100 text-sm rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-600 focus:border-red-600 dark:focus:border-red-300 focus:ring-1 focus:ring-red-500 dark:focus:ring-red-400 focus:outline-none transition-colors',
      
      minimal: 'w-full bg-transparent border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm px-0 py-2 placeholder-gray-400 dark:placeholder-gray-600 focus:border-gray-900 dark:focus:border-gray-100 focus:outline-none transition-colors',
    },
    
    textarea: {
      default: 'w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-600 resize-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors',
      
      code: 'w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-600 resize-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors',
    },
    
    button: {
      primary: 'inline-flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-100 active:bg-gray-700 dark:active:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      
      secondary: 'inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      
      ghost: 'inline-flex items-center justify-center px-4 py-2 text-gray-600 dark:text-gray-400 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      
      danger: 'inline-flex items-center justify-center px-4 py-2 bg-red-600 dark:bg-red-500 text-white text-sm font-medium rounded hover:bg-red-700 dark:hover:bg-red-600 active:bg-red-800 dark:active:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      
      success: 'inline-flex items-center justify-center px-4 py-2 bg-green-600 dark:bg-green-500 text-white text-sm font-medium rounded hover:bg-green-700 dark:hover:bg-green-600 active:bg-green-800 dark:active:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      
      icon: 'inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 active:bg-gray-200 dark:active:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      
      warning: 'inline-flex items-center justify-center px-4 py-2 bg-yellow-600 dark:bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-700 dark:hover:bg-yellow-600 active:bg-yellow-800 dark:active:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    },
    
    card: {
      default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg',
      elevated: 'bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-2xl',
      glass: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur border border-gray-200/50 dark:border-gray-800/50 rounded-lg',
      active: 'bg-white dark:bg-gray-900 border-2 border-blue-500 dark:border-blue-400 rounded-lg',
    },
    
    badge: {
      default: 'inline-flex items-center px-2 py-1 text-xs font-medium rounded',
      neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      primary: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      success: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
      error: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    },
    
    table: {
      header: 'text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800',
      row: 'border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors',
      cell: 'text-sm text-gray-900 dark:text-gray-100 px-4 py-3',
    },
    
    status: {
      online: 'w-2 h-2 rounded-full bg-green-500',
      offline: 'w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700',
      error: 'w-2 h-2 rounded-full bg-red-500',
      warning: 'w-2 h-2 rounded-full bg-yellow-500',
    }
  },
  
  layout: {
    container: 'bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100',
    panel: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg',
    sidebar: 'bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800',
    
    section: 'border-b border-gray-200 dark:border-gray-800 pb-6 mb-6',
    divider: 'border-t border-gray-200 dark:border-gray-800',
  },
  
  effects: {
    glowPrimary: '',
    glowSuccess: '',
    glowError: '',
    glowWarning: '',
    
    scanline: '',
    
    grid: '',
  },
  
  // Animations
  animations: {
    fadeIn: 'animate-[fadeIn_0.3s_ease-in]',
    slideIn: 'animate-[slideIn_0.3s_ease-out]',
    pulse: 'animate-pulse',
    ping: 'animate-ping',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },
  
  // Utilities
  utilities: {
    selection: 'selection:bg-blue-100 selection:text-blue-900',
    scrollbar: 'scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500',
    focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  }
} as const

