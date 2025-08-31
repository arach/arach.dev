'use client';

import Link from 'next/link';
import { ArrowLeft, Github, Globe } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider-clean';
import ThemedDottedGrid from '@/components/ThemedDottedGrid';
import type { Project } from '@/lib/projects';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ProjectPageClientProps {
  project: Project;
  projectNumber: string;
}

export default function ProjectPageClient({ project, projectNumber }: ProjectPageClientProps) {
  const { currentTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    if (!hex) return `rgba(0, 0, 0, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      {/* Theme-aware background */}
      <ThemedDottedGrid />
      
      <div className="container mx-auto px-4 py-6 min-h-[90vh] relative z-10">
        {/* Large project number in left margin - closer to content */}
        <div className="hidden xl:block">
          <span 
            className="fixed text-[180px] font-mono font-light opacity-[0.08] select-none pointer-events-none"
            style={{
              right: 'calc(50% + 24rem)',
              top: '8rem',
              color: theme?.textColor || 'rgb(17, 24, 39)',
              fontFamily: theme?.headerFont || 'inherit',
            }}
          >
            {projectNumber}
          </span>
        </div>
        
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="pb-20"
        >
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs mb-8 opacity-60 hover:opacity-100 transition-opacity"
              style={{
                color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                fontFamily: 'inherit',
              }}
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to projects</span>
            </Link>

            {/* Project Header */}
            <div className="mb-8">
              <h1 
                className="text-2xl font-bold mb-2"
                style={{
                  color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                {project.title}
              </h1>
              <p 
                className="text-sm opacity-70"
                style={{
                  color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                  fontFamily: 'inherit',
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Status and Links */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span
                className="inline-flex items-center px-3 py-1 rounded text-[11px] font-medium"
                style={{
                  backgroundColor: project.status === 'active'
                    ? hexToRgba(theme?.accentColor || '#10b981', 0.1)
                    : project.status === 'maintained'
                    ? hexToRgba('#f59e0b', 0.1)
                    : hexToRgba(theme?.mutedTextColor || '#6b7280', 0.1),
                  color: project.status === 'active'
                    ? theme?.accentColor || '#10b981'
                    : project.status === 'maintained'
                    ? '#f59e0b'
                    : theme?.mutedTextColor || '#6b7280',
                }}
              >
                {project.status === 'active' ? 'Active' : project.status === 'maintained' ? 'Maintained' : 'Archived'}
              </span>

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] opacity-60 hover:opacity-100 transition-opacity"
                  style={{
                    color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                    fontFamily: 'inherit',
                  }}
                >
                  <Github className="w-3 h-3" />
                  <span>View Source</span>
                </a>
              )}
              
              {project.links.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] opacity-60 hover:opacity-100 transition-opacity"
                  style={{
                    color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                    fontFamily: 'inherit',
                  }}
                >
                  <Globe className="w-3 h-3" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            {/* Long Description */}
            <section className="mb-12">
              <p 
                className="text-sm leading-relaxed opacity-90"
                style={{
                  color: theme?.textColor || 'rgb(55, 65, 81)',
                  fontFamily: 'inherit',
                  lineHeight: '1.75',
                }}
              >
                {project.longDescription}
              </p>
            </section>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section className="mb-12">
                <h2 
                  className="text-xs font-medium uppercase tracking-wider opacity-50 mb-4"
                  style={{
                    color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                    fontFamily: theme?.headerFont || 'inherit',
                  }}
                >
                  Features
                </h2>
                <div className="space-y-2">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-gray-500/5"
                      style={{
                        backgroundColor: theme?.cardBg || 'transparent',
                      }}
                    >
                      <span
                        className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: theme?.accentColor || project.color }}
                      />
                      <span 
                        className="text-xs leading-relaxed"
                        style={{
                          color: theme?.textColor || 'rgb(55, 65, 81)',
                          fontFamily: 'inherit',
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            {project.tech && project.tech.length > 0 && (
              <section className="mb-12">
                <h2 
                  className="text-xs font-medium uppercase tracking-wider opacity-50 mb-4"
                  style={{
                    color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                    fontFamily: theme?.headerFont || 'inherit',
                  }}
                >
                  Built With
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-[10px] font-medium"
                      style={{
                        backgroundColor: hexToRgba(theme?.accentColor || project.color, 0.08),
                        color: theme?.accentColor || project.color,
                        border: `1px solid ${hexToRgba(theme?.accentColor || project.color, 0.2)}`,
                        fontFamily: 'inherit',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <section className="pt-8 border-t" style={{ borderColor: theme?.borderColor || 'rgba(0, 0, 0, 0.06)' }}>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] opacity-40"
                      style={{
                        color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                        fontFamily: 'inherit',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </motion.main>
      </div>
    </>
  );
}