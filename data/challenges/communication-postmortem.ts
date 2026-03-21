import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'communication-postmortem',
  title: 'Running a Blameless Post-Mortem',
  description: 'After a production incident caused by your code, you\'re asked to run a post-mortem. How do you approach it?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['communication', 'mentoring'],
  content: {
    overview: 'Blameless post-mortems treat incidents as system failures, not individual failures. The goal is learning and prevention, not accountability.',
    situation: `A deployment last Thursday took down your payment service for 40 minutes. The bug was in code you wrote — a missing null check that didn't show up in tests. The team is frustrated, the CTO wants answers, and there's implicit pressure to find someone to blame. You've been asked to run the post-mortem meeting. How do you structure it?`,
    options: [
      {
        id: 'a',
        label: 'Focus on the timeline, what failed in the system (process, tooling, tests), and specific action items — explicitly not who made the mistake',
        explanation: 'A blameless post-mortem asks "how did our system allow this to happen" not "who screwed up." Even if one person wrote the bug, the real question is why: did tests not catch it? Was there no code review? Did monitoring not alert fast enough? Could the rollback have been faster? Each answer becomes an action item. Blame creates a culture of hiding mistakes; blamelessness creates a culture of learning. The action items (add null checks to test suite, improve rollback runbooks) prevent recurrence. Naming the person does nothing except make them defensive.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Apologize for the bug and take personal responsibility — acknowledge it was your mistake',
        explanation: 'Personal accountability is admirable, but it\'s not the point of a post-mortem. If you spend the meeting on apologies and blame, you leave without actionable improvements. The CTO doesn\'t want to hear "it was my fault" — they want to know how you\'re preventing the next one. Own mistakes, but then immediately pivot to system-level fixes.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Focus on the technical details of the bug so the team understands what went wrong technically',
        explanation: 'Technical understanding matters, but the full post-mortem must also cover detection (how long until alert?), response (how long until fix?), and prevention (what changes to process/tooling?). A purely technical deep-dive misses the operational lessons.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
