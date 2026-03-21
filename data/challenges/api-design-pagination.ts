import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'api-design-pagination',
  title: 'Implement Infinite Scroll',
  description: 'You need to add "load more" to a feed of events. Which pagination approach do you use in the frontend?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['api-design', 'system-design'],
  content: {
    overview: 'How you paginate determines whether your feed is correct, fast, and implementable. For a feed with frequent inserts, cursor-based pagination is the only approach that doesn\'t skip or duplicate items when new data arrives.',
    situation: `You're building an activity feed that shows events sorted newest-first. The feed is frequently updated — new events arrive while the user is reading. You need to implement a "Load more" button (or infinite scroll). The API supports both \`?page=N&limit=50\` and \`?cursor=<id>&limit=50\`. Which do you use and how do you implement the UI?`,
    options: [
      {
        id: 'a',
        label: 'Cursor pagination: fetch with ?cursor=<lastItemId>&limit=50, append results to the list, pass the last item\'s ID as cursor for the next fetch',
        explanation: 'Cursor pagination is correct for a live feed. The cursor anchors to a specific item — it doesn\'t matter how many new events arrive at the top. Page 2 with offset pagination says "skip 50 rows" — but if 10 new events arrive, you skip 10 items the user hasn\'t seen. With a cursor, you say "give me items older than this ID" — new events at the top don\'t affect this at all. React Query\'s `useInfiniteQuery` is built for this: it tracks the cursor per page and handles the append logic. The UI is straightforward: render all pages, show "Load more" if `hasNextPage` is true.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Offset pagination: fetch page 1, 2, 3... append results, show "Load more" button',
        explanation: 'Offset pagination is simple but broken for live feeds. If 5 new events arrive between the user loading page 1 and page 2, every item shifts by 5 in the offset — the first 5 items on page 2 are actually duplicates of the last 5 on page 1 (which shifted down). For a static dataset (search results, admin tables) offset pagination is fine. For a live feed, use cursors.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Load all pages at once and use virtualization to render only visible items',
        explanation: 'Virtual lists (react-window, react-virtual) solve the rendering performance problem for long lists, but they don\'t solve the data fetching problem. You still need to decide when and how to fetch more data. Virtualization is a complement to pagination, not an alternative.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
