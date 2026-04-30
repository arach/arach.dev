'use client';

import Link from 'next/link';
import { ArrowLeft, Github, Mail, Linkedin } from 'lucide-react';

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
    'writing in /ideas when the shape of a problem becomes clear',
    'coding every day. it\'s the whole bit.',
];

const elsewhere: { label: string; handle: string; href: string; Icon: typeof Github }[] = [
    { label: 'github', handle: '@arach', href: 'https://github.com/arach', Icon: Github },
    { label: 'linkedin', handle: 'in/arach', href: 'https://www.linkedin.com/in/arach/', Icon: Linkedin },
    { label: 'email', handle: 'arach@arach.dev', href: 'mailto:arach@arach.dev', Icon: Mail },
];

const cardSurface: React.CSSProperties = {
    background: 'var(--theme-card-bg)',
    borderColor: 'var(--theme-border-color)',
    boxShadow: '0 12px 40px -28px var(--theme-shadow-color)',
};

function PromptHeading({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="mb-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em]"
            style={{ color: 'var(--theme-muted-color)' }}
        >
            <span style={{ color: 'var(--theme-accent-color)' }}>&gt;</span>
            <span>{children}</span>
        </p>
    );
}

export default function AboutPage() {
    return (
        <div className="px-4 py-8 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                        style={{ color: 'var(--theme-muted-color)' }}
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        arach.dev
                    </Link>
                </div>

                <header className="mb-12">
                    <p className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em]">
                        <span style={{ color: 'var(--theme-accent-color)' }}>&gt;</span>
                        <span style={{ color: 'var(--theme-muted-color)' }}>whoami</span>
                    </p>
                    <h1 className="mt-3 text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.25rem]">
                        Arach Tchoupani
                        <span style={{ color: 'var(--theme-accent-color)' }}>.</span>
                    </h1>
                    <p
                        className="mt-2 font-mono text-xs uppercase tracking-[0.22em]"
                        style={{ color: 'var(--theme-muted-color)' }}
                    >
                        4× ex-CTO · 2× ex-founder · ex-meta engineering
                    </p>
                    <pre
                        className="mt-6 overflow-hidden text-[8px] leading-tight sm:text-[10px]"
                        style={{ color: 'var(--theme-muted-color)', opacity: 0.55 }}
                        aria-hidden
                    >
{`──────────────────────────────────────────────────────────────────────────`}
                    </pre>
                    <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] sm:text-[18px] sm:leading-[1.65]">
                        I build software with my hands on the keys. Mostly local-first tools,
                        developer experience, and the parts of products that have to feel right —
                        the typography, the shortcuts, the empty state, the quiet click.
                        Currently between San Francisco and Montreal.
                    </p>
                </header>

                <section className="mb-14">
                    <PromptHeading>experience</PromptHeading>
                    <div className="space-y-3">
                        {experience.map((item) => (
                            <div
                                key={item.prompt}
                                className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6"
                                style={cardSurface}
                            >
                                <div className="flex items-start gap-4 sm:gap-5">
                                    <span
                                        className="font-mono text-3xl font-light leading-none tabular-nums sm:text-4xl"
                                        style={{ color: 'var(--theme-muted-color)', opacity: 0.45 }}
                                        aria-hidden
                                    >
                                        {item.prompt}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <h2
                                            className="font-mono text-[11px] uppercase tracking-[0.22em]"
                                            style={{ color: 'var(--theme-accent-color)' }}
                                        >
                                            {item.role}
                                        </h2>
                                        <p
                                            className="mt-2 text-sm leading-7 sm:text-base"
                                            style={{ color: 'var(--theme-muted-color)' }}
                                        >
                                            {item.body}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-14">
                    <PromptHeading>stack --reach-for</PromptHeading>
                    <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                        <ul className="space-y-3 font-mono text-xs sm:text-sm">
                            {stack.map((row) => (
                                <li key={row.label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                                    <span
                                        className="w-16 shrink-0 uppercase tracking-[0.18em]"
                                        style={{ color: 'var(--theme-muted-color)' }}
                                    >
                                        {row.label}
                                    </span>
                                    <span style={{ color: 'var(--theme-text-color)' }}>
                                        {row.items.map((item, i) => (
                                            <span key={item}>
                                                {i > 0 ? (
                                                    <span style={{ color: 'var(--theme-muted-color)', opacity: 0.5 }}>
                                                        {' · '}
                                                    </span>
                                                ) : null}
                                                {item}
                                            </span>
                                        ))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="mb-14">
                    <PromptHeading>now</PromptHeading>
                    <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                        <ul className="space-y-2 font-mono text-xs sm:text-sm">
                            {now.map((line) => (
                                <li key={line} className="flex gap-3">
                                    <span style={{ color: 'var(--theme-accent-color)' }}>›</span>
                                    <span style={{ color: 'var(--theme-text-color)' }}>{line}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="mb-12">
                    <PromptHeading>elsewhere</PromptHeading>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {elsewhere.map(({ label, href, handle, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-[transform,border-color] duration-300 hover:-translate-y-0.5"
                                    style={cardSurface}
                                >
                                    <Icon className="h-3.5 w-3.5 opacity-60" />
                                    <span className="flex flex-col">
                                        <span
                                            className="text-[10px] font-mono uppercase tracking-[0.18em]"
                                            style={{ color: 'var(--theme-muted-color)' }}
                                        >
                                            {label}
                                        </span>
                                        <span className="font-mono text-sm">{handle}</span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <footer
                    className="mt-16 flex flex-col gap-3 border-t pt-6 font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between"
                    style={{ borderColor: 'var(--theme-border-color)' }}
                >
                    <span
                        className="uppercase tracking-[0.22em]"
                        style={{ color: 'var(--theme-muted-color)' }}
                    >
                        san francisco · montreal
                    </span>
                    <Link
                        href="/about/terminal"
                        className="group inline-flex items-center gap-2 transition-opacity hover:opacity-100"
                        style={{ color: 'var(--theme-muted-color)' }}
                    >
                        <span style={{ color: 'var(--theme-accent-color)' }}>&gt;</span>
                        <span className="uppercase tracking-[0.22em] group-hover:opacity-100">./terminal</span>
                        <span className="terminal-cursor" aria-hidden>▍</span>
                    </Link>
                </footer>
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
