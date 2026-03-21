'use client'

import { useProgress } from '@/context/ProgressContext'

export function ChallengeCardCompleted({ slug }: { slug: string }) {
  const { completed } = useProgress()
  if (!completed.includes(slug)) return null
  return (
    <span style={{
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '2px',
      background: 'var(--accent)',
      opacity: 0.7,
    }} />
  )
}
