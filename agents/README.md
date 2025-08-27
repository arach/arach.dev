# Agents Registry

A comprehensive collection of specialized AI agents for development automation, hosted at [agents.arach.dev](https://agents.arach.dev).

## Current Agents

- **Frontend Engineer** - React/TypeScript optimization expert
- **Backend Engineer** - Rust/Tauri systems programming specialist
- **Product Designer** - Full-stack design partner
- **Codebase Architecture Reviewer** - Comprehensive architecture analysis
- **Tauri Rust Architect** - Production Tauri app architecture
- **Developer UX Reviewer** - Developer tool and documentation evaluator
- **Dev Server Manager** - Development infrastructure automation

## Structure

```
agents/
├── agents/            # Individual agent markdown pages
├── src/
│   ├── agents/        # Agent source specifications
│   ├── styles.css     # Site styling
│   └── main.js        # Site functionality
├── public/            # Static assets
├── scripts/           # Build and generation scripts
└── dist/             # Build output (GitHub Pages)
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Deploy to GitHub Pages
pnpm deploy
```

## Adding New Agents

1. Create a new `.md` file in `src/agents/`
2. Follow the agent specification template
3. Run `pnpm generate` to update indexes
4. Deploy changes

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

```bash
pnpm deploy
```

## Subdomain Configuration

The site is accessible at `agents.arach.dev`. DNS configuration:
- CNAME record: agents.arach.dev → arach.github.io

## Authentication

Basic authentication is implemented client-side. For production use, consider:
- Cloudflare Access
- Netlify Identity
- Auth0 integration

## Future Enhancements

- [ ] Server-side authentication
- [ ] Agent versioning
- [ ] API rate limiting
- [ ] Search functionality
- [ ] Agent usage analytics
- [ ] Interactive playground