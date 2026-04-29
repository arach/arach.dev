import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { IdeaSummary } from "@/lib/ideas";
import { EditorialCard } from "@/components/ui";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function IdeasPage({ ideas }: { ideas: IdeaSummary[] }) {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: "var(--theme-muted-color)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            arach.dev
          </Link>
        </div>

        <header className="mb-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.16em]" style={{ color: "var(--theme-accent-color)" }}>
            Ideas
          </p>
          <h1 className="mt-3 text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.25rem]">
            Writing on systems, tools, and product shape.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.6]" style={{ color: "var(--theme-muted-color)" }}>
            Notes on code structure, product architecture, interface design, local-first tools, and the way software gets clearer or more confused over time.
          </p>
        </header>

        <div className="space-y-4">
          {ideas.map((idea) => (
            <Link key={idea.slug} href={`/ideas/${idea.slug}`} className="block">
              <EditorialCard
                eyebrow={
                  <>
                    <time>{formatDate(idea.date)}</time>
                    {idea.tags.slice(0, 3).map((tag) => (
                      <span key={tag} style={{ color: "var(--theme-accent-color)" }}>
                        {tag}
                      </span>
                    ))}
                  </>
                }
                title={idea.title}
                description={idea.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
