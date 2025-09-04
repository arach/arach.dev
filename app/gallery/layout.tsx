import type { Metadata } from 'next'
import './application/globals.css'
import '../../themes/application/terminal.css'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Interactive gallery and design system showcase',
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`gallery-container`}>
      {children}
    </div>
  )
}
