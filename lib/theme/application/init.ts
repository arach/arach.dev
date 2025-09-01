// Initialize built-in themes
import { registerTheme } from './registry'
import { validateAndNormalize } from './factory'
import { terminalTheme } from '@/themes/application/terminal'
import { terminalThemeHybrid } from '@/themes/application/terminal-hybrid'
import { directoryTheme } from '@/themes/application/directory'
// import { cyberpunkTheme } from './cyberpunk-theme'
// import { minimalTheme } from './minimal-theme'
// import { retroTheme } from './retro-theme'

// Register all built-in themes
// Terminal theme needs adaptation from the old format
registerTheme('terminal', validateAndNormalize(terminalTheme))
// Terminal Hybrid - CSS variables version for testing
registerTheme('terminal-hybrid', validateAndNormalize(terminalThemeHybrid))
// Directory theme also needs adaptation
registerTheme('directory', validateAndNormalize(directoryTheme))
// registerTheme('cyberpunk', cyberpunkTheme)  // Temporarily disabled due to type mismatch
// registerTheme('minimal', minimalTheme)       // Temporarily disabled 
// registerTheme('retro', retroTheme)           // Temporarily disabled