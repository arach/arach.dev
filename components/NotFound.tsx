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

const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length - 1) {
                setDisplayText((prev) => prev + text[i]);
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 5);
        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <pre className="font-mono text-xs whitespace-pre-wrap overflow-auto leading-relaxed">
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

    useEffect(() => {
        const timer = setTimeout(() => setShowButton(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const errorText = `Last login: ${new Date().toUTCString()}
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
            <div className="min-h-screen flex flex-col font-mono text-sm text-[#00FF00]
           p-4 rounded-lg shadow-lg mb-4 ">
                <div className="flex-grow flex items-start justify-center p-4 overflow-auto h-[80vh]">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="container bg-gray-900 border border-[#3E3E42] rounded-md shadow-lg overflow-hidden mt-4 min-h-[90vh]"
                    >
                        <div className="border-b border-[#3E3E42] p-2 text-[#00FF00] font-bold text-sm flex items-center justify-between">
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
                            <div className="text-xs">404 Not Found</div>
                        </div>
                        <div className="p-4 text-[#00FF00] relative min-h-[250px] whitespace-pre-wrap break-words text-sm leading-relaxed">
                            <TypewriterEffect text={errorText} />
                            <CommandLine onGameStart={() => setGameActive(true)} />
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
                                <Button variant="outline" className="bg-[#252526] text-[#00FF00] border-[#00FF00] hover:bg-[#00FF00] hover:text-[#1E1E1E] transition-colors duration-300 font-bold text-sm">
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