'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'

export function ChallengeFilters() {
  const router = useRouter()
  const params = useSearchParams()

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) { next.set(key, value) } else { next.delete(key) }
    router.push(`/challenges?${next.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        value={params.get('skill') ?? ''}
        onChange={e => update('skill', e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
      >
        <option value="">All Skills</option>
        {SKILL_SLUGS.map(s => (
          <option key={s} value={s}>{SKILL_AREAS[s].label}</option>
        ))}
      </select>

      <select
        value={params.get('type') ?? ''}
        onChange={e => update('type', e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
      >
        <option value="">All Types</option>
        <option value="code">Code</option>
        <option value="scenario">Scenario</option>
      </select>

      <select
        value={params.get('difficulty') ?? ''}
        onChange={e => update('difficulty', e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
      >
        <option value="">All Levels</option>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
    </div>
  )
}
