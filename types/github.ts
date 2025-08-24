export interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  avatar_url: string
  company: string | null
  location: string | null
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubStats {
  totalCommits: number
  totalForks: number
  currentStreak: number
  longestStreak: number
  totalContributions: number
  threeMonthContributions: number
}

export interface MonthlyStats {
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

export interface GitHubContributionsProps {
  username?: string
  showPrivateRepos?: boolean
}