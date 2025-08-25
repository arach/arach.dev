import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import type { Metadata } from 'next';
import ProjectPageClient from './ProjectPageClient';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found - arach.dev',
    };
  }

  // Get project index for the project number
  const projectIndex = projects.findIndex(p => p.slug === resolvedParams.slug);
  const projectNumber = String(projectIndex + 1).padStart(2, '0');

  return {
    title: `${project.title} - arach.dev`,
    description: project.longDescription,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.description)}&path=/projects/${resolvedParams.slug}&projectNumber=${projectNumber}&longDescription=${encodeURIComponent(project.longDescription.slice(0, 200))}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Get project index for the project number
  const projectIndex = projects.findIndex(p => p.slug === resolvedParams.slug);
  const projectNumber = String(projectIndex + 1).padStart(2, '0');

  return <ProjectPageClient project={project} projectNumber={projectNumber} />;
}