'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Grid configuration matching the dot grid
const GRID_SIZE = 30; // pixels - same as dot grid

// Exact copy of TargetCircle from InteractiveBackground
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

interface Dot {
  x: number; // absolute pixel position
  y: number; // absolute pixel position
}

interface Hotspot {
  id: string;
  x: number; // grid position
  y: number; // grid position
}

interface Path {
  id: string;
  from: string;
  to: string;
  points: Dot[];
}

export interface BackgroundTheme {
  name: string;
  dotColor: string;
  lineColor: string;
  targetColor: string;
  dotOpacity: number;
  lineOpacity: number;
}

// Generate hotspots aligned to the dot grid
const generateHotspots = (width: number, height: number): Hotspot[] => {
  const hotspots: Hotspot[] = [];
  
  // Calculate grid dimensions
  const gridCols = Math.floor(width / GRID_SIZE);
  const gridRows = Math.floor(height / GRID_SIZE);
  
  // Create hotspots every 6 grid cells (180px apart)
  const stepX = 6;
  const stepY = 6;
  
  // Start from grid position, ensure we cover edges too
  // Include hotspots from edge to edge (including 0 and max positions)
  for (let row = 0; row <= gridRows; row += stepY) {
    for (let col = 0; col <= gridCols; col += stepX) {
      // Ensure we don't go beyond screen bounds
      const x = Math.min(col * GRID_SIZE, width - GRID_SIZE);
      const y = Math.min(row * GRID_SIZE, height - GRID_SIZE);
      
      hotspots.push({
        id: `h-${col}-${row}`,
        x: x,
        y: y,
      });
    }
  }
  
  // Add additional hotspots along the edges if they're not covered
  // Right edge
  const rightEdgeCol = gridCols;
  for (let row = stepY; row < gridRows; row += stepY) {
    const x = Math.min(rightEdgeCol * GRID_SIZE, width - GRID_SIZE);
    const y = row * GRID_SIZE;
    if (!hotspots.find(h => h.x === x && h.y === y)) {
      hotspots.push({
        id: `h-edge-right-${row}`,
        x: x,
        y: y,
      });
    }
  }
  
  // Bottom edge
  const bottomEdgeRow = gridRows;
  for (let col = stepX; col < gridCols; col += stepX) {
    const x = col * GRID_SIZE;
    const y = Math.min(bottomEdgeRow * GRID_SIZE, height - GRID_SIZE);
    if (!hotspots.find(h => h.x === x && h.y === y)) {
      hotspots.push({
        id: `h-edge-bottom-${col}`,
        x: x,
        y: y,
      });
    }
  }
  
  return hotspots;
};

// Pre-calculate paths using the same algorithm as InteractiveBackground
const generatePaths = (hotspots: Hotspot[], width: number, height: number): Path[] => {
  const paths: Path[] = [];
  let pathId = 0;

  // Generate all grid dots for pathfinding - ensure perfect alignment
  const dots: Dot[] = [];
  const gridCols = Math.floor(width / GRID_SIZE);
  const gridRows = Math.floor(height / GRID_SIZE);
  
  for (let col = 0; col <= gridCols; col++) {
    for (let row = 0; row <= gridRows; row++) {
      dots.push({ 
        x: col * GRID_SIZE, 
        y: row * GRID_SIZE 
      });
    }
  }

  // Helper functions from original
  const getDistance = (dot1: Dot, dot2: Dot) => {
    return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
  };

  const generatePath = (start: Dot, end: Dot): Dot[] => {
    const path: Dot[] = [start];
    let current = start;
    
    // Walk through dots to create path (same as original)
    while (getDistance(current, end) > GRID_SIZE) {
      const nearDots = dots.filter(dot =>
        getDistance(dot, current) < GRID_SIZE * 2 && // Adjacent dots (includes diagonals)
        getDistance(dot, end) < getDistance(current, end) && // Moving toward target
        !path.find(p => p.x === dot.x && p.y === dot.y) // Not already in path
      );
      
      if (nearDots.length === 0) break;
      
      // Pick a random near dot for organic variety
      const next = nearDots[Math.floor(Math.random() * nearDots.length)];
      path.push(next);
      current = next;
    }
    
    path.push(end);
    return path;
  };

  // Generate multiple path variations between each hotspot pair
  hotspots.forEach((from) => {
    hotspots.forEach((to) => {
      if (from.id === to.id) return;
      
      const distance = getDistance(from, to);
      
      // Only create paths for reasonable distances (200-600 pixels)
      if (distance < 200 || distance > 600) return;
      
      // Generate 3-5 variations of each path for nice visual variety
      const variations = 3 + Math.floor(Math.random() * 3);
      for (let variation = 0; variation < variations; variation++) {
        const path = generatePath(from, to);
        
        if (path.length > 1) {
          paths.push({
            id: `path-${pathId++}`,
            from: from.id,
            to: to.id,
            points: path,
          });
        }
      }
    });
  });

  return paths;
};

interface StaticPathBackgroundProps {
  theme?: BackgroundTheme;
  maxActivePaths?: number;
}

const StaticPathBackground: React.FC<StaticPathBackgroundProps> = ({ 
  theme = {
    name: 'Default',
    dotColor: '#3b82f6',
    lineColor: '#3b82f6',
    targetColor: '#3b82f6',
    dotOpacity: 0.15,
    lineOpacity: 0.4,
  },
  maxActivePaths = 2 
}) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentZone, setCurrentZone] = useState<string | null>(null);
  const [activePaths, setActivePaths] = useState<Path[]>([]);
  const [sourcePos, setSourcePos] = useState<Dot | null>(null);
  const [targetPos, setTargetPos] = useState<Dot | null>(null);
  const [allPaths, setAllPaths] = useState<Path[]>([]);
  const [isLoadingPaths, setIsLoadingPaths] = useState(false);
  
  const hotspots = useMemo(() => 
    windowSize.width > 0 ? generateHotspots(windowSize.width, windowSize.height) : [],
    [windowSize]
  );

  // Update window size
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Fetch or generate paths when window size or hotspots change
  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0 || hotspots.length === 0) {
      return;
    }

    const fetchOrGeneratePaths = async () => {
      setIsLoadingPaths(true);
      
      try {
        // First, try to fetch from database
        console.log(`[StaticPathBackground] Fetching paths for ${windowSize.width}x${windowSize.height}`);
        const response = await fetch(`/api/paths?width=${windowSize.width}&height=${windowSize.height}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.paths && data.paths.length > 0) {
            console.log(`[StaticPathBackground] Using ${data.paths.length} cached paths from database`);
            // Transform API response to Path format
            const paths: Path[] = data.paths.map((p: any) => ({
              id: p.id,
              from: p.from,
              to: p.to,
              points: p.points,
            }));
            setAllPaths(paths);
            setIsLoadingPaths(false);
            return;
          }
        }
        
        // If no cached paths, generate new ones
        console.log('[StaticPathBackground] No cached paths, generating new ones');
        const generatedPaths = generatePaths(hotspots, windowSize.width, windowSize.height);
        setAllPaths(generatedPaths);
        
        // Store generated paths in database for future use
        if (generatedPaths.length > 0) {
          console.log(`[StaticPathBackground] Storing ${generatedPaths.length} paths in database`);
          
          // Transform paths for API
          const pathsForApi = generatedPaths.map((path, index) => ({
            from: path.from,
            to: path.to,
            variation: index % 5, // Track which variation this is
            points: path.points,
            distance: Math.sqrt(
              Math.pow(path.points[0].x - path.points[path.points.length - 1].x, 2) +
              Math.pow(path.points[0].y - path.points[path.points.length - 1].y, 2)
            ),
          }));
          
          fetch('/api/paths', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paths: pathsForApi,
              viewport: { width: windowSize.width, height: windowSize.height },
            }),
          }).then(res => {
            if (res.ok) {
              console.log('[StaticPathBackground] Paths successfully stored in database');
            }
          }).catch(err => {
            console.error('[StaticPathBackground] Error storing paths:', err);
          });
        }
      } catch (error) {
        console.error('[StaticPathBackground] Error fetching/generating paths:', error);
        // Fallback to generating paths locally
        const generatedPaths = generatePaths(hotspots, windowSize.width, windowSize.height);
        setAllPaths(generatedPaths);
      } finally {
        setIsLoadingPaths(false);
      }
    };

    fetchOrGeneratePaths();
  }, [windowSize, hotspots]);

  // Find nearest hotspot to mouse position
  const findNearestHotspot = useCallback((mouseX: number, mouseY: number) => {
    if (hotspots.length === 0) return null;
    
    let nearest = hotspots[0];
    let minDistance = Infinity;
    
    hotspots.forEach(hotspot => {
      const distance = Math.sqrt(
        Math.pow(hotspot.x - mouseX, 2) + Math.pow(hotspot.y - mouseY, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = hotspot;
      }
    });
    
    return nearest;
  }, [hotspots]);

  // Handle mouse movement with throttling
  useEffect(() => {
    let rafId: number | null = null;
    let lastZone: string | null = null;
    let lastSourceGridX: number | null = null;
    let lastSourceGridY: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        // Calculate grid position for mouse
        const mouseGridX = Math.round(e.clientX / GRID_SIZE);
        const mouseGridY = Math.round(e.clientY / GRID_SIZE);
        
        // If we have a last source position, limit movement to avoid large jumps
        let newGridX = mouseGridX;
        let newGridY = mouseGridY;
        
        if (lastSourceGridX !== null && lastSourceGridY !== null) {
          // Maximum grid steps we can move at once (2-3 grid cells)
          const maxGridMove = 3;
          
          // Calculate distance in grid units
          const gridDistX = Math.abs(mouseGridX - lastSourceGridX);
          const gridDistY = Math.abs(mouseGridY - lastSourceGridY);
          
          // If mouse moved too far, limit the source movement
          if (gridDistX > maxGridMove || gridDistY > maxGridMove) {
            // Move source towards mouse but limit the distance
            const dirX = Math.sign(mouseGridX - lastSourceGridX);
            const dirY = Math.sign(mouseGridY - lastSourceGridY);
            
            newGridX = lastSourceGridX + (dirX * Math.min(gridDistX, maxGridMove));
            newGridY = lastSourceGridY + (dirY * Math.min(gridDistY, maxGridMove));
          }
        }
        
        // Update source position (snapped to grid)
        const snappedX = newGridX * GRID_SIZE;
        const snappedY = newGridY * GRID_SIZE;
        
        // Only update if position actually changed
        if (lastSourceGridX !== newGridX || lastSourceGridY !== newGridY) {
          setSourcePos({ x: snappedX, y: snappedY });
          lastSourceGridX = newGridX;
          lastSourceGridY = newGridY;
        }
        
        const nearest = findNearestHotspot(e.clientX, e.clientY);
        
        if (!nearest) return;
        
        // Only update paths if zone changed
        if (nearest.id !== lastZone) {
          lastZone = nearest.id;
          setCurrentZone(nearest.id);
          
          // Find paths from this hotspot
          const availablePaths = allPaths.filter(
            path => path.from === nearest.id
          );
          
          if (availablePaths.length > 0) {
            // Group paths by their target destination
            const pathsByTarget = new Map<string, typeof availablePaths>();
            availablePaths.forEach(path => {
              if (!pathsByTarget.has(path.to)) {
                pathsByTarget.set(path.to, []);
              }
              pathsByTarget.get(path.to)!.push(path);
            });
            
            // Find targets that have enough path variations
            const viableTargets = Array.from(pathsByTarget.entries())
              .filter(([_, paths]) => paths.length >= Math.min(maxActivePaths, 2))
              .sort((a, b) => b[1].length - a[1].length); // Sort by most paths
            
            if (viableTargets.length > 0) {
              // Pick the target with the most path variations (or random if multiple)
              const [targetId, targetPaths] = viableTargets[0];
              const targetHotspot = hotspots.find(h => h.id === targetId);
              
              if (targetHotspot) {
                setTargetPos({ x: targetHotspot.x, y: targetHotspot.y });
                
                // Select up to maxActivePaths, ALL going to the same target
                const selected = targetPaths.slice(0, maxActivePaths);
                setActivePaths(selected);
              }
            } else {
              // Fallback: just use what we have, even if only 1 path
              const targetPath = availablePaths[Math.floor(Math.random() * availablePaths.length)];
              const targetHotspot = hotspots.find(h => h.id === targetPath.to);
              
              if (targetHotspot) {
                setTargetPos({ x: targetHotspot.x, y: targetHotspot.y });
                const pathsToTarget = availablePaths.filter(p => p.to === targetPath.to);
                setActivePaths(pathsToTarget.slice(0, maxActivePaths));
              }
            }
          }
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [findNearestHotspot, allPaths, maxActivePaths, hotspots]);

  // Create SVG path string from points, optionally starting from source
  const createPathString = useCallback((points: Dot[], startFrom?: Dot) => {
    if (points.length < 2) return '';
    
    // If we have a custom start point (mouse position), use it
    const startPoint = startFrom || points[0];
    const firstPathPoint = points[0];
    
    // Calculate distance between source and path start
    const distance = Math.sqrt(
      Math.pow(startPoint.x - firstPathPoint.x, 2) + 
      Math.pow(startPoint.y - firstPathPoint.y, 2)
    );
    
    // If source is too far from path start (more than 4 grid cells), 
    // don't connect - just show the original path
    const maxConnectionDistance = GRID_SIZE * 4;
    
    if (startFrom && distance > maxConnectionDistance) {
      // Just draw the original path without connecting to source
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
      return path;
    }
    
    // Create path starting from source/mouse position
    let path = `M ${startPoint.x} ${startPoint.y}`;
    
    // If starting from custom point, connect to first point of pre-calculated path
    if (startFrom) {
      path += ` L ${points[0].x} ${points[0].y}`;
    }
    
    // Then follow the rest of the pre-calculated path
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  }, []);

  return (
    <>
      {/* CSS Dot Grid Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.dotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px',
          opacity: theme.dotOpacity,
        }}
      />
      
      {/* SVG for paths */}
      <svg
        className="fixed inset-0 z-0 pointer-events-none"
        width={windowSize.width}
        height={windowSize.height}
      >
        <AnimatePresence>
          {activePaths.map((path) => (
            <motion.path
              key={path.id}
              d={createPathString(path.points, sourcePos || undefined)}
              stroke={theme.lineColor}
              strokeWidth="2"
              fill="none"
              opacity={theme.lineOpacity}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: theme.lineOpacity }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          ))}
        </AnimatePresence>
        
        {/* Show source (mouse position) */}
        {sourcePos && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TargetCircle 
              x={sourcePos.x} 
              y={sourcePos.y} 
              label="source" 
              isSelected={true} 
              color={theme.targetColor} 
            />
          </motion.g>
        )}
        
        {/* Show target (destination) */}
        {targetPos && (
          <motion.g
            key={`target-${targetPos.x}-${targetPos.y}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TargetCircle 
              x={targetPos.x} 
              y={targetPos.y} 
              label="target" 
              isSelected={true} 
              color={theme.targetColor} 
            />
          </motion.g>
        )}
      </svg>
    </>
  );
};

export default StaticPathBackground;