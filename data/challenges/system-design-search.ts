import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-search',
  title: 'Add Search to a Large List',
  description: 'Your app has a list of 10,000+ items. Users need to search it. What\'s the right approach?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'performance'],
  content: {
    overview: 'Search UX has two layers: where you filter (client vs. server) and how fast it feels (debounce, loading states, highlighting). For large datasets, server-side filtering is required — but the UI still needs to feel instant.',
    situation: `You're building a search feature for a product catalogue with 10,000+ items. Right now the app loads all items on mount and filters them in the browser with Array.filter(). It works for 200 items but becomes unusably slow as the catalogue grows. Users type in a search box and expect instant results. What's your approach?`,
    options: [
      {
        id: 'a',
        label: 'Move filtering server-side: debounce the input (300ms), send a query param to the API, show a loading state while fetching, display results',
        explanation: 'This is the right pattern. Debouncing (300ms) prevents an API call on every keystroke. Server-side filtering means the database does the heavy lifting — it can use full-text indexes, handle 1M+ records, and return only what the user asked for. The UI needs a loading indicator (skeleton or spinner) during the fetch, and ideally an abort controller to cancel in-flight requests when the user types again. Tools like React Query or SWR make the loading/stale state management straightforward.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Keep client-side filtering but load items lazily — only fetch the next 100 when the user scrolls',
        explanation: 'Lazy loading reduces initial load time but doesn\'t fix search. If the user searches "blue widget" and only 100 items are loaded, you miss the 50 matching items in the next page. Client-side search only works when all data is in memory — which is the problem you\'re trying to solve.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Use a client-side search library (Fuse.js, MiniSearch) for fuzzy search on the full dataset',
        explanation: 'Client-side search libraries are fast and great for small datasets (< ~2,000 items). But they still require loading all items upfront — a 10,000-item payload is several MB of JSON. The indexing step also takes significant CPU on load. For datasets this size and above, server-side search is the right call.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
