'use client'

import { useState, useEffect, useRef } from 'react'
import { executeCommand } from '@/lib/Commands'
import SpaceGame from './SpaceGame'
import TetrisGame from './TetrisGame'

interface CommandLineProps {
    onGameStart: () => void
}

export default function CommandLine({ onGameStart }: CommandLineProps) {
    const [command, setCommand] = useState('')
    const [output, setOutput] = useState<string[]>([
        `Welcome to arach.dev terminal. Type 'help' for available commands.`,
        ``
    ])
    const inputRef = useRef<HTMLInputElement>(null)
    const [currentGame, setCurrentGame] = useState<string | null>(null)

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        setOutput(prev => [...prev, `> ${command}`])

        const result = executeCommand(command.toLowerCase(), (game) => setCurrentGame(game))
        setOutput(prev => [...prev, ...result])

        setCommand('')
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className="">
            <div className="font-mono text-[10px] font-thin">
                {output.map((line, i) => (
                    <p key={i} className="mb-1 text-[10px]">{line}</p>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex font-mono text-[10px] font-thin">
                <span className="mr-2 text-[10px]">{'arach@arach.dev:~$ '}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="flex-grow bg-transparent outline-none text-orange-400 text-[10px]"
                    autoFocus
                />
            </form>
            {currentGame === 'space' && <SpaceGame />}
            {currentGame === 'tetris' && <TetrisGame />}
        </div>
    )
}