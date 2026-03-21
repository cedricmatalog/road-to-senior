import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'documentation-onboarding',
  title: 'Your Codebase Has No Documentation',
  description: 'Every new engineer takes 2 weeks to get productive. Fix it with the right docs.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['documentation', 'mentoring'],
  content: {
    overview: 'Documentation has a hierarchy of value. The most important docs are the ones that unblock people most often: how to set up the dev environment, how the system fits together, and why non-obvious decisions were made. Perfect docs that nobody reads are worthless; imperfect docs that answer the most common questions are invaluable.',
    situation: `New engineers at your company consistently take 2+ weeks to make their first meaningful contribution. Exit interviews reveal: "I didn\'t know how to run the app locally," "I couldn\'t find where things were," and "I was afraid to touch X because I didn\'t understand what it did."\n\nYou have one week to meaningfully improve this. You can\'t document everything. What do you prioritize?`,
    options: [
      {
        id: 'a',
        label: 'Write comprehensive API documentation for every endpoint using a tool like Swagger',
        explanation: 'API docs are useful but they\'re not what\'s blocking new engineers. They can\'t even run the app yet. Comprehensive docs also take longer than a week to write. Start with what unblocks people fastest.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Write a README with: local setup (copy-pasteable commands), architecture overview (how the pieces fit), key concepts glossary, and "where to find X" guide — then ask the next new engineer to follow it and fix any gaps',
        explanation: 'This targets the three pain points exactly. Local setup eliminates the "can\'t run it" problem — it must be copy-pasteable commands, not prose. Architecture overview answers "how does this fit together" without requiring someone to trace the code. A glossary defines domain terms that insiders take for granted ("what is a widget?"). The "where to find X" section answers the most common navigation questions. Using the next new engineer as a test is the key insight — documentation that hasn\'t been validated by a real reader is aspirational, not useful.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Record a video walkthrough of the codebase and share it in Slack',
        explanation: 'Videos are hard to search, become outdated, and can\'t be copy-pasted from. They have value for high-level overviews but not as a substitute for written setup docs. Someone who gets stuck on step 3 of setup can\'t ctrl+F a video.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Pair every new engineer with a senior engineer for their first two weeks',
        explanation: 'Pairing is valuable but it doesn\'t scale and doesn\'t fix the root problem — the knowledge only lives in people\'s heads. When those people leave, the problem returns. Documentation transfers knowledge to a medium that persists.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
