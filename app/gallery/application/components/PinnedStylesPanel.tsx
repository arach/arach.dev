interface PinnedStylesPanelProps {
  pinnedStyles: any[]
  unpinStyle: (id: string) => void
}

export function PinnedStylesPanel({ pinnedStyles, unpinStyle }: PinnedStylesPanelProps) {
  if (pinnedStyles.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📋</div>
        <p className="text-muted-foreground text-sm">No styles pinned yet</p>
        <p className="text-muted-foreground text-xs mt-2">Click on components to inspect and pin them</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {pinnedStyles.map((pinnedStyle) => (
        <div key={pinnedStyle.id} className="border border-border rounded-lg p-4 bg-muted/30">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="frame-subheading">{pinnedStyle.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{pinnedStyle.description}</p>
            </div>
            <button
              onClick={() => unpinStyle(pinnedStyle.id)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1 hover:bg-destructive/10 rounded"
            >
              ✕
            </button>
          </div>
          
          {pinnedStyle.classes && (
            <div className="mb-3">
              <div className="bg-background rounded p-2 font-mono text-xs text-foreground overflow-x-auto">
                <code>{pinnedStyle.classes}</code>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(pinnedStyle.classes)}
                className="mt-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Copy
              </button>
            </div>
          )}

          {pinnedStyle.usage && (
            <details className="group">
              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                View Usage
              </summary>
              <div className="mt-2 glass-card p-3 font-mono text-xs text-foreground">
                <pre className="whitespace-pre-wrap break-all leading-relaxed">{pinnedStyle.usage}</pre>
              </div>
            </details>
          )}
        </div>
      ))}
    </div>
  )
}
