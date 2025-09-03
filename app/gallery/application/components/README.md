# Gallery Components

This directory contains the modular components for the Gallery application, organized for better maintainability and navigation.

## Component Structure

### Core Components

- **`GalleryHeader.tsx`** - Top navigation bar with theme selector, dark mode toggle, and pinned styles button
- **`SidebarNavigation.tsx`** - Left sidebar with section navigation
- **`RightPanel.tsx`** - Right panel container that shows either pinned styles or style details
- **`PinnedStylesPanel.tsx`** - Displays the collection of pinned styles
- **`StyleDetailsPanel.tsx`** - Shows detailed information about selected elements

### Benefits of This Structure

1. **Easier Navigation** - Each component has a clear, single responsibility
2. **Better Maintainability** - Changes to specific UI areas are isolated
3. **Cleaner Main Page** - The main `page.tsx` is now much more readable
4. **Reusable Components** - Components can be easily imported and used elsewhere
5. **Type Safety** - Each component has proper TypeScript interfaces

## Usage

```tsx
import {
  GalleryHeader,
  SidebarNavigation,
  RightPanel
} from './components'
```

## Main Page Structure

The main `page.tsx` now has a clean outline:

1. **Imports and Types** - Clear dependencies and type definitions
2. **Utility Functions** - Helper functions for element enhancement and theme management
3. **Header Components** - Tactical header and section headers
4. **Main Gallery Content** - Clean, focused component that orchestrates the UI
5. **Component Imports** - All UI components imported from separate files

This makes it much easier to:
- Navigate the theming system
- Understand the styling structure
- Make changes to specific UI areas
- Debug issues in isolated components
