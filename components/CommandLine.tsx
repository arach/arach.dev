'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { executeCommand } from '@/lib/Commands'
import SpaceGame from './SpaceGame'
import TetrisGame from './TetrisGame'

export interface CommandLineHandle {
    run: (command: string) => void
    focus: () => void
}

interface CommandLineProps {
    onGameStart?: () => void
    className?: string
    initialOutput?: string[]
    docked?: boolean
    /** Text shown before the caret. Defaults to the classic shell prompt. */
    promptLabel?: string
    /** Prefix used when echoing a submitted command into the scrollback. */
    echoPrefix?: string
    /** Draw a monospace block caret instead of the native text caret. */
    blockCursor?: boolean
    /** Keep the prompt in view as the scrollback grows. */
    autoScroll?: boolean
    /** Words offered on Tab. */
    completions?: readonly string[]
    /** Imperative escape hatch so a page can run a command (e.g. a hint chip). */
    handleRef?: { current: CommandLineHandle | null }
}

export default function CommandLine({
    onGameStart,
    className,
    initialOutput,
    docked,
    promptLabel = 'arach@arach.dev:~$',
    echoPrefix = '>',
    blockCursor,
    autoScroll,
    completions,
    handleRef,
}: CommandLineProps) {
    const [command, setCommand] = useState('')
    const [caret, setCaret] = useState(0)
    const [output, setOutput] = useState<string[]>(
        initialOutput ?? [`Type 'help' for available commands.`, ``],
    )
    const inputRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLDivElement>(null)
    const history = useRef<string[]>([])
    const historyIndex = useRef<number>(-1)
    const [currentGame, setCurrentGame] = useState<string | null>(null)
    const [focused, setFocused] = useState(false)

    const syncCaret = useCallback(() => {
        setCaret(inputRef.current?.selectionStart ?? 0)
    }, [])

    const run = useCallback((raw: string) => {
        const entered = raw.trim()
        setOutput(prev => [...prev, `${echoPrefix} ${entered}`])

        if (!entered) return

        history.current = [...history.current, entered]
        historyIndex.current = -1

        if (entered.toLowerCase() === 'clear') {
            setOutput([])
            setCurrentGame(null)
            return
        }

        const result = executeCommand(entered.toLowerCase(), (game) => setCurrentGame(game))
        setOutput(prev => [...prev, ...result])
    }, [echoPrefix])

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        run(command)
        setCommand('')
        setCaret(0)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const entries = history.current
            if (!entries.length) return
            e.preventDefault()

            const cursor = historyIndex.current === -1 ? entries.length : historyIndex.current
            const next = e.key === 'ArrowUp'
                ? Math.max(0, cursor - 1)
                : Math.min(entries.length, cursor + 1)

            historyIndex.current = next === entries.length ? -1 : next
            const value = next === entries.length ? '' : entries[next]
            setCommand(value)
            setCaret(value.length)
            requestAnimationFrame(() => inputRef.current?.setSelectionRange(value.length, value.length))
            return
        }

        if (e.key === 'Tab' && completions?.length) {
            e.preventDefault()
            const prefix = command.toLowerCase()
            const matches = completions.filter(c => c.startsWith(prefix))
            if (!matches.length) return
            if (matches.length === 1) {
                setCommand(matches[0])
                setCaret(matches[0].length)
                return
            }

            // Several candidates: fill in the shared prefix, then list them.
            let shared = matches[0]
            for (const match of matches.slice(1)) {
                while (shared && !match.startsWith(shared)) shared = shared.slice(0, -1)
            }
            if (shared.length > command.length) {
                setCommand(shared)
                setCaret(shared.length)
            }
            setOutput(prev => [...prev, `${echoPrefix} ${command}`, matches.join('   ')])
        }
    }

    useEffect(() => {
        // Focus on load for keyboards; on touch, don't throw up the software
        // keyboard before the visitor has seen the session.
        if (!window.matchMedia('(pointer: coarse)').matches) {
            inputRef.current?.focus()
            setFocused(document.activeElement === inputRef.current)
        }
    }, [])

    const firstRender = useRef(true)
    useEffect(() => {
        if (!autoScroll) return
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }, [output, currentGame, autoScroll])

    useEffect(() => {
        if (!handleRef) return
        handleRef.current = {
            run: (cmd: string) => {
                run(cmd)
                inputRef.current?.focus()
            },
            focus: () => inputRef.current?.focus(),
        }
        return () => { handleRef.current = null }
    }, [handleRef, run])

    const prompt = (
        <form
            onSubmit={handleCommand}
            className={`flex items-baseline ${docked ? 'border-t pt-4' : ''}`}
            style={docked ? { borderColor: 'var(--ops-rule, var(--theme-border-color))' } : undefined}
        >
            <span
                className="mr-2 shrink-0 whitespace-nowrap"
                style={{ color: 'var(--ops-breath, var(--theme-muted-color, inherit))' }}
            >
                {promptLabel}
            </span>
            <span className={blockCursor ? 'tty-input-wrap' : 'min-w-0 flex-1'}>
                {blockCursor && (
                    <span
                        key={`${command}-${caret}`}
                        className={`tty-caret${focused ? '' : ' tty-caret--idle'}`}
                        style={{ left: `${caret}ch` }}
                        aria-hidden
                    />
                )}
                <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => { setCommand(e.target.value); syncCaret() }}
                    onKeyDown={handleKeyDown}
                    onKeyUp={syncCaret}
                    onClick={syncCaret}
                    onSelect={syncCaret}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="off"
                    className={blockCursor ? 'tty-input' : 'min-w-0 flex-1 bg-transparent outline-none'}
                    style={{
                        color: 'inherit',
                        caretColor: blockCursor ? 'transparent' : 'var(--ops-breath, var(--theme-accent-color))',
                    }}
                    aria-label="Terminal command"
                />
            </span>
        </form>
    )

    return (
        <div
            className={className ?? 'text-[8px] sm:text-[10px] font-mono'}
            onClick={() => inputRef.current?.focus()}
        >
            <div className={docked ? 'min-h-0 flex-1 overflow-auto' : undefined}>
                {output.map((line, i) => {
                    // Echoed commands keep their prompt colored, exactly as the live one is.
                    const echoed = echoPrefix !== '>' && line.startsWith(`${echoPrefix} `)
                    return (
                        <p key={i} className="mb-1 break-all whitespace-pre-wrap sm:break-words">
                            {echoed ? (
                                <>
                                    <span style={{ color: 'var(--ops-breath, inherit)' }}>{echoPrefix}</span>
                                    {line.slice(echoPrefix.length)}
                                </>
                            ) : (line || ' ')}
                        </p>
                    )
                })}
                {currentGame === 'space' && <SpaceGame />}
                {currentGame === 'tetris' && <TetrisGame />}
            </div>
            {prompt}
            <div ref={endRef} />
        </div>
    )
}
