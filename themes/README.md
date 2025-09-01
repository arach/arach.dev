# Theme System Architecture

This directory contains two distinct theming systems with different purposes and scopes:

## 📁 `/site` - Website Themes
Simple visual themes for the landing page and main website.
- **Purpose**: User-selectable color schemes and fonts for the website
- **Scope**: Landing page styling - colors, fonts, basic mood
- **Used by**: Main website via `ThemeProvider` component
- **Examples**: Default, Midnight, Terminal, Deep Ocean, Golden Hour, Cyber Neon, Vintage Paper

## 📁 `/application` - Application UI Themes  
Comprehensive theming system for full application user interfaces.
- **Purpose**: Complete UI pattern theming for application development
- **Scope**: Buttons, forms, alerts, data visualizations, hover states, interactions
- **Used by**: Styleguide and design system documentation
- **Similar to**: Material Design, Carbon Design, Ant Design (theming layer only)

## Key Differences

| Aspect | Site Themes | Application Themes |
|--------|-------------|-------------------|
| Complexity | Simple (colors & fonts) | Comprehensive (full UI patterns) |
| Variables | ~10-15 CSS variables | 50+ CSS variables |
| Components | Basic HTML elements | Complex UI components |
| States | Minimal | Hover, focus, active, disabled, etc. |
| Purpose | Website appearance | Application consistency |

## Usage

### Site Themes
```tsx
import { useTheme } from '@/lib/theme-provider-clean';
```

### Application Themes
```tsx
import { getTheme } from '@/themes/application';
```