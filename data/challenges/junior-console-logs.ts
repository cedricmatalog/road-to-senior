import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-console-logs',
  title: 'You Left console.logs in Your PR',
  description: 'A reviewer points out you left 5 console.log statements in your PR. How do you handle it?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['code-review', 'debugging'],
  content: {
    overview: 'Console.logs are a development tool, not production code. Leaving them in is a sign the code wasn\'t cleaned up before review. The right response is to remove them and reflect on your review process.',
    situation: `You submitted a PR for a new feature. A reviewer leaves a comment: "Please remove the console.log statements before merging." There are 5 of them scattered across 3 files — leftover from debugging. How do you respond?`,
    options: [
      {
        id: 'a',
        label: 'Remove all of them, push a cleanup commit, and reply to the comment — then add a pre-commit habit to check for them',
        explanation: 'Remove them — that\'s the immediate fix. Then reflect on process: a quick `git diff` before opening a PR catches these. Many teams use a linter rule (`no-console`) or a pre-commit hook that fails if console.log is present in non-test files. After you fix it this time, add one of those guards so it can\'t happen again. Responding to the comment with "Done, removed in abc123" closes the loop clearly.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Explain that they\'re harmless debug logs and ask if it\'s really necessary to remove them',
        explanation: 'Console.logs in production code pollute browser consoles for real users, can leak sensitive data (if you logged user objects, tokens, or API responses), and signal that code wasn\'t properly cleaned up. They\'re not harmless — and questioning a valid review comment as a junior creates friction unnecessarily.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Remove just the ones the reviewer mentioned and leave any others you think are useful',
        explanation: 'If the reviewer asked for console.logs to be removed, they mean all of them. Partial cleanup suggests you didn\'t take the feedback fully. Remove all debug logs before submitting for review — they\'re for your eyes only during development.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
