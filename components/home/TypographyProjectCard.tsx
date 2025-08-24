'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface Project {
  title: string;
  description: string;
  link: string;
  github: string;
  tags: string[];
  preview: string;
}

interface TypographyProjectCardProps {
  project: Project;
  index: number;
  isKeyboardFocused: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

export default function TypographyProjectCard({
  project,
  index,
  isKeyboardFocused,
  onMouseEnter,
  onClick,
  cardRef,
}: TypographyProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, '0');
  const { theme } = useTheme();
  
  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Generate theme-aware tag colors
  const getTagColors = () => {
    if (isKeyboardFocused) {
      // When focused, use accent color
      return {
        bg: theme?.accentColor ? hexToRgba(theme.accentColor, 0.15) : 'rgb(219 234 254)',
        text: theme?.accentColor || 'rgb(37 99 235)',
      };
    }
    
    // Use theme colors with subtle opacity
    if (theme?.name === 'dark' || theme?.name === 'terminal' || theme?.name === 'cyberpunk') {
      return {
        bg: theme?.accentColor ? hexToRgba(theme.accentColor, 0.08) : 'rgba(255, 255, 255, 0.05)',
        text: theme?.mutedTextColor || 'rgba(255, 255, 255, 0.6)',
        hoverBg: theme?.accentColor ? hexToRgba(theme.accentColor, 0.12) : 'rgba(255, 255, 255, 0.08)',
        hoverText: theme?.accentColor || 'rgba(255, 255, 255, 0.8)',
      };
    }
    
    // For light themes, use accent color with very low opacity
    return {
      bg: theme?.accentColor ? hexToRgba(theme.accentColor, 0.06) : 'rgb(249 250 251)',
      text: theme?.mutedTextColor || 'rgb(107 114 128)',
      hoverBg: theme?.accentColor ? hexToRgba(theme.accentColor, 0.10) : 'rgb(243 244 246)',
      hoverText: theme?.textColor || 'rgb(75 85 99)',
    };
  };
  
  const tagColors = getTagColors();

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`
        group relative py-8 sm:py-12 cursor-pointer
        transition-all duration-500 ease-out
        ${isKeyboardFocused ? 'keyboard-focused' : ''}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Project Number */}
      <span className={`
        absolute left-0 top-8 sm:top-12
        font-mono text-4xl sm:text-5xl font-light
        transition-all duration-500
        ${isKeyboardFocused 
          ? 'text-blue-500 opacity-100' 
          : 'text-gray-300 opacity-40 group-hover:opacity-60 group-hover:text-gray-400'}
      `}>
        {projectNumber}
      </span>

      {/* Main Content */}
      <div className="pl-16 sm:pl-24">
        {/* Title - Large and Bold */}
        <h3 className={`
          text-2xl sm:text-4xl font-bold tracking-tight
          transition-all duration-500
          mb-2 sm:mb-3
          ${isKeyboardFocused 
            ? 'text-blue-600' 
            : 'text-gray-900 group-hover:text-gray-800'}
        `}>
          {project.title}
          <span className={`
            inline-block ml-3 transition-all duration-500 transform
            ${isKeyboardFocused || 'opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1'}
          `}>
            →
          </span>
        </h3>

        {/* Description */}
        <p className={`
          text-sm sm:text-base leading-relaxed mb-3 sm:mb-4
          transition-all duration-500
          ${isKeyboardFocused 
            ? 'text-gray-700' 
            : 'text-gray-600 group-hover:text-gray-700'}
        `}>
          {project.description}
        </p>

        {/* Preview text - smaller, muted */}
        <p className={`
          text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6
          transition-all duration-500
          font-mono
          ${isKeyboardFocused 
            ? 'text-gray-500 opacity-100' 
            : 'text-gray-400 opacity-70 group-hover:opacity-100'}
        `}>
          {project.preview}
        </p>

        {/* Tags and Links */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Minimal Tags */}
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm transition-all duration-500"
              style={{
                backgroundColor: isKeyboardFocused ? tagColors.bg : tagColors.bg,
                color: isKeyboardFocused ? tagColors.text : tagColors.text,
              }}
              onMouseEnter={(e) => {
                if (!isKeyboardFocused && tagColors.hoverBg) {
                  e.currentTarget.style.backgroundColor = tagColors.hoverBg;
                  e.currentTarget.style.color = tagColors.hoverText || tagColors.text;
                }
              }}
              onMouseLeave={(e) => {
                if (!isKeyboardFocused) {
                  e.currentTarget.style.backgroundColor = tagColors.bg;
                  e.currentTarget.style.color = tagColors.text;
                }
              }}
            >
              {tag}
            </span>
          ))}

          {/* Links - subtle until hover */}
          <div className="ml-auto flex items-center gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-1 text-xs font-mono
                transition-all duration-500
                ${isKeyboardFocused 
                  ? 'text-blue-600 opacity-100' 
                  : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
              <span>view</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-1 text-xs font-mono
                transition-all duration-500
                ${isKeyboardFocused 
                  ? 'text-blue-600 opacity-100' 
                  : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3 h-3" />
              <span>code</span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className={`
        absolute bottom-0 left-16 sm:left-24 right-0 h-px
        transition-all duration-500
        ${isKeyboardFocused 
          ? 'bg-blue-200' 
          : 'bg-gray-100 group-hover:bg-gray-200'}
      `} />

      {/* Hover glow effect - very subtle */}
      <div className={`
        absolute inset-0 -z-10
        transition-all duration-700 ease-out
        opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-transparent via-gray-50/30 to-transparent
        transform scale-x-0 group-hover:scale-x-100 origin-left
      `} />
    </motion.article>
  );
}