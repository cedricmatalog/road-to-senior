import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-prod-bug',
  title: 'You Caused a Bug in Production',
  description: 'A bug made it to production and it\'s traced back to your last PR. What\'s your first move?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging', 'communication'],
  content: {
    overview: 'Production bugs happen to everyone. The priority order is always: contain the damage first, communicate early, root cause after. Never stay silent.',
    situation: `Your feature shipped yesterday. This morning a user reports that the checkout button doesn't work. Your tech lead traces the regression to your PR. A few dozen users are affected. What do you do first?`,
    options: [
      {
        id: 'a',
        label: 'Tell your lead immediately, offer to revert your PR right now, and start investigating the root cause in parallel',
        explanation: 'Correct order: communicate → mitigate → investigate. The fastest fix for a production regression is usually a revert — it undoes the change and restores working behaviour in minutes. You can investigate and fix properly in a follow-up PR. Telling your lead immediately means they can decide whether to revert or hotfix. Investigating silently while users are affected delays the mitigation.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Immediately start debugging to find and push a fix — faster than a revert',
        explanation: 'Debugging under pressure while users are blocked often takes longer than expected. A revert is immediate and safe. Push the fix when you actually understand the problem. Debugging first without communicating also leaves your lead in the dark.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Wait to investigate more before telling anyone — you want to come with a solution, not just a problem',
        explanation: 'Coming with a solution sounds considerate but it delays mitigation. Your lead needs to know now — they may have context you don\'t (other affected systems, customer commitments, whether to revert or hotfix). Communicate the problem immediately; the solution can follow.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
