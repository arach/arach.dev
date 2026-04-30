'use client';

export function Masthead() {
  return (
    <header className="mb-8 sm:mb-10">
      <div
        className="border-b pb-4 sm:pb-5"
        style={{ borderColor: 'var(--theme-border-color)' }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px]"
              style={{ color: 'var(--theme-muted-color)', opacity: 0.78 }}
            >
              arach.dev
            </div>
            <h1
              className="mt-2 max-w-2xl text-[18px] leading-[1.45] sm:text-[21px]"
              style={{
                color: 'var(--theme-text-color)',
                fontFamily: 'var(--font-spectral)',
              }}
            >
              Building local-first tools, agent infrastructure, and software systems.
            </h1>
          </div>

          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] sm:justify-end"
            style={{ color: 'var(--theme-muted-color)', opacity: 0.72 }}
          >
            <span>selected work</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>montreal / sf</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>2026</span>
          </div>
        </div>

        <div
          className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px]"
          style={{ color: 'var(--theme-muted-color)', opacity: 0.66 }}
        >
          <span>OpenScout</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Lattices</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Linea</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Dewey</span>
        </div>
      </div>
    </header>
  );
}
