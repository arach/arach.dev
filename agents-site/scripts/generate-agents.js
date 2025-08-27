#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const agentsDir = path.join(__dirname, '../src/agents');
const publicDir = path.join(__dirname, '../public');

// Agent templates based on the agents.txt map
const agentSpecs = {
  'frontend-engineer-arnold': {
    title: 'Frontend Engineer Arnold',
    type: 'Frontend Engineering Expert',
    model: 'Default',
    projects: ['Scout', 'Blink', 'Scout-Typography'],
    description: 'Expert frontend engineering analysis, refactoring, or optimization of React/TypeScript applications',
    capabilities: [
      'Component architecture review and refactoring',
      'Performance optimization and profiling',
      'Type safety enhancement and migration',
      'Technical debt identification and resolution',
      'Modern React patterns implementation',
      'Accessibility improvements',
      'Testing strategy development'
    ]
  },
  'backend-engineer-david': {
    title: 'Backend Engineer David',
    type: 'Systems Programming & Desktop Applications Expert',
    model: 'Default',
    projects: ['Scout', 'Blink', 'Scout-Typography'],
    description: 'Expert in Rust systems programming, Tauri v2 desktop applications, audio processing, and AI/ML integration',
    capabilities: [
      'Rust code optimization and best practices',
      'Tauri v2 IPC architecture design',
      'Audio processing with whisper.cpp integration',
      'SQLite and PostgreSQL database optimization',
      'Swift-Rust bridging for macOS',
      'Memory management and performance tuning',
      'Async runtime optimization',
      'Cross-platform system integration'
    ]
  },
  'product-designer-jimmy': {
    title: 'Product Designer Jimmy',
    type: 'Full-stack Design Partner',
    model: 'Default',
    projects: ['Scout', 'Blink', 'Scout-Typography'],
    tools: 'Read, Edit, Grep (limited toolset)',
    description: 'Breaks down product requirements, generates design solutions, and critiques screenshots or front-end code',
    capabilities: [
      'UI/UX design consultation',
      'Accessibility audits',
      'Design system creation',
      'User flow optimization',
      'Visual polish recommendations'
    ]
  }
};

// Generate individual agent files
function generateAgentFiles() {
  Object.entries(agentSpecs).forEach(([id, spec]) => {
    const content = `# ${spec.title}

## Overview
${spec.description}

## Configuration
- **Type**: ${spec.type}
- **Model**: ${spec.model}
${spec.tools ? `- **Tools**: ${spec.tools}` : '- **Tools**: All standard development tools'}

## Capabilities
${spec.capabilities.map(cap => `- ${cap}`).join('\n')}

## Projects Using This Agent
${spec.projects.map(proj => `- ${proj}`).join('\n')}

## Usage Example
\`\`\`typescript
{
  subagent_type: "${id}",
  description: "Brief task description",
  prompt: \`
    Detailed instructions for the agent...
  \`
}
\`\`\`
`;

    fs.writeFileSync(path.join(agentsDir, `${id}.md`), content);
    console.log(`Generated: ${id}.md`);
  });
}

// Generate index file
function generateIndex() {
  const agents = Object.keys(agentSpecs);
  const indexContent = {
    agents: agents.map(id => ({
      id,
      ...agentSpecs[id]
    })),
    total: agents.length,
    categories: {
      engineering: agents.filter(id => id.includes('engineer')).length,
      design: agents.filter(id => id.includes('designer')).length,
      architecture: agents.filter(id => id.includes('architect')).length
    }
  };

  fs.writeFileSync(
    path.join(publicDir, 'agents-index.json'),
    JSON.stringify(indexContent, null, 2)
  );
  console.log('Generated agents-index.json');
}

// Run generation
generateAgentFiles();
generateIndex();
console.log('Agent generation complete!');