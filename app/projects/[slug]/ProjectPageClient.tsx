'use client';

import Link from 'next/link';
import { ArrowLeft, Github, Globe, BookOpen, ExternalLink, Star, Download, Users } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import ThemedDottedGrid from '@/components/ThemedDottedGrid';
import type { Project } from '@/lib/projects';

export default function ProjectPageClient({ project }: { project: Project }) {
  const { currentTheme: theme } = useTheme();

  return (
    <>
      {/* Theme-aware background */}
      <ThemedDottedGrid />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header 
          className="border-b transition-colors duration-300"
          style={{
            borderColor: theme?.borderColor || 'rgb(229, 231, 235)',
            backgroundColor: theme?.headerBg || 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 transition-colors hover:opacity-80"
              style={{
                color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium" style={{ fontFamily: theme?.headerFont || 'inherit' }}>
                Back to projects
              </span>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl md:text-5xl">{project.icon}</span>
                <div className="flex-1">
                  <h1 
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{
                      color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                      fontFamily: theme?.headerFont || 'inherit',
                    }}
                  >
                    {project.title}
                  </h1>
                  <p 
                    className="text-base md:text-lg"
                    style={{
                      color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: project.status === 'active'
                      ? theme?.name === 'dark' || theme?.name === 'midnight' ? 'rgba(34, 197, 94, 0.1)' : 'rgb(220, 252, 231)'
                      : project.status === 'maintained'
                      ? theme?.name === 'dark' || theme?.name === 'midnight' ? 'rgba(250, 204, 21, 0.1)' : 'rgb(254, 249, 195)'
                      : theme?.name === 'dark' || theme?.name === 'midnight' ? 'rgba(156, 163, 175, 0.1)' : 'rgb(243, 244, 246)',
                    color: project.status === 'active'
                      ? theme?.name === 'dark' || theme?.name === 'midnight' ? 'rgb(134, 239, 172)' : 'rgb(22, 163, 74)'
                      : project.status === 'maintained'
                      ? theme?.name === 'dark' || theme?.name === 'midnight' ? 'rgb(250, 204, 21)' : 'rgb(161, 98, 7)'
                      : theme?.mutedTextColor || 'rgb(107, 114, 128)',
                  }}
                >
                  {project.status === 'active' ? '🟢 Active Development' : 
                   project.status === 'maintained' ? '🟡 Maintained' : 
                   '⚪ Archived'}
                </span>
                
                {/* Metrics */}
                {project.metrics && (
                  <div className="flex items-center gap-4 text-xs" style={{ color: theme?.mutedTextColor || 'rgb(107, 114, 128)' }}>
                    {project.metrics.stars && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.metrics.stars}
                      </span>
                    )}
                    {project.metrics.downloads && (
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {project.metrics.downloads}
                      </span>
                    )}
                    {project.metrics.users && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.metrics.users}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                    style={{
                      backgroundColor: theme?.name === 'dark' || theme?.name === 'midnight' ? 'rgb(255, 255, 255)' : 'rgb(17, 24, 39)',
                      color: theme?.name === 'dark' || theme?.name === 'midnight' ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)',
                      fontSize: '14px',
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
                {project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                    style={{
                      border: `1px solid ${project.color}`,
                      color: project.color,
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{
                      border: `1px solid ${theme?.borderColor || 'rgb(229, 231, 235)'}`,
                      color: theme?.textColor || 'rgb(17, 24, 39)',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.links.docs && (
                  <a
                    href={project.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{
                      border: `1px solid ${theme?.borderColor || 'rgb(229, 231, 235)'}`,
                      color: theme?.textColor || 'rgb(17, 24, 39)',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    Documentation
                  </a>
                )}
              </div>
            </div>

            {/* About Section */}
            <section className="mb-10">
              <h2 
                className="text-xl font-bold mb-4"
                style={{
                  color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                About
              </h2>
              <p 
                className="text-sm leading-relaxed"
                style={{
                  color: theme?.textColor || 'rgb(55, 65, 81)',
                  fontFamily: theme?.bodyFont || 'inherit',
                  lineHeight: '1.75',
                }}
              >
                {project.longDescription}
              </p>
            </section>

            {/* Features */}
            <section className="mb-10">
              <h2 
                className="text-xl font-bold mb-4"
                style={{
                  color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                Key Features
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor: theme?.cardBg || 'rgb(249, 250, 251)',
                      border: `1px solid ${theme?.borderColor || 'transparent'}`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <span 
                      className="text-sm"
                      style={{
                        color: theme?.textColor || 'rgb(55, 65, 81)',
                        fontFamily: theme?.bodyFont || 'inherit',
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tech Stack */}
            <section className="mb-10">
              <h2 
                className="text-xl font-bold mb-4"
                style={{
                  color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-medium"
                    style={{
                      backgroundColor: theme?.accentColor ? `${theme.accentColor}15` : 'rgb(239, 246, 255)',
                      color: theme?.accentColor || 'rgb(59, 130, 246)',
                      border: `1px solid ${theme?.accentColor ? `${theme.accentColor}30` : 'rgb(191, 219, 254)'}`,
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Tags */}
            <section className="mb-10">
              <h2 
                className="text-xl font-bold mb-4"
                style={{
                  color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                  fontFamily: theme?.headerFont || 'inherit',
                }}
              >
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md text-xs"
                    style={{
                      border: `1px solid ${theme?.borderColor || 'rgb(229, 231, 235)'}`,
                      color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                      fontFamily: theme?.bodyFont || 'inherit',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Screenshots if available */}
            {project.screenshots && project.screenshots.length > 0 && (
              <section className="mb-10">
                <h2 
                  className="text-xl font-bold mb-4"
                  style={{
                    color: theme?.headingColor || theme?.textColor || 'rgb(17, 24, 39)',
                    fontFamily: theme?.headerFont || 'inherit',
                  }}
                >
                  Screenshots
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="rounded-lg"
                      style={{
                        border: `1px solid ${theme?.borderColor || 'rgb(229, 231, 235)'}`,
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  );
}