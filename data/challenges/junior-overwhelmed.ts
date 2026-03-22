import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-overwhelmed',
  title: 'Ticket Feels Too Big to Start',
  description: 'You\'ve been assigned a task that you don\'t know how to approach. What do you do?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['communication', 'estimation'],
  content: {
    overview: 'Getting stuck before you start is normal. The skill is knowing when to explore on your own, when to ask for help, and how to ask well.',
    situation: `You've been assigned a ticket: "Add pagination to the users table." You've never implemented pagination before. You read the ticket three times but don't know where to start. It's been an hour. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Spend another 30 minutes exploring on your own — look at existing code for patterns, search the codebase for similar features — then ask if still stuck',
        explanation: 'The right balance. Trying first shows initiative and means your question will be specific ("I found this API endpoint but I\'m not sure how to wire the page param to the query") rather than vague ("I don\'t know how to do pagination"). Most teams expect juniors to spend 30-60 minutes on their own before asking. After that, asking is not a weakness — it\'s efficient. You\'ll unblock faster and learn more from a focused question than from hours of blind searching.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Ask your lead immediately — you\'re new and it\'s faster than spending an hour confused',
        explanation: 'Asking too quickly means you haven\'t given yourself a chance to learn. It also means your question will be vague, making it harder for your lead to help efficiently. A little exploration first makes you a better question-asker and builds the habit of reading existing code.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Wait until the end of the day — if you\'re still stuck, mention it at standup tomorrow',
        explanation: 'Waiting a full day while blocked costs the team a sprint ticket. Most teams want to know within a few hours if you\'re stuck. Blocking problems should surface in standup at the latest ("I\'m blocked on X, need some guidance") — not the next day.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
