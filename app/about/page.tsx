'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import CommandLine from '@/components/CommandLine';
import SpaceGame from '@/components/SpaceGame';

const TypewriterEffect: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Prevent re-running if already completed
        if (isTyping || displayText === text) return;
        
        setIsTyping(true);
        setDisplayText(''); // Clear any existing text
        let i = 0;
        const charsPerInterval = 10; // Stream 10 characters at a time for even faster output
        const intervalId = setInterval(() => {
            if (i < text.length) {
                const nextChunk = text.slice(i, i + charsPerInterval);
                setDisplayText((prev) => prev + nextChunk);
                i += charsPerInterval;
            } else {
                clearInterval(intervalId);
                setIsTyping(false);
                if (onComplete) {
                    onComplete();
                }
            }
        }, 1);
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array - only run once on mount

    return (
        <pre className="font-terminal whitespace-pre-wrap overflow-auto leading-relaxed">
            {displayText}
        </pre>
    );
};

export default function AboutPage() {
    const [gameActive, setGameActive] = useState(false);
    const [textComplete, setTextComplete] = useState(false);

    const aboutText = `╔──────────────────────────────────────────────────────────────────────────╗
│                                                                          │
│    █████╗ ██████╗  █████╗  ██████╗██╗  ██╗   ██████╗ ███████╗██╗   ██╗   │
│   ██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║   ██╔══██╗██╔════╝██║   ██║   │
│   ███████║██████╔╝███████║██║     ███████║   ██║  ██║█████╗  ██║   ██║   │
│   ██╔══██║██╔══██╗██╔══██║██║     ██╔══██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝   │
│   ██║  ██║██║  ██║██║  ██║╚██████╗██║  ██║██╗██████╔╝███████╗ ╚████╔╝    │
│   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝     │
│                                                                          │
╚──────────────────────────────────────────────────────────────────────────╝

Last login: ${new Date().toUTCString()}
arach@arach.dev:~$ whoami
Arach Tchoupani

arach@arach.dev:~$ cat /etc/about.txt
================================================================================
                            About Arach Tchoupani
================================================================================

Professional Experience:
- 4x ex-CTO (led engineering teams from seed to Series B)
- 2x ex-founder (built and scaled technical products)
- ex-Meta Engineering (infrastructure and developer tools)

Technical Leadership:
- Built and led engineering teams of 5-50+ engineers
- Architected systems handling millions of users
- Specialized in developer experience and platform engineering
- Strong focus on distributed systems and cloud infrastructure

Tech Stack Expertise:
- Languages: TypeScript, Python, Go, Rust, Swift
- Frontend: React, Next.js, Tauri, SwiftUI
- Backend: Node.js, FastAPI, GraphQL, gRPC
- Infrastructure: AWS, GCP, Kubernetes, Terraform
- Databases: PostgreSQL, Redis, DynamoDB, MongoDB

Current Focus:
- Building innovative developer tools
- Exploring AI/ML applications in software development
- Mentoring the next generation of engineers

Contact:
- GitHub: @arach
- Email: arach@arach.dev
- Location: San Francisco, CA

================================================================================

arach@arach.dev:~$ ls -la /home/arach/interests/
total 42
drwxr-xr-x  2 arach arach 4096 Nov 21 10:00 .
drwxr-xr-x 10 arach arach 4096 Nov 21 10:00 ..
-rw-r--r--  1 arach arach  512 Nov 21 10:00 ai_ml.txt
-rw-r--r--  1 arach arach  512 Nov 21 10:00 developer_tools.txt
-rw-r--r--  1 arach arach  512 Nov 21 10:00 distributed_systems.txt
-rw-r--r--  1 arach arach  512 Nov 21 10:00 open_source.txt
-rw-r--r--  1 arach arach  512 Nov 21 10:00 team_building.txt

arach@arach.dev:~$ uptime
up 10+ years, building awesome stuff

arach@arach.dev:~$ echo "Feel free to reach out for collaborations or just to chat about tech!"
Feel free to reach out for collaborations or just to chat about tech!`;

    return (
        <TooltipProvider>
            <div className="min-h-screen flex flex-col font-mono text-[10px] text-orange-400
           p-4 rounded-lg shadow-lg mb-4 bg-slate-800">
                <div className="flex-grow flex items-start justify-center p-4 overflow-auto h-[80vh]">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="container bg-slate-700 border border-slate-600 rounded-md shadow-lg overflow-hidden mt-4 min-h-[90vh] max-w-6xl"
                    >
                        <div className="border-b border-slate-600 p-2 text-orange-400 font-thin text-[10px] flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-2 flex space-x-1">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Close</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Minimize</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Maximize</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                arach.dev Terminal
                            </div>
                            <div className="text-xs">About</div>
                        </div>
                        <div className="p-4 text-orange-400 relative min-h-[250px] whitespace-pre-wrap break-words font-terminal leading-relaxed">
                            <TypewriterEffect text={aboutText} onComplete={() => setTextComplete(true)} />
                            {textComplete && (
                                <div className="mt-0 font-terminal">
                                    <CommandLine onGameStart={() => setGameActive(true)} />
                                </div>
                            )}
                            {gameActive && <SpaceGame />}
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex justify-center pb-6 gap-4"
                >
                    <Link href="/">
                        <Button variant="outline" className="bg-slate-700 text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-slate-800 transition-colors duration-300 font-thin text-xs">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/github">
                        <Button variant="outline" className="bg-slate-700 text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-slate-800 transition-colors duration-300 font-thin text-xs">
                            View GitHub Activity
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </TooltipProvider>
    );
}