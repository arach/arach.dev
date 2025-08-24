'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Activity, Calendar, Target, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ContributionDay, MonthlyStats } from "@/types/github";

interface CurrentMonthInsightsProps {
  contributions: ContributionDay[];
  monthlyStats: MonthlyStats[];
  getContributionColor: (level: number) => string;
}

export default function CurrentMonthInsights({ 
  contributions, 
  monthlyStats,
  getContributionColor 
}: CurrentMonthInsightsProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  
  // Get current month data
  const currentMonthContributions = contributions.filter(day => {
    const date = new Date(day.date);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  });
  
  // Get current and previous months stats
  const currentMonthStat = monthlyStats.find(m => m.isCurrentMonth);
  const previousMonthsStats = monthlyStats.filter(m => !m.isCurrentMonth);
  const avgPreviousMonths = previousMonthsStats.length > 0 
    ? previousMonthsStats.reduce((sum, m) => sum + m.contributions, 0) / previousMonthsStats.length
    : 0;
  const avgDailyPrevious = previousMonthsStats.length > 0
    ? previousMonthsStats.reduce((sum, m) => sum + m.averagePerDay, 0) / previousMonthsStats.length
    : 0;
  
  // Calculate pacing
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysElapsed = currentDay;
  const daysRemaining = daysInMonth - daysElapsed;
  const progressPercent = Math.round((daysElapsed / daysInMonth) * 100);
  
  // Current month pace vs average
  const expectedContributions = (avgPreviousMonths / 30) * daysElapsed; // Normalized to 30 days
  const actualContributions = currentMonthStat?.contributions || 0;
  const paceVsAverage = actualContributions - expectedContributions;
  const pacePercentage = expectedContributions > 0 
    ? Math.round((actualContributions / expectedContributions) * 100)
    : 100;
  
  // Projection for end of month
  const currentDailyRate = actualContributions / daysElapsed;
  const projectedTotal = Math.round(currentDailyRate * daysInMonth);
  
  // Trend indicator
  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };
  
  // Create calendar grid for current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const startPadding = firstDay.getDay();
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="w-4 h-4" />
          Current Month Insights
        </CardTitle>
        <CardDescription className="text-xs">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })} - Day {currentDay} of {daysInMonth}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Activity Calendar */}
          <div>
            <h3 className="text-xs font-medium mb-2 text-gray-600 uppercase">Activity Calendar</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="grid grid-cols-7 gap-0.5 text-xs text-gray-500 mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="w-4 h-4 flex items-center justify-center text-[9px]">
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
                            className={`w-4 h-4 rounded-sm cursor-pointer hover:scale-125 transition-transform ${
                              new Date(day.date) > today 
                                ? 'opacity-30' 
                                : ''
                            }`}
                            style={{ 
                              backgroundColor: new Date(day.date) > today 
                                ? '#e5e7eb'
                                : getContributionColor(day.level)
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>
                            <p className="font-medium text-xs">
                              {new Date(day.date) > today
                                ? "Future date"
                                : day.count === 0
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
                      <div className="w-4 h-4" />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Current Month Stats */}
              {currentMonthStat && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-gray-600">Total</div>
                      <div className="font-bold text-lg">
                        {currentMonthStat.contributions}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Active</div>
                      <div className="font-bold text-lg">
                        {currentMonthStat.activeDays}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Streak</div>
                      <div className="font-bold text-lg text-orange-600">
                        {currentMonthStat.longestStreak}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right: Pacing Analysis */}
          <div>
            <h3 className="text-xs font-medium mb-2 text-gray-600 uppercase">Pacing Analysis</h3>
            
            {/* Progress Bar */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-600">Month Progress</span>
                <span className="text-sm font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{daysElapsed} days done</span>
                <span>{daysRemaining} days left</span>
              </div>
            </div>
            
            {/* Pacing Cards */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Current Pace</span>
                  {getTrendIcon(paceVsAverage)}
                </div>
                <div className="text-xl font-bold">
                  {pacePercentage}%
                </div>
                <div className="text-xs text-gray-500">
                  of expected
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Projection</span>
                  <Target className="w-3 h-3 text-blue-500" />
                </div>
                <div className="text-xl font-bold">
                  {projectedTotal}
                </div>
                <div className="text-xs text-gray-500">
                  by month end
                </div>
              </div>
            </div>
            
            {/* Daily Average Comparison */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Daily Average Comparison</span>
              </div>
              <div className="flex justify-between text-xs">
                <div>
                  <span className="text-gray-600">This month: </span>
                  <span className="font-bold text-blue-600">
                    {currentMonthStat?.averagePerDay || 0}/day
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">3-month avg: </span>
                  <span className="font-bold">
                    {avgDailyPrevious.toFixed(1)}/day
                  </span>
                </div>
              </div>
              {paceVsAverage !== 0 && (
                <div className="mt-2 text-xs text-center">
                  <span className={paceVsAverage > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {paceVsAverage > 0 ? "+" : ""}{Math.round(paceVsAverage)} contributions
                  </span>
                  <span className="text-gray-600"> vs expected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}