'use client'

import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'
import { useProgress } from '@/context/ProgressContext'
import { SkillCard } from './SkillCard'

interface SkillMapProps {
  challenges: Array<{ slug: string; skills: string[] }>
}

export function SkillMap({ challenges }: SkillMapProps) {
  const { completed } = useProgress()

  function coverageFor(slug: string): number {
    const total = challenges.filter(c => c.skills.includes(slug)).length
    if (total === 0) return 0
    const done = challenges.filter(c => c.skills.includes(slug) && completed.includes(c.slug)).length
    return done / total
  }

  const technical = SKILL_SLUGS.filter(s => SKILL_AREAS[s].category === 'technical')
  const mindset = SKILL_SLUGS.filter(s => SKILL_AREAS[s].category === 'mindset')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Technical</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {technical.map(slug => (
            <SkillCard key={slug} slug={slug} label={SKILL_AREAS[slug].label} coverage={coverageFor(slug)} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Engineering Mindset</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {mindset.map(slug => (
            <SkillCard key={slug} slug={slug} label={SKILL_AREAS[slug].label} coverage={coverageFor(slug)} />
          ))}
        </div>
      </section>
    </div>
  )
}
