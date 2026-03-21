import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'web-performance-rendering',
  title: 'Fix Render-Blocking Resources',
  description: 'Your page has a 2.1s render delay before anything is visible. Find and fix the culprits.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['web-performance'],
  content: {
    overview: 'Render-blocking resources prevent the browser from showing anything until they\'re fully downloaded and processed. CSS in the <head> blocks rendering. JavaScript without async/defer blocks both parsing and rendering. The goal is to get pixels on screen as fast as possible — then progressively enhance.',
    situation: `A Lighthouse audit shows First Contentful Paint of 3.8s. The page <head> contains:\n\n1. <link rel="stylesheet" href="/styles/global.css"> (40KB)\n2. <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700">\n3. <script src="/analytics.js"></script> (tracks page views, 80KB)\n4. <script src="/app.js"></script> (your main app, 200KB)\n5. <link rel="stylesheet" href="/styles/print.css">\n\nWhat changes do you make?`,
    options: [
      {
        id: 'a',
        label: 'Move all <script> tags to the bottom of <body>',
        explanation: 'Moving scripts to the end of body is a classic optimization from 2010 that prevents HTML parsing from blocking. But it\'s weaker than async/defer — the browser still can\'t discover and start downloading the script until it reaches that point in the document. async/defer is better: they allow parallel download while HTML parsing continues.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Add async to analytics.js, defer to app.js, add media="print" to print.css, add preconnect for Google Fonts, and inline critical CSS from global.css',
        explanation: 'Each change targets a specific problem. analytics.js with async executes as soon as it loads, not blocking render — fine for tracking. app.js with defer executes after HTML parsing but before DOMContentLoaded — correct for app code. print.css with media="print" tells the browser it\'s not render-blocking (only needed for print). Google Fonts preconnect establishes the connection early. Inlining critical CSS (above-the-fold styles, ~5KB) eliminates the render-blocking stylesheet request entirely — the rest loads asynchronously. Together these can drop FCP to under 1s.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Remove Google Fonts and use system fonts instead',
        explanation: 'System fonts eliminate the font loading problem and are a valid performance choice, but it\'s a design decision that needs buy-in. The engineering fix (preconnect + font-display:swap) can get Google Fonts to near-zero render impact without changing the design.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Reduce global.css file size by removing unused selectors with PurgeCSS',
        explanation: 'PurgeCSS reduces file size, which helps. But a 40KB CSS file (even at full size) gzips to ~8KB — the bigger issue is that it\'s render-blocking at all. Inlining critical CSS and loading the rest asynchronously has more impact than size reduction alone.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
