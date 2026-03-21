import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'refactoring-strangler-fig',
  title: 'Safely Replacing a Core Algorithm',
  description: 'You need to replace a critical pricing calculation that runs in production. How do you do it safely?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['refactoring', 'testing'],
  content: {
    overview: 'Replacing critical production logic safely requires more than good tests. Shadow mode (running old and new in parallel) validates against real traffic that tests will never fully cover.',
    situation: `Your pricing engine is a complex 800-line function that calculates order totals, discounts, taxes, and shipping. It has bugs, it's slow, and it's hard to understand. You've been asked to rewrite it. The old function processes 50,000 orders per day. A bug in the new version could mean incorrect charges to thousands of customers. How do you approach the replacement?`,
    options: [
      {
        id: 'a',
        label: 'Run both implementations in parallel (dark launch): new function runs alongside old, compare outputs, fix discrepancies — then switch when outputs match for 99.9% of cases',
        explanation: 'The parallel run (or "shadow mode") pattern is the safest way to replace critical logic. The old function continues to be used for actual results; the new one runs on every request and its output is logged but not used. You compare outputs and fix any discrepancies. When the new function matches the old for a statistically significant sample, you switch. This catches edge cases in real production data that test cases miss. It also gives you confidence before a user-facing change. The switch can be gradual (1% → 10% → 100%) using a feature flag.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Write comprehensive tests for the old function, then rewrite to pass those tests',
        explanation: 'Writing tests for the old function is a necessary step, but tests only cover cases you can think of. Production data contains edge cases no developer anticipated. Shadow mode testing on real traffic catches what test cases miss. Do both: write tests first, then shadow-test in production.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Do a big-bang replacement — deploy the new function on a Tuesday at low traffic and monitor closely',
        explanation: 'Big-bang replacements of critical logic are high-risk even at low traffic. "Monitor closely" doesn\'t catch pricing bugs until customers notice incorrect charges — which may be hours or days later. Shadow mode lets you validate correctness before any user-visible change.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
