export function DirectoryTree({
  title,
  tree,
  caption,
  children,
}: {
  title?: string;
  tree?: string;
  caption?: string;
  children?: React.ReactNode;
}) {
  const content = typeof tree === "string"
    ? tree
    : typeof children === "string"
      ? children
      : "";

  return (
    <div
      className="my-8 overflow-hidden rounded-2xl border"
      style={{
        background: "var(--theme-card-bg)",
        borderColor: "var(--theme-border-color)",
      }}
    >
      {title ? (
        <div className="border-b px-4 py-3 text-[11px] font-mono uppercase tracking-[0.18em]" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-accent-color)" }}>
          {title}
        </div>
      ) : null}
      <pre className="m-0 overflow-x-auto p-4 text-sm leading-7" style={{ color: "var(--theme-text-color)" }}>
        <code>{content}</code>
      </pre>
      {caption ? (
        <div className="border-t px-4 py-3 text-sm" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-muted-color)" }}>
          {caption}
        </div>
      ) : null}
    </div>
  );
}
