import Link from 'next/link'
import { getThemeIds } from '@/lib/theme/application/registry'

interface GalleryHeaderProps {
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
  uiAnimations: boolean
  setUiAnimations: (animations: boolean) => void
  pinnedStyles: any[]
  showPinnedPanel: boolean
  setShowPinnedPanel: (show: boolean) => void
  activeTheme: string
  setActiveTheme: (theme: string) => void
  activeSection: string
  updateURL: (section?: string, theme?: string) => void
}

export function GalleryHeader({ 
  darkMode, 
  setDarkMode, 
  uiAnimations, 
  setUiAnimations, 
  pinnedStyles, 
  showPinnedPanel, 
  setShowPinnedPanel,
  activeTheme,
  setActiveTheme,
  activeSection,
  updateURL
}: GalleryHeaderProps) {
  return (
    <header id="gallery-header" className={`border-b border-slate-700/40 bg-slate-900/95 backdrop-blur-md sticky top-0 z-30 py-1 px-6 ${uiAnimations ? 'transition-all duration-300' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1 text-sm text-primary hover:text-primary bg-card/20 hover:bg-card/30 border border-primary/30 hover:border-primary rounded-md transition-all duration-200"
            title="Back to arach.dev"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            arach.dev
          </Link>
          
          <div className={`${uiAnimations ? 'transition-all duration-300' : ''}`}>
            <h1 className="font-mono text-lg font-bold text-foreground uppercase tracking-wide">
              Gallery
            </h1>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn-ghost btn-sm flex items-center gap-2"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {darkMode ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              ) : (
                <>
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </>
              )}
            </svg>
            <span className="text-[10px]">{darkMode ? 'Dark' : 'Light'}</span>
          </button>

          {/* UI Animations Toggle */}
          <button
            onClick={() => setUiAnimations(!uiAnimations)}
            className={`btn-ghost btn-sm flex items-center gap-2`}
            title={uiAnimations ? 'Disable UI Chrome animations' : 'Enable UI Chrome animations'}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={uiAnimations ? '' : 'opacity-50'}
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              {uiAnimations && <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>}
            </svg>
            <span className="text-[10px]">{uiAnimations ? 'UI FX On' : 'UI FX Off'}</span>
          </button>

          {/* Pinned Styles Button */}
          <button
            onClick={() => setShowPinnedPanel(!showPinnedPanel)}
            className={`relative text-[10px] px-2 py-1 ${
              showPinnedPanel || pinnedStyles.length > 0
                ? 'btn-primary' 
                : 'btn-secondary'
            }`}
          >
            Pinned
            {pinnedStyles.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {pinnedStyles.length}
              </span>
            )}
          </button>

          {/* Theme Selector */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-muted-foreground">Theme:</label>
            <select 
              value={activeTheme}
              onChange={(e) => {
                setActiveTheme(e.target.value)
                updateURL(activeSection, e.target.value)
              }}
              className="bg-input border border-border rounded-md px-2 py-0.5 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {getThemeIds().map((themeId) => (
                <option key={themeId} value={themeId}>
                  {themeId.charAt(0).toUpperCase() + themeId.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
