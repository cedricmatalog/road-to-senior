import { describe, it, expect } from 'vitest'
import { SKILL_SLUGS } from '@/lib/skills'
import type { Challenge, ScenarioContent } from '@/lib/types'

import asyncPromiseChain from '@/data/challenges/async-promise-chain'
import closuresCounter from '@/data/challenges/closures-counter'
import errorHandlingFetch from '@/data/challenges/error-handling-fetch'
import codeReviewPrFeedback from '@/data/challenges/code-review-pr-feedback'
import debuggingSilentBug from '@/data/challenges/debugging-silent-bug'
import systemDesignRateLimit from '@/data/challenges/system-design-rate-limit'

const allChallenges: Challenge[] = [
  asyncPromiseChain, closuresCounter, errorHandlingFetch,
  codeReviewPrFeedback, debuggingSilentBug, systemDesignRateLimit,
]

describe('challenge data validation', () => {
  it('all challenges have required fields', () => {
    for (const c of allChallenges) {
      expect(c.slug, `${c.slug} missing slug`).toBeTruthy()
      expect(c.title, `${c.slug} missing title`).toBeTruthy()
      expect(c.description, `${c.slug} missing description`).toBeTruthy()
      expect(['code', 'scenario']).toContain(c.type)
      expect(['junior', 'mid', 'senior']).toContain(c.difficulty)
    }
  })

  it('all skill tags are valid SkillSlugs', () => {
    for (const c of allChallenges) {
      for (const skill of c.skills) {
        expect(SKILL_SLUGS, `${c.slug} has unknown skill: ${skill}`).toContain(skill)
      }
    }
  })

  it('scenario challenges have exactly one recommended option', () => {
    for (const c of allChallenges.filter(c => c.type === 'scenario')) {
      const content = c.content as ScenarioContent
      const recommended = content.options.filter(o => o.isRecommended)
      expect(recommended, `${c.slug} must have exactly 1 recommended option`).toHaveLength(1)
    }
  })

  it('code challenges have at least one test case', () => {
    for (const c of allChallenges.filter(c => c.type === 'code')) {
      const content = c.content as { testCases: unknown[] }
      expect(content.testCases.length, `${c.slug} needs at least 1 test case`).toBeGreaterThan(0)
    }
  })

  it('all slugs are unique', () => {
    const slugs = allChallenges.map(c => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
