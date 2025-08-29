"use client"

import { useState, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Github, AlertCircle, RefreshCw, TrendingUp, Zap } from "lucide-react"
import type { GitHubContributionsProps, ContributionDay } from "@/types/github"
import { useTheme } from "@/lib/theme-context"
import { useGitHub } from "@/lib/github-context"

const GitHubContributions = memo(function GitHubContributions({
  username = "arach",
  showPrivateRepos = false,
}: GitHubContributionsProps) {
  const { contributions, stats, loading, error, dataSource, refetch, isInitialized } = useGitHub()
  const [showPreview, setShowPreview] = useState(false)
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const { currentTheme: theme } = useTheme()

  // Remove the old fetch logic - now handled by context



  // Stats calculation now handled by context

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
  if (!contributions.length && !loading) {
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
          {stats && stats.currentStreak >= 7 && (
            <>
              <span className="text-orange-600">🔥</span>
              <span className="text-orange-600 font-medium">{stats.currentStreak}</span>
            </>
          )}
          {stats && stats.currentStreak >= 3 && stats.currentStreak < 7 && (
            <>
              <span className="text-purple-500">✨</span>
              <span className="text-purple-500 font-medium">{stats.currentStreak}</span>
            </>
          )}
          <TrendingUp className="w-2.5 h-2.5" style={{ color: 'var(--theme-muted-text)' }} />
        </Button>

        {/* Custom Hover Preview */}
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 z-50 ${
            showPreview ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={previewRef}
            className="rounded-lg shadow-2xl p-4 w-96 relative border overflow-visible"
            style={{
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
                <Button onClick={refetch} variant="outline" size="sm">
                  <RefreshCw className="w-3 h-3 mr-2" />
                  Retry
                </Button>
              </div>
            )}

            {/* Quick Stats */}
            {stats && !error && !loading && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-2xl" style={{ 
                      color: theme?.textColor || 'rgb(17, 24, 39)',
                      fontFamily: theme?.headerFont || 'inherit',
                      fontWeight: 'bold'
                    }}>
                      {stats.threeMonthContributions.toLocaleString()}
                    </div>
                    <div className="text-[11px]" style={{ 
                      color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                      fontFamily: theme?.headerFont || 'inherit'
                    }}>Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl" style={{ 
                      color: theme?.textColor || 'rgb(17, 24, 39)',
                      fontFamily: theme?.headerFont || 'inherit',
                      fontWeight: 'bold'
                    }}>
                      {contributions.filter((d) => d.count > 0).length}
                    </div>
                    <div className="text-[11px]" style={{ 
                      color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                      fontFamily: theme?.headerFont || 'inherit'
                    }}>Active Days</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {stats.currentStreak >= 7 && <span className="text-base">🔥</span>}
                      {stats.currentStreak >= 3 && stats.currentStreak < 7 && <span className="text-base">✨</span>}
                      <div className="text-2xl font-bold" style={{ 
                        color: stats.currentStreak >= 7 ? '#f97316' : stats.currentStreak >= 3 ? '#8b5cf6' : theme?.textColor || 'rgb(17, 24, 39)',
                        fontFamily: theme?.headerFont || 'inherit'
                      }}>
                        {stats.currentStreak}
                      </div>
                    </div>
                    <div className="text-[11px] whitespace-nowrap" style={{ 
                      color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                      fontFamily: theme?.headerFont || 'inherit'
                    }}>Streak</div>
                  </div>
                </div>
              </div>
            )}

            {/* Two Month Calendar View */}
            {contributions.length > 0 && !error && !loading && (
              <div className="mb-3 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 overflow-visible">
                {/* Two Month Calendars */}
                {(() => {
                  const today = new Date();
                  const currentMonth = today.getMonth();
                  const currentYear = today.getFullYear();
                  
                  // Calculate trailing month
                  const trailingMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                  const trailingYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                  
                  // Helper to render a month calendar
                  const renderMonthCalendar = (month: number, year: number, isCurrentMonth: boolean) => {
                    const firstDay = new Date(year, month, 1);
                    const lastDay = new Date(year, month + 1, 0);
                    const daysInMonth = lastDay.getDate();
                    const startPadding = firstDay.getDay();
                    
                    // Get month contributions
                    const monthContributions = contributions.filter(c => {
                      const date = new Date(c.date);
                      return date.getMonth() === month && date.getFullYear() === year;
                    });
                    
                    // Create calendar grid
                    const calendarDays: (ContributionDay | null)[] = [];
                    for (let i = 0; i < startPadding; i++) {
                      calendarDays.push(null);
                    }
                    
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const contribution = monthContributions.find(c => c.date === dateStr);
                      calendarDays.push(contribution || { date: dateStr, count: 0, level: 0 });
                    }
                    
                    return (
                      <div className="flex-1 overflow-visible">
                        {/* Month header */}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium" style={{ color: theme?.textColor || 'rgb(55, 65, 81)' }}>
                            {new Date(year, month).toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          {isCurrentMonth && (
                            <Zap className="w-2.5 h-2.5" style={{ color: theme?.accentColor || 'rgb(96, 165, 250)' }} />
                          )}
                        </div>
                        
                        {/* Day labels */}
                        <div className="grid grid-cols-7 gap-0.5 mb-0.5">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className="text-[7px] text-center" style={{ color: theme?.mutedTextColor || 'rgb(156, 163, 175)' }}>
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-0.5 overflow-visible">
                          {calendarDays.map((day, index) => (
                            <div
                              key={index}
                              className={day ? "w-full aspect-square rounded-[1px] cursor-pointer hover:scale-125 hover:z-10 transition-transform relative group/day" : ""}
                              style={{
                                backgroundColor: day ? getContributionColor(day.level) : 'transparent',
                                opacity: day && new Date(day.date) > today ? 0.3 : 1
                              }}
                            >
                              {day && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover/day:opacity-100 pointer-events-none transition-opacity duration-200 z-[60]">
                                  <div 
                                    className="px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-lg"
                                    style={{
                                      backgroundColor: theme?.cardBg || 'rgb(31, 41, 55)',
                                      color: theme?.textColor || 'rgb(243, 244, 246)',
                                      border: `1px solid ${theme?.borderColor || 'rgba(255, 255, 255, 0.1)'}`,
                                    }}
                                  >
                                    <div className="font-semibold" style={{ color: theme?.accentColor || 'rgb(147, 197, 253)' }}>
                                      {day.count} contribution{day.count !== 1 ? 's' : ''}
                                    </div>
                                    <div style={{ color: theme?.mutedTextColor || 'rgb(156, 163, 175)' }}>
                                      {new Date(day.date).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric',
                                        year: 'numeric'
                                      })}
                                    </div>
                                  </div>
                                  <div 
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent"
                                    style={{
                                      borderTopColor: theme?.cardBg || 'rgb(31, 41, 55)',
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  };
                  
                  return (
                    <>
                      {/* Two month grid */}
                      <div className="flex gap-3 mb-3 overflow-visible">
                        {renderMonthCalendar(trailingMonth, trailingYear, false)}
                        {renderMonthCalendar(currentMonth, currentYear, true)}
                      </div>
                      
                      {/* 30-day metrics */}
                      <div className="pt-2 border-t" style={{ borderColor: theme?.borderColor || 'rgb(243, 244, 246)' }}>
                        <div className="text-[10px] font-medium mb-1" style={{ 
                          color: theme?.mutedTextColor || 'rgb(107, 114, 128)',
                          fontFamily: theme?.headerFont || 'inherit'
                        }}>
                          Last 30 Days
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-lg font-semibold" style={{ 
                              color: theme?.textColor || 'rgb(17, 24, 39)',
                              fontFamily: theme?.headerFont || 'inherit'
                            }}>
                              {contributions.slice(-30).reduce((sum, day) => sum + day.count, 0)}
                            </div>
                            <div className="text-[10px]" style={{ 
                              color: theme?.mutedTextColor || 'rgb(156, 163, 175)',
                              fontFamily: theme?.headerFont || 'inherit'
                            }}>
                              commits
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold" style={{ 
                              color: theme?.textColor || 'rgb(17, 24, 39)',
                              fontFamily: theme?.headerFont || 'inherit'
                            }}>
                              {contributions.slice(-30).filter(d => d.count > 0).length}
                            </div>
                            <div className="text-[10px]" style={{ 
                              color: theme?.mutedTextColor || 'rgb(156, 163, 175)',
                              fontFamily: theme?.headerFont || 'inherit'
                            }}>
                              active days
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold" style={{ 
                              color: theme?.textColor || 'rgb(17, 24, 39)',
                              fontFamily: theme?.headerFont || 'inherit'
                            }}>
                              {Math.round(contributions.slice(-30).reduce((sum, day) => sum + day.count, 0) / 30 * 10) / 10}
                            </div>
                            <div className="text-[10px]" style={{ 
                              color: theme?.mutedTextColor || 'rgb(156, 163, 175)',
                              fontFamily: theme?.headerFont || 'inherit'
                            }}>
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

export { GitHubContributions }