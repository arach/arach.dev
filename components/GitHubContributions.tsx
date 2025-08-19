"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Github, AlertCircle, RefreshCw, TrendingUp, Zap } from "lucide-react"
import type { ContributionDay, GitHubStats, GitHubContributionsProps } from "@/types/github"

export default function GitHubContributions({
  username = "arach",
  showPrivateRepos = false,
}: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(false) // Start with loading false to not block render
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<string>("loading")
  const [hasData, setHasData] = useState(false) // Track if we have any data
  const [isInitialized, setIsInitialized] = useState(false) // Track if we've attempted to load
  const [cacheInfo, setCacheInfo] = useState<{
    status: "loading" | "cache-hit" | "cache-miss" | "error"
    age?: number
    source?: string
    timestamp?: string
  }>({ status: "loading" })
  const [showPreview, setShowPreview] = useState(false)
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Non-blocking load - fetch in background
    setTimeout(() => {
      fetchGitHubData()
    }, 0)
    
    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
      }
    }
  }, [username, showPrivateRepos])

  const getDateRangeText = () => {
    const today = new Date()
    const threeMonthsAgo = new Date(today)
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }

    return `${formatDate(threeMonthsAgo)} - ${formatDate(today)}`
  }

  const fetchGitHubData = async () => {
    // Don't block initial render
    if (!isInitialized) {
      setIsInitialized(true)
    }

    const startTime = Date.now()

    try {
      console.log(`[Component] 🚀 Starting fetch for ${username} at ${new Date().toISOString()}`)
      setCacheInfo({ status: "loading" })
      setError(null)
      // Only show loading if we don't have data yet
      if (!hasData) {
        setLoading(true)
      }

      const contributionsResponse = await fetch(`/api/github/contributions?username=${username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (contributionsResponse.ok) {
        const contributionsData = await contributionsResponse.json()
        const fetchTime = Date.now() - startTime

        // Enhanced cache status tracking
        if (contributionsData.cached || contributionsData.source === "cache-stale") {
          console.log(`[Component] 💾 CACHE HIT for ${username} (${fetchTime}ms)`, {
            source: contributionsData.source,
            age: contributionsData._cache?.age || contributionsData.cacheAge,
            hitCount: contributionsData._cache?.hitCount,
            message: contributionsData.message,
          })

          setCacheInfo({
            status: "cache-hit",
            age: contributionsData._cache?.age || contributionsData.cacheAge,
            source: contributionsData.source,
            timestamp: new Date().toISOString(),
          })
        } else {
          console.log(`[Component] 🌐 CACHE MISS for ${username} (${fetchTime}ms)`, {
            source: contributionsData.source,
            message: contributionsData.message,
          })

          setCacheInfo({
            status: "cache-miss",
            source: contributionsData.source,
            timestamp: new Date().toISOString(),
          })
        }

        setContributions(contributionsData.contributions || [])
        setDataSource(contributionsData.source)

        // Calculate stats from contributions only (no need for user/repo data)
        const calculatedStats = calculateStats(contributionsData.contributions || [])
        setStats(calculatedStats)
        setHasData(true)
        setLoading(false)
        return
      }

      // If response is not ok, handle error
      setLoading(false)
      setCacheInfo({ status: "error" })

      let errorMessage = `API returned ${contributionsResponse.status}: ${contributionsResponse.statusText}`

      try {
        const errorText = await contributionsResponse.text()
        if (errorText) {
          errorMessage += ` - ${errorText}`
        }
      } catch (e) {
        // Ignore error parsing response body
      }

      console.error(`[Component] API response not ok:`, {
        status: contributionsResponse.status,
        statusText: contributionsResponse.statusText,
      })

      throw new Error(errorMessage)
    } catch (err) {
      setCacheInfo({ status: "error" })
      console.error("[Component] Error in fetchGitHubData:", err)

      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching GitHub data"
      setError(errorMessage)
      setLoading(false)

      // Don't show anything if we can't get data
      setContributions([])
      setStats(null)
      setHasData(false)
      setDataSource("error")
    }
  }


  const calculateStats = (contributions: ContributionDay[]): GitHubStats => {
    const threeMonthContributions = contributions.reduce((sum, day) => sum + day.count, 0)
    const totalForks = 0 // We're not fetching repo data anymore

    // Calculate streaks for the 3-month period
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    let longestTempStreak = 0

    // Sort contributions by date (oldest first)
    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    // Calculate current streak (from most recent day backwards)
    const reversedContributions = [...sortedContributions].reverse()
    for (const day of reversedContributions) {
      if (day.count > 0) {
        currentStreak++
      } else {
        break
      }
    }

    // Calculate longest streak in the 3-month period
    for (const day of sortedContributions) {
      if (day.count > 0) {
        tempStreak++
        longestTempStreak = Math.max(longestTempStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }
    longestStreak = longestTempStreak

    return {
      totalCommits: threeMonthContributions,
      totalForks,
      currentStreak,
      longestStreak,
      totalContributions: threeMonthContributions,
      threeMonthContributions,
    }
  }

  const getContributionColor = (level: number) => {
    // Using an orange gradient to match the main activity page
    const colors = [
      "#f3f4f6", // gray-100 for no contributions
      "#fed7aa", // orange-200
      "#fdba74", // orange-300
      "#fb923c", // orange-400
      "#ea580c"  // orange-600
    ]
    return colors[level] || colors[0]
  }

  const getDataSourceInfo = () => {
    switch (dataSource) {
      case "api":
        return {
          label: "Live API",
          color: "green",
          description: `Fresh data from GitHub Contributions API`,
          icon: "🟢",
        }
      case "cache-stale":
        return {
          label: "Cached",
          color: "blue",
          description: `Cached data from previous API call`,
          icon: "🔵",
        }
      case "mock":
        return {
          label: "Demo Data",
          color: "yellow",
          description: `Demo data - realistic patterns for the last 3 months`,
          icon: "🟡",
        }
      case "error":
        return {
          label: "Error",
          color: "red",
          description: "Error loading data",
          icon: "🔴",
        }
      default:
        return {
          label: "Loading",
          color: "gray",
          description: "Loading data...",
          icon: "⚪",
        }
    }
  }


  const clearPreviewTimeout = () => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = null
    }
  }

  const setPreviewTimeout = () => {
    clearPreviewTimeout()
    previewTimeoutRef.current = setTimeout(() => {
      setShowPreview(false)
    }, 100) // 100ms delay for smooth transition
  }

  const handleMouseEnter = () => {
    clearPreviewTimeout()
    setShowPreview(true)
  }

  const handleMouseLeave = () => {
    setPreviewTimeout()
  }

  const handlePreviewMouseEnter = () => {
    clearPreviewTimeout()
  }

  const handlePreviewMouseLeave = () => {
    setPreviewTimeout()
  }

  const sourceInfo = getDataSourceInfo()

  // Only show button when we have data
  if (!hasData && !loading) {
    return null // Graceful degradation - don't show anything if no data
  }

  return (
    <div className="flex items-center justify-center">
      <div ref={buttonRef} className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Button
          onClick={() => {
            // Navigate to GitHub activity page
            window.location.href = "/github"
          }}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-xs hover:shadow-md transition-all duration-300 hover:scale-105 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 border-gray-200 hover:border-blue-300"
        >
          <Github className="w-4 h-4" />
          <span>GitHub Activity</span>

          {/* Show streak when ready, no loading indicator */}
          {stats && stats.currentStreak > 0 && (
            <span className="flex items-center gap-1 text-orange-600 animate-in fade-in-50 slide-in-from-right-2 duration-500">
              🔥 {stats.currentStreak}
            </span>
          )}

          <TrendingUp className="w-3 h-3 text-gray-400" />
        </Button>

        {/* Custom Hover Preview */}
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ${
            showPreview ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ zIndex: 2147483647 }}
        >
          <div
            ref={previewRef}
            className="bg-white border border-gray-200 rounded-lg shadow-2xl p-4 w-80 relative"
            style={{
              zIndex: 2147483647,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onMouseEnter={handlePreviewMouseEnter}
            onMouseLeave={handlePreviewMouseLeave}
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-sm">GitHub Activity</span>
              </div>
              <span className="text-xs text-gray-500">{getDateRangeText()}</span>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-4">
                <RefreshCw className="w-6 h-6 text-blue-500 mx-auto mb-2 animate-spin" />
                <p className="text-sm text-gray-600">Loading GitHub data...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-4">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 text-sm mb-2">Failed to load GitHub data</p>
                <Button onClick={fetchGitHubData} variant="outline" size="sm">
                  <RefreshCw className="w-3 h-3 mr-2" />
                  Retry
                </Button>
              </div>
            )}

            {/* Quick Stats */}
            {stats && !error && !loading && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {stats.threeMonthContributions.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {stats.currentStreak > 0 && <span className="text-sm">🔥</span>}
                      <div className="text-lg font-bold text-orange-600">{stats.currentStreak}</div>
                    </div>
                    <div className="text-xs text-gray-600">Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {contributions.filter((d) => d.count > 0).length}
                    </div>
                    <div className="text-xs text-gray-600">Active Days</div>
                  </div>
                </div>
              </div>
            )}

            {/* Mini Contribution Graph */}
            {contributions.length > 0 && !error && !loading && (
              <div className="mb-3 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">Recent Activity</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-blue-400" />
                  </div>
                </div>

                {/* Simplified contribution graph */}
                <div className="flex gap-0.5 overflow-hidden">
                  {contributions.slice(-84).map((day, index) => (
                    <div
                      key={day.date}
                      className="w-2 h-2 rounded-sm cursor-pointer hover:scale-125 transition-transform"
                      style={{ backgroundColor: getContributionColor(day.level) }}
                    />
                  ))}
                </div>

                {/* Mini legend */}
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="w-2 h-2 rounded-sm"
                        style={{ backgroundColor: getContributionColor(level) }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            )}


            {/* Enhanced Call to Action */}
            {!loading && (
              <div className="mt-3 pt-2 border-t border-gray-100 text-center animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
                <Button
                  size="sm"
                  onClick={() => {
                    // Navigate to GitHub activity page
                    window.location.href = "/github"
                  }}
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Full Analytics →
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}