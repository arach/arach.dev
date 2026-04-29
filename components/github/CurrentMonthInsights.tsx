'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ContributionDay, MonthlyStats } from "@/types/github";

interface CurrentMonthInsightsProps {
  contributions: ContributionDay[];
  monthlyStats: MonthlyStats[];
}

const cardSurface: React.CSSProperties = {
  background: "var(--theme-card-bg)",
  borderColor: "var(--theme-border-color)",
  boxShadow: "0 12px 40px -28px var(--theme-shadow-color)",
};

const heatmapCellColor = (level: number) => {
  if (level <= 0) return "var(--theme-border-color)";
  const pct = [0, 25, 50, 75, 100][Math.min(level, 4)];
  return `color-mix(in srgb, var(--theme-accent-color) ${pct}%, transparent)`;
};

function PromptHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em]"
      style={{ color: "var(--theme-muted-color)" }}
    >
      <span style={{ color: "var(--theme-accent-color)" }}>&gt;</span>
      <span>{children}</span>
    </p>
  );
}

export default function CurrentMonthInsights({
  contributions,
  monthlyStats,
}: CurrentMonthInsightsProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const currentMonthContributions = contributions.filter(day => {
    const date = new Date(day.date);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  });

  const currentMonthStat = monthlyStats.find(m => m.isCurrentMonth);
  const previousMonthsStats = monthlyStats.filter(m => !m.isCurrentMonth);
  const avgPreviousMonths = previousMonthsStats.length > 0
    ? previousMonthsStats.reduce((sum, m) => sum + m.contributions, 0) / previousMonthsStats.length
    : 0;
  const avgDailyPrevious = previousMonthsStats.length > 0
    ? previousMonthsStats.reduce((sum, m) => sum + m.averagePerDay, 0) / previousMonthsStats.length
    : 0;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysElapsed = currentDay;
  const daysRemaining = daysInMonth - daysElapsed;
  const progressPercent = Math.round((daysElapsed / daysInMonth) * 100);

  const expectedContributions = (avgPreviousMonths / 30) * daysElapsed;
  const actualContributions = currentMonthStat?.contributions || 0;
  const paceVsAverage = actualContributions - expectedContributions;
  const pacePercentage = expectedContributions > 0
    ? Math.round((actualContributions / expectedContributions) * 100)
    : 100;

  const currentDailyRate = actualContributions / Math.max(daysElapsed, 1);
  const projectedTotal = Math.round(currentDailyRate * daysInMonth);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-3.5 w-3.5" style={{ color: "var(--theme-accent-color)" }} />;
    if (value < 0) return <TrendingDown className="h-3.5 w-3.5" style={{ color: "var(--theme-muted-color)" }} />;
    return <Minus className="h-3.5 w-3.5" style={{ color: "var(--theme-muted-color)" }} />;
  };

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startPadding = firstDay.getDay();
  const calendarDays: (ContributionDay | null)[] = [];
  for (let i = 0; i < startPadding; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const contribution = currentMonthContributions.find(c => c.date === dateStr);
    calendarDays.push(contribution || { date: dateStr, count: 0, level: 0 });
  }

  return (
    <section className="rounded-2xl border px-5 py-5 sm:px-6 sm:py-6" style={cardSurface}>
      <PromptHeading>this month --insights</PromptHeading>
      <p
        className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em]"
        style={{ color: "var(--theme-muted-color)" }}
      >
        {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })} · day {currentDay}/{daysInMonth}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity calendar */}
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--theme-muted-color)" }}>
            activity
          </p>
          <div
            className="rounded-xl border p-3"
            style={{ borderColor: "var(--theme-border-color)" }}
          >
            <div
              className="mb-1 grid grid-cols-7 gap-0.5 font-mono text-[8px] uppercase"
              style={{ color: "var(--theme-muted-color)", opacity: 0.5 }}
            >
              {['s', 'm', 't', 'w', 't', 'f', 's'].map((day, i) => (
                <div key={i} className="flex h-4 w-4 items-center justify-center">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {calendarDays.map((day, index) => (
                <div key={index}>
                  {day ? (
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div
                          className="h-4 w-4 cursor-pointer rounded-sm transition-transform hover:scale-125"
                          style={{
                            backgroundColor: new Date(day.date) > today
                              ? 'var(--theme-border-color)'
                              : heatmapCellColor(day.level),
                            opacity: new Date(day.date) > today ? 0.4 : 1,
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>
                          <p className="text-xs font-medium">
                            {new Date(day.date) > today
                              ? "Future date"
                              : day.count === 0
                                ? "No contributions"
                                : `${day.count} contribution${day.count === 1 ? "" : "s"}`}
                          </p>
                          <p className="text-xs opacity-75">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "short", month: "short", day: "numeric",
                            })}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>

            {currentMonthStat && (
              <div
                className="mt-4 grid grid-cols-3 gap-3 border-t pt-4 font-mono text-xs"
                style={{ borderColor: "var(--theme-border-color)" }}
              >
                {[
                  ["total", currentMonthStat.contributions],
                  ["active", `${currentMonthStat.activeDays}d`],
                  ["streak", `${currentMonthStat.longestStreak}d`],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex flex-col">
                    <span className="uppercase tracking-[0.22em]" style={{ color: "var(--theme-muted-color)" }}>
                      {k}
                    </span>
                    <span className="mt-1 text-base">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pacing */}
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--theme-muted-color)" }}>
            pacing
          </p>

          {/* Progress */}
          <div
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--theme-border-color)" }}
          >
            <div className="flex items-baseline justify-between font-mono text-xs">
              <span className="uppercase tracking-[0.22em]" style={{ color: "var(--theme-muted-color)" }}>
                month progress
              </span>
              <span className="text-base font-medium tabular-nums">{progressPercent}%</span>
            </div>
            <div
              className="mt-3 h-px w-full overflow-hidden rounded-full"
              style={{ background: "var(--theme-border-color)" }}
            >
              <div
                className="h-px transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  background: "var(--theme-accent-color)",
                }}
              />
            </div>
            <div
              className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--theme-muted-color)" }}
            >
              <span>{daysElapsed} done</span>
              <span>{daysRemaining} left</span>
            </div>
          </div>

          {/* Pace + projection */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "var(--theme-border-color)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--theme-muted-color)" }}
                >
                  pace
                </span>
                {getTrendIcon(paceVsAverage)}
              </div>
              <div className="mt-2 font-mono text-2xl font-light tabular-nums">{pacePercentage}%</div>
              <div
                className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "var(--theme-muted-color)" }}
              >
                of expected
              </div>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "var(--theme-border-color)" }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--theme-muted-color)" }}
              >
                projection
              </span>
              <div className="mt-2 font-mono text-2xl font-light tabular-nums">{projectedTotal}</div>
              <div
                className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "var(--theme-muted-color)" }}
              >
                by month end
              </div>
            </div>
          </div>

          {/* Daily average */}
          <div
            className="mt-3 rounded-xl border p-4"
            style={{ borderColor: "var(--theme-border-color)" }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--theme-muted-color)" }}
            >
              daily average
            </p>
            <div className="mt-2 flex justify-between font-mono text-xs">
              <div>
                <span style={{ color: "var(--theme-muted-color)" }}>this month </span>
                <span style={{ color: "var(--theme-accent-color)" }}>
                  {currentMonthStat?.averagePerDay || 0}/d
                </span>
              </div>
              <div>
                <span style={{ color: "var(--theme-muted-color)" }}>3-mo avg </span>
                <span style={{ color: "var(--theme-text-color)" }}>{avgDailyPrevious.toFixed(1)}/d</span>
              </div>
            </div>
            {paceVsAverage !== 0 && (
              <p
                className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--theme-muted-color)" }}
              >
                <span style={{ color: paceVsAverage > 0 ? "var(--theme-accent-color)" : "var(--theme-muted-color)" }}>
                  {paceVsAverage > 0 ? "+" : ""}
                  {Math.round(paceVsAverage)}
                </span>
                {" "}vs expected
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
