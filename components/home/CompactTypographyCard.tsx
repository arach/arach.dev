'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider-clean';

interface Project {
  title: string;
  description: string;
  link: string;
  github: string;
  tags: string[];
  preview?: string; // Optional - not used in compact view
}

interface CompactTypographyCardProps {
  project: Project;
  index: number;
  isKeyboardFocused: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

export function CompactTypographyCard({
  project,
  index,
  isKeyboardFocused,
  onMouseEnter,
  onClick,
  cardRef,
}: CompactTypographyCardProps) {
  const projectNumber = String(index + 1).padStart(2, '0');
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
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
        bg: theme?.colors?.accent ? hexToRgba(theme.colors.accent, 0.1) : 'rgb(219 234 254)',
        text: theme?.colors?.accent || 'rgb(37 99 235)',
        border: theme?.colors?.accent ? hexToRgba(theme.colors.accent, 0.2) : 'rgb(191 219 254)',
      };
    }
    
    // Use theme colors with subtle opacity
    if (currentTheme === 'dark' || currentTheme === 'terminal' || currentTheme === 'cyberpunk') {
      return {
        bg: theme?.colors?.accent ? hexToRgba(theme.colors.accent, 0.05) : 'rgba(255, 255, 255, 0.03)',
        text: theme?.colors?.muted || 'rgba(255, 255, 255, 0.5)',
        border: theme?.colors?.border || 'rgba(255, 255, 255, 0.1)',
        hoverBorder: theme?.colors?.accent ? hexToRgba(theme.colors.accent, 0.15) : 'rgba(255, 255, 255, 0.15)',
      };
    }
    
    // For light themes, use subtle tinted backgrounds
    return {
      bg: theme?.colors?.card || 'rgb(255, 255, 255)',
      text: theme?.colors?.muted || 'rgb(75, 85, 99)',
      border: theme?.colors?.border || 'rgb(229, 231, 235)',
      hoverBorder: theme?.colors?.accent ? hexToRgba(theme.colors.accent, 0.15) : 'rgb(209, 213, 219)',
    };
  };
  
  const tagColors = getTagColors();

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className={`
        group relative p-5 sm:p-6 h-full
        cursor-pointer rounded-lg
        transition-all duration-500 ease-out
        hover:bg-gray-500/5 hover:backdrop-blur-sm
        ${isKeyboardFocused ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-500/10' : ''}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Project Number - Top left corner */}
      <span className={`
        absolute top-5 left-5 sm:top-6 sm:left-6
        font-mono text-2xl font-light
        transition-all duration-500
        ${isKeyboardFocused 
          ? 'text-blue-500 opacity-100' 
          : 'opacity-20 group-hover:opacity-40'}
      `}
      style={{
        color: isKeyboardFocused ? undefined : 'var(--theme-muted)'
      }}>
        {projectNumber}
      </span>

      {/* Main Content - With left padding for number */}
      <div className="pl-10 sm:pl-12">
        {/* Title - Smaller but still prominent */}
        <h3 className={`
          text-lg sm:text-xl font-bold tracking-tight
          transition-all duration-500
          mb-1.5
          ${isKeyboardFocused 
            ? 'text-blue-500' 
            : ''}
        `}
        style={{
          color: isKeyboardFocused ? undefined : 'var(--theme-heading, var(--theme-text))'
        }}>
          {project.title}
        </h3>

        {/* Description - Compact */}
        <p className={`
          text-xs leading-relaxed mb-3
          transition-all duration-500
          line-clamp-2
          font-light
        `}
        style={{
          fontSize: '0.75rem',
          fontWeight: 300,
          color: 'var(--theme-muted)',
          opacity: isKeyboardFocused ? 1 : 0.9
        }}>
          {project.description}
        </p>

        {/* Tags - Minimal, inline */}
        <div className="flex flex-wrap items-center gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wide px-1 py-0.5 rounded-sm transition-all duration-300 font-normal border"
              style={{
                backgroundColor: tagColors.bg,
                color: tagColors.text,
                borderColor: tagColors.border,
              }}
              onMouseEnter={(e) => {
                if (!isKeyboardFocused && tagColors.hoverBorder) {
                  e.currentTarget.style.borderColor = tagColors.hoverBorder;
                }
              }}
              onMouseLeave={(e) => {
                if (!isKeyboardFocused) {
                  e.currentTarget.style.borderColor = tagColors.border;
                }
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Links - Bottom right corner, always visible but subtle */}
      <div className={`
        absolute bottom-5 right-5 sm:bottom-6 sm:right-6
        flex items-center gap-2
        transition-all duration-500
        ${isKeyboardFocused 
          ? 'opacity-100' 
          : 'opacity-40 group-hover:opacity-100'}
      `}>
        <a
          href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
          className={`
            inline-flex items-center justify-center
            w-6 h-6 rounded-full
            transition-all duration-500
            ${isKeyboardFocused 
              ? 'text-blue-600 bg-blue-100' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}
          `}
          aria-label="View project details"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowRight className="w-3 h-3" />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            inline-flex items-center justify-center
            w-6 h-6 rounded-full
            transition-all duration-500
            ${isKeyboardFocused 
              ? 'text-blue-600 bg-blue-100' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <Github className="w-3 h-3" />
        </a>
      </div>

      {/* Subtle border - only on hover or focus */}
      <div className={`
        absolute inset-0 rounded-lg pointer-events-none
        transition-all duration-500
        ${isKeyboardFocused 
          ? 'border-2 border-blue-500/30' 
          : 'border border-transparent group-hover:border-gray-500/20'}
      `} />

      {/* Very subtle gradient overlay on hover - uses currentColor for theme awareness */}
      <div className={`
        absolute inset-0 -z-10 rounded-lg
        transition-all duration-700 ease-out
        opacity-0 group-hover:opacity-100
        bg-gradient-to-br from-current/[0.02] via-transparent to-transparent
      `} />
    </motion.article>
  );
}