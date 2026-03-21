import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'estimation-reestimate',
  title: 'You\'re Going to Miss the Deadline',
  description: 'Three days into a week-long task, you realise it\'s going to take two weeks. What do you do?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['estimation', 'communication'],
  content: {
    overview: 'Estimates are always provisional. When new information changes the picture, the professional move is to surface it immediately — with options, not just bad news.',
    situation: `You estimated a feature at 5 days. Three days in, you've uncovered a hidden dependency on a third-party API with poor documentation, and a database schema change that wasn't in the original spec. You're now confident this is 10-12 days of work. The PM has already communicated the original deadline to the client. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Tell your PM immediately with the updated estimate and reason, and propose options: scope reduction, timeline extension, or additional help',
        explanation: 'Bad news communicated early is manageable. Bad news on the deadline day is a crisis. The PM needs this information now to manage the client expectation. Come with more than a problem — come with options. "We hit a hidden API dependency. Here are three paths: (1) ship a reduced scope (feature X but not Y) on the original date, (2) extend by one week with full scope, (3) bring in another dev for the API integration." This makes you a problem-solver, not just a problem-reporter. The PM can then have an informed conversation with the client.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Try to work overtime to make up the time and hit the original deadline',
        explanation: 'This trades certain overtime now for uncertain success. If you still miss the deadline after overworking, you\'ve failed twice — the deadline and your own wellbeing. If you succeed, you\'ve trained stakeholders that scope can grow without consequences. Always surface the issue rather than silently absorbing it.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Finish as much as possible by the deadline and flag what\'s incomplete when submitting',
        explanation: 'Partial delivery without warning is still a surprise. The PM finds out on deadline day. The client is already expecting the full feature. You had days of advance notice — use them. Early communication enables real solutions; late communication just manages damage.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
