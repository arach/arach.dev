import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { SocialButton } from "@/components/ui/SocialButton";
import GithubIcon from '@/components/icons/GithubIcon';

export default function Footer() {
    return (
        <footer className="bg-black text-white sticky bottom-0 w-full z-10 font-mono">
            <div className="container mx-auto px-3 py-1 flex flex-row items-center justify-between" style={{ fontSize: '10px' }}>
                <div>
                    © {new Date().getFullYear()} <span className="hidden sm:inline">Arach Tchoupani</span><span className="sm:hidden">Arach</span>
                    <span className="hidden md:inline"> · All projects handcrafted with 💙 in Montreal, NY or SF 🛠</span>
                </div>
                <div className="flex space-x-3">
                    <Link href="https://github.com/arach">
                        <SocialButton icon={GithubIcon} className="h-3 w-3" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/arach/" className="hidden sm:block">
                        <SocialButton icon={Linkedin} className="h-3 w-3" />
                    </Link>
                    <Link href="mailto:arach@tchoupani.com">
                        <SocialButton icon={Mail} className="h-3 w-3" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
