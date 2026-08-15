import Link from 'next/link';

import type { Project } from '@/lib/projects';
import type { IdeaSummary } from '@/lib/ideas';

import { BreathStamp, ChevronStrip } from './deco';

const TICKER = [
  'ARACH.DEV — ON THE KEYS',
  'BREATHE LIFE',
  'META CREATORS',
  'MONTREAL · NEW YORK · SF',
  'LOCAL-FIRST / AGENT TOOLS',
  'STATUS — BUILDING',
];

const SCREENSHOTS = new Set([
  'openscout',
  'lattices',
  'linea',
  'hud',
  'talkie',
  'fabric',
  'dewey',
  'og',
  'vif',
  'arc',
  'speakeasy',
  'hooked',
  'blink',
  '2048ish',
]);

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function shotFor(slug: string) {
  return SCREENSHOTS.has(slug) ? `/screenshots/${slug}.png` : undefined;
}

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="ops-ticker" aria-hidden>
      <div className="ops-ticker-track items-center gap-8 px-4 py-1.5">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-[var(--ops-muted)]">
              {item}
            </span>
            <span className="text-[8px] text-[var(--ops-breath)]">▸▸▸</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function OpsLab({
  projects,
  ideas,
  plates,
}: {
  projects: Project[];
  ideas: IdeaSummary[];
  plates: {
    wash?: string;
    hero?: string;
    keys?: string;
    grain?: string;
  };
}) {
  const [lead, ...rest] = projects;

  return (
    <div
      className="ops-root ops-wash -mt-0"
      style={{
        ['--ops-wash-image' as string]: plates.wash ? `url(${plates.wash})` : 'none',
        ['--ops-grain-image' as string]: plates.grain ? `url(${plates.grain})` : 'none',
      }}
    >
      <Ticker />

      <nav className="border-b" style={{ borderColor: 'var(--ops-rule)' }}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold" style={{ color: 'var(--ops-breath)' }}>
              ▸
            </span>
            <span className="ops-display text-[22px] tracking-normal">arach.dev</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#works" className="ops-label hover:opacity-70">
              Works
            </a>
            <Link href="/ideas" className="ops-label hover:opacity-70">
              Ideas
            </Link>
            <Link href="/about" className="ops-label hover:opacity-70">
              About
            </Link>
            <a
              href="https://github.com/arach"
              target="_blank"
              rel="noopener noreferrer"
              className="border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-[var(--ops-ink)] hover:text-[var(--ops-paper)]"
              style={{ borderColor: 'var(--ops-ink)', borderRadius: 2 }}
            >
              github
            </a>
          </div>
          <Link href="/labs" className="ops-label md:hidden">
            [ labs ]
          </Link>
        </div>
      </nav>

      <div
        className="border-b px-4 py-2 sm:px-6 lg:px-8"
        style={{ borderColor: 'var(--ops-rule)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <p className="ops-label">[ lab / ops ] — on the keys</p>
          <div className="flex items-center gap-4">
            <Link href="/labs" className="ops-label hover:opacity-70">
              ← labs
            </Link>
            <Link href="/" className="ops-label hover:opacity-70">
              live site →
            </Link>
          </div>
        </div>
      </div>

      <section id="works" className="relative pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--ops-rule)' }}>
            <div>
              <p className="ops-label mb-2">[ 001 / on the keys ]</p>
              <h2 className="ops-display text-4xl sm:text-5xl">
                Selected <span className="ops-invert">works</span>
              </h2>
            </div>
            <p className="ops-label flex items-center gap-3">
              {projects.length} active surfaces
              <ChevronStrip className="h-3 w-16 opacity-40" />
            </p>
          </div>

          {plates.keys ? (
            <div className="mb-4 h-10 overflow-hidden sm:h-12" style={{ borderRadius: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={plates.keys} alt="" className="h-full w-full object-cover object-center opacity-45" />
            </div>
          ) : null}

          {lead ? <FeaturedWork project={lead} /> : null}

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {rest.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section id="identity" className="relative overflow-hidden border-t" style={{ borderColor: 'var(--ops-rule)' }}>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex items-start justify-between gap-10">
            <div className="max-w-3xl">
              <p className="ops-label mb-4">
                [ 002 / identity ] — breathe life · meta creators
              </p>
              <h1
                className="max-w-xl text-[1.35rem] font-medium leading-[1.35] tracking-[-0.02em] sm:text-[1.6rem]"
                style={{ fontFamily: 'var(--ops-display)' }}
              >
                Arach Tchoupani
              </h1>
              <p
                className="mt-4 max-w-xl text-[15px] leading-[1.65]"
                style={{ color: 'var(--ops-muted)' }}
              >
                Local-first tools for AI agents, including typography,
                keyboard shortcuts, and interaction design.
              </p>
            </div>
            <div className="relative hidden w-36 shrink-0 overflow-hidden rounded-full lg:block">
              {plates.hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={plates.hero} alt="" className="w-full scale-110" />
              ) : (
                <BreathStamp className="w-full opacity-80" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="record" className="border-t" style={{ borderColor: 'var(--ops-rule)' }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="ops-label mb-3">[ 003 / on record ]</p>
          <h2 className="ops-display text-4xl sm:text-5xl">Writing</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Link
              href="/ideas"
              className="ops-work group border p-6 transition-colors hover:border-[var(--ops-ink)] lg:col-span-2"
              style={{ borderColor: 'var(--ops-rule)', borderRadius: 2 }}
            >
              <p className="ops-label mb-4">/ideas</p>
              <h3 className="ops-display text-3xl">Systems, tools, and product shape</h3>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.65]" style={{ color: 'var(--ops-muted)' }}>
                Notes on structure, local-first tools, and the way software
                gets clearer or more confused over time.
              </p>
              {ideas.length > 0 ? (
                <ul className="mt-6 space-y-2">
                  {ideas.slice(0, 3).map((idea) => (
                    <li key={idea.slug} className="flex items-baseline gap-3 font-mono text-[12px]">
                      <span>{idea.title}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--ops-breath)' }}>
                Read ↗
              </span>
            </Link>

            <Link
              href="/about/terminal"
              className="ops-work border border-dashed p-5 transition-colors hover:border-[var(--ops-ink)]"
              style={{ borderColor: 'var(--ops-rule)', borderRadius: 2 }}
            >
              <div className="font-mono text-[12px]" style={{ color: 'var(--ops-muted)' }}>
                <span style={{ color: 'var(--ops-breath)' }}>{'$'}</span>
                {' ssh arach.dev'}
                <span className="ml-1 inline-block h-3 w-1.5 align-middle bg-[var(--ops-muted)]" />
              </div>
              <p className="ops-label mt-3">The terminal still boots. ↗</p>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t-2" style={{ borderColor: 'var(--ops-rule)' }}>
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end lg:px-8">
          <div>
            <div className="ops-display text-3xl">Arach Tchoupani</div>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.08em]" style={{ color: 'var(--ops-muted)' }}>
              On the keys — Montreal / SF
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.12em]">
            <a href="https://github.com/arach" className="hover:opacity-70">GitHub ↗</a>
            <Link href="/about" className="hover:opacity-70">About ↗</Link>
            <a href="mailto:arach@arach.dev" className="hover:opacity-70">Email ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeaturedWork({ project }: { project: Project }) {
  const shot = shotFor(project.slug);
  const liveUrl = project.links.website || project.links.demo;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="ops-work group relative block overflow-hidden border transition-colors hover:border-[var(--ops-ink)]"
      style={{ borderColor: 'var(--ops-rule)', borderRadius: 2 }}
    >
      <div className="grid gap-0 lg:grid-cols-[1.05fr_1.2fr]">
        <div className="flex flex-col px-5 py-6 sm:px-7 sm:py-8">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="ops-label">01 /</span>
            <span className="bg-[var(--ops-ink)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--ops-paper)]">
              lead · active
            </span>
            <span className="ops-label">{project.tags[0]}</span>
          </div>
          <h3 className="ops-display text-[2.4rem] sm:text-[3.1rem]">{project.title}</h3>
          <p className="mt-3 max-w-md text-[15px] leading-[1.6]" style={{ color: 'var(--ops-muted)' }}>
            {project.preview || project.description}
          </p>
          <div className="mt-auto flex items-center gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span style={{ color: 'var(--ops-breath)' }}>read ↗</span>
            {liveUrl ? <span style={{ color: 'var(--ops-muted)' }}>live</span> : null}
          </div>
        </div>
        {shot ? (
          <div className="relative h-[220px] overflow-hidden border-t sm:h-[260px] lg:h-auto lg:min-h-full lg:border-l lg:border-t-0" style={{ borderColor: 'var(--ops-rule)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot}
              alt=""
              className="h-full w-full object-cover object-top opacity-95 transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const shot = shotFor(project.slug);
  const lang = project.tech[0] ?? project.tags[0] ?? 'code';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="ops-work group relative flex flex-col overflow-hidden border transition-colors hover:border-[var(--ops-ink)]"
      style={{ borderColor: 'var(--ops-rule)', borderRadius: 2 }}
    >
      {shot ? (
        <div className="relative h-36 overflow-hidden border-b sm:h-40" style={{ borderColor: 'var(--ops-rule)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot}
            alt=""
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="ops-label tabular-nums">{pad(index + 1)} /</span>
          <span className="ops-label">{project.tags[0]}</span>
        </div>
        <h3 className="ops-display text-[1.85rem] leading-none sm:text-[2.1rem]">{project.title}</h3>
        <p className="mt-2 flex-1 text-[14px] leading-[1.55]" style={{ color: 'var(--ops-muted)' }}>
          {project.description}
        </p>
        <div className="mt-4 flex items-center justify-between font-mono text-[11px]" style={{ color: 'var(--ops-muted)' }}>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: project.color || 'var(--ops-breath)' }} />
            {lang}
          </span>
          <span className="uppercase tracking-[0.16em] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--ops-breath)' }}>
            open ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
