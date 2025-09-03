interface StyleDetailsPanelProps {
  selectedElement: any
  pinStyle: (element: any) => void
  isStylePinned: (element: any) => boolean
}

export function StyleDetailsPanel({ selectedElement, pinStyle, isStylePinned }: StyleDetailsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Element Info */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="frame-subheading">{selectedElement.name}</h3>
          <button
            onClick={() => pinStyle(selectedElement)}
            disabled={isStylePinned(selectedElement)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              isStylePinned(selectedElement)
                ? 'text-muted-foreground bg-muted cursor-not-allowed'
                : 'text-primary bg-primary/10 hover:bg-primary/20'
            }`}
          >
            {isStylePinned(selectedElement) ? 'Pinned' : 'Pin'}
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{selectedElement.description}</p>
      </div>

      {/* CSS Classes */}
      {selectedElement.classes && (
        <div>
          <h4 className="frame-subheading mb-2">CSS Classes</h4>
          <div className="bg-muted rounded-md p-3 font-mono text-xs text-foreground overflow-x-auto">
            <code>{selectedElement.classes}</code>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(selectedElement.classes)}
            className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Copy classes
          </button>
        </div>
      )}

      {/* Color Info */}
      {selectedElement.color && (
        <div>
          <h4 className="frame-subheading mb-2">Color</h4>
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-md border border-border"
              style={{ backgroundColor: selectedElement.color }}
            />
            <div>
              <div className="text-sm text-foreground font-mono">{selectedElement.color}</div>
              <div className="text-xs text-muted-foreground">{selectedElement.colorName}</div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Examples */}
      {selectedElement.usage && (
        <div>
          <h4 className="frame-subheading mb-2">Usage</h4>
          <div className="glass-card p-3 font-mono text-xs text-foreground">
            <pre className="whitespace-pre-wrap break-all leading-relaxed">{selectedElement.usage}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
