'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ContributionDay, GitHubStats } from '@/types/github'

interface GitHubData {
  contributions: ContributionDay[]
  stats: GitHubStats | null
  loading: boolean
  error: string | null
  dataSource: string
  lastUpdated: string | null
}

interface GitHubContextType extends GitHubData {
  refetch: () => Promise<void>
  isInitialized: boolean
}

const GitHubContext = createContext<GitHubContextType | null>(null)

export function GitHubProvider({ 
  children, 
  username = "arach" 
}: { 
  children: React.ReactNode
  username?: string 
}) {
  const [data, setData] = useState<GitHubData>({
    contributions: [],
    stats: null,
    loading: false,
    error: null,
    dataSource: 'loading',
    lastUpdated: null
  })
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchGitHubData = useCallback(async () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return
    }

    try {
      setData(prev => ({ ...prev, loading: true, error: null }))

      const response = await fetch(`/api/github/contributions?username=${username}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const responseData = await response.json()
        
        // Calculate stats from contributions
        const calculatedStats = calculateStats(responseData.contributions || [])
        
        setData({
          contributions: responseData.contributions || [],
          stats: calculatedStats,
          loading: false,
          error: null,
          dataSource: responseData.source || 'api',
          lastUpdated: new Date().toISOString()
        })
      } else {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching GitHub data"
      setData(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        contributions: [],
        stats: null
      }))
    }
  }, [username])

  const refetch = useCallback(async () => {
    await fetchGitHubData()
  }, [fetchGitHubData])

  useEffect(() => {
    // Non-blocking load - fetch in background after initial paint
    const timeoutId = setTimeout(() => {
      setIsInitialized(true)
      fetchGitHubData()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [fetchGitHubData])

  const value: GitHubContextType = {
    ...data,
    refetch,
    isInitialized
  }

  return (
    <GitHubContext.Provider value={value}>
      {children}
    </GitHubContext.Provider>
  )
}

export function useGitHub() {
  const context = useContext(GitHubContext)
  if (!context) {
    throw new Error('useGitHub must be used within a GitHubProvider')
  }
  return context
}

// Helper function to calculate stats from contributions
function calculateStats(contributions: ContributionDay[]): GitHubStats {
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
    totalCommits: threeMonthContributions, // Using contributions as commits proxy
    totalForks,
    currentStreak,
    longestStreak,
    totalContributions: threeMonthContributions,
    threeMonthContributions,
  }
}
