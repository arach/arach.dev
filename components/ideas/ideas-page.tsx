import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { IdeaSummary } from "@/lib/ideas";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function IdeasPage({ ideas }: { ideas: IdeaSummary[] }) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <header className="relative pb-14 pt-12 sm:pb-16 sm:pt-20">
        <div aria-hidden className="bp-grid pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2" />
        <p className="fig">( 02 ) Notes</p>
        <h1 className="mt-8 max-w-[20ch] text-[36px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[48px]">
          Technical notes on systems, tools, and code structure.
        </h1>
        <p className="mt-6 max-w-[56ch] text-[17px] font-normal leading-[1.6]" style={{ color: "var(--theme-muted-color)" }}>
          Build logs, architecture notes, and how specific tools work. Essays and longer
          writing live on{" "}
          <a
            href="https://arach.io"
            className="underline decoration-1 underline-offset-4 transition-colors hover:text-[color:var(--theme-accent-color)]"
            style={{ color: "var(--theme-text-color)", textDecorationColor: "var(--theme-border-color)" }}
          >
            arach.io
          </a>
          .
        </p>
      </header>

      <section aria-labelledby="notes-heading">
        <div className="section-head">
          <h2 id="notes-heading" className="fig" style={{ color: "var(--theme-text-color)" }}>
            Index
          </h2>
          <span className="fig tabular-nums">{String(ideas.length).padStart(2, "0")} entries</span>
        </div>

        {ideas.length === 0 ? (
          <div className="border-y py-10" style={{ borderColor: "var(--theme-border-color)" }}>
            <p className="fig" style={{ color: "var(--theme-muted-color)" }}>Nothing filed yet</p>
            <p className="mt-3 max-w-[52ch] text-[16px] font-normal leading-[1.6]" style={{ color: "var(--theme-muted-color)" }}>
              The first notes are in progress. In the meantime, the{" "}
              <Link href="/" className="underline decoration-1 underline-offset-4 hover:text-[color:var(--theme-accent-color)]" style={{ textDecorationColor: "var(--theme-border-color)" }}>
                project pages
              </Link>{" "}
              cover how each tool is built, and essays are on{" "}
              <a href="https://arach.io" className="underline decoration-1 underline-offset-4 hover:text-[color:var(--theme-accent-color)]" style={{ textDecorationColor: "var(--theme-border-color)" }}>
                arach.io
              </a>
              .
            </p>
          </div>
        ) : (
          <ol className="border-t" style={{ borderColor: "var(--theme-border-color)" }}>
            {ideas.map((idea, i) => (
              <li key={idea.slug} className="border-b" style={{ borderColor: "var(--theme-border-color)" }}>
                <Link href={`/ideas/${idea.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
                  <div className="fig flex flex-wrap gap-x-2.5 sm:flex-col sm:gap-y-1">
                    <span className="tabular-nums" style={{ color: "var(--theme-muted-color)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <time dateTime={idea.date}>{formatDate(idea.date)}</time>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] transition-colors group-hover:text-[color:var(--theme-accent-color)] sm:text-[26px]">
                      {idea.title}
                      <ArrowUpRight className="ml-1 inline h-4 w-4 align-baseline opacity-40" />
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] font-normal leading-[1.65]" style={{ color: "var(--theme-muted-color)" }}>
                      {idea.description}
                    </p>
                    {idea.tags.length > 0 ? (
                      <p className="fig mt-3">{idea.tags.slice(0, 3).join(" / ")}</p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
