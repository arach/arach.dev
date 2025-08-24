'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ContributionDay, MonthlyStats } from "@/types/github";

interface TrailingMonthsProps {
  contributions: ContributionDay[];
  monthlyStats: MonthlyStats[];
  getContributionColor: (level: number) => string;
}

export default function TrailingMonths({ 
  contributions, 
  monthlyStats,
  getContributionColor 
}: TrailingMonthsProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get trailing 3 months stats (excluding current month)
  const trailingMonthsStats = monthlyStats.filter(m => !m.isCurrentMonth)
    .sort((a, b) => {
      const dateA = new Date(a.year, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(a.month));
      const dateB = new Date(b.year, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(b.month));
      return dateA.getTime() - dateB.getTime();
    });
  
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5" />
          Trailing Months Overview
        </CardTitle>
        <CardDescription className="text-sm">
          Previous 3 months contribution history
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trailingMonthsStats.map((monthStat) => {
            // Get contributions for this month
            const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(monthStat.month);
            const monthContributions = contributions.filter(day => {
              const date = new Date(day.date);
              return date.getFullYear() === monthStat.year && date.getMonth() === monthIndex;
            });
            
            // Create calendar grid
            const firstDay = new Date(monthStat.year, monthIndex, 1);
            const lastDay = new Date(monthStat.year, monthIndex + 1, 0);
            const startPadding = firstDay.getDay();
            const totalDays = lastDay.getDate();
            
            const calendarDays: (ContributionDay | null)[] = [];
            
            // Add padding
            for (let i = 0; i < startPadding; i++) {
              calendarDays.push(null);
            }
            
            // Add actual days
            for (let day = 1; day <= totalDays; day++) {
              const dateStr = `${monthStat.year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const contribution = monthContributions.find(c => c.date === dateStr);
              const defaultContribution: ContributionDay = { date: dateStr, count: 0, level: 0 };
              calendarDays.push(contribution || defaultContribution);
            }
            
            return (
              <div key={`${monthStat.year}-${monthStat.month}`} className="bg-gray-50 rounded-lg p-4">
                {/* Month Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">
                    {monthStat.month} {monthStat.year}
                  </h3>
                  <span className="text-xs text-gray-500">Complete</span>
                </div>
                
                {/* Mini Calendar */}
                <div className="mb-3">
                  <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-400 mb-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="w-3 h-3 flex items-center justify-center text-[8px]">
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
                
                {/* Month Stats */}
                <div className="space-y-2 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Total</span>
                    <span className="text-sm font-bold text-gray-900">
                      {monthStat.contributions}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Active</span>
                      <div className="font-medium">{monthStat.activeDays} days</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Daily Avg</span>
                      <div className="font-medium">{monthStat.averagePerDay}</div>
                    </div>
                  </div>
                  {monthStat.longestStreak > 0 && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-gray-600">Best Streak:</span>
                      <span className="font-medium text-orange-600">
                        {monthStat.longestStreak} days
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}