import type { Metadata } from 'next'
import './application/globals.css'
import './gallery-overrides.css'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import { GeistSans, GeistMono } from 'geist/font'

// Style Guide UI Fonts
const geistSans = GeistSans
const geistMono = GeistMono

// Theme Demonstration Fonts
const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Style Guide',
  description: 'Interactive style guide and design system showcase',
}

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`styleguide-container ${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}>
      {children}
    </div>
  )
}