import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-breaking-monolith',
  title: 'Breaking Up a Monolith',
  description: 'Your team wants to extract a service from a monolith. Where do you start?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['architecture', 'system-design'],
  content: {
    overview: 'Extracting a service from a monolith is one of the most common and risky engineering decisions. The Strangler Fig pattern — wrapping before extracting — minimises risk by keeping the system working at every step.',
    situation: `Your company has a Rails monolith that's been growing for 6 years. The payments module is causing problems — it has complex logic, a different deployment cadence than the rest of the app, and a team of 3 that wants to own it independently. Leadership wants to extract it as a separate service. The module shares the same database with the rest of the app and has ~200 call sites. Where do you start?`,
    options: [
      {
        id: 'a',
        label: 'Create an internal API boundary first (Strangler Fig): wrap the payments module in a clean interface inside the monolith, then gradually migrate callers to it before extracting the service',
        explanation: 'This is the Strangler Fig pattern and the right approach for a messy extraction. First, define the API surface the new service will expose — then create that interface inside the monolith. All 200 call sites migrate to the internal interface. Once callers use the interface and not the module directly, you can extract the implementation behind it as a real service without breaking anything. The shared database is the hardest part — extract the data last, and use the service\'s API as the only write path even while it shares the DB.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Extract the payments service immediately — spin up a new repo, new database, and update the monolith to call it via HTTP',
        explanation: 'Too fast. With 200 call sites and a shared database, a big-bang extraction will cause months of pain — broken references, data consistency issues, and deployment coordination nightmares. The Strangler Fig approach gives you a clear migration path with rollback at each step.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Wait until the team has time for a full rewrite of payments from scratch in a new service',
        explanation: 'Rewrites are almost never the right answer. They take longer than expected, reintroduce bugs from the original that were never documented, and block feature development. Incremental extraction is slower to start but far more reliable.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
