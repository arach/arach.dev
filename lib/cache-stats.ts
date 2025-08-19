// Track cache statistics in memory (for development)
let cacheStatistics = {
  hits: 0,
  misses: 0,
  lastAccess: null as string | null,
};

export function recordCacheHit() {
  cacheStatistics.hits++;
  cacheStatistics.lastAccess = new Date().toISOString();
}

export function recordCacheMiss() {
  cacheStatistics.misses++;
  cacheStatistics.lastAccess = new Date().toISOString();
}

export function getCacheStatistics() {
  return cacheStatistics;
}