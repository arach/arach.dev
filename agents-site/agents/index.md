# Agent Directory

A comprehensive collection of specialized AI agents for development automation.

## Quick Navigation

- [Engineering Agents](#engineering-agents)
- [Architecture & Review](#architecture--review)
- [Design & UX](#design--ux)
- [Infrastructure & DevOps](#infrastructure--devops)

---

## Engineering Agents

### [Frontend Engineer](./frontend-engineer.md)
**Model**: Default | **Projects**: Scout, Blink, Scout-Typography  
Expert frontend engineering analysis, refactoring, and optimization of React/TypeScript applications. Specializes in component architecture, performance optimization, and type safety enhancement.

### [Backend Engineer](./backend-engineer.md)
**Model**: Default | **Projects**: Scout, Blink, Scout-Typography  
Systems programming and desktop applications expert. Masters Rust, Tauri v2, audio processing, and AI/ML integration including whisper.cpp/whisper-rs.

---

## Architecture & Review

### [Codebase Architecture Reviewer](./codebase-architecture-reviewer.md)
**Model**: Opus | **Projects**: Scout, Blink, Scout-Typography  
Comprehensive architectural reviews focusing on code organization, naming conventions, patterns, and performance optimization.

### [Tauri Rust Architect](./tauri-rust-architect.md)
**Model**: Opus | **Projects**: Blink  
Senior architect for Tauri v2 applications, multi-window architecture, production lifecycle management, and native platform integrations.

---

## Design & UX

### [Product Designer](./product-designer.md)
**Model**: Default | **Projects**: Scout, Blink, Scout-Typography  
Full-stack design partner who breaks down requirements, generates solutions, and critiques for polish and accessibility.

### [Developer UX Reviewer](./developer-ux-reviewer.md)
**Model**: Opus | **Projects**: Speakeasy  
Fresh-eyes evaluation of developer tools, libraries, and technical documentation from a senior developer's perspective.

---

## Infrastructure & DevOps

### [Dev Server Manager](./dev-server-manager.md)
**Model**: Default | **Projects**: 2048ish  
Development infrastructure expert for starting, monitoring, and troubleshooting development servers with automatic error resolution.

---

## Usage Guide

### Invoking Agents

Agents are invoked using the Task tool with three key parameters:
1. **subagent_type**: The agent identifier (e.g., 'frontend-engineer-arnold')
2. **description**: A brief task description (3-5 words)
3. **prompt**: Detailed instructions for the agent

### Example

```javascript
Task({
  subagent_type: 'frontend-engineer',
  description: 'Review component architecture',
  prompt: 'Analyze the Dashboard component for performance bottlenecks and prop drilling issues'
})
```

### Best Practices

1. **Choose the Right Agent**: Match the agent's specialization to your task
2. **Provide Clear Context**: Include relevant file paths, error messages, and requirements
3. **Batch Operations**: Launch multiple agents concurrently when tasks are independent
4. **Trust Agent Output**: Agents are optimized for their domains and provide reliable results

### Model Types

- **Opus**: Complex architectural reviews, UX evaluations, and strategic planning
- **Sonnet**: Balanced performance for implementation tasks
- **Default**: Standard model for routine development tasks

### Tool Restrictions

Some agents have limited tool access for safety:
- Design agents: Read, Edit, Grep only
- Review agents: May have read-only access
- Infrastructure agents: Full tool access for system operations

---

## Contributing

To add a new agent:
1. Create a markdown file in the `agents/` directory
2. Follow the existing format with metadata header
3. Include description, capabilities, and example use cases
4. Update this index page with the new agent

---

## Resources

- [Agent Development Guide](../docs/agent-development.md)
- [Best Practices](../docs/best-practices.md)
- [API Documentation](../api/README.md)