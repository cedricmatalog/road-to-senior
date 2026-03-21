export type SkillSlug =
  | 'javascript' | 'async-js' | 'error-handling' | 'performance' | 'architecture'
  | 'testing' | 'typescript' | 'security' | 'closures-scope'
  | 'promises-concurrency' | 'dom-browser'
  | 'code-review' | 'debugging' | 'communication'
  | 'mentoring' | 'system-design' | 'estimation' | 'refactoring'
  | 'api-design' | 'observability' | 'ci-cd' | 'tradeoffs' | 'incident-response'
  | 'web-performance' | 'accessibility' | 'documentation'

export interface CodeContent {
  overview?: string
  starterCode?: string
  hints?: string[]
  solution?: string
  explanation?: string
  testCases: Array<{
    description: string
    testCode: string
    explanation?: string
  }>
}

export interface ScenarioContent {
  overview?: string
  situation: string
  options: Array<{
    id: string
    label: string
    explanation: string
    isRecommended: boolean
  }>
}

export type Challenge =
  | {
      slug: string
      title: string
      description: string
      type: 'code'
      difficulty: 'junior' | 'mid' | 'senior'
      skills: SkillSlug[]
      content: CodeContent
    }
  | {
      slug: string
      title: string
      description: string
      type: 'scenario'
      difficulty: 'junior' | 'mid' | 'senior'
      skills: SkillSlug[]
      content: ScenarioContent
    }

export interface StoredProgress {
  version: 1
  completed: string[]
}
