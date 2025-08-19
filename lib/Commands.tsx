export function executeCommand(command: string, onGameStart: (game: string) => void): string[] {
    switch (command) {
        case 'help':
            return [
                'Available commands:',
                '  contact - Show contact information',
                '  start space - Start the space game',
                '  start tetris - Start the Tetris game',
                '  exit - Return to homepage'
            ]
        case 'contact':
            return [
                '════════════════════════════════════════',
                '           Contact Information          ',
                '════════════════════════════════════════',
                '',
                '  GitHub:   @arach',
                '  Email:    arach@arach.dev',
                '  Calendar: cal.com/arach/intro-chat',
                '  Location: San Francisco, CA',
                '',
                '  Feel free to reach out for:',
                '  • Collaborations',
                '  • Consulting opportunities',
                '  • Technical discussions',
                '  • Or just to chat about tech!',
                '',
                '════════════════════════════════════════'
            ]
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