import { headers } from 'next/headers';
import { cookies } from 'next/headers';

// Server component that only includes the active theme's CSS
export async function ThemeStylesheet() {
  // Get theme from cookie (set by client)
  const cookieStore = cookies();
  const theme = cookieStore.get('site-theme')?.value || 'default';
  
  // Map of theme IDs to their CSS imports
  const themeStyles: Record<string, string> = {
    default: '/styles/themes/default.css',
    dark: '/styles/themes/dark.css', 
    terminal: '/styles/themes/terminal.css',
    ocean: '/styles/themes/ocean.css',
    cyberpunk: '/styles/themes/cyberpunk.css',
  };

  const themePath = themeStyles[theme] || themeStyles.default;

  return (
    <>
      {/* Base variables that all themes use */}
      <link rel="stylesheet" href="/styles/themes/base.css" />
      {/* Active theme only */}
      <link rel="stylesheet" href={themePath} data-theme-stylesheet={theme} />
    </>
  );
}