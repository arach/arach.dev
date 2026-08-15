export const COMMANDS = [
    'help',
    'whoami',
    'about',
    'contact',
    'start space',
    'start tetris',
    'clear',
    'exit',
] as const

export function executeCommand(command: string, onGameStart: (game: string) => void): string[] {
    switch (command) {
        case 'help':
            return [
                'Available commands:',
                '  whoami - Who is behind this shell',
                '  contact - Show contact information',
                '  about - Open the about page',
                '  start space - Start the space game',
                '  start tetris - Start the Tetris game',
                '  clear - Clear the screen',
                '  exit - Return to homepage'
            ]
        case 'whoami':
            return [
                'Arach Tchoupani',
                '',
                'Local-first tools for AI agents, including typography,',
                'keyboard shortcuts, and interaction design.',
                '',
                'Montreal / SF · github.com/arach · arach@arach.dev'
            ]
        case 'contact':
            return [
                'Contact',
                '',
                '  github    github.com/arach',
                '  email     arach@arach.dev',
                '  calendar  cal.com/arach/intro-chat',
                '  based     Montreal / SF',
                '',
                '  Open to collaborations, consulting, and technical discussions.'
            ]
        case 'about':
            window.location.href = '/about'
            return []
        case 'start space':
            onGameStart('space')
            return ['Starting space game...', 'Use your mouse to control the spaceship!']
        case 'start tetris':
            onGameStart('tetris')
            return ['Starting Tetris...', 'Use arrow keys to move and rotate pieces!']
        case 'exit':
            window.location.href = '/'
            return []
        default:
            return ['Unknown command. Type "help" for available commands.']
    }
}
