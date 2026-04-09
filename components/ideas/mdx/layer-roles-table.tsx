type LayerRoleRow = {
  layer: string;
  owns: string;
  avoids: string;
};

function normalizeRows(rows: LayerRoleRow[] | string | undefined): LayerRoleRow[] {
  if (Array.isArray(rows)) {
    return rows;
  }

  if (typeof rows !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(rows);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function LayerRolesTable({ rows }: { rows?: LayerRoleRow[] | string }) {
  const normalizedRows = normalizeRows(rows);

  return (
    <div className="my-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--theme-border-color)" }}>
      <table className="w-full border-collapse text-sm">
        <thead style={{ background: "var(--theme-card-bg)" }}>
          <tr>
            <th className="border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-accent-color)" }}>
              Layer
            </th>
            <th className="border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-accent-color)" }}>
              Owns
            </th>
            <th className="border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-accent-color)" }}>
              Should Not Own
            </th>
          </tr>
        </thead>
        <tbody>
          {normalizedRows.map((row) => (
            <tr key={row.layer}>
              <td className="border px-4 py-3 align-top font-medium" style={{ borderColor: "var(--theme-border-color)" }}>
                {row.layer}
              </td>
              <td className="border px-4 py-3 align-top" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-muted-color)" }}>
                {row.owns}
              </td>
              <td className="border px-4 py-3 align-top" style={{ borderColor: "var(--theme-border-color)", color: "var(--theme-muted-color)" }}>
                {row.avoids}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
