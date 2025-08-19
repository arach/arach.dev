import Link from "next/link";
import { Github } from "lucide-react";
import { SocialButton } from "@/components/ui/SocialButton";
import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-black py-1 shadow-sm h-10 text-xs relative z-50  border-thin border-gray-800">
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
