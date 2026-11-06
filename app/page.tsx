import { HomeShell } from '@/components/home/HomeShell';
import { getAllIdeas } from '@/lib/ideas';
import type { Metadata } from 'next';
import { getHomepageProjectsWithLogos } from '@/lib/projects-server';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  const projects = getHomepageProjectsWithLogos();
  const ideas = getAllIdeas();
  return <HomeShell projects={projects} ideas={ideas} />;
}
