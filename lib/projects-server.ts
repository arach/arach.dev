import fs from "node:fs";
import path from "node:path";

import { getHomepageProjects, getProjectBySlug, type Project } from "./projects";

const LOGO_EXTS = ["svg", "png", "webp"] as const;
const LOGO_DIR = path.join(process.cwd(), "public", "logos");

function findLogo(slug: string): string | undefined {
  for (const ext of LOGO_EXTS) {
    const file = path.join(LOGO_DIR, `${slug}.${ext}`);
    if (fs.existsSync(file)) return `/logos/${slug}.${ext}`;
  }
  return undefined;
}

const SCREENSHOT_DIR = path.join(process.cwd(), "public", "screenshots");

function findScreenshots(slug: string): string[] | undefined {
  const file = path.join(SCREENSHOT_DIR, `${slug}.png`);
  return fs.existsSync(file) ? [`/screenshots/${slug}.png`] : undefined;
}

/** Server-only: returns the project list with each project's logo and
 *  screenshot resolved from public/logos/{slug}.{svg,png,webp} and
 *  public/screenshots/{slug}.png when those files are present. */
export function getHomepageProjectsWithLogos(): Project[] {
  return getHomepageProjects().map((p) => ({
    ...p,
    logo: findLogo(p.slug),
    screenshots: p.screenshots ?? findScreenshots(p.slug),
  }));
}

/** Server-only: one project with its logo and screenshot resolved. */
export function getProjectWithAssets(slug: string): Project | undefined {
  const project = getProjectBySlug(slug);
  if (!project) return undefined;
  return {
    ...project,
    logo: project.logo ?? findLogo(slug),
    screenshots: project.screenshots ?? findScreenshots(slug),
  };
}
