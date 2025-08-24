"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Github,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  Activity,
  BarChart3,
  ArrowLeft,
  ExternalLink,
  Users,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import CurrentMonthInsights from "./CurrentMonthInsights"
import TrailingMonthsCompact from "./TrailingMonthsCompact"

// Keep all the existing interfaces and types from the original file
interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
  homepage: string | null
}

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubStats {
  totalCommits: number
  totalForks: number
  currentStreak: number
  longestStreak: number
  totalContributions: number
  threeMonthContributions: number
}

interface MonthlyStats {
  month: string
  year: number
  contributions: number
  activeDays: number
  averagePerDay: number
  longestStreak: number
  weekdayContributions: number
  weekendContributions: number
  isCurrentMonth: boolean
}

interface Streak {
  start: string
  end: string
  length: number
  contributions: number
}

interface Repository {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string | null
}

export default function GitHubActivityPage({ username = "arach" }: { username?: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])
  const [streaks, setStreaks] = useState<Streak[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<string>("loading")
  const [selectedView, setSelectedView] = useState<"overview" | "calendar" | "streaks" | "repos">("overview")
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [userStats, setUserStats] = useState<{
    followers: number
    following: number
    public_repos: number
  } | null>(null)

  useEffect(() => {
    fetchGitHubData()
  }, [username])

  const fetchGitHubData = async () => {
    try {
      setError(null)
      setLoading(true)

      const [contributionsResponse, reposResponse] = await Promise.all([
        fetch(`/api/github/contributions?username=${username}`),
        fetch(`/api/github/repos?username=${username}`),
      ])

      if (contributionsResponse.ok) {
        const contributionsData = await contributionsResponse.json()
        setContributions(contributionsData.contributions || [])
        setDataSource(contributionsData.source)

        const calculatedStats = calculateStats(contributionsData.contributions || [])
        setStats(calculatedStats)

        const calculatedStreaks = calculateStreaks(contributionsData.contributions || [])
        setStreaks(calculatedStreaks)

        const monthlyStatsData = calculateMonthlyStats(contributionsData.contributions)
        setMonthlyStats(monthlyStatsData)
      }

      if (reposResponse.ok) {
        const reposData = await reposResponse.json()
        setRepos(reposData.repos || [])
        setUserStats(reposData.userStats || null)
      }

      setLoading(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching GitHub data"
      setError(errorMessage)
      setLoading(false)
    }
  }

  const calculateStats = (contributions: ContributionDay[]): GitHubStats => {
    const threeMonthContributions = contributions.reduce((sum, day) => sum + day.count, 0)
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    const reversedContributions = [...sortedContributions].reverse()
    for (const day of reversedContributions) {
      if (day.count > 0) {
        currentStreak++
      } else {
        break
      }
    }

    for (const day of sortedContributions) {
      if (day.count > 0) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }

    return {
      totalCommits: threeMonthContributions,
      totalForks,
      currentStreak,
      longestStreak,
      totalContributions: threeMonthContributions,
      threeMonthContributions,
    }
  }

  const calculateStreaks = (contributions: ContributionDay[]): Streak[] => {
    const streaks: Streak[] = []
    let currentStreak: ContributionDay[] = []

    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    for (const day of sortedContributions) {
      if (day.count > 0) {
        currentStreak.push(day)
      } else if (currentStreak.length > 0) {
        streaks.push({
          start: currentStreak[0].date,
          end: currentStreak[currentStreak.length - 1].date,
          length: currentStreak.length,
          contributions: currentStreak.reduce((sum, d) => sum + d.count, 0),
        })
        currentStreak = []
      }
    }

    if (currentStreak.length > 0) {
      streaks.push({
        start: currentStreak[0].date,
        end: currentStreak[currentStreak.length - 1].date,
        length: currentStreak.length,
        contributions: currentStreak.reduce((sum, d) => sum + d.count, 0),
      })
    }

    return streaks.sort((a, b) => b.length - a.length)
  }

  const calculateMonthlyStats = (contributions: ContributionDay[]): MonthlyStats[] => {
    const monthlyData = new Map<string, ContributionDay[]>()
    const today = new Date()
    
    // Calculate which months to include (3 full months + current)
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const monthsToInclude = new Set<string>()
    
    // Add current month
    monthsToInclude.add(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`)
    
    // Add 3 previous months
    for (let i = 1; i <= 3; i++) {
      const targetDate = new Date(currentYear, currentMonth - i, 1)
      monthsToInclude.add(`${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}`)
    }

    contributions.forEach((day) => {
      const date = new Date(day.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      // Only include if it's in our target months
      if (monthsToInclude.has(monthKey)) {
        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, [])
        }
        monthlyData.get(monthKey)!.push(day)
      }
    })

    return Array.from(monthlyData.entries())
      .map(([monthKey, days]) => {
        const [year, month] = monthKey.split("-")
        const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1)
        const monthName = date.toLocaleDateString("en-US", { month: "short" })

        const totalContributions = days.reduce((sum, day) => sum + day.count, 0)
        const activeDays = days.filter((day) => day.count > 0).length
        const averagePerDay = Math.round((totalContributions / days.length) * 10) / 10

        const isCurrentMonth = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()

        let longestStreak = 0
        let currentStreak = 0
        const sortedDays = days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        for (const day of sortedDays) {
          if (day.count > 0) {
            currentStreak++
            longestStreak = Math.max(longestStreak, currentStreak)
          } else {
            currentStreak = 0
          }
        }

        const weekdays = days
          .filter((day) => {
            const date = new Date(day.date)
            const dayOfWeek = date.getDay()
            return dayOfWeek >= 1 && dayOfWeek <= 5
          })
          .reduce((sum, day) => sum + day.count, 0)

        const weekends = days
          .filter((day) => {
            const date = new Date(day.date)
            const dayOfWeek = date.getDay()
            return dayOfWeek === 0 || dayOfWeek === 6
          })
          .reduce((sum, day) => sum + day.count, 0)

        return {
          month: monthName,
          year: Number.parseInt(year),
          contributions: totalContributions,
          activeDays,
          averagePerDay,
          longestStreak,
          weekdayContributions: weekdays,
          weekendContributions: weekends,
          isCurrentMonth,
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.year, a.month)
        const dateB = new Date(b.year, b.month)
        return dateA.getTime() - dateB.getTime()
      })
  }

  const getContributionColor = (level: number) => {
    const colors = [
      "#f3f4f6",
      "#fed7aa",
      "#fdba74",
      "#fb923c",
      "#ea580c"
    ]
    return colors[level] || colors[0]
  }

  const getDataSourceInfo = () => {
    switch (dataSource) {
      case "api":
        return { label: "Live", color: "text-green-500" }
      case "cache-stale":
        return { label: "Cached", color: "text-blue-500" }
      case "mock":
        return { label: "Demo", color: "text-yellow-500" }
      default:
        return { label: "Loading", color: "text-gray-500" }
    }
  }

  const sourceInfo = getDataSourceInfo()

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Github className="w-6 h-6" />
              GitHub Activity
            </h1>
            <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${sourceInfo.color}`}>
              {sourceInfo.label}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b pb-2">
          {(["overview", "calendar", "streaks", "repos"] as const).map((view) => (
            <Button
              key={view}
              variant={selectedView === view ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedView(view)}
              className="capitalize"
            >
              {view}
            </Button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading GitHub data...</p>
              </div>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">Failed to load GitHub data</p>
              <Button onClick={fetchGitHubData} variant="outline">
                Retry
              </Button>
            </motion.div>
          )}

          {!loading && !error && selectedView === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quick Stats Cards */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Contributions</p>
                          <p className="text-3xl font-bold text-blue-600">{stats.threeMonthContributions}</p>
                          <p className="text-xs text-gray-500">Last 3 months + current</p>
                        </div>
                        <Activity className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Current Streak</p>
                          <p className="text-3xl font-bold text-orange-600">
                            {stats.currentStreak}
                            {stats.currentStreak > 0 && " 🔥"}
                          </p>
                          <p className="text-xs text-gray-500">Consecutive days</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trailing 3 Months - Classic View */}
                  <TrailingMonthsCompact
                    contributions={contributions}
                    monthlyStats={monthlyStats}
                    getContributionColor={getContributionColor}
                  />

                  {/* Current Month Insights */}
                  <CurrentMonthInsights 
                    contributions={contributions}
                    monthlyStats={monthlyStats}
                    getContributionColor={getContributionColor}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}