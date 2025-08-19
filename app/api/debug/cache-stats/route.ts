import { NextResponse } from 'next/server';
import { NeonCache } from '@/lib/neon-cache';
import { getCacheStatistics } from '@/lib/cache-stats';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const cache = new NeonCache();
    
    // Get all cache entries from the database
    const entries = await cache.getAllEntries();
    
    // Calculate statistics
    const cacheStatistics = getCacheStatistics();
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
    
    return NextResponse.json({
      stats: {
        hits: cacheStatistics.hits,
        misses: cacheStatistics.misses,
        totalEntries,
        hitRate,
        totalSize: formatSize(totalSize),
        lastAccess: cacheStatistics.lastAccess,
      },
      entries: formattedEntries.slice(0, 10), // Return only first 10 entries
    });
  } catch (error) {
    console.error('Error fetching cache stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cache statistics' },
      { status: 500 }
    );
  }
}