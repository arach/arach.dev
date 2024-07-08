"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';

interface Dot {
    x: number;
    y: number;
}

interface InteractiveBackgroundProps {
    maxEdges: number;
}

const TargetCircle: React.FC<{ x: number; y: number; label?: string; isSelected: boolean }> = React.memo(({ x, y, label, isSelected }) => {
    const opacity = isSelected ? "0.4" : "0.15";
    const textOpacity = isSelected ? "0.6" : "0.2";

    return (
        <g>
            <circle cx={x} cy={y} r="4" stroke="#999" strokeWidth="0.5" fill="none" opacity={opacity} />
            <circle cx={x} cy={y} r="2" stroke="#999" strokeWidth="0.5" fill="none" opacity={opacity} />
            <line x1={x - 5} y1={y} x2={x - 3} y2={y} stroke="#999" strokeWidth="0.5" opacity={opacity} />
            <line x1={x + 3} y1={y} x2={x + 5} y2={y} stroke="#999" strokeWidth="0.5" opacity={opacity} />
            <line x1={x} y1={y - 5} x2={x} y2={y - 3} stroke="#999" strokeWidth="0.5" opacity={opacity} />
            <line x1={x} y1={y + 3} x2={x} y2={y + 5} stroke="#999" strokeWidth="0.5" opacity={opacity} />
            {label && (
                <text
                    x={label === 'source' ? x - 25 : x + 7}
                    y={y - 7}
                    fill="#999"
                    fontSize="8"
                    opacity={textOpacity}
                >
                    {label}
                </text>
            )}
        </g>
    );
});
TargetCircle.displayName = 'TargetCircle';

const Dots: React.FC<{ dots: Dot[] }> = React.memo(({ dots }) => (
    <>
        {dots.map((dot, index) => (
            <circle
                key={index}
                cx={dot.x}
                cy={dot.y}
                r="1"
                fill="#555"
                opacity="0.1"
            />
        ))}
    </>
));
Dots.displayName = 'Dots';

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ maxEdges }) => {
    const [dots, setDots] = useState<Dot[]>([]);
    const [paths, setPaths] = useState<Dot[][]>([]);
    const [mousePosition, setMousePosition] = useState<Dot>({ x: 0, y: 0 });
    const [targetDot, setTargetDot] = useState<Dot | null>(null);
    const [isFollowing, setIsFollowing] = useState(true);

    const getDistance = useCallback((dot1: Dot, dot2: Dot) => {
        return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
    }, []);

    const findFarDots = useCallback((position: Dot, minDistance: number) => {
        return dots.filter(dot => getDistance(position, dot) > minDistance);
    }, [dots, getDistance]);

    const generatePath = useCallback((start: Dot, end: Dot) => {
        const path: Dot[] = [start];
        let current = start;
        while (getDistance(current, end) > 30) {
            const nearDots = dots.filter(dot =>
                getDistance(dot, current) < 60 &&
                getDistance(dot, end) < getDistance(current, end) &&
                !path.includes(dot)
            );
            if (nearDots.length === 0) break;
            const next = nearDots[Math.floor(Math.random() * nearDots.length)];
            path.push(next);
            current = next;
        }
        path.push(end);
        return path;
    }, [dots, getDistance]);

    const calculatePaths = useCallback(() => {
        const farDots = findFarDots(mousePosition, 200);
        if (farDots.length === 0) return;

        const newTarget = farDots[Math.floor(Math.random() * farDots.length)];
        setTargetDot(newTarget);

        const newPaths: Dot[][] = [];
        for (let i = 0; i < maxEdges; i++) {
            const path = generatePath(mousePosition, newTarget);
            if (path.length > 1) {
                newPaths.push(path);
            }
        }
        setPaths(newPaths);
    }, [mousePosition, maxEdges, findFarDots, generatePath]);

    const debouncedCalculatePaths = useMemo(
        () => debounce(calculatePaths, 50),
        [calculatePaths]
    );

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isFollowing) {
            setMousePosition({ x: e.clientX, y: e.clientY });
            debouncedCalculatePaths();
        }
    }, [debouncedCalculatePaths, isFollowing]);

    const handleClick = useCallback(() => {
        setIsFollowing(prev => !prev);
        if (isFollowing) {
            // If we're about to stop following, calculate paths one last time
            debouncedCalculatePaths();
        }
    }, [isFollowing, debouncedCalculatePaths]);

    useEffect(() => {
        const handleResize = () => {
            const newDots: Dot[] = [];
            for (let x = 0; x < window.innerWidth; x += 30) {
                for (let y = 0; y < window.innerHeight; y += 30) {
                    newDots.push({ x, y });
                }
            }
            setDots(newDots);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="fixed inset-0" style={{ pointerEvents: 'none' }}>
            <svg
                width="100%"
                height="100%"
                style={{ pointerEvents: 'auto' }}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                role="img"
                aria-label="Interactive background with dynamic nodes and edges"
            >
                <Dots dots={dots} />
                <AnimatePresence>
                    {paths.map((path, pathIndex) => (
                        <motion.g
                            key={pathIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {path.map((dot, dotIndex) => (
                                dotIndex < path.length - 1 && (
                                    <motion.line
                                        key={`${pathIndex}-${dotIndex}`}
                                        x1={dot.x}
                                        y1={dot.y}
                                        x2={path[dotIndex + 1].x}
                                        y2={path[dotIndex + 1].y}
                                        stroke="#999"
                                        strokeWidth="1"
                                        opacity={isFollowing ? "0.15" : "0.3"}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.5, delay: dotIndex * 0.1 }}
                                    />
                                )
                            ))}
                        </motion.g>
                    ))}
                    {targetDot && <TargetCircle x={targetDot.x} y={targetDot.y} label="target" isSelected={!isFollowing} />}
                    <TargetCircle x={mousePosition.x} y={mousePosition.y} label="source" isSelected={!isFollowing} />
                </AnimatePresence>
            </svg>
        </div>
    );
};
InteractiveBackground.displayName = 'InteractiveBackground';
export default InteractiveBackground;
