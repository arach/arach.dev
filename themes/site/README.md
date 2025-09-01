# Site Themes

Simple, elegant themes for the arach.dev website. These themes provide visual variety through color schemes and typography choices.

## Available Themes

- **Default** - Clean, light theme with blue accents
- **Midnight** - Dark theme with soft contrasts  
- **Terminal** - Monospace terminal aesthetic
- **Deep Ocean** - Ocean-inspired blues and teals
- **Golden Hour** - Warm sunset colors
- **Cyber Neon** - Cyberpunk-inspired with gradients
- **Vintage Paper** - Paper and ink aesthetic

## Theme Structure

Each theme defines:
- **colors**: Background, text, accent, muted, border, card, shadow
- **header**: Header background, text color, font
- **typography**: Heading, body, and code fonts
- **effects**: Dot opacity, blur effects

## Adding a New Theme

1. Create a new file: `themes/site/mytheme.theme.ts`
2. Export a theme object following the existing structure
3. Import and add to `theme-provider-clean.tsx`

Example:
```typescript
export const myTheme = {
  name: 'My Theme',
  id: 'mytheme',
  colors: {
    bg: '#ffffff',
    text: '#000000',
    accent: '#0066cc',
    // ...
  },
  // ...
} as const;
```