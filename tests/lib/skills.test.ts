import { describe, it, expect } from 'vitest'
import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'

describe('SKILL_AREAS', () => {
  it('has exactly 17 entries', () => {
    expect(Object.keys(SKILL_AREAS)).toHaveLength(17)
  })

  it('every entry has label and category', () => {
    for (const [slug, area] of Object.entries(SKILL_AREAS)) {
      expect(area.label, `${slug} missing label`).toBeTruthy()
      expect(['technical', 'mindset']).toContain(area.category)
    }
  })

  it('SKILL_SLUGS matches SKILL_AREAS keys', () => {
    expect(SKILL_SLUGS).toEqual(Object.keys(SKILL_AREAS))
  })
})
