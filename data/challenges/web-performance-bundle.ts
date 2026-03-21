import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'web-performance-bundle',
  title: 'Reduce JavaScript Bundle Size',
  description: 'Your app\'s main bundle is 1.2MB. Cut it down without breaking functionality.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['web-performance'],
  content: {
    overview: 'JavaScript bundle size directly impacts Time to Interactive — the browser must download, parse, and execute every byte before the page is interactive. A 1.2MB bundle on a 3G connection takes ~10 seconds to download alone. The tools: code splitting, tree shaking, dynamic imports, and dependency auditing.',
    situation: `A webpack-bundle-analyzer run on your React app reveals:\n- main.js: 1.2MB (300KB gzipped)\n- Lodash: 70KB (you use _.debounce and _.cloneDeep)\n- Moment.js: 230KB (you use moment().format('YYYY-MM-DD'))\n- A charting library: 180KB (used on one dashboard page, not the homepage)\n- Date picker component: 90KB (loaded on every page, only used on the settings page)\n\nTime to Interactive is 6.8s on a mid-range mobile device. Target: <3.5s.`,
    options: [
      {
        id: 'a',
        label: 'Enable gzip compression on the server — it\'s not enabled yet',
        explanation: 'Gzip/Brotli compression is essential and the 300KB gzipped figure suggests it is enabled. But compression alone won\'t get you to 3.5s TTI — you still need to parse and execute 1.2MB of JavaScript. Compression reduces transfer time; code splitting and tree shaking reduce parse/execute time.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Replace Moment.js with date-fns or dayjs, replace Lodash with native equivalents, code-split the charting library and date picker with dynamic imports',
        explanation: 'This targets the specific offenders. Moment.js is 230KB and notoriously unsplittable — replace with dayjs (2KB) or date-fns (tree-shakeable). Lodash at 70KB for two functions is wasteful: debounce and cloneDeep can be written natively or imported individually (lodash-es). The charting library (180KB) only needed on one page — dynamic import(() => import(\'./Chart\')) means it only loads when that page is visited. Same for the date picker. These changes alone can cut the main bundle by ~500KB and move TTI under 3.5s.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Split the app into micro-frontends so each team owns their bundle',
        explanation: 'Micro-frontends solve organizational scaling, not bundle size. They add significant complexity (shared state, cross-app routing, duplicated dependencies) and the same bundle bloat problems exist within each micro-frontend. Fix the specific large dependencies first.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Upgrade to the latest version of React and webpack for their performance improvements',
        explanation: 'Upgrading is generally good but won\'t meaningfully reduce bundle size caused by large third-party libraries. The bottleneck is your dependencies, not the framework version.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
