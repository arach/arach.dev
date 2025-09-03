interface SidebarNavigationProps {
  showLeftSidebar: boolean
  setShowLeftSidebar: (show: boolean) => void
  sections: Array<{ id: string; label: string }>
  activeSection: string
  setActiveSection: (section: string) => void
  updateURL: (section: string) => void
  setSelectedElement: (element: any) => void
  uiAnimations: boolean
}

export function SidebarNavigation({ 
  showLeftSidebar, 
  setShowLeftSidebar, 
  sections, 
  activeSection, 
  setActiveSection, 
  updateURL, 
  setSelectedElement,
  uiAnimations 
}: SidebarNavigationProps) {
  return (
    <nav id="gallery-sidebar-left" className={`${showLeftSidebar ? 'w-64' : 'w-12'} fixed left-0 border-r border-slate-700/40 bg-slate-900/80 backdrop-blur-md shadow-xl shadow-black/10 ${uiAnimations ? 'transition-all duration-200' : ''} overflow-y-auto z-20 gallery-top-offset gallery-panel-height`}>
      {showLeftSidebar ? (
        <div>
          <div className="flex items-center justify-between mb-4 px-6 pt-6">
            <div role="heading" aria-level={2} className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Sections</div>
            <button
              onClick={() => setShowLeftSidebar(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
              title="Collapse sidebar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          </div>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    setActiveSection(section.id)
                    updateURL(section.id)
                    setSelectedElement(null)
                  }}
                  className={`w-full text-left px-6 py-2.5 text-sm transition-colors ${
                    activeSection === section.id
                      ? 'text-slate-200 bg-slate-800/50 border-l-2 border-cyan-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="p-6 flex justify-center">
            <button
              onClick={() => setShowLeftSidebar(true)}
              className="p-2 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
              title="Expand navigation sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
