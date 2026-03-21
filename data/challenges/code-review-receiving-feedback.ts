import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'code-review-receiving-feedback',
  title: 'Receiving Code Review Feedback',
  description: 'A senior leaves 8 comments on your first PR. Some feel nit-picky. How do you respond?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['communication', 'code-review'],
  content: {
    overview: 'Code review feedback is about the code, not about you. How you receive it shapes your reputation and your growth rate more than your initial code quality.',
    situation: `You submitted your first PR. The senior engineer left 8 comments: 2 bug catches, 3 style suggestions ("rename this variable", "extract this logic"), and 3 marked as "nit" (minor formatting preferences). You feel a bit defensive — the code works. How do you respond?`,
    options: [
      {
        id: 'a',
        label: 'Address all comments without pushback, ask a question on anything you don\'t understand, and thank them for the catches',
        explanation: 'This is the right default for a junior. 8 comments from a senior is a gift — they\'re investing time in your growth. Fix the bugs and style suggestions without argument. On nits, use your judgement: fix them if they\'re quick. If a comment genuinely confuses you, ask "I want to understand this better — what would you prefer here?" Code review is a learning channel. The worst response is silence or defensive justification. The best is swift, collegial action.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Reply to each comment defending your approach — the code works, and some of these are just preferences',
        explanation: '"The code works" is a low bar. Code review exists because working code and good code are different things. Naming matters. Extracting logic matters. Even nits matter for team consistency. Defending your first PR against 8 reasonable comments signals that you\'re not coachable — a much bigger problem than any of the code issues.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Only fix the bugs — ignore the style comments since they\'re subjective',
        explanation: 'Style comments from a team senior are not random preferences — they reflect how the team writes code. Inconsistency is a real cost in code review, debugging, and onboarding. Selectively ignoring feedback also signals that you\'re filtering based on effort, not understanding.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
