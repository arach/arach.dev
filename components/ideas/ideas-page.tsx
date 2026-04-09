import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { IdeaSummary } from "@/lib/ideas";

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
          <p className="text-[11px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--theme-accent-color)" }}>
            Ideas
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Writing on systems, tools, and product shape.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8" style={{ color: "var(--theme-muted-color)" }}>
            Notes on code structure, product architecture, interface design, local-first tools, and the way software gets clearer or more confused over time.
          </p>
        </header>

        <div className="space-y-4">
          {ideas.map((idea) => (
            <Link
              key={idea.slug}
              href={`/ideas/${idea.slug}`}
              className="group block rounded-2xl border px-5 py-5 transition-transform duration-150 hover:-translate-y-0.5 sm:px-6"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-border-color)",
                boxShadow: "0 12px 40px -28px var(--theme-shadow-color)",
              }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em]" style={{ color: "var(--theme-muted-color)" }}>
                <time>{formatDate(idea.date)}</time>
                {idea.tags.slice(0, 3).map((tag) => (
                  <span key={tag} style={{ color: "var(--theme-accent-color)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:opacity-80">
                    {idea.title}
                  </h2>
                  <p className="mt-2 text-base leading-7" style={{ color: "var(--theme-muted-color)" }}>
                    {idea.description}
                  </p>
                </div>
                <ArrowRight className="mt-2 h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
