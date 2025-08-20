'use client';

import Link from "next/link";
import { Github } from "lucide-react";
import { SocialButton } from "@/components/ui/SocialButton";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
    const [showHeader, setShowHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show header only when scrolling down from the top
            if (currentScrollY > 50) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`fixed top-0 left-0 right-0 bg-black py-1 shadow-sm h-10 text-xs z-50 border-thin border-gray-800 transition-transform duration-300 ${
            showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className="container mx-auto px-4 flex justify-between items-center h-full">
                <Link href="/" className="flex items-center gap-2 font-bold text-white hover:text-gray-300 transition-colors cursor-pointer">
                    <span>arach.dev</span>
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link href="/github" className="hover:text-white transition-colors cursor-pointer">GitHub</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors cursor-pointer">About</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
