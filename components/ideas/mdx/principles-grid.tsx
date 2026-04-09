type Principle = {
  title: string;
  body: string;
};

function normalizeItems(items: Principle[] | string | undefined): Principle[] {
  if (Array.isArray(items)) {
    return items;
  }

  if (typeof items !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(items);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function PrinciplesGrid({ items }: { items?: Principle[] | string }) {
  const normalizedItems = normalizeItems(items);

  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {normalizedItems.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border p-4"
          style={{
            background: "var(--theme-card-bg)",
            borderColor: "var(--theme-border-color)",
          }}
        >
          <h3 className="mt-0 text-lg font-semibold">{item.title}</h3>
          <p className="mb-0 mt-2 text-base leading-7" style={{ color: "var(--theme-muted-color)" }}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}
