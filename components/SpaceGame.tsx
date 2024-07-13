'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"

const GAME_WIDTH = 300
const GAME_HEIGHT = 400
const SHIP_SIZE = 20
const ASTEROID_SIZE = 15
const ASTEROID_SPEED = 2

interface Asteroid {
    x: number
    y: number
}

export default function SpaceGame() {
    const [shipX, setShipX] = useState(GAME_WIDTH / 2)
    const [asteroids, setAsteroids] = useState<Asteroid[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    const moveShip = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!gameOver) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            setShipX(Math.max(0, Math.min(x, GAME_WIDTH - SHIP_SIZE)))
        }
    }, [gameOver])

    useEffect(() => {
        const gameLoop = setInterval(() => {
            if (gameOver) return

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
    }, [asteroids, shipX, gameOver])

    return (
        <>
            <div
                className="relative bg-black border-2 border-green-500 mb-4 cursor-none"
                style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
                onMouseMove={moveShip}
            >
                {!gameOver && (
                    <div
                        className="absolute bg-green-500"
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
                {gameOver && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-2xl font-bold text-green-500">Game Over!</p>
                    </div>
                )}
            </div>

            <p className="text-xl mb-4">Score: {score}</p>

            {gameOver && (
                <Button onClick={() => {
                    setAsteroids([])
                    setScore(0)
                    setGameOver(false)
                }} className="bg-green-500 text-black">
                    Try Again
                </Button>
            )}
        </>
    )
}