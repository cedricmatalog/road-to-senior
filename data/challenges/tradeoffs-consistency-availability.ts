import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'tradeoffs-consistency-availability',
  title: 'Consistency vs. Availability Tradeoff',
  description: 'Your distributed system can\'t be both fully consistent and always available. What do you choose?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['tradeoffs', 'system-design'],
  content: {
    overview: 'The CAP theorem states that a distributed system can guarantee at most two of: Consistency, Availability, Partition tolerance. Since network partitions are unavoidable, the real choice is between consistency and availability. Neither is universally right — it depends on what failure mode is acceptable for your use case.',
    situation: `You\'re designing a shopping cart service for an e-commerce site. The cart data is replicated across 3 nodes for redundancy. When a network partition occurs (nodes can\'t communicate), you must choose:\n\nOption A: Reject writes during a partition to ensure all nodes stay consistent\nOption B: Accept writes during a partition and reconcile conflicts when the partition heals\n\nYour site does $50k/hour in revenue. Partitions are rare (< 0.01% of time) but last 2-5 minutes when they occur.`,
    options: [
      {
        id: 'a',
        label: 'Choose consistency: reject cart writes during partitions to ensure all nodes always agree',
        explanation: 'For a shopping cart, this means users can\'t add items during a (rare) 2-5 minute outage. At $50k/hour, a 5-minute outage costs ~$4,100 in lost sales. For financial data like account balances or payment records, consistency is worth this cost. For a cart, it\'s probably not — the failure mode (user can\'t add an item) is worse than the alternative.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Choose availability: accept writes during partitions and resolve conflicts (e.g. union of items) when the partition heals',
        explanation: 'This is the right choice for a shopping cart. The failure mode for availability (a brief period where a user\'s cart might have stale data that gets reconciled) is much less severe than blocking all cart operations. Amazon\'s Dynamo paper (which influenced DynamoDB) chose exactly this tradeoff for shopping carts. The key insight: model your data in a way that makes conflict resolution deterministic — a cart is a set of items, so the union of two diverged carts is a sensible merge strategy.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Use a single node for the cart to avoid partition problems entirely',
        explanation: 'A single node eliminates distributed consistency concerns but introduces a single point of failure. If that node goes down, the entire cart service is unavailable — a much worse outcome than a rare partition on a replicated system.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Cache the cart in the browser and sync to the server periodically to sidestep the problem',
        explanation: 'Browser-side caching reduces server load and can improve perceived performance, but it doesn\'t eliminate the server-side consistency question — when the browser syncs, the server still needs to handle concurrent writes from multiple devices or sessions.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
