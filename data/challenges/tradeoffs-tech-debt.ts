import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'tradeoffs-tech-debt',
  title: 'When to Pay Down Tech Debt',
  description: 'You have a backlog full of debt and a product team that wants new features. What do you do?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['tradeoffs', 'estimation'],
  content: {
    overview: 'Tech debt is not inherently bad — taking shortcuts to ship is sometimes the right call. The problem is when debt accumulates invisibly and slows everything down. Senior engineers make the debt visible, quantify its cost, and negotiate for time to address the most painful parts.',
    situation: `Your team\'s codebase has significant tech debt: a 3,000-line god component, no test coverage on the checkout flow, and an unmaintained ORM that causes N+1 queries. The product team wants three new features shipped in Q3. Each feature estimate is 2 weeks but the debt is making everything take 40% longer than estimates.\n\nYou have a planning meeting tomorrow. How do you approach it?`,
    options: [
      {
        id: 'a',
        label: 'Don\'t mention the debt — just add buffer to your estimates and fix things as you go',
        explanation: 'Hidden buffers are not a solution. Product will notice estimates are always "2 weeks" but deliveries are always "3 weeks" and lose trust. The debt isn\'t getting fixed, just absorbed. This approach also means the debt grows — each new feature is built on the same crumbling foundation.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Make the debt visible with concrete costs: "The N+1 issue adds ~3 days to every feature that touches orders. The god component means every UI change risks regressions." Propose a 20% allocation to debt reduction alongside feature work',
        explanation: 'This is the right approach. Tech debt needs to be translated into business costs — not "the code is messy" but "this specific debt is costing us X days per sprint." Product managers can make informed tradeoffs when the cost is visible. A 20% allocation (one day per week) is a common, sustainable approach that prevents debt from growing while shipping features. Pick the highest-pain items first — the ones slowing you down most.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Request a full quarter to pay down all debt before any new features',
        explanation: 'A debt freeze rarely gets approved, and when it does, the business stops generating value for 3 months. More importantly, you can\'t pay down all debt — new debt accumulates as you build. The goal is to manage debt, not eliminate it.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Rewrite the affected systems from scratch with a better architecture',
        explanation: 'Rewrites are almost always slower than estimated and rarely deliver the expected improvement. You lose battle-tested code, rediscover edge cases the hard way, and the new system accumulates its own debt. Targeted refactoring of the highest-pain areas delivers more value with less risk.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
