import { neon } from "@neondatabase/serverless"

// Initialize Neon client
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

interface CacheEntry {
  cache_key: string
  username: string
  data: any
  created_at: string
  expires_at: string
  source: string
  hit_count: number
}

interface CacheStats {
  hits: number
  misses: number
  hitRate: number
  totalEntries: number
  expiredEntries: number
}

export class NeonCache {
  private static instance: NeonCache

  static getInstance(): NeonCache {
    if (!NeonCache.instance) {
      NeonCache.instance = new NeonCache()
    }
    return NeonCache.instance
  }

  /**
   * Check if database is available
   */
  private async checkConnection(): Promise<boolean> {
    try {
      if (!process.env.DATABASE_URL || !sql) {
        return false
      }

      await sql`SELECT 1`
      return true
    } catch (error) {
      console.warn("[Cache] Database connection failed:", error)
      return false
    }
  }

  /**
   * Get cached data by key
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!sql || !(await this.checkConnection())) {
        return null
      }

      const result = await sql`
        SELECT cache_key, username, data, created_at, expires_at, source, hit_count
        FROM github_cache 
        WHERE cache_key = ${key} 
        AND expires_at > NOW()
        LIMIT 1
      `

      if (result.length === 0) {
        // Record cache miss
        await this.recordMiss(key).catch(() => {}) // Ignore errors
        return null
      }

      const entry = result[0] as CacheEntry

      // Increment hit count (ignore errors)
      await sql`
        UPDATE github_cache 
        SET hit_count = hit_count + 1 
        WHERE cache_key = ${key}
      `.catch(() => {})

      // Record cache hit (ignore errors)
      await this.recordHit(key).catch(() => {})

      console.log(`[Cache] HIT for key: ${key} (age: ${this.getAgeInMinutes(entry.created_at)} min)`)

      return {
        ...entry.data,
        _cache: {
          key: entry.cache_key,
          age: this.getAgeInMinutes(entry.created_at),
          source: entry.source,
          hitCount: entry.hit_count + 1,
        },
      }
    } catch (error) {
      console.error("[Cache] Get error:", error)
      return null
    }
  }

  /**
   * Set cached data with expiration
   */
  async set(key: string, username: string, data: any, ttlSeconds = 3600, source = "api"): Promise<boolean> {
    try {
      if (!sql || !(await this.checkConnection())) {
        return false
      }

      const expiresAt = new Date(Date.now() + ttlSeconds * 1000)

      await sql`
        INSERT INTO github_cache (cache_key, username, data, expires_at, source)
        VALUES (${key}, ${username}, ${JSON.stringify(data)}, ${expiresAt.toISOString()}, ${source})
        ON CONFLICT (cache_key) 
        DO UPDATE SET 
          data = EXCLUDED.data,
          expires_at = EXCLUDED.expires_at,
          source = EXCLUDED.source,
          created_at = NOW()
      `

      console.log(`[Cache] SET for key: ${key} (TTL: ${ttlSeconds}s)`)
      return true
    } catch (error) {
      console.error("[Cache] Set error:", error)
      return false
    }
  }

  /**
   * Get stale data (expired but still in cache)
   */
  async getStale<T>(key: string): Promise<T | null> {
    try {
      if (!sql || !(await this.checkConnection())) {
        return null
      }

      const result = await sql`
        SELECT cache_key, username, data, created_at, expires_at, source, hit_count
        FROM github_cache 
        WHERE cache_key = ${key}
        ORDER BY created_at DESC
        LIMIT 1
      `

      if (result.length === 0) {
        return null
      }

      const entry = result[0] as CacheEntry
      const isExpired = new Date(entry.expires_at) < new Date()

      console.log(
        `[Cache] STALE for key: ${key} (expired: ${isExpired}, age: ${this.getAgeInMinutes(entry.created_at)} min)`,
      )

      return {
        ...entry.data,
        _cache: {
          key: entry.cache_key,
          age: this.getAgeInMinutes(entry.created_at),
          source: entry.source,
          hitCount: entry.hit_count,
          stale: isExpired,
        },
      }
    } catch (error) {
      console.error("[Cache] GetStale error:", error)
      return null
    }
  }

  /**
   * Delete cache entry
   */
  async delete(key: string): Promise<boolean> {
    try {
      if (!sql || !(await this.checkConnection())) {
        return false
      }

      await sql`DELETE FROM github_cache WHERE cache_key = ${key}`
      console.log(`[Cache] DELETE for key: ${key}`)
      return true
    } catch (error) {
      console.error("[Cache] Delete error:", error)
      return false
    }
  }

  /**
   * Clean up expired entries
   */
  async cleanup(): Promise<number> {
    try {
      if (!sql || !(await this.checkConnection())) {
        return 0
      }

      const result = await sql`SELECT cleanup_expired_cache() as deleted_count`
      const deletedCount = result[0]?.deleted_count || 0

      if (deletedCount > 0) {
        console.log(`[Cache] Cleanup: removed ${deletedCount} expired entries`)
      }

      return deletedCount
    } catch (error) {
      console.error("[Cache] Cleanup error:", error)
      return 0
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<CacheStats> {
    try {
      if (!sql || !(await this.checkConnection())) {
        return {
          hits: 0,
          misses: 0,
          hitRate: 0,
          totalEntries: 0,
          expiredEntries: 0,
        }
      }

      const [cacheResult, statsResult] = await Promise.all([
        sql`
          SELECT 
            COUNT(*) as total_entries,
            COUNT(CASE WHEN expires_at < NOW() THEN 1 END) as expired_entries
          FROM github_cache
        `,
        sql`
          SELECT 
            COALESCE(SUM(hit_count), 0) as total_hits,
            COUNT(DISTINCT cache_key) as unique_keys
          FROM cache_stats
        `,
      ])

      const cacheData = cacheResult[0]
      const statsData = statsResult[0]

      // Calculate hit rate (simplified)
      const totalHits = Number(statsData?.total_hits || 0)
      const totalRequests = totalHits + Number(cacheData?.total_entries || 0)
      const hitRate = totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0

      return {
        hits: totalHits,
        misses: Number(cacheData?.total_entries || 0),
        hitRate: Math.round(hitRate * 100) / 100,
        totalEntries: Number(cacheData?.total_entries || 0),
        expiredEntries: Number(cacheData?.expired_entries || 0),
      }
    } catch (error) {
      console.error("[Cache] Stats error:", error)
      return {
        hits: 0,
        misses: 0,
        hitRate: 0,
        totalEntries: 0,
        expiredEntries: 0,
      }
    }
  }

  /**
   * Get all cache entries for a username
   */
  async getUserCache(username: string): Promise<CacheEntry[]> {
    try {
      if (!sql || !(await this.checkConnection())) {
        return []
      }

      const result = await sql`
        SELECT cache_key, username, data, created_at, expires_at, source, hit_count
        FROM github_cache 
        WHERE username = ${username}
        ORDER BY created_at DESC
      `

      return result as CacheEntry[]
    } catch (error) {
      console.error("[Cache] Get user cache error:", error)
      return []
    }
  }

  private async recordHit(key: string): Promise<void> {
    try {
      if (!sql) return
      await sql`
        INSERT INTO cache_stats (cache_key, hit_count, last_hit)
        VALUES (${key}, 1, NOW())
        ON CONFLICT (cache_key)
        DO UPDATE SET 
          hit_count = cache_stats.hit_count + 1,
          last_hit = NOW()
      `
    } catch (error) {
      console.error("[Cache] Record hit error:", error)
    }
  }

  private async recordMiss(key: string): Promise<void> {
    try {
      if (!sql) return
      await sql`
        INSERT INTO cache_stats (cache_key, miss_count, last_miss)
        VALUES (${key}, 1, NOW())
        ON CONFLICT (cache_key)
        DO UPDATE SET 
          miss_count = cache_stats.miss_count + 1,
          last_miss = NOW()
      `
    } catch (error) {
      console.error("[Cache] Record miss error:", error)
    }
  }

  private getAgeInMinutes(createdAt: string): number {
    return Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000 / 60)
  }
}

// Export singleton instance
export const neonCache = NeonCache.getInstance()