'use client';

import { useState, useEffect } from "react";
import { HomePage } from "@/components/home/HomePage";
import ThemedDottedGrid from "@/components/ThemedDottedGrid";
import { DebugToolbar } from "@/components/debug/DebugToolbar";
import { GitHubProvider } from "@/lib/github-context";
import { getHomepageProjects } from "@/lib/projects";

function HomeContent() {
  const [mounted, setMounted] = useState(false);
  const [showDebugToolbar, setShowDebugToolbar] = useState(true);
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Ensure we're on the client and setup keyboard shortcuts
  useEffect(() => {
    setMounted(true);
    
    // Add keyboard shortcut for debug toolbar toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + D to toggle debug toolbar
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        setShowDebugToolbar(prev => !prev);
      }
    };
    
    if (isDevelopment) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDevelopment]);
  
  const projects = getHomepageProjects();
  return (
    <GitHubProvider username="arach">
      {/* Simple dotted grid background - always visible, theme-aware */}
      <ThemedDottedGrid />
      
      <div className="container mx-auto px-4 py-6 min-h-[90vh] relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <HomePage projects={projects} />
        </div>
      </div>
      
      {/* Debug Toolbar - Only render in development mode, toggle with Cmd/Ctrl + D */}
      {mounted && isDevelopment && showDebugToolbar && <DebugToolbar />}
      
      {/* Debug toolbar hint when hidden */}
      {mounted && isDevelopment && !showDebugToolbar && (
        <div className="fixed top-4 right-4 text-[10px] text-gray-400 font-mono opacity-50 pointer-events-none">
          Cmd+D for debug
        </div>
      )}
    </GitHubProvider>
  );
}

export default function Home() {
  return <HomeContent />;
}