'use client';

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialButton } from "@/components/ui/SocialButton";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { fadeInUp } from "@/lib/utils";

interface Project {
    title: string;
    description: string;
    link: string;
}

export default function HomePage({ projects }: { projects: Project[] }) {

    return (
        <div className="max-w-4xl mx-auto  py-16 text-gray-900 text-xs ">
            <motion.div className="mb-20" {...fadeInUp}>
                <div className="flex items-center mb-8">
                    <Image
                        src="/arach-circle.png"
                        alt="Arach"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full mr-6 border-2 border-gray-600 opacity-90"
                    />
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Arach_</h1>
                        <p className="text-lg text-gray-400">Programming_ && AI_</p>
                    </div>
                </div>
                <p className="leading-relaxed border-l-2 border-gray-600 pl-4 text-gray-600">
                    {`{`}<br />
                    &nbsp;&nbsp;passion: "Crafting elegant solutions",<br />
                    &nbsp;&nbsp;specialties: ["Web Development", "AI", "Startups"],<br />
                    &nbsp;&nbsp;hobbies: ["Hiking", "Coding", "Reading"]<br />
                    {`}`}
                </p>
            </motion.div>


            <Section title="Projects">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.title}>
                            <CardHeader>
                                <div className="flex flex-row items-center justify-between">
                                    <div><Link href={project.link}>
                                        <CardTitle>{project.title} </CardTitle>
                                    </Link></div>
                                    <div>
                                        <SocialButton icon={ExternalLink} className="p-0 hover:text-gray-900 ml-1 h-4 w-3 " />
                                    </div>
                                </div>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Link href={project.link}>
                                        <Button variant="link" size="sm" className="p-0 hover:text-gray-900">
                                            view_source() <ExternalLink className="ml-1 h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
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


