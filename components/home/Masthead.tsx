'use client';

export function Masthead() {
  return (
    <header className="mb-14 sm:mb-20">
      <h1 className="text-[3rem] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[5rem]">
        arach
        <span style={{ color: 'var(--theme-muted-color)', opacity: 0.5 }}>.dev</span>
      </h1>

      <p
        className="mt-6 max-w-2xl text-[17px] leading-[1.6] sm:text-[18px] sm:leading-[1.65]"
        style={{ color: 'var(--theme-muted-color)' }}
      >
        4× ex-CTO, 2× ex-founder, ex-Meta engineering. Mostly local-first tools,
        developer experience, and the parts of products that have to feel right —
        the typography, the shortcuts, the empty state, the quiet click.
      </p>

      <p
        className="mt-3 max-w-2xl text-[15px] leading-[1.6] sm:text-[16px]"
        style={{ color: 'var(--theme-muted-color)', opacity: 0.75 }}
      >
        Currently between San Francisco and Montreal — building OpenScout, Lattices, and Linea.
      </p>
    </header>
  );
}
