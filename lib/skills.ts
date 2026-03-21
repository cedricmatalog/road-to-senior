import type { SkillSlug } from './types'

export const SKILL_AREAS: Record<SkillSlug, { label: string; category: 'technical' | 'mindset' }> = {
  'async-js':             { label: 'Async JS',              category: 'technical' },
  'error-handling':       { label: 'Error Handling',         category: 'technical' },
  'performance':          { label: 'Performance',            category: 'technical' },
  'architecture':         { label: 'Architecture',           category: 'technical' },
  'testing':              { label: 'Testing',                category: 'technical' },
  'typescript':           { label: 'TypeScript',             category: 'technical' },
  'security':             { label: 'Security',               category: 'technical' },
  'closures-scope':       { label: 'Closures & Scope',       category: 'technical' },
  'promises-concurrency': { label: 'Promises & Concurrency', category: 'technical' },
  'dom-browser':          { label: 'DOM & Browser APIs',     category: 'technical' },
  'code-review':          { label: 'Code Review',            category: 'mindset' },
  'debugging':            { label: 'Debugging',              category: 'mindset' },
  'communication':        { label: 'Communication',          category: 'mindset' },
  'mentoring':            { label: 'Mentoring',              category: 'mindset' },
  'system-design':        { label: 'System Design',          category: 'mindset' },
  'estimation':           { label: 'Estimation',             category: 'mindset' },
  'refactoring':          { label: 'Refactoring',            category: 'mindset' },
}

export const SKILL_SLUGS = Object.keys(SKILL_AREAS) as SkillSlug[]
