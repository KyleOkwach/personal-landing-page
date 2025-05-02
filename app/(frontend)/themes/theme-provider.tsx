"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// This creates a completely empty shell for server-side rendering
export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so this will prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial client render, render the provider without any theme functionality
  if (!mounted) {
    return <>{children}</>
  }

  // After hydration, render the full provider with all theme functionality
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}