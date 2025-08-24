'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ContributionDay, MonthlyStats } from "@/types/github";

interface TrailingMonthsCompactProps {
  contributions: ContributionDay[];
  monthlyStats: MonthlyStats[];
  getContributionColor: (level: number) => string;
}

export default function TrailingMonthsCompact({ 
  contributions, 
  monthlyStats,
  getContributionColor 
}: TrailingMonthsCompactProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get trailing 3 months only (excluding current)
  const trailingMonthsStats = monthlyStats
    .filter(m => !m.isCurrentMonth)
    .sort((a, b) => {
      const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateA = new Date(a.year, monthOrder.indexOf(a.month));
      const dateB = new Date(b.year, monthOrder.indexOf(b.month));
      return dateA.getTime() - dateB.getTime();
    })
    .slice(-3); // Get last 3 months
  
  // Build the calendar grid for trailing 3 months
  const monthsToInclude = new Set<string>();
  for (let i = 1; i <= 3; i++) {
    const targetDate = new Date(currentYear, currentMonth - i, 1);
    monthsToInclude.add(`${targetDate.getFullYear()}-${targetDate.getMonth()}`);
  }
  
  // Group contributions by month
  const monthlyContributions = new Map<string, ContributionDay[]>();
  const monthOrder: string[] = [];
  
  contributions.forEach(day => {
    const date = new Date(day.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    
    if (monthsToInclude.has(monthKey)) {
      if (!monthlyContributions.has(monthKey)) {
        monthlyContributions.set(monthKey, []);
        monthOrder.push(monthKey);
      }
      monthlyContributions.get(monthKey)!.push(day);
    }
  });
  
  // Sort month order chronologically
  monthOrder.sort((a, b) => {
    const [yearA, monthA] = a.split('-').map(Number);
    const [yearB, monthB] = b.split('-').map(Number);
    const dateA = new Date(yearA, monthA);
    const dateB = new Date(yearB, monthB);
    return dateA.getTime() - dateB.getTime();
  });
  
  // Create calendar grids
  const monthGrids = monthOrder.map(monthKey => {
    const [year, month] = monthKey.split('-').map(Number);
    const monthData = monthlyContributions.get(monthKey) || [];
    const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'short' });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const calendarDays: (ContributionDay | null)[] = [];
    
    for (let i = 0; i < startPadding; i++) {
      calendarDays.push(null);
    }
    
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const contribution = monthData.find(c => c.date === dateStr);
      const defaultContribution: ContributionDay = { date: dateStr, count: 0, level: 0 };
      calendarDays.push(contribution || defaultContribution);
    }
    
    return { monthName, year, calendarDays, monthKey };
  });
  
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5" />
          Previous Three Months
        </CardTitle>
        <CardDescription className="text-sm">
          Contribution history and statistics
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          {/* Compact Calendar View - Classic GitHub style */}
          <div>
            <h3 className="text-xs font-medium text-gray-600 mb-3">Contribution Activity</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-6">
                {monthGrids.map(({ monthName, year, calendarDays, monthKey }) => (
                  <div key={monthKey}>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">
                      {monthName} {year}
                    </h4>
                    <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-500 mb-1">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="w-4 h-4 flex items-center justify-center text-[10px]">
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
                                  className="w-4 h-4 rounded-sm cursor-pointer hover:scale-125 transition-transform"
                                  style={{ backgroundColor: getContributionColor(day.level) }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div>
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
                            <div className="w-4 h-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
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
          </div>
          
          {/* Monthly Statistics Cards */}
          <div>
            <h3 className="text-xs font-medium text-gray-600 mb-3">Monthly Breakdown</h3>
            <div className="grid grid-cols-3 gap-3">
              {trailingMonthsStats.map((month) => (
                <div key={`${month.year}-${month.month}`} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">
                      {month.month} {month.year}
                    </h3>
                    <span className="text-xs text-gray-500">Complete</span>
                  </div>
                  <div className="space-y-1 text-xs">
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
                    {month.longestStreak > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best streak:</span>
                        <span className="font-medium text-orange-600">{month.longestStreak}d</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}