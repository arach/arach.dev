import { marked } from 'marked';

// Auth removed - open access
const isAuthenticated = () => {
  return true;
};

// Load agent data from static JSON
async function loadAgents() {
  try {
    const response = await fetch('/agents-data.json');
    const data = await response.json();
    return data.agents || [];
  } catch (error) {
    console.error('Failed to load agents:', error);
    return [];
  }
}

// Render agent cards with terminal header
function renderAgentGrid(agents) {
  const container = document.createElement('div');
  
  // Add terminal-style header
  const header = document.createElement('div');
  header.style.cssText = `
    color: var(--terminal-green);
    margin-bottom: 1rem;
    font-family: 'IBM Plex Mono', monospace;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
  `;
  header.innerHTML = `
    <p>$ ls -la agents/ | grep -E "(ready|active)"</p>
    <p style="color: var(--text-secondary); font-size: 0.875rem;">total ${agents.length} agents</p>
  `;
  
  const grid = document.createElement('div');
  grid.className = 'agent-grid';
  
  agents.forEach((agent, index) => {
    const card = createAgentCard(agent);
    // Add slight staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    grid.appendChild(card);
  });
  
  container.appendChild(header);
  container.appendChild(grid);
  return container;
}

// Create individual agent card
function createAgentCard(agent) {
  const card = document.createElement('div');
  card.className = 'agent-card';
  
  const statusIndicators = {
    'Engineering': '●',
    'Design & UX': '●',
    'Architecture & Review': '●',
    'Infrastructure & DevOps': '●',
    'Documentation & Testing': '●'
  };
  
  card.innerHTML = `
    <div class="agent-header">
      <div class="agent-type">${agent.type}</div>
      <div class="status-indicator">${statusIndicators[agent.type] || '●'} READY</div>
    </div>
    <h3>${agent.name}</h3>
    <p class="description">${agent.description}</p>
    <div class="capabilities">
      ${agent.capabilities.slice(0, 4).map(cap => 
        `<span class="capability-tag">${cap}</span>`
      ).join('')}
    </div>
    <div class="projects">
      ${agent.projects.slice(0, 3).join(', ')}
    </div>
    <a href="/agents/${agent.id}" class="view-details">
      view spec
    </a>
  `;
  
  return card;
}

// Terminal typewriter effect
function typeWriterEffect(element, text, speed = 30) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Update agent count in header
function updateAgentCount(count) {
  const statusElements = document.querySelectorAll('header p');
  statusElements.forEach(el => {
    if (el.textContent.includes('Loading...')) {
      el.innerHTML = `Status: <span style="color: var(--terminal-green);">ONLINE</span> • Agents: <strong style="color: var(--accent);">${count}</strong> • Updated: 2024`;
    }
  });
}

// Initialize app
async function init() {
  const content = document.getElementById('content');
  const terminalContent = content.querySelector('.terminal-content');
  
  // Load and display agents
  const agents = await loadAgents();
  updateAgentCount(agents.length);
  
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    // Show overview with terminal styling
    terminalContent.innerHTML = `
      <div class="overview">
        <h2>registry.init()</h2>
        <p>Specialized AI agents for development automation and task execution.</p>
        <p>Total agents available: <strong>${agents.length}</strong></p>
        
        <h3>agent.categories()</h3>
        <ul>
          <li><strong>Engineering</strong> - Frontend, Backend, Full-stack development</li>
          <li><strong>Architecture & Review</strong> - Code review, System design</li>
          <li><strong>Design & UX</strong> - UI/UX, Developer experience</li>
          <li><strong>Infrastructure & DevOps</strong> - Server management, CI/CD</li>
          <li><strong>Documentation & Testing</strong> - Docs generation, Test automation</li>
        </ul>
        
        <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border: 1px solid var(--border);">
          <p style="color: var(--terminal-green); margin-bottom: 0.5rem;">$ agent --help</p>
          <p style="color: var(--text-secondary); font-size: 0.875rem;">Available commands:</p>
          <ul style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
            <li><code>list-all</code> - View all available agents</li>
            <li><code>api-docs</code> - Access API documentation</li>
            <li><code>search &lt;query&gt;</code> - Search agents by capability</li>
          </ul>
        </div>
      </div>
    `;
    
    // Add some interactive terminal effects
    const h2 = terminalContent.querySelector('h2');
    if (h2) {
      typeWriterEffect(h2, 'registry.init()', 80);
    }
    
  } else if (window.location.pathname === '/agents.html') {
    // Show loading effect first
    terminalContent.innerHTML = `
      <div style="color: var(--terminal-green); margin-bottom: 1rem;">
        <p>$ scanning agents directory...</p>
        <p style="color: var(--text-secondary);">Found ${agents.length} agents. Loading specifications...</p>
      </div>
    `;
    
    // Show all agents after brief delay
    setTimeout(() => {
      const grid = renderAgentGrid(agents);
      terminalContent.innerHTML = '';
      terminalContent.appendChild(grid);
    }, 800);
  }
}

// Auth prompt (placeholder for now)
function showAuthPrompt() {
  const overlay = document.createElement('div');
  overlay.className = 'protected-overlay';
  overlay.innerHTML = `
    <div class="auth-form">
      <h2>🔒 Agent Registry</h2>
      <p style="color: var(--text-secondary); margin-bottom: 1rem;">
        Enter access code to view agent specifications
      </p>
      <input type="password" id="auth-password" placeholder="Access code" autofocus />
      <button id="auth-button" onclick="authenticate()">Access</button>
      <p style="color: var(--text-tertiary); margin-top: 1rem; font-size: 0.875rem;">
        Protected content • arach.dev
      </p>
    </div>
  `;
  document.body.appendChild(overlay);
  
  // Allow Enter key to submit
  document.getElementById('auth-password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      authenticate();
    }
  });
  
  window.authenticate = () => {
    const password = document.getElementById('auth-password').value;
    // Access code - change this to your preferred code
    if (password === 'arach' || password === 'agents2024') {
      localStorage.setItem('agents_auth', 'authenticated');
      location.reload();
    } else {
      document.getElementById('auth-password').style.borderColor = '#ef4444';
      document.getElementById('auth-password').value = '';
      document.getElementById('auth-password').placeholder = 'Invalid code, try again';
    }
  };
}

// Terminal command processor
class TerminalProcessor {
  constructor(agents) {
    this.agents = agents;
    this.commands = {
      'help': () => this.showHelp(),
      'clear': () => this.clearOutput(),
      'ls': () => this.listAgents(),
      'search': (query) => this.searchAgents(query),
      'info': (agentId) => this.showAgentInfo(agentId),
      'categories': () => this.showCategories(),
      'stats': () => this.showStats()
    };
  }
  
  process(input) {
    const [command, ...args] = input.trim().toLowerCase().split(' ');
    
    if (this.commands[command]) {
      return this.commands[command](args.join(' '));
    } else {
      return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  }
  
  showHelp() {
    return `Available commands:
• help - Show this help message
• ls - List all agents
• search <query> - Search agents by name or capability
• info <agent-id> - Show detailed info for an agent
• categories - Show agent categories
• stats - Show registry statistics
• clear - Clear terminal output`;
  }
  
  clearOutput() {
    return '';
  }
  
  listAgents() {
    return this.agents.map(agent => 
      `${agent.id.padEnd(25)} ${agent.type.padEnd(20)} ${agent.name}`
    ).join('\n');
  }
  
  searchAgents(query) {
    if (!query) return 'Usage: search <query>';
    
    const results = this.agents.filter(agent => 
      agent.name.toLowerCase().includes(query) ||
      agent.description.toLowerCase().includes(query) ||
      agent.capabilities.some(cap => cap.toLowerCase().includes(query))
    );
    
    if (results.length === 0) {
      return `No agents found matching: ${query}`;
    }
    
    return `Found ${results.length} agent(s):\n` + results.map(agent => 
      `• ${agent.name} - ${agent.description.substring(0, 60)}...`
    ).join('\n');
  }
  
  showAgentInfo(agentId) {
    if (!agentId) return 'Usage: info <agent-id>';
    
    const agent = this.agents.find(a => a.id === agentId);
    if (!agent) return `Agent not found: ${agentId}`;
    
    return `Agent: ${agent.name}
Type: ${agent.type}
Model: ${agent.model}
Description: ${agent.description}
Projects: ${agent.projects.join(', ')}
Capabilities:
${agent.capabilities.map(cap => `• ${cap}`).join('\n')}`;
  }
  
  showCategories() {
    const categories = {};
    this.agents.forEach(agent => {
      if (!categories[agent.type]) categories[agent.type] = [];
      categories[agent.type].push(agent.name);
    });
    
    return Object.entries(categories).map(([type, agents]) => 
      `${type}:\n${agents.map(name => `• ${name}`).join('\n')}`
    ).join('\n\n');
  }
  
  showStats() {
    const total = this.agents.length;
    const byType = {};
    this.agents.forEach(agent => {
      byType[agent.type] = (byType[agent.type] || 0) + 1;
    });
    
    return `Registry Statistics:
Total agents: ${total}

By category:
${Object.entries(byType).map(([type, count]) => `• ${type}: ${count}`).join('\n')}`;
  }
}

// Add interactive terminal
function addInteractiveTerminal(agents) {
  const processor = new TerminalProcessor(agents);
  
  // Add terminal input to overview page
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const overview = document.querySelector('.overview');
    if (overview) {
      const terminalSection = document.createElement('div');
      terminalSection.innerHTML = `
        <div style="margin-top: 2rem; background: var(--bg-secondary); border: 1px solid var(--border); padding: 1rem;">
          <p style="color: var(--terminal-green); margin-bottom: 0.5rem;">Interactive Terminal</p>
          <div id="terminal-output" style="min-height: 100px; max-height: 300px; overflow-y: auto; background: var(--bg-primary); padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid var(--border); font-family: 'IBM Plex Mono', monospace; font-size: 0.875rem; color: var(--text-secondary);"></div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: var(--terminal-green);">arach@agents:~$</span>
            <input type="text" id="terminal-input" style="flex: 1; background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-terminal); padding: 0.25rem 0.5rem; font-family: 'IBM Plex Mono', monospace;" placeholder="Type 'help' for commands">
          </div>
        </div>
      `;
      overview.appendChild(terminalSection);
      
      // Handle terminal input
      const input = document.getElementById('terminal-input');
      const output = document.getElementById('terminal-output');
      
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const command = input.value.trim();
          if (command) {
            const result = processor.process(command);
            
            if (command === 'clear') {
              output.innerHTML = '';
            } else {
              output.innerHTML += `<div style="color: var(--terminal-green);">$ ${command}</div>`;
              if (result) {
                output.innerHTML += `<div style="margin-bottom: 1rem; white-space: pre-line;">${result}</div>`;
              }
              output.scrollTop = output.scrollHeight;
            }
          }
          input.value = '';
        }
      });
      
      // Show welcome message
      output.innerHTML = `<div style="color: var(--accent);">Welcome to Agent Registry Terminal</div><div style="color: var(--text-secondary);">Type 'help' for available commands</div>`;
    }
  }
}

// Add some terminal interaction effects
function addTerminalEffects() {
  // Add hover effects to agent cards
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.agent-card')) {
      const card = e.target.closest('.agent-card');
      card.style.transform = 'translateY(-2px)';
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.agent-card')) {
      const card = e.target.closest('.agent-card');
      card.style.transform = 'translateY(0)';
    }
  });
}

// Start the app
document.addEventListener('DOMContentLoaded', async () => {
  await init();
  
  // Add interactive features after agents are loaded
  const agents = await loadAgents();
  addInteractiveTerminal(agents);
  addTerminalEffects();
});