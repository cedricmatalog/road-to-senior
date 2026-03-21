import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-flaky-tests',
  title: 'Debugging Flaky Tests',
  description: 'A test passes 90% of the time but fails occasionally with no code changes. How do you debug it?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['debugging', 'testing'],
  content: {
    overview: 'Flaky tests are a symptom of testing the wrong thing. The fix is rarely "make it less flaky" — it\'s "test behaviour, not environment."',
    situation: `A test in your CI pipeline fails about 1 in 10 runs. It always passes locally. The failure is a timing assertion — it checks that a function completes within 500ms. The error is usually "expected 498ms but got 503ms." No code has changed in weeks. The test has been "flaky" for months and the team has started ignoring CI failures. How do you fix this?`,
    options: [
      {
        id: 'a',
        label: 'Remove the timing assertion and replace it with a behavioural assertion — test that the correct result is returned, not how fast',
        explanation: 'Timing assertions are almost always wrong for unit/integration tests. CI runners have variable load — a 500ms limit is an arbitrary line that\'ll be crossed by OS scheduling, GC pauses, or a noisy neighbour process. The real question is: "does the function return the right result?" Test that instead. If you have a genuine performance requirement (SLA, user-facing latency), test it separately in a controlled benchmark environment, not in unit tests. "Fix" the flaky test by making it test the right thing.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Increase the timeout to 1000ms to give more buffer',
        explanation: 'This pushes the problem down the road. The test will still fail occasionally, just less often. You\'re now testing "completes in 1 second" which is an even weaker assertion. And you still have a test that couples your test suite to environment performance.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Mark the test as skipped/ignored since it\'s been flaky for months and the team has already learned to ignore it',
        explanation: 'Tests that are ignored don\'t protect anything. But the right solution isn\'t to formalise the ignore — it\'s to fix the test. Flaky tests erode confidence in the entire test suite. If the team is ignoring CI, they might miss a real failure.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
