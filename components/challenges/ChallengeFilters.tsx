'use client'

import { useRouter } from 'next/navigation'
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

interface Props {
  activeDiff: string
  activeType: string
  activeSkill: string
  hasFilters: boolean
}

export function ChallengeFilters({ activeDiff, activeType, activeSkill, hasFilters }: Props) {
  const router = useRouter()

  function toggle(key: string, value: string) {
    const params = new URLSearchParams(window.location.search)
    if (params.get(key) === value) { params.delete(key) } else { params.set(key, value) }
    router.push(`/challenges?${params.toString()}`)
  }

  function update(key: string, value: string) {
    const params = new URLSearchParams(window.location.search)
    if (value) { params.set(key, value) } else { params.delete(key) }
    router.push(`/challenges?${params.toString()}`)
  }

  const pill = (active: boolean, color?: string): React.CSSProperties => ({
    fontFamily: 'var(--mono)',
    fontSize: '10px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '5px 10px',
    cursor: 'pointer',
    border: `1px solid ${active && color ? color : active ? 'var(--accent)' : 'var(--border)'}`,
    background: active && color ? `${color}14` : active ? 'rgba(200,241,53,0.08)' : 'transparent',
    color: active && color ? color : active ? 'var(--accent)' : 'var(--text-faint)',
    transition: 'all 0.12s',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    lineHeight: 1,
    WebkitTapHighlightColor: 'transparent',
  })

  const divider: React.CSSProperties = {
    width: '1px',
    height: '14px',
    background: 'var(--border)',
    flexShrink: 0,
    alignSelf: 'center',
  }

  return (
    <div className="filter-bar">
      {/* Row 1 (mobile): difficulty pills */}
      <div className="filter-row">
        {DIFFICULTY_OPTIONS.map(opt => {
          const active = activeDiff === opt.value
          return (
            <button
              key={opt.value}
              className="filter-pill"
              data-active={active ? 'true' : 'false'}
              onClick={() => toggle('difficulty', opt.value)}
              style={pill(active, opt.color)}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Row 2 (mobile): type pills */}
      <div className="filter-row">
        {TYPE_OPTIONS.map(opt => {
          const active = activeType === opt.value
          return (
            <button
              key={opt.value}
              className="filter-pill"
              data-active={active ? 'true' : 'false'}
              onClick={() => toggle('type', opt.value)}
              style={pill(active)}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Row 3 (mobile): skill select + clear */}
      <div className="filter-row">
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <select
            aria-label="Filter by skill"
            className="filter-skill"
            value={activeSkill}
            onChange={e => update('skill', e.target.value)}
            style={{
              borderColor: activeSkill ? 'var(--accent)' : 'var(--border)',
              color: activeSkill ? 'var(--accent)' : 'var(--text-faint)',
              background: activeSkill ? 'rgba(200,241,53,0.08)' : 'transparent',
            }}
          >
            <option value="">All Skills</option>
            {SKILL_SLUGS.map(s => <option key={s} value={s}>{SKILL_AREAS[s].label}</option>)}
          </select>
          <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: '8px', pointerEvents: 'none' }}>▼</span>
        </div>

        {hasFilters && (
          <>
            <span style={divider} />
            <button
              className="filter-pill"
              onClick={() => router.push('/challenges')}
              style={{ ...pill(false), borderStyle: 'dashed' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              Clear ×
            </button>
          </>
        )}
      </div>
    </div>
  )
}
