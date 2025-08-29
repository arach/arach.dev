// Initialize built-in themes
import { registerTheme } from './theme-registry'
import { terminalTheme } from './terminal-theme'
// import { cyberpunkTheme } from './cyberpunk-theme'
// import { minimalTheme } from './minimal-theme'
// import { retroTheme } from './retro-theme'

// Register all built-in themes
registerTheme('terminal', terminalTheme)
// registerTheme('cyberpunk', cyberpunkTheme)  // Temporarily disabled due to type mismatch
// registerTheme('minimal', minimalTheme)       // Temporarily disabled 
// registerTheme('retro', retroTheme)           // Temporarily disabled