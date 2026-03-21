'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'

const DIFFICULTY_OPTIONS = [
  { value: 'junior', label: 'Junior', color: '#4ade80' },
  { value: 'mid',    label: 'Mid',    color: '#facc15' },
  { value: 'senior', label: 'Senior', color: '#f87171' },
]

const TYPE_OPTIONS = [
  { value: 'code',     label: '{ } Code' },
  { value: 'scenario', label: '/// Scenario' },
]

export function ChallengeFilters() {
  const router = useRouter()
  const params = useSearchParams()

  function toggle(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (params.get(key) === value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    router.push(`/challenges?${next.toString()}`)
  }

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) { next.set(key, value) } else { next.delete(key) }
    router.push(`/challenges?${next.toString()}`)
  }

  const activeSkill = params.get('skill') ?? ''
  const activeType = params.get('type') ?? ''
  const activeDiff = params.get('difficulty') ?? ''
  const hasFilters = activeSkill || activeType || activeDiff || params.get('track')

  const pillBase: React.CSSProperties = {
    fontFamily: 'var(--mono)',
    fontSize: '10px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    cursor: 'pointer',
    border: '1px solid var(--border)',
    background: 'none',
    color: 'var(--text-faint)',
    transition: 'all 0.12s',
    whiteSpace: 'nowrap' as const,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Difficulty pills */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px', width: '48px', flexShrink: 0 }}>Level</span>
        {DIFFICULTY_OPTIONS.map(opt => {
          const active = activeDiff === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => toggle('difficulty', opt.value)}
              data-active={active ? 'true' : 'false'}
              style={{
                ...pillBase,
                borderColor: active ? opt.color : 'var(--border)',
                color: active ? opt.color : 'var(--text-faint)',
                background: active ? `${opt.color}12` : 'none',
              }}
              onMouseEnter={e => { if (e.currentTarget.dataset.active !== 'true') { e.currentTarget.style.borderColor = 'var(--border-hi)'; e.currentTarget.style.color = 'var(--text-dim)' }}}
              onMouseLeave={e => { if (e.currentTarget.dataset.active !== 'true') { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-faint)' }}}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Type pills */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px', width: '48px', flexShrink: 0 }}>Type</span>
        {TYPE_OPTIONS.map(opt => {
          const active = activeType === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => toggle('type', opt.value)}
              data-active={active ? 'true' : 'false'}
              style={{
                ...pillBase,
                borderColor: active ? 'var(--accent)' : 'var(--border)',
                color: active ? 'var(--accent)' : 'var(--text-faint)',
                background: active ? 'rgba(200,241,53,0.08)' : 'none',
              }}
              onMouseEnter={e => { if (e.currentTarget.dataset.active !== 'true') { e.currentTarget.style.borderColor = 'var(--border-hi)'; e.currentTarget.style.color = 'var(--text-dim)' }}}
              onMouseLeave={e => { if (e.currentTarget.dataset.active !== 'true') { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-faint)' }}}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Skill select */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px', width: '48px', flexShrink: 0 }}>Skill</span>
        <div style={{ position: 'relative' }}>
          <select
            aria-label="Filter by skill"
            value={activeSkill}
            onChange={e => update('skill', e.target.value)}
            style={{
              ...pillBase,
              paddingRight: '24px',
              appearance: 'none',
              WebkitAppearance: 'none',
              outline: 'none',
              borderColor: activeSkill ? 'var(--accent)' : 'var(--border)',
              color: activeSkill ? 'var(--accent)' : 'var(--text-faint)',
              background: activeSkill ? 'rgba(200,241,53,0.08)' : 'none',
            }}
          >
            <option value="">All Skills</option>
            {SKILL_SLUGS.map(s => <option key={s} value={s}>{SKILL_AREAS[s].label}</option>)}
          </select>
          <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: '8px', pointerEvents: 'none' }}>▼</span>
        </div>

        {hasFilters && (
          <button
            onClick={() => router.push('/challenges')}
            style={{ ...pillBase, marginLeft: '8px', color: 'var(--text-faint)', borderStyle: 'dashed' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            Clear ×
          </button>
        )}
      </div>
    </div>
  )
}
