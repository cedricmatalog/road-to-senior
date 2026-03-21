import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'communication-incident-update',
  title: 'Communicating During an Incident',
  description: 'Production is down. Non-technical stakeholders are asking for updates. What do you send?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['communication'],
  content: {
    overview: 'During an incident, communication is as important as the fix. Stakeholders need just enough information to stop interrupting you — no more.',
    situation: `It's 2pm on a Tuesday. Your e-commerce site has been down for 20 minutes — checkout is broken for all users. You've identified the cause (a bad deploy) and are rolling back. ETA to fix: 10 more minutes. Your CEO, Head of Support, and Head of Sales are all messaging you asking what's happening. What do you send?`,
    options: [
      {
        id: 'a',
        label: 'Send a short update: what\'s broken, what caused it, what you\'re doing, and ETA — then focus on fixing it',
        explanation: 'This is the right move. Stakeholders need: (1) scope — what\'s affected, (2) cause — why it happened, (3) action — what you\'re doing right now, (4) ETA — when it\'ll be resolved. Keep it to 3-4 sentences. One update now, another when resolved. Don\'t over-communicate during the fix — it slows you down and creates noise.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Stay silent and focus entirely on the fix — update everyone once it\'s resolved',
        explanation: 'Silence during an incident is toxic. Stakeholders will escalate, interrupt you, or assume the worst. A 30-second update buys you uninterrupted focus time. Always communicate before they ask.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Send a detailed technical explanation of the root cause, the rollback procedure, and what you\'ll do to prevent recurrence',
        explanation: 'Too much, too soon. Non-technical stakeholders don\'t need a postmortem during the incident — they need to know it\'s being handled and when it\'ll be fixed. Save the deep technical detail for the post-incident review.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
