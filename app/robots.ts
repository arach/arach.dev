import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/og-preview', '/og-showcase', '/projects/og-previews', '/gallery', '/theme-demo'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
