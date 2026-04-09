type CalloutTone = "note" | "warning" | "success";

const toneStyles: Record<CalloutTone, { accent: string; bg: string }> = {
  note: { accent: "#0ea5e9", bg: "rgba(14,165,233,0.08)" },
  warning: { accent: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  success: { accent: "#10b981", bg: "rgba(16,185,129,0.08)" },
};

export function Callout({
  title,
  tone = "note",
  children,
}: {
  title?: string;
  tone?: CalloutTone;
  children: React.ReactNode;
}) {
  const styles = toneStyles[tone];

  return (
    <div
      className="my-8 rounded-2xl border px-5 py-4"
      style={{
        borderColor: styles.accent,
        background: styles.bg,
      }}
    >
      {title ? (
        <div className="mb-2 text-[11px] font-mono uppercase tracking-[0.18em]" style={{ color: styles.accent }}>
          {title}
        </div>
      ) : null}
      <div className="[&_p]:my-0">{children}</div>
    </div>
  );
}
