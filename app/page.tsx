import { HomeShell } from '@/components/home/HomeShell';
import { getAllIdeas } from '@/lib/ideas';
import { getHomepageProjectsWithLogos } from '@/lib/projects-server';

export default function Home() {
  const projects = getHomepageProjectsWithLogos();
  const ideas = getAllIdeas();
  return <HomeShell projects={projects} ideas={ideas} />;
}
