import { PinnedStylesPanel } from './PinnedStylesPanel'
import { StyleDetailsPanel } from './StyleDetailsPanel'

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
  return (
    <>
      {/* Right Panel - Style Details or Pinned Styles - Fixed position */}
      {showRightSidebar && (
        <aside id="gallery-sidebar-right" className="w-96 fixed right-0 border-l border-slate-700/40 bg-slate-900/80 backdrop-blur-md overflow-y-auto transition-all duration-200 shadow-xl shadow-black/20 z-20 gallery-top-offset gallery-panel-height">
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sticky top-0 pb-4 border-b border-slate-700/40 bg-slate-900/95">
              <h2 className="text-lg font-semibold text-slate-200">
                {showPinnedPanel ? 'Pinned Styles' : 'Style Details'}
              </h2>
              <div className="flex items-center gap-2">
                {showPinnedPanel && pinnedStyles.length > 0 && (
                  <button
                    onClick={clearAllPinned}
                    className={`text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-400/10 ${uiAnimations ? 'transition-colors' : ''}`}
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowRightSidebar(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
                  title="Collapse sidebar"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {showPinnedPanel ? (
              <PinnedStylesPanel pinnedStyles={pinnedStyles} unpinStyle={unpinStyle} />
            ) : selectedElement && (
              <StyleDetailsPanel 
                selectedElement={selectedElement} 
                pinStyle={pinStyle} 
                isStylePinned={isStylePinned} 
              />
            )}
          </div>
        </aside>
      )}

      {/* Right Sidebar Expand Button */}
      {!showRightSidebar && (
        <div className="flex items-start pt-6">
          <button
            onClick={() => setShowRightSidebar(true)}
            className="p-2 border-l border-slate-700/40 bg-slate-900/95 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all duration-200 rounded-l-md"
            title="Expand details sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
