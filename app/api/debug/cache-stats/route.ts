import { NextResponse } from 'next/server';

// Dynamically import database dependencies to avoid build issues
const getDependencies = async () => {
  const { NeonCache } = await import('@/lib/neon-cache');
  const { getCacheStatistics } = await import('@/lib/cache-stats');
  const { neon } = await import("@neondatabase/serverless");
  const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
  return { NeonCache, getCacheStatistics, sql };
};

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const { NeonCache, getCacheStatistics, sql } = await getDependencies();
    const cache = new NeonCache();
    
    // Get all cache entries from the database
    const entries = await cache.getAllEntries();
    
    // Get real statistics from database
    let cacheStatistics = { hits: 0, misses: 0 };
    let lastAccess = null;
    
    if (sql) {
      try {
        const statsResult = await sql`
          SELECT 
            cache_key,
            SUM(hit_count) as hits,
            SUM(miss_count) as misses,
            MAX(last_hit) as last_hit
          FROM cache_stats
          GROUP BY cache_key
        `;
        
        // Sum up all cache keys
        cacheStatistics = statsResult.reduce((acc: { hits: number; misses: number }, row) => ({
          hits: acc.hits + Number(row.hits || 0),
          misses: acc.misses + Number(row.misses || 0),
        }), { hits: 0, misses: 0 });
        
        // Get the most recent access
        const lastHits = statsResult
          .map(r => r.last_hit)
          .filter(Boolean)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        
        lastAccess = lastHits[0] || null;
      } catch (err) {
        console.warn('Could not fetch cache stats from DB, using in-memory:', err);
        // Fall back to in-memory stats if DB fails
        const memStats = getCacheStatistics();
        cacheStatistics = { hits: memStats.hits, misses: memStats.misses };
        lastAccess = memStats.lastAccess;
      }
    }
    
    const totalEntries = entries.length;
    const totalRequests = cacheStatistics.hits + cacheStatistics.misses;
    const hitRate = totalRequests > 0 
      ? ((cacheStatistics.hits / totalRequests) * 100).toFixed(2) + '%'
      : '0%';
    
    // Calculate total size (approximate)
    const totalSize = entries.reduce((acc, entry) => {
      const size = JSON.stringify(entry.value).length;
      return acc + size;
    }, 0);
    
    const formatSize = (bytes: number) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };
    
    // Format entries for display
    const formattedEntries = entries.map(entry => ({
      key: entry.key,
      value: entry.value, // Include the actual value for display
      expiry: entry.expiry,
      createdAt: entry.created_at,
      size: JSON.stringify(entry.value).length,
    }));
    
    // Get path cache statistics
    let pathCacheStats = {
      totalPaths: 0,
      uniqueViewports: 0,
      avgPathLength: 0,
      totalPathSize: '0 B'
    };
    
    let pathEntries: any[] = [];
    
    if (sql) {
      try {
        // Get path statistics
        const pathStats = await sql`
          SELECT 
            COUNT(*) as total_paths,
            COUNT(DISTINCT (viewport_width, viewport_height)) as unique_viewports,
            AVG(jsonb_array_length(points)) as avg_path_length,
            SUM(LENGTH(points::text)) as total_size
          FROM background_paths
        `;
        
        if (pathStats.length > 0) {
          pathCacheStats.totalPaths = Number(pathStats[0].total_paths);
          pathCacheStats.uniqueViewports = Number(pathStats[0].unique_viewports);
          pathCacheStats.avgPathLength = Math.round(Number(pathStats[0].avg_path_length) || 0);
          pathCacheStats.totalPathSize = formatSize(Number(pathStats[0].total_size) || 0);
        }
        
        // Get recent path entries for display
        const paths = await sql`
          SELECT 
            path_key,
            from_hotspot,
            to_hotspot,
            jsonb_array_length(points) as point_count,
            viewport_width || 'x' || viewport_height as viewport,
            created_at,
            LENGTH(points::text) as size
          FROM background_paths
          ORDER BY created_at DESC
          LIMIT 10
        `;
        
        pathEntries = paths.map(p => ({
          key: `[PATH] ${p.from_hotspot} → ${p.to_hotspot}`,
          value: {
            points: `${p.point_count} points`,
            viewport: p.viewport
          },
          expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          createdAt: p.created_at,
          size: p.size
        }));
      } catch (err) {
        console.error('Failed to get path cache stats:', err);
      }
    }
    
    return NextResponse.json({
      stats: {
        hits: cacheStatistics.hits,
        misses: cacheStatistics.misses,
        totalEntries,
        hitRate,
        totalSize: formatSize(totalSize),
        lastAccess: lastAccess,
        pathCache: pathCacheStats
      },
      entries: [...formattedEntries.slice(0, 5), ...pathEntries].slice(0, 15), // Mix both types of entries
    });
  } catch (error) {
    console.error('Error fetching cache stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cache statistics' },
      { status: 500 }
    );
  }
}