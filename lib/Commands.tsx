export function executeCommand(command: string, onGameStart: (game: string) => void): string[] {
    switch (command) {
        case 'help':
            return [
                'Available commands:',
                '  start space - Start the space game',
                '  start tetris - Start the Tetris game',
                '  exit - Return to homepage'
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