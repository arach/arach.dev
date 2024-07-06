import Link from "next/link";
import { Github } from "lucide-react";
import { SocialButton } from "@/components/ui/SocialButton";

export default function Header() {
    return (
        <header className="bg-black py-2 shadow-md h-8 text-xs">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="font-bold text-white hover:text-gray-300 transition-colors">
                    arach.dev
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                        <li><Link href="/notes" className="hover:text-white transition-colors">Notes</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
