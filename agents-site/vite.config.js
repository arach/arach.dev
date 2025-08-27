import { defineConfig } from 'vite';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  base: '/', // Will be served from agents.arach.dev
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        agents: './agents.html'
      }
    }
  },
  server: {
    port: 3001
  },
  plugins: [
    {
      name: 'agents-api',
      configureServer(server) {
        // Serve agent data as JSON API
        server.middlewares.use('/api/agents', (req, res) => {
          const agentsDir = join(process.cwd(), 'src/agents');
          const agents = readdirSync(agentsDir)
            .filter(f => f.endsWith('.md'))
            .map(f => {
              const content = readFileSync(join(agentsDir, f), 'utf-8');
              const id = f.replace('.md', '');
              return { id, content };
            });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(agents));
        });
      }
    }
  ]
});