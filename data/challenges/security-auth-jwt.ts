import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-auth-jwt',
  title: 'JWT vs Session Tokens',
  description: 'You\'re building auth for a new API. Should you use JWTs or server-side sessions? What are the tradeoffs?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['security', 'architecture'],
  content: {
    overview: 'JWTs are stateless by design — you can\'t invalidate them. When your requirements include immediate revocation (logout, password changes), server-side sessions are the right tool.',
    situation: `You're building a new API with authentication. Two teammates have different opinions: one wants JWTs (stateless, scales easily), the other wants server-side sessions with Redis (can be invalidated instantly). Your app needs: user logout that actually works immediately, ability to revoke access when a user changes their password, and the API needs to scale to multiple servers. Which do you choose and why?`,
    options: [
      {
        id: 'a',
        label: 'Server-side sessions with Redis — given the requirement for immediate revocation, stateless JWTs are fundamentally wrong for this use case',
        explanation: 'JWTs are stateless by design — you can\'t "unissue" a JWT until it expires. If a user logs out or changes their password, their old JWT is still valid until expiry (typically 15min-24h). For an app that requires instant revocation, this is a security hole. Server-side sessions with Redis solve this: logout deletes the session, and the next request gets a 401. Redis solves the multi-server problem — all servers share the session store. The "JWTs scale better" argument is mostly irrelevant at typical scale — Redis handles millions of session lookups per second. Use JWTs for stateless, non-revocable tokens (short-lived API tokens between microservices). Use sessions for user auth that requires revocation.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'JWTs with short expiry (15 minutes) and refresh tokens — close enough to instant revocation',
        explanation: 'This is a reasonable compromise but 15 minutes of residual access after password change or logout is still a real security risk. The complexity of the refresh token flow also often gets implemented incorrectly, creating new vulnerabilities. If immediate revocation is a hard requirement, sessions are the right choice.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'JWTs with a Redis blocklist for revoked tokens — best of both worlds',
        explanation: 'A JWT blocklist works but you\'ve essentially built session management anyway — you\'re checking Redis on every request, storing token state in Redis, and managing expiry. At that point, you have the complexity of JWTs plus the infrastructure of sessions. Just use sessions.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
