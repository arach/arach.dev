"use client"

import { useState, useEffect, useRef, memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Github, AlertCircle, RefreshCw, TrendingUp, Zap } from "lucide-react"
import type { ContributionDay, GitHubStats, GitHubContributionsProps } from "@/types/github"
import { useTheme } from "@/lib/theme-context"

const GitHubContributions = memo(function GitHubContributions({
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
  const { currentTheme: theme } = useTheme()

  const fetchGitHubData = useCallback(async () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      console.log('[Component] Skipping fetch - not on client')
      return
    }
    
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

      console.log(`[Component] Fetching from: /api/github/contributions?username=${username}`)
      const contributionsResponse = await fetch(`/api/github/contributions?username=${username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      console.log(`[Component] Response status: ${contributionsResponse.status}`)

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

      if (contributionsResponse.status === 404) {
        console.warn(`[Component] 404 - API endpoint not found. This may be a routing issue.`)
        // Don't throw for 404s during development
        return
      }

      let errorMessage = `API returned ${contributionsResponse.status}: ${contributionsResponse.statusText}`
      console.error(`[Component] API response not ok:`, {
        status: contributionsResponse.status,
        statusText: contributionsResponse.statusText,
        url: `/api/github/contributions?username=${username}`
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
  }, [username, hasData, isInitialized])

  useEffect(() => {
    // Prevent duplicate fetches with a flag
    let isMounted = true;
    const fetchController = new AbortController();
    
    // Non-blocking load - fetch in background after initial paint
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        fetchGitHubData()
      }
    }, 500) // Increased delay to prioritize initial content
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      fetchController.abort();
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
      }
    }
  }, [username, showPrivateRepos, fetchGitHubData])



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
          className="flex items-center gap-1 text-[10px] sm:text-xs hover:shadow-md transition-all duration-300 px-1.5 sm:px-2 py-1 sm:py-1.5 h-auto"
          style={{
            background: 'var(--theme-card-bg)',
            borderColor: 'var(--theme-border-color)',
            color: 'var(--theme-text-color)'
          }}
        >
          <Github className="w-3 h-3" style={{ color: 'var(--theme-accent-color)' }} />
          {/* Show streak when ready, no loading indicator */}
          {stats && stats.currentStreak > 0 && (
            <>
              <span className="text-orange-600">🔥</span>
              <span className="text-orange-600 font-medium">{stats.currentStreak}</span>
            </>
          )}
          <TrendingUp className="w-2.5 h-2.5" style={{ color: 'var(--theme-muted-text)' }} />
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
            className="rounded-lg shadow-2xl p-4 w-80 relative border"
            style={{
              zIndex: 2147483647,
              backgroundColor: theme?.cardBg || theme?.bgColor || '#ffffff',
              borderColor: theme?.borderColor || 'rgb(229, 231, 235)',
              boxShadow: theme?.shadowColor 
                ? `0 25px 50px -12px ${theme.shadowColor}, 0 0 0 1px ${theme.shadowColor}` 
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onMouseEnter={handlePreviewMouseEnter}
            onMouseLeave={handlePreviewMouseLeave}
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: theme?.borderColor || 'rgb(243, 244, 246)' }}>
              <div className="flex items-center gap-1.5">
                <Github className="w-4 h-4" style={{ color: theme?.mutedTextColor || 'rgb(107, 114, 128)' }} />
                <span className="font-medium text-sm" style={{ color: theme?.textColor || 'rgb(17, 24, 39)' }}>Activity</span>
              </div>
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs hover:underline transition-all"
                style={{ color: theme?.accentColor || 'rgb(59, 130, 246)' }}
                onClick={(e) => e.stopPropagation()}
              >
                @{username} →
              </a>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-4">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin" style={{ color: theme?.accentColor || 'rgb(59, 130, 246)' }} />
                <p className="text-sm" style={{ color: theme?.mutedTextColor || 'rgb(107, 114, 128)' }}>Loading GitHub data...</p>
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
                    <div className="text-lg font-bold" style={{ color: theme?.accentColor || 'rgb(59, 130, 246)' }}>
                      {stats.threeMonthContributions.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: theme?.mutedTextColor || 'rgb(107, 114, 128)' }}>Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {stats.currentStreak > 0 && <span className="text-sm">🔥</span>}
                      <div className="text-lg font-bold" style={{ color: '#f97316' }}>{stats.currentStreak}</div>
                    </div>
                    <div className="text-xs" style={{ color: theme?.mutedTextColor || 'rgb(107, 114, 128)' }}>Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: '#10b981' }}>
                      {contributions.filter((d) => d.count > 0).length}
                    </div>
                    <div className="text-xs" style={{ color: theme?.mutedTextColor || 'rgb(107, 114, 128)' }}>Active Days</div>
                  </div>
                </div>
              </div>
            )}

            {/* Current Month Calendar View */}
            {contributions.length > 0 && !error && !loading && (
              <div className="mb-3 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: theme?.textColor || 'rgb(55, 65, 81)' }}>
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" style={{ color: theme?.accentColor || 'rgb(96, 165, 250)' }} />
                  </div>
                </div>

                {/* Current Month Calendar */}
                {(() => {
                  const today = new Date();
                  const currentMonth = today.getMonth();
                  const currentYear = today.getFullYear();
                  const firstDay = new Date(currentYear, currentMonth, 1);
                  const lastDay = new Date(currentYear, currentMonth + 1, 0);
                  const daysInMonth = lastDay.getDate();
                  const startPadding = firstDay.getDay();
                  
                  // Get current month contributions
                  const currentMonthContributions = contributions.filter(c => {
                    const date = new Date(c.date);
                    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
                  });
                  
                  // Create calendar grid
                  const calendarDays: (ContributionDay | null)[] = [];
                  for (let i = 0; i < startPadding; i++) {
                    calendarDays.push(null);
                  }
                  
                  for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const contribution = currentMonthContributions.find(c => c.date === dateStr);
                    calendarDays.push(contribution || { date: dateStr, count: 0, level: 0 });
                  }
                  
                  return (
                    <>
                      {/* Day labels */}
                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div key={i} className="text-[8px] text-center" style={{ color: theme?.mutedTextColor || 'rgb(156, 163, 175)' }}>
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, index) => (
                          <div
                            key={index}
                            className={day ? "w-full aspect-square rounded-sm cursor-pointer hover:scale-110 transition-transform" : ""}
                            style={{
                              backgroundColor: day ? getContributionColor(day.level) : 'transparent',
                              opacity: day && new Date(day.date) > today ? 0.3 : 1
                            }}
                            title={day ? `${day.count} contributions on ${day.date}` : ''}
                          />
                        ))}
                      </div>
                      
                      {/* 30-day metrics */}
                      <div className="mt-3 pt-2 border-t" style={{ borderColor: theme?.borderColor || 'rgb(243, 244, 246)' }}>
                        <div className="text-[10px] font-medium mb-1" style={{ color: theme?.mutedTextColor || 'rgb(107, 114, 128)' }}>
                          Last 30 Days
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-sm font-semibold" style={{ color: theme?.textColor || 'rgb(17, 24, 39)' }}>
                              {contributions.slice(-30).reduce((sum, day) => sum + day.count, 0)}
                            </div>
                            <div className="text-[9px]" style={{ color: theme?.mutedTextColor || 'rgb(156, 163, 175)' }}>
                              commits
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold" style={{ color: theme?.textColor || 'rgb(17, 24, 39)' }}>
                              {contributions.slice(-30).filter(d => d.count > 0).length}
                            </div>
                            <div className="text-[9px]" style={{ color: theme?.mutedTextColor || 'rgb(156, 163, 175)' }}>
                              active days
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold" style={{ color: theme?.textColor || 'rgb(17, 24, 39)' }}>
                              {Math.round(contributions.slice(-30).reduce((sum, day) => sum + day.count, 0) / 30 * 10) / 10}
                            </div>
                            <div className="text-[9px]" style={{ color: theme?.mutedTextColor || 'rgb(156, 163, 175)' }}>
                              daily avg
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}


            {/* Enhanced Call to Action */}
            {!loading && (
              <div className="mt-3 pt-2 border-t text-center animate-in fade-in-50 slide-in-from-bottom-8 duration-1000" style={{ borderColor: theme?.borderColor || 'rgb(243, 244, 246)' }}>
                <Button
                  size="sm"
                  onClick={() => {
                    // Navigate to GitHub activity page
                    window.location.href = "/github"
                  }}
                  className="text-xs text-white"
                  style={{ 
                    backgroundColor: theme?.accentColor || 'rgb(37, 99, 235)',
                    borderColor: theme?.accentColor || 'rgb(37, 99, 235)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
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
})

export default GitHubContributions