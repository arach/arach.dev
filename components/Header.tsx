'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme/site/provider";

// /lab is rewritten to the separate Training Lab app, so it needs a full page load.
const NAV: { href: string; label: string; external?: boolean }[] = [
    { href: "/lab", label: "Lab", external: true },
    { href: "/ideas", label: "Notes" },
    { href: "/github", label: "GitHub" },
    { href: "/about", label: "About" },
];

export default function Header() {
    const pathname = usePathname();
    const { currentTheme, toggleTheme } = useTheme();

    // These routes own their chrome.
    if (pathname?.startsWith('/styleguide') || pathname?.startsWith('/labs/ops') || pathname?.startsWith('/about/terminal')) {
        return null;
    }

    const isDark = currentTheme === 'dark';

    return (
        <header
            className="sticky top-0 z-50 h-[60px] border-b backdrop-blur-md"
            style={{
                backgroundColor: 'var(--theme-header-bg)',
                color: 'var(--theme-header-text)',
                borderColor: 'var(--theme-border-color)',
            }}
        >
            <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link href="/" className="text-[15px] font-semibold tracking-[-0.01em]">
                    arach<span style={{ color: 'var(--theme-accent-color)' }}>.dev</span>
                </Link>
                <nav className="flex items-center gap-4 sm:gap-6">
                    <ul className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-6">
                        {NAV.map(({ href, label, external }) => {
                            const active = pathname === href || pathname?.startsWith(`${href}/`);
                            const props = {
                                href,
                                'aria-current': active ? ('page' as const) : undefined,
                                className: 'transition-colors hover:text-[color:var(--theme-text-color)]',
                                style: { color: active ? 'var(--theme-accent-color)' : 'var(--theme-muted-color)' },
                            };
                            const text = active ? `[ ${label} ]` : label;
                            return (
                                <li key={href}>
                                    {external ? <a {...props}>{text}</a> : <Link {...props}>{text}</Link>}
                                </li>
                            );
                        })}
                        <li className="hidden sm:block">
                            <a
                                href="https://arach.io"
                                className="transition-colors hover:text-[color:var(--theme-text-color)]"
                                style={{ color: 'var(--theme-muted-color)' }}
                            >
                                Writing ↗
                            </a>
                        </li>
                    </ul>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                        className="flex h-7 w-7 items-center justify-center border transition-colors hover:text-[color:var(--theme-accent-color)]"
                        style={{ borderColor: 'var(--theme-border-color)', color: 'var(--theme-muted-color)' }}
                    >
                        {isDark ? <Sun className="h-3.5 w-3.5" strokeWidth={1.75} /> : <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />}
                    </button>
                </nav>
            </div>
        </header>
    );
}
