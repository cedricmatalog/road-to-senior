import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-error-boundaries',
  title: 'Designing Error Handling Strategy',
  description: 'Your Express API has inconsistent error handling — some routes throw, some return 200 with error objects. How do you fix it?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['architecture', 'error-handling'],
  content: {
    overview: 'Inconsistent error handling creates unpredictable APIs and hard-to-debug systems. Centralised error middleware with standard HTTP codes and response shapes is the foundation of a maintainable API.',
    situation: `Your Express app's error handling is a mess: some routes throw exceptions (caught by Express's default handler, which returns HTML error pages to API clients), some return \`{ success: false, message: "..." }\` with HTTP 200, some return proper HTTP error codes. A new developer can't predict how to handle errors. You've been asked to standardise. What do you propose?`,
    options: [
      {
        id: 'a',
        label: 'Centralise error handling: use HTTP status codes correctly, a global error middleware, and a consistent error response shape across all routes',
        explanation: 'The right approach has three parts: (1) Use HTTP codes correctly — 400 for bad input, 401 for auth, 403 for forbidden, 404 for not found, 500 for server errors. Never return 200 with an error body. (2) A global error middleware in Express (the `(err, req, res, next)` signature) catches all thrown errors and formats them consistently. Routes just `throw new ValidationError("...")` or `next(err)`. (3) A standard error shape: `{ error: { code: "VALIDATION_ERROR", message: "..." } }`. This lets every API client handle errors the same way regardless of route.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Always return HTTP 200 with a success/error flag in the body — simpler for clients to handle',
        explanation: 'This breaks HTTP semantics. Monitoring tools, load balancers, and observability platforms use HTTP status codes to detect errors. A 200 response with `success: false` looks like a success to every HTTP-aware tool. You lose error rate monitoring, alerting, and cache-ability for free.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Document the current inconsistency so developers know which routes throw and which return error objects',
        explanation: 'Documentation doesn\'t fix inconsistency — it institutionalises it. Developers still have to handle each route differently. Consistency is more valuable than documentation of inconsistency.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
