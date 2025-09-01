// Initialize built-in themes
import { registerTheme } from './theme-registry'
import { adaptTerminalTheme } from './theme-adapter'
import { terminalTheme } from './terminal-theme'
import { terminalThemeHybrid } from './terminal-theme-hybrid'
import { directoryTheme } from './directory-theme'
// import { cyberpunkTheme } from './cyberpunk-theme'
// import { minimalTheme } from './minimal-theme'
// import { retroTheme } from './retro-theme'

// Register all built-in themes
// Terminal theme needs adaptation from the old format
registerTheme('terminal', adaptTerminalTheme(terminalTheme))
// Terminal Hybrid - CSS variables version for testing
registerTheme('terminal-hybrid', adaptTerminalTheme(terminalThemeHybrid))
// Directory theme also needs adaptation
registerTheme('directory', adaptTerminalTheme(directoryTheme))
// registerTheme('cyberpunk', cyberpunkTheme)  // Temporarily disabled due to type mismatch
// registerTheme('minimal', minimalTheme)       // Temporarily disabled 
// registerTheme('retro', retroTheme)           // Temporarily disabled