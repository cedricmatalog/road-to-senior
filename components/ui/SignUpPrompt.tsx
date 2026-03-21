'use client'

import { useEffect, useState } from 'react'

const DISMISSED_KEY = 'rts:prompt-dismissed'

// Always rendered so it can read sessionStorage on mount.
// Only becomes visible after the user has completed at least one challenge (showAfterCompletion=true)
// and has not dismissed the prompt this session.
export function SignUpPrompt({ showAfterCompletion }: { showAfterCompletion: boolean }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!showAfterCompletion) return
    const dismissed = sessionStorage.getItem(DISMISSED_KEY)
    if (!dismissed) setVisible(true)
  }, [showAfterCompletion])

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex items-start gap-3 z-50">
      <p className="text-sm text-gray-700 flex-1">
        Save your progress across devices —{' '}
        <a href="/sign-up" className="text-blue-600 underline hover:text-blue-800">
          create a free account
        </a>
      </p>
      <button onClick={dismiss} aria-label="Dismiss" className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
    </div>
  )
}
