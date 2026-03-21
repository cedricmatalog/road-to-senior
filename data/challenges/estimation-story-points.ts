import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'estimation-story-points',
  title: 'Story Points vs. Time Estimates',
  description: 'Your new PM insists on converting story points to days for the roadmap. How do you explain why that doesn\'t work?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['estimation', 'communication'],
  content: {
    overview: 'Story points measure complexity relative to other work, not calendar time. Treating them as hours-per-point misrepresents their purpose and creates false precision in roadmaps.',
    situation: `You've been using story points for 6 months. Your new PM looks at your velocity (30 points/sprint) and your backlog, and starts building a roadmap by dividing the total points by 30 and multiplying by 2 weeks to get delivery dates. They ask: "We have 300 points in the backlog — that's 20 weeks, right?" How do you respond?`,
    options: [
      {
        id: 'a',
        label: 'Explain that points measure complexity, not time — backlog estimates drift as you learn, and future estimates are less reliable than recent velocity',
        explanation: 'The right explanation: story points are relative complexity scores, not time units. 1 point doesn\'t equal X hours. Three problems with the PM\'s calculation: (1) backlog estimates get less accurate the further out you go — items estimated months ago may have changed, (2) velocity fluctuates (holidays, incidents, onboarding), (3) discovery work often reveals new backlog items. The honest answer is "based on current velocity and rough estimates, 20 weeks is a plausible range — but we should treat anything beyond 8 weeks as directionally accurate, not date-accurate."',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Go along with it — it\'s a rough estimate anyway and the PM needs something to show leadership',
        explanation: 'False precision misleads. If you let a "20 weeks" date go into a roadmap unchallenged, you\'ve implicitly endorsed its accuracy. When slippage happens, it looks like execution failure rather than estimate uncertainty. Better to set expectations correctly upfront.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Switch to time-based estimates instead, since the PM clearly needs hours/days not points',
        explanation: 'Switching to hours/days doesn\'t solve the underlying problem — estimates are uncertain regardless of unit. It often makes things worse by implying more precision than exists. The goal is to help the PM understand planning under uncertainty, not to switch to a different number that\'s equally made up.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
