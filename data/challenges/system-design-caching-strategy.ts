import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-caching-strategy',
  title: 'Choose a Caching Strategy',
  description: 'Your product page is slow. The data rarely changes. How do you cache it?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'performance'],
  content: {
    overview: 'The best cache is one that\'s both fast and safe to be slightly stale. A short TTL plus explicit invalidation on writes gives you most of the benefit with almost none of the risk.',
    situation: `Your e-commerce product detail page takes 800ms to load. Profiling shows 600ms is a database query joining products, inventory, and pricing tables. The data changes at most a few times per day (price updates, inventory adjustments). The page gets ~5,000 requests per hour. You have Redis available. What caching approach do you use?`,
    options: [
      {
        id: 'a',
        label: 'Cache the query result in Redis with a TTL of 5-10 minutes, invalidate on write',
        explanation: 'This is the right balance. A short TTL (5-10 min) means stale data resolves itself even if invalidation misses. Explicit invalidation on price/inventory writes keeps it fresh for important changes. Redis gives you sub-millisecond reads on 5k req/hr easily. The key insight: perfect cache consistency is expensive — for product pages, a few minutes of stale data is almost always acceptable.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Add database indexes to the join columns and optimize the query first',
        explanation: 'Query optimization is worth doing, but it\'s a separate concern and unlikely to get you from 600ms to <50ms for a complex join. Caching and indexing are complementary — do both. But if the data rarely changes and you have Redis, caching gives you an immediate, dramatic improvement.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Cache indefinitely and manually clear the cache on every product update',
        explanation: 'Indefinite caching without TTL is fragile — if invalidation code has a bug or a write path is missed, you serve stale data forever with no self-healing. Always use a TTL as a safety net. Explicit invalidation + TTL is more robust than either alone.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
