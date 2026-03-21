'use client'

import Link from 'next/link'

interface SkillCardProps {
  label: string
  slug: string
  coverage: number
}

export function SkillCard({ label, slug, coverage }: SkillCardProps) {
  const isGap = coverage <= 0.3
  const pct = Math.round(coverage * 100)

  return (
    <Link
      href={`/challenges?skill=${slug}`}
      data-testid="skill-card"
      data-gap={String(isGap)}
      style={{
        display: 'block',
        padding: '16px',
        background: 'var(--bg-card)',
        border: `1px solid ${isGap ? 'var(--border)' : 'var(--border)'}`,
        textDecoration: 'none',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hi)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: isGap ? 'var(--amber)' : 'var(--text-dim)', margin: 0, letterSpacing: '0.04em', lineHeight: 1.4 }}>
          {label}
        </p>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: pct > 0 ? 'var(--accent)' : 'var(--text-faint)', letterSpacing: '0.05em', flexShrink: 0, marginLeft: '8px' }}>
          {pct}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} completion: ${pct}%`}
        style={{ height: '2px', background: 'var(--bg-raised)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: pct === 0 ? 'transparent' : isGap ? 'var(--amber)' : 'var(--accent)',
          transition: 'width 0.6s ease',
        }} />
      </div>
    </Link>
  )
}
