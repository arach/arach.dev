# Agent Registry

A comprehensive collection of specialized AI agents for various development tasks.

## Engineering Agents

### frontend-engineer
**Type**: Frontend Engineering Expert  
**Model**: Default  
**Projects**: Scout, Blink, Scout-Typography  
**Description**: Expert frontend engineering analysis, refactoring, or optimization of React/TypeScript applications  
**Capabilities**:
- Component architecture review
- Performance optimization
- Type safety enhancement
- Technical debt analysis
- Modern React patterns implementation

### backend-engineer
**Type**: Systems Programming & Desktop Applications Expert  
**Model**: Default  
**Projects**: Scout, Blink, Scout-Typography  
**Description**: Expert in Rust systems programming, Tauri v2 desktop applications, audio processing, AI/ML integration  
**Capabilities**:
- Rust code optimization
- Tauri IPC architecture design
- Audio processing with whisper.cpp
- SQLite/PostgreSQL database optimization
- Swift-Rust bridging for macOS

### frontend-engineer
**Type**: Frontend Development Expert  
**Model**: Sonnet  
**Projects**: AgentList.io  
**Description**: Implement, review, or optimize frontend code including HTML, CSS, JavaScript/TypeScript, React components  
**Capabilities**:
- Modern web development
- React ecosystem expertise
- Performance optimization
- Accessibility standards implementation

## Architecture & Review Agents

### codebase-architecture-reviewer
**Type**: Architecture Analysis Expert  
**Model**: Opus  
**Projects**: Scout, Blink, Scout-Typography  
**Description**: Comprehensive architectural review of codebases, particularly React/TypeScript frontends with Rust/Tauri backends  
**Capabilities**:
- Structural organization analysis
- Naming conventions review
- Architectural patterns assessment
- Performance bottleneck identification
- Best practices validation

### tauri-rust-architect
**Type**: Senior Software Architect  
**Model**: Opus  
**Projects**: Blink  
**Description**: Expert guidance on Tauri v2 applications, Rust development, macOS-specific implementations, or Swift integrations  
**Capabilities**:
- Multi-window architecture design
- Production app lifecycle management
- Cross-platform development strategies
- Native integration patterns

### code-reviewer
**Type**: Code Quality Specialist  
**Projects**: DevBar (Example)  
**Description**: Review code for quality and best practices  
**Focus Areas**:
- TypeScript best practices
- Performance issue identification
- Maintainability improvements
- React pattern verification

## Design & UX Agents

### product-designer
**Type**: Full-stack Design Partner  
**Model**: Default  
**Projects**: Scout, Blink, Scout-Typography  
**Tools**: Read, Edit, Grep (limited toolset)  
**Description**: Breaks down product requirements, generates design solutions, and critiques screenshots or front-end code for polish and accessibility  
**Capabilities**:
- UI/UX design consultation
- Accessibility audits
- Design system creation
- User flow optimization
- Visual polish recommendations

### developer-ux-reviewer
**Type**: Senior Developer UX Evaluator  
**Model**: Opus  
**Projects**: Speakeasy  
**Description**: Fresh-eyes UX evaluation of developer tools, libraries, or technical websites from a senior developer's perspective  
**Capabilities**:
- First impressions analysis
- Documentation quality assessment
- Developer journey mapping
- API usability evaluation
- Getting started experience review

## Infrastructure & DevOps Agents

### dev-server-manager
**Type**: Development Infrastructure Expert  
**Model**: Default  
**Projects**: 2048ish  
**Description**: Start and monitor development servers, automatically detect errors in server logs, and resolve issues  
**Capabilities**:
- Server detection & startup
- Intelligent command selection
- Real-time log monitoring
- Error classification & diagnosis
- Automated issue resolution

## Documentation & Testing Agents

### doc-generator
**Type**: Documentation Specialist  
**Projects**: DevBar (Example)  
**Description**: Generate comprehensive documentation  
**Focus Areas**:
- API reference generation
- Usage examples creation
- Props documentation with types
- Best practices guides
- Integration tutorials

### test-generator
**Type**: Test Automation Specialist  
**Projects**: DevBar (Example)  
**Description**: Generate unit tests for components  
**Focus Areas**:
- Component test generation
- User interaction testing
- Theme switching tests
- Responsive behavior validation
- React Testing Library patterns

## Repository Management

### repository-contribution-agent
**Type**: Automated Contribution Manager  
**Projects**: Factory/Onlook  
**Description**: Guidelines and automation for repository interactions  
**Capabilities**:
- Code formatting enforcement
- Automated linting
- Test execution
- Pull request creation
- Commit message standardization

---

## Usage Guidelines

### Invoking Agents

Agents are invoked using the Task tool with three key parameters:
1. **subagent_type**: The agent identifier (e.g., 'frontend-engineer-arnold')
2. **description**: A brief task description (3-5 words)
3. **prompt**: Detailed instructions for the agent

### Best Practices

1. **Choose the Right Agent**: Match the agent's specialization to your task
2. **Provide Clear Context**: Include relevant file paths, error messages, and requirements
3. **Batch Operations**: Launch multiple agents concurrently when tasks are independent
4. **Trust Agent Output**: Agents are optimized for their domains and provide reliable results

### Model Selection

- **Opus**: Used for complex architectural reviews and UX evaluations
- **Sonnet**: Balanced performance for implementation tasks
- **Default**: Standard model for routine development tasks

### Tool Restrictions

Some agents have limited tool access for safety:
- Design agents: Read, Edit, Grep only
- Review agents: May have read-only access
- Infrastructure agents: Full tool access for system operations