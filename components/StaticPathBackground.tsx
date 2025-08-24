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
  const gridCols = Math.ceil(width / GRID_SIZE);
  const gridRows = Math.ceil(height / GRID_SIZE);
  
  // Create hotspots every 6 grid cells (180px apart)
  const stepX = 6;
  const stepY = 6;
  
  // Align hotspots with dot centers (15px offset)
  for (let row = 0; row < gridRows; row += stepY) {
    for (let col = 0; col < gridCols; col += stepX) {
      // Position at center of grid cell to align with dots
      const x = Math.min(col * GRID_SIZE + 15, width - 15);
      const y = Math.min(row * GRID_SIZE + 15, height - 15);
      
      hotspots.push({
        id: `h-${col}-${row}`,
        x: x,
        y: y,
      });
    }
  }
  
  // Add additional hotspots along the edges if they're not covered
  // Right edge
  const rightEdgeCol = gridCols - 1;
  for (let row = stepY; row < gridRows; row += stepY) {
    const x = Math.min(rightEdgeCol * GRID_SIZE + 15, width - 15);
    const y = row * GRID_SIZE + 15;
    if (!hotspots.find(h => Math.abs(h.x - x) < 5 && Math.abs(h.y - y) < 5)) {
      hotspots.push({
        id: `h-edge-right-${row}`,
        x: x,
        y: y,
      });
    }
  }
  
  // Bottom edge  
  const bottomEdgeRow = gridRows - 1;
  for (let col = stepX; col < gridCols; col += stepX) {
    const x = col * GRID_SIZE + 15;
    const y = Math.min(bottomEdgeRow * GRID_SIZE + 15, height - 15);
    if (!hotspots.find(h => Math.abs(h.x - x) < 5 && Math.abs(h.y - y) < 5)) {
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

  // Generate all grid dots for pathfinding - align with CSS background dots
  // CSS dots are at center of each 30px cell (15px offset)
  const dots: Dot[] = [];
  const gridCols = Math.ceil(width / GRID_SIZE);
  const gridRows = Math.ceil(height / GRID_SIZE);
  
  for (let col = 0; col < gridCols; col++) {
    for (let row = 0; row < gridRows; row++) {
      dots.push({ 
        x: col * GRID_SIZE + 15, // Center of grid cell
        y: row * GRID_SIZE + 15  // Center of grid cell
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

  // Track paths per hotspot to ensure distribution
  const pathsPerHotspot = new Map<string, number>();
  hotspots.forEach(h => pathsPerHotspot.set(h.id, 0));
  
  // First pass: ensure every hotspot has at least some paths
  // Generate paths from each hotspot, preferring opposite-side targets
  const centerX = width / 2;
  const centerY = height / 2;
  
  hotspots.forEach((from) => {
    const fromIsLeft = from.x < centerX;
    const fromIsTop = from.y < centerY;
    
    // Score all potential targets based on position
    const potentialTargets = hotspots
      .filter(h => h.id !== from.id)
      .map(h => {
        const distance = getDistance(from, h);
        const targetIsLeft = h.x < centerX;
        const targetIsTop = h.y < centerY;
        
        let score = 0;
        // Strongly prefer opposite sides
        if (fromIsLeft !== targetIsLeft) score += 5;
        if (fromIsTop !== targetIsTop) score += 5;
        
        // Prefer medium to long distances
        if (distance >= 300 && distance <= 600) score += 3;
        else if (distance >= 180 && distance <= 800) score += 1;
        
        return { hotspot: h, distance, score };
      })
      .filter(({ distance }) => distance >= 180 && distance <= 800)
      .sort((a, b) => b.score - a.score || a.distance - b.distance);
    
    // Take top 4 targets (best scoring)
    const neighbors = potentialTargets.slice(0, 4);
    
    // Generate paths to each neighbor
    neighbors.forEach(({ hotspot: to }) => {
      // Generate 2-3 variations per neighbor for better visual effect
      const variations = 3; // Always generate 3 variations
      for (let variation = 0; variation < variations; variation++) {
        const path = generatePath(from, to);
        
        if (path.length > 1) {
          paths.push({
            id: `path-${pathId++}`,
            from: from.id,
            to: to.id,
            points: path,
          });
          
          // Track paths per hotspot
          pathsPerHotspot.set(from.id, (pathsPerHotspot.get(from.id) || 0) + 1);
          pathsPerHotspot.set(to.id, (pathsPerHotspot.get(to.id) || 0) + 1);
        }
      }
    });
  });
  
  // Second pass: add longer-distance paths for visual variety
  // But limit total to prevent overwhelming the system
  const maxTotalPaths = 1500; // Increased to accommodate more variations
  
  if (paths.length < maxTotalPaths) {
    hotspots.forEach((from) => {
      hotspots.forEach((to) => {
        if (from.id === to.id) return;
        if (paths.length >= maxTotalPaths) return;
        
        const distance = getDistance(from, to);
        
        // Add some longer-distance paths for variety
        if (distance >= 400 && distance <= 800) {
          // Only add if this hotspot doesn't have too many paths already
          const fromCount = pathsPerHotspot.get(from.id) || 0;
          const toCount = pathsPerHotspot.get(to.id) || 0;
          
          if (fromCount < 15 && toCount < 15 && Math.random() > 0.7) {
            // Generate 2-3 variations for longer paths too
            const variations = 2 + Math.floor(Math.random() * 2); // 2 or 3 variations
            for (let v = 0; v < variations; v++) {
              if (paths.length >= maxTotalPaths) break;
              
              const path = generatePath(from, to);
              
              if (path.length > 1) {
                paths.push({
                  id: `path-${pathId++}`,
                  from: from.id,
                  to: to.id,
                  points: path,
                });
                
                pathsPerHotspot.set(from.id, fromCount + 1);
                pathsPerHotspot.set(to.id, toCount + 1);
              }
            }
          }
        }
      });
    });
  }
  
  console.log(`[generatePaths] Generated ${paths.length} paths with distribution:`, 
    Array.from(pathsPerHotspot.entries())
      .filter(([_, count]) => count === 0)
      .map(([id]) => id)
  );

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
  maxActivePaths = 3 
}) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentZone, setCurrentZone] = useState<string | null>(null);
  const [activePaths, setActivePaths] = useState<Path[]>([]);
  const [sourcePos, setSourcePos] = useState<Dot | null>(null);
  const [targetPos, setTargetPos] = useState<Dot | null>(null);
  const [allPaths, setAllPaths] = useState<Path[]>([]);
  const [isLoadingPaths, setIsLoadingPaths] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  
  const hotspots = useMemo(() => 
    windowSize.width > 0 ? generateHotspots(windowSize.width, windowSize.height) : [],
    [windowSize]
  );

  // Update window size and setup debug toggle
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Debug toggle with keyboard shortcut (Ctrl/Cmd + Shift + D)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        setShowDebug(prev => !prev);
        console.log('[Debug] Grid visualization toggled');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    
    // Expose debug toggle to window for console access
    if (typeof window !== 'undefined') {
      (window as any).__toggleDebug = () => setShowDebug(prev => !prev);
    }
    
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Fetch or generate paths when window size or hotspots change
  // Use setTimeout to ensure this doesn't block initial render
  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0 || hotspots.length === 0) {
      return;
    }

    // Defer path loading to not block initial paint
    const timer = setTimeout(() => {
      const fetchOrGeneratePaths = async () => {
        setIsLoadingPaths(true);
      
      try {
        // First, try to fetch from database - but with a timeout
        console.log(`[StaticPathBackground] Fetching paths for ${windowSize.width}x${windowSize.height}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 second timeout
        
        const response = await fetch(`/api/paths?width=${windowSize.width}&height=${windowSize.height}`, {
          signal: controller.signal
        }).catch(() => null);
        
        clearTimeout(timeoutId);
        
        if (response && response.ok) {
          const data = await response.json();
          
          // Check if we got paths AND they're for the correct viewport
          // (API might return old cached paths from a different viewport)
          if (data.paths && data.paths.length > 0) {
            // Check if any path point exceeds our current viewport
            const pathsAreValid = data.paths.every((p: any) => {
              if (!p.points || !Array.isArray(p.points)) return false;
              return p.points.every((point: any) => 
                point.x <= windowSize.width && point.y <= windowSize.height
              );
            });
            
            if (pathsAreValid) {
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
            } else {
              console.log(`[StaticPathBackground] Cached paths don't fit viewport, generating new ones`);
            }
          }
        }
        
        // If no cached paths, generate new ones
        console.log('[StaticPathBackground] No cached paths, generating new ones');
        const generatedPaths = generatePaths(hotspots, windowSize.width, windowSize.height);
        setAllPaths(generatedPaths);
        
        // Don't auto-store paths - we'll manually populate the database when needed
        console.log(`[StaticPathBackground] Generated ${generatedPaths.length} paths locally`);
        
        // Expose a way to manually store paths if needed (e.g., from debug toolbar)
        if (typeof window !== 'undefined') {
          (window as any).__storePaths = () => {
            console.log('[StaticPathBackground] Manually storing paths to database...');
            
            // Group paths by starting hotspot to ensure distribution
            const pathsByHotspot = new Map<string, typeof generatedPaths>();
            generatedPaths.forEach(path => {
              if (!pathsByHotspot.has(path.from)) {
                pathsByHotspot.set(path.from, []);
              }
              pathsByHotspot.get(path.from)!.push(path);
            });
            
            // Select a balanced set of paths - take a few from each hotspot
            const selectedPaths: typeof generatedPaths = [];
            const maxPathsPerHotspot = 10;
            
            pathsByHotspot.forEach((paths, hotspotId) => {
              // Take up to maxPathsPerHotspot from each hotspot
              const pathsToTake = Math.min(paths.length, maxPathsPerHotspot);
              selectedPaths.push(...paths.slice(0, pathsToTake));
            });
            
            // Limit to 500 total
            const pathsForApi = selectedPaths.slice(0, 500).map((path, index) => ({
              from: path.from,
              to: path.to,
              variation: index % 5,
              points: path.points,
              distance: Math.sqrt(
                Math.pow(path.points[0].x - path.points[path.points.length - 1].x, 2) +
                Math.pow(path.points[0].y - path.points[path.points.length - 1].y, 2)
              ),
            }));
            
            console.log(`[StaticPathBackground] Storing ${pathsForApi.length} paths from ${pathsByHotspot.size} hotspots`);
            
            fetch('/api/paths', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paths: pathsForApi,
                viewport: { width: windowSize.width, height: windowSize.height },
              }),
            }).then(res => {
              if (res.ok) {
                console.log('[StaticPathBackground] Paths manually stored successfully');
              }
            }).catch(err => {
              console.error('[StaticPathBackground] Manual storage failed:', err);
            });
          };
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
    }, 100); // Small delay to ensure initial paint happens first
    
    return () => clearTimeout(timer);
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

  // Generate a path between two points using grid-based pathfinding
  const generateDynamicPath = useCallback((start: Hotspot, end: Hotspot): Dot[] => {
    const path: Dot[] = [{ x: start.x, y: start.y }];
    
    // Generate all grid dots for pathfinding - align with dot centers
    const gridCols = Math.ceil(windowSize.width / GRID_SIZE);
    const gridRows = Math.ceil(windowSize.height / GRID_SIZE);
    const dots: Dot[] = [];
    
    for (let col = 0; col < gridCols; col++) {
      for (let row = 0; row < gridRows; row++) {
        dots.push({ 
          x: col * GRID_SIZE + 15, // Center of grid cell
          y: row * GRID_SIZE + 15  // Center of grid cell
        });
      }
    }
    
    const getDistance = (dot1: Dot, dot2: Dot) => {
      return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
    };
    
    let current = { x: start.x, y: start.y };
    const endDot = { x: end.x, y: end.y };
    
    // Walk through dots to create path with variation
    while (getDistance(current, endDot) > GRID_SIZE) {
      const nearDots = dots.filter(dot =>
        getDistance(dot, current) < GRID_SIZE * 2 && // Adjacent dots (includes diagonals)
        getDistance(dot, endDot) < getDistance(current, endDot) && // Moving toward target
        !path.find(p => p.x === dot.x && p.y === dot.y) // Not already in path
      );
      
      if (nearDots.length === 0) break;
      
      // Pick a random near dot for organic variety
      const next = nearDots[Math.floor(Math.random() * nearDots.length)];
      path.push(next);
      current = next;
    }
    
    path.push(endDot);
    return path;
  }, [windowSize]);
  
  // Handle mouse movement with throttling
  useEffect(() => {
    /**
     * PATH FINDING LOGIC:
     * 1. Mouse position is snapped to grid (30px cells) for smooth source indicator movement
     * 2. Find nearest hotspot (hotspots are placed every 180px across the screen)
     * 3. Look for pre-calculated paths FROM that hotspot in our cache
     * 4. If no outgoing paths, look for incoming paths and reverse them
     * 5. Group paths by target and select the best target with multiple path variations
     * 6. The actual path rendering starts from mouse position (source) but follows
     *    the pre-calculated path structure from the nearest hotspot
     * 
     * CACHE STRUCTURE:
     * - Paths are generated between hotspots that are 170-900px apart
     * - Each hotspot pair has 2-3 path variations for visual variety
     * - Paths are stored in database/memory with from/to hotspot IDs
     */
    let rafId: number | null = null;
    let lastZone: string | null = null;
    let lastSourceGridX: number | null = null;
    let lastSourceGridY: number | null = null;
    let lockedSource: { x: number; y: number } | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        // Check if we're in the project grid area (rough approximation)
        // Project grid is typically in the center-bottom area of the screen
        const isInProjectGrid = e.clientY > windowSize.height * 0.3 && // Below top 30%
                                e.clientX > windowSize.width * 0.1 &&   // Not in left margin
                                e.clientX < windowSize.width * 0.9;     // Not in right margin
        
        // Calculate grid position for mouse - align with dot centers
        const mouseGridX = Math.floor(e.clientX / GRID_SIZE);
        const mouseGridY = Math.floor(e.clientY / GRID_SIZE);
        
        if (isInProjectGrid) {
          // In project grid: Lock source, move target
          if (!lockedSource) {
            // Lock the source to current position when entering project grid
            lockedSource = { 
              x: (lastSourceGridX || mouseGridX) * GRID_SIZE + 15,
              y: (lastSourceGridY || mouseGridY) * GRID_SIZE + 15
            };
            console.log('[Paths] Entered project grid - locking source at', lockedSource);
          }
          
          // Update target position to follow mouse
          const targetX = mouseGridX * GRID_SIZE + 15;
          const targetY = mouseGridY * GRID_SIZE + 15;
          setTargetPos({ x: targetX, y: targetY });
          
        } else {
          // Normal behavior: source follows mouse, target is randomly selected
          if (lockedSource) {
            console.log('[Paths] Left project grid - unlocking source');
            lockedSource = null;
          }
          
          // Limit source movement to avoid large jumps
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
          
          // Update source position (snapped to dot center)
          const snappedX = newGridX * GRID_SIZE + 15; // Center of grid cell
          const snappedY = newGridY * GRID_SIZE + 15; // Center of grid cell
          
          // Only update if position actually changed
          if (lastSourceGridX !== newGridX || lastSourceGridY !== newGridY) {
            setSourcePos({ x: snappedX, y: snappedY });
            lastSourceGridX = newGridX;
            lastSourceGridY = newGridY;
          }
        }
        
        // STEP 1: Find the nearest hotspot to use as a reference for pre-calculated paths
        // Hotspots are positioned every 180px (6 grid cells) across the screen
        // In project grid mode, use locked source position instead of mouse position
        const nearest = isInProjectGrid && lockedSource 
          ? findNearestHotspot(lockedSource.x, lockedSource.y)
          : findNearestHotspot(e.clientX, e.clientY);
        
        if (!nearest) {
          console.warn('[Paths] No hotspot found near mouse position', e.clientX, e.clientY);
          return;
        }
        
        // Only update paths if we moved to a different hotspot zone
        if (nearest.id !== lastZone) {
          lastZone = nearest.id;
          setCurrentZone(nearest.id);
          
          console.log(`[Paths] Mouse entered zone: ${nearest.id} at (${nearest.x}, ${nearest.y})`);
          
          // STEP 2: Find pre-calculated paths FROM this hotspot
          let availablePaths = allPaths.filter(
            path => path.from === nearest.id
          );
          
          console.log(`[Paths] Found ${availablePaths.length} outgoing paths from ${nearest.id}`);
          
          // STEP 3: If no outgoing paths, try to find paths TO this hotspot and reverse them
          if (availablePaths.length === 0) {
            console.log(`[Paths] No outgoing paths, checking for incoming paths to ${nearest.id}`);
            availablePaths = allPaths.filter(
              path => path.to === nearest.id
            ).map(path => ({
              ...path,
              from: path.to,
              to: path.from,
              points: [...path.points].reverse()
            }));
            console.log(`[Paths] Found ${availablePaths.length} incoming paths (reversed) to ${nearest.id}`);
          }
          
          if (availablePaths.length > 0) {
            // Group paths by their target destination
            const pathsByTarget = new Map<string, typeof availablePaths>();
            availablePaths.forEach(path => {
              if (!pathsByTarget.has(path.to)) {
                pathsByTarget.set(path.to, []);
              }
              pathsByTarget.get(path.to)!.push(path);
            });
            
            // Find targets that have path variations
            const viableTargets = Array.from(pathsByTarget.entries())
              .filter(([_, paths]) => paths.length >= 1)
              .map(([targetId, paths]) => {
                const target = hotspots.find(h => h.id === targetId);
                if (!target) return null;
                
                // Calculate direction from source to target
                const dx = target.x - nearest.x;
                const dy = target.y - nearest.y;
                const angle = Math.atan2(dy, dx);
                
                return { targetId, paths, target, angle };
              })
              .filter(t => t !== null) as Array<{targetId: string, paths: typeof availablePaths, target: Hotspot, angle: number}>;
            
            if (viableTargets.length > 0) {
              // In project grid mode, target is already set by mouse position
              // In normal mode, randomly select a target
              if (!isInProjectGrid) {
                const selectedTarget = viableTargets[Math.floor(Math.random() * viableTargets.length)];
                const { targetId, paths: targetPaths, target: targetHotspot } = selectedTarget;
                
                if (targetHotspot) {
                  // Set target position 
                  setTargetPos({ x: targetHotspot.x, y: targetHotspot.y });
                  
                  // Select at least 2 paths, prefer 3 if available
                  const pathsToShow = Math.min(targetPaths.length, Math.max(2, maxActivePaths));
                  const selected = targetPaths.slice(0, pathsToShow);
                  
                  console.log(`[Paths] Selected ${selected.length} paths from ${nearest.id} to ${targetId}`);
                  setActivePaths(selected);
                }
              } else {
                // In project grid mode, just select paths to show
                // Target position is already set by mouse tracking
                const paths = availablePaths.slice(0, Math.max(2, maxActivePaths));
                console.log(`[Paths] Project grid mode: showing ${paths.length} paths`);
                setActivePaths(paths);
              }
            } else {
              // Fallback: if we have any paths, try to show at least 2
              if (availablePaths.length > 0) {
                // Group all available paths by target
                const allTargets = new Set(availablePaths.map(p => p.to));
                
                // Try to find multiple paths to the same target, or use different targets
                let pathsToShow: typeof availablePaths = [];
                
                // First try to find a target with multiple paths
                for (const targetId of allTargets) {
                  const pathsToTarget = availablePaths.filter(p => p.to === targetId);
                  if (pathsToTarget.length >= 2) {
                    pathsToShow = pathsToTarget.slice(0, Math.max(2, maxActivePaths));
                    break;
                  }
                }
                
                // If no target has multiple paths, combine paths to different targets
                if (pathsToShow.length < 2) {
                  pathsToShow = availablePaths.slice(0, Math.max(2, maxActivePaths));
                }
                
                if (pathsToShow.length > 0) {
                  const firstTarget = hotspots.find(h => h.id === pathsToShow[0].to);
                  if (firstTarget) {
                    setTargetPos({ x: firstTarget.x, y: firstTarget.y });
                    setActivePaths(pathsToShow);
                  }
                }
              }
            }
          } else {
            // CACHE MISS: No paths available at all for this hotspot
            console.warn(`[Paths] CACHE MISS: No paths found for hotspot ${nearest.id} at (${nearest.x}, ${nearest.y})`);
            console.warn(`[Paths] Total paths in cache: ${allPaths.length}`);
            
            // Generate supplemental paths on-demand for this hotspot
            console.log(`[Paths] Generating supplemental paths for ${nearest.id}`);
            
            // Find nearby hotspots that are within reasonable distance
            const nearbyHotspots = hotspots.filter(h => {
              if (h.id === nearest.id) return false;
              const distance = Math.sqrt(
                Math.pow(h.x - nearest.x, 2) + Math.pow(h.y - nearest.y, 2)
              );
              return distance >= 180 && distance <= 600; // Closer range for better coverage
            });
            
            if (nearbyHotspots.length > 0) {
              // Prefer targets on opposite side of screen
              const centerX = windowSize.width / 2;
              const centerY = windowSize.height / 2;
              const sourceIsLeft = nearest.x < centerX;
              const sourceIsTop = nearest.y < centerY;
              
              // Score and sort targets by how opposite they are
              const scoredTargets = nearbyHotspots.map(target => {
                const targetIsLeft = target.x < centerX;
                const targetIsTop = target.y < centerY;
                
                let score = 0;
                // Prefer opposite horizontal side
                if (sourceIsLeft !== targetIsLeft) score += 3;
                // Prefer opposite vertical side
                if (sourceIsTop !== targetIsTop) score += 3;
                // Prefer targets closer to center if source is on edge
                const distanceToCenter = Math.sqrt(
                  Math.pow(target.x - centerX, 2) + Math.pow(target.y - centerY, 2)
                );
                const sourceDistanceToCenter = Math.sqrt(
                  Math.pow(nearest.x - centerX, 2) + Math.pow(nearest.y - centerY, 2)
                );
                if (sourceDistanceToCenter > centerX * 0.7) {
                  // Source is near edge, prefer center targets
                  score += (1 - distanceToCenter / Math.max(centerX, centerY)) * 2;
                }
                
                return { hotspot: target, score };
              });
              
              // Sort by score and pick top 3
              scoredTargets.sort((a, b) => b.score - a.score);
              const targets = scoredTargets.slice(0, 3).map(t => t.hotspot);
              
              // Generate paths to these targets
              const dynamicPaths: Path[] = [];
              targets.forEach((target, index) => {
                // Generate 3 variations for each target for better visual effect
                for (let v = 0; v < 3; v++) {
                  const pathPoints = generateDynamicPath(nearest, target);
                  if (pathPoints.length > 1) {
                    dynamicPaths.push({
                      id: `dynamic-${nearest.id}-${target.id}-${v}`,
                      from: nearest.id,
                      to: target.id,
                      points: pathPoints,
                    });
                  }
                }
              });
              
              if (dynamicPaths.length > 0) {
                console.log(`[Paths] Generated ${dynamicPaths.length} supplemental paths`);
                // Show at least 2 paths, prefer 3 if available
                const pathsToShow = dynamicPaths.slice(0, Math.min(dynamicPaths.length, Math.max(2, maxActivePaths)));
                setActivePaths(pathsToShow);
                
                // Set target to first path's destination
                const firstTarget = hotspots.find(h => h.id === pathsToShow[0].to);
                if (firstTarget) {
                  setTargetPos({ x: firstTarget.x, y: firstTarget.y });
                }
                
                // Add these paths to our cache for future use
                setAllPaths(prev => [...prev, ...dynamicPaths]);
              } else {
                console.warn(`[Paths] Could not generate supplemental paths`);
                setTargetPos(null);
                setActivePaths([]);
              }
            } else {
              console.warn(`[Paths] No nearby hotspots found within range`);
              setTargetPos(null);
              setActivePaths([]);
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
  }, [findNearestHotspot, allPaths, maxActivePaths, hotspots, generateDynamicPath, windowSize.height, windowSize.width]);

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
      {/* CSS Dot Grid Background - positioned to align dots with grid intersections */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.dotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '15px 15px', // Offset to put dots at grid intersections
          opacity: theme.dotOpacity,
        }}
      />
      
      {/* Debug Panel */}
      {showDebug && (
        <div className="fixed top-20 right-4 bg-black/80 text-green-400 p-4 rounded-lg font-mono text-xs z-50 max-w-sm">
          <div className="mb-2 text-yellow-400 font-bold">🔧 Debug Mode</div>
          <div className="space-y-1">
            <div>Press Ctrl/Cmd+Shift+D to toggle</div>
            <div className="text-cyan-400">Grid System:</div>
            <div className="pl-2">• Cell Size: {GRID_SIZE}px</div>
            <div className="pl-2">• Dot Offset: 15px (center)</div>
            <div className="pl-2">• Hotspot Spacing: 180px (6 cells)</div>
            <div className="text-green-400">Visual Indicators:</div>
            <div className="pl-2">• 🟣 Grid lines (magenta)</div>
            <div className="pl-2">• 🟢 Hotspots (green circles)</div>
            <div className="pl-2">• 🔴 Center crosshair (red)</div>
            <div className="pl-2">• 🔵 Quadrant labels (cyan)</div>
            <div className="text-yellow-400">Console Commands:</div>
            <div className="pl-2">• __toggleDebug() - Toggle debug</div>
            <div className="pl-2">• __storePaths() - Store to DB</div>
          </div>
        </div>
      )}
      
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
        
        {/* Show source (mouse position) - snapped to grid */}
        {sourcePos && (
          <motion.g
            key={`source-${sourcePos.x}-${sourcePos.y}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            {/* Debug: Show grid alignment dot */}
            <circle 
              cx={sourcePos.x} 
              cy={sourcePos.y} 
              r="2" 
              fill={theme.targetColor} 
              opacity="0.8"
            />
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
        
        {/* Debug Visualization */}
        {showDebug && (
          <g className="debug-layer" opacity="0.8">
            {/* Grid lines */}
            {Array.from({ length: Math.ceil(windowSize.width / GRID_SIZE) }, (_, i) => (
              <line
                key={`vline-${i}`}
                x1={i * GRID_SIZE + 15}
                y1={0}
                x2={i * GRID_SIZE + 15}
                y2={windowSize.height}
                stroke="#ff00ff"
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))}
            {Array.from({ length: Math.ceil(windowSize.height / GRID_SIZE) }, (_, i) => (
              <line
                key={`hline-${i}`}
                x1={0}
                y1={i * GRID_SIZE + 15}
                x2={windowSize.width}
                y2={i * GRID_SIZE + 15}
                stroke="#ff00ff"
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))}
            
            {/* Hotspots */}
            {hotspots.map((hotspot, index) => (
              <g key={hotspot.id}>
                <circle
                  cx={hotspot.x}
                  cy={hotspot.y}
                  r="8"
                  fill="#00ff00"
                  opacity="0.3"
                />
                <text
                  x={hotspot.x}
                  y={hotspot.y - 10}
                  fill="#00ff00"
                  fontSize="8"
                  textAnchor="middle"
                >
                  {hotspot.id}
                </text>
              </g>
            ))}
            
            {/* Current zone indicator */}
            {currentZone && (
              <text
                x={10}
                y={20}
                fill="#ffff00"
                fontSize="12"
                fontFamily="monospace"
              >
                Zone: {currentZone}
              </text>
            )}
            
            {/* Grid info */}
            <text
              x={10}
              y={40}
              fill="#ffff00"
              fontSize="12"
              fontFamily="monospace"
            >
              Grid: {GRID_SIZE}px | Hotspots: {hotspots.length} | Paths: {allPaths.length}
            </text>
            
            {/* Viewport info */}
            <text
              x={10}
              y={60}
              fill="#ffff00"
              fontSize="12"
              fontFamily="monospace"
            >
              Viewport: {windowSize.width}x{windowSize.height}
            </text>
            
            {/* Active paths info */}
            <text
              x={10}
              y={80}
              fill="#ffff00"
              fontSize="12"
              fontFamily="monospace"
            >
              Active Paths: {activePaths.length} | Source: {sourcePos ? `(${Math.floor(sourcePos.x)}, ${Math.floor(sourcePos.y)})` : 'none'}
            </text>
            
            {/* Quadrant indicators */}
            <text x={windowSize.width / 4} y={windowSize.height / 2} fill="#00ffff" fontSize="20" textAnchor="middle" opacity="0.3">LEFT</text>
            <text x={windowSize.width * 3 / 4} y={windowSize.height / 2} fill="#00ffff" fontSize="20" textAnchor="middle" opacity="0.3">RIGHT</text>
            <text x={windowSize.width / 2} y={windowSize.height / 4} fill="#00ffff" fontSize="20" textAnchor="middle" opacity="0.3">TOP</text>
            <text x={windowSize.width / 2} y={windowSize.height * 3 / 4} fill="#00ffff" fontSize="20" textAnchor="middle" opacity="0.3">BOTTOM</text>
            
            {/* Center crosshair */}
            <line
              x1={windowSize.width / 2 - 20}
              y1={windowSize.height / 2}
              x2={windowSize.width / 2 + 20}
              y2={windowSize.height / 2}
              stroke="#ff0000"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1={windowSize.width / 2}
              y1={windowSize.height / 2 - 20}
              x2={windowSize.width / 2}
              y2={windowSize.height / 2 + 20}
              stroke="#ff0000"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        )}
      </svg>
    </>
  );
};

export default StaticPathBackground;