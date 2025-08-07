'use client';

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { fadeInUp } from "@/lib/utils";
import TypewriterEffect from "@/components/ui/TypeWriter";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Project {
    title: string;
    description: string;
    link: string;
    github: string;
    tags: string[];
    preview: string;
}

export default function HomePage({ projects }: { projects: Project[] }) {
    

    return (
        <div className="max-w-4xl mx-auto  py-16 text-gray-900 text-xs ">
            <motion.div className="mb-20" {...fadeInUp}>
                <div className="mb-8">
                    <pre className="text-[6px] text-black mb-6 overflow-hidden font-mono leading-none tracking-tighter" style={{ fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace' }}>
{`╔──────────────────────────────────────────────────────────────────────────╗
│                                                                          │
│    █████╗ ██████╗  █████╗  ██████╗██╗  ██╗   ██████╗ ███████╗██╗   ██╗   │
│   ██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║   ██╔══██╗██╔════╝██║   ██║   │
│   ███████║██████╔╝███████║██║     ███████║   ██║  ██║█████╗  ██║   ██║   │
│   ██╔══██║██╔══██╗██╔══██║██║     ██╔══██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝   │
│   ██║  ██║██║  ██║██║  ██║╚██████╗██║  ██║██╗██████╔╝███████╗ ╚████╔╝    │
│   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝     │
│                                                                          │
╚──────────────────────────────────────────────────────────────────────────╝`}
                    </pre>
                </div>
                <div className="border-l-2 border-gray-600 pl-4 text-gray-600 mb-4 relative z-10">
                    <span>4x ex-CTO, 2x ex-founder, ex-Meta Engineering</span>{" "}
                    <a href="https://arach.io" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors text-xs underline cursor-pointer relative z-20">
                        → more info
                    </a>
                </div>
            </motion.div>


            <Section title="Projects">
                <TooltipProvider>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <Tooltip key={project.title}>
                                <TooltipTrigger asChild>
                                    <Link href={project.link} className="block">
                                        <Card className="backdrop-blur-sm flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow">
                                            <CardHeader className="flex-grow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <CardTitle>{project.title}</CardTitle>
                                                    <div className="flex gap-1">
                                                        {project.tags.map((tag) => (
                                                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <CardDescription className="text-xs font-light">{project.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-gray-100 pointer-events-none">
                                                        <Globe className="h-4 w-4" />
                                                        <span className="sr-only">Visit site</span>
                                                    </Button>
                                                    <Link href={project.github} onClick={(e) => e.stopPropagation()} className="pointer-events-auto">
                                                        <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-gray-100">
                                                            <Github className="h-4 w-4" />
                                                            <span className="sr-only">View source</span>
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">{project.preview}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>
            </Section>


        </div>
    );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.section className="mb-16" {...fadeInUp}>
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">{title}</h2>
        {children}
    </motion.section>
);