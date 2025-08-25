'use client';

import Link from 'next/link';
import { ArrowLeft, Github, Globe, ExternalLink, ChevronRight } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
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
      
      <div className="relative z-10 min-h-screen">
        {/* Minimal Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-8 pb-4"
        >
          <div className="container mx-auto px-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3 group"
              style={{
                color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                fontFamily: theme?.bodyFont || 'inherit',
              }}
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              <span className="opacity-60 group-hover:opacity-100">Back</span>
            </Link>
          </div>
        </motion.header>

        <main className="container mx-auto px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16 relative"
            >
              {/* Large Project Number */}
              <span 
                className="absolute -top-8 -left-2 text-[120px] font-light opacity-10 select-none"
                style={{
                  color: theme?.accentColor || project.color,
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                {projectNumber}
              </span>

              {/* Project Header */}
              <div className="relative">
                <div className="flex items-start gap-6 mb-8">
                  <motion.span 
                    className="text-5xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5, delay: 0.3 }}
                  >
                    {project.icon}
                  </motion.span>
                  <div className="flex-1">
                    <h1 
                      className="text-4xl md:text-5xl font-bold mb-3 tracking-tight"
                      style={{
                        color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                        fontFamily: theme?.headerFont || 'inherit',
                      }}
                    >
                      {project.title}
                    </h1>
                    <p 
                      className="text-lg opacity-80"
                      style={{
                        color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                        fontFamily: theme?.bodyFont || 'inherit',
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Status and Metrics Bar */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pl-[72px]">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
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
                      border: `1px solid ${project.status === 'active'
                        ? hexToRgba(theme?.accentColor || '#10b981', 0.2)
                        : project.status === 'maintained'
                        ? hexToRgba('#f59e0b', 0.2)
                        : hexToRgba(theme?.mutedTextColor || '#6b7280', 0.2)}`,
                    }}
                  >
                    <span className="mr-1.5">{project.status === 'active' ? '●' : project.status === 'maintained' ? '◐' : '○'}</span>
                    {project.status === 'active' ? 'Active' : project.status === 'maintained' ? 'Maintained' : 'Archived'}
                  </motion.span>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md opacity-60"
                        style={{
                          backgroundColor: theme?.cardBg || 'rgba(0, 0, 0, 0.05)',
                          color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                          fontFamily: theme?.bodyFont || 'inherit',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pl-[72px]">
                  {project.links.github && (
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: theme?.name === 'dark' || theme?.name === 'midnight' 
                          ? 'rgba(255, 255, 255, 0.9)' 
                          : 'rgba(0, 0, 0, 0.9)',
                        color: theme?.name === 'dark' || theme?.name === 'midnight' 
                          ? 'rgb(0, 0, 0)' 
                          : 'rgb(255, 255, 255)',
                        fontSize: '13px',
                        fontFamily: theme?.bodyFont || 'inherit',
                        fontWeight: 500,
                      }}
                    >
                      <Github className="w-4 h-4" />
                      <span>View Source</span>
                      <ChevronRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                  )}
                  {project.links.website && (
                    <motion.a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: 'transparent',
                        color: project.color,
                        border: `1px solid ${hexToRgba(project.color, 0.3)}`,
                        fontSize: '13px',
                        fontFamily: theme?.bodyFont || 'inherit',
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hexToRgba(project.color, 0.1);
                        e.currentTarget.style.borderColor = project.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = hexToRgba(project.color, 0.3);
                      }}
                    >
                      <Globe className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Long Description - Elegant Typography */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16 max-w-3xl"
            >
              <p 
                className="text-base leading-relaxed opacity-90"
                style={{
                  color: theme?.textColor || 'rgb(55, 65, 81)',
                  fontFamily: theme?.bodyFont || 'inherit',
                  lineHeight: '1.8',
                }}
              >
                {project.longDescription}
              </p>
            </motion.section>

            {/* Features Grid - Card Style */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h2 
                className="text-sm font-medium uppercase tracking-wider opacity-60 mb-6"
                style={{
                  color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="group p-5 rounded-lg transition-all duration-300 cursor-default"
                    style={{
                      backgroundColor: theme?.cardBg || 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${theme?.borderColor || 'rgba(0, 0, 0, 0.06)'}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = hexToRgba(project.color, 0.3);
                      e.currentTarget.style.backgroundColor = hexToRgba(project.color, 0.02);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme?.borderColor || 'rgba(0, 0, 0, 0.06)';
                      e.currentTarget.style.backgroundColor = theme?.cardBg || 'rgba(0, 0, 0, 0.02)';
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                        style={{ backgroundColor: project.color }}
                      />
                      <span 
                        className="text-sm leading-relaxed"
                        style={{
                          color: theme?.textColor || 'rgb(55, 65, 81)',
                          fontFamily: theme?.bodyFont || 'inherit',
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Tech Stack - Minimal Pills */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 
                className="text-sm font-medium uppercase tracking-wider opacity-60 mb-6"
                style={{
                  color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                Built With
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                    style={{
                      backgroundColor: hexToRgba(theme?.accentColor || project.color, 0.08),
                      color: theme?.accentColor || project.color,
                      border: `1px solid ${hexToRgba(theme?.accentColor || project.color, 0.2)}`,
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Bottom Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-12 border-t"
              style={{ borderColor: theme?.borderColor || 'rgba(0, 0, 0, 0.06)' }}
            >
              <div className="flex justify-between items-center">
                <Link 
                  href="/"
                  className="group flex items-center gap-2 text-sm transition-all duration-300"
                  style={{
                    color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                    fontFamily: theme?.bodyFont || 'inherit',
                  }}
                >
                  <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                  <span className="opacity-60 group-hover:opacity-100">All Projects</span>
                </Link>

                {/* Category Tags */}
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full opacity-50"
                      style={{
                        backgroundColor: theme?.cardBg || 'rgba(0, 0, 0, 0.02)',
                        color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                        fontFamily: theme?.bodyFont || 'inherit',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}