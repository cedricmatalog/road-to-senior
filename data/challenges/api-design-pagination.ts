import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'api-design-pagination',
  title: 'Choose a Pagination Strategy',
  description: 'Your list endpoint returns 50,000 records. Pick the right pagination approach.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['api-design', 'system-design'],
  content: {
    overview: 'Pagination is not just a performance concern — it\'s an API contract. The strategy you choose affects what queries clients can make, how consistent results are under concurrent writes, and whether you can change the underlying data store later.',
    situation: `You have a GET /events endpoint that currently returns all records — up to 50,000 rows — in one response. It's killing the database and timing out for large accounts. You need to add pagination.\n\nThe data is sorted by created_at desc. New events are inserted frequently. Clients need to display a feed and also support "load more". What pagination strategy do you implement?`,
    options: [
      {
        id: 'a',
        label: 'Offset pagination: GET /events?page=2&limit=50, return { data, total, page, pages }',
        explanation: 'Offset pagination is simple to implement and supports jumping to arbitrary pages, but it has a critical flaw with frequently-inserted data: if 10 new events are inserted between page 1 and page 2 requests, page 2 will skip 10 events (they shifted the offsets). For a feed with frequent inserts, this causes missed items. Also, OFFSET N on large tables is slow — the database still scans N rows.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Cursor pagination: GET /events?cursor=<last_id>&limit=50, return { data, nextCursor }',
        explanation: 'Cursor pagination is the right choice for a feed. The cursor (typically the ID or created_at of the last seen item) is stable — new inserts don\'t shift existing cursors. It\'s also efficient: WHERE id < :cursor LIMIT 50 uses an index regardless of dataset size. The tradeoff is you can\'t jump to arbitrary pages, but a feed doesn\'t need that.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Return all data but stream it as newline-delimited JSON to avoid the timeout',
        explanation: 'Streaming solves the timeout but not the memory or database load. You\'re still fetching 50,000 rows per request. The client still has to process all of them. This is not pagination — it\'s a workaround that moves the problem downstream.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Add a required date range filter so clients must scope their queries',
        explanation: 'Forcing a date range reduces result size, but it\'s a constraint on the API contract, not a pagination strategy. "Load more" requires state between requests — a cursor or page number — not just smaller queries.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
