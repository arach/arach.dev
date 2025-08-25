import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import Link from 'next/link';
import { ArrowLeft, Github, Globe, BookOpen, ExternalLink, Star, Download, Users } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found - arach.dev',
    };
  }

  return {
    title: `${project.title} - arach.dev`,
    description: project.longDescription,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.description)}&path=/projects/${project.slug}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to projects</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-5xl">{project.icon}</span>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : project.status === 'maintained'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                {project.status === 'active' ? '🟢 Active Development' : 
                 project.status === 'maintained' ? '🟡 Maintained' : 
                 '⚪ Archived'}
              </span>
              
              {/* Metrics */}
              {project.metrics && (
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {project.metrics.stars && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {project.metrics.stars}
                    </span>
                  )}
                  {project.metrics.downloads && (
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {project.metrics.downloads}
                    </span>
                  )}
                  {project.metrics.users && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
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
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  style={{ borderColor: project.color }}
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
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Documentation
                </a>
              )}
            </div>
          </div>

          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              About
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{project.longDescription}</p>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Tags */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* Screenshots if available */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Screenshots
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="rounded-lg border border-gray-200 dark:border-gray-800"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}