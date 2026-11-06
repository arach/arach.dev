# Site Themes

arach.dev ships two themes that share their tokens with arach.io's classic template:

- **Light** (`default`) — cyanotype: cool paper, navy ink, blueprint grid, one cobalt accent
- **Dark** (`dark`) — warm graphite with a CRT-amber accent

With no saved preference, the site follows `prefers-color-scheme`. The header toggle
saves the choice in `localStorage` under `site-theme`.

## Tokens

The theme engine (`lib/theme/site/engine.ts`) writes each theme as CSS variables:

| Variable | Use |
| --- | --- |
| `--theme-bg-color` | Page paper |
| `--theme-text-color` | Ink |
| `--theme-muted-color` / `--theme-faint-color` | Secondary and tertiary text |
| `--theme-border-color` | Hairlines between items |
| `--theme-rule-color` | Strong rule above a section head |
| `--theme-grid-color` | Blueprint grid lines |
| `--theme-accent-color` | The one accent. Spend it sparingly. |
| `--theme-card-bg` | Raised cells |

## Rules

- Separate with hairlines, not shadows.
- Square corners. Pills only for toggles.
- Structural labels are uppercase Geist Mono; content is Geist Sans.
- One accent per view. Projects do not get their own colours.
