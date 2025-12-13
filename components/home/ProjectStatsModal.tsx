'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { X, BarChart3 } from 'lucide-react'

interface Project {
  title: string
  description: string
  link?: string
  github: string
  tags: string[]
  preview: string
}

interface ProjectCategory {
  name: string
  description: string
  projects: Project[]
  icon: string
}

interface TechStat {
  name: string
  count: number
  percentage: number
  projects: string[]
}

interface ProjectStats {
  totalProjects: number
  categories: { name: string; count: number; percentage: number }[]
  technologies: TechStat[]
  platforms: TechStat[]
  languages: TechStat[]
}

interface ProjectStatsModalProps {
  showStats: boolean
  onClose: () => void
  projectStats: ProjectStats
}

export function ProjectStatsModal({ showStats, onClose, projectStats }: ProjectStatsModalProps) {
  const StatBar = ({
    label,
    count,
    percentage,
    projects,
  }: { label: string; count: number; percentage: number; projects?: string[] }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium" style={{ color: 'var(--theme-text-color)' }}>{label}</span>
            <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>
              {count} ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      </TooltipTrigger>
      {projects && (
        <TooltipContent>
          <div className="text-xs">
            <p className="font-medium mb-1">{label} projects:</p>
            <p>{projects.join(", ")}</p>
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  )

  return (
    <AnimatePresence>
      {showStats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--theme-card-bg)', boxShadow: '0 20px 50px var(--theme-shadow-color)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--theme-heading-color)' }}>Project Statistics</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Overview */}
                <Card className="p-4">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-sm">Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>Total Projects</span>
                        <span className="text-sm font-bold text-blue-600">{projectStats.totalProjects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>Categories</span>
                        <span className="text-sm font-bold text-green-600">{projectStats.categories.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>Technologies</span>
                        <span className="text-sm font-bold text-purple-600">
                          {projectStats.technologies.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Categories */}
                <Card className="p-4">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-sm">Project Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {projectStats.categories.map((category) => (
                      <StatBar
                        key={category.name}
                        label={category.name}
                        count={category.count}
                        percentage={category.percentage}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Technologies */}
                <Card className="p-4">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-sm">Technologies</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {projectStats.technologies.map((tech) => (
                      <StatBar
                        key={tech.name}
                        label={tech.name}
                        count={tech.count}
                        percentage={tech.percentage}
                        projects={tech.projects}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Platforms */}
                <Card className="p-4">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-sm">Platforms</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {projectStats.platforms.map((platform) => (
                      <StatBar
                        key={platform.name}
                        label={platform.name}
                        count={platform.count}
                        percentage={platform.percentage}
                        projects={platform.projects}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card className="p-4">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-sm">Languages</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {projectStats.languages.map((language) => (
                      <StatBar
                        key={language.name}
                        label={language.name}
                        count={language.count}
                        percentage={language.percentage}
                        projects={language.projects}
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Top Technologies */}
                <Card className="p-4">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-sm">Most Used</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-3">
                      {[...projectStats.technologies, ...projectStats.platforms, ...projectStats.languages]
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                              <span className="text-xs font-medium">{item.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{item.count} projects</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
