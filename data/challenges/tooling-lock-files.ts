import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'tooling-lock-files',
  title: 'Should You Commit the Lock File?',
  description: 'A teammate says to add package-lock.json to .gitignore. Is that right?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging', 'ci-cd'],
  content: {
    overview: 'Lock files guarantee that every developer and every CI run installs the exact same versions. Without them, "works on my machine" becomes a real problem.',
    situation: `You're setting up a new React project. A teammate says: "Add package-lock.json to .gitignore — it causes merge conflicts and we don't need it." Should you follow their advice?`,
    options: [
      {
        id: 'a',
        label: 'No — commit the lock file. It guarantees everyone installs identical versions. Merge conflicts in it are rare and resolvable.',
        explanation: 'The lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) records the exact version of every installed package, including transitive dependencies. Without it: developer A runs `npm install` today and gets lodash 4.17.20, developer B runs it next week and gets 4.17.21, and your CI runs something else entirely. Subtle bugs appear that only happen on some machines. Merge conflicts in lock files do happen but are usually resolved by running `npm install` again after merging. The cost of occasional conflicts is much lower than the cost of inconsistent environments.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Yes — package.json already specifies versions with semver ranges, so lock files are redundant',
        explanation: 'Semver ranges like `^18.0.0` allow any compatible version — the lock file is what pins the exact version. `^18.0.0` includes 18.0.0, 18.1.0, 18.2.3, etc. Two installs on different days can resolve to different exact versions. The lock file is specifically the mechanism that prevents this.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Only commit it for libraries, not for apps',
        explanation: 'Actually it\'s the opposite convention: apps should always commit lock files, libraries often shouldn\'t (because libraries are installed into another project\'s dependency tree, which has its own lock file). For an app, committing the lock file is essential.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
