'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const experience = [
    {
        prompt: '01',
        role: 'CTO · 4×',
        body: 'Engineering leadership across four startups, seed through Series B. Hired, shipped, scaled — and stayed close enough to the code to know which lines hurt.',
    },
    {
        prompt: '02',
        role: 'Founder · 2×',
        body: 'Built two companies from the napkin up. b2b and b2c. Two very different ways for software to disappoint people, two very different ways to make it not.',
    },
    {
        prompt: '03',
        role: 'Meta · Engineering',
        body: 'Infrastructure and developer tools. The systems other engineers stand on. The stuff you only notice when it breaks — so the goal is, you don\'t.',
    },
];

const stack = [
    { label: 'lang', items: ['TypeScript', 'Python', 'Go', 'Rust', 'Swift'] },
    { label: 'front', items: ['React', 'Next.js', 'Tauri', 'SwiftUI'] },
    { label: 'back', items: ['Node', 'FastAPI', 'GraphQL', 'gRPC'] },
    { label: 'infra', items: ['AWS', 'GCP', 'Kubernetes', 'Terraform'] },
    { label: 'data', items: ['Postgres', 'Redis', 'DynamoDB', 'Mongo'] },
];

const now = [
    'shipping local-first tools, mostly Tauri + React',
    'sketching small things in Swift on the side',
    'technical notes here, essays on arach.io',
    'coding every day. it\'s the whole bit.',
];

const elsewhere: { label: string; handle: string; href: string }[] = [
    { label: 'writing', handle: 'arach.io', href: 'https://arach.io' },
    { label: 'github', handle: '@arach', href: 'https://github.com/arach' },
    { label: 'linkedin', handle: 'in/arach', href: 'https://www.linkedin.com/in/arach/' },
    { label: 'x', handle: '@arach', href: 'https://x.com/arach' },
];

function SectionHead({ index, children, aside }: { index: string; children: React.ReactNode; aside?: React.ReactNode }) {
    return (
        <div className="section-head">
            <h2 className="fig" style={{ color: 'var(--theme-text-color)' }}>
                ( {index} ) {children}
            </h2>
            {aside ? <span className="fig">{aside}</span> : null}
        </div>
    );
}

const rowBorder: React.CSSProperties = { borderColor: 'var(--theme-border-color)' };

export default function AboutPage() {
    return (
        <div className="px-4 pb-8 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <header className="relative pb-14 pt-12 sm:pb-16 sm:pt-20">
                    <div aria-hidden className="bp-grid pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2" />
                    <div className="fig flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                        <span>( 03 ) whoami</span>
                        <span>4× ex-CTO · 2× ex-founder · ex-Meta engineering</span>
                    </div>
                    <h1 className="mt-8 text-[40px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
                        Arach Tchoupani<span style={{ color: 'var(--theme-accent-color)' }}>.</span>
                    </h1>
                    <p className="mt-6 max-w-[56ch] text-[17px] font-normal leading-[1.65] sm:text-[18px]" style={{ color: 'var(--theme-muted-color)' }}>
                        I build software with my hands on the keys. Mostly local-first tools,
                        developer experience, and the parts of products that have to feel right —
                        the typography, the shortcuts, the empty state, the quiet click.
                        Currently between San Francisco and Montreal.
                    </p>
                </header>

                <section className="mb-16">
                    <SectionHead index="01" aside="2014 – now">Experience</SectionHead>
                    <ol className="border-t" style={rowBorder}>
                        {experience.map((item) => (
                            <li key={item.prompt} className="grid gap-2 border-b py-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8" style={rowBorder}>
                                <h3 className="fig flex gap-3" style={{ color: 'var(--theme-text-color)' }}>
                                    <span className="tabular-nums" style={{ color: 'var(--theme-faint-color)' }}>{item.prompt}</span>
                                    {item.role}
                                </h3>
                                <p className="max-w-[60ch] text-[16px] font-normal leading-[1.65]" style={{ color: 'var(--theme-muted-color)' }}>
                                    {item.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="mb-16">
                    <SectionHead index="02">Stack</SectionHead>
                    <ul className="border-t" style={rowBorder}>
                        {stack.map((row) => (
                            <li key={row.label} className="grid gap-1 border-b py-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8" style={rowBorder}>
                                <span className="fig">{row.label}</span>
                                <span className="font-mono text-[13px]">
                                    {row.items.map((item, i) => (
                                        <span key={item}>
                                            {i > 0 ? <span style={{ color: 'var(--theme-faint-color)' }}>{' / '}</span> : null}
                                            {item}
                                        </span>
                                    ))}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-16">
                    <SectionHead index="03">Now</SectionHead>
                    <ul className="border-t" style={rowBorder}>
                        {now.map((line) => (
                            <li key={line} className="flex gap-3 border-b py-3 text-[16px] font-normal" style={rowBorder}>
                                <span style={{ color: 'var(--theme-accent-color)' }}>›</span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12">
                    <SectionHead index="04">Elsewhere</SectionHead>
                    <ul className="grid grid-cols-1 border-l border-t sm:grid-cols-2 lg:grid-cols-4" style={rowBorder}>
                        {elsewhere.map(({ label, href, handle }) => (
                            <li key={label} className="border-b border-r" style={rowBorder}>
                                <a
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group flex items-start justify-between gap-3 px-4 py-4 transition-colors hover:bg-[color:var(--theme-card-bg)]"
                                >
                                    <span className="flex flex-col gap-1">
                                        <span className="fig">{label}</span>
                                        <span className="font-mono text-sm transition-colors group-hover:text-[color:var(--theme-accent-color)]">{handle}</span>
                                    </span>
                                    <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <div className="fig mt-12 flex justify-end">
                    <Link href="/about/terminal" className="link-quiet inline-flex items-center gap-2">
                        <span style={{ color: 'var(--theme-accent-color)' }}>&gt;</span>
                        <span>./terminal</span>
                        <span className="terminal-cursor" aria-hidden>▍</span>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes terminalBlink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .terminal-cursor {
                    display: inline-block;
                    color: var(--theme-accent-color);
                    animation: terminalBlink 1.1s steps(1) infinite;
                }
            `}</style>
        </div>
    );
}
