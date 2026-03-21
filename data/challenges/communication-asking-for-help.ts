import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'communication-asking-for-help',
  title: 'How to Ask for Help Effectively',
  description: 'You\'ve been stuck for 45 minutes. How do you ask a senior for help in a way that\'s efficient for both of you?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['communication'],
  content: {
    overview: 'How you ask for help matters as much as asking. A well-framed question gets you unblocked faster and teaches you more than a vague "it\'s broken."',
    situation: `It's your second week. You've been trying to get a form submission working for 45 minutes. The network request fires but you're getting a 422 error and the response body just says "Unprocessable Entity." You know a senior engineer is nearby. What do you say?`,
    options: [
      {
        id: 'a',
        label: '"Hey, I\'ve been stuck on this for 45 minutes. I\'m sending a POST to /api/users, getting a 422. I checked the request body — it looks right to me. Can you take a look?"',
        explanation: 'This is the right format: (1) how long you\'ve been stuck, (2) what you\'re trying to do, (3) what you\'ve already tried, (4) the specific error. This lets the senior know you\'ve genuinely tried, gives them the context to help quickly, and signals that you respect their time. It also often triggers the rubber duck effect — the act of articulating the problem precisely sometimes reveals the answer before they respond.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: '"This thing is broken, can you fix it?" — then show them your screen',
        explanation: 'Vague asks waste everyone\'s time. The senior has to ask clarifying questions before they can help. Worse, you haven\'t done the work of articulating the problem, which means you\'ll miss the learning opportunity. Always bring: what you\'re doing, what you expected, what actually happened, and what you\'ve tried.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Keep trying for another hour before asking — you don\'t want to seem incompetent',
        explanation: '30-60 minutes on a single blocker is the standard threshold — beyond that, you\'re wasting company time and your own momentum. Asking for help is not a sign of weakness; staying silent and spinning is. Seniors prefer to unblock you quickly than have you lose a day to a typo.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
