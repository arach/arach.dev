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
    <nav id="gallery-sidebar-left" className={`${showLeftSidebar ? 'w-64' : 'w-9'} fixed left-0 top-12 bottom-0 border-r border-slate-700/40 bg-slate-900/80 backdrop-blur-md shadow-xl shadow-black/10 ${uiAnimations ? 'transition-all duration-200' : ''} overflow-y-auto z-20`}>
      {showLeftSidebar ? (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div role="heading" aria-level={2} className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-sans">Sections</div>
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
                  className={`w-full text-left px-6 py-2.5 text-sm transition-colors font-sans ${
                    activeSection === section.id
                      ? 'text-white bg-slate-800/70 border-l-2 border-cyan-400 font-medium'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col h-full pt-6">
          <div className="flex justify-center">
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
