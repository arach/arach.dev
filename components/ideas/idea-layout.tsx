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
    <div className="px-4 pb-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="pt-10">
          <Link
            href="/ideas"
            className="fig link-quiet inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All notes
          </Link>
        </div>

        <header className="mt-10 border-b pb-10" style={{ borderColor: "var(--theme-border-color)" }}>
          <div className="fig flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <time dateTime={date}>{formatDate(date)}</time>
            {[entryType, status, ...tags].filter(Boolean).map((label) => (
              <span key={label as string} className="contents">
                <span style={{ color: "var(--theme-faint-color)" }}>/</span>
                <span>{label}</span>
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[46px]">{title}</h1>
          <p className="mt-5 max-w-2xl text-[18px] font-normal leading-[1.6]" style={{ color: "var(--theme-muted-color)" }}>
            {description}
          </p>
        </header>

        <article className="mt-10">
          <div
            className="
              [&_a]:text-[color:var(--theme-accent-color)] [&_a]:underline [&_a]:underline-offset-4
              [&_blockquote]:border-l [&_blockquote]:pl-5 [&_blockquote]:text-[color:var(--theme-muted-color)]
              [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.95em]
              [&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight
              [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold
              [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t
              [&_li]:leading-8 [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:pl-6
              [&_p]:my-6 [&_p]:text-[1.06rem] [&_p]:font-normal [&_p]:leading-8
              [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:p-4
              [&_strong]:font-semibold
              [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse
              [&_td]:border [&_td]:p-3 [&_td]:align-top
              [&_th]:border [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold
              [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6
            "
            style={{
              color: "var(--theme-text-color)",
              ["--tw-border-opacity" as string]: 1,
            }}
          >
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
