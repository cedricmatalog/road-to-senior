import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-strategy',
  title: 'Building a Testing Strategy from Scratch',
  description: 'You\'re joining a team with no tests. Where do you start?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['testing'],
  content: {
    overview: 'When building a test suite from scratch, optimise for risk reduction, not coverage metrics. Integration tests on critical paths protect what matters most with the least investment.',
    situation: `You join a team with a 2-year-old Node.js API that has zero tests. The code works but bugs make it to production regularly. The team wants to add tests but nobody knows where to start. There are 200+ endpoints. The team has a week to put something in place before a major feature freeze. Where do you start?`,
    options: [
      {
        id: 'a',
        label: 'Start with integration tests for the most critical paths (auth, payments, core business flows) — not unit tests, and not 100% coverage',
        explanation: 'With zero tests and limited time, optimise for maximum risk reduction, not coverage. Integration tests against the real database and real business logic catch the bugs that matter most. Unit tests for code without tests first require extracting logic — slow and risky in a legacy codebase. Don\'t start at the bottom of the test pyramid (unit) when the foundation doesn\'t exist — start at the integration level for critical paths. Focus on: what would cause the most pain if it broke? (auth, payments, data mutation). Leave low-risk, stable endpoints for later. The goal is a safety net, not perfection.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Write unit tests for every utility function first — build up from the bottom of the test pyramid',
        explanation: 'Unit tests for utility functions are low-risk but also low-value for a legacy codebase — utilities rarely break. The high-risk code is the business logic in API handlers and service functions. Starting at the bottom of the pyramid means weeks of work before you\'ve protected anything that matters.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Set a coverage threshold of 80% and require it to pass in CI before any new PRs can merge',
        explanation: 'A coverage threshold with zero existing tests means the first PR must write all the tests — instant team resentment. Coverage is a lagging metric, not a strategy. Start with tests for what matters, establish the pattern, then set incremental coverage requirements (e.g. "new code must be tested").',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
