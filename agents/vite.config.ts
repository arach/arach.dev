import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
    react(),
    {
      name: 'agents-api-and-routing',
      configureServer(server) {
        // Serve agent data as JSON API
        server.middlewares.use('/api/agents', (req, res) => {
          const agentsDir = join(process.cwd(), 'agents');
          if (!existsSync(agentsDir)) {
            res.statusCode = 404;
            res.end('Agents directory not found');
            return;
          }
          
          const agents = readdirSync(agentsDir)
            .filter(f => f.endsWith('.md') && f !== 'index.md')
            .map(f => {
              const content = readFileSync(join(agentsDir, f), 'utf-8');
              const id = f.replace('.md', '');
              return { id, content };
            });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(agents));
        });

        // Handle individual agent pages
        server.middlewares.use('/agents/', (req, res, next) => {
          const agentId = req.url.split('/agents/')[1]?.split('?')[0];
          if (agentId) {
            const agentFile = join(process.cwd(), 'agents', `${agentId}.md`);
            if (existsSync(agentFile)) {
              // Serve the main index.html for SPA routing
              const indexPath = join(process.cwd(), 'index.html');
              const content = readFileSync(indexPath, 'utf-8');
              res.setHeader('Content-Type', 'text/html');
              res.end(content);
              return;
            }
          }
          next();
        });
      }
    }
  ]
});