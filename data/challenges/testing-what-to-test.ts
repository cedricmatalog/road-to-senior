import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-what-to-test',
  title: 'Deciding What to Test',
  description: 'With limited time, how do you decide which parts of the codebase deserve tests most?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['testing'],
  content: {
    overview: 'Testing everything equally is a trap. The goal isn\'t coverage numbers — it\'s confidence that the system behaves correctly. High-value tests cover code that is complex, changes frequently, handles money or security, or has no safety net if it breaks in production.',
    situation: `You join a team with almost no tests. The codebase includes:
- A utility function that formats currency (10 lines, pure, never changes)
- A cart total calculation with discount rules, tax rates, and rounding logic (100 lines, changes monthly)
- A payment processing integration that charges real cards (50 lines, if it breaks, users are double-charged)
- A static "About Us" page component (30 lines, just renders text)

You have time to write tests for two of these. Which two and why?`,
    options: [
      {
        id: 'a',
        label: 'Cart total calculation and payment processing — these have the highest consequence of failure and the most complexity',
        explanation: 'The cart total changes monthly, has complex rules (discounts, tax, rounding), and is pure logic — ideal for unit tests that cover many input combinations quickly. The payment integration has catastrophic failure modes (double charges, silent failures) — even a small integration test that verifies the correct amount is sent to the payment provider is high-value. The currency formatter is low risk (pure, stable, easy to manually verify). The About Us page has zero logic to break. Prioritise tests where: (1) the code is complex and changes often, or (2) the failure consequence is severe.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'The currency formatter and the About Us page — they\'re simple, so the tests will be easy to write',
        explanation: 'Testing what\'s easy to test rather than what\'s risky to break is one of the most common testing anti-patterns. Easy tests give you a false sense of coverage while the hard, risky parts stay unprotected. Write tests where failure hurts most, not where tests write themselves.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Aim for 100% coverage across all files — any untested line is a risk',
        explanation: 'Coverage is a proxy metric, not a goal. A test that calls a function without asserting its output covers the line and adds zero protection. 100% coverage on a static page is meaningless. 80% coverage on payment logic with meaningful assertions is invaluable. Focus on meaningful assertions on high-risk code, not the coverage number.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
