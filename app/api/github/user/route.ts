import { type NextRequest, NextResponse } from "next/server"
import { neonCache } from "@/lib/neon-cache"

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  avatar_url: string
  html_url: string
  company: string | null
  location: string | null
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "arach"
  
  // Separate cache keys for user and repos
  const userCacheKey = `github-user-${username}`
  const reposCacheKey = `github-repos-${username}`
  
  const requestStart = Date.now()
  console.log(`[API] 🚀 Processing GitHub user/repos request for ${username}`)

  try {
    // Check cache for user data
    const cachedUser = await neonCache.get<any>(userCacheKey)
    const cachedRepos = await neonCache.get<any>(reposCacheKey)
    
    if (cachedUser && cachedRepos) {
      const responseTime = Date.now() - requestStart
      console.log(`[API] 💾 CACHE HIT for user and repos (${responseTime}ms)`)
      
      return NextResponse.json({
        user: cachedUser.user,
        repos: cachedRepos.repos,
        cached: true,
        source: "cache",
        cacheAge: {
          user: cachedUser._cache?.age,
          repos: cachedRepos._cache?.age
        },
        _performance: {
          requestTime: responseTime,
          timestamp: new Date().toISOString(),
          cacheHit: true,
        }
      })
    }

    // Fetch fresh data
    console.log(`[API] ❌ CACHE MISS - fetching fresh GitHub data`)
    
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "arach-dev-portfolio",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        })
      },
    })

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status} ${userResponse.statusText}`)
    }

    const user: GitHubUser = await userResponse.json()

    // Fetch repositories
    const allRepos: GitHubRepo[] = []
    let page = 1
    const perPage = 50
    const maxPages = 3

    while (page <= maxPages) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}&page=${page}&type=public`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "arach-dev-portfolio",
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            })
          },
        }
      )

      if (!reposResponse.ok) {
        console.warn(`Failed to fetch repos page ${page}: ${reposResponse.status}`)
        break
      }

      const repos = await reposResponse.json()
      if (repos.length === 0) break
      
      allRepos.push(...repos)
      
      if (repos.length < perPage) break
      page++
    }

    const responseTime = Date.now() - requestStart
    console.log(`[API] ✅ Fetched user and ${allRepos.length} repos (${responseTime}ms)`)

    // Store in cache with different TTLs
    // User data: 24 hours (86400 seconds)
    await neonCache.set(userCacheKey, username, { user }, 86400, "api")
    
    // Repos: 7 days (604800 seconds) as you don't create repos often
    await neonCache.set(reposCacheKey, username, { repos: allRepos }, 604800, "api")
    
    console.log(`[API] 💾 Cached user data (24h TTL) and repos (7d TTL)`)

    return NextResponse.json({
      user,
      repos: allRepos,
      cached: false,
      source: "api",
      _performance: {
        requestTime: responseTime,
        timestamp: new Date().toISOString(),
        cacheHit: false,
      }
    })

  } catch (error) {
    console.error(`[API] ❌ Error fetching GitHub data:`, error)
    
    // Try to return stale cache data as fallback
    const staleUser = await neonCache.getStale<any>(userCacheKey)
    const staleRepos = await neonCache.getStale<any>(reposCacheKey)
    
    if (staleUser && staleRepos) {
      console.log(`[API] 📦 Using stale cache data as fallback`)
      return NextResponse.json({
        user: staleUser.user,
        repos: staleRepos.repos,
        cached: true,
        stale: true,
        source: "cache-stale",
        error: error instanceof Error ? error.message : "Unknown error"
      })
    }

    return NextResponse.json(
      { error: "Failed to fetch GitHub data", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}