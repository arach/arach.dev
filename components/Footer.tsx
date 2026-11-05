'use client';

import { usePathname } from "next/navigation";

const LINKS = [
    { href: "https://arach.io", label: "arach.io" },
    { href: "https://github.com/arach", label: "GitHub" },
    { href: "https://www.linkedin.com/in/arach/", label: "LinkedIn" },
    { href: "mailto:arach@tchoupani.com", label: "Email" },
];

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/labs/ops') || pathname?.startsWith('/about/terminal')) {
        return null;
    }

    return (
        <footer className="mt-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div
                    className="fig flex flex-col gap-3 border-t py-6 sm:flex-row sm:items-center sm:justify-between"
                    style={{ borderColor: 'var(--theme-border-color)' }}
                >
                    <span>© {new Date().getFullYear()} Arach Tchoupani · Montreal / SF</span>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <a href={href} className="link-quiet">{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
