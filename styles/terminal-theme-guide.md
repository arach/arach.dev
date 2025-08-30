# Terminal Theme Design Guide

## Theme Philosophy

This theme embodies military-grade precision with tactical aesthetics, inspired by defense contractor interfaces and intelligence platforms. Every design decision serves operational efficiency and visual clarity.

### Core Principles

1. **Operational Clarity**: Every element must serve a clear functional purpose
2. **Hierarchical Precision**: Information architecture mirrors command structures
3. **Tactical Efficiency**: Minimal cognitive load, maximum information density
4. **System Resilience**: Consistent patterns that scale across complex interfaces
5. **Professional Authority**: Visual language that conveys competence and reliability

## Color Philosophy

- **Base Gray Scale**: Ultra-refined 25-step grayscale for precise visual hierarchy
- **Tactical Blue (Cyan)**: Primary actions, active states, critical data highlights
- **Operational Green**: Success states, system health, positive confirmations
- **Warning Amber**: Caution states, pending operations, attention required
- **Critical Red**: Error states, system failures, destructive actions
- **Intelligence Blue**: Informational content, secondary data, contextual hints

## UI Building Guidelines

### Headers & Navigation

**Approach:**
- Use uppercase typography for section headers (h4, h5, h6) to create military precision
- Implement tactical button styling with border-left accents for primary navigation
- Apply mono font for technical labels and data values
- Use subsectionTitle styling for categorized content with cyan accent borders

**Example Header Patterns:**
```tsx
// Command-style main header
<h1 className={theme.typography.h1}>SYSTEM OVERVIEW</h1>

// Section divider with tactical accent
<h4 className={theme.typography.subsectionTitle}>DATA STREAMS</h4>

// Technical label
<span className={theme.typography.dataLabel}>UPTIME</span>
```

### Cards & Containers

**Approach:**
- Use tactical cards with left-border accents for status-driven content
- Apply elevated cards for important dashboard widgets
- Implement glass morphism for overlay elements
- Use data cards for metrics and KPI displays

**Card Hierarchy:**
```tsx
// Standard content card
<div className={theme.components.card.default}>

// Important status card with tactical accent
<div className={theme.components.card.tactical}>

// Critical alert card
<div className={theme.components.card.alert}>

// Data visualization card
<div className={theme.components.card.data}>
```

### Buttons & Actions

**Approach:**
- Primary actions use tactical button styling with left-border accents
- Secondary actions use ghost styling to reduce visual weight
- Destructive actions use danger styling with red accent states
- Icon-only actions use compact icon button variants

**Button Hierarchy:**
```tsx
// Primary command action
<button className={theme.components.button.tactical}>EXECUTE OPERATION</button>

// Standard primary action
<button className={theme.components.button.primary}>CONFIRM</button>

// Secondary action
<button className={theme.components.button.ghost}>CANCEL</button>

// Destructive action
<button className={theme.components.button.danger}>DELETE RESOURCE</button>
```

### Status & Feedback

**Approach:**
- Use animated status dots for real-time system health indicators
- Implement badge system for categorical data and status labels
- Apply progress bars with tactical gradients for operation progress
- Use alert system with left-border accents for system messages

**Status Patterns:**
```tsx
// System health indicator
<div className={theme.components.status.dot.online} />

// Active operation status
<span className={theme.components.badge.active}>PROCESSING</span>

// Critical system alert
<div className={theme.components.alert.error}>
  <h5 className={theme.components.alert.title}>SYSTEM ERROR</h5>
  <p className={theme.components.alert.description}>Connection lost</p>
</div>
```

### Data Visualization

**Approach:**
- Use monospace fonts for all numerical data and technical identifiers
- Implement table system with alternating row styles for large datasets
- Apply tactical color coding for status-driven data
- Use compact badges and chips for categorical tagging

**Table Implementation:**
```tsx
<div className={theme.components.table.container}>
  <table>
    <thead>
      <tr>
        <th className={theme.components.table.header}>ASSET ID</th>
        <th className={theme.components.table.headerSortable}>STATUS</th>
        <th className={theme.components.table.header}>UPTIME</th>
      </tr>
    </thead>
    <tbody>
      <tr className={theme.components.table.row}>
        <td className={theme.components.table.cell}>SRV-001</td>
        <td className={theme.components.table.cellHighlight}>ONLINE</td>
        <td className={theme.components.table.cellNumeric}>99.9%</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Forms & Inputs

**Approach:**
- Use tactical input styling for operational forms
- Implement clear validation states with color-coded borders
- Apply minimal input styling for embedded form elements
- Use required field indicators for critical data entry

**Form Patterns:**
```tsx
// Critical system input
<input className={theme.components.input.tactical} placeholder="ENTER COMMAND" />

// Standard form input
<input className={theme.components.input.default} />

// Validation state inputs
<input className={theme.components.input.error} />
<input className={theme.components.input.success} />

// Form labels
<label className={theme.typography.labelRequired}>AUTHORIZATION CODE</label>
```

### Layout & Structure

**Approach:**
- Use grid-based layouts for dashboard-style interfaces
- Implement sidebar navigation with tactical active state indicators
- Apply sticky headers for persistent navigation context
- Use section-based content organization with clear dividers

**Layout Structure:**
```tsx
<div className={theme.layout.container}>
  <header className={theme.layout.headerSticky}>
    <nav className={theme.layout.sidebar}>
      <div className={theme.layout.sidebarItemActive}>ACTIVE SECTION</div>
      <div className={theme.layout.sidebarItem}>Other Section</div>
    </nav>
  </header>
  <main className={theme.layout.main}>
    <div className={theme.layout.contentNarrow}>
      <section className={theme.layout.section}>
        {/* Content */}
      </section>
    </div>
  </main>
</div>
```

### Animation & Effects

**Approach:**
- Use subtle glow effects for focus states and active elements
- Implement pulse animations for real-time status indicators
- Apply glass morphism for overlay elements and modals
- Use tactical border animations for critical alerts

**Effect Applications:**
```tsx
// Focus state with tactical glow
<div className={cx(theme.components.card.default, theme.effects.glowPrimary)}>

// Real-time status with pulse
<div className={cx(theme.components.status.dot.pending, theme.animations.pulse)}>

// Glass morphism overlay
<div className={theme.effects.glass}>

// Grid background for tactical displays
<div className={theme.effects.grid}>
```

## Best Practices

### Accessibility & Usability
- High contrast ratios ensure readability in various lighting conditions
- Consistent focus indicators provide clear navigation feedback
- Semantic color usage supports colorblind accessibility
- Monospace fonts improve scanning efficiency for technical data

### Responsive Considerations
- Mobile interfaces should prioritize critical actions and status
- Touch targets meet minimum size requirements for tactical use
- Information density can be maintained on larger screens
- Navigation patterns scale from desktop command centers to mobile field use

## Component Composition Examples

### Dashboard Widget
```tsx
<div className={theme.components.card.tactical}>
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <h4 className={theme.typography.uiSectionHeader}>SYSTEM STATUS</h4>
      <div className={theme.components.status.dot.online} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className={theme.typography.dataLabel}>UPTIME</span>
        <div className={theme.typography.dataValue}>99.97%</div>
      </div>
      <div>
        <span className={theme.typography.dataLabel}>LOAD</span>
        <div className={theme.typography.dataValue}>0.43</div>
      </div>
    </div>
  </div>
</div>
```

### Command Interface
```tsx
<div className={theme.components.card.default}>
  <div className={theme.layout.panelHeader}>
    <h3 className={theme.typography.uiTitle}>COMMAND TERMINAL</h3>
  </div>
  <div className={theme.layout.panelBody}>
    <div className="space-y-3">
      <div>
        <label className={theme.typography.labelRequired}>COMMAND</label>
        <input 
          className={theme.components.input.tactical}
          placeholder="ENTER SYSTEM COMMAND"
        />
      </div>
      <div className="flex gap-2">
        <button className={theme.components.button.tactical}>EXECUTE</button>
        <button className={theme.components.button.ghost}>CLEAR</button>
      </div>
    </div>
  </div>
</div>
```

### Status Dashboard
```tsx
<div className={theme.layout.gridCols3}>
  <div className={theme.components.card.tactical}>
    <div className="flex items-center justify-between mb-3">
      <h5 className={theme.typography.uiSectionHeader}>NETWORK STATUS</h5>
      <div className={theme.components.status.dot.online} />
    </div>
    <div className={theme.typography.dataValue}>99.97% UPTIME</div>
    <div className={theme.typography.dataUnit}>Last 24h</div>
  </div>
  
  <div className={theme.components.card.alert}>
    <div className="flex items-center justify-between mb-3">
      <h5 className={theme.typography.uiSectionHeader}>ALERTS</h5>
      <span className={theme.components.badge.critical}>3 CRITICAL</span>
    </div>
    <div className={theme.typography.bodySmall}>
      System requires immediate attention
    </div>
  </div>
  
  <div className={theme.components.card.success}>
    <div className="flex items-center justify-between mb-3">
      <h5 className={theme.typography.uiSectionHeader}>DEPLOYMENTS</h5>
      <div className={theme.components.status.dot.online} />
    </div>
    <div className={theme.typography.dataValue}>12 ACTIVE</div>
    <div className={theme.typography.dataUnit}>All systems operational</div>
  </div>
</div>
```

## Typography Hierarchy

### Headers
- `h1`: Primary command headers, all caps, bold
- `h2`: Secondary command headers, mixed case, bold
- `h3`: Section headers, mixed case, semibold
- `h4`: Subsection headers, all caps, semibold, smaller
- `h5`: Technical labels, all caps, smaller, spaced
- `h6`: Micro labels, all caps, smallest, wide spacing

### Data Typography
- `dataLabel`: Technical parameter labels, mono font, tiny, all caps
- `dataValue`: Parameter values, mono font, medium, bold
- `dataUnit`: Units and context, mono font, tiny, lighter

### Body Text
- `body`: Standard text content, readable size
- `bodyMono`: Technical content, monospace
- `bodySmall`: Secondary information
- `bodyMicro`: Fine print and metadata

## Color Usage Guidelines

### Status Colors
- **Cyan/Blue**: Active states, primary actions, focus indicators
- **Green**: Success states, operational status, positive confirmations
- **Amber**: Warning states, caution indicators, pending operations
- **Red**: Error states, failures, destructive actions, critical alerts

### Grayscale Hierarchy
- **White/Gray-50**: Primary text, active elements
- **Gray-100-300**: Secondary text, inactive elements
- **Gray-400-600**: Borders, dividers, subtle elements
- **Gray-700-950**: Backgrounds, containers, inactive areas

## Implementation Notes for AI Agents

When implementing components with this theme:

1. **Always use theme constants** - Never hardcode colors or styles
2. **Follow the semantic hierarchy** - Use appropriate typography classes for content hierarchy
3. **Apply consistent patterns** - Cards, buttons, and forms should follow established patterns
4. **Consider status semantics** - Use appropriate status colors based on meaning, not just appearance
5. **Maintain accessibility** - High contrast ratios and proper focus indicators are built in
6. **Use composition** - Combine theme classes to build complex components
7. **Reference this guide** - When unsure about styling choices, refer back to the examples and principles

The theme is designed to be comprehensive and consistent, reducing the need for custom styling while maintaining military-grade precision and professional appearance.