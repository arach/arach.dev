import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  )
}