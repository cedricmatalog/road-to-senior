import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-rate-limit-impl',
  title: 'Implement an In-Memory Rate Limiter',
  description: 'Implement `createRateLimiter(limit, windowMs)` — returns a function that returns true if a client is within the rate limit, false if they\'ve exceeded it.',
  type: 'code',
  difficulty: 'mid',
  skills: ['security', 'performance'],
  content: {
    overview: `A fixed-window rate limiter counts requests per client in a time window. When the window expires, the count resets. Simple to implement, but has a boundary burst problem — a client can double-hit at window boundaries. Good enough for most use cases.`,
    starterCode: `// createRateLimiter(limit, windowMs) returns isAllowed(clientId).
// Each client can make at most 'limit' requests per 'windowMs' window.
// Requests outside the window are dropped from the count.

function createRateLimiter(limit, windowMs) {
  // your code here
}`,
    solution: `function createRateLimiter(limit, windowMs) {
  const clients = new Map()
  return function isAllowed(clientId) {
    const now = Date.now()
    const entry = clients.get(clientId)
    if (!entry || now - entry.windowStart >= windowMs) {
      clients.set(clientId, { count: 1, windowStart: now })
      return true
    }
    if (entry.count < limit) {
      entry.count++
      return true
    }
    return false
  }
}`,
    explanation: `Each client gets an entry with a count and window start time. If the window has expired (or the client is new), reset with count=1 and return true. If the count is below the limit, increment and allow. Otherwise, deny. The Map grows unboundedly in this implementation — production rate limiters use Redis with TTL keys so memory is bounded automatically.`,
    hints: [
      'Store per-client state in a Map: { count, windowStart }.',
      'On each request: check if the window has expired — if so, reset. Otherwise, check and increment the count.',
      'Return false (deny) only when count >= limit and the window hasn\'t expired.',
    ],
    testCases: [
      {
        description: 'allows requests within the limit',
        explanation: 'The first N requests within the window must all return true.',
        testCode: `
function createRateLimiter(limit, windowMs) {
  const clients = new Map()
  return function(clientId) {
    const now = Date.now()
    const entry = clients.get(clientId)
    if (!entry || now - entry.windowStart >= windowMs) { clients.set(clientId, { count: 1, windowStart: now }); return true }
    if (entry.count < limit) { entry.count++; return true }
    return false
  }
}
const isAllowed = createRateLimiter(3, 1000)
const results = [isAllowed('ip1'), isAllowed('ip1'), isAllowed('ip1')]
if (results.every(r => r === true)) { console.log("PASS") } else { console.log("FAIL: " + results) }`,
      },
      {
        description: 'blocks requests exceeding the limit',
        explanation: 'The (limit+1)th request within the window must return false.',
        testCode: `
function createRateLimiter(limit, windowMs) {
  const clients = new Map()
  return function(clientId) {
    const now = Date.now()
    const entry = clients.get(clientId)
    if (!entry || now - entry.windowStart >= windowMs) { clients.set(clientId, { count: 1, windowStart: now }); return true }
    if (entry.count < limit) { entry.count++; return true }
    return false
  }
}
const isAllowed = createRateLimiter(2, 1000)
isAllowed('ip1'); isAllowed('ip1')
if (isAllowed('ip1') === false) { console.log("PASS") } else { console.log("FAIL: should have been blocked") }`,
      },
    ],
  },
}
export default challenge
