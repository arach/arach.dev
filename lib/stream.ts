import type { Project } from "./projects";
import type { IdeaSummary } from "./ideas";

export type StreamEntryKind = "project" | "idea" | "play" | "release";

export type StreamEntry =
  | {
      kind: "project";
      slug: string;
      project: Project;
      /** Synthetic recency rank — lower is more recent. */
      rank: number;
      /** Marked as the lead artifact in the stream. */
      featured?: boolean;
    }
  | {
      kind: "idea";
      slug: string;
      idea: IdeaSummary;
      date: string;
    }
  | {
      kind: "play";
      slug: string;
      title: string;
      hint?: string;
      href: string;
    }
  | {
      kind: "release";
      title: string;
      version: string;
      project: string;
      date: string;
      href?: string;
    };

interface BuildStreamArgs {
  projects: Project[];
  ideas: IdeaSummary[];
}

/**
 * Builds the homepage stream by interleaving projects, ideas, and plays.
 * Projects don't have explicit dates yet — we trust the array order from
 * lib/projects.ts (already sorted by recent GitHub activity).
 */
export function buildStream({ projects, ideas }: BuildStreamArgs): StreamEntry[] {
  const projectEntries: StreamEntry[] = projects.map((project, i) => ({
    kind: "project" as const,
    slug: project.slug,
    project,
    rank: i,
    featured: i === 0,
  }));

  const ideaEntries: StreamEntry[] = ideas.map((idea) => ({
    kind: "idea" as const,
    slug: idea.slug,
    idea,
    date: idea.date,
  }));

  const playEntries: StreamEntry[] = [
    {
      kind: "play",
      slug: "terminal",
      title: "terminal",
      hint: "boot it",
      href: "/about/terminal",
    },
  ];

  // Interleave: lead with the featured project, then mix the rest.
  // Pattern: [featured project] [latest idea] [project] [project] [idea] [project]...
  const featured = projectEntries.shift();
  const interleaved: StreamEntry[] = [];
  if (featured) interleaved.push(featured);

  let p = 0;
  let n = 0;
  // After the featured project, drop in the most recent idea, then alternate
  // 2 projects : 1 idea so the stream stays project-heavy.
  let cycle = 0;
  while (p < projectEntries.length || n < ideaEntries.length) {
    const wantsIdea = cycle === 0 || cycle % 3 === 2;
    if (wantsIdea && n < ideaEntries.length) {
      interleaved.push(ideaEntries[n++]);
    } else if (p < projectEntries.length) {
      interleaved.push(projectEntries[p++]);
    } else if (n < ideaEntries.length) {
      interleaved.push(ideaEntries[n++]);
    }
    cycle++;
  }

  // Tuck the play entry near the end as a small flourish.
  interleaved.push(...playEntries);

  return interleaved;
}
