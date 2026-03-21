import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-database-schema',
  title: 'Model Frontend State for a Notification System',
  description: 'Design the client-side state shape for notifications: in-app, email, push — with read/unread state and user preferences.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'Good state shape separates concerns: the notification content, the per-notification read state, and the user\'s channel preferences. Mixing them together creates duplication and makes updates messy.',
    situation: `You're building the frontend for a notification system. The API returns notifications and the UI must: (1) show a badge count of unread notifications, (2) let users mark individual notifications as read, (3) show user preferences per notification type per channel (email on/off, push on/off). How do you model the client state?`,
    options: [
      {
        id: 'a',
        label: 'Normalize: notifications map (id → notification), readIds Set, preferences map (type → channel → boolean)',
        explanation: 'Normalized state is the right call. A notifications map keyed by ID makes individual updates (mark as read) O(1) — no array find needed. A separate readIds Set makes the badge count a simple size check and doesn\'t require mutating notification objects. Preferences are separate because they have a different lifecycle (user settings vs. event data). This is the shape Redux Toolkit\'s EntityAdapter encourages, and what React Query\'s cache looks like internally. Updates are surgical: one key changes, not the whole array.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Store everything in one array: notifications with isRead and preferences embedded per item',
        explanation: 'An array of objects is the first instinct but creates problems. Marking one notification as read means mapping over the whole array to find and update it — O(n) every time. Embedding preferences per notification duplicates them across every notification of that type. To update a preference you\'d have to update every matching notification. The badge count requires filtering the array on every render.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Keep notifications in a server-sync\'d cache (React Query/SWR) and let the server be the source of truth for read state',
        explanation: 'Using React Query or SWR for server state is a good pattern — it handles caching, staleness, and background refetching. But marking a notification as read should feel instant (optimistic update), not wait for a round-trip. You still need a local state shape for optimistic read state. The two approaches complement each other: React Query owns the server cache, local state owns the optimistic overlay.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
