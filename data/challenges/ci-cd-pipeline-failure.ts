import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'ci-cd-pipeline-failure',
  title: 'A Deploy Pipeline Is Blocking the Team',
  description: 'CI takes 45 minutes and fails intermittently. Diagnose and fix it.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['ci-cd'],
  content: {
    overview: 'A slow or flaky CI pipeline is a tax on every engineer on the team. If deploys take 45 minutes, a 3-line bug fix still takes 45 minutes to ship. Seniors treat pipeline health as a first-class engineering concern, not an ops problem.',
    situation: `Your team's CI pipeline runs: lint → type-check → unit tests (800 tests) → integration tests (hit a real database) → build → deploy. Total time: 45 minutes. It fails ~20% of runs on integration tests with connection timeouts.\n\nThe team has started skipping CI by pushing directly to staging. Two incidents last month were caused by untested code.\n\nWhat do you do?`,
    options: [
      {
        id: 'a',
        label: 'Add retry logic to the integration tests so flaky timeouts auto-recover',
        explanation: 'Retries mask the root cause. If integration tests time out due to a shared database being overloaded, retries just delay the failure. Fix the infrastructure issue or isolate test databases instead of hiding flakiness.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Audit and parallelize stages, fix the shared database bottleneck with isolated test databases or containers, and set a target pipeline time under 10 minutes',
        explanation: 'This is the right approach. Lint, type-check, and unit tests can run in parallel — they\'re independent. Integration tests need isolated databases (one per run, using Docker or a test database pool) to eliminate contention and timeouts. A 10-minute target is achievable and makes CI fast enough to actually use. Engineers bypass slow CI because it hurts productivity — fix the pipeline, not the behaviour.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Remove integration tests from CI and run them nightly instead',
        explanation: 'Moving integration tests to nightly means you find failures the next morning, not before merge. Two incidents already happened because of bypassed CI. Making CI faster and more reliable is the solution, not reducing its coverage.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Enforce a rule that engineers must wait for CI before merging and add a Slack bot to track violations',
        explanation: 'Process enforcement without fixing the underlying problem creates resentment. If CI takes 45 minutes and fails 20% of the time, engineers will find ways around any rule you make. Fix the pipeline first, then the discipline follows naturally.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
