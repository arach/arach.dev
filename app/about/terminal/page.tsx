'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CommandLine from '@/components/CommandLine';
import SpaceGame from '@/components/SpaceGame';

const TypewriterEffect: React.FC<{ text: string; onComplete?: () => void; isMobile?: boolean }> = ({ text, onComplete, isMobile = false }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (isTyping || displayText === text) return;

        setIsTyping(true);
        setDisplayText('');
        let i = 0;
        const charsPerInterval = isMobile ? 20 : 10;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <pre className="font-terminal whitespace-pre-wrap overflow-hidden leading-relaxed">
            {displayText.split('\n').map((line, index) => {
                if (line.includes('╔') || line.includes('│') || line.includes('╚') ||
                    line.includes('█') || line.includes('██') || line.includes('╗')) {
                    return (
                        <span key={index} className="text-[4px] xs:text-[5px] sm:text-[8px] md:text-[10px] block">
                            {line}{'\n'}
                        </span>
                    );
                }
                return <span key={index}>{line}{'\n'}</span>;
            })}
        </pre>
    );
};

export default function AboutTerminalPage() {
    const [gameActive, setGameActive] = useState(false);
    const [textComplete, setTextComplete] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const mobileAboutText = `$ whoami
Arach Tchoupani
4x CTO · ex-Meta

$ _
`;

    const desktopAboutText = `╔──────────────────────────────────────────────────────────────────────────╗
│                                                                          │
│    █████╗ ██████╗  █████╗  ██████╗██╗  ██╗   ██████╗ ███████╗██╗   ██╗   │
│   ██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║   ██╔══██╗██╔════╝██║   ██║   │
│   ███████║██████╔╝███████║██║     ███████║   ██║  ██║█████╗  ██║   ██║   │
│   ██╔══██║██╔══██╗██╔══██║██║     ██╔══██║   ██║  ██║██╔══╝  ╚██╗ ██╔╝   │
│   ██║  ██║██║  ██║██║  ██║╚██████╗██║  ██║██╗██████╔╝███████╗ ╚████╔╝    │
│   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝  ╚═══╝     │
│                                                                          │
╚──────────────────────────────────────────────────────────────────────────╝

arach@arach.dev:~$ cat about.txt
========================================
           ARACH TCHOUPANI
========================================

PROFESSIONAL EXPERIENCE:
• 4x ex-CTO (led engineering teams from seed to Series B)
• 2x ex-founder (built and scaled technical products)
• ex-Meta Engineering (infrastructure and developer tools)

TECHNICAL LEADERSHIP:
• Built and led engineering teams of 5-50+ engineers
• Architected systems handling millions of users
• Specialized in developer experience and platform
  engineering

TECH STACK:
• Languages: TypeScript, Python, Go, Rust, Swift
• Frontend: React, Next.js, Tauri, SwiftUI
• Backend: Node.js, FastAPI, GraphQL, gRPC
• Infrastructure: AWS, GCP, Kubernetes, Terraform
• Databases: PostgreSQL, Redis, DynamoDB, MongoDB

CURRENT FOCUS:
• code every day

CONTACT:
• GitHub: @arach
• Email: arach@arach.dev
• Location: San Francisco, CA or Montreal, CA

========================================

arach@arach.dev:~$ _
Type 'help' for available commands.`;

    const aboutText = isMobile ? mobileAboutText : desktopAboutText;

    return (
        <div className="min-h-screen flex flex-col font-terminal text-orange-400 bg-slate-800">
            <div className="flex-grow flex items-start justify-center overflow-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-slate-800"
                >
                    <div className="hidden sm:block border-b border-slate-600 p-2 text-orange-400 font-terminal">
                        <div className="flex items-center justify-between max-w-4xl mx-auto">
                            <div className="flex items-center">
                                <div className="mr-2 flex space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                arach.dev Terminal
                            </div>
                            <div className="text-xs">About · Terminal</div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 text-orange-400 max-w-4xl mx-auto">
                        <TypewriterEffect text={aboutText} onComplete={() => setTextComplete(true)} isMobile={isMobile} />
                        {textComplete && (
                            <div className="mt-4 font-terminal">
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
                <Link href="/about">
                    <Button variant="outline" className="bg-slate-700 text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-slate-800 transition-colors duration-300 font-terminal text-xs">
                        Back to About
                    </Button>
                </Link>
                <Link href="/github">
                    <Button variant="outline" className="bg-slate-700 text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-slate-800 transition-colors duration-300 font-terminal text-xs">
                        View GitHub Activity
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
