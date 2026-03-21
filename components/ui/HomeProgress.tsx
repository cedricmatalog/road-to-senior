'use client'

import Link from 'next/link'
import { useProgress } from '@/context/ProgressContext'
import { ALL_CHALLENGES } from '@/lib/challenges'

export function HomeProgress() {
  const { completed } = useProgress()
  if (completed.length === 0) return null

  const total = ALL_CHALLENGES.length
  const pct = Math.round((completed.length / total) * 100)
  const nextChallenge = ALL_CHALLENGES.find(c => !completed.includes(c.slug))

  return (
    <div style={{
      marginTop: '32px',
      padding: '20px 24px',
      background: 'rgba(200,241,53,0.04)',
      border: '1px solid rgba(200,241,53,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '24px', fontWeight: 500, color: 'var(--accent)' }}>{pct}<span style={{ fontSize: '13px', color: 'var(--accent-dim)' }}>%</span></span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 2px' }}>Your progress</p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--text-dim)', margin: 0 }}>
            {completed.length} of {total} challenges completed
          </p>
        </div>
      </div>
      {nextChallenge && (
        <Link href={`/challenges/${nextChallenge.slug}`} style={{
          fontFamily: 'var(--mono)', fontSize: '12px',
          color: 'var(--bg)', background: 'var(--accent)',
          padding: '10px 20px', textDecoration: 'none',
          letterSpacing: '0.06em', flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          Continue →
        </Link>
      )}
      {!nextChallenge && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.08em' }}>
          ✓ All complete
        </span>
      )}
    </div>
  )
}
