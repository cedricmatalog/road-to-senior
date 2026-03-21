import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'code-review-api-design',
  title: 'Reviewing an API Design',
  description: 'A PR introduces a new REST endpoint with a design that violates REST conventions. How do you review it?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['code-review', 'architecture'],
  content: {
    overview: 'Good API design is as important as correct code. REST conventions exist because they create predictable, cacheable, self-documenting interfaces — violations compound across a codebase.',
    situation: `A PR adds a new endpoint: POST /getUsers?active=true. The body contains filter params. This is wrong in two ways: (1) GET requests shouldn't have side effects, "get" in the URL path violates REST conventions — reading should use GET, (2) query filters belong in query params for GET, not request body. The code works correctly. The author is a mid-level dev. How do you comment?`,
    options: [
      {
        id: 'a',
        label: 'Request changes: explain REST conventions, suggest GET /users?active=true, and explain why it matters (cacheability, semantics, tooling expectations)',
        explanation: 'API design mistakes compound — once this ships, every caller uses it and it becomes impossible to change. Explain the principle: GET is safe and idempotent — HTTP caches, CDNs, and tools assume GET doesn\'t change state. "POST /getUsers" will confuse every developer who reads it. "GET /users?active=true" is self-documenting, cacheable, and consistent with every REST API on the internet. This review is worth a request-changes even though the code "works" — API design is as important as correctness.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Approve it — it works correctly and REST conventions are just guidelines, not hard rules',
        explanation: 'REST conventions are "just guidelines" until you\'re debugging why your CDN isn\'t caching read endpoints, or why your Swagger docs look wrong, or why a new developer is confused. Convention violations compound over time and make codebases harder to maintain. Review is the right time to fix them.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Leave a comment suggesting the change but approve so it doesn\'t block the PR',
        explanation: 'If the feedback is worth making, it\'s worth blocking on. "Approved but..." comments are systematically ignored. If you\'re fine with it shipping as-is, say so and explain why. If you\'re not, block and explain.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
