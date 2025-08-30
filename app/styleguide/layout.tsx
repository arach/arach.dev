import type { Metadata } from 'next'
import './globals.css'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import { Geist } from 'next/font/google'

// Style Guide UI Font
const geist = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

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
    <div className={`styleguide-container ${geist.variable} ${manrope.variable} ${jetbrainsMono.variable} font-geist antialiased`}>
      {children}
    </div>
  )
}