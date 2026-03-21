'use client'

import { useState } from 'react'
import { useProgress } from '@/context/ProgressContext'
import { ALL_CHALLENGES } from '@/lib/challenges'

export default function SettingsPage() {
  const { completed, resetProgress } = useProgress()
  const [confirmed, setConfirmed] = useState(false)

  function handleReset() {
    if (!confirmed) {
      setConfirmed(true)
      return
    }
    resetProgress()
    setConfirmed(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: '8px' }}>Settings</h1>
      <p style={{ color: 'var(--text-dim)', fontSize: 'var(--text-sm)', marginBottom: '48px' }}>Manage your local data.</p>

      <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '24px' }}>
        <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '4px' }}>Reset Progress</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: 'var(--text-sm)', marginBottom: '20px' }}>
          {completed.length} of {ALL_CHALLENGES.length} challenges completed. This will clear all progress from your browser.
        </p>

        <button
          onClick={handleReset}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.06em',
            padding: '8px 16px',
            border: `1px solid ${confirmed ? '#f87171' : 'var(--border)'}`,
            borderRadius: '4px',
            background: confirmed ? 'rgba(248,113,113,0.1)' : 'transparent',
            color: confirmed ? '#f87171' : 'var(--text-dim)',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {confirmed ? 'Click again to confirm' : 'Reset all progress'}
        </button>
        {confirmed && (
          <button
            onClick={() => setConfirmed(false)}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.06em',
              padding: '8px 16px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              background: 'transparent',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              marginLeft: '8px',
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
