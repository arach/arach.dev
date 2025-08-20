'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import CommandLine from '@/components/CommandLine'
import SpaceGame from '@/components/SpaceGame'

interface NotFoundProps {
    domain: string;
    siteStructure: string[];
    buttonText?: string;
    buttonLink?: string;
}

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
        <pre className="text-[8px] sm:text-[10px] font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
            {displayText}
        </pre>
    );
};

const NotFound: React.FC<NotFoundProps> = ({
    domain,
    siteStructure,
    buttonText = "Return to Homepage",
    buttonLink = "/"
}) => {
    const [showButton, setShowButton] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [textComplete, setTextComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowButton(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const errorText = `╔──────────────────────────────────────────────────────────────────────────╗
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
${domain.split('.')[0]}@dev:~$ sudo ${domain.split('.')[0]}-cli --find-page "${typeof window !== 'undefined' ? window.location.pathname : ''}"
[sudo] password for ${domain.split('.')[0]}: ********
Initializing ${domain} page search...
Attempting to locate requested page...
grep: ${typeof window !== 'undefined' ? window.location.pathname : ''}: No such file or directory
Error: Page not found (404)
${domain.split('.')[0]}@arach.dev:~$ ${domain.split('.')[0]}-diagnose --url "${typeof window !== 'undefined' ? window.location.pathname : ''}"
Running diagnostics...
  - URL validity: ✓
  - Server response: 404 Not Found
  - Cache status: Empty
  - DNS resolution: OK
  - Firewall status: Allowing traffic
${domain.split('.')[0]}@arach.dev:~$ ${domain.split('.')[0]}-scan --site-structure
Scanning site structure...
.
${siteStructure.map(path => {
        const subPaths = path.endsWith('/') ? `│   └── index.html` : '';
        return `├── ${path}
${subPaths}`;
    }).join('\n')}

Unable to locate "${typeof window !== 'undefined' ? window.location.pathname : ''}" in site structure.
${domain.split('.')[0]}@arach.dev:~$ echo "Suggestion: The page may have been moved or deleted."
Suggestion: The page may have been moved or deleted.`;

    return (
        <TooltipProvider>
            <div className="min-h-screen flex flex-col font-mono text-[8px] sm:text-[10px] text-orange-400
           p-2 sm:p-4 rounded-lg shadow-lg mb-4 bg-slate-800">
                <div className="flex-grow flex items-start justify-center p-2 sm:p-4 overflow-auto h-[80vh]">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl mx-auto bg-slate-700 border border-slate-600 rounded-md shadow-lg overflow-hidden mt-2 sm:mt-4 min-h-[70vh] sm:min-h-[90vh]"
                    >
                        <div className="border-b border-slate-600 p-1.5 sm:p-2 text-orange-400 font-thin text-[8px] sm:text-[10px] flex items-center justify-between">
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
                                {domain} Terminal
                            </div>
                            <div className="text-[10px] sm:text-xs">404 Not Found</div>
                        </div>
                        <div className="p-2 sm:p-4 text-orange-400 relative min-h-[200px] sm:min-h-[250px] whitespace-pre-wrap break-all sm:break-words overflow-x-auto">
                            <TypewriterEffect text={errorText} onComplete={() => setTextComplete(true)} />
                            {textComplete && (
                                <div className="mt-0 font-terminal">
                                    <CommandLine onGameStart={() => setGameActive(true)} />
                                </div>
                            )}
                            {gameActive && <SpaceGame />}
                        </div>

                    </motion.div>
                </div>
                <AnimatePresence>
                    {showButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center pb-6"
                        >
                            <Link href={buttonLink}>
                                <Button variant="outline" className="bg-slate-700 text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-slate-800 transition-colors duration-300 font-thin text-xs">
                                    {buttonText}
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </TooltipProvider >
    );
}

export default NotFound;