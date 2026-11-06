import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import { getProjectWithAssets } from '@/lib/projects-server';
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
    notFound();
  }

  // Get project index for the project number
  const projectIndex = projects.findIndex(p => p.slug === resolvedParams.slug);
  const projectNumber = String(projectIndex + 1).padStart(2, '0');

  const path = `/projects/${resolvedParams.slug}`;
  const ogUrl = `${path}/og.png`;

  return {
    title: `${project.title} - arach.dev`,
    description: project.longDescription,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description: project.description,
      url: path,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogUrl],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectWithAssets(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Get project index for the project number
  const projectIndex = projects.findIndex(p => p.slug === resolvedParams.slug);
  const projectNumber = String(projectIndex + 1).padStart(2, '0');

  return <ProjectPageClient project={project} projectNumber={projectNumber} />;
}
