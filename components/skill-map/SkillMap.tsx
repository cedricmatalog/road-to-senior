'use client'

import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'
import { useProgress } from '@/context/ProgressContext'
import { SkillCard } from './SkillCard'

interface SkillMapProps {
  challenges: Array<{ slug: string; skills: string[] }>
}

export function SkillMap({ challenges }: SkillMapProps) {
  const { completed } = useProgress()
  const completedSet = new Set(completed)

  function coverageFor(slug: string): number {
    const relevant = challenges.filter(c => c.skills.includes(slug))
    if (relevant.length === 0) return 0
    const done = relevant.filter(c => completedSet.has(c.slug)).length
    return done / relevant.length
  }

  const technical = SKILL_SLUGS.filter(s => SKILL_AREAS[s].category === 'technical')
  const mindset = SKILL_SLUGS.filter(s => SKILL_AREAS[s].category === 'mindset')

  const SectionLabel = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>{children}</p>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <section>
        <SectionLabel>Technical</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1px', background: 'var(--border)' }}>
          {technical.map(slug => (
            <SkillCard key={slug} slug={slug} label={SKILL_AREAS[slug].label} coverage={coverageFor(slug)} />
          ))}
        </div>
      </section>
      <section>
        <SectionLabel>Engineering Mindset</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1px', background: 'var(--border)' }}>
          {mindset.map(slug => (
            <SkillCard key={slug} slug={slug} label={SKILL_AREAS[slug].label} coverage={coverageFor(slug)} />
          ))}
        </div>
      </section>
    </div>
  )
}
