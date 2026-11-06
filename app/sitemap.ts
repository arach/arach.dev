import type { MetadataRoute } from 'next';

import { getAllIdeas } from '@/lib/ideas';
import { projects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/site';

// Lab pages are served from a separate app under /lab. Only its index pages are
// listed here; cross-posted lab articles carry their own external canonicals.
const LAB_PATHS = ['/lab', '/lab/ideas'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/about', '/ideas'];

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}`) })),
    ...getAllIdeas().map((idea) => ({
      url: absoluteUrl(`/ideas/${idea.slug}`),
      lastModified: idea.date,
    })),
    ...LAB_PATHS.map((path) => ({ url: absoluteUrl(path) })),
  ];
}
