'use client'

import Link from 'next/link'
import { useProgress } from '@/context/ProgressContext'
import { ALL_CHALLENGES } from '@/lib/challenges'
import { SKILL_AREAS } from '@/lib/skills'

const SKILLS = (Object.entries(SKILL_AREAS) as [string, { label: string; category: 'technical' | 'mindset' }][])
  .map(([slug, { label, category }]) => ({ slug, label, category }))

const DIFFICULTY_COLORS: Record<string, string> = {
  junior: 'var(--accent)',
  mid: 'var(--amber)',
  senior: 'var(--red)',
}

function RadialScore({ pct, size = 120 }: { pct: number; size?: number }) {
  const r = size / 2 - 10
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={4} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={pct >= 100 ? 'var(--accent)' : pct >= 50 ? 'var(--amber)' : 'var(--text-faint)'}
        strokeWidth={4}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
    </svg>
  )
}

function SkillBar({ skillSlug, label, completed }: { skillSlug: string; label: string; completed: string[] }) {
  const total = ALL_CHALLENGES.filter(c => c.skills.includes(skillSlug as any)).length
  const done = ALL_CHALLENGES.filter(c => c.skills.includes(skillSlug as any) && completed.includes(c.slug)).length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const isComplete = done === total && total > 0

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 48px', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: isComplete ? 'var(--accent)' : 'var(--text-dim)', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {isComplete ? '✓ ' : ''}{label}
      </span>
      <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: isComplete ? 'var(--accent)' : pct > 0 ? 'var(--amber)' : 'var(--border)', transition: 'width 0.5s ease', borderRadius: '2px' }} />
      </div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', textAlign: 'right' }}>
        {done}/{total}
      </span>
    </div>
  )
}

export default function ProgressPage() {
  const { completed } = useProgress()
  const total = ALL_CHALLENGES.length
  const done = completed.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  const byDifficulty = (['junior', 'mid', 'senior'] as const).map(level => {
    const all = ALL_CHALLENGES.filter(c => c.difficulty === level)
    const d = all.filter(c => completed.includes(c.slug)).length
    return { level, done: d, total: all.length }
  })

  const technicalSkills = SKILLS.filter(s => s.category === 'technical')
  const mindsetSkills = SKILLS.filter(s => s.category === 'mindset')

  const recentSlugs = [...completed].reverse().slice(0, 8)
  const recentChallenges = recentSlugs.map(slug => ALL_CHALLENGES.find(c => c.slug === slug)).filter(Boolean)

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid var(--border)', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Your Journey</p>
        <h1 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Progress</h1>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)', margin: 0 }}>
          Track your road to senior engineer.
        </p>
      </div>

      {/* Overall score */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', marginBottom: '48px', padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', flexShrink: 0 }}>
          <RadialScore pct={pct} size={140} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--text)', lineHeight: 1 }}>{pct}<span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>%</span></div>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>complete</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)', marginBottom: '4px', letterSpacing: '0.04em' }}>
              {done} of {total} challenges completed
            </div>
            {pct === 0 && (
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', margin: 0 }}>
                Start with the <Link href="/tracks" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Junior track</Link> to begin your journey.
              </p>
            )}
            {pct > 0 && pct < 100 && (
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', margin: 0 }}>
                {total - done} challenges remaining. Keep going.
              </p>
            )}
            {pct === 100 && (
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--accent)', margin: 0 }}>
                Road to senior: complete. You made it.
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {byDifficulty.map(({ level, done: d, total: t }) => (
              <div key={level}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-base)', fontWeight: 500, color: DIFFICULTY_COLORS[level], lineHeight: 1, marginBottom: '2px' }}>
                  {d}<span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>/{t}</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 20px' }}>
            Technical Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {technicalSkills.map(s => (
              <SkillBar key={s.slug} skillSlug={s.slug} label={s.label} completed={completed} />
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--amber)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 20px' }}>
            Mindset Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mindsetSkills.map(s => (
              <SkillBar key={s.slug} skillSlug={s.slug} label={s.label} completed={completed} />
            ))}
          </div>
        </div>
      </div>

      {/* Recently completed */}
      {recentChallenges.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Recently Completed
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {recentChallenges.map(c => c && (
              <Link
                key={c.slug}
                href={`/challenges/${c.slug}`}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--surface)', textDecoration: 'none', transition: 'background 0.1s' }}
                className="progress-row"
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)' }}>✓</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)', flex: 1 }}>{c.title}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: DIFFICULTY_COLORS[c.difficulty], letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.difficulty}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{c.type}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA when not started */}
      {done === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginBottom: '20px' }}>
            — no challenges completed yet —
          </p>
          <Link
            href="/tracks"
            style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--bg)', background: 'var(--accent)', padding: '10px 24px', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Start a track
          </Link>
        </div>
      )}

      <style>{`
        .progress-row:hover { background: var(--bg-raised) !important; }
      `}</style>

      <div style={{ height: '64px' }} />
    </main>
  )
}
