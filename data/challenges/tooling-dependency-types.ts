import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'tooling-dependency-types',
  title: 'dependencies vs devDependencies',
  description: 'Where should a new package go — dependencies or devDependencies? Does it actually matter?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging'],
  content: {
    overview: 'dependencies ship with your app. devDependencies are tools that only run during development and build. For frontend apps built with a bundler, the distinction matters less for bundle size — but it matters for clarity and for packages that run in Node (like servers or CLIs).',
    situation: `You're adding three packages to a React app:\n\n1. \`lodash\` — used in components at runtime\n2. \`eslint\` — lints your code during development\n3. \`@types/react\` — TypeScript type definitions\n\nWhere does each one go?`,
    options: [
      {
        id: 'a',
        label: 'lodash → dependencies, eslint → devDependencies, @types/react → devDependencies',
        explanation: 'Correct. lodash is imported in your components and needs to be present at runtime — it goes in dependencies. eslint only runs in your terminal during development, never in the browser — devDependencies. @types/react provides TypeScript types that are stripped out at compile time and never exist in the final bundle — devDependencies. The rule of thumb: if it\'s imported in your source code and needs to work in production, it\'s a dependency. If it\'s a tool you run in your terminal, it\'s a devDependency.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Put everything in dependencies to be safe — devDependencies is just for optional stuff',
        explanation: 'devDependencies isn\'t "optional" — it\'s "only needed to build/develop, not to run." Putting everything in dependencies bloats your node_modules in production environments and signals to other developers that those tools are runtime requirements when they\'re not. For a deployed Node server, only dependencies are installed in production by default.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'lodash → devDependencies, since the bundler will include it anyway',
        explanation: 'While bundlers do resolve both dependency types, putting lodash in devDependencies is misleading. It signals "this is a build tool" when it\'s actually application code. For Node apps (like a Next.js server), dependencies vs devDependencies determines what gets installed in production — lodash in devDependencies could cause a missing module error in production.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
