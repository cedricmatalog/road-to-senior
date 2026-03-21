import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-background-jobs',
  title: 'Design a Background Job System',
  description: 'Users trigger long-running operations (report generation, email blasts). How do you design the backend to handle this?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'Long-running operations don\'t belong in HTTP request handlers. A job queue decouples request time from operation time — and gives you retries, status tracking, and scalability for free.',
    situation: `Users can trigger two operations: (1) generate a PDF report (takes 10-30 seconds), (2) send a marketing email to up to 50,000 subscribers (takes minutes). Both are currently done synchronously — users wait for the HTTP response, which often times out. You need to redesign this. You have Node.js, PostgreSQL, and Redis available.`,
    options: [
      {
        id: 'a',
        label: 'Move operations to a job queue (BullMQ/Redis). Endpoint enqueues the job and returns a job ID. Client polls or uses WebSockets to get status.',
        explanation: 'The right architecture for long-running operations. The HTTP endpoint becomes a thin layer: validate the request, create a job record, enqueue to Redis, return { jobId }. Workers process jobs independently. The client polls GET /jobs/:id or subscribes via WebSocket. BullMQ handles retries, concurrency, and priority. The job record in PostgreSQL gives you a durable audit trail of all operations. This decouples HTTP request time from operation time, eliminates timeouts, and lets you scale workers independently.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Increase the HTTP timeout to 5 minutes and run the operations synchronously in the request handler',
        explanation: 'Long-lived HTTP connections are fragile — network proxies, load balancers, and mobile clients all have their own timeout limits you can\'t control. The user\'s browser may also timeout or navigate away. Synchronous request handling for multi-minute operations is not a scalable solution.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Run the operations in a background thread/async process and return immediately with a "check back later" message',
        explanation: 'Getting closer, but "check back later" without a job ID or status endpoint is a poor UX. Users have no way to know when it\'s done. The queue-based approach with a job ID gives you everything: immediate response, status polling, error handling, and retries.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
