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
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px',
      maxWidth: '300px', zIndex: 50,
      background: 'var(--bg-raised)',
      border: '1px solid var(--border-hi)',
      padding: '16px 18px',
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>Progress</p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>
          Save across devices —{' '}
          <a href="/sign-up" style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent-dim)' }}>
            create a free account
          </a>
        </p>
      </div>
      <button onClick={dismiss} aria-label="Dismiss" style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--text-faint)', fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)',
        lineHeight: 1, padding: 0, flexShrink: 0,
        transition: 'color 0.15s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}>
        ×
      </button>
    </div>
  )
}
