'use client'

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { Volume2, VolumeX, HelpCircle, BarChart3 } from 'lucide-react'
import { GitHubContributions } from './'

interface HeaderActionsProps {
  audioEnabled: boolean
  onAudioToggle: () => void
  showHelp: boolean
  onHelpToggle: () => void
  showStats: boolean
  onStatsToggle: () => void
  keyboardMode: boolean
  onEnterKeyboardMode: () => void
  isMobile?: boolean
}

export function HeaderActions({
  audioEnabled,
  onAudioToggle,
  showHelp,
  onHelpToggle,
  showStats,
  onStatsToggle,
  keyboardMode,
  onEnterKeyboardMode,
  isMobile = false,
}: HeaderActionsProps) {
  const buttonSize = isMobile ? "icon" : "icon"
  const buttonClassName = isMobile 
    ? "h-6 w-6 text-gray-400 hover:text-gray-600" 
    : "h-7 w-7 text-gray-400 hover:text-gray-600"
  const iconSize = isMobile ? "h-3 w-3" : "h-3.5 w-3.5"

  return (
    <div className="flex items-center gap-2">
      {!isMobile && (
        <div className="hidden sm:block">
          <GitHubContributions username="arach" />
        </div>
      )}
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={buttonSize}
            className={buttonClassName}
            onClick={onStatsToggle}
          >
            <BarChart3 className={iconSize} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Show project statistics</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={buttonSize}
            className={buttonClassName}
            onClick={() => {
              onHelpToggle()
              if (!keyboardMode) onEnterKeyboardMode()
            }}
          >
            <HelpCircle className={iconSize} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Show keyboard shortcuts (?)</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={buttonSize}
            className={buttonClassName}
            onClick={onAudioToggle}
          >
            {audioEnabled ? <Volume2 className={iconSize} /> : <VolumeX className={iconSize} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{audioEnabled ? "Disable" : "Enable"} audio feedback</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
