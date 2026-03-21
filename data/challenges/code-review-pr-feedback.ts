import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'code-review-pr-feedback',
  title: 'Giving Effective PR Feedback',
  description: 'A junior developer submitted a PR with a subtle bug and unclear naming. How do you respond?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['code-review', 'mentoring'],
  content: {
    situation: `A junior dev on your team opened a PR. The code works in tests, but you spot two issues: a variable named \`data\` that's actually an array of users, and a \`.catch(console.log)\` that silently swallows errors in production. The junior is enthusiastic and this is their third PR. How do you give feedback?`,
    options: [
      {
        id: 'a',
        label: 'Request changes with specific inline comments explaining each issue',
        explanation: 'This is the recommended approach. Specific inline comments give the junior exact context, help them learn the "why", and show respect for their work. Mention what\'s good too — positivity reinforces what to keep.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Approve the PR and fix the issues yourself in a follow-up commit',
        explanation: 'This avoids friction but misses a teaching moment. The junior doesn\'t learn, and you\'ve set a precedent where they don\'t need to worry about error handling or naming.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Leave a general comment: "There are some issues here, please fix before merging"',
        explanation: 'Too vague. The junior doesn\'t know what to fix or how. Vague feedback creates anxiety and forces them to guess, which wastes everyone\'s time.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
