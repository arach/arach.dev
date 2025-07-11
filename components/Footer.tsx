import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { SocialButton } from "@/components/ui/SocialButton";
import GithubIcon from '@/components/icons/GithubIcon';

export default function Footer() {
    return (
        <footer className="bg-black text-white sticky bottom-0 w-full z-10">
            <div className="container mx-auto px-4 py-2 flex flex-row items-center justify-between text-xs">
                <div>© {new Date().getFullYear()} Arach Techpanal · All projects handcrafted in Montreal 🛠</div>
                <div className="flex space-x-4">
                    <Link href="https://github.com/arach">
                        <SocialButton icon={GithubIcon} className="h-4 w-4" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/arach/">
                        <SocialButton icon={Linkedin} className="h-4 w-4" />
                    </Link>
                    <Link href="mailto:arach@tchoupani.com">
                        <SocialButton icon={Mail} className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
