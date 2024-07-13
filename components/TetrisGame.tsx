'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const BLOCK_SIZE = 30

type TetrominoShape = number[][]
type Board = number[][]

const TETROMINOES: TetrominoShape[] = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1, 1], [0, 1, 0]],
    [[1, 1, 1], [1, 0, 0]],
    [[1, 1, 1], [0, 0, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1, 0]]
]

const canMoveTo = (board: Board, piece: TetrominoShape, x: number, y: number): boolean => {
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col] && (
                x + col < 0 || x + col >= BOARD_WIDTH ||
                y + row >= BOARD_HEIGHT ||
                (board[y + row] && board[y + row][x + col])
            )) {
                return false;
            }
        }
    }
    return true;
};

export default function TetrisGame() {
    const [board, setBoard] = useState<Board>(() =>
        Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
    )
    const [currentPiece, setCurrentPiece] = useState<TetrominoShape>([])
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)

    const placePiece = useCallback(() => {
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]);
            currentPiece.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        newBoard[y + position.y][x + position.x] = value;
                    }
                });
            });

            // Check for completed lines
            let linesCleared = 0;
            const updatedBoard = newBoard.filter(row => {
                if (row.every(cell => cell !== 0)) {
                    linesCleared++;
                    return false;
                }
                return true;
            });

            while (updatedBoard.length < BOARD_HEIGHT) {
                updatedBoard.unshift(Array(BOARD_WIDTH).fill(0));
            }

            setScore(prevScore => prevScore + linesCleared * 100);
            return updatedBoard;
        });
    }, [currentPiece, position]);

    const generateNewPiece = useCallback(() => {
        const newPiece = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
        const newX = Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece[0].length / 2);
        const newY = 0;

        if (!canMoveTo(board, newPiece, newX, newY)) {
            setGameOver(true);
        } else {
            setCurrentPiece(newPiece);
            setPosition({ x: newX, y: newY });
        }
    }, [board]);

    const moveDown = useCallback(() => {
        if (canMoveTo(board, currentPiece, position.x, position.y + 1)) {
            setPosition(prev => ({ ...prev, y: prev.y + 1 }));
        } else {
            placePiece();
            generateNewPiece();
        }
    }, [board, currentPiece, position, canMoveTo, placePiece, generateNewPiece]);

    const resetGame = useCallback(() => {
        setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)))
        setScore(0)
        setGameOver(false)
        generateNewPiece()
    }, [generateNewPiece])

    const moveLeft = useCallback(() => {
        if (canMoveTo(board, currentPiece, position.x - 1, position.y)) {
            setPosition(prev => ({ ...prev, x: prev.x - 1 }));
        }
    }, [board, currentPiece, position]);

    const moveRight = useCallback(() => {
        if (canMoveTo(board, currentPiece, position.x + 1, position.y)) {
            setPosition(prev => ({ ...prev, x: prev.x + 1 }));
        }
    }, [board, currentPiece, position]);

    const rotate = useCallback(() => {
        const rotated = currentPiece[0].map((_, index) =>
            currentPiece.map(row => row[index]).reverse()
        );
        if (canMoveTo(board, rotated, position.x, position.y)) {
            setCurrentPiece(rotated);
        }
    }, [board, currentPiece, position]);


    useEffect(() => {
        if (gameOver) return;
        const intervalId = setInterval(moveDown, 1000);
        return () => clearInterval(intervalId);
    }, [gameOver, moveDown])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return
            switch (e.key) {
                case 'ArrowLeft': moveLeft(); break
                case 'ArrowRight': moveRight(); break
                case 'ArrowUp': rotate(); break
                case 'ArrowDown': moveDown(); break
            }
        }


        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [gameOver, moveLeft, moveRight, rotate, moveDown])


    return (
        <div className="flex flex-col items-center">
            <div className="relative border-2 border-gray-500 mb-4"
                style={{
                    width: BOARD_WIDTH * BLOCK_SIZE,
                    height: BOARD_HEIGHT * BLOCK_SIZE,
                }}
            >
                {board.map((row, y) =>
                    row.map((cell, x) => (
                        <div key={`${y}-${x}`}
                            className="absolute"
                            style={{
                                left: x * BLOCK_SIZE,
                                top: y * BLOCK_SIZE,
                                width: BLOCK_SIZE,
                                height: BLOCK_SIZE,
                                backgroundColor: cell ? 'blue' : 'transparent',
                                border: '1px solid rgba(0,0,0,0.1)'
                            }}
                        />
                    ))
                )}
                {currentPiece.map((row, y) =>
                    row.map((cell, x) =>
                        cell ? (
                            <div key={`piece-${y}-${x}`}
                                className="absolute"
                                style={{
                                    left: (position.x + x) * BLOCK_SIZE,
                                    top: (position.y + y) * BLOCK_SIZE,
                                    width: BLOCK_SIZE,
                                    height: BLOCK_SIZE,
                                    backgroundColor: 'red'
                                }}
                            />
                        ) : null
                    )
                )}
            </div>
            <p className="text-xl mb-4">Score: {score}</p>
            {gameOver ? (
                <div>
                    <h2>Game Over</h2>
                    <Button onClick={resetGame}>Start New Game</Button>
                </div>
            ) : null}
        </div>
    )
}
