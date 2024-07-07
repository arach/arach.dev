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

interface StickyNodes {
    source: Dot;
    target: Dot;
}

type State = {
    dots: Dot[];
    mousePosition: Dot;
    nodesToRender: (Dot[] | StickyNodes)[];
    isFollowing: boolean;
    isFixed: boolean;
};

const TargetCircle: React.FC<{ x: number; y: number }> = React.memo(({ x, y }) => (
    <g>
        <circle cx={x} cy={y} r="4" stroke="#999" strokeWidth="0.5" fill="none" opacity="0.3" />
        <circle cx={x} cy={y} r="2" stroke="#999" strokeWidth="0.5" fill="none" opacity="0.3" />
        <line x1={x - 5} y1={y} x2={x - 3} y2={y} stroke="#999" strokeWidth="0.5" opacity="0.3" />
        <line x1={x + 3} y1={y} x2={x + 5} y2={y} stroke="#999" strokeWidth="0.5" opacity="0.3" />
        <line x1={x} y1={y - 5} x2={x} y2={y - 3} stroke="#999" strokeWidth="0.5" opacity="0.3" />
        <line x1={x} y1={y + 3} x2={x} y2={y + 5} stroke="#999" strokeWidth="0.5" opacity="0.3" />
    </g>
));

const Dots: React.FC<{ dots: Dot[] }> = React.memo(({ dots }) => (
    <>
        {dots.map((dot, index) => (
            <circle
                key={index}
                cx={dot.x}
                cy={dot.y}
                r="1"
                fill="#555"
                opacity="0.35"
            />
        ))}
    </>
));

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ maxEdges }) => {
    const [dots, setDots] = useState<Dot[]>([]);
    const [nodesToRender, setNodesToRender] = useState<(Dot[] | StickyNodes)[]>([]);
    const [isFollowing, setIsFollowing] = useState(true);
    const isFollowingRef = useRef(true);

    const mousePositionRef = useRef<Dot>({ x: 0, y: 0 });

    const getDistance = useCallback((dot1: Dot, dot2: Dot) => {
        return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
    }, []);

    const getClosestDot = useCallback((position: Dot) => {
        return dots.reduce((closest, dot) =>
            getDistance(position, dot) < getDistance(position, closest) ? dot : closest
        );
    }, [dots, getDistance]);

    const findPath = useCallback((start: Dot, end: Dot): Dot[] => {
        const path: Dot[] = [];
        const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y));
        for (let i = 0; i <= steps; i++) {
            path.push({
                x: Math.round(start.x + (end.x - start.x) * (i / steps)),
                y: Math.round(start.y + (end.y - start.y) * (i / steps)),
            });
        }
        return path;
    }, []);

    const calculatePaths = useCallback(() => {
        if (!isFollowingRef.current) return;

        const maxDistance = 150;
        const newMousePosition = mousePositionRef.current;
        const closeDots = dots.filter(dot => getDistance(dot, newMousePosition) < maxDistance);

        if (closeDots.length === 0) {
            setNodesToRender([]);
            return;
        }

        const startDot = getClosestDot(newMousePosition);
        const targetDot = closeDots[Math.floor(Math.random() * closeDots.length)];
        const newEdges: Dot[][] = [];

        for (let i = 0; i < maxEdges; i++) {
            const randomStartDot = closeDots[Math.floor(Math.random() * closeDots.length)];
            const path = findPath(randomStartDot, targetDot);
            if (path.length > 1) {
                newEdges.push(path);
            }
        }

        setNodesToRender(newEdges);
    }, [dots, maxEdges, getDistance, getClosestDot, findPath]);

    const debouncedCalculatePaths = useMemo(
        () => debounce(calculatePaths, 10),
        [calculatePaths]
    );

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
        if (isFollowingRef.current) {
            debouncedCalculatePaths();
        }
    }, [debouncedCalculatePaths]);

    const handleClick = useCallback(() => {
        setIsFollowing(prev => {
            const newIsFollowing = !prev;
            isFollowingRef.current = newIsFollowing;
            return newIsFollowing;
        });
        if (isFollowingRef.current) {
            debouncedCalculatePaths();
        } else {
            // Optionally, you can clear the paths when stopping
            setNodesToRender([]);
        }
    }, [debouncedCalculatePaths]);

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => {
            handleMouseMove(e);
        };

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('click', handleClick);
            debouncedCalculatePaths.cancel();
        };
    }, [handleMouseMove, handleClick, debouncedCalculatePaths]);

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

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isStickyNodes = (nodes: Dot[] | StickyNodes): nodes is StickyNodes => 'source' in nodes;

    const getTarget = (nodes: Dot[] | StickyNodes): Dot =>
        Array.isArray(nodes) ? nodes[nodes.length - 1] : nodes.target;

    return (
        <div className="fixed inset-0" style={{ pointerEvents: 'none' }}>
            <svg width="100%" height="100%" style={{ pointerEvents: 'auto' }} onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)} onClick={handleClick} role="img" aria-label="Interactive background with dynamic nodes and edges">
                <Dots dots={dots} />
                <AnimatePresence>
                    {nodesToRender.map((nodes, index) => (
                        <motion.g
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            {/* Edge */}
                            <line
                                x1={(isStickyNodes(nodes) ? nodes.source : nodes[0]).x}
                                y1={(isStickyNodes(nodes) ? nodes.source : nodes[0]).y}
                                x2={getTarget(nodes).x}
                                y2={getTarget(nodes).y}
                                stroke="#999"
                                strokeWidth="1"
                                opacity="0.5"
                            />

                            {/* Target node */}
                            <TargetCircle x={getTarget(nodes).x} y={getTarget(nodes).y} />
                            <text
                                x={getTarget(nodes).x + 7}
                                y={getTarget(nodes).y - 7}
                                fill="#999"
                                fontSize="8"
                                opacity="0.5"
                            >
                                target
                            </text>

                            {/* Source node */}
                            {index === 0 && (
                                <>
                                    <TargetCircle x={(isStickyNodes(nodes) ? nodes.source : nodes[0]).x} y={(isStickyNodes(nodes) ? nodes.source : nodes[0]).y} />
                                    <text
                                        x={(isStickyNodes(nodes) ? nodes.source : nodes[0]).x - 25}
                                        y={(isStickyNodes(nodes) ? nodes.source : nodes[0]).y - 7}
                                        fill="#999"
                                        fontSize="8"
                                        opacity="0.5"
                                    >
                                        source
                                    </text>
                                </>
                            )}
                        </motion.g>
                    ))}
                </AnimatePresence>
            </svg>
        </div>
    );
};

export default InteractiveBackground;
