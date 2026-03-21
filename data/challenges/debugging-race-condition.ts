import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-race-condition',
  title: 'Debugging a Race Condition',
  description: 'Two concurrent API requests are causing double-charging. How do you find and fix the race condition?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['debugging', 'async-js'],
  content: {
    overview: 'Race conditions happen when two operations assume exclusive access to shared state. The fix is always to make the check-and-change atomic — no gap between them.',
    situation: `Your e-commerce app has an occasional bug: some customers are being charged twice for the same order. It happens maybe once a day out of thousands of orders. Looking at the logs, you see two near-simultaneous API requests from the same user for the same order ID — probably a double-click on the payment button. Your current flow: check if order is paid → process payment → mark order as paid. How do you fix this?`,
    options: [
      {
        id: 'a',
        label: 'Use a database-level lock or idempotency key: set order status to "processing" atomically before charging, so concurrent requests fail fast on the second one',
        explanation: 'The bug is a TOCTOU (Time Of Check To Time Of Use) race: both requests check "is this paid?" at the same moment, both see "no", both proceed to charge. The fix must be atomic. Two patterns: (1) Optimistic locking — `UPDATE orders SET status="processing" WHERE id=? AND status="pending"` — only one request wins, the other sees 0 rows updated and fails. (2) Idempotency keys — generate a unique key per payment attempt, use a unique database constraint — the second identical request fails with a duplicate key error. Both prevent double-charge without locks that could cause deadlocks.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Disable the payment button on the frontend after the first click',
        explanation: 'Frontend-only fixes are insufficient — API endpoints must always be safe to call multiple times. A slow network can cause duplicate requests even with the button disabled. The fix must be server-side and idempotent.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a check at the top of the payment handler: fetch the order and return early if already paid',
        explanation: 'This is your current approach — it doesn\'t fix the race. Both concurrent requests can still pass the check simultaneously before either one marks the order as paid. The check and the update must be a single atomic operation.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
