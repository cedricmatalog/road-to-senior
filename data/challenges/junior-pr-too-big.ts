import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-pr-too-big',
  title: 'Your PR Has 50 Files Changed',
  description: 'You finished a feature and your pull request touches 50 files. Is that a problem?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['code-review', 'communication'],
  content: {
    overview: 'Large PRs are hard to review and slow to merge. Reviewers lose focus after ~200 lines. The best PRs are small, focused, and easy to understand in one sitting.',
    situation: `You've been working on a new user settings feature for a week. You open a pull request and it shows 50 files changed, 800 lines added. Your lead asks you to split it up. You're not sure why — it all works and the tests pass. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Split the PR: a first PR for refactors/infrastructure, a second for the feature itself — ask your lead for guidance on how to split if unsure',
        explanation: 'Large PRs are a code review burden. A reviewer looking at 800 lines across 50 files will miss things, lose context, and take much longer to approve. Small PRs get reviewed faster, get better feedback, and are easier to revert if something goes wrong. A common split: (1) preparatory refactoring with no behaviour change, (2) the actual feature. If you\'re not sure how to split, ask — it\'s a skill worth learning early.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Keep it as one PR — splitting it will create merge conflicts and more coordination overhead',
        explanation: 'Merge conflicts from splitting are usually minor and short-lived. The coordination cost of a large PR — slow reviews, missed issues, harder rollbacks — is almost always higher. The discomfort of splitting is worth it.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a detailed PR description explaining every change so reviewers can follow along',
        explanation: 'A good description helps but doesn\'t fix the core problem — cognitive overload from reviewing too many changes at once. A description of 50 files is still 50 files. Split first, describe second.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
