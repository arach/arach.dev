import Link from 'next/link';

export const metadata = {
  title: 'labs · arach.dev',
  description: 'Visual prototypes and experiments.',
};

export default function LabsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.16em] mb-3"
          style={{ color: 'var(--theme-muted-color)' }}
        >
          labs
        </div>
        <h1 className="text-2xl font-medium tracking-tight">Visual prototypes</h1>
      </header>

      <ul className="space-y-3">
        <li>
          <Link
            href="/labs/stream"
            className="group flex items-baseline gap-3 font-mono text-[13px]"
          >
            <span style={{ color: 'var(--theme-accent-color)', opacity: 0.6 }}>/labs/stream</span>
            <span
              className="transition-opacity group-hover:opacity-80"
              style={{ color: 'var(--theme-muted-color)' }}
            >
              — developer log homepage prototype
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/labs/branches"
            className="group flex items-baseline gap-3 font-mono text-[13px]"
          >
            <span style={{ color: 'var(--theme-accent-color)', opacity: 0.6 }}>/labs/branches</span>
            <span
              className="transition-opacity group-hover:opacity-80"
              style={{ color: 'var(--theme-muted-color)' }}
            >
              — branch tree · project-centric · 3 card styles
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/labs/ops"
            className="group flex items-baseline gap-3 font-mono text-[13px]"
          >
            <span style={{ color: 'var(--theme-accent-color)', opacity: 0.6 }}>/labs/ops</span>
            <span
              className="transition-opacity group-hover:opacity-80"
              style={{ color: 'var(--theme-muted-color)' }}
            >
              — on the keys · paper, breath, works
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
