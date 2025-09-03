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
      className={`${showRightSidebar ? 'w-96' : 'w-9'} fixed right-0 top-12 bottom-0 border-l border-slate-700/40 bg-slate-900/80 backdrop-blur-md shadow-xl shadow-black/10 ${uiAnimations ? 'transition-all duration-200' : ''} ${showRightSidebar ? 'overflow-y-auto' : 'overflow-hidden'} z-20`}
    >
      {showRightSidebar ? (
        <div className="p-6">
          {/* Header - matches left sidebar spacing */}
          <div className="flex items-center justify-between mb-4">
            <div role="heading" aria-level={2} className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-sans">
              {showPinnedPanel ? 'Pinned Styles' : 'Style Details'}
            </div>
            <div className="flex items-center gap-2">
              {showPinnedPanel && pinnedStyles.length > 0 && (
                <button
                  onClick={clearAllPinned}
                  className={`gallery-clear-button ${uiAnimations ? 'transition-colors' : ''}`}
                  title="Clear all pinned styles"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowRightSidebar(false)}
                className="gallery-sidebar-right-button"
                title="Collapse sidebar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div>
            {showPinnedPanel ? (
              <PinnedStylesContent pinnedStyles={pinnedStyles} unpinStyle={unpinStyle} />
            ) : selectedElement ? (
              <StyleDetailsContent 
                selectedElement={selectedElement} 
                pinStyle={pinStyle} 
                isStylePinned={isStylePinned} 
              />
            ) : (
              <div className="text-center py-8 text-gallery-panel-muted">
                <p className="text-sm font-sans">Ready for content</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full pt-6">
          <div className="flex justify-center">
            <button
              onClick={() => setShowRightSidebar(true)}
              className="p-2 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
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
    <div className="space-y-6">
      {/* Element Info */}
      <div className="gallery-content-card p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold gallery-content-card-title font-sans mb-1">
              {selectedElement.name || 'Component'}
            </h3>
            <p className="text-sm gallery-content-card-description font-sans">
              {selectedElement.description || 'Interactive component element'}
            </p>
          </div>
          <button
            onClick={() => pinStyle(selectedElement)}
            disabled={isStylePinned(selectedElement)}
            className={`ml-3 font-sans ${
              isStylePinned(selectedElement)
                ? 'gallery-action-button:disabled'
                : 'gallery-action-button'
            }`}
            title={isStylePinned(selectedElement) ? 'Already pinned' : 'Pin this style'}
          >
            {isStylePinned(selectedElement) ? 'Pinned' : 'Pin'}
          </button>
        </div>
      </div>

      {/* CSS Classes */}
      {selectedElement.classes && (
        <div className="gallery-content-card p-4">
          <h4 className="text-base font-semibold gallery-content-card-title mb-3 font-sans">CSS Classes</h4>
          <div className="gallery-code-block p-3 mb-3">
            <code className="gallery-code-text text-xs break-all">{selectedElement.classes}</code>
          </div>
          <button
            onClick={(e) => handleCopy(selectedElement.classes, e.target as HTMLButtonElement)}
            className="gallery-copy-button text-xs font-sans"
          >
            Copy Classes
          </button>
        </div>
      )}

      {/* CSS Properties */}
      {selectedElement.styles && (
        <div className="gallery-content-card p-4">
          <h4 className="text-base font-semibold gallery-content-card-title mb-3 font-sans">CSS Properties</h4>
          <div className="gallery-code-block p-3 mb-3">
            <code className="gallery-code-text text-xs block">
              {Object.entries(selectedElement.styles).map(([prop, value]) => (
                <div key={prop} className="mb-1">
                  <span className="text-blue-400">{prop}</span>: <span className="text-green-400">{value}</span>;
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
            className="gallery-copy-button text-xs font-sans"
          >
            Copy CSS
          </button>
        </div>
      )}

      {/* Color Info */}
      {selectedElement.color && (
        <div className="gallery-content-card p-4">
          <h4 className="text-base font-semibold gallery-content-card-title mb-3 font-sans">Color</h4>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded border border-gallery-panel-border shadow-sm"
              style={{ backgroundColor: selectedElement.color }}
              title={selectedElement.color}
            />
            <div className="gallery-code-block px-2 py-1">
              <code className="gallery-code-text text-xs">{selectedElement.color}</code>
            </div>
          </div>
          <button
            onClick={(e) => handleCopy(selectedElement.color, e.target as HTMLButtonElement)}
            className="gallery-copy-button text-xs font-sans"
          >
            Copy Color
          </button>
        </div>
      )}

      {/* Usage Example */}
      {selectedElement.usage && (
        <div className="gallery-content-card p-4">
          <h4 className="text-base font-semibold gallery-content-card-title mb-3 font-sans">Usage Example</h4>
          <div className="gallery-code-block p-3 mb-3">
            <pre className="gallery-code-text text-xs whitespace-pre-wrap break-all leading-relaxed">
              {selectedElement.usage}
            </pre>
          </div>
          <button
            onClick={(e) => handleCopy(selectedElement.usage, e.target as HTMLButtonElement)}
            className="gallery-copy-button text-xs font-sans"
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
        <p className="text-gallery-panel-muted text-sm font-sans mb-2">No styles pinned yet</p>
        <p className="text-gallery-panel-muted text-xs font-sans opacity-70">
          Click on components to inspect and pin useful styles
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pinnedStyles.map((pinnedStyle) => (
        <div key={pinnedStyle.id} className="border border-gallery-panel-border rounded-lg p-4 bg-gallery-panel-card">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-base font-semibold text-gallery-panel-text font-sans">{pinnedStyle.name}</h4>
              <p className="text-xs text-gallery-panel-muted mt-1 font-sans">{pinnedStyle.description}</p>
            </div>
            <button
              onClick={() => unpinStyle(pinnedStyle.id)}
              className="text-gallery-panel-muted hover:text-red-400 transition-colors p-1 hover:bg-red-500/20 rounded text-sm"
              title="Remove from pinned styles"
            >
              ✕
            </button>
          </div>
          
          {pinnedStyle.classes && (
            <div className="mb-3">
              <div className="bg-gallery-panel-code rounded p-2 font-mono text-xs text-gallery-panel-code-text overflow-x-auto">
                <code>{pinnedStyle.classes}</code>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(pinnedStyle.classes)}
                className="mt-1 gallery-copy-button text-xs font-sans"
              >
                Copy Classes
              </button>
            </div>
          )}

          {pinnedStyle.usage && (
            <details className="group">
              <summary className="text-xs text-gallery-panel-muted cursor-pointer hover:text-gallery-panel-text transition-colors font-sans">
                View Usage
              </summary>
              <div className="mt-2 bg-gallery-panel-code p-3 font-mono text-xs text-gallery-panel-code-text rounded">
                <pre className="whitespace-pre-wrap break-all leading-relaxed">{pinnedStyle.usage}</pre>
              </div>
            </details>
          )}
        </div>
      ))}
    </div>
  )
}
