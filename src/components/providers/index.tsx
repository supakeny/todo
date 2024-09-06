'use client'

import { Toaster } from '../ui/toaster'
import { TooltipProvider } from '../ui/tooltip'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers ({ children }: ProvidersProps) {
  return (
    <>
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
      <Toaster />
    </>
  )
}
