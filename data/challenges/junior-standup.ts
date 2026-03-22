import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-standup',
  title: 'What to Say in Standup',
  description: 'It\'s your first standup. What should you say and what should you skip?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['communication'],
  content: {
    overview: 'Standup is a coordination tool, not a status report to management. The goal is to surface blockers and let teammates know what you\'re working on so they can help or avoid conflicts.',
    situation: `It's your first daily standup. You've been working on a login form for two days. Yesterday you got the UI done. Today you're trying to wire up the API call but you're confused about how the auth token should be sent — you've read the docs but it's not clicking.\n\nWhat do you say?`,
    options: [
      {
        id: 'a',
        label: '"Yesterday I finished the login form UI. Today I\'m wiring up the API call — I\'m a bit unclear on how auth tokens should be sent, so I might need a hand later."',
        explanation: 'This is exactly right. You covered what you did, what you\'re doing, and flagged a potential blocker without making it a big deal. "Might need a hand later" invites help without derailing standup into a debugging session. If a teammate knows the answer, they\'ll catch you afterwards. Standup should be 30-60 seconds per person — enough to coordinate, not a full explanation.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Give a detailed explanation of the auth token confusion and ask for help right now in standup',
        explanation: 'Debugging in standup wastes everyone\'s time. Flag the blocker briefly, then solve it in a separate conversation with the right person. "Can we grab 10 minutes after standup?" is the right follow-up, not a 5-minute explanation to the whole team.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: '"I\'m still working on the login form." — keep it short and don\'t mention the confusion',
        explanation: 'Hiding a blocker means it doesn\'t get resolved. The whole point of standup is to surface exactly this kind of thing early. "I might need help with X" takes 5 seconds and can save you hours of being stuck.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
