import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ideasDirectory = path.join(process.cwd(), "content/ideas");

export type IdeaFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  entryType?: string | null;
  status?: string | null;
  draft?: boolean;
};

export type IdeaSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  entryType: string | null;
  status: string | null;
  draft: boolean;
};

export type IdeaPost = IdeaSummary & {
  content: string;
};

function normalizeIdea(slug: string, data: Partial<IdeaFrontmatter>, content?: string): IdeaPost {
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date(0).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
    entryType: data.entryType ?? null,
    status: data.status ?? null,
    draft: Boolean(data.draft),
    content: content ?? "",
  };
}

function readIdeaFile(filename: string): IdeaPost | null {
  const filePath = path.join(ideasDirectory, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const slug = filename.replace(/\.mdx?$/, "");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return normalizeIdea(slug, data as Partial<IdeaFrontmatter>, content);
}

export function getAllIdeas(): IdeaSummary[] {
  if (!fs.existsSync(ideasDirectory)) {
    return [];
  }

  return fs.readdirSync(ideasDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => readIdeaFile(filename))
    .filter((idea): idea is IdeaPost => Boolean(idea))
    .filter((idea) => !idea.draft)
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .map(({ content: _content, ...idea }) => idea);
}

export function getIdeaBySlug(slug: string): IdeaPost | null {
  return readIdeaFile(`${slug}.mdx`);
}

export function getAllIdeaSlugs(): string[] {
  return getAllIdeas().map((idea) => idea.slug);
}
