'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, Children, isValidElement } from 'react'

interface ConditionalLayoutProps {
  children: ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isGallery = pathname.startsWith('/gallery')
  
  const childrenArray = Children.toArray(children)

  if (isGallery) {
    // For gallery routes, only render the main element
    return (
      <>
        {childrenArray.filter((child) => 
          isValidElement(child) && child.type === 'main'
        )}
      </>
    )
  }

  // For non-gallery routes, render all components
  return <>{children}</>
}