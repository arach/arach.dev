# Application Theme Architecture

## Overview
The theme system has 4 main components that work together:

```
CSS Files → Registry → Engine → UI
```

## Components

### 1. **CSS Files** (`themes/application/`)
**Purpose:** Contains all actual styling and theme definitions
**Location:** `themes/application/themes.css` (imports `terminal.css`)
**What it does:**
- Defines CSS variables using Tailwind v4's `@theme` directive
- Creates theme-specific selectors like `[data-theme="terminal"]`
- Handles all visual styling (colors, fonts, components)
- **No JavaScript involved**

```css
/* themes.css */
@import "./terminal.css";

[data-theme="terminal"] {
  --color-background: #09090b;
  --color-primary: #00b4d8;
}
```

### 2. **Registry** (`registry.ts`)
**Purpose:** Store and retrieve theme metadata for the UI
**What it stores:**
- Theme name and description
- Available theme IDs
- **NOT CSS or styling data**

**Functions:**
- `registerTheme(id, metadata)` - Add a theme
- `getTheme(id)` - Get theme metadata
- `getThemeIds()` - List available themes

```typescript
// What's stored:
{
  terminal: { name: "Terminal", description: "..." }
}
```

### 3. **Init** (`init.ts`) 
**Purpose:** Register available themes with the registry
**What it does:**
- Defines theme metadata (name, description)
- Calls `registerTheme()` for each theme
- **Does NOT handle CSS or fonts**

### 4. **Engine** (`engine.ts`)
**Purpose:** Apply themes to the DOM at runtime
**What it does:**
- Sets `data-theme="terminal"` attribute on `document.documentElement`
- Loads external fonts if theme specifies them
- Saves theme preference to localStorage
- **Does NOT generate CSS**

**Functions:**
- `loadTheme(id)` - Apply theme by setting data attribute
- `getSavedTheme()` - Get saved preference
- Font loading utilities

## Data Flow

### Theme Application Flow:
1. **User selects theme** in gallery UI
2. **Gallery calls** `ApplicationThemeEngine.loadTheme("terminal")`
3. **Engine sets** `document.documentElement.setAttribute("data-theme", "terminal")`
4. **CSS responds** with `[data-theme="terminal"]` selectors
5. **Fonts load** if theme specifies external fonts

### Theme Registration Flow:
1. **Init defines** theme metadata
2. **Registry stores** metadata for UI dropdowns
3. **Gallery fetches** available themes via `getThemeIds()`

## File Responsibilities

| File | Handles | Does NOT Handle |
|------|---------|----------------|
| `themes.css` | All styling, colors, fonts | JavaScript, metadata |
| `registry.ts` | Theme metadata storage | CSS, styling, application |
| `init.ts` | Theme registration | CSS, fonts, DOM manipulation |
| `engine.ts` | DOM attributes, font loading | CSS generation, theme storage |

## Current Issues
- Registry validation/factory logic is overcomplicated
- Engine has unused CSS generation code
- Font loading logic may be redundant if fonts are in CSS

## Recommended Simplification
1. **CSS** - Keep as-is, handles all styling
2. **Registry** - Just a simple key-value store for metadata
3. **Init** - Just registers themes
4. **Engine** - Just sets data attributes and loads fonts