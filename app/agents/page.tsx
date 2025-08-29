import { Metadata } from 'next';
import Link from 'next/link';
import { getAllAgents } from '@/lib/agents';
import './agents.css';

export const metadata: Metadata = {
  title: 'Agent Registry - arach.dev',
  description: 'A comprehensive collection of specialized AI agents for development tasks',
};

interface AgentCardProps {
  id: string;
  name: string;
  type: string;
  description: string;
  capabilities: string[];
  projects: string[];
  model?: string;
}

function AgentCard({ id, name, type, description, capabilities, projects, model }: AgentCardProps) {
  return (
    <Link href={`/agents/${id}`} className="group block">
      <div className="agent-card rounded-lg p-6">
        <div className="agent-type font-mono text-xs uppercase tracking-wider mb-3">
          [{type}] {model && `• ${model}`}
        </div>
        
        <h3 className="agent-name text-lg font-medium mb-3 transition-colors group-hover:text-[var(--theme-accent-color)]">
          {name}
        </h3>
        
        <p className="agent-description text-sm leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {capabilities.slice(0, 3).map((cap) => (
            <span key={cap} className="capability-tag font-mono text-xs px-2 py-1 rounded">
              {cap}
            </span>
          ))}
        </div>
        
        {projects.length > 0 && (
          <div className="text-xs mb-4" style={{ color: 'var(--theme-muted-text)' }}>
            Projects: {projects.join(', ')}
          </div>
        )}
        
        <div className="view-details text-sm font-mono">
          View Full Specification →
        </div>
      </div>
    </Link>
  );
}

export default async function AgentsPage() {
  const agents = await getAllAgents();
  
  return (
    <div className="agents-registry">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-medium mb-4" style={{ color: 'var(--theme-heading-color)' }}>
            Agent Registry
          </h1>
          <p className="text-lg" style={{ color: 'var(--theme-muted-text)' }}>
            Specialized AI agents for development automation
          </p>
        </header>
      
        <nav className="flex gap-6 text-sm mb-12 pb-4" style={{ borderBottom: '1px solid var(--theme-border-color)' }}>
          <a href="#overview" className="nav-link transition-colors">Overview</a>
          <a href="#agents" className="nav-link transition-colors">All Agents</a>
          <a href="/api/agents" className="nav-link transition-colors">API</a>
        </nav>

        <main>
          <section id="overview" className="mb-16">
            <h2 className="section-heading text-2xl font-medium mb-6">
              Overview
            </h2>
            <div className="overview-card rounded-lg p-6">
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--theme-text-color)' }}>
                This registry contains specialized AI agents designed to automate and enhance 
                various development tasks. Each agent has specific capabilities and use cases 
                tailored for modern software development workflows.
              </p>
              <p className="text-sm" style={{ color: 'var(--theme-muted-text)' }}>
                Total agents available: <strong style={{ color: 'var(--theme-text-color)' }}>{agents.length}</strong>
              </p>
            </div>
          </section>

          <section id="agents">
            <h2 className="section-heading text-2xl font-medium mb-8">
              Available Agents
            </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {agents.map((agent) => (
              <AgentCard key={agent.id} {...agent} />
            ))}
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}