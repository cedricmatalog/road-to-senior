import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'communication-technical-to-nontechnical',
  title: 'Explaining Technical Debt to a Non-Technical Stakeholder',
  description: 'Your PM keeps pushing features. You need to get time to address technical debt. How do you make the case?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['communication'],
  content: {
    overview: 'Technical decisions have business consequences. Translating technical concerns into business terms — time, cost, risk — is what gets them prioritised.',
    situation: `Your team's deployment pipeline is fragile, tests take 45 minutes, and a core module has no documentation. These are slowing you down significantly — new features take twice as long as they should. Your PM is focused on the roadmap and doesn't understand why you keep talking about "tech debt." They ask: "Can't we just ship the features and fix the old stuff later?" How do you respond?`,
    options: [
      {
        id: 'a',
        label: 'Translate debt into business impact: "Every new feature takes 2x longer because of this. Fixing it means we ship the next 6 features in 3 months instead of 6."',
        explanation: 'This is the right framing. Technical debt is invisible to non-technical stakeholders until you translate it into their language: time, cost, and risk. Avoid jargon ("refactor", "legacy code"). Use concrete numbers. "Fixing our test pipeline cuts deployment time from 2 hours to 20 minutes" is persuasive. "We need to improve our CI/CD" is not. Make the tradeoff explicit — not "we should fix this" but "here\'s what we lose by not fixing it."',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Insist that technical debt is serious and the team needs dedicated time each sprint to fix it',
        explanation: 'You\'re right that debt needs addressing, but insisting without making the business case comes across as the engineering team prioritising internal concerns over product goals. You\'ll win the argument in the room and lose the political battle. Always frame it in terms of product impact.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Just keep shipping features and fix debt opportunistically when you have spare time',
        explanation: 'Debt addressed "when there\'s time" is debt that never gets addressed. Without explicit prioritisation, the next feature always wins. This is how codebases become unmaintainable — not through bad decisions, but through deferred ones.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
