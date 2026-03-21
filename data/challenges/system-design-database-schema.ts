import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-database-schema',
  title: 'Design a Notifications Schema',
  description: 'Design a database schema to support user notifications — in-app, email, and push — with read/unread state and preferences.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'Good schema design separates concerns: the event (what happened), the delivery (who received it), and the preferences (who wants what). Conflating these creates duplication and query problems.',
    situation: `You need to design the database schema for a notification system. Requirements: (1) multiple notification types — in-app, email, push, (2) users can have unread/read state per notification, (3) users can opt out of certain notification types per channel, (4) notifications can be bulk-sent to all users of a certain type (e.g. "all admins"). You're using PostgreSQL. How do you model this?`,
    options: [
      {
        id: 'a',
        label: 'Separate tables: notifications (template/event), notification_deliveries (per-user instance with read state), and notification_preferences (per-user, per-type, per-channel opt-outs)',
        explanation: 'This is the right separation of concerns. `notifications` stores the event/content once (not duplicated per user). `notification_deliveries` is the fan-out table — one row per (user, notification) pair with read_at timestamp. `notification_preferences` stores user opt-outs. This scales: bulk-sending to 10k users means 10k rows in deliveries, not copying the notification content 10k times. You can query unread counts cheaply (COUNT WHERE read_at IS NULL). The preferences table makes channel management flexible without coupling it to the notification model.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'One notifications table with a user_id column, storing the full notification content per user',
        explanation: 'This duplicates content for bulk notifications. Sending to 10k users means 10k rows with identical content. Updating the notification body (if a bug is found) requires updating 10k rows. The normalised approach stores content once and references it.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Store notifications as a JSON array in the user record for fast reads',
        explanation: 'JSON arrays in user records are an anti-pattern for notifications — they can\'t be indexed efficiently, making "unread count" queries expensive. They also grow unboundedly in the user record. Querying "all users with unread notifications" becomes a full table scan.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
