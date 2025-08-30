// Initialize built-in themes
import { registerTheme } from './theme-registry'
import { adaptTerminalTheme } from '@/lib/theme-adapter'
import { terminalTheme } from './terminal-theme'
import { directoryTheme } from './directory-theme'
// import { cyberpunkTheme } from './cyberpunk-theme'
// import { minimalTheme } from './minimal-theme'
// import { retroTheme } from './retro-theme'

// Register all built-in themes
// Terminal theme needs adaptation from the old format
registerTheme('terminal', adaptTerminalTheme(terminalTheme))
// Directory theme is already in the new format
registerTheme('directory', directoryTheme)
// registerTheme('cyberpunk', cyberpunkTheme)  // Temporarily disabled due to type mismatch
// registerTheme('minimal', minimalTheme)       // Temporarily disabled 
// registerTheme('retro', retroTheme)           // Temporarily disabled