export type SkillSlug =
  | 'async-js' | 'error-handling' | 'performance' | 'architecture'
  | 'testing' | 'typescript' | 'security' | 'closures-scope'
  | 'promises-concurrency' | 'dom-browser'
  | 'code-review' | 'debugging' | 'communication'
  | 'mentoring' | 'system-design' | 'estimation' | 'refactoring'

export interface CodeContent {
  starterCode: string
  testCases: Array<{
    description: string
    testCode: string
  }>
}

export interface ScenarioContent {
  situation: string
  options: Array<{
    id: string
    label: string
    explanation: string
    isRecommended: boolean
  }>
}

export interface Challenge {
  slug: string
  title: string
  description: string
  type: 'code' | 'scenario'
  difficulty: 'junior' | 'mid' | 'senior'
  skills: SkillSlug[]
  content: CodeContent | ScenarioContent
}

export interface StoredProgress {
  version: 1
  completed: string[]
}
