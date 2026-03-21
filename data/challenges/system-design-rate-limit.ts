import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-rate-limit',
  title: 'Design a Simple Rate Limiter',
  description: 'Your API is being hammered by a single client. How do you design a basic rate limiter?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'Rate limiting is an infrastructure concern, not an application concern. Use the right tool — a shared, atomic counter in Redis — and avoid in-memory solutions that break when you scale.',
    situation: `A single client is making 10,000 requests per minute to your REST API, causing slow responses for everyone else. You need to add rate limiting. Your stack is Node.js with Redis available. You need to ship something in 2 hours. What approach do you take?`,
    options: [
      {
        id: 'a',
        label: 'Use a fixed window counter in Redis with INCR and EXPIRE per client IP',
        explanation: 'This is the right call for a 2-hour window. Redis INCR with EXPIRE gives you an atomic, fast, persistent counter per client — that\'s the fixed window algorithm (reset every N seconds). It\'s simple, fast, and handles the 10k/min abuse case well. The downside is burst traffic at window boundaries, but for emergency rate limiting that tradeoff is fine. A library like `rate-limiter-flexible` wraps this and offers sliding window if you need it later.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Implement an in-memory token bucket per client in the Node.js process',
        explanation: "Works for a single server, but breaks immediately when you scale to multiple instances — each server has its own bucket. Since Redis is available, use it.",
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Block the offending IP at the infrastructure level (firewall/load balancer)',
        explanation: "Reasonable as an emergency measure, but it's not a rate limiter — it's a ban. Real rate limiting should allow legitimate traffic below the threshold and be configurable per client, not a blunt block.",
        isRecommended: false,
      },
    ],
  },
}
export default challenge
