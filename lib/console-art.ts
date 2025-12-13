// Console art and DevTools easter eggs

export function initConsoleArt() {
  // Only run in browser
  if (typeof window === 'undefined') return;

  // Get theme colors from CSS variables
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  // Get current theme
  const currentTheme = root.getAttribute('data-theme') || 'default';
  
  // Determine ASCII color based on theme (matching homepage logic)
  let asciiColor: string;
  if (['dark', 'terminal', 'ocean', 'cyberpunk'].includes(currentTheme)) {
    // Dark/vibrant themes use accent color
    asciiColor = computedStyle.getPropertyValue('--theme-accent-color').trim() || '#60a5fa';
  } else {
    // Light themes use heading color
    asciiColor = computedStyle.getPropertyValue('--theme-heading-color').trim() || 
                 computedStyle.getPropertyValue('--theme-text-color').trim() || '#000';
  }
  
  // Read theme colors - fallback to defaults if not set
  const accentColor = computedStyle.getPropertyValue('--theme-accent-color').trim() || '#60a5fa';
  const successColor = computedStyle.getPropertyValue('--theme-success-color').trim() || '#10b981';
  const warningColor = computedStyle.getPropertyValue('--theme-warning-color').trim() || '#fbbf24';
  const errorColor = computedStyle.getPropertyValue('--theme-error-color').trim() || '#ef4444';
  const mutedColor = computedStyle.getPropertyValue('--theme-muted-color').trim() || '#94a3b8';
  
  // Get fonts from CSS variables
  const fontFamily = computedStyle.getPropertyValue('--font-geist-mono').trim() || '"Geist Mono"';
  const monoFont = `${fontFamily}, ui-monospace, monospace`;
  const sansFont = computedStyle.getPropertyValue('--font-geist-sans').trim() || 
                   computedStyle.getPropertyValue('--font-sans').trim() || 
                   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  // ASCII art banner
  const asciiArt = `
%c
    ___    ____  ___   ________  __       ____  _______    __
   /   |  / __ \\/   | / ____/ / / /      / __ \\/ ____/ |  / /
  / /| | / /_/ / /| |/ /   / /_/ /      / / / / __/  | | / / 
 / ___ |/ _, _/ ___ / /___/ __  /   _  / /_/ / /___  | |/ /  
/_/  |_/_/ |_/_/  |_\\____/_/ /_/   (_)/_____/_____/  |___/   

%cAvailable commands:
%c  arach.help()     %c- Show available commands
%c  arach.about()    %c- Learn more about me
%c  arach.themes()   %c- List available themes
%c  arach.theme(id)  %c- Switch to a different theme
%c  arach.projects() %c- View project list
%c  arach.contact()  %c- Get in touch
%c  arach.matrix()   %c- Enter the matrix
%c  arach.glitch()   %c- Activate glitch mode
%c  arach.clear()    %c- Clear console

`;

  // Style definitions for the ASCII art - now theme-aware!
  const styles = [
    `color: ${asciiColor}; font-family: ${monoFont}; font-size: 12px; line-height: 1.2;`, // ASCII art
    `color: ${mutedColor}; font-family: ${sansFont}; font-size: 12px; font-weight: 400;`, // Available commands header
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
    `color: ${accentColor}; font-family: ${monoFont}; font-size: 12px;`, // Command
    `color: ${mutedColor}; font-size: 12px;`, // Description
  ];

  // Print the banner
  console.log(asciiArt, ...styles);

  // Create the arach global object with commands
  const arach = {
    help() {
      console.log(`
%c╔══════════════════════════════════════════════════════════════╗
║                     ARACH.DEV CONSOLE HELP                      ║
╚══════════════════════════════════════════════════════════════╝

%c📚 Available Commands:

%c• arach.help()%c      - Display this help message
%c• arach.about()%c     - Learn about me and my work
%c• arach.themes()%c    - List all available themes
%c• arach.theme(id)%c   - Switch to a specific theme
%c• arach.projects()%c  - Browse my projects
%c• arach.contact()%c   - Get my contact information
%c• arach.matrix()%c    - Enter the matrix (animation)
%c• arach.glitch()%c    - Toggle glitch effects
%c• arach.clear()%c     - Clear the console
%c• arach.stats()%c     - View site statistics
%c• arach.secret()%c    - Find the hidden easter egg

%c💻 Keyboard Shortcuts:
%c• Press '?' on the main page for keyboard navigation help
%c• Use Vim keys (h,j,k,l) to navigate projects
%c• Press 'n/p' to switch between project categories

%c🎨 Theme IDs: %cdefault, dark, terminal, ocean, sunset, cyberpunk, paper
`,
        `color: ${accentColor}; font-family: ${monoFont};`,
        `color: ${successColor}; font-weight: bold; font-size: 14px;`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${accentColor}; font-family: ${monoFont};`, `color: ${mutedColor};`,
        `color: ${warningColor}; font-weight: bold; font-size: 14px;`,
        `color: ${mutedColor};`,
        `color: ${mutedColor};`,
        `color: ${mutedColor};`,
        `color: ${successColor}; font-weight: bold;`, `color: ${mutedColor}; font-family: ${monoFont};`
      );
    },

    about() {
      console.log(`
%c╔══════════════════════════════════════════════════════════════╗
║                         ABOUT ARACH                             ║
╚══════════════════════════════════════════════════════════════╝

%c👋 Hi! I'm Arach, a full-stack developer passionate about creating
   innovative solutions and beautiful user experiences.

%c🔧 Tech Stack:
%c   • Frontend: React, Next.js, TypeScript, TailwindCSS
   • Backend: Node.js, Python, Go, Rust
   • Desktop: Tauri, Electron, Swift
   • Cloud: AWS, Vercel, Docker
   • AI/ML: OpenAI, Anthropic, LangChain

%c🎯 Current Focus:
%c   • Building developer tools and productivity apps
   • Exploring AI-powered development workflows
   • Creating beautiful, accessible user interfaces
   • Open source contributions

%c📍 Location: %cSan Francisco Bay Area
%c🎓 Education: %cComputer Science
%c💼 Experience: %c10+ years in software engineering

%c🌐 Find me online:
%c   • GitHub:   github.com/arach
   • Twitter:  @arach_dev
   • Email:    hello@arach.dev
`,
        'color: #60a5fa; font-family: monospace;',
        'color: #10b981; font-size: 14px;',
        'color: #fbbf24; font-weight: bold; font-size: 13px;',
        'color: #94a3b8;',
        'color: #fbbf24; font-weight: bold; font-size: 13px;',
        'color: #94a3b8;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8;',
        'color: #10b981; font-weight: bold; font-size: 13px;',
        'color: #94a3b8; font-family: monospace;'
      );
    },

    themes() {
      console.log(`
%c╔══════════════════════════════════════════════════════════════╗
║                      AVAILABLE THEMES                           ║
╚══════════════════════════════════════════════════════════════╝

%c🎨 Site Themes:

%c• default%c   - Clean and modern light theme
%c• dark%c      - Sleek dark mode experience  
%c• terminal%c  - Classic terminal green on black
%c• ocean%c     - Deep blue oceanic vibes
%c• sunset%c    - Warm orange and pink gradients
%c• cyberpunk%c - Neon purple and cyan aesthetics
%c• paper%c     - Minimalist paper-like theme

%c💡 Usage: %carach.theme('dark')%c to switch themes

%c🔗 Gallery: %cVisit /gallery/site for live preview
`,
        'color: #60a5fa; font-family: monospace;',
        'color: #10b981; font-weight: bold; font-size: 14px;',
        'color: #60a5fa; font-family: monospace; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-family: monospace; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-family: monospace; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-family: monospace; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-family: monospace; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-family: monospace; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-family: monospace; font-weight: bold;', 'color: #94a3b8;',
        'color: #fbbf24; font-weight: bold;', 'color: #10b981; font-family: monospace;', 'color: #fbbf24;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8;'
      );
    },

    theme(id: string) {
      const validThemes = ['default', 'dark', 'terminal', 'ocean', 'sunset', 'cyberpunk', 'paper'];
      if (!validThemes.includes(id)) {
        console.error(`%cInvalid theme: ${id}`, `color: ${errorColor};`);
        console.log(`%cValid themes: ${validThemes.join(', ')}`, `color: ${mutedColor};`);
        return;
      }
      
      // Dispatch custom event to change theme
      window.dispatchEvent(new CustomEvent('console-theme-change', { detail: { theme: id } }));
      console.log(`%c✅ Theme changed to ${id}`, `color: ${successColor};`);
    },

    projects() {
      console.log(`
%c╔══════════════════════════════════════════════════════════════╗
║                        MY PROJECTS                              ║
╚══════════════════════════════════════════════════════════════╝

%c🚀 Featured Projects:

%c📱 Desktop Apps:
%c• Scout       - AI-powered code search and navigation tool
• Grab        - macOS menu bar app for quick captures
• Notes       - Markdown editor with live preview
• Pomo        - Pomodoro timer with analytics

%c🌐 Web Apps:
%c• arach.dev   - This portfolio site (Next.js + TypeScript)
• Registry    - Theme registry and showcase platform
• Factory     - Rapid prototyping environment

%c🛠 CLI Tools:
%c• TTS Engine  - Text-to-speech command line tool
• MCP Servers - Model Context Protocol implementations

%c🎮 Games:
%c• Space Game  - Retro arcade shooter (try it on the homepage!)
• Tetris      - Classic tetris implementation

%c📊 View detailed stats: %carach.stats()
%c🔗 GitHub: %cgithub.com/arach
`,
        'color: #60a5fa; font-family: monospace;',
        'color: #10b981; font-weight: bold; font-size: 14px;',
        'color: #fbbf24; font-weight: bold;',
        'color: #94a3b8;',
        'color: #fbbf24; font-weight: bold;',
        'color: #94a3b8;',
        'color: #fbbf24; font-weight: bold;',
        'color: #94a3b8;',
        'color: #fbbf24; font-weight: bold;',
        'color: #94a3b8;',
        'color: #60a5fa; font-weight: bold;', 'color: #10b981; font-family: monospace;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8;'
      );
    },

    contact() {
      console.log(`
%c╔══════════════════════════════════════════════════════════════╗
║                      CONTACT INFORMATION                        ║
╚══════════════════════════════════════════════════════════════╝

%c📬 Get in Touch:

%c• Email:    %chello@arach.dev
%c• GitHub:   %cgithub.com/arach
%c• Twitter:  %c@arach_dev
%c• LinkedIn: %clinkedin.com/in/arach

%c💬 Response Times:
%c• Email:    24-48 hours
• GitHub:   Usually same day for issues/PRs
• Twitter:  Check occasionally

%c🤝 Open to:
%c• Collaboration on open source projects
• Consulting opportunities
• Speaking engagements
• Coffee chats about tech

%c📍 Location: %cSan Francisco Bay Area
%c🕐 Timezone: %cPST/PDT (UTC-8/UTC-7)
`,
        'color: #60a5fa; font-family: monospace;',
        'color: #10b981; font-weight: bold; font-size: 14px;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8; font-family: monospace;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8; font-family: monospace;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8; font-family: monospace;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8; font-family: monospace;',
        'color: #fbbf24; font-weight: bold;',
        'color: #94a3b8;',
        'color: #10b981; font-weight: bold;',
        'color: #94a3b8;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8;',
        'color: #60a5fa; font-weight: bold;', 'color: #94a3b8;'
      );
    },

    matrix() {
      console.log('%c🔴 Initiating Matrix sequence', `color: ${mutedColor};`);
      
      let matrixInterval: NodeJS.Timeout;
      let count = 0;
      const maxLines = 30;
      
      const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      
      const generateMatrixLine = () => {
        let line = '';
        for (let i = 0; i < 80; i++) {
          if (Math.random() > 0.95) {
            line += '%c' + matrixChars[Math.floor(Math.random() * matrixChars.length)];
          } else {
            line += ' ';
          }
        }
        return line;
      };
      
      matrixInterval = setInterval(() => {
        const line = generateMatrixLine();
        const styles: string[] = [];
        const matches = line.match(/%c./g) || [];
        matches.forEach(() => {
          const brightness = Math.random();
          styles.push(`color: rgba(0, 255, 0, ${brightness}); font-family: monospace;`);
        });
        
        console.log(line, ...styles);
        count++;
        
        if (count >= maxLines) {
          clearInterval(matrixInterval);
          console.log('%c🟢 Sequence complete', `color: ${successColor};`);
        }
      }, 100);
      
      return '';
    },

    glitch() {
      document.body.classList.toggle('glitch-effect');
      const isActive = document.body.classList.contains('glitch-effect');
      
      if (isActive) {
        // Add CSS for glitch effect
        const style = document.createElement('style');
        style.id = 'glitch-style';
        style.textContent = `
          @keyframes glitch {
            0%, 100% { text-shadow: 2px 0 red, -2px 0 cyan; }
            25% { text-shadow: -2px 0 red, 2px 0 cyan; }
            50% { text-shadow: 2px 2px red, -2px -2px cyan; }
            75% { text-shadow: -2px -2px red, 2px 2px cyan; }
          }
          .glitch-effect * {
            animation: glitch 0.3s infinite;
          }
        `;
        document.head.appendChild(style);
        console.log('%c⚡ Glitch mode activated', `color: ${accentColor};`);
      } else {
        const style = document.getElementById('glitch-style');
        style?.remove();
        console.log('%c✅ Glitch mode deactivated', `color: ${mutedColor};`);
      }
    },

    stats() {
      const stats = {
        projects: 15,
        githubStars: 234,
        commits: 1847,
        languages: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Swift'],
        frameworks: ['React', 'Next.js', 'Tauri', 'Node.js', 'FastAPI'],
        coffeeConsumed: '∞'
      };
      
      console.table(stats);
      console.log('%cPress "b" on the homepage for detailed statistics', `color: ${mutedColor};`);
    },

    secret() {
      const secrets = [
        'The ASCII art changes colors based on the theme!',
        'Try the Konami code on the homepage: ↑↑↓↓←→←→BA',
        'There\'s a hidden game if you click the logo 5 times',
        'The terminal theme has authentic CRT monitor effects',
        'Check out /gallery/application for the full UI showcase'
      ];
      
      const secret = secrets[Math.floor(Math.random() * secrets.length)];
      console.log(`%c🤫 ${secret}`, `color: ${mutedColor}; font-style: italic;`);
    },

    clear() {
      console.clear();
      console.log('%c✨ Console cleared', `color: ${mutedColor};`);
      console.log('%cType arach.help() for commands', `color: ${mutedColor};`);
    }
  };

  // Attach to window
  (window as any).arach = arach;

  // Listen for theme change events from console
  window.addEventListener('console-theme-change', (event: any) => {
    const themeButton = document.querySelector(`[data-theme-id="${event.detail.theme}"]`) as HTMLElement;
    if (themeButton) {
      themeButton.click();
    }
  });

  // Add a hidden Konami code easter egg
  let konamiSequence: string[] = [];
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.key);
    konamiSequence = konamiSequence.slice(-10);
    
    if (konamiSequence.join(',') === konamiCode.join(',')) {
      console.log('%cKonami code recognized', `color: ${accentColor};`);
      console.log('%cDebug toolbar unlocked', `color: ${mutedColor};`);
      // Could trigger something fun here
    }
  });
}