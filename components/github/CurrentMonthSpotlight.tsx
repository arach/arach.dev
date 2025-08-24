'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity, Calendar, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ContributionDay, MonthlyStats } from "@/types/github";

interface CurrentMonthSpotlightProps {
  contributions: ContributionDay[];
  monthlyStats: MonthlyStats[];
  getContributionColor: (level: number) => string;
}

export default function CurrentMonthSpotlight({ 
  contributions, 
  monthlyStats,
  getContributionColor 
}: CurrentMonthSpotlightProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  // Get current month data
  const currentMonthContributions = contributions.filter(day => {
    const date = new Date(day.date);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  });
  
  // Get current month stats
  const currentMonthStat = monthlyStats.find(m => m.isCurrentMonth);
  
  // Create calendar grid for current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startPadding = firstDay.getDay();
  const totalDays = lastDay.getDate();
  
  const calendarDays: (ContributionDay | null)[] = [];
  
  // Add padding for start of month
  for (let i = 0; i < startPadding; i++) {
    calendarDays.push(null);
  }
  
  // Add actual days
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const contribution = currentMonthContributions.find(c => c.date === dateStr);
    calendarDays.push(contribution || { date: dateStr, count: 0, level: 0 });
  }
  
  // Calculate progress
  const daysElapsed = today.getDate();
  const progressPercent = Math.round((daysElapsed / totalDays) * 100);
  
  return (
    <Card className="md:col-span-2 border-blue-200 bg-gradient-to-br from-blue-50/30 to-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Current Month Spotlight
        </CardTitle>
        <CardDescription className="text-sm">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })} - {progressPercent}% Complete
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Month Calendar */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700">Activity Calendar</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div key={index}>
                    {day ? (
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div
                            className="w-5 h-5 rounded-sm cursor-pointer hover:scale-125 transition-transform border border-gray-200"
                            style={{ 
                              backgroundColor: day.count > 0 ? getContributionColor(day.level) : '#ffffff',
                              opacity: new Date(day.date) > today ? 0.3 : 1
                            }}
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
                      <div className="w-5 h-5" />
                    )}
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
                      className="w-3 h-3 rounded-sm border border-gray-200"
                      style={{ backgroundColor: level === 0 ? '#ffffff' : getContributionColor(level) }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
          
          {/* Current Month Stats */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700">Live Statistics</h3>
            <div className="space-y-3">
              {currentMonthStat && (
                <>
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Total Contributions</span>
                      <Activity className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {currentMonthStat.contributions}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {currentMonthStat.averagePerDay} per day average
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-600 mb-1">Active Days</div>
                      <div className="text-lg font-bold text-green-600">
                        {currentMonthStat.activeDays}
                      </div>
                      <div className="text-xs text-gray-500">
                        of {daysElapsed} elapsed
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-600 mb-1">Best Streak</div>
                      <div className="text-lg font-bold text-orange-600">
                        {currentMonthStat.longestStreak}
                      </div>
                      <div className="text-xs text-gray-500">
                        consecutive days
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Month Progress</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {daysElapsed} of {totalDays} days
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}