// Military-grade terminal theme inspired by Anduril Lattice OS and Palantir Gotham
// Precision-focused design with tactical aesthetics and intelligence-grade UI patterns

/**
 * TERMINAL THEME PHILOSOPHY & DESIGN GUIDE
 * =======================================
 * 
 * This theme embodies military-grade precision with tactical aesthetics, inspired by 
 * defense contractor interfaces and intelligence platforms. Every design decision 
 * serves operational efficiency and visual clarity.
 * 
 * CORE PRINCIPLES:
 * ---------------
 * 1. **Operational Clarity**: Every element must serve a clear functional purpose
 * 2. **Hierarchical Precision**: Information architecture mirrors command structures
 * 3. **Tactical Efficiency**: Minimal cognitive load, maximum information density
 * 4. **System Resilience**: Consistent patterns that scale across complex interfaces
 * 5. **Professional Authority**: Visual language that conveys competence and reliability
 * 
 * COLOR PHILOSOPHY:
 * ----------------
 * - **Base Gray Scale**: Ultra-refined 25-step grayscale for precise visual hierarchy
 * - **Tactical Blue (Cyan)**: Primary actions, active states, critical data highlights
 * - **Operational Green**: Success states, system health, positive confirmations
 * - **Warning Amber**: Caution states, pending operations, attention required
 * - **Critical Red**: Error states, system failures, destructive actions
 * - **Intelligence Blue**: Informational content, secondary data, contextual hints
 * 
 * UI BUILDING GUIDELINES:
 * ======================
 * 
 * HEADERS & NAVIGATION:
 * --------------------
 * - Use uppercase typography for section headers (h4, h5, h6) to create military precision
 * - Implement tactical button styling with border-left accents for primary navigation
 * - Apply mono font for technical labels and data values
 * - Use subsectionTitle styling for categorized content with cyan accent borders
 * 
 * Example Header Patterns:
 * ```tsx
 * // Command-style main header
 * <h1 className={theme.typography.h1}>SYSTEM OVERVIEW</h1>
 * 
 * // Section divider with tactical accent
 * <h4 className={theme.typography.subsectionTitle}>DATA STREAMS</h4>
 * 
 * // Technical label
 * <span className={theme.typography.dataLabel}>UPTIME</span>
 * ```
 * 
 * CARDS & CONTAINERS:
 * ------------------
 * - Use tactical cards with left-border accents for status-driven content
 * - Apply elevated cards for important dashboard widgets
 * - Implement glass morphism for overlay elements
 * - Use data cards for metrics and KPI displays
 * 
 * Card Hierarchy:
 * ```tsx
 * // Standard content card
 * <div className={theme.components.card.default}>
 * 
 * // Important status card with tactical accent
 * <div className={theme.components.card.tactical}>
 * 
 * // Critical alert card
 * <div className={theme.components.card.alert}>
 * 
 * // Data visualization card
 * <div className={theme.components.card.data}>
 * ```
 * 
 * BUTTONS & ACTIONS:
 * -----------------
 * - Primary actions use tactical button styling with left-border accents
 * - Secondary actions use ghost styling to reduce visual weight
 * - Destructive actions use danger styling with red accent states
 * - Icon-only actions use compact icon button variants
 * 
 * Button Hierarchy:
 * ```tsx
 * // Primary command action
 * <button className={theme.components.button.tactical}>EXECUTE OPERATION</button>
 * 
 * // Standard primary action
 * <button className={theme.components.button.primary}>CONFIRM</button>
 * 
 * // Secondary action
 * <button className={theme.components.button.ghost}>CANCEL</button>
 * 
 * // Destructive action
 * <button className={theme.components.button.danger}>DELETE RESOURCE</button>
 * ```
 * 
 * STATUS & FEEDBACK:
 * -----------------
 * - Use animated status dots for real-time system health indicators
 * - Implement badge system for categorical data and status labels
 * - Apply progress bars with tactical gradients for operation progress
 * - Use alert system with left-border accents for system messages
 * 
 * Status Patterns:
 * ```tsx
 * // System health indicator
 * <div className={theme.components.status.dot.online} />
 * 
 * // Active operation status
 * <span className={theme.components.badge.active}>PROCESSING</span>
 * 
 * // Critical system alert
 * <div className={theme.components.alert.error}>
 *   <h5 className={theme.components.alert.title}>SYSTEM ERROR</h5>
 *   <p className={theme.components.alert.description}>Connection lost</p>
 * </div>
 * ```
 * 
 * DATA VISUALIZATION:
 * ------------------
 * - Use monospace fonts for all numerical data and technical identifiers
 * - Implement table system with alternating row styles for large datasets
 * - Apply tactical color coding for status-driven data
 * - Use compact badges and chips for categorical tagging
 * 
 * Table Implementation:
 * ```tsx
 * <div className={theme.components.table.container}>
 *   <table>
 *     <thead>
 *       <tr>
 *         <th className={theme.components.table.header}>ASSET ID</th>
 *         <th className={theme.components.table.headerSortable}>STATUS</th>
 *         <th className={theme.components.table.header}>UPTIME</th>
 *       </tr>
 *     </thead>
 *     <tbody>
 *       <tr className={theme.components.table.row}>
 *         <td className={theme.components.table.cell}>SRV-001</td>
 *         <td className={theme.components.table.cellHighlight}>ONLINE</td>
 *         <td className={theme.components.table.cellNumeric}>99.9%</td>
 *       </tr>
 *     </tbody>
 *   </table>
 * </div>
 * ```
 * 
 * FORMS & INPUTS:
 * --------------
 * - Use tactical input styling for operational forms
 * - Implement clear validation states with color-coded borders
 * - Apply minimal input styling for embedded form elements
 * - Use required field indicators for critical data entry
 * 
 * Form Patterns:
 * ```tsx
 * // Critical system input
 * <input className={theme.components.input.tactical} placeholder="ENTER COMMAND" />
 * 
 * // Standard form input
 * <input className={theme.components.input.default} />
 * 
 * // Validation state inputs
 * <input className={theme.components.input.error} />
 * <input className={theme.components.input.success} />
 * 
 * // Form labels
 * <label className={theme.typography.labelRequired}>AUTHORIZATION CODE</label>
 * ```
 * 
 * LAYOUT & STRUCTURE:
 * ------------------
 * - Use grid-based layouts for dashboard-style interfaces
 * - Implement sidebar navigation with tactical active state indicators
 * - Apply sticky headers for persistent navigation context
 * - Use section-based content organization with clear dividers
 * 
 * Layout Structure:
 * ```tsx
 * <div className={theme.layout.container}>
 *   <header className={theme.layout.headerSticky}>
 *     <nav className={theme.layout.sidebar}>
 *       <div className={theme.layout.sidebarItemActive}>ACTIVE SECTION</div>
 *       <div className={theme.layout.sidebarItem}>Other Section</div>
 *     </nav>
 *   </header>
 *   <main className={theme.layout.main}>
 *     <div className={theme.layout.contentNarrow}>
 *       <section className={theme.layout.section}>
 *         {/* Content */}
 *       </section>
 *     </div>
 *   </main>
 * </div>
 * ```
 * 
 * ANIMATION & EFFECTS:
 * -------------------
 * - Use subtle glow effects for focus states and active elements
 * - Implement pulse animations for real-time status indicators
 * - Apply glass morphism for overlay elements and modals
 * - Use tactical border animations for critical alerts
 * 
 * Effect Applications:
 * ```tsx
 * // Focus state with tactical glow
 * <div className={cx(theme.components.card.default, theme.effects.glowPrimary)}>
 * 
 * // Real-time status with pulse
 * <div className={cx(theme.components.status.dot.pending, theme.animations.pulse)}>
 * 
 * // Glass morphism overlay
 * <div className={theme.effects.glass}>
 * 
 * // Grid background for tactical displays
 * <div className={theme.effects.grid}>
 * ```
 * 
 * ACCESSIBILITY & USABILITY:
 * --------------------------
 * - High contrast ratios ensure readability in various lighting conditions
 * - Consistent focus indicators provide clear navigation feedback
 * - Semantic color usage supports colorblind accessibility
 * - Monospace fonts improve scanning efficiency for technical data
 * 
 * RESPONSIVE CONSIDERATIONS:
 * -------------------------
 * - Mobile interfaces should prioritize critical actions and status
 * - Touch targets meet minimum size requirements for tactical use
 * - Information density can be maintained on larger screens
 * - Navigation patterns scale from desktop command centers to mobile field use
 * 
 * COMPONENT COMPOSITION EXAMPLES:
 * ==============================
 * 
 * Dashboard Widget:
 * ```tsx
 * <div className={theme.components.card.tactical}>
 *   <div className="space-y-2">
 *     <div className="flex items-center justify-between">
 *       <h4 className={theme.typography.uiSectionHeader}>SYSTEM STATUS</h4>
 *       <div className={theme.components.status.dot.online} />
 *     </div>
 *     <div className="grid grid-cols-2 gap-4">
 *       <div>
 *         <span className={theme.typography.dataLabel}>UPTIME</span>
 *         <div className={theme.typography.dataValue}>99.97%</div>
 *       </div>
 *       <div>
 *         <span className={theme.typography.dataLabel}>LOAD</span>
 *         <div className={theme.typography.dataValue}>0.43</div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 * 
 * Command Interface:
 * ```tsx
 * <div className={theme.components.card.default}>
 *   <div className={theme.layout.panelHeader}>
 *     <h3 className={theme.typography.uiTitle}>COMMAND TERMINAL</h3>
 *   </div>
 *   <div className={theme.layout.panelBody}>
 *     <div className="space-y-3">
 *       <div>
 *         <label className={theme.typography.labelRequired}>COMMAND</label>
 *         <input 
 *           className={theme.components.input.tactical}
 *           placeholder="ENTER SYSTEM COMMAND"
 *         />
 *       </div>
 *       <div className="flex gap-2">
 *         <button className={theme.components.button.tactical}>EXECUTE</button>
 *         <button className={theme.components.button.ghost}>CLEAR</button>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */

export const terminalTheme = {
  name: 'Terminal',
  description: 'Military-grade terminal interface with tactical precision and sophisticated data visualization',
  
  // Color Palette - Sophisticated grayscale with strategic accent deployment
  colors: {
    // Enhanced grayscale foundation with better contrast steps
    gray: {
      0: '#ffffff',
      25: '#fcfcfc',
      50: '#fafafa',
      75: '#f7f7f7',
      100: '#f4f4f5',
      150: '#ededef',
      200: '#e4e4e7',
      250: '#d9d9dd',
      300: '#d1d1d6',
      350: '#b8b8bf',
      400: '#a1a1aa',
      450: '#8d8d96',
      500: '#71717a',
      550: '#5e5e66',
      600: '#52525b',
      650: '#46464f',
      700: '#3f3f46',
      750: '#38383f',
      800: '#27272a',
      825: '#202023',
      850: '#1a1a1d',
      875: '#151517',
      900: '#121214',
      925: '#0e0e10',
      950: '#09090b',
      975: '#050506',
      1000: '#000000',
    },
    
    // Tactical accent colors - precise and purposeful
    accent: {
      // Primary action - tactical blue
      primary: '#00b4d8',     // Bright tactical blue
      primaryDim: '#0096c7',   // Dimmed tactical blue
      primaryDark: '#0077b6', // Dark tactical blue
      primaryGlow: 'rgba(0, 180, 216, 0.15)',
      
      // Success state - operational green
      success: '#00f5a0',      // Bright operational green
      successDim: '#00d97e',   // Dimmed operational green
      successDark: '#00bd6f',  // Dark operational green
      successGlow: 'rgba(0, 245, 160, 0.12)',
      
      // Warning state - tactical amber
      warning: '#ffd60a',      // Bright tactical amber
      warningDim: '#ffc300',   // Dimmed tactical amber
      warningDark: '#ffb700',  // Dark tactical amber
      warningGlow: 'rgba(255, 214, 10, 0.12)',
      
      // Error state - critical red
      error: '#ff4444',        // Critical red
      errorDim: '#dc2626',     // Dimmed critical red
      errorDark: '#b91c1c',    // Dark critical red
      errorGlow: 'rgba(255, 68, 68, 0.12)',
      
      // Info state - intelligence blue
      info: '#0ea5e9',         // Intelligence blue
      infoDim: '#0284c7',      // Dimmed intelligence blue
      infoDark: '#0369a1',     // Dark intelligence blue
      infoGlow: 'rgba(14, 165, 233, 0.12)',
      
      // Special states
      alert: '#ff6b6b',        // Alert red-orange
      alertDim: '#fa5252',     // Dimmed alert
      neutral: '#6c757d',      // Neutral gray-blue
      neutralDim: '#495057',   // Dimmed neutral
    }
  },

  // Typography - Hierarchical system with military precision
  typography: {
    // Display headers - Command center style
    display1: 'text-3xl font-bold text-gray-50 tracking-tighter leading-tight',
    display2: 'text-2xl font-bold text-gray-100 tracking-tight leading-tight',
    
    // Headers - Clean hierarchy with strong contrast
    h1: 'text-xl font-bold text-white tracking-tight uppercase',
    h2: 'text-lg font-semibold text-white tracking-tight',
    h3: 'text-base font-semibold text-gray-50',
    h4: 'text-sm font-semibold text-gray-100 uppercase tracking-wider',
    h5: 'text-xs font-semibold text-gray-200 uppercase tracking-wide',
    h6: 'text-[11px] font-medium text-gray-200 uppercase tracking-wider',
    
    // Section headers - Technical precision
    sectionTitle: 'font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white',
    subsectionTitle: 'font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 border-l-2 border-cyan-500 pl-3',
    
    // UI headers - Interface typography
    uiTitle: 'text-sm font-semibold text-white tracking-tight',
    uiSubtitle: 'text-xs text-gray-50 tracking-wide',
    uiSectionHeader: 'text-[10px] font-bold text-white uppercase tracking-[0.15em]',
    uiLabel: 'text-[11px] font-semibold text-white tracking-wide',
    
    // Body text - Optimal readability
    body: 'text-sm text-white leading-relaxed tracking-normal',
    bodyLarge: 'text-base text-white leading-relaxed',
    bodyMono: 'font-mono text-xs text-gray-50 leading-relaxed tracking-tight',
    bodySmall: 'text-xs text-gray-100 leading-normal',
    bodySmallMono: 'font-mono text-[10px] text-gray-200 tracking-tight',
    bodyMicro: 'text-[10px] text-gray-200 leading-tight',
    
    // Data visualization text
    dataLabel: 'font-mono text-[10px] font-semibold text-gray-100 uppercase tracking-wider',
    dataValue: 'font-mono text-sm font-medium text-white tracking-tight',
    dataUnit: 'font-mono text-[10px] text-gray-200 tracking-wide',
    
    // Labels - Form and UI labels
    label: 'text-xs font-semibold text-white tracking-wide',
    labelRequired: 'text-xs font-semibold text-white tracking-wide after:content-["*"] after:ml-0.5 after:text-red-400',
    labelOptional: 'text-xs font-medium text-gray-100 tracking-wide',
    
    // Code/Technical
    code: 'font-mono text-xs text-cyan-400 bg-gray-900/80 px-1.5 py-0.5 rounded border border-gray-800',
    codeBlock: 'font-mono text-xs text-white bg-gray-950 border border-gray-800 rounded-md p-4 leading-relaxed',
    codeInline: 'font-mono text-[11px] text-emerald-400 bg-gray-900 px-1 py-0.5 rounded',
    
    // Status text
    statusActive: 'text-[10px] font-bold text-emerald-400 uppercase tracking-wider',
    statusInactive: 'text-[10px] font-medium text-gray-500 uppercase tracking-wider',
    statusError: 'text-[10px] font-bold text-red-400 uppercase tracking-wider',
  },

  // Components - Military-grade interface elements
  components: {
    // Inputs - Tactical input fields with high contrast
    input: {
      default: 'w-full bg-gray-900 border border-gray-800 text-gray-100 px-3 py-2 text-sm rounded-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 placeholder:text-gray-600 transition-all duration-200',
      
      active: 'w-full bg-gray-900 border border-cyan-500 text-gray-50 px-3 py-2 text-sm rounded-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 placeholder:text-gray-500 transition-all duration-200 shadow-[0_0_0_1px_rgba(0,180,216,0.1)]',
      
      error: 'w-full bg-gray-900 border border-red-500 text-gray-100 px-3 py-2 text-sm rounded-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 placeholder:text-gray-600 transition-all duration-200 shadow-[0_0_0_1px_rgba(255,68,68,0.1)]',
      
      success: 'w-full bg-gray-900 border border-emerald-500 text-gray-100 px-3 py-2 text-sm rounded-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 placeholder:text-gray-600 transition-all duration-200 shadow-[0_0_0_1px_rgba(0,245,160,0.1)]',
      
      minimal: 'w-full bg-transparent border-0 border-b border-gray-800 px-0 py-2 text-sm text-gray-100 focus:border-cyan-500 focus:outline-none placeholder:text-gray-600 transition-colors duration-200 rounded-none',
      
      tactical: 'w-full bg-gray-950 border-2 border-gray-800 text-gray-50 px-4 py-2.5 text-sm font-medium rounded focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 placeholder:text-gray-500 transition-all duration-200',
    },
    
    // Textareas
    textarea: {
      default: 'w-full min-h-[100px] bg-gray-900 border border-gray-800 text-gray-100 px-3 py-2.5 text-sm rounded-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 placeholder:text-gray-600 resize-none transition-all duration-200 leading-relaxed',
      
      code: 'w-full min-h-[150px] bg-gray-950 border border-gray-800 font-mono text-xs text-gray-100 px-4 py-3 rounded focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 placeholder:text-gray-600 resize-none transition-all duration-200 leading-relaxed',
      
      tactical: 'w-full min-h-[120px] bg-gray-950 border-2 border-gray-800 text-gray-50 px-4 py-3 text-sm font-medium rounded focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 placeholder:text-gray-500 resize-y transition-all duration-200',
    },
    
    // Buttons - Sophisticated button system with tactical styling
    button: {
      primary: 'inline-flex items-center justify-center rounded-sm bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:from-cyan-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-950 active:from-cyan-700 active:to-cyan-600 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200 shadow-md hover:shadow-lg',
      
      secondary: 'inline-flex items-center justify-center rounded-sm border-2 border-gray-800 bg-gray-800 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-200 hover:bg-gray-800 hover:border-gray-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-950 active:bg-gray-900 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      ghost: 'inline-flex items-center justify-center rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-950 active:bg-gray-900 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      danger: 'inline-flex items-center justify-center rounded-sm border border-red-600/50 bg-red-950/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-950/50 hover:border-red-500 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-950 active:bg-red-950/70 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      success: 'inline-flex items-center justify-center rounded-sm border border-emerald-600/50 bg-emerald-950/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:bg-emerald-950/50 hover:border-emerald-500 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-950 active:bg-emerald-950/70 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      warning: 'inline-flex items-center justify-center rounded-sm border border-amber-600/50 bg-amber-950/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:bg-amber-950/50 hover:border-amber-500 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-950 active:bg-amber-950/70 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      tactical: 'inline-flex items-center justify-center rounded-sm bg-gray-800 border-l-4 border-cyan-500 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-gray-100 hover:bg-gray-800 hover:border-l-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:ring-offset-2 focus:ring-offset-gray-950 active:bg-gray-900 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      icon: 'inline-flex items-center justify-center rounded-sm border border-gray-800 bg-gray-800 p-2 text-gray-400 hover:bg-gray-800 hover:border-gray-825 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-950 active:bg-gray-900 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
      
      iconSmall: 'inline-flex items-center justify-center rounded-sm border border-gray-800 bg-gray-900 p-1 text-gray-500 hover:bg-gray-800 hover:border-gray-800 hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:ring-offset-1 focus:ring-offset-gray-950 active:bg-gray-900 disabled:pointer-events-none disabled:opacity-40 transition-all duration-200',
    },
    
    // Cards - Intelligence-grade containers
    card: {
      default: 'bg-gray-900 border border-gray-800 rounded-sm shadow-xl shadow-black/30',
      
      elevated: 'bg-gradient-to-b from-gray-850 to-gray-900 border border-gray-800 rounded-sm shadow-2xl shadow-black/40',
      
      glass: 'bg-gray-900/60 border border-gray-800/50 rounded-sm backdrop-blur-md shadow-xl',
      
      active: 'bg-gradient-to-b from-gray-850 to-gray-900 border border-cyan-500/30 rounded-sm shadow-xl shadow-cyan-500/5',
      
      tactical: 'bg-gray-900 border-2 border-gray-800 border-l-4 border-l-cyan-500 rounded-sm shadow-xl shadow-black/30',
      
      alert: 'bg-gray-900 border-2 border-red-900/50 border-l-4 border-l-red-500 rounded-sm shadow-xl shadow-red-950/20',
      
      success: 'bg-gray-900 border-2 border-emerald-900/50 border-l-4 border-l-emerald-500 rounded-sm shadow-xl shadow-emerald-950/20',
      
      data: 'bg-gray-950 border border-gray-800 rounded-sm shadow-lg font-mono',
    },
    
    // Badges - Tactical status indicators
    badge: {
      default: 'inline-flex items-center px-2.5 py-1 rounded-sm font-mono text-[10px] font-bold uppercase tracking-[0.15em] border shadow-sm',
      
      neutral: 'bg-gray-800 text-gray-300 border-gray-800',
      primary: 'bg-cyan-950/40 text-cyan-400 border-cyan-800/50 shadow-cyan-500/10',
      success: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50 shadow-emerald-500/10',
      warning: 'bg-amber-950/40 text-amber-400 border-amber-800/50 shadow-amber-500/10',
      error: 'bg-red-950/40 text-red-400 border-red-800/50 shadow-red-500/10',
      info: 'bg-blue-950/40 text-blue-400 border-blue-800/50 shadow-blue-500/10',
      
      // Tactical variants
      active: 'bg-gradient-to-r from-cyan-950/50 to-cyan-900/30 text-cyan-300 border-cyan-700/70 font-bold animate-pulse',
      critical: 'bg-gradient-to-r from-red-950/50 to-red-900/30 text-red-300 border-red-700/70 font-bold animate-pulse',
      
      // Compact variants
      compact: 'inline-flex items-center px-1.5 py-0.5 rounded-sm font-mono text-[9px] font-semibold uppercase tracking-wider',
      dot: 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm font-mono text-[10px] font-medium uppercase tracking-wide before:content-[""] before:w-1.5 before:h-1.5 before:rounded-full',
    },
    
    // Tables - Data visualization optimized
    table: {
      container: 'overflow-hidden rounded-sm border border-gray-800 bg-gray-950',
      wrapper: 'overflow-x-auto',
      
      header: 'px-4 py-2.5 text-left align-middle font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 bg-gray-900 border-b-2 border-gray-800',
      headerSortable: 'px-4 py-2.5 text-left align-middle font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 bg-gray-900 border-b-2 border-gray-800 hover:bg-gray-800 hover:text-gray-300 cursor-pointer transition-colors',
      
      row: 'border-b border-gray-800 transition-all hover:bg-gray-900 data-[state=selected]:bg-gray-875',
      rowAlternate: 'odd:bg-gray-950 even:bg-gray-900 border-b border-gray-800 transition-all hover:bg-gray-900',
      
      cell: 'px-4 py-2.5 align-middle font-mono text-xs text-gray-300',
      cellNumeric: 'px-4 py-2.5 align-middle font-mono text-xs text-gray-100 text-right tabular-nums',
      cellHighlight: 'px-4 py-2.5 align-middle font-mono text-xs text-cyan-400 font-semibold',
      
      footer: 'px-4 py-2 text-left align-middle font-mono text-[10px] uppercase tracking-wide text-gray-500 bg-gray-900 border-t border-gray-800',
    },
    
    // Status indicators - Military-grade status lights (backward compatible)
    status: {
      // Legacy direct access (for backward compatibility)
      online: 'h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(0,245,160,0.6)]',
      offline: 'h-2 w-2 rounded-full bg-gray-600',
      error: 'h-2 w-2 rounded-full bg-red-500 shadow-[0_0_4px_rgba(255,68,68,0.6)]',
      warning: 'h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(255,214,10,0.6)]',
      pending: 'h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_4px_rgba(0,180,216,0.6)]',
      
      // Modern nested structure
      dot: {
        online: 'h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(0,245,160,0.6)]',
        offline: 'h-2 w-2 rounded-full bg-gray-600',
        error: 'h-2 w-2 rounded-full bg-red-500 shadow-[0_0_4px_rgba(255,68,68,0.6)]',
        warning: 'h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(255,214,10,0.6)]',
        pending: 'h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_4px_rgba(0,180,216,0.6)]',
      },
      
      bar: {
        online: 'h-0.5 w-full bg-gradient-to-r from-emerald-600 to-emerald-400',
        offline: 'h-0.5 w-full bg-gray-700',
        error: 'h-0.5 w-full bg-gradient-to-r from-red-600 to-red-400',
        warning: 'h-0.5 w-full bg-gradient-to-r from-amber-600 to-amber-400',
        pending: 'h-0.5 w-full bg-gradient-to-r from-cyan-600 to-cyan-400 animate-pulse',
      },
      
      text: {
        online: 'text-[10px] font-bold uppercase tracking-wider text-emerald-400',
        offline: 'text-[10px] font-medium uppercase tracking-wider text-gray-500',
        error: 'text-[10px] font-bold uppercase tracking-wider text-red-400',
        warning: 'text-[10px] font-bold uppercase tracking-wider text-amber-400',
        pending: 'text-[10px] font-bold uppercase tracking-wider text-cyan-400 animate-pulse',
      }
    },
    
    // Progress indicators
    progress: {
      container: 'w-full bg-gray-900 rounded-sm overflow-hidden',
      bar: 'h-1 bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300',
      barDanger: 'h-1 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300',
      barSuccess: 'h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300',
      label: 'font-mono text-[10px] text-gray-400 uppercase tracking-wider',
    },
    
    // Tooltips
    tooltip: {
      container: 'bg-gray-800 border border-gray-800 rounded-sm px-2 py-1 shadow-xl',
      text: 'font-mono text-[10px] text-gray-200',
      arrow: 'fill-gray-850 stroke-gray-700',
    },
    
    // Modals/Dialogs
    modal: {
      overlay: 'bg-black/80 backdrop-blur-sm',
      container: 'bg-gray-900 border-2 border-gray-800 rounded-sm shadow-2xl',
      header: 'border-b-2 border-gray-800 px-6 py-4',
      title: 'text-base font-bold uppercase tracking-wide text-gray-100',
      content: 'px-6 py-4',
      footer: 'border-t-2 border-gray-800 px-6 py-4 bg-gray-900',
    },
    
    // Dropdowns
    dropdown: {
      trigger: 'inline-flex items-center justify-between rounded-sm border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:border-gray-825 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-200',
      menu: 'bg-gray-900 border border-gray-800 rounded-sm shadow-2xl shadow-black/50 overflow-hidden',
      item: 'px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-colors',
      itemActive: 'px-3 py-2 text-sm text-cyan-400 bg-gray-875 cursor-pointer',
      separator: 'h-px bg-gray-800 my-1',
    },
    
    // Tabs
    tabs: {
      list: 'inline-flex items-center border-b-2 border-gray-800',
      trigger: 'px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-300 transition-colors relative',
      triggerActive: 'px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-400 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:-mb-[2px]',
      content: 'py-4',
    },
    
    // Alerts
    alert: {
      container: 'rounded-sm border-l-4 px-4 py-3',
      info: 'bg-blue-950/20 border-blue-500 text-blue-300',
      success: 'bg-emerald-950/20 border-emerald-500 text-emerald-300',
      warning: 'bg-amber-950/20 border-amber-500 text-amber-300',
      error: 'bg-red-950/20 border-red-500 text-red-300',
      title: 'font-semibold text-sm uppercase tracking-wide mb-1',
      description: 'text-xs leading-relaxed opacity-90',
    },
    
    // Chips/Pills
    chip: {
      default: 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide',
      removable: 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide pr-1',
      neutral: 'bg-gray-800 text-gray-300 border border-gray-800',
      primary: 'bg-cyan-950/30 text-cyan-400 border border-cyan-800/50',
      success: 'bg-emerald-950/30 text-emerald-400 border border-emerald-800/50',
      warning: 'bg-amber-950/30 text-amber-400 border border-amber-800/50',
      error: 'bg-red-950/30 text-red-400 border border-red-800/50',
    },
  },
  
  // Layout - Tactical interface structure
  layout: {
    // Containers
    container: 'bg-gray-950 text-gray-100 min-h-screen antialiased',
    containerGrid: 'bg-gray-950 text-gray-100 min-h-screen antialiased bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]',
    
    // Panels
    panel: 'rounded-sm bg-gray-900 p-4',
    panelHeader: 'border-b border-gray-875 px-4 py-3 bg-gray-900',
    panelBody: 'p-4',
    panelFooter: 'border-t border-gray-875 px-4 py-3 bg-gray-900',
    
    // Sidebars
    sidebar: 'bg-gray-900 border-r border-gray-875 min-h-screen',
    sidebarHeader: 'border-b border-gray-875 px-4 py-3',
    sidebarNav: 'py-2',
    sidebarItem: 'px-4 py-2 text-sm text-gray-400 hover:bg-gray-875 hover:text-gray-100 transition-colors',
    sidebarItemActive: 'px-4 py-2 text-sm text-cyan-400 bg-gray-875 border-l-2 border-cyan-500 font-semibold',
    
    // Sections
    section: 'space-y-6',
    sectionCompact: 'space-y-3',
    sectionGrid: 'grid gap-4',
    
    // Dividers
    divider: 'border-t border-gray-900 my-6',
    dividerThick: 'border-t border-gray-875 my-8',
    dividerDashed: 'border-t border-dashed border-gray-900 my-6',
    
    // Headers
    header: 'bg-gray-900 border-b border-gray-875',
    headerSticky: 'bg-gray-900/95 border-b border-gray-875 backdrop-blur-sm sticky top-0 z-40',
    
    // Footers
    footer: 'bg-gray-900 border-t border-gray-875',
    
    // Content areas
    main: 'flex-1',
    content: 'px-6 py-8',
    contentCompact: 'px-4 py-6',
    contentNarrow: 'max-w-4xl mx-auto px-6 py-8',
    
    // Grid systems
    gridCols2: 'grid grid-cols-2 gap-4',
    gridCols3: 'grid grid-cols-3 gap-4',
    gridCols4: 'grid grid-cols-4 gap-4',
    gridDashboard: 'grid grid-cols-12 gap-4',
  },
  
  // Special Effects - Tactical UI enhancements
  effects: {
    // Glows for focus states
    glowPrimary: 'shadow-[0_0_20px_rgba(0,180,216,0.15)]',
    glowSuccess: 'shadow-[0_0_20px_rgba(0,245,160,0.12)]',
    glowError: 'shadow-[0_0_20px_rgba(255,68,68,0.12)]',
    glowWarning: 'shadow-[0_0_20px_rgba(255,214,10,0.12)]',
    
    // Scanline effect for retro-tactical feel
    scanline: 'relative after:absolute after:inset-0 after:bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] after:bg-[length:100%_4px] after:animate-[scanline_8s_linear_infinite] after:pointer-events-none',
    
    // Grid overlay for tactical displays
    grid: 'bg-[linear-gradient(rgba(0,180,216,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,216,0.03)_1px,transparent_1px)] bg-[size:20px_20px]',
    
    // Border animations
    borderPulse: 'relative after:absolute after:inset-0 after:rounded-sm after:border after:border-cyan-500/50 after:animate-pulse after:pointer-events-none',
    
    // Glass morphism
    glass: 'backdrop-blur-md bg-gray-900/30',
    glassDark: 'backdrop-blur-md bg-gray-950/50',
    
    // Gradient overlays
    gradientOverlay: 'bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950',
    gradientRadial: 'bg-[radial-gradient(ellipse_at_center,rgba(0,180,216,0.1),transparent_70%)]',
    
    // Noise texture
    noise: 'relative after:absolute after:inset-0 after:bg-[url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"%3E%3C/rect%3E%3C/svg%3E")] after:opacity-[0.03] after:pointer-events-none',
  },
  
  // Animations - Smooth tactical transitions
  animations: {
    fadeIn: 'animate-[fadeIn_0.3s_ease-in]',
    slideIn: 'animate-[slideIn_0.3s_ease-out]',
    pulse: 'animate-pulse',
    ping: 'animate-ping',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },
  
  // Utilities - Helper classes
  utilities: {
    // Text selection
    selection: 'selection:bg-cyan-500/30 selection:text-cyan-100',
    
    // Scrollbar styling
    scrollbar: 'scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-600',
    
    // Focus styles
    focusRing: 'focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:ring-offset-2 focus:ring-offset-gray-950',
    
    // Truncation
    truncate: 'truncate',
    lineClamp2: 'line-clamp-2',
    lineClamp3: 'line-clamp-3',
    
    // Transitions
    transitionAll: 'transition-all duration-200',
    transitionColors: 'transition-colors duration-200',
    transitionTransform: 'transition-transform duration-200',
  }
} as const


export type Theme = typeof terminalTheme

// Utility function to combine classes
export function cx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

// Utility function to get nested theme values
export function getThemeValue(path: string): string {
  const keys = path.split('.')
  let current: any = terminalTheme
  
  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Theme path "${path}" not found`)
      return ''
    }
    current = current[key]
  }
  
  return current as string
}

// Semantic aliases for common patterns
export const themeAliases = {
  // Form elements
  formLabel: terminalTheme.typography.label,
  formInput: terminalTheme.components.input.default,
  formError: terminalTheme.components.input.error,
  formHelper: terminalTheme.typography.bodySmall,
  
  // Data display
  dataTable: terminalTheme.components.table.container,
  dataHeader: terminalTheme.components.table.header,
  dataRow: terminalTheme.components.table.row,
  dataCell: terminalTheme.components.table.cell,
  
  // Navigation
  navItem: terminalTheme.layout.sidebarItem,
  navItemActive: terminalTheme.layout.sidebarItemActive,
  navSection: terminalTheme.typography.uiSectionHeader,
  
  // Actions
  btnPrimary: terminalTheme.components.button.primary,
  btnSecondary: terminalTheme.components.button.secondary,
  btnDanger: terminalTheme.components.button.danger,
  btnIcon: terminalTheme.components.button.icon,
  
  // Status (using legacy direct access for compatibility)
  statusOk: terminalTheme.components.status.online,
  statusError: terminalTheme.components.status.error,
  statusWarning: terminalTheme.components.status.warning,
  statusPending: terminalTheme.components.status.pending,
  
  // Containers
  pageContainer: terminalTheme.layout.container,
  contentArea: terminalTheme.layout.content,
  card: terminalTheme.components.card.default,
  panel: terminalTheme.layout.panel,
} as const