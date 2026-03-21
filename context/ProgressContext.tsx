'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { loadProgress, saveProgress } from '@/lib/progress'

interface ProgressContextValue {
  completed: string[]
  markComplete: (slug: string) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    setCompleted(loadProgress().completed)
  }, [])

  const markComplete = useCallback((slug: string) => {
    setCompleted(prev => {
      if (prev.includes(slug)) return prev
      const next = [...prev, slug]
      saveProgress({ version: 1, completed: next })
      return next
    })
  }, [])

  return (
    <ProgressContext.Provider value={{ completed, markComplete }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
