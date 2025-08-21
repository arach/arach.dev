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
    theme?: BackgroundTheme;
}

const TargetCircle: React.FC<{ x: number; y: number; label?: string; isSelected: boolean; color: string }> = React.memo(({ x, y, label, isSelected, color }) => {
    const opacity = isSelected ? "0.6" : "0.3";
    const textOpacity = isSelected ? "0.7" : "0.4";

    return (
        <g>
            <circle cx={x} cy={y} r="4" stroke={color} strokeWidth="0.5" fill="none" opacity={opacity} />
            <circle cx={x} cy={y} r="2" stroke={color} strokeWidth="0.5" fill="none" opacity={opacity} />
            <line x1={x - 5} y1={y} x2={x - 3} y2={y} stroke={color} strokeWidth="0.5" opacity={opacity} />
            <line x1={x + 3} y1={y} x2={x + 5} y2={y} stroke={color} strokeWidth="0.5" opacity={opacity} />
            <line x1={x} y1={y - 5} x2={x} y2={y - 3} stroke={color} strokeWidth="0.5" opacity={opacity} />
            <line x1={x} y1={y + 3} x2={x} y2={y + 5} stroke={color} strokeWidth="0.5" opacity={opacity} />
            {label && (
                <text
                    x={label === 'source' ? x - 25 : x + 7}
                    y={y - 7}
                    fill={color}
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

const Dots: React.FC<{ dots: Dot[]; color: string; opacity: number }> = React.memo(({ dots, color, opacity }) => (
    <>
        {dots.map((dot, index) => (
            <circle
                key={index}
                cx={dot.x}
                cy={dot.y}
                r="1"
                fill={color}
                opacity={opacity}
            />
        ))}
    </>
));
Dots.displayName = 'Dots';

export interface BackgroundTheme {
    name: string;
    dotColor: string;
    lineColor: string;
    targetColor: string;
    dotOpacity: number;
    lineOpacity: number;
    bgColor?: string; // Background color for the theme
}

export const backgroundThemes: BackgroundTheme[] = [
    { name: 'Blue Tech', dotColor: '#3b82f6', lineColor: '#3b82f6', targetColor: '#3b82f6', dotOpacity: 0.15, lineOpacity: 0.4, bgColor: '#ffffff' },
    { name: 'Purple Haze', dotColor: '#8b5cf6', lineColor: '#a855f7', targetColor: '#8b5cf6', dotOpacity: 0.12, lineOpacity: 0.35, bgColor: '#faf5ff' },
    { name: 'Green Matrix', dotColor: '#10b981', lineColor: '#34d399', targetColor: '#10b981', dotOpacity: 0.15, lineOpacity: 0.4, bgColor: '#022c22' },
    { name: 'Orange Glow', dotColor: '#f97316', lineColor: '#fb923c', targetColor: '#f97316', dotOpacity: 0.1, lineOpacity: 0.3, bgColor: '#fff7ed' },
    { name: 'Monochrome', dotColor: '#6b7280', lineColor: '#9ca3af', targetColor: '#6b7280', dotOpacity: 0.2, lineOpacity: 0.5, bgColor: '#f3f4f6' },
    { name: 'Cyberpunk', dotColor: '#ec4899', lineColor: '#f472b6', targetColor: '#ec4899', dotOpacity: 0.12, lineOpacity: 0.35, bgColor: '#0a0014' },
    { name: 'Ocean', dotColor: '#06b6d4', lineColor: '#22d3ee', targetColor: '#06b6d4', dotOpacity: 0.15, lineOpacity: 0.4, bgColor: '#0c1222' },
    { name: 'Sunset', dotColor: '#dc2626', lineColor: '#f87171', targetColor: '#dc2626', dotOpacity: 0.1, lineOpacity: 0.3, bgColor: '#1a0f0f' },
];

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ maxEdges, theme = backgroundThemes[0] }) => {
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
        if (dots.length === 0) return;
        
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
    }, [mousePosition, maxEdges, findFarDots, generatePath, dots.length, isFollowing]);

    // Create a stable debounced function using useRef to maintain the latest calculatePaths
    const calculatePathsRef = useRef(calculatePaths);
    useEffect(() => {
        calculatePathsRef.current = calculatePaths;
    }, [calculatePaths]);
    
    const debouncedCalculatePaths = useMemo(
        () => debounce(() => {
            calculatePathsRef.current();
        }, 1200, { leading: false, trailing: true }),
        [] // Empty deps to ensure this is created only once
    );

    // Removed unused handlers - we use document-level events instead

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

    // Add throttled mouse tracking
    useEffect(() => {
        let rafId: number | null = null;
        let lastX = 0;
        let lastY = 0;
        
        const handleDocumentMouseMove = (e: MouseEvent) => {
            if (!isFollowing) return;
            
            // Cancel any pending animation frame
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            // Use requestAnimationFrame to throttle updates to screen refresh rate
            rafId = requestAnimationFrame(() => {
                const snappedX = Math.round(e.clientX / 30) * 30;
                const snappedY = Math.round(e.clientY / 30) * 30;
                
                // Only update if position actually changed
                if (snappedX !== lastX || snappedY !== lastY) {
                    lastX = snappedX;
                    lastY = snappedY;
                    setMousePosition({ x: snappedX, y: snappedY });
                    debouncedCalculatePaths();
                }
            });
        };

        if (isFollowing) {
            document.addEventListener('mousemove', handleDocumentMouseMove, { passive: true });
        }
        
        return () => {
            document.removeEventListener('mousemove', handleDocumentMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
            debouncedCalculatePaths.cancel();
        };
    }, [isFollowing]);
    
    // Handle clicks on the background SVG only
    const handleBackgroundClick = useCallback(() => {
        setIsFollowing(prev => {
            const newValue = !prev;
            if (!newValue) {
                // When stopping following, cancel any pending calculations
                debouncedCalculatePaths.cancel();
                // Calculate paths immediately on click when pausing
                calculatePathsRef.current();
            } else {
                // Also calculate immediately when resuming
                calculatePathsRef.current();
            }
            return newValue;
        });
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <svg
                width="100%"
                height="100%"
                role="img"
                aria-label="Interactive background with dynamic nodes and edges"
                onClick={handleBackgroundClick}
                className="pointer-events-auto"
                style={{ cursor: isFollowing ? 'crosshair' : 'pointer' }}
            >
                <Dots dots={dots} color={theme.dotColor} opacity={theme.dotOpacity} />
                <AnimatePresence>
                    {paths.map((path, pathIndex) => (
                        <motion.g
                            key={`path-${pathIndex}-${path[0]?.x}-${path[0]?.y}-${path[path.length-1]?.x}-${path[path.length-1]?.y}`}
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
                                        stroke={theme.lineColor}
                                        strokeWidth="1"
                                        opacity={theme.lineOpacity}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.5, delay: dotIndex * 0.1 }}
                                    />
                                )
                            ))}
                        </motion.g>
                    ))}
                    {targetDot && (
                        <motion.g
                            key={`target-${targetDot.x}-${targetDot.y}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <TargetCircle x={targetDot.x} y={targetDot.y} label="target" isSelected={!isFollowing} color={theme.targetColor} />
                        </motion.g>
                    )}
                    <motion.g
                        key={`source-${mousePosition.x}-${mousePosition.y}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <TargetCircle x={mousePosition.x} y={mousePosition.y} label="source" isSelected={!isFollowing} color={theme.targetColor} />
                    </motion.g>
                </AnimatePresence>
            </svg>
        </div>
    );
};
InteractiveBackground.displayName = 'InteractiveBackground';
export default InteractiveBackground;
