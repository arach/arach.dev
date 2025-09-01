# Tailwind CSS v4 Theme System

A comprehensive theme system built for Tailwind CSS v4 using the new CSS-first configuration approach with `@theme` directive.

## 🚀 Migration Complete

**All themes have been migrated from TypeScript to Tailwind CSS v4 format!**

This provides better performance, improved DX, and leverages the latest Tailwind features including:
- CSS-first configuration with `@theme` directive
- Native CSS custom properties
- Enhanced component styling
- Better browser integration

## Theme Categories

### 📁 `/site` - Website Themes
Beautiful themes for the main website with distinct personalities:
- **Default** - Clean theme with system fonts
- **Dark (Midnight)** - Dark theme with Space Grotesk fonts
- **Terminal** - Monospace terminal-inspired theme  
- **Cyberpunk (Cyber Neon)** - Futuristic theme with neon colors
- **Ocean (Deep Ocean)** - Professional ocean-inspired theme
- **Paper (Vintage Paper)** - Elegant serif theme with paper texture
- **Sunset (Golden Hour)** - Warm theme with golden tones

### 📁 `/application` - Application UI Themes
Comprehensive themes for application development:
- **Terminal v4** - Advanced terminal theme aligned with Tailwind v4
- **Terminal Hybrid** - Demonstrates CSS variables with Tailwind
- **Directory** - Professional directory-focused design

## Architecture Comparison

| Aspect | Site Themes | Application Themes |
|--------|-------------|-------------------|
| **Purpose** | Website appearance | Application development |
| **Complexity** | Visual styling | Complete UI systems |
| **Variables** | 15-20 CSS variables | 50+ CSS variables |  
| **Components** | Basic elements | Complex UI patterns |
| **Features** | Colors, fonts, effects | Buttons, forms, tables, status |

## 🔧 Quick Start

### 1. Initialize Theme System
```typescript
import { initThemeSystem } from '@/lib/themes';
initThemeSystem(); // Auto-applies user preference
```

### 2. Apply Themes
```typescript
import { applyTheme } from '@/lib/themes';

applyTheme('dark');      // Midnight theme
applyTheme('cyberpunk'); // Cyber Neon theme  
applyTheme('terminal');  // Terminal theme
```

### 3. Use in Components
```tsx
// React component
import { useTheme } from '@/lib/themes';

function ThemeSelector() {
  const { theme, applyTheme, themes } = useTheme();
  
  return (
    <select onChange={(e) => applyTheme(e.target.value)}>
      {themes.map(t => (
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>
  );
}
```

### 4. HTML Usage  
```html
<html data-theme="cyberpunk">
  <body>
    <button class="cyberpunk-button">Neon Button</button>
    <div class="cyberpunk-card">Futuristic Card</div>
  </body>
</html>
```

## 🎨 Theme Features

Each theme provides:

### CSS Variables
```css
@theme {
  --color-bg: #0a0014;
  --color-accent: #f472b6; 
  --font-display: "Orbitron";
  --shadow-neon: 0 0 30px rgba(244,114,182,0.6);
}
```

### Component Classes
```css
.cyberpunk-button     /* Primary button */
.cyberpunk-card       /* Card container */
.cyberpunk-input      /* Input field */
.cyberpunk-badge      /* Status badge */
```

### Utility Classes
```css  
.text-cyberpunk-accent  /* Accent text color */
.bg-cyberpunk-card      /* Card background */
.cyberpunk-neon-glow    /* Neon glow effect */
```

## 💡 Advanced Features

- **System Integration** - Respects `prefers-color-scheme`
- **Keyboard Shortcuts** - `Alt+Shift+T` cycles themes
- **Accessibility** - Focus rings, high contrast, reduced motion
- **Performance** - CSS-native switching, no JavaScript required
- **Type Safety** - Full TypeScript support

## 📂 File Structure

```
themes/
├── index.css           # Main theme imports
├── site/              # Website themes  
│   ├── default.css
│   ├── dark.css
│   ├── terminal.css
│   ├── cyberpunk.css
│   ├── ocean.css  
│   ├── paper.css
│   └── sunset.css
├── application/       # Application themes
│   ├── terminal-v4.css
│   ├── terminal-hybrid.css  
│   └── directory.css
└── README.md         # This file
```

## 🔄 Migration Benefits

**From TypeScript to CSS v4:**
- ⚡️ Better performance (CSS-native)
- 🎯 Tailwind v4 alignment  
- 🛠 Improved developer experience
- 🎨 Enhanced visual effects
- ♿️ Better accessibility
- 🌐 Browser integration

## 📖 Usage Examples

### TypeScript API
```typescript
// Get themes
const allThemes = getAllThemes();
const siteThemes = getThemesByType('site');
const darkThemes = getThemesByColorScheme('dark');

// CSS variables
const accentColor = getCSSVariable('--color-accent');
setCSSVariable('--color-custom', '#ff0000');

// Class utilities
const buttonClass = cx('btn', theme?.type === 'dark' && 'dark-variant');
```

### React Integration
```tsx
function App() {
  useEffect(() => {
    initThemeSystem();
  }, []);
  
  return <ThemeSelector />;
}
```

This system provides a robust, scalable foundation for theming with Tailwind CSS v4! 🎉