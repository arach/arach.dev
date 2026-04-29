'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

import { EditorialCard } from '@/components/ui';

interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
  tags: string[];
  preview?: string;
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="cursor-pointer outline-none"
      style={{ willChange: 'transform, opacity' }}
    >
      <EditorialCard
        focused={isKeyboardFocused}
        leadingNumber={projectNumber}
        eyebrow={
          <>
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="ml-auto inline-flex items-center gap-1 transition-opacity hover:opacity-100"
                style={{ opacity: 0.5 }}
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="h-3 w-3" />
              </a>
            ) : null}
          </>
        }
        title={project.title}
        description={project.description}
      />
    </motion.div>
  );
}
