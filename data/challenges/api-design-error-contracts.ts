import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'api-design-error-contracts',
  title: 'Design Consistent API Error Responses',
  description: 'Your API returns inconsistent errors. Define a contract that clients can rely on.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['api-design', 'error-handling'],
  content: {
    overview: 'Error responses are part of your API contract. When errors are inconsistent, every client has to write defensive parsing code and guess at what fields exist. A predictable error shape lets clients handle failures generically.',
    situation: `Your API currently returns errors like this:\n\n400: { "message": "Invalid input" }\n404: { "error": "User not found" }\n422: "Validation failed: email is required"\n500: { "msg": "Something went wrong", "code": 500 }\n\nA frontend team is complaining they can't write a generic error handler. You need to define an error contract. What do you propose?`,
    options: [
      {
        id: 'a',
        label: 'Always return { error: { code: string, message: string, details?: unknown } } with the appropriate HTTP status',
        explanation: 'This is the right shape. A consistent wrapper with a machine-readable code (e.g. "VALIDATION_ERROR", "NOT_FOUND"), a human-readable message, and an optional details field for structured data like field-level validation errors. The HTTP status carries the category; the body carries the specifics. Clients can write one error handler that works everywhere.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Always return 200 with a success boolean and put error info in the body',
        explanation: 'This pattern (popularized by some older APIs) throws away HTTP semantics. Middleware, caches, and monitoring tools all use HTTP status codes. Returning 200 for errors means your error monitoring won\'t fire, caches may store the error response, and every client has to unwrap a success field before doing anything.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Document the current inconsistencies in an OpenAPI spec so clients know what to expect per endpoint',
        explanation: 'Documentation of inconsistency is better than nothing, but it forces every client to write endpoint-specific error handling. The fix is to make errors consistent, then document that. Don\'t document a problem — fix it.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Return different shapes per error category — validation errors get field details, server errors get a trace ID',
        explanation: 'Adding context is good (trace IDs for 5xx, field details for validation) but varying the top-level shape per category still breaks generic error handling. The fix: keep a consistent wrapper and add context inside the details field.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
