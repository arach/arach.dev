import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type IdeaLayoutProps = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  entryType?: string | null;
  status?: string | null;
  children: React.ReactNode;
};

export function IdeaLayout({
  title,
  description,
  date,
  tags,
  entryType,
  status,
  children,
}: IdeaLayoutProps) {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: "var(--theme-muted-color)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All ideas
          </Link>
        </div>

        <header
          className="rounded-2xl border px-5 py-6 sm:px-8 sm:py-8"
          style={{
            background: "var(--theme-card-bg)",
            borderColor: "var(--theme-border-color)",
            boxShadow: "0 12px 48px -24px var(--theme-shadow-color)",
          }}
        >
          <div className="mb-5 flex flex-wrap gap-2">
            {entryType ? (
              <span className="rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em]" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-accent-color)" }}>
                {entryType}
              </span>
            ) : null}
            {status ? (
              <span className="rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em]" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-muted-color)" }}>
                {status}
              </span>
            ) : null}
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em]"
                style={{
                  borderColor: "var(--theme-border-color)",
                  color: "var(--theme-accent-color)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8" style={{ color: "var(--theme-muted-color)" }}>
            {description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-10" style={{ backgroundColor: "var(--theme-border-color)" }} />
            <time className="text-[11px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--theme-muted-color)" }}>
              {formatDate(date)}
            </time>
          </div>
        </header>

        <article className="mt-10">
          <div
            className="
              [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:opacity-80
              [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic
              [&_code]:rounded-md [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.95em]
              [&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight
              [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold
              [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t
              [&_li]:leading-8 [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:pl-6
              [&_p]:my-6 [&_p]:text-[1.06rem] [&_p]:leading-8
              [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:p-4
              [&_strong]:font-semibold
              [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse
              [&_td]:border [&_td]:p-3 [&_td]:align-top
              [&_th]:border [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold
              [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6
            "
            style={{
              color: "var(--theme-text-color)",
            }}
          >
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
