import { marked } from 'marked';

// Simple auth check (you can enhance this later)
const isAuthenticated = () => {
  return localStorage.getItem('agents_auth') === 'authenticated';
};

// Load agent data
async function loadAgents() {
  try {
    const response = await fetch('/api/agents');
    const agents = await response.json();
    return agents;
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
  
  // Parse markdown to extract key info
  const lines = agent.content.split('\n');
  const title = agent.id.replace(/-/g, ' ');
  
  card.innerHTML = `
    <h3>${title}</h3>
    <div class="type">Engineering Agent</div>
    <div class="description">Click to view full specification</div>
    <a href="/agent/${agent.id}" style="color: var(--accent); text-decoration: none;">
      View Details →
    </a>
  `;
  
  card.style.cursor = 'pointer';
  card.onclick = () => {
    window.location.href = `/agent/${agent.id}`;
  };
  
  return card;
}

// Initialize app
async function init() {
  const content = document.getElementById('content');
  
  // Check if auth is required
  if (!isAuthenticated() && window.location.pathname !== '/') {
    showAuthPrompt();
    return;
  }
  
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