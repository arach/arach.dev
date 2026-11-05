const NOW = ['OpenScout', 'Lattices', 'Linea', 'Dewey'];

export function Masthead() {
  return (
    <header className="relative pb-14 pt-12 sm:pb-20 sm:pt-20">
      {/* Full-bleed blueprint grid behind the hero. */}
      <div
        aria-hidden
        className="bp-grid pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
      />

      <div className="fig flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span>( 00 ) arach.dev · technical index</span>
        <span>Montreal / SF · 2026</span>
      </div>

      <h1 className="mt-8 max-w-[18ch] text-[38px] font-bold leading-[1.02] tracking-[-0.035em] sm:mt-10 sm:text-[56px]">
        Building local-first tools, agent infrastructure, and software systems.
      </h1>

      <p
        className="mt-6 max-w-[52ch] text-[17px] font-normal leading-[1.6] sm:text-[18px]"
        style={{ color: 'var(--theme-muted-color)' }}
      >
        Projects, source, and technical notes by Arach Tchoupani. Essays and longer
        writing live on{' '}
        <a
          href="https://arach.io"
          className="underline decoration-1 underline-offset-4 transition-colors hover:text-[color:var(--theme-accent-color)]"
          style={{ color: 'var(--theme-text-color)', textDecorationColor: 'var(--theme-border-color)' }}
        >
          arach.io
        </a>
        .
      </p>

      <div className="fig mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span style={{ color: 'var(--theme-accent-color)' }}>Now</span>
        {NOW.map((name) => (
          <span key={name} className="contents">
            <span style={{ color: 'var(--theme-faint-color)' }}>/</span>
            <span style={{ color: 'var(--theme-text-color)' }}>{name}</span>
          </span>
        ))}
      </div>
    </header>
  );
}
