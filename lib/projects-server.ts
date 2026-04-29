import fs from "node:fs";
import path from "node:path";

import { getHomepageProjects, type Project } from "./projects";

const LOGO_EXTS = ["svg", "png", "webp"] as const;
const LOGO_DIR = path.join(process.cwd(), "public", "logos");

function findLogo(slug: string): string | undefined {
  for (const ext of LOGO_EXTS) {
    const file = path.join(LOGO_DIR, `${slug}.${ext}`);
    if (fs.existsSync(file)) return `/logos/${slug}.${ext}`;
  }
  return undefined;
}

/** Server-only: returns the project list with each project's logo path
 *  resolved from public/logos/{slug}.{svg,png,webp} if a file is present. */
export function getHomepageProjectsWithLogos(): Project[] {
  return getHomepageProjects().map((p) => ({ ...p, logo: findLogo(p.slug) }));
}
