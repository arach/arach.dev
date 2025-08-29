// Retro Theme - 80s inspired with warm CRT glow
export const retroTheme = {
  name: 'Retro',
  description: '80s CRT monitor aesthetic with amber and green phosphor glow',
  
  colors: {
    gray: {
      0: '#fff8dc',  // Cream
      50: '#faf0e6',  // Linen
      100: '#f5deb3', // Wheat
      200: '#daa520', // Goldenrod
      300: '#cd853f', // Peru
      400: '#a0522d', // Sienna
      500: '#8b4513', // Saddle Brown
      600: '#654321', // Dark Brown
      700: '#3e2723', // Deep Brown
      800: '#2e1a1a', // Very Dark Brown
      850: '#1a0f0f', // Near Black Brown
      900: '#0f0a0a', // Almost Black
      925: '#0a0505', // Very Near Black
      950: '#050202', // Basically Black
      1000: '#000000', // Pure Black
    },
    accent: {
      primary: '#ffb000',    // Amber
      primaryDim: '#ff8c00', // Dark Orange
      
      success: '#00ff00',   // Lime Green
      successDim: '#00cc00', // Dark Green
      
      warning: '#ffd700',    // Gold
      warningDim: '#daa520', // Goldenrod
      
      error: '#ff1493',      // Deep Pink
      errorDim: '#c71585',   // Medium Violet Red
      
      info: '#00ffff',       // Cyan (like old CRT text)
      infoDim: '#00ced1',    // Dark Turquoise
    }
  },
  
  typography: {
    h1: 'text-2xl font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(255,176,0,0.8)] tracking-wider font-mono',
    h2: 'text-xl font-bold text-amber-500 drop-shadow-[0_0_8px_rgba(255,176,0,0.6)] tracking-wide font-mono',
    h3: 'text-lg font-semibold text-amber-600 drop-shadow-[0_0_6px_rgba(255,176,0,0.4)] font-mono',
    h4: 'text-base font-semibold text-amber-700 font-mono',
    
    sectionTitle: 'font-mono text-xs uppercase tracking-[0.3em] text-lime-400 drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]',
    body: 'text-sm text-amber-200 font-mono leading-relaxed',
    bodyMono: 'font-mono text-sm text-green-400 drop-shadow-[0_0_2px_rgba(0,255,0,0.3)]',
    code: 'font-mono text-sm text-lime-300 bg-black/80 px-2 py-1 rounded border border-green-900 drop-shadow-[0_0_3px_rgba(0,255,0,0.4)]',
  },
  
  components: {
    button: {
      primary: 'inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-b from-amber-600 to-amber-800 text-black font-mono font-bold text-xs uppercase tracking-wider rounded border-2 border-amber-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0_20px_rgba(255,176,0,0.5)] hover:from-amber-500 hover:to-amber-700 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_30px_rgba(255,176,0,0.7)] active:from-amber-700 active:to-amber-900 transition-all duration-150',
      
      secondary: 'inline-flex items-center justify-center px-6 py-2.5 bg-black border-2 border-green-500 text-green-400 font-mono font-bold text-xs uppercase tracking-wider rounded shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:bg-green-950 hover:text-green-300 hover:shadow-[0_0_25px_rgba(0,255,0,0.5)] active:bg-green-900 transition-all duration-150',
    },
    
    input: {
      default: 'w-full bg-black/90 border-2 border-amber-700 text-amber-300 font-mono text-sm rounded px-3 py-2 placeholder-amber-800 focus:border-amber-500 focus:shadow-[0_0_15px_rgba(255,176,0,0.4)] focus:outline-none transition-all caret-amber-400',
    },
    
    card: {
      default: 'bg-gradient-to-br from-black via-amber-950/20 to-black border-2 border-amber-800 rounded shadow-[inset_0_0_30px_rgba(255,176,0,0.1),0_0_20px_rgba(255,176,0,0.2)]',
      elevated: 'bg-black border-2 border-green-800 rounded shadow-[0_0_30px_rgba(0,255,0,0.3),inset_0_0_20px_rgba(0,255,0,0.1)]',
    },
  },
  
  effects: {
    glowPrimary: 'drop-shadow-[0_0_20px_rgba(255,176,0,0.8)] hover:drop-shadow-[0_0_30px_rgba(255,176,0,1)]',
    glowSuccess: 'drop-shadow-[0_0_20px_rgba(0,255,0,0.8)] hover:drop-shadow-[0_0_30px_rgba(0,255,0,1)]',
    scanline: 'relative after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-amber-500/20 after:to-transparent after:animate-scan after:pointer-events-none',
    grid: 'bg-[linear-gradient(rgba(255,176,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,176,0,.05)_1px,transparent_1px)] bg-[size:40px_40px]',
  }
}
