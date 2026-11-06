'use client';

import { usePathname } from "next/navigation";

const LINKS = [
    { href: "/lab", label: "Lab" },
    { href: "https://arach.io", label: "arach.io" },
    { href: "https://github.com/arach", label: "GitHub" },
    { href: "https://www.linkedin.com/in/arach/", label: "LinkedIn" },
    { href: "https://x.com/arach", label: "X" },
];

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/labs/ops') || pathname?.startsWith('/about/terminal')) {
        return null;
    }

    return (
        <footer
            className="mt-16 border-t font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ borderColor: 'var(--theme-border-color)', color: 'var(--theme-muted-color)' }}
        >
            <div className="flex flex-col gap-1.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span>© {new Date().getFullYear()} Arach Tchoupani · Montreal / SF</span>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} className="link-quiet">{label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
