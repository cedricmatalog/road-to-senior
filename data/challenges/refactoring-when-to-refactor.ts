import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'refactoring-when-to-refactor',
  title: 'When to Refactor vs. When to Ship',
  description: 'You\'re about to add a feature to messy legacy code. Do you refactor first or ship the feature?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['refactoring'],
  content: {
    overview: 'The right time to refactor is when you\'re already in the code. Clean up what you touch — not everything, not nothing. Targeted improvement compounds over time.',
    situation: `You need to add a discount code feature to your checkout flow. The checkout code is messy — it's one 400-line function with unclear variable names and multiple responsibilities. You estimate: (1) refactor first, then add the feature: 5 days total, (2) add the feature to the existing code: 2 days, but it'll make the code even messier. The deadline is tight. Your team is debating what to do.`,
    options: [
      {
        id: 'a',
        label: 'Refactor the specific part you\'re changing (not everything), then add the feature — "the rule of three"',
        explanation: 'The Boy Scout Rule: leave the code a little better than you found it. The key word is "a little." Don\'t refactor the whole 400-line function — that\'s risk and scope you didn\'t plan for. Extract and clean up the parts you\'re actually touching to add the discount feature (probably the pricing logic). This is the "rule of three": the third time you touch a messy section, clean it up. Targeted refactoring keeps the scope bounded, reduces the risk of breaking other things, and makes the area you\'re adding to cleaner without a 5-day detour.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Ship the feature first in the messy code — refactor in a dedicated sprint later',
        explanation: '"Refactor later" almost never happens. The next deadline arrives, and "later" becomes "never." You\'ve now added more code to the mess and training the team that adding mess is acceptable. Targeted, scoped cleanup while you\'re in the code anyway costs almost nothing extra.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Do the full 5-day refactor before touching anything — don\'t add features to bad code',
        explanation: 'A full refactor of a 400-line function you didn\'t plan for changes the risk profile of the entire sprint. What if it breaks something? You now need to re-test the whole checkout flow. Scoped refactoring (just what you\'re touching) gives most of the benefit at a fraction of the risk.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
