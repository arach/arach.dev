import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SocialButton } from "@/components/ui/SocialButton";

export default function Footer() {
    return (
        <footer className="bg-black mt-auto bottom-0 absolute w-full text-white">
            <div className="container mx-auto px-4 flex flex-row items-center justify-between pt-2 text-xs">
                <div className="">© {new Date().getFullYear()} Arach_Tchoupani.all_rights_reserved()</div>
                <div className="flex space-x-4">
                    <Link href="https://github.com/arach">
                        <SocialButton icon={Github} className="h-4 w-4" />
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
