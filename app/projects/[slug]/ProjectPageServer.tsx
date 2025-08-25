import Link from 'next/link';
import { ArrowLeft, Github, Globe, BookOpen, ExternalLink, Star, Download, Users } from 'lucide-react';
import type { Project } from '@/lib/projects';

// This renders on the server with default theme (light or dark based on system)
// No hooks, no client-side state
export default function ProjectPageServer({ project }: { project: Project }) {
  // Default theme values for server-side render
  const defaultTheme = {
    borderColor: 'rgb(229, 231, 235)',
    headerBg: 'rgba(255, 255, 255, 0.8)',
    mutedTextColor: 'rgb(107, 114, 128)',
    textColor: 'rgb(17, 24, 39)',
    headingColor: 'rgb(17, 24, 39)',
    cardBg: 'rgb(249, 250, 251)',
    accentColor: 'rgb(59, 130, 246)',
  };

  return (
    <div className="relative z-10 min-h-screen">
      {/* Header */}
      <header 
        className="border-b transition-colors duration-300"
        style={{
          borderColor: defaultTheme.borderColor,
          backgroundColor: defaultTheme.headerBg,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 transition-colors hover:opacity-80"
            style={{
              color: defaultTheme.mutedTextColor,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">
              Back to projects
            </span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="mb-8">
            <div className="mb-6">
              <h1 
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  color: defaultTheme.headingColor,
                }}
              >
                {project.title}
              </h1>
              <p 
                className="text-base md:text-lg"
                style={{
                  color: defaultTheme.mutedTextColor,
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: project.status === 'active'
                    ? 'rgb(220, 252, 231)'
                    : project.status === 'maintained'
                    ? 'rgb(254, 249, 195)'
                    : 'rgb(243, 244, 246)',
                  color: project.status === 'active'
                    ? 'rgb(22, 163, 74)'
                    : project.status === 'maintained'
                    ? 'rgb(161, 98, 7)'
                    : defaultTheme.mutedTextColor,
                }}
              >
                {project.status === 'active' ? 'Active Development' : 
                 project.status === 'maintained' ? 'Maintained' : 
                 'Archived'}
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 bg-gray-900 text-white"
                  style={{
                    fontSize: '14px',
                  }}
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
              {/* ... other buttons ... */}
            </div>
          </div>

          {/* About Section */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: defaultTheme.headingColor }}>
              About
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: defaultTheme.textColor, lineHeight: '1.75' }}>
              {project.longDescription}
            </p>
          </section>

          {/* Features */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: defaultTheme.headingColor }}>
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: defaultTheme.cardBg,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-sm" style={{ color: defaultTheme.textColor }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: defaultTheme.headingColor }}>
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: 'rgb(239, 246, 255)',
                    color: defaultTheme.accentColor,
                    border: '1px solid rgb(191, 219, 254)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Tags */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: defaultTheme.headingColor }}>
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md text-xs"
                  style={{
                    border: `1px solid ${defaultTheme.borderColor}`,
                    color: defaultTheme.mutedTextColor,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}