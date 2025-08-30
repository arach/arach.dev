# Theme System

A flexible, easy-to-extend theme system for arach.dev with multiple built-in themes and simple customization.

## Built-in Themes

- **Terminal**: Monochrome terminal aesthetic with surgical color application
- **Cyberpunk**: Neon-soaked future aesthetic with vibrant accents  
- **Minimal**: Clean and modern with almost invisible UI elements
- **Retro**: 80s CRT monitor aesthetic with amber and green phosphor glow

## Quick Start

### Using a Theme

```tsx
import { themes } from '@/styles'

function MyComponent() {
  const theme = themes.terminal
  
  return (
    <button className={theme.components.button.primary}>
      Click Me
    </button>
  )
}
```

### Dynamic Theme Selection

```tsx
import { getAllThemes, type ThemeName } from '@/styles'
import { useState } from 'react'

function ThemedApp() {
  const [themeName, setThemeName] = useState<ThemeName>('terminal')
  const themes = getAllThemes()
  const theme = themes[themeName]
  
  return (
    <div className={theme.layout.container}>
      {/* Your app */}
    </div>
  )
}
```

## Adding a New Theme

### Method 1: Create a New Theme File

1. Create a new file in `styles/` directory:

```ts
// styles/my-theme.ts
import { createTheme, registerTheme } from './theme-registry'

export const myTheme = createTheme({
  name: 'My Theme',
  description: 'A custom theme',
  
  // Only override what you need
  colors: {
    accent: {
      primary: '#ff6b6b',
      primaryDim: '#ff5252',
    }
  },
  
  components: {
    button: {
      primary: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
    }
  }
})

// Auto-register the theme
registerTheme('my-theme', myTheme)
```

2. Import it in `styles/index.ts`:

```ts
import './my-theme'
```

### Method 2: Register at Runtime

```tsx
import { registerTheme, createTheme } from '@/styles'

// In your component or app initialization
const customTheme = createTheme({
  name: 'Runtime Theme',
  description: 'Created at runtime',
  colors: {
    accent: { primary: '#00ff00' }
  }
})

registerTheme('runtime', customTheme)
```

### Method 3: Full Theme from Scratch

Copy `theme-template.ts` and fill in all values:

```ts
import type { Theme } from './terminal-theme'

export const fullTheme: Theme = {
  name: 'Full Theme',
  description: 'Complete theme definition',
  colors: { /* ... */ },
  typography: { /* ... */ },
  components: { /* ... */ },
  layout: { /* ... */ },
  effects: { /* ... */ }
}
```

## Theme Structure

Each theme contains:

- **colors**: Grayscale and accent color palettes
- **typography**: Text styles for headers, body, labels, etc.
- **components**: Styled UI components (buttons, inputs, cards, etc.)
- **layout**: Container and section styles
- **effects**: Special effects like glows and animations

## Utility Functions

### `createTheme()`
Helper to create themes with partial overrides:

```ts
const theme = createTheme({
  name: 'Partial',
  description: 'Only change what you need',
  colors: { accent: { primary: '#blue' } }
})
```

### `registerTheme()`
Add a theme to the registry:

```ts
registerTheme('theme-id', themeObject)
```

### `getAllThemes()`
Get all registered themes:

```ts
const allThemes = getAllThemes()
// { terminal: {...}, cyberpunk: {...}, ... }
```

### `getTheme()`
Get a specific theme:

```ts
const theme = getTheme('terminal')
```

### `cx()`
Utility to combine class names:

```ts
import { cx } from '@/styles'

<div className={cx(
  theme.components.card.default,
  isActive && theme.components.card.active,
  'p-4'
)} />
```

## Viewing Themes

- **Style Viewer** (`/styles`): Browse all style tokens with search and filtering
- **Style Guide** (`/styleguide`): Interactive component showcase with live theme switching

## Best Practices

1. **Use `createTheme()`** for new themes to ensure all required fields
2. **Start with partial overrides** - only change what's different
3. **Register themes early** - in module scope or app initialization  
4. **Keep themes modular** - one theme per file
5. **Document your theme** - include name and description
6. **Test across components** - use the styleguide to verify

## TypeScript Support

All themes are fully typed. When creating themes, TypeScript will guide you:

```ts
import type { Theme } from '@/styles'

const myTheme: Theme = {
  // TypeScript will enforce the structure
}
```