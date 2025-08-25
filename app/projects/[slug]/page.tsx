import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import type { Metadata } from 'next';
import ProjectPageClient from './ProjectPageClient';

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

  return <ProjectPageClient project={project} />;
}