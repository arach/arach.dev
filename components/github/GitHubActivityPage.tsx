"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import CurrentMonthInsights from "./CurrentMonthInsights"
import type { ContributionDay, MonthlyStats } from "@/types/github"
import { useGitHub } from "@/lib/github-context"

interface Streak {
  id: number
  startDate: string
  endDate: string
  length: number
  totalContributions: number
  averagePerDay: number
  dates: string[]
}

const cardSurface: React.CSSProperties = {
  background: "var(--theme-card-bg)",
  borderColor: "var(--theme-border-color)",
  boxShadow: "0 12px 40px -28px var(--theme-shadow-color)",
}

const heatmapCellColor = (level: number) => {
  if (level <= 0) return "var(--theme-border-color)"
  const pct = [0, 25, 50, 75, 100][Math.min(level, 4)]
  return `color-mix(in srgb, var(--theme-accent-color) ${pct}%, transparent)`
}

function PromptHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em]"
      style={{ color: "var(--theme-muted-color)" }}
    >
      <span style={{ color: "var(--theme-accent-color)" }}>&gt;</span>
      <span>{children}</span>
    </p>
  )
}

function Stat({
  label,
  value,
  sublabel,
  emphasis = false,
}: {
  label: string
  value: number | string
  sublabel?: string
  emphasis?: boolean
}) {
  return (
    <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
      <p
        className="text-[10px] font-mono uppercase tracking-[0.22em]"
        style={{ color: "var(--theme-muted-color)" }}
      >
        {label}
      </p>
      <p
        className="mt-3 font-mono text-4xl font-light tabular-nums sm:text-5xl"
        style={{
          color: emphasis ? "var(--theme-accent-color)" : "var(--theme-text-color)",
        }}
      >
        {value}
      </p>
      {sublabel ? (
        <p
          className="mt-2 text-[11px] font-mono uppercase tracking-[0.18em]"
          style={{ color: "var(--theme-muted-color)" }}
        >
          {sublabel}
        </p>
      ) : null}
    </div>
  )
}

function TabLink({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative pb-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-80"
      style={{ color: active ? "var(--theme-accent-color)" : "var(--theme-muted-color)" }}
    >
      {children}
      <span
        className="absolute -bottom-px left-0 h-px w-full transition-opacity"
        style={{
          background: "var(--theme-accent-color)",
          opacity: active ? 1 : 0,
        }}
      />
    </button>
  )
}

export default function GitHubActivityPage({ username = "arach" }: { username?: string }) {
  const { contributions, stats, loading, error, dataSource, refetch } = useGitHub()
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])
  const [streaks, setStreaks] = useState<Streak[]>([])
  const [selectedView, setSelectedView] = useState<"overview" | "calendar" | "streaks">("overview")

  const [selectedCalendarMonth, setSelectedCalendarMonth] = useState(new Date().getMonth())
  const [selectedCalendarYear, setSelectedCalendarYear] = useState(new Date().getFullYear())
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null)

  useEffect(() => {
    if (contributions.length > 0) {
      setStreaks(calculateStreaks(contributions))
      setMonthlyStats(calculateMonthlyStats(contributions))
    }
  }, [contributions])

  const calculateStreaks = (contributions: ContributionDay[]): Streak[] => {
    const sorted = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
    const out: Streak[] = []
    let current: ContributionDay[] = []
    let streakId = 0

    const close = () => {
      if (current.length >= 3) {
        const total = current.reduce((s, d) => s + d.count, 0)
        out.push({
          id: streakId++,
          startDate: current[0].date,
          endDate: current[current.length - 1].date,
          length: current.length,
          totalContributions: total,
          averagePerDay: Math.round((total / current.length) * 10) / 10,
          dates: current.map((d) => d.date),
        })
      }
      current = []
    }

    for (const day of sorted) {
      if (day.count > 0) current.push(day)
      else close()
    }
    close()

    return out.sort((a, b) => b.length - a.length)
  }

  const calculateMonthlyStats = (contributions: ContributionDay[]): MonthlyStats[] => {
    const monthlyData = new Map<string, ContributionDay[]>()
    const today = new Date()
    const monthsToInclude = new Set<string>()

    monthsToInclude.add(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`)
    for (let i = 1; i <= 3; i++) {
      const t = new Date(today.getFullYear(), today.getMonth() - i, 1)
      monthsToInclude.add(`${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}`)
    }

    contributions.forEach((day) => {
      const date = new Date(day.date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      if (monthsToInclude.has(key)) {
        if (!monthlyData.has(key)) monthlyData.set(key, [])
        monthlyData.get(key)!.push(day)
      }
    })

    return Array.from(monthlyData.entries())
      .map(([key, days]) => {
        const [year, month] = key.split("-")
        const date = new Date(Number(year), Number(month) - 1, 1)
        const monthName = date.toLocaleDateString("en-US", { month: "short" })
        const total = days.reduce((s, d) => s + d.count, 0)
        const active = days.filter((d) => d.count > 0).length
        const avg = Math.round((total / days.length) * 10) / 10

        let longest = 0, run = 0
        for (const d of [...days].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())) {
          if (d.count > 0) { run++; longest = Math.max(longest, run) } else run = 0
        }

        const weekdays = days.filter((d) => {
          const dow = new Date(d.date).getDay()
          return dow >= 1 && dow <= 5
        }).reduce((s, d) => s + d.count, 0)

        const weekends = days.filter((d) => {
          const dow = new Date(d.date).getDay()
          return dow === 0 || dow === 6
        }).reduce((s, d) => s + d.count, 0)

        return {
          month: monthName,
          year: Number(year),
          contributions: total,
          activeDays: active,
          averagePerDay: avg,
          longestStreak: longest,
          weekdayContributions: weekdays,
          weekendContributions: weekends,
          isCurrentMonth: date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth(),
        }
      })
      .sort((a, b) => {
        const order = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        return new Date(a.year, order.indexOf(a.month)).getTime()
          - new Date(b.year, order.indexOf(b.month)).getTime()
      })
  }

  const getDataSourceInfo = () => {
    switch (dataSource) {
      case "api":         return { label: "live" }
      case "cache-stale": return { label: "cached" }
      case "mock":        return { label: "demo" }
      default:            return { label: "loading" }
    }
  }
  const sourceInfo = getDataSourceInfo()

  const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const cur = new Date(startDate)
    for (let i = 0; i < 42; i++) {
      days.push({
        day: cur.getDate(),
        dateString: cur.toISOString().split("T")[0],
        isCurrentMonth: cur.getMonth() === month,
      })
      cur.setDate(cur.getDate() + 1)
    }
    return days
  }

  const getMonthData = useCallback((year: number, month: number) => {
    const monthContributions = contributions.filter((c) => {
      const d = new Date(c.date)
      return d.getFullYear() === year && d.getMonth() === month
    })

    const total = monthContributions.reduce((s, c) => s + c.count, 0)
    const active = monthContributions.filter((c) => c.count > 0).length
    const avg = monthContributions.length > 0 ? Math.round((total / monthContributions.length) * 10) / 10 : 0
    const best = monthContributions.length > 0 ? Math.max(...monthContributions.map((c) => c.count)) : 0

    let longest = 0, run = 0
    for (const d of [...monthContributions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())) {
      if (d.count > 0) { run++; longest = Math.max(longest, run) } else run = 0
    }

    const weekdays = monthContributions.filter((c) => {
      const dow = new Date(c.date).getDay()
      return dow >= 1 && dow <= 5 && c.count > 0
    }).reduce((s, c) => s + c.count, 0)

    const weekends = monthContributions.filter((c) => {
      const dow = new Date(c.date).getDay()
      return (dow === 0 || dow === 6) && c.count > 0
    }).reduce((s, c) => s + c.count, 0)

    const today = new Date()
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate()
    const daysElapsed = isCurrentMonth ? today.getDate() : totalDaysInMonth

    return {
      totalContributions: total,
      activeDays: active,
      averagePerDay: avg,
      bestDay: best,
      longestStreak: longest,
      weekdayContributions: weekdays,
      weekendContributions: weekends,
      isCurrentMonth,
      daysElapsed,
      totalDaysInMonth,
    }
  }, [contributions])

  const calendarDays = useMemo(
    () => getCalendarDays(selectedCalendarYear, selectedCalendarMonth),
    [selectedCalendarYear, selectedCalendarMonth],
  )
  const monthData = useMemo(
    () => getMonthData(selectedCalendarYear, selectedCalendarMonth),
    [selectedCalendarYear, selectedCalendarMonth, getMonthData],
  )

  const HeatCell = ({ level, size = 12 }: { level: number; size?: number }) => (
    <div
      className="rounded-sm transition-transform duration-150 hover:scale-125"
      style={{
        width: size,
        height: size,
        backgroundColor: heatmapCellColor(level),
      }}
    />
  )

  const Legend = () => (
    <div
      className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em]"
      style={{ color: "var(--theme-muted-color)" }}
    >
      <span>less</span>
      <div className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: heatmapCellColor(level) }}
          />
        ))}
      </div>
      <span>more</span>
    </div>
  )

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-5xl">
        {/* Top nav back-link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: "var(--theme-muted-color)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            arach.dev
          </Link>
        </div>

        {/* Editorial header */}
        <header className="mb-10">
          <p className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em]">
            <span style={{ color: "var(--theme-accent-color)" }}>&gt;</span>
            <span style={{ color: "var(--theme-muted-color)" }}>git log --since=3.months</span>
          </p>
          <h1 className="mt-3 text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[3.25rem]">
            Activity
            <span style={{ color: "var(--theme-accent-color)" }}>.</span>
          </h1>
          <div
            className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--theme-muted-color)" }}
          >
            <span>@{username}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background:
                    sourceInfo.label === "live"
                      ? "var(--theme-accent-color)"
                      : "var(--theme-muted-color)",
                }}
              />
              {sourceInfo.label}
            </span>
          </div>
        </header>

        {/* Tabs */}
        <div
          className="mb-10 flex gap-6 border-b pb-1"
          style={{ borderColor: "var(--theme-border-color)" }}
        >
          {(["overview", "calendar", "streaks"] as const).map((view) => (
            <TabLink
              key={view}
              active={selectedView === view}
              onClick={() => setSelectedView(view)}
            >
              {view}
            </TabLink>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-16"
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--theme-muted-color)" }}
              >
                loading…
              </p>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border px-6 py-8 text-center"
              style={cardSurface}
            >
              <AlertCircle className="mx-auto mb-3 h-6 w-6" style={{ color: "var(--theme-accent-color)" }} />
              <p className="text-sm" style={{ color: "var(--theme-muted-color)" }}>
                Failed to load GitHub data.
              </p>
              <button
                onClick={refetch}
                className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-70"
                style={{ color: "var(--theme-accent-color)" }}
              >
                &gt; retry
              </button>
            </motion.div>
          )}

          {!loading && !error && selectedView === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-10"
            >
              {stats && (
                <>
                  <section>
                    <PromptHeading>at-a-glance</PromptHeading>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                      <Stat
                        label="contributions"
                        value={stats.threeMonthContributions}
                        sublabel="last 3 months"
                        emphasis
                      />
                      <Stat
                        label="current streak"
                        value={stats.currentStreak}
                        sublabel="days in a row"
                      />
                      <Stat
                        label="longest streak"
                        value={stats.longestStreak}
                        sublabel="days · 3 mo"
                      />
                      <Stat
                        label="active days"
                        value={contributions.filter((d) => d.count > 0).length}
                        sublabel={`of ${contributions.length}`}
                      />
                    </div>
                  </section>

                  <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Heatmap */}
                    <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                      <PromptHeading>cat activity.log</PromptHeading>
                      {(() => {
                        const today = new Date()
                        const monthsToInclude = new Set<string>()
                        for (let i = 1; i <= 3; i++) {
                          const t = new Date(today.getFullYear(), today.getMonth() - i, 1)
                          monthsToInclude.add(`${t.getFullYear()}-${t.getMonth()}`)
                        }
                        const monthBuckets = new Map<string, ContributionDay[]>()
                        contributions.forEach((day) => {
                          const date = new Date(day.date)
                          const key = `${date.getFullYear()}-${date.getMonth()}`
                          if (monthsToInclude.has(key)) {
                            if (!monthBuckets.has(key)) monthBuckets.set(key, [])
                            monthBuckets.get(key)!.push(day)
                          }
                        })
                        const monthGrids = Array.from(monthBuckets.keys())
                          .sort((a, b) => {
                            const [ya, ma] = a.split("-").map(Number)
                            const [yb, mb] = b.split("-").map(Number)
                            return new Date(ya, ma).getTime() - new Date(yb, mb).getTime()
                          })
                          .map((key) => {
                            const [year, month] = key.split("-").map(Number)
                            const days = monthBuckets.get(key)!
                            const monthName = new Date(year, month).toLocaleDateString("en-US", { month: "short" })
                            const firstDay = new Date(year, month, 1)
                            const lastDay = new Date(year, month + 1, 0)
                            const padding = firstDay.getDay()
                            const total = lastDay.getDate()
                            const cells: (ContributionDay | null)[] = []
                            for (let i = 0; i < padding; i++) cells.push(null)
                            for (let day = 1; day <= total; day++) {
                              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                              const c = days.find((d) => d.date === dateStr)
                              cells.push(c || { date: dateStr, count: 0, level: 0 })
                            }
                            return { monthName, year, cells, key }
                          })

                        return (
                          <>
                            <div className="grid grid-cols-3 gap-3">
                              {monthGrids.map(({ monthName, year, cells, key }) => (
                                <div key={key}>
                                  <h4
                                    className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                                    style={{ color: "var(--theme-muted-color)" }}
                                  >
                                    {monthName} {year}
                                  </h4>
                                  <div
                                    className="mb-1 grid grid-cols-7 gap-0.5 font-mono text-[8px]"
                                    style={{ color: "var(--theme-muted-color)", opacity: 0.5 }}
                                  >
                                    {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
                                      <div key={i} className="flex h-3 w-3 items-center justify-center">
                                        {d}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="grid grid-cols-7 gap-0.5">
                                    {cells.map((day, i) =>
                                      day ? (
                                        <Tooltip key={i} delayDuration={0}>
                                          <TooltipTrigger asChild>
                                            <div className="h-3 w-3 cursor-pointer">
                                              <HeatCell level={day.level} />
                                            </div>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <div className="text-xs">
                                              <p className="font-medium">
                                                {day.count === 0
                                                  ? "No contributions"
                                                  : `${day.count} contribution${day.count === 1 ? "" : "s"}`}
                                              </p>
                                              <p className="opacity-75">
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
                                        <div key={i} className="h-3 w-3" />
                                      ),
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-5">
                              <Legend />
                            </div>
                          </>
                        )
                      })()}
                    </div>

                    {/* Monthly breakdown */}
                    <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                      <PromptHeading>by month</PromptHeading>
                      <ul className="space-y-3 font-mono text-xs sm:text-sm">
                        {monthlyStats.filter((m) => !m.isCurrentMonth).map((m) => (
                          <li
                            key={`${m.year}-${m.month}`}
                            className="flex items-baseline justify-between border-b pb-2 last:border-b-0 last:pb-0"
                            style={{ borderColor: "var(--theme-border-color)" }}
                          >
                            <span
                              className="uppercase tracking-[0.18em]"
                              style={{ color: "var(--theme-muted-color)" }}
                            >
                              {m.month} {String(m.year).slice(-2)}
                            </span>
                            <span className="flex items-baseline gap-3">
                              <span style={{ color: "var(--theme-text-color)" }}>
                                {m.contributions}
                              </span>
                              <span
                                className="text-[10px] tabular-nums uppercase tracking-[0.18em]"
                                style={{ color: "var(--theme-muted-color)", opacity: 0.7 }}
                              >
                                {m.activeDays}d · {m.averagePerDay}/d
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <CurrentMonthInsights
                    contributions={contributions}
                    monthlyStats={monthlyStats}
                  />
                </>
              )}
            </motion.div>
          )}

          {!loading && !error && selectedView === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div
                  className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6 lg:col-span-2"
                  style={cardSurface}
                >
                  <PromptHeading>cal {new Date(selectedCalendarYear, selectedCalendarMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" }).toLowerCase()}</PromptHeading>

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (selectedCalendarMonth === 0) {
                            setSelectedCalendarMonth(11)
                            setSelectedCalendarYear(selectedCalendarYear - 1)
                          } else setSelectedCalendarMonth(selectedCalendarMonth - 1)
                        }}
                        className="font-mono text-base transition-opacity hover:opacity-60"
                        style={{ color: "var(--theme-muted-color)" }}
                        aria-label="Previous month"
                      >
                        ←
                      </button>
                      <h3 className="min-w-[180px] text-center text-lg font-medium tracking-tight">
                        {new Date(selectedCalendarYear, selectedCalendarMonth).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                      <button
                        onClick={() => {
                          if (selectedCalendarMonth === 11) {
                            setSelectedCalendarMonth(0)
                            setSelectedCalendarYear(selectedCalendarYear + 1)
                          } else setSelectedCalendarMonth(selectedCalendarMonth + 1)
                        }}
                        className="font-mono text-base transition-opacity hover:opacity-60"
                        style={{ color: "var(--theme-muted-color)" }}
                        aria-label="Next month"
                      >
                        →
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        const t = new Date()
                        setSelectedCalendarMonth(t.getMonth())
                        setSelectedCalendarYear(t.getFullYear())
                      }}
                      className="font-mono text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-70"
                      style={{ color: "var(--theme-muted-color)" }}
                    >
                      today
                    </button>
                  </div>

                  <div className="mb-2 grid grid-cols-7 gap-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--theme-muted-color)" }}>
                    {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((d) => (
                      <div key={d} className="py-1 text-center">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, i) => {
                      const dayData = contributions.find((c) => c.date === day.dateString)
                      const isToday = day.dateString === new Date().toISOString().split("T")[0]
                      const isInStreak = streaks.some((s) => s.dates.includes(day.dateString))
                      const level = dayData?.level ?? 0
                      return (
                        <Tooltip key={i} delayDuration={0}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => dayData && setSelectedDay(dayData)}
                              className="relative aspect-square rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                              style={{
                                background: heatmapCellColor(level),
                                opacity: day.isCurrentMonth ? 1 : 0.25,
                                outline: isToday ? `1px solid var(--theme-accent-color)` : "none",
                                outlineOffset: 2,
                              }}
                            >
                              <span
                                className="absolute inset-0 flex items-center justify-center font-mono text-xs tabular-nums"
                                style={{
                                  color: level > 2 ? "var(--theme-bg-color)" : "var(--theme-text-color)",
                                }}
                              >
                                {day.day}
                              </span>
                              {isInStreak && (
                                <span
                                  className="absolute right-1 top-1 h-1 w-1 rounded-full"
                                  style={{ background: "var(--theme-accent-color)" }}
                                />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              <p className="font-medium">
                                {new Date(day.dateString).toLocaleDateString("en-US", {
                                  weekday: "long", month: "long", day: "numeric", year: "numeric",
                                })}
                              </p>
                              <p>
                                {dayData?.count === 0 || !dayData
                                  ? "No contributions"
                                  : `${dayData.count} contribution${dayData.count === 1 ? "" : "s"}`}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                </div>

                {/* Sidebar stats */}
                <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                  <PromptHeading>stats</PromptHeading>
                  <p
                    className="mt-1 font-mono text-3xl font-light tabular-nums"
                    style={{ color: "var(--theme-accent-color)" }}
                  >
                    {monthData.totalContributions}
                  </p>
                  <p
                    className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--theme-muted-color)" }}
                  >
                    contributions
                  </p>

                  <ul className="mt-6 space-y-3 font-mono text-xs">
                    {[
                      ["active days", monthData.activeDays],
                      ["avg per day", monthData.averagePerDay],
                      ["best day", monthData.bestDay],
                      ["longest streak", `${monthData.longestStreak}d`],
                    ].map(([k, v]) => (
                      <li
                        key={k as string}
                        className="flex items-baseline justify-between border-b pb-2 last:border-b-0 last:pb-0"
                        style={{ borderColor: "var(--theme-border-color)" }}
                      >
                        <span
                          className="uppercase tracking-[0.18em]"
                          style={{ color: "var(--theme-muted-color)" }}
                        >
                          {k}
                        </span>
                        <span style={{ color: "var(--theme-text-color)" }}>{v}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-6 border-t pt-4 font-mono text-xs"
                    style={{ borderColor: "var(--theme-border-color)" }}
                  >
                    <p className="uppercase tracking-[0.18em]" style={{ color: "var(--theme-muted-color)" }}>
                      distribution
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex justify-between">
                        <span style={{ color: "var(--theme-muted-color)" }}>weekdays</span>
                        <span>{monthData.weekdayContributions}</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: "var(--theme-muted-color)" }}>weekends</span>
                        <span>{monthData.weekendContributions}</span>
                      </li>
                    </ul>
                  </div>

                  {monthData.isCurrentMonth && (
                    <div
                      className="mt-6 border-t pt-4 font-mono text-[11px]"
                      style={{ borderColor: "var(--theme-border-color)" }}
                    >
                      <p
                        className="text-center uppercase tracking-[0.22em]"
                        style={{ color: "var(--theme-muted-color)" }}
                      >
                        {monthData.daysElapsed} of {monthData.totalDaysInMonth}
                      </p>
                      <div
                        className="mt-2 h-px w-full overflow-hidden rounded-full"
                        style={{ background: "var(--theme-border-color)" }}
                      >
                        <div
                          className="h-px transition-all duration-300"
                          style={{
                            width: `${(monthData.daysElapsed / monthData.totalDaysInMonth) * 100}%`,
                            background: "var(--theme-accent-color)",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {selectedDay && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6"
                    style={cardSurface}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <PromptHeading>day --details</PromptHeading>
                      <button
                        onClick={() => setSelectedDay(null)}
                        className="font-mono text-base transition-opacity hover:opacity-60"
                        style={{ color: "var(--theme-muted-color)" }}
                        aria-label="Close day details"
                      >
                        ×
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <h3 className="text-lg font-medium tracking-tight">
                          {new Date(selectedDay.date).toLocaleDateString("en-US", {
                            weekday: "long", month: "long", day: "numeric", year: "numeric",
                          })}
                        </h3>
                        <p className="mt-1 text-sm" style={{ color: "var(--theme-muted-color)" }}>
                          {selectedDay.count === 0
                            ? "No contributions"
                            : `${selectedDay.count} contribution${selectedDay.count === 1 ? "" : "s"}`}
                        </p>
                        <div className="mt-4 flex items-center gap-2 font-mono text-xs">
                          <div
                            className="h-3 w-3 rounded-sm"
                            style={{ backgroundColor: heatmapCellColor(selectedDay.level) }}
                          />
                          <span
                            className="uppercase tracking-[0.18em]"
                            style={{ color: "var(--theme-muted-color)" }}
                          >
                            {["none", "low", "medium", "high", "very high"][selectedDay.level]}
                          </span>
                        </div>
                      </div>

                      <div className="font-mono text-xs leading-7" style={{ color: "var(--theme-muted-color)" }}>
                        <p>
                          <span className="uppercase tracking-[0.18em]">day</span>{" "}
                          {new Date(selectedDay.date).toLocaleDateString("en-US", { weekday: "long" })}
                        </p>
                        {(() => {
                          const idx = contributions.findIndex((c) => c.date === selectedDay.date)
                          const prev = idx > 0 ? contributions[idx - 1] : null
                          const next = idx < contributions.length - 1 ? contributions[idx + 1] : null
                          return (
                            <>
                              {prev && (
                                <p>
                                  <span className="uppercase tracking-[0.18em]">prev</span> {prev.count}
                                </p>
                              )}
                              {next && (
                                <p>
                                  <span className="uppercase tracking-[0.18em]">next</span> {next.count}
                                </p>
                              )}
                            </>
                          )
                        })()}
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            const date = new Date(selectedDay.date)
                            setSelectedCalendarMonth(date.getMonth())
                            setSelectedCalendarYear(date.getFullYear())
                          }}
                          className="rounded-lg border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-70"
                          style={{
                            borderColor: "var(--theme-border-color)",
                            color: "var(--theme-muted-color)",
                          }}
                        >
                          &gt; view month
                        </button>
                        <a
                          href={`https://github.com/${username}?tab=overview&from=${selectedDay.date}&to=${selectedDay.date}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-70"
                          style={{
                            borderColor: "var(--theme-border-color)",
                            color: "var(--theme-muted-color)",
                          }}
                        >
                          <span>&gt; open github</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && !error && selectedView === "streaks" && (
            <motion.div
              key="streaks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-10"
            >
              <section>
                <PromptHeading>streaks</PromptHeading>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Stat label="current" value={stats?.currentStreak ?? 0} sublabel="days in a row" emphasis />
                  <Stat label="longest" value={stats?.longestStreak ?? 0} sublabel="days · 3 mo" />
                  <Stat label="total streaks" value={streaks.length} sublabel="3+ days" />
                </div>
              </section>

              {/* Streak timeline */}
              <section className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                <PromptHeading>timeline</PromptHeading>
                <div className="flex gap-0.5 overflow-x-auto pb-2">
                  {contributions.map((day) => {
                    const inStreak = streaks.some((s) => s.dates.includes(day.date))
                    return (
                      <Tooltip key={day.date} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div
                            className="h-8 w-2 cursor-pointer rounded-sm transition-transform hover:scale-110"
                            style={{
                              background: inStreak
                                ? "var(--theme-accent-color)"
                                : day.count > 0
                                  ? heatmapCellColor(2)
                                  : "var(--theme-border-color)",
                              opacity: inStreak ? 1 : day.count > 0 ? 0.85 : 0.6,
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-medium">
                              {new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                            </p>
                            <p>{day.count === 0 ? "No contributions" : `${day.count} contribution${day.count === 1 ? "" : "s"}`}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--theme-muted-color)" }}>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-sm" style={{ background: "var(--theme-accent-color)" }} />
                    streak
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-sm" style={{ background: heatmapCellColor(2), opacity: 0.85 }} />
                    active
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-sm" style={{ background: "var(--theme-border-color)" }} />
                    quiet
                  </span>
                </div>
              </section>

              {/* Streak details */}
              <section>
                <PromptHeading>streak --list</PromptHeading>
                {streaks.length > 0 ? (
                  <div className="space-y-3">
                    {streaks.map((streak, index) => (
                      <motion.div
                        key={streak.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6"
                        style={cardSurface}
                      >
                        <div className="flex items-start gap-4 sm:gap-5">
                          <span
                            className="font-mono text-3xl font-light leading-none tabular-nums sm:text-4xl"
                            style={{ color: "var(--theme-muted-color)", opacity: 0.45 }}
                            aria-hidden
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
                                <span style={{ color: "var(--theme-accent-color)" }}>{streak.length}</span>
                                <span className="ml-2 text-sm font-normal" style={{ color: "var(--theme-muted-color)" }}>
                                  days
                                </span>
                              </h2>
                              <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--theme-muted-color)" }}>
                                {streak.totalContributions} contributions · {streak.averagePerDay}/d
                              </p>
                            </div>
                            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "var(--theme-muted-color)" }}>
                              {new Date(streak.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              {" → "}
                              {new Date(streak.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-0.5">
                              {streak.dates.map((date) => {
                                const dayData = contributions.find((d) => d.date === date)
                                return (
                                  <Tooltip key={date} delayDuration={0}>
                                    <TooltipTrigger asChild>
                                      <div
                                        className="h-6 w-2 cursor-pointer rounded-sm transition-transform hover:scale-110"
                                        style={{
                                          background: "var(--theme-accent-color)",
                                          opacity: dayData ? Math.max(0.35, Math.min(1, dayData.count / 10)) : 0.35,
                                        }}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="text-xs">
                                        <p className="font-medium">
                                          {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                        </p>
                                        <p>{dayData?.count || 0} contributions</p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border px-6 py-8 text-center" style={cardSurface}>
                    <p className="text-sm" style={{ color: "var(--theme-muted-color)" }}>
                      No streaks of 3+ consecutive days in the last 3 months.
                    </p>
                  </div>
                )}
              </section>

              {/* Performance summary */}
              <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                  <PromptHeading>performance</PromptHeading>
                  <ul className="space-y-3 font-mono text-xs sm:text-sm">
                    {[
                      ["avg streak", streaks.length > 0
                        ? `${Math.round((streaks.reduce((s, x) => s + x.length, 0) / streaks.length) * 10) / 10}d`
                        : "—"],
                      ["total streak days", `${streaks.reduce((s, x) => s + x.length, 0)}d`],
                      ["streak rate", contributions.length > 0
                        ? `${Math.round((streaks.reduce((s, x) => s + x.length, 0) / contributions.length) * 100)}%`
                        : "0%"],
                      ["best contribs", streaks.length > 0 ? Math.max(...streaks.map((s) => s.totalContributions)) : 0],
                    ].map(([k, v]) => (
                      <li
                        key={k as string}
                        className="flex items-baseline justify-between border-b pb-2 last:border-b-0 last:pb-0"
                        style={{ borderColor: "var(--theme-border-color)" }}
                      >
                        <span
                          className="uppercase tracking-[0.18em]"
                          style={{ color: "var(--theme-muted-color)" }}
                        >
                          {k}
                        </span>
                        <span style={{ color: "var(--theme-text-color)" }}>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
                  <PromptHeading>insight</PromptHeading>
                  {streaks.length > 0 ? (
                    <div className="space-y-3 text-sm leading-7">
                      <p>
                        <span style={{ color: "var(--theme-muted-color)" }}>longest run </span>
                        <span style={{ color: "var(--theme-accent-color)" }}>
                          {streaks[0].length}d
                        </span>
                        <span style={{ color: "var(--theme-muted-color)" }}>
                          {" "}with {streaks[0].totalContributions} contribs.
                        </span>
                      </p>
                      {stats && stats.currentStreak > 0 && (
                        <p>
                          <span style={{ color: "var(--theme-muted-color)" }}>currently </span>
                          <span style={{ color: "var(--theme-accent-color)" }}>
                            {stats.currentStreak}d
                          </span>
                          <span style={{ color: "var(--theme-muted-color)" }}> on the wire.</span>
                        </p>
                      )}
                      <p style={{ color: "var(--theme-muted-color)" }}>
                        {streaks.length} streaks cleared in the last 3 months.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: "var(--theme-muted-color)" }}>
                      Nothing to report yet. Ship something. Even small things count.
                    </p>
                  )}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}
