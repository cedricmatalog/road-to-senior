import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'communication-disagreeing-with-lead',
  title: 'Disagreeing with a Technical Decision',
  description: 'Your tech lead wants to use a technology you think is the wrong choice. How do you push back?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['communication'],
  content: {
    overview: 'Disagreeing with authority is a skill. The goal is to surface your concern clearly once, listen genuinely, then commit fully — regardless of the outcome.',
    situation: `Your tech lead has decided to use a GraphQL API for a new internal admin dashboard. You think this is over-engineered for the use case — the dashboard has 5 simple screens, one team of 3 using it, and no mobile clients. REST would be simpler and faster to build. Your lead has more seniority and is enthusiastic about GraphQL. How do you handle this?`,
    options: [
      {
        id: 'a',
        label: 'Raise the concern directly but once: explain your reasoning, listen to theirs, then commit to the decision either way',
        explanation: 'This is "disagree and commit" — a critical senior engineering skill. Voice your concern with specific reasoning ("GraphQL adds schema, resolvers, and a query language we\'re already learning while building the product"). Listen genuinely — maybe there\'s context you\'re missing (future plans, learning investment, team preference). If you\'ve been heard and the decision stands, commit fully. Half-hearted execution of a decision you disagreed with is worse than the original decision.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Escalate to your manager — your lead is making a mistake that will slow the team down',
        explanation: 'Escalating a technical disagreement without first raising it directly is political and damages trust. Technology choices rarely have a single right answer. Escalate only when a decision has serious consequences that your lead won\'t acknowledge after direct conversation.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Say nothing and implement it their way — it\'s not worth the conflict',
        explanation: 'Staying silent when you have relevant concerns harms the team. Seniors are expected to raise issues, not just execute. Conflict-avoidance at the expense of code quality or project velocity is not professionalism — it\'s abdication of responsibility.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
