import type { Metadata } from 'next'
import './globals.css'
import { JetBrains_Mono, Manrope } from 'next/font/google'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}