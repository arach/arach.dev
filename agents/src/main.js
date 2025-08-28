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

// Render agent cards
function renderAgentGrid(agents) {
  const grid = document.createElement('div');
  grid.className = 'agent-grid';
  
  agents.forEach(agent => {
    const card = createAgentCard(agent);
    grid.appendChild(card);
  });
  
  return grid;
}

// Create individual agent card
function createAgentCard(agent) {
  const card = document.createElement('div');
  card.className = 'agent-card';
  
  const typeColors = {
    'Engineering': '#a0a0a0',
    'Design & UX': '#a0a0a0',
    'Architecture & Review': '#a0a0a0',
    'Infrastructure & DevOps': '#a0a0a0'
  };
  
  card.innerHTML = `
    <div class="agent-type" style="color: ${typeColors[agent.type] || '#999'}">
      ${agent.type} • ${agent.model}
    </div>
    <h3>${agent.name}</h3>
    <p class="description">${agent.description}</p>
    <div class="capabilities">
      ${agent.capabilities.slice(0, 3).map(cap => 
        `<span class="capability-tag">${cap}</span>`
      ).join('')}
    </div>
    <div class="projects">
      Projects: ${agent.projects.join(', ')}
    </div>
    <a href="/agents/${agent.id}" class="view-details">
      View Full Specification →
    </a>
  `;
  
  return card;
}

// Initialize app
async function init() {
  const content = document.getElementById('content');
  
  // Load and display agents
  const agents = await loadAgents();
  
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    // Show overview
    content.innerHTML = `
      <div class="overview">
        <h2>Welcome to the Agent Registry</h2>
        <p>This registry contains specialized AI agents for various development tasks.</p>
        <p>Total agents available: <strong>${agents.length}</strong></p>
        <div style="margin-top: 2rem;">
          <h3>Categories</h3>
          <ul>
            <li>Engineering Agents - Frontend, Backend, Full-stack</li>
            <li>Architecture & Review Agents - Code review, Architecture analysis</li>
            <li>Design & UX Agents - UI/UX, Developer experience</li>
            <li>Infrastructure & DevOps - Server management, CI/CD</li>
            <li>Documentation & Testing - Docs generation, Test automation</li>
          </ul>
        </div>
      </div>
    `;
  } else if (window.location.pathname === '/agents.html') {
    // Show all agents
    const grid = renderAgentGrid(agents);
    content.appendChild(grid);
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

// Start the app
document.addEventListener('DOMContentLoaded', init);