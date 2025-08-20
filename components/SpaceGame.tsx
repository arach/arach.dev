'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"

// Responsive game dimensions
const GAME_WIDTH = typeof window !== 'undefined' && window.innerWidth < 400 ? 280 : 300
const GAME_HEIGHT = typeof window !== 'undefined' && window.innerWidth < 400 ? 350 : 400
const SHIP_SIZE = 20
const ASTEROID_SIZE = 15
const ASTEROID_SPEED = 2
const SHIP_SPEED = 15

interface Asteroid {
    x: number
    y: number
}

export default function SpaceGame() {
    const [shipX, setShipX] = useState(GAME_WIDTH / 2)
    const [asteroids, setAsteroids] = useState<Asteroid[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [gamePaused, setGamePaused] = useState(false)
    const gameRef = useRef<HTMLDivElement>(null)

    const moveShip = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!gameOver && !gamePaused) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            setShipX(Math.max(0, Math.min(x, GAME_WIDTH - SHIP_SIZE)))
        }
    }, [gameOver, gamePaused])

    // Handle keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return

            switch(e.key.toLowerCase()) {
                case 'escape':
                    // Stop the game
                    setGameOver(true)
                    break
                case 'h':
                case 'arrowleft':
                    // Move left
                    setShipX(prev => Math.max(0, prev - SHIP_SPEED))
                    break
                case 'l':
                case 'arrowright':
                    // Move right
                    setShipX(prev => Math.min(GAME_WIDTH - SHIP_SIZE, prev + SHIP_SPEED))
                    break
                case 'j':
                case 'arrowdown':
                    // Slow down time (pause)
                    setGamePaused(true)
                    break
                case 'k':
                case 'arrowup':
                    // Resume
                    setGamePaused(false)
                    break
                case ' ':
                    // Toggle pause
                    setGamePaused(prev => !prev)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameOver])

    useEffect(() => {
        const gameLoop = setInterval(() => {
            if (gameOver || gamePaused) return

            setAsteroids(prev => prev.map(a => ({ ...a, y: a.y + ASTEROID_SPEED }))
                .filter(a => a.y < GAME_HEIGHT)
            )

            if (Math.random() < 0.1) {
                setAsteroids(prev => [...prev, { x: Math.random() * (GAME_WIDTH - ASTEROID_SIZE), y: -ASTEROID_SIZE }])
            }

            const collision = asteroids.some(a =>
                a.x < shipX + SHIP_SIZE &&
                a.x + ASTEROID_SIZE > shipX &&
                a.y < GAME_HEIGHT - SHIP_SIZE &&
                a.y + ASTEROID_SIZE > GAME_HEIGHT - SHIP_SIZE
            )

            if (collision) {
                setGameOver(true)
            } else {
                setScore(prev => prev + 1)
            }
        }, 50)

        return () => clearInterval(gameLoop)
    }, [asteroids, shipX, gameOver, gamePaused])

    return (
        <>
            <div className="mb-2 text-orange-400 text-[8px] sm:text-[10px] font-mono">
                <span className="hidden sm:inline">Controls: [h/←] Left | [l/→] Right | [j] Pause | [k] Resume | [Space] Toggle | [ESC] Stop</span>
                <span className="sm:hidden">Touch/Mouse to move | [ESC] Stop</span>
            </div>
            <div
                ref={gameRef}
                className="relative bg-black border-2 border-orange-400 mb-4 cursor-none"
                style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
                onMouseMove={moveShip}
            >
                {!gameOver && (
                    <div
                        className="absolute bg-orange-400"
                        style={{
                            width: SHIP_SIZE,
                            height: SHIP_SIZE,
                            bottom: 0,
                            left: shipX,
                            transition: 'left 0.1s ease-out'
                        }}
                    />
                )}
                {asteroids.map((a, i) => (
                    <div
                        key={i}
                        className="absolute bg-red-500 rounded-full"
                        style={{
                            width: ASTEROID_SIZE,
                            height: ASTEROID_SIZE,
                            top: a.y,
                            left: a.x
                        }}
                    />
                ))}
                {gamePaused && !gameOver && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-xl font-bold text-orange-400">PAUSED</p>
                    </div>
                )}
                {gameOver && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-2xl font-bold text-orange-400">Game Over!</p>
                    </div>
                )}
            </div>

            <p className="text-sm mb-4 text-orange-400">Score: {score} {gamePaused && !gameOver && '(PAUSED)'}</p>

            {gameOver && (
                <Button onClick={() => {
                    setAsteroids([])
                    setScore(0)
                    setGameOver(false)
                    setGamePaused(false)
                }} className="bg-orange-400 text-slate-800 text-xs">
                    Try Again
                </Button>
            )}
        </>
    )
}