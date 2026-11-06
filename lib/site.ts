/** Canonical origin for the site. The lab (served under /lab) uses the same host. */
export const SITE_URL = 'https://www.arach.dev';

export const SITE_DESCRIPTION =
  'Arach builds local-first tools, agent infrastructure, and software systems. Projects, notes, and a training lab.';

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}
