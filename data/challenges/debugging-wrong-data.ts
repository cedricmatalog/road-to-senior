import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-wrong-data',
  title: 'Users Seeing Wrong Data',
  description: 'Users are reporting they see other users\' data occasionally. How do you investigate?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['debugging', 'security'],
  content: {
    overview: 'Users seeing each other\'s data is a P0 security incident. The pattern — wrong data for a short time, then correct — is a signature of a caching bug, not a database bug.',
    situation: `You receive a support ticket: "I logged in and saw someone else's order history for about 30 seconds, then it switched to mine." You've received 3 similar reports in the past week. The app uses server-side rendering with Redis session caching. No errors in the logs. This is a serious data leak. How do you investigate?`,
    options: [
      {
        id: 'a',
        label: 'Immediately investigate the session/caching layer — look for cache key collisions, missing user context in cache keys, or shared session state across requests',
        explanation: 'The pattern (wrong data for a short time, then correct) strongly suggests a caching bug. Server-side rendering with Redis caching is the prime suspect. Common causes: (1) cache key doesn\'t include user ID — all users share one cached page, (2) race condition where cache is populated without user context, (3) CDN or reverse proxy caching authenticated responses. Check the cache key construction first. Look for any cached response that isn\'t keyed by user ID. This is a P0 security incident — involve security team, consider temporarily disabling the cache while you investigate.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Ask the affected users for more details — it might be a client-side rendering glitch',
        explanation: 'User reports of seeing another user\'s order history is a data breach, not a UI glitch. Treating it as a rendering issue delays investigation of what\'s likely a serious security flaw. This pattern (correct data after a delay) almost always indicates server-side caching, not client-side rendering.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Check the database for any missing WHERE user_id clauses in queries',
        explanation: 'Missing WHERE clauses would return all users\' data, not random other users\' data. The specificity (seeing one other user\'s data specifically) points to caching, not broad data leaks from missing filters. Start with the caching layer.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
