'use client'

import { motion } from 'framer-motion'
import { GitHubContributions } from './'

interface Project {
  title: string
  description: string
  link?: string
  github?: string
  tags: string[]
  preview: string
}

interface ProjectCategory {
  name: string
  description: string
  projects: Project[]
  icon: string
}

interface ProjectCategoryFilterProps {
  projects: Project[]
  categories: ProjectCategory[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onButtonClick: () => void
  headerActions?: React.ReactNode
}

export function ProjectCategoryFilter({
  projects,
  categories,
  selectedCategory,
  onCategoryChange,
  onButtonClick,
  headerActions,
}: ProjectCategoryFilterProps) {

  return (
    <div className="mb-4 sm:mb-6 relative z-45">
      {/* Mobile projects header */}
      <div className="sm:hidden mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Projects</span>
            <span className="text-xs text-gray-500">({projects.length})</span>
          </div>
          {headerActions}
        </div>
      </div>
      
      {/* Desktop category buttons */}
      <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
        <button
          className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm transition-all duration-500 backdrop-blur-md border ${
            selectedCategory === "all"
              ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
              : 'bg-white/[0.02] border-gray-500/5 text-gray-400 hover:bg-white/[0.04] hover:border-gray-500/10'
          }`}
          onClick={() => {
            onButtonClick()
            onCategoryChange("all")
          }}
        >
          All Projects ({projects.length})
        </button>
        {categories.map((category, index) => (
          <button
            key={category.name}
            className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm transition-all duration-500 backdrop-blur-md border ${
              selectedCategory === category.name
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                : 'bg-white/[0.02] border-gray-500/5 text-gray-400 hover:bg-white/[0.04] hover:border-gray-500/10'
            }`}
            onClick={() => {
              onButtonClick()
              onCategoryChange(category.name)
            }}
          >
            {category.icon} {category.name} ({category.projects.length})
          </button>
        ))}
      </div>

      {selectedCategory !== "all" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-md mb-4"
          style={{ 
            backgroundColor: 'var(--theme-card-bg)', 
            border: '1px solid var(--theme-border-color)' 
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{categories.find((cat) => cat.name === selectedCategory)?.icon}</span>
            <h3 className="font-medium text-sm" style={{ color: 'var(--theme-heading-color)' }}>{selectedCategory}</h3>
          </div>
          <p className="text-xs" style={{ color: 'var(--theme-muted-text)' }}>
            {categories.find((cat) => cat.name === selectedCategory)?.description}
          </p>
        </motion.div>
      )}
    </div>
  )
}
