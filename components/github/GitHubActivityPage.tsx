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

// Keep all the existing interfaces and types
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
  id: number
  startDate: string
  endDate: string
  length: number
  totalContributions: number
  averagePerDay: number
  dates: string[]
}

export default function GitHubActivityPage({ username = "arach" }: { username?: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])
  const [streaks, setStreaks] = useState<Streak[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<string>("loading")
  const [selectedView, setSelectedView] = useState<"overview" | "calendar" | "streaks">("overview")
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  
  // Add calendar-specific state
  const [selectedCalendarMonth, setSelectedCalendarMonth] = useState(new Date().getMonth())
  const [selectedCalendarYear, setSelectedCalendarYear] = useState(new Date().getFullYear())
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null)

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
    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    const streaks: Streak[] = []
    let currentStreak: ContributionDay[] = []
    let streakId = 0

    for (const day of sortedContributions) {
      if (day.count > 0) {
        currentStreak.push(day)
      } else {
        if (currentStreak.length >= 3) {
          const totalContributions = currentStreak.reduce((sum, d) => sum + d.count, 0)
          streaks.push({
            id: streakId++,
            startDate: currentStreak[0].date,
            endDate: currentStreak[currentStreak.length - 1].date,
            length: currentStreak.length,
            totalContributions,
            averagePerDay: Math.round((totalContributions / currentStreak.length) * 10) / 10,
            dates: currentStreak.map((d) => d.date),
          })
        }
        currentStreak = []
      }
    }

    // Handle streak that goes to the end
    if (currentStreak.length >= 3) {
      const totalContributions = currentStreak.reduce((sum, d) => sum + d.count, 0)
      streaks.push({
        id: streakId++,
        startDate: currentStreak[0].date,
        endDate: currentStreak[currentStreak.length - 1].date,
        length: currentStreak.length,
        totalContributions,
        averagePerDay: Math.round((totalContributions / currentStreak.length) * 10) / 10,
        dates: currentStreak.map((d) => d.date),
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

  // Helper functions for calendar view
  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay()) // Start from Sunday

    const days = []
    const currentDate = new Date(startDate)

    // Generate 6 weeks (42 days) to ensure full calendar grid
    for (let i = 0; i < 42; i++) {
      days.push({
        day: currentDate.getDate(),
        dateString: currentDate.toISOString().split("T")[0],
        isCurrentMonth: currentDate.getMonth() === month,
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const getMonthData = (year: number, month: number) => {
    const monthContributions = contributions.filter((c) => {
      const date = new Date(c.date)
      return date.getFullYear() === year && date.getMonth() === month
    })

    const totalContributions = monthContributions.reduce((sum, c) => sum + c.count, 0)
    const activeDays = monthContributions.filter((c) => c.count > 0).length
    const averagePerDay =
      monthContributions.length > 0 ? Math.round((totalContributions / monthContributions.length) * 10) / 10 : 0
    const bestDay = monthContributions.length > 0 ? Math.max(...monthContributions.map((c) => c.count)) : 0

    // Calculate longest streak in this month
    let longestStreak = 0
    let currentStreak = 0
    const sortedDays = monthContributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    for (const day of sortedDays) {
      if (day.count > 0) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }

    // Weekday vs weekend contributions
    const weekdayContributions = monthContributions
      .filter((c) => {
        const dayOfWeek = new Date(c.date).getDay()
        return dayOfWeek >= 1 && dayOfWeek <= 5 && c.count > 0
      })
      .reduce((sum, c) => sum + c.count, 0)

    const weekendContributions = monthContributions
      .filter((c) => {
        const dayOfWeek = new Date(c.date).getDay()
        return (dayOfWeek === 0 || dayOfWeek === 6) && c.count > 0
      })
      .reduce((sum, c) => sum + c.count, 0)

    const today = new Date()
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()
    const daysElapsed = isCurrentMonth ? today.getDate() : new Date(year, month + 1, 0).getDate()
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate()

    return {
      totalContributions,
      activeDays,
      averagePerDay,
      bestDay,
      longestStreak,
      weekdayContributions,
      weekendContributions,
      isCurrentMonth,
      daysElapsed,
      totalDaysInMonth,
    }
  }

  // Memoized values for calendar
  const calendarDays = useMemo(() => {
    return getCalendarDays(selectedCalendarYear, selectedCalendarMonth)
  }, [selectedCalendarYear, selectedCalendarMonth])

  const monthData = useMemo(() => {
    return getMonthData(selectedCalendarYear, selectedCalendarMonth)
  }, [selectedCalendarYear, selectedCalendarMonth, contributions])

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
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b pb-2">
          {(["overview", "calendar", "streaks"] as const).map((view) => (
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
              {/* Stats and Activity Grid */}
              {stats && (
                <div className="space-y-6">
                  {/* Top Stats Cards - 4 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6">
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
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Current Streak</p>
                            <p className="text-3xl font-bold text-orange-600 flex items-center gap-2">
                              {stats.currentStreak > 0 && <span className="text-2xl">🔥</span>}
                              {stats.currentStreak}
                            </p>
                            <p className="text-xs text-gray-500">Days in a row</p>
                          </div>
                          <Target className="w-8 h-8 text-orange-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Longest Streak</p>
                            <p className="text-3xl font-bold text-green-600">{stats.longestStreak}</p>
                            <p className="text-xs text-gray-500">Days (3 months)</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Active Days</p>
                            <p className="text-3xl font-bold text-purple-600">
                              {contributions.filter((d) => d.count > 0).length}
                            </p>
                            <p className="text-xs text-gray-500">Out of {contributions.length}</p>
                          </div>
                          <Calendar className="w-8 h-8 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Middle Row - Contribution Activity and Monthly Breakdown side by side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contribution Activity */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Activity className="w-4 h-4" />
                          Contribution Activity
                        </CardTitle>
                        <CardDescription className="text-xs">Last 3 months</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {/* Monthly calendar grids */}
                          {(() => {
                            const monthlyContributions = new Map<string, ContributionDay[]>()
                            const monthOrder: string[] = []
                            
                            const today = new Date()
                            const currentMonth = today.getMonth()
                            const currentYear = today.getFullYear()
                            const monthsToInclude = new Set<string>()
                            
                            for (let i = 1; i <= 3; i++) {
                              const targetDate = new Date(currentYear, currentMonth - i, 1)
                              monthsToInclude.add(`${targetDate.getFullYear()}-${targetDate.getMonth()}`)
                            }
                            
                            contributions.forEach(day => {
                              const date = new Date(day.date)
                              const monthKey = `${date.getFullYear()}-${date.getMonth()}`
                              
                              if (monthsToInclude.has(monthKey)) {
                                if (!monthlyContributions.has(monthKey)) {
                                  monthlyContributions.set(monthKey, [])
                                  monthOrder.push(monthKey)
                                }
                                monthlyContributions.get(monthKey)!.push(day)
                              }
                            })

                            monthOrder.sort((a, b) => {
                              const [yearA, monthA] = a.split('-').map(Number)
                              const [yearB, monthB] = b.split('-').map(Number)
                              const dateA = new Date(yearA, monthA)
                              const dateB = new Date(yearB, monthB)
                              return dateA.getTime() - dateB.getTime()
                            })

                            const monthGrids = monthOrder.map(monthKey => {
                              const [year, month] = monthKey.split('-').map(Number)
                              const monthData = monthlyContributions.get(monthKey) || []
                              const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'short' })
                              
                              const firstDay = new Date(year, month, 1)
                              const lastDay = new Date(year, month + 1, 0)
                              const startPadding = firstDay.getDay()
                              const totalDays = lastDay.getDate()
                              
                              const calendarDays: (ContributionDay | null)[] = []
                              
                              for (let i = 0; i < startPadding; i++) {
                                calendarDays.push(null)
                              }
                              
                              for (let day = 1; day <= totalDays; day++) {
                                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                                const contribution = monthData.find(c => c.date === dateStr)
                                calendarDays.push(contribution || { date: dateStr, count: 0, level: 0 })
                              }
                              
                              return { monthName, year, calendarDays, monthKey }
                            })

                            return (
                              <div className="grid grid-cols-3 gap-2">
                                {monthGrids.map(({ monthName, year, calendarDays, monthKey }) => (
                                  <div key={monthKey} className="bg-gray-50 rounded-lg p-2">
                                    <h4 className="text-xs font-semibold text-gray-700 mb-1">
                                      {monthName} {year}
                                    </h4>
                                    <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-500 mb-1">
                                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                        <div key={i} className="w-3 h-3 flex items-center justify-center text-[9px]">
                                          {day}
                                        </div>
                                      ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-0.5">
                                      {calendarDays.map((day, index) => (
                                        <div key={index}>
                                          {day ? (
                                            <Tooltip delayDuration={0}>
                                              <TooltipTrigger asChild>
                                                <div
                                                  className="w-3 h-3 rounded-sm cursor-pointer hover:scale-125 transition-transform"
                                                  style={{ backgroundColor: getContributionColor(day.level) }}
                                                />
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <div>
                                                  <p className="font-medium text-xs">
                                                    {day.count === 0
                                                      ? "No contributions"
                                                      : `${day.count} contribution${day.count === 1 ? "" : "s"}`}
                                                  </p>
                                                  <p className="opacity-75 text-xs">
                                                    {new Date(day.date).toLocaleDateString("en-US", {
                                                      weekday: "short",
                                                      month: "short",
                                                      day: "numeric",
                                                    })}
                                                  </p>
                                                </div>
                                              </TooltipContent>
                                            </Tooltip>
                                          ) : (
                                            <div className="w-3 h-3" />
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          })()}

                          {/* Legend */}
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <span>Less</span>
                            <div className="flex gap-0.5">
                              {[0, 1, 2, 3, 4].map((level) => (
                                <div
                                  key={level}
                                  className="w-3 h-3 rounded-sm"
                                  style={{ backgroundColor: getContributionColor(level) }}
                                />
                              ))}
                            </div>
                            <span>More</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Monthly Breakdown */}
                    {monthlyStats.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <BarChart3 className="w-4 h-4" />
                            Monthly Breakdown
                          </CardTitle>
                          <CardDescription className="text-xs">Contribution summary by month</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-3 gap-2">
                            {monthlyStats.filter(m => !m.isCurrentMonth).map((month) => (
                              <div key={`${month.year}-${month.month}`} className="p-2 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-xs mb-2">
                                  {month.month} {month.year}
                                </h3>
                                <div className="space-y-1 text-[10px]">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Contributions:</span>
                                    <span className="font-medium">{month.contributions}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Active days:</span>
                                    <span className="font-medium">{month.activeDays}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Avg/day:</span>
                                    <span className="font-medium">{month.averagePerDay}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Current Month Insights - Full width at bottom */}
                  <CurrentMonthInsights 
                    contributions={contributions}
                    monthlyStats={monthlyStats}
                    getContributionColor={getContributionColor}
                  />
                </div>
              )}
            </motion.div>
          )}

          {!loading && !error && selectedView === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Calendar Controls and Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar Navigation */}
                <Card className="lg:col-span-3">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Contribution Calendar
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const today = new Date()
                            setSelectedCalendarMonth(today.getMonth())
                            setSelectedCalendarYear(today.getFullYear())
                          }}
                        >
                          Today
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Interactive monthly view of your GitHub contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Month/Year Selector */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (selectedCalendarMonth === 0) {
                              setSelectedCalendarMonth(11)
                              setSelectedCalendarYear(selectedCalendarYear - 1)
                            } else {
                              setSelectedCalendarMonth(selectedCalendarMonth - 1)
                            }
                          }}
                        >
                          ←
                        </Button>
                        <h3 className="text-xl font-semibold min-w-[200px] text-center">
                          {new Date(selectedCalendarYear, selectedCalendarMonth).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (selectedCalendarMonth === 11) {
                              setSelectedCalendarMonth(0)
                              setSelectedCalendarYear(selectedCalendarYear + 1)
                            } else {
                              setSelectedCalendarMonth(selectedCalendarMonth + 1)
                            }
                          }}
                        >
                          →
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Less</span>
                        <div className="flex gap-1">
                          {[0, 1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className="w-5 h-5 rounded-sm"
                              style={{ backgroundColor: getContributionColor(level) }}
                            />
                          ))}
                        </div>
                        <span>More</span>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="space-y-2">
                      {/* Day headers */}
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar days */}
                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, index) => {
                          const dayData = contributions.find((c) => c.date === day.dateString)
                          const isToday = day.dateString === new Date().toISOString().split("T")[0]
                          const isCurrentMonth = day.isCurrentMonth
                          const isInStreak = streaks.some((streak) => streak.dates.includes(day.dateString))

                          return (
                            <Tooltip delayDuration={0} key={index}>
                              <TooltipTrigger asChild>
                                <div
                                  className={`
                                    relative aspect-square rounded-lg cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md
                                    ${isCurrentMonth ? "" : "opacity-30"}
                                    ${isToday ? "ring-2 ring-blue-500 ring-offset-1" : ""}
                                  `}
                                  style={{
                                    backgroundColor: dayData
                                      ? getContributionColor(dayData.level)
                                      : isCurrentMonth
                                        ? "#f3f4f6"
                                        : "#f9fafb",
                                  }}
                                  onClick={() => dayData && setSelectedDay(dayData)}
                                >
                                  {/* Day number */}
                                  <div
                                    className={`
                                      absolute inset-0 flex items-center justify-center text-xs font-medium
                                      ${
                                        dayData && dayData.level > 2
                                          ? "text-white"
                                          : isCurrentMonth
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                      }
                                    `}
                                  >
                                    {day.day}
                                  </div>

                                  {/* Streak indicator */}
                                  {isInStreak && <div className="absolute -top-1 -right-1 text-xs">🔥</div>}

                                  {/* Today indicator */}
                                  {isToday && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">
                                  <p className="font-medium">
                                    {new Date(day.dateString).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                  <p>
                                    {dayData?.count === 0 || !dayData
                                      ? "No contributions"
                                      : `${dayData.count} contribution${dayData.count === 1 ? "" : "s"}`}
                                  </p>
                                  {isInStreak && <p className="text-orange-400">Part of streak</p>}
                                  {isToday && <p className="text-blue-400">Today</p>}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Stats Sidebar */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Monthly Stats</CardTitle>
                    <CardDescription>
                      {new Date(selectedCalendarYear, selectedCalendarMonth).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{monthData.totalContributions}</div>
                        <div className="text-sm text-blue-700">Total Contributions</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Active days</span>
                          <span className="font-medium">{monthData.activeDays}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Average per day</span>
                          <span className="font-medium">{monthData.averagePerDay}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Best day</span>
                          <span className="font-medium">{monthData.bestDay}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Longest streak</span>
                          <span className="font-medium">{monthData.longestStreak} days</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <div className="text-sm text-gray-600 mb-2">Activity distribution</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Weekdays</span>
                            <span>{monthData.weekdayContributions}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Weekends</span>
                            <span>{monthData.weekendContributions}</span>
                          </div>
                        </div>
                      </div>

                      {monthData.isCurrentMonth && (
                        <div className="pt-3 border-t">
                          <div className="text-xs text-gray-500 text-center">
                            {monthData.daysElapsed} of {monthData.totalDaysInMonth} days elapsed
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(monthData.daysElapsed / monthData.totalDaysInMonth) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Selected Day Details */}
              <AnimatePresence>
                {selectedDay && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Day Details
                          </CardTitle>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedDay(null)}>
                            ×
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium text-lg">
                                {new Date(selectedDay.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {selectedDay.count === 0
                                  ? "No contributions"
                                  : `${selectedDay.count} contribution${selectedDay.count === 1 ? "" : "s"}`}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-sm"
                                  style={{ backgroundColor: getContributionColor(selectedDay.level) }}
                                />
                                <span className="text-sm">
                                  Activity level: {["None", "Low", "Medium", "High", "Very High"][selectedDay.level]}
                                </span>
                              </div>

                              {streaks.some((streak) => streak.dates.includes(selectedDay.date)) && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">🔥</span>
                                  <span className="text-sm text-orange-600">Part of a contribution streak</span>
                                </div>
                              )}

                              <div className="text-xs text-gray-500">
                                Day {new Date(selectedDay.date).getDate()} of{" "}
                                {new Date(selectedDay.date).toLocaleDateString("en-US", { month: "long" })}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Context</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                  Day of week:{" "}
                                  {new Date(selectedDay.date).toLocaleDateString("en-US", { weekday: "long" })}
                                </p>
                                <p>Week of year: {Math.ceil(new Date(selectedDay.date).getDate() / 7)}</p>
                                {(() => {
                                  const dayIndex = contributions.findIndex((c) => c.date === selectedDay.date)
                                  const prevDay = dayIndex > 0 ? contributions[dayIndex - 1] : null
                                  const nextDay =
                                    dayIndex < contributions.length - 1 ? contributions[dayIndex + 1] : null
                                  return (
                                    <>
                                      {prevDay && <p>Previous day: {prevDay.count} contributions</p>}
                                      {nextDay && <p>Next day: {nextDay.count} contributions</p>}
                                    </>
                                  )
                                })()}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Quick Actions</h4>
                              <div className="space-y-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() => {
                                    const date = new Date(selectedDay.date)
                                    setSelectedCalendarMonth(date.getMonth())
                                    setSelectedCalendarYear(date.getFullYear())
                                  }}
                                >
                                  <Calendar className="w-4 h-4 mr-2" />
                                  View Month
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() => {
                                    window.open(
                                      `https://github.com/${username}?tab=overview&from=${selectedDay.date}&to=${selectedDay.date}`,
                                      "_blank",
                                    )
                                  }}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View on GitHub
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && !error && selectedView === "streaks" && (
            <motion.div
              key="streaks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Streak Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Current Streak</p>
                        <p className="text-3xl font-bold text-orange-600 flex items-center gap-2">
                          {stats && stats.currentStreak > 0 && <span className="text-2xl">🔥</span>}
                          {stats?.currentStreak || 0}
                        </p>
                        <p className="text-xs text-gray-500">Days in a row</p>
                      </div>
                      <Target className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Longest Streak</p>
                        <p className="text-3xl font-bold text-green-600">{stats?.longestStreak || 0}</p>
                        <p className="text-xs text-gray-500">Days (3 months)</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Streaks</p>
                        <p className="text-3xl font-bold text-blue-600">{streaks.length}</p>
                        <p className="text-xs text-gray-500">3+ day streaks</p>
                      </div>
                      <Activity className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Streak Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Streak Timeline
                  </CardTitle>
                  <CardDescription>
                    Visual representation of your contribution streaks over the last 3 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Timeline visualization */}
                    <div className="relative">
                      <div className="flex gap-0.5 overflow-x-auto pb-2">
                        {contributions.map((day, index) => {
                          const isInStreak = streaks.some((streak) => streak.dates.includes(day.date))
                          const isStreakStart = streaks.some((streak) => streak.startDate === day.date)
                          const isStreakEnd = streaks.some((streak) => streak.endDate === day.date)

                          return (
                            <Tooltip delayDuration={0} key={day.date}>
                              <TooltipTrigger asChild>
                                <div className="relative">
                                  <div
                                    className={`w-3 h-8 cursor-pointer transition-all duration-200 hover:scale-110 ${
                                      day.count > 0
                                        ? isInStreak
                                          ? "bg-orange-500 hover:bg-orange-600"
                                          : "bg-gray-300 hover:bg-gray-400"
                                        : "bg-gray-100"
                                    } ${isStreakStart ? "rounded-l-md" : isStreakEnd ? "rounded-r-md" : ""}`}
                                  />
                                  {isStreakStart && <div className="absolute -top-2 left-0 text-xs">🔥</div>}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">
                                  <p className="font-medium">
                                    {new Date(day.date).toLocaleDateString("en-US", {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                  <p>
                                    {day.count === 0
                                      ? "No contributions"
                                      : `${day.count} contribution${day.count === 1 ? "" : "s"}`}
                                  </p>
                                  {isInStreak && <p className="text-orange-400">Part of streak</p>}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          )
                        })}
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                          <span>Streak days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                          <span>Active days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                          <span>Inactive days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Streak List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Streak Details
                  </CardTitle>
                  <CardDescription>All streaks of 3+ consecutive days in the last 3 months</CardDescription>
                </CardHeader>
                <CardContent>
                  {streaks.length > 0 ? (
                    <div className="space-y-4">
                      {streaks.map((streak, index) => (
                        <motion.div
                          key={streak.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <span className="text-lg">🔥</span>
                                <span className="font-bold text-lg text-orange-600">{streak.length} days</span>
                              </div>
                              <div className="text-sm text-gray-500">#{index + 1} longest streak</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {streak.totalContributions} contributions
                              </div>
                              <div className="text-xs text-gray-500">{streak.averagePerDay} avg/day</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-gray-600">Started:</span>
                              <span className="ml-2 font-medium">
                                {new Date(streak.startDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Ended:</span>
                              <span className="ml-2 font-medium">
                                {new Date(streak.endDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Mini streak visualization */}
                          <div className="mt-3 flex gap-0.5 overflow-x-auto">
                            {streak.dates.map((date) => {
                              const dayData = contributions.find((d) => d.date === date)
                              return (
                                <Tooltip delayDuration={0} key={date}>
                                  <TooltipTrigger asChild>
                                    <div
                                      className="w-2 h-6 bg-orange-400 hover:bg-orange-500 cursor-pointer transition-colors rounded-sm"
                                      style={{
                                        opacity: dayData ? Math.max(0.3, dayData.count / 10) : 0.3,
                                      }}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs">
                                      <p className="font-medium">
                                        {new Date(date).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </p>
                                      <p>{dayData?.count || 0} contributions</p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              )
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Streaks Found</h3>
                      <p className="text-gray-500">
                        No streaks of 3+ consecutive days found in the last 3 months.
                        <br />
                        Keep contributing to build your first streak! 🔥
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Streak Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Streak Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Average streak length</span>
                        <span className="font-medium">
                          {streaks.length > 0
                            ? Math.round((streaks.reduce((sum, s) => sum + s.length, 0) / streaks.length) * 10) / 10
                            : 0}{" "}
                          days
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total streak days</span>
                        <span className="font-medium">{streaks.reduce((sum, s) => sum + s.length, 0)} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Streak contribution rate</span>
                        <span className="font-medium">
                          {contributions.length > 0
                            ? Math.round((streaks.reduce((sum, s) => sum + s.length, 0) / contributions.length) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Best streak contributions</span>
                        <span className="font-medium">
                          {streaks.length > 0 ? Math.max(...streaks.map((s) => s.totalContributions)) : 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Streak Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {streaks.length > 0 ? (
                        <>
                          <div className="p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-orange-600">🏆</span>
                              <span className="font-medium text-orange-800">Best Streak</span>
                            </div>
                            <p className="text-sm text-orange-700">
                              Your longest streak was <strong>{streaks[0].length} days</strong> with{" "}
                              <strong>{streaks[0].totalContributions} contributions</strong>
                            </p>
                          </div>

                          {stats && stats.currentStreak > 0 && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-blue-600">🔥</span>
                                <span className="font-medium text-blue-800">Current Streak</span>
                              </div>
                              <p className="text-sm text-blue-700">
                                You're on a <strong>{stats.currentStreak} day streak</strong>! Keep it going!
                              </p>
                            </div>
                          )}

                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-green-600">📈</span>
                              <span className="font-medium text-green-800">Consistency</span>
                            </div>
                            <p className="text-sm text-green-700">
                              You've maintained <strong>{streaks.length} streaks</strong> in the last 3 months
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-600">💡</span>
                            <span className="font-medium text-gray-800">Getting Started</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            Start contributing daily to build your first streak! Even small contributions count.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}