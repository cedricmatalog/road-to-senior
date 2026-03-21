import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'code-review-test-quality',
  title: 'Reviewing Low-Quality Tests',
  description: 'A PR has 100% test coverage but the tests don\'t actually verify the right things. How do you review it?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['code-review', 'testing'],
  content: {
    overview: 'Code coverage measures which lines ran — not whether the right things were tested. 100% coverage with meaningless assertions is worse than 60% coverage with strong ones.',
    situation: `A PR adds a payment processing function with tests. Coverage is 100%. But looking at the tests, you see: they mock out the payment gateway entirely and just assert that the mock was called. No test verifies the actual output values. No test covers what happens when the gateway rejects the payment. No edge cases. The author is proud of the "full coverage." How do you review this?`,
    options: [
      {
        id: 'a',
        label: 'Request changes: explain the difference between coverage and test quality, and ask for tests that verify actual outputs and failure cases',
        explanation: 'Coverage measures which lines ran, not whether the assertions were meaningful. A test that calls the function and asserts nothing (or asserts only that a mock was called) gives false confidence. Explain specifically what\'s missing: "What does the function return on success? What happens when the gateway returns a declined code? What if the amount is negative?" Real tests assert outcomes, not just execution. The author may genuinely think 100% coverage equals good tests — this misconception is worth correcting explicitly.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Approve it — 100% coverage is better than most code and at least the happy path runs',
        explanation: 'Approving bad tests is worse than no tests. They give false confidence that the code is tested, making future developers less likely to add real tests. Bad tests are technical debt that actively misleads.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add the missing tests yourself before approving',
        explanation: 'You\'d be doing the author\'s work and skipping the learning. They need to understand why their tests are insufficient — otherwise they\'ll repeat the pattern. Leave specific feedback on what tests are missing and why.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
