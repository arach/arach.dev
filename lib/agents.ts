import fs from 'fs';
import path from 'path';

export interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  capabilities: string[];
  projects: string[];
  model: string;
  content: string;
}

function parseAgentMarkdown(content: string, id: string): Agent {
  const lines = content.split('\n');
  
  // Extract title (first h1)
  const titleLine = lines.find(line => line.startsWith('# '));
  const name = titleLine?.replace('# ', '') || id;
  
  // Extract metadata
  let type = '';
  let model = 'Default';
  let projects: string[] = [];
  let description = '';
  
  // Look for metadata in the first few lines
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i];
    if (line.startsWith('**Type**:')) {
      type = line.replace('**Type**:', '').trim();
    } else if (line.startsWith('**Model**:')) {
      model = line.replace('**Model**:', '').trim();
    } else if (line.startsWith('**Projects**:')) {
      const projectsStr = line.replace('**Projects**:', '').trim();
      projects = projectsStr.split(',').map(p => p.trim()).filter(p => p);
    }
  }
  
  // Extract description from the first paragraph after metadata
  const descriptionStart = lines.findIndex(line => 
    line.startsWith('## Description') || 
    (line.length > 20 && !line.startsWith('**') && !line.startsWith('#'))
  );
  
  if (descriptionStart !== -1) {
    let descLine = lines[descriptionStart];
    if (descLine.startsWith('## Description')) {
      // Look for the next non-empty line
      for (let i = descriptionStart + 1; i < lines.length; i++) {
        if (lines[i].trim() && !lines[i].startsWith('#')) {
          descLine = lines[i];
          break;
        }
      }
    }
    description = descLine.trim();
  }
  
  // Basic capability extraction
  const capabilities = [
    type || 'General',
    model !== 'Default' ? model : 'AI Assistant',
    projects.length > 0 ? `${projects.length} Projects` : 'Multi-purpose'
  ].filter(Boolean);
  
  return {
    id,
    name,
    type: type || 'General',
    description: description || 'Specialized AI agent for development tasks',
    capabilities,
    projects,
    model,
    content
  };
}

export async function getAllAgents(): Promise<Agent[]> {
  const agentsDir = path.join(process.cwd(), 'agents', 'agents');
  
  if (!fs.existsSync(agentsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(agentsDir);
  const agents: Agent[] = [];
  
  for (const file of files) {
    if (file.endsWith('.md') && file !== 'index.md') {
      const id = file.replace('.md', '');
      const filePath = path.join(agentsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      agents.push(parseAgentMarkdown(content, id));
    }
  }
  
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const agentsDir = path.join(process.cwd(), 'agents', 'agents');
  const filePath = path.join(agentsDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseAgentMarkdown(content, slug);
}