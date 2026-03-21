import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'code-review-performance-issue',
  title: 'Spotting a Performance Bug in Review',
  description: 'A PR looks correct but has an O(n²) loop hidden in it. How do you handle this in review?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['code-review', 'performance'],
  content: {
    overview: 'Code review is your last line of defence against performance bugs. An O(n²) algorithm that passes tests with small data will fail catastrophically in production.',
    situation: `You're reviewing a PR that adds a "find duplicate users" feature. The code works correctly in tests. But you notice this pattern: for each user in a list of ~10,000, it calls \`users.find()\` to check for duplicates — making it O(n²). In tests with 10 users it's instant. In production with 10k users it'll take seconds. The author is a mid-level dev who clearly didn't think about scale. How do you comment?`,
    options: [
      {
        id: 'a',
        label: 'Leave a specific comment explaining the O(n²) issue, why it matters at scale, and suggest the O(n) Set-based approach',
        explanation: 'This is how senior engineers write code review comments: specific, educational, and actionable. Explain the problem ("this is O(n²) — for 10k users that\'s 100M iterations"), why it matters ("tests pass at 10 users, fails at scale"), and show the fix ("use a Set for O(1) lookups"). Don\'t just say "this is slow" — show them how to think about it.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Approve the PR since it\'s correct, and create a follow-up ticket to optimise later',
        explanation: 'A known O(n²) bug shipping to production with 10k users is not "optimise later" territory — it\'s a correctness issue at scale. "Works in tests" is not the same as "production ready". Performance issues that are obvious at review time should be fixed before merge.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Request changes without explanation — just say "this needs to be more efficient"',
        explanation: 'Vague feedback is almost as unhelpful as no feedback. The author doesn\'t know what "more efficient" means here — do you mean an algorithm change? A different data structure? Write comments that teach, not just criticise.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
