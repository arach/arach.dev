'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'

interface HelpModalProps {
  showHelp: boolean
  keyboardMode: boolean
  onToggleHelp: () => void
}

export function HelpModal({ showHelp, keyboardMode, onToggleHelp }: HelpModalProps) {
  if (!showHelp && !keyboardMode) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden sm:block mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800 relative z-45"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <p className="font-medium">Keyboard Navigation {keyboardMode ? "Active" : "Available"}</p>
          {keyboardMode && !showHelp && (
            <div className="flex items-center gap-3 text-blue-600">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-white border border-blue-200 rounded">Esc</kbd>
                <span>to exit</span>
              </span>
              <span className="text-blue-400">•</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-white border border-blue-200 rounded">?</kbd>
                <span>for help</span>
              </span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-5 px-2 text-blue-600 hover:text-blue-800"
          onClick={onToggleHelp}
        >
          {showHelp ? "Hide" : "Show"} Help
        </Button>
      </div>
      {showHelp && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-1 text-xs"
        >
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="font-medium mb-1">Navigation:</p>
              <p>• ↑↓←→ or hjkl - Move between cards</p>
              <p>• ? - Toggle this help</p>
            </div>
            <div>
              <p className="font-medium mb-1">Categories:</p>
              <p>• n/p - Next/Previous category</p>
              <p>• 1/2/3 - Quick category select</p>
            </div>
            <div>
              <p className="font-medium mb-1">Actions:</p>
              <p>• Enter/Space - Open project</p>
              <p>• g - Open GitHub repo</p>
              <p>• s - Toggle sound</p>
            </div>
            <div>
              <p className="font-medium mb-1">Other:</p>
              <p>• Esc - Exit keyboard mode</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
