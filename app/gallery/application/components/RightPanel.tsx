// All right panel functionality consolidated into single component

interface RightPanelProps {
  selectedElement: any
  showPinnedPanel: boolean
  showRightSidebar: boolean
  setShowRightSidebar: (show: boolean) => void
  pinnedStyles: any[]
  clearAllPinned: () => void
  pinStyle: (element: any) => void
  isStylePinned: (element: any) => boolean
  unpinStyle: (id: string) => void
  uiAnimations: boolean
}

export function RightPanel({ 
  selectedElement, 
  showPinnedPanel, 
  showRightSidebar, 
  setShowRightSidebar, 
  pinnedStyles, 
  clearAllPinned, 
  pinStyle, 
  isStylePinned, 
  unpinStyle,
  uiAnimations 
}: RightPanelProps) {
  // Always render when right sidebar should be visible (no early return)

  return (
    <nav 
      id="gallery-sidebar-right" 
      className={`${showRightSidebar ? 'w-96' : 'w-9'} fixed right-0 top-12 bottom-0 gallery-sidebar-right ${uiAnimations ? 'transition-all duration-200' : ''} ${showRightSidebar ? 'overflow-y-auto' : 'overflow-hidden'} z-20`}
    >
      {showRightSidebar ? (
        <div className="flex flex-col h-full">
          {/* Header - Enhanced alignment and consistency */}
          <div className="flex items-center justify-between p-6 pb-0">
            <h2 className="frame-subheading text-gallery-panel-text">
              {showPinnedPanel ? 'Pinned Styles' : 'Style Details'}
            </h2>
            <div className="flex items-center gap-2">
              {showPinnedPanel && pinnedStyles.length > 0 && (
                <button
                  onClick={clearAllPinned}
                  className="gallery-clear-button text-xs font-medium"
                  title="Clear all pinned styles"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowRightSidebar(false)}
                className="gallery-sidebar-right-button p-1.5 rounded-md hover:bg-slate-800/50"
                title="Collapse sidebar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content - Improved container */}
          <div className="flex-1 p-6 overflow-y-auto">
            {showPinnedPanel ? (
              <PinnedStylesContent pinnedStyles={pinnedStyles} unpinStyle={unpinStyle} />
            ) : selectedElement ? (
              <StyleDetailsContent 
                selectedElement={selectedElement} 
                pinStyle={pinStyle} 
                isStylePinned={isStylePinned} 
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setShowRightSidebar(true)}
              className="gallery-sidebar-right-expand p-2 rounded-md"
              title="Expand details sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

// Consolidated Style Details Content
function StyleDetailsContent({ selectedElement, pinStyle, isStylePinned }: {
  selectedElement: any
  pinStyle: (element: any) => void
  isStylePinned: (element: any) => boolean
}) {
  const handleCopy = async (text: string, buttonElement: HTMLButtonElement) => {
    try {
      await navigator.clipboard.writeText(text);
      const originalText = buttonElement.textContent;
      buttonElement.textContent = 'Copied!';
      buttonElement.style.color = '#10b981';
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.style.color = '';
      }, 1500);
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Element Info - Enhanced styling */}
      <div className="gallery-content-card p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="gallery-content-card-title text-lg font-bold mb-2">
              {selectedElement.name || 'Component'}
            </h3>
            <p className="gallery-content-card-description text-sm leading-relaxed opacity-90">
              {selectedElement.description || 'Interactive component element'}
            </p>
          </div>
          <button
            onClick={() => pinStyle(selectedElement)}
            disabled={isStylePinned(selectedElement)}
            className={`gallery-action-button text-xs font-medium flex-shrink-0 ${
              isStylePinned(selectedElement) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={isStylePinned(selectedElement) ? 'Already pinned' : 'Pin this style'}
          >
            {isStylePinned(selectedElement) ? 'Pinned' : 'Pin'}
          </button>
        </div>
      </div>

      {/* CSS Classes - Improved layout */}
      {selectedElement.classes && (
        <div className="gallery-content-card p-5">
          <h4 className="gallery-content-card-title text-base font-bold mb-4">CSS Classes</h4>
          <div className="gallery-code-block p-3 mb-3 rounded-md">
            <code className="gallery-code-text text-xs leading-relaxed break-all">
              {selectedElement.classes}
            </code>
          </div>
          <button
            onClick={(e) => handleCopy(selectedElement.classes, e.target as HTMLButtonElement)}
            className="gallery-copy-button text-xs font-medium"
          >
            Copy Classes
          </button>
        </div>
      )}

      {/* CSS Properties - Enhanced styling */}
      {selectedElement.styles && (
        <div className="gallery-content-card p-5">
          <h4 className="gallery-content-card-title text-base font-bold mb-4">CSS Properties</h4>
          <div className="gallery-code-block p-3 mb-3 rounded-md">
            <code className="gallery-code-text text-xs leading-relaxed">
              {Object.entries(selectedElement.styles).map(([prop, value]) => (
                <div key={prop} className="py-0.5">
                  <span className="text-cyan-300">{prop}</span>
                  <span className="text-slate-400 mx-1">:</span>
                  <span className="text-emerald-300">{String(value)}</span>
                  <span className="text-slate-500">;</span>
                </div>
              ))}
            </code>
          </div>
          <button
            onClick={(e) => handleCopy(
              Object.entries(selectedElement.styles)
                .map(([prop, value]) => `${prop}: ${value};`)
                .join('\n'),
              e.target as HTMLButtonElement
            )}
            className="gallery-copy-button text-xs font-medium"
          >
            Copy CSS
          </button>
        </div>
      )}

      {/* Color Info - Better visual presentation */}
      {selectedElement.color && (
        <div className="gallery-content-card p-5">
          <h4 className="gallery-content-card-title text-base font-bold mb-4">Color</h4>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-md border border-gallery-panel-border shadow-inner"
              style={{ backgroundColor: selectedElement.color }}
              title={selectedElement.color}
            />
            <div className="gallery-code-block px-3 py-1.5 rounded flex-1">
              <code className="gallery-code-text text-xs font-medium">
                {selectedElement.color}
              </code>
            </div>
          </div>
          <button
            onClick={(e) => handleCopy(selectedElement.color, e.target as HTMLButtonElement)}
            className="gallery-copy-button text-xs font-medium"
          >
            Copy Color
          </button>
        </div>
      )}

      {/* Usage Example - Improved formatting */}
      {selectedElement.usage && (
        <div className="gallery-content-card p-5">
          <h4 className="gallery-content-card-title text-base font-bold mb-4">Usage Example</h4>
          <div className="gallery-code-block p-4 mb-3 rounded-md">
            <pre className="gallery-code-text text-xs whitespace-pre-wrap break-words leading-[1.6] overflow-x-auto">
              {selectedElement.usage}
            </pre>
          </div>
          <button
            onClick={(e) => handleCopy(selectedElement.usage, e.target as HTMLButtonElement)}
            className="gallery-copy-button text-xs font-medium"
          >
            Copy Usage
          </button>
        </div>
      )}
    </div>
  )
}

// Consolidated Pinned Styles Content
function PinnedStylesContent({ pinnedStyles, unpinStyle }: {
  pinnedStyles: any[]
  unpinStyle: (id: string) => void
}) {
  if (pinnedStyles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="space-y-3">
          <p className="text-gallery-panel-text text-base font-semibold">No styles pinned yet</p>
          <p className="text-gallery-panel-muted text-sm leading-relaxed opacity-80">
            Click on components to inspect and pin useful styles
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {pinnedStyles.map((pinnedStyle) => (
        <div key={pinnedStyle.id} className="gallery-content-card p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="gallery-content-card-title text-base font-bold">{pinnedStyle.name}</h4>
              <p className="gallery-content-card-description text-sm mt-1.5 leading-relaxed opacity-90">{pinnedStyle.description}</p>
            </div>
            <button
              onClick={() => unpinStyle(pinnedStyle.id)}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gallery-panel-muted hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
              title="Remove from pinned styles"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          {pinnedStyle.classes && (
            <div className="space-y-2">
              <div className="gallery-code-block p-3 rounded-md">
                <code className="gallery-code-text text-xs leading-relaxed break-all">
                  {pinnedStyle.classes}
                </code>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(pinnedStyle.classes)}
                className="gallery-copy-button text-xs font-medium"
              >
                Copy Classes
              </button>
            </div>
          )}

          {pinnedStyle.usage && (
            <details className="group mt-3">
              <summary className="text-xs text-gallery-panel-muted cursor-pointer hover:text-gallery-panel-text transition-colors font-medium flex items-center gap-1">
                <svg className="w-3 h-3 transform group-open:rotate-90 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                View Usage Example
              </summary>
              <div className="mt-3 gallery-code-block p-3 rounded-md">
                <pre className="gallery-code-text text-xs whitespace-pre-wrap break-words leading-[1.6] overflow-x-auto">
                  {pinnedStyle.usage}
                </pre>
              </div>
            </details>
          )}
        </div>
      ))}
    </div>
  )
}
