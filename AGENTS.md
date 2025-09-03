# Repository Guidelines

This repository contains a Next.js (App Router) site with TypeScript, Tailwind CSS v4, and an agents subproject managed via a pnpm workspace.

## Project Structure & Module Organization
- `app/`: Routes, layouts, API routes (`app/api/*`).
- `components/`: Reusable React components; UI variants live under subfolders.
- `lib/`, `hooks/`, `types/`: Shared utilities, hooks, and type definitions. Path alias: `@/*`.
- `public/`: Static assets. `styles/`, `css/`: Global styles and theme guides. `themes/`: Tailwind v4 themes.
- `scripts/`: Playwright-based helpers for visual checks.
- `agents/`: Agent registry (Vite site) included in `pnpm-workspace.yaml`.

## Build, Test, and Development Commands
- Install: `pnpm install`
- Dev server: `pnpm dev` (opens at `http://localhost:3000`)
- Build: `pnpm build`
- Start (prod): `pnpm start`
- Lint: `pnpm lint` (extends `next/core-web-vitals`)
- Agents subproject:
  - `pnpm -F @arach/agents dev | build | preview | generate`

## Coding Style & Naming Conventions
- TypeScript: strict mode enabled. Use `@/*` imports (e.g., `import Button from '@/components/Button'`).
- Components: PascalCase in `components/`; route files use `page.tsx`, `layout.tsx` in `app/*`.
- Tailwind v4: prefer utility-first classes; keep class order readable and semantic.
- Linting: fix warnings before PRs (`pnpm lint`). Aim for small, cohesive components.

## Testing Guidelines
- Visual checks (requires Playwright):
  - Theme screenshots: `node check-themes.js` (assumes `pnpm dev`).
  - Spacing comparisons: `node compare-sites.js`, `node compare-spacing.js`, `node check-card-spacing.js` (some expect `http://localhost:3009`).
- If adding tests, prefer Playwright specs (`*.spec.ts`) and colocate under a `tests/` or relevant feature folder.

## Commit & Pull Request Guidelines
- Commits: short, imperative, emoji-prefixed when helpful (examples from history):
  - `✨ Add dynamic theme loading`, `🐛 Fix theme provider context`, `🎨 Tweak gallery styling`, `♻️ Refactor theme system`, `⬆️ Migrate to Tailwind v4`, `💄 UI polish`, `📱 Mobile optimizations`.
- PRs: include a clear description, screenshots/gifs for visual changes, linked issues, and a checklist (lint passes, builds locally, docs updated).

## Security & Configuration Tips
- Copy `.env.example` to `.env.local`; never commit secrets. Verify env usage in `app/api/*` and `lib/*`.
- Deployment targets Vercel-compatible Next.js output; keep config in `next.config.mjs` minimal and safe.

## Agent-Specific Notes
- Agent docs live in `agents/`; generate/update pages with `pnpm -F @arach/agents generate` or build with `pnpm -F @arach/agents build` (output in `agents/dist/`). Keep agent markdown consistent with existing structure.

