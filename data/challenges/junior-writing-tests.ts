import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-writing-tests',
  title: 'When Should You Write Tests?',
  description: 'Your PR works. Should you write tests before merging, or is it optional?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['testing'],
  content: {
    overview: 'Tests are not optional on a professional team. They\'re what makes refactoring safe, what prevents regressions, and what lets future you (and others) change code with confidence.',
    situation: `You've built a small utility function that formats currency values. It works correctly in the UI. Your lead reviews the PR and asks: "Where are the tests?" You haven't written any. What's the right response?`,
    options: [
      {
        id: 'a',
        label: 'Add tests before merging — at minimum a few cases covering the happy path and edge cases (zero, negative, large numbers)',
        explanation: 'A utility function with no tests is a future bug waiting to happen. Someone will refactor it, or change a dependency, and break it silently. Tests for a pure function like a formatter take 10-15 minutes to write and pay dividends for the life of the codebase. This is the expectation on any professional team. Start with the obvious cases: does it format 1000 as "$1,000"? What about 0? Negative values? Then ship.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Explain that it works correctly in the UI — manual testing is sufficient for a small utility',
        explanation: 'Manual testing only tells you it works right now, in the specific scenario you tested. It doesn\'t protect against regressions when the function is changed later, doesn\'t document the expected behaviour, and doesn\'t run automatically in CI. "It works" is not the same as "it will keep working."',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Open a follow-up ticket to add tests later — don\'t block the PR',
        explanation: 'Follow-up test tickets almost never get done — they get deprioritised as new work comes in. Tests written after the fact, weeks later, are harder to write because context is lost. Write tests when you write the code. Don\'t defer testing; it\'s part of the definition of done.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
