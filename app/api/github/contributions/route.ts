import { type NextRequest, NextResponse } from "next/server"
import { neonCache } from "@/lib/neon-cache"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubContributionsAPIResponse {
  total: {
    [year: string]: number
  }
  contributions: Array<{
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
  }>
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "arach"
  const cacheKey = `github-contributions-${username}-3months`

  const requestStart = Date.now()
  console.log(`[API] 🚀 Processing request for ${username} at ${new Date().toISOString()}`)

  try {
    // Step 1: Check Neon database cache first
    console.log(`[API] 🔍 Checking Neon cache for key: ${cacheKey}`)
    const cachedData = await neonCache.get(cacheKey)

    if (cachedData) {
      const responseTime = Date.now() - requestStart
      console.log(
        `[API] 💾 NEON CACHE HIT for ${username} (age: ${cachedData._cache?.age}min, response: ${responseTime}ms)`,
      )

      return NextResponse.json({
        ...cachedData,
        cached: true,
        source: cachedData._cache?.stale ? "cache-stale" : "cache",
        cacheAge: cachedData._cache?.age,
        _performance: {
          requestTime: responseTime,
          timestamp: new Date().toISOString(),
          cacheHit: true,
        },
        _cache: {
          ...cachedData._cache,
          hitTime: new Date().toISOString(),
        },
      })
    }

    // Step 2: Cache miss - fetch fresh data
    console.log(`[API] ❌ NEON CACHE MISS for ${username} - fetching fresh data`)

    const contributions = await fetchContributionsFromAPI(username)
    const responseTime = Date.now() - requestStart

    const responseData = {
      contributions,
      source: "api",
      period: "3months",
      message: "Fresh data from GitHub Contributions API",
      cached: false,
      _performance: {
        requestTime: responseTime,
        timestamp: new Date().toISOString(),
        cacheHit: false,
      },
    }

    // Step 3: Store in Neon cache (1 hour TTL)
    console.log(`[API] 💾 Storing fresh data in Neon cache`)
    const cacheSuccess = await neonCache.set(cacheKey, username, responseData, 3600, "api")

    if (cacheSuccess) {
      console.log(`[API] ✅ Successfully cached ${contributions.length} days for ${username}`)
    } else {
      console.warn(`[API] ⚠️ Failed to cache data for ${username}`)
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error(`[API] ❌ Error fetching data for ${username}:`, error)

    // Step 4: Try to get stale cache data as fallback
    console.log(`[API] 🔄 Attempting to get stale cache data as fallback`)
    const staleData = await neonCache.getStale(cacheKey)

    if (staleData) {
      const responseTime = Date.now() - requestStart
      console.log(`[API] 📦 Using stale cached data for ${username} (age: ${staleData._cache?.age}min)`)

      return NextResponse.json({
        ...staleData,
        source: "cache-stale",
        message: "Using stale cached data - API temporarily unavailable",
        cached: true,
        stale: true,
        _performance: {
          requestTime: responseTime,
          timestamp: new Date().toISOString(),
          cacheHit: true,
          fallback: true,
        },
        _cache: {
          ...staleData._cache,
          hitTime: new Date().toISOString(),
        },
      })
    }

    // Step 5: Final fallback - generate mock data
    console.log(`[API] 🎭 Generating mock data for ${username} as final fallback`)
    const mockContributions = generateRealisticMockData(username)
    const responseTime = Date.now() - requestStart

    const mockResponse = {
      contributions: mockContributions,
      source: "mock",
      period: "3months",
      message: "Using demo data - API unavailable and no cache",
      error: error instanceof Error ? error.message : "Unknown error",
      cached: false,
      _performance: {
        requestTime: responseTime,
        timestamp: new Date().toISOString(),
        cacheHit: false,
        fallback: true,
      },
    }

    // Cache mock data for shorter duration (15 minutes)
    await neonCache.set(cacheKey, username, mockResponse, 900, "mock").catch(() => {
      console.warn(`[API] ⚠️ Failed to cache mock data`)
    })

    return NextResponse.json(mockResponse)
  }
}

function getTrailing3MonthsDateRange() {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const threeMonthsAgo = new Date(yesterday)
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

  return {
    startDate: threeMonthsAgo,
    endDate: yesterday,
  }
}

async function fetchContributionsFromAPI(username: string): Promise<ContributionDay[]> {
  const currentYear = new Date().getFullYear()
  const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`

  console.log(`[API] 🌐 Fetching from external API: ${url}`)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "arach-dev-portfolio",
        Accept: "application/json",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub user '${username}' not found`)
      }
      if (response.status === 429) {
        throw new Error(`Rate limit exceeded for GitHub Contributions API`)
      }
      throw new Error(`GitHub Contributions API failed: ${response.status} ${response.statusText}`)
    }

    const data: GitHubContributionsAPIResponse = await response.json()

    if (!data.contributions || !Array.isArray(data.contributions)) {
      throw new Error("Invalid response format from GitHub Contributions API")
    }

    // Filter to only include trailing 3 months
    const { startDate, endDate } = getTrailing3MonthsDateRange()

    const contributions: ContributionDay[] = data.contributions
      .filter((contrib) => {
        const contribDate = new Date(contrib.date)
        return contribDate >= startDate && contribDate <= endDate
      })
      .map((contrib) => ({
        date: contrib.date,
        count: contrib.count,
        level: Math.min(Math.max(contrib.level, 0), 4) as 0 | 1 | 2 | 3 | 4,
      }))

    contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    console.log(`[API] ✅ Successfully processed ${contributions.length} contribution days from external API`)

    return contributions
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

function generateRealisticMockData(username: string): ContributionDay[] {
  console.log(`[API] 🎭 Generating realistic mock data for ${username}`)

  const contributions: ContributionDay[] = []
  const { startDate, endDate } = getTrailing3MonthsDateRange()

  // Use username to seed randomness for consistent mock data
  let seed = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  const activityLevel = 0.6 + random() * 0.3 // 0.6-0.9 activity level

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0]
    const dayOfWeek = d.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const daysSinceStart = Math.floor((d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    // Create realistic patterns
    const seasonalMultiplier = 0.8 + Math.sin((daysSinceStart / 90) * Math.PI * 2) * 0.3
    const weeklyMultiplier = isWeekend ? 0.4 : 1.0
    const streakMultiplier = daysSinceStart % 30 < 20 ? 1.3 : 1.0

    const baseChance = activityLevel * seasonalMultiplier * weeklyMultiplier * streakMultiplier

    let count = 0
    if (random() < baseChance) {
      const maxContributions = isWeekend ? 8 : 15
      count = Math.floor(random() * maxContributions) + 1

      // Occasional high-activity days
      if (random() < 0.05) {
        count = Math.floor(count * 1.5)
      }
    }

    const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 8 ? 2 : count <= 15 ? 3 : 4
    contributions.push({
      date: dateStr,
      count,
      level: level as 0 | 1 | 2 | 3 | 4,
    })
  }

  return contributions
}