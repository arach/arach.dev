# arach.dev

Personal developer portfolio website featuring an interactive agents registry for specialized AI development tools.

![arach.dev screenshot](screenshot.png)

## Overview

A modern, terminal-inspired portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features interactive background animations, project showcases, an AI agents registry, and a clean dark theme with terminal aesthetics.

## Tech Stack

- **Framework**: Next.js 14.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Font**: IBM Plex Mono

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Visit [http://localhost:3000/agents](http://localhost:3000/agents) to explore the agents registry.

## Project Structure

```
/app              # Next.js App Router pages and layouts
  /agents        # Agents registry pages and API routes
    /[slug]      # Individual agent detail pages
    /page.tsx    # Main agents registry page
  /api           # API routes
    /agents      # Agents data API endpoints
/agents           # Agent markdown files and configuration
  /agents        # Individual agent definitions (.md files)
/components       # Reusable React components
  /ui            # shadcn/ui components
  /home          # Homepage-specific components
/lib             # Utilities and shared code
  /agents.ts     # Agent data parsing and utilities
/public          # Static assets
```

## Features

### Core Portfolio
- Interactive node-based background animation
- Terminal-inspired aesthetic with retro styling
- Project showcase with GitHub links
- Responsive design
- Typewriter text effects
- Dark theme with custom gray color palette

### Agents Registry
- **Interactive Agent Browser**: Browse specialized AI development agents
- **Terminal-Styled Interface**: Consistent terminal aesthetics throughout the registry
- **Agent Categories**: Different types including Backend Engineer, Frontend Engineer, Product Designer, etc.
- **Dynamic Loading**: Real-time agent data fetching with loading states
- **Detailed Agent Profiles**: Individual pages for each agent with capabilities and project information
- **Markdown-Based Agent Definitions**: Easy-to-maintain agent configurations in markdown format

## Deployment

The site can be deployed on any platform that supports Next.js applications, such as Vercel, Netlify, or similar services.

## License

© 2025 Arach Tchoupani. All rights reserved.