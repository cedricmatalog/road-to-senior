import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-caching-strategy',
  title: 'Choose a Client-Side Caching Strategy',
  description: 'Your product page re-fetches data on every navigation. The data rarely changes. How do you cache it?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'performance'],
  content: {
    overview: 'Client-side caching is about balancing freshness against speed. Show cached data immediately (fast), refetch in the background (fresh), and invalidate explicitly on known writes (correct). This is the stale-while-revalidate pattern.',
    situation: `Users navigating between pages in your React app always see a loading spinner — every route change re-fetches data even if the user visited that page 30 seconds ago. The product detail data changes maybe a few times per day. The page gets a lot of navigation (users browse back and forth). What caching approach do you take?`,
    options: [
      {
        id: 'a',
        label: 'Use stale-while-revalidate: show cached data immediately, refetch in the background, invalidate on writes',
        explanation: 'This is the right balance. Show what you have (no spinner for returning visits), fetch fresh data silently in the background, update when it arrives. React Query and SWR implement this by default — staleTime controls how long cached data is considered fresh (no background refetch), cacheTime controls how long it stays in memory. For product data that changes a few times per day, a staleTime of 5 minutes means no unnecessary refetches. When the user edits a product, call queryClient.invalidateQueries() to mark that cache stale immediately. This gives you instant navigations without stale data problems.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Store API responses in localStorage with a 1-hour TTL',
        explanation: 'localStorage caching works but has pitfalls: it persists across sessions (data from yesterday can show today), it\'s synchronous and blocks the main thread for large payloads, and invalidation on writes is easy to forget. React Query\'s in-memory cache with a staleTime achieves the same goal for within-session caching with none of these drawbacks. Use localStorage/IndexedDB only for offline support or intentional persistence across sessions.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Fetch data in a top-level component and pass it as props through the tree to avoid re-fetching',
        explanation: 'Lifting data to a parent and passing it as props prevents re-fetching, but it creates prop drilling and couples unrelated components. It also doesn\'t help when the user navigates away and comes back — the parent unmounts and data is lost. A data-fetching library with a cache solves this at the right layer without the coupling.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
