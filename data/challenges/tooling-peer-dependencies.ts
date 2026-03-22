import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'tooling-peer-dependencies',
  title: 'What Are peerDependencies?',
  description: 'You install a library and get a "missing peer dependency" warning. What does it mean and what do you do?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging'],
  content: {
    overview: 'peerDependencies say "this package needs X to work, but you must install X yourself." They exist to avoid bundling duplicate versions of shared libraries like React.',
    situation: `You run \`npm install react-datepicker\` and get this warning:\n\nnpm WARN react-datepicker@4.x requires a peer of react@^17 || ^18 but none is installed.\n\nYour app already has React 18 installed. The datepicker renders fine. What's happening and should you do anything?`,
    options: [
      {
        id: 'a',
        label: 'Nothing — the warning is misleading. Your app already has React 18, which satisfies the peer requirement. The library will use your app\'s React.',
        explanation: 'peerDependencies work exactly like this: the library says "I need React, but the app should provide it." Since your app has React 18, the requirement is satisfied — the warning is npm being cautious. The datepicker will use your app\'s React instance, which is the whole point. If you had two different React versions, you\'d get bugs (hooks errors, event system conflicts). One shared version is correct.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Run `npm install react@17` to install the exact version the library asked for',
        explanation: 'Don\'t downgrade your React. The library supports both 17 and 18 — that\'s what `^17 || ^18` means. Installing React 17 alongside 18 would create two copies of React, which breaks hooks entirely. The warning is about the dependency not being explicitly listed in your package.json, not about incompatibility.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add `react` to your package.json dependencies manually to silence the warning',
        explanation: 'React is already in your package.json if you\'re building a React app. The warning appears because npm checks peer dependencies before looking at what you have installed. Once npm resolves everything, the peer is satisfied. You don\'t need to do anything.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
