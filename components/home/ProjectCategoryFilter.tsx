'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/theme-context'
import { GitHubContributions } from './'

interface Project {
  title: string
  description: string
  link: string
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
  const { currentTheme: theme } = useTheme()

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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
          className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm transition-all duration-500 backdrop-blur-md border"
          style={{
            backgroundColor: selectedCategory === "all" 
              ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.1) : 'rgba(59, 130, 246, 0.1)') 
              : (theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)'),
            borderColor: selectedCategory === "all"
              ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.2) : 'rgba(59, 130, 246, 0.2)')
              : 'rgba(107, 114, 128, 0.05)',
            color: selectedCategory === "all" 
              ? (theme?.accentColor || 'rgb(59, 130, 246)') 
              : (theme?.mutedTextColor || 'rgb(156, 163, 175)'),
            fontWeight: 400
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== "all") {
              e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.05) : 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== "all") {
              e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.05)';
            }
          }}
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
            className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm transition-all duration-500 backdrop-blur-md border"
            style={{
              backgroundColor: selectedCategory === category.name 
                ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.1) : 'rgba(59, 130, 246, 0.1)') 
                : (theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)'),
              borderColor: selectedCategory === category.name
                ? (theme?.accentColor ? hexToRgba(theme.accentColor, 0.2) : 'rgba(59, 130, 246, 0.2)')
                : 'rgba(107, 114, 128, 0.05)',
              color: selectedCategory === category.name 
                ? (theme?.accentColor || 'rgb(59, 130, 246)') 
                : (theme?.mutedTextColor || 'rgb(156, 163, 175)'),
              fontWeight: 400
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category.name) {
                e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.05) : 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category.name) {
                e.currentTarget.style.backgroundColor = theme?.accentColor ? hexToRgba(theme.accentColor, 0.03) : 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.05)';
              }
            }}
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
