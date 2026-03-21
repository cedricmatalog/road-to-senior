import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'mentoring-junior-stuck',
  title: 'Junior Dev Has Been Stuck for Hours',
  description: 'A junior on your team has been blocked on the same bug for 3 hours. How do you help?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['mentoring', 'communication'],
  content: {
    overview: 'Good mentoring balances autonomy and support. The goal isn\'t to solve the problem for them — it\'s to guide them to the solution so they build the skill, not just fix this one bug.',
    situation: `It's 4pm. A junior dev has been quietly struggling with the same async bug since 1pm — you can see from their commits they keep trying random things. They haven't asked for help. You're in the middle of something, but you know the codebase well and could probably spot the issue quickly. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Check in with them, ask what they\'ve tried, and guide them to the answer with questions rather than just fixing it',
        explanation: 'This is the right balance. Checking in respects their autonomy without leaving them stuck forever — a good rule of thumb is 30-45 minutes before a senior should proactively offer help. Ask "what have you tried?" first — it reveals their mental model and avoids re-explaining things they already know. Guide with questions ("what does the error say?", "what do you expect this line to do?") so they build the debugging skill, not just fix this one bug.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Fix the bug yourself and commit the solution with a note explaining what was wrong',
        explanation: 'Fast, but it robs them of the learning. They won\'t know what to do next time. This is the pattern that creates permanent dependency. The only exception: you\'re under critical time pressure and the bug is genuinely blocking the team.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Wait for them to ask for help — it\'s important they learn to be self-sufficient',
        explanation: 'Self-sufficiency matters, but 3 hours on one bug is too long. Junior devs often don\'t ask for help because they feel they should figure it out themselves. A good senior creates a culture where asking is normal, not a failure.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
