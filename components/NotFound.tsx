'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import CommandLine from '@/components/CommandLine'
import SpaceGame from '@/components/SpaceGame'

interface NotFoundProps {
    domain: string;
    siteStructure: string[];
    buttonText?: string;
    buttonLink?: string;
}

const TypewriterEffect: React.FC<{ text: string; onComplete?: () => void; isMobile?: boolean }> = ({ text, onComplete, isMobile = false }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Prevent re-running if already completed
        if (isTyping || displayText === text) return;
        
        setIsTyping(true);
        setDisplayText(''); // Clear any existing text
        let i = 0;
        const charsPerInterval = isMobile ? 20 : 10; // Faster on mobile since less text
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
        <pre className="font-terminal whitespace-pre-wrap overflow-hidden leading-relaxed">
            {displayText.split('\n').map((line, index) => {
                // Check if this line is part of the ASCII art box
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

    // Mobile-first simple terminal text
    const mobileErrorText = `$ pwd
${typeof window !== 'undefined' ? window.location.pathname : ''}

404: Not Found

$ help
`;

    // Desktop full terminal experience  
    const desktopErrorText = `╔──────────────────────────────────────────────────────────────────────────╗
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

    // Detect if mobile
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const errorText = isMobile ? mobileErrorText : desktopErrorText;

    return (
        <div className="min-h-screen flex flex-col font-terminal text-orange-400 bg-slate-800">
            <div className="flex-grow flex items-start justify-center overflow-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-slate-800"
                >
                    {/* Desktop terminal header */}
                    <div className="hidden sm:block border-b border-slate-600 p-2 text-orange-400 font-terminal">
                        <div className="flex items-center justify-between max-w-4xl mx-auto">
                            <div className="flex items-center">
                                <div className="mr-2 flex space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                {domain} Terminal
                            </div>
                            <div className="text-xs">404 Not Found</div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 text-orange-400 max-w-4xl mx-auto">
                        <TypewriterEffect text={errorText} onComplete={() => setTextComplete(true)} isMobile={isMobile} />
                        {textComplete && (
                            <div className="mt-4 font-terminal">
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
                            <Button variant="outline" className="bg-slate-700 text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-slate-800 transition-colors duration-300 font-terminal text-xs">
                                {buttonText}
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default NotFound;