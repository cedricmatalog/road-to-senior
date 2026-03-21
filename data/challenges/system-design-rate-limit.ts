import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-rate-limit',
  title: 'Prevent API Hammering from the Frontend',
  description: 'Your search input fires an API call on every keystroke, generating hundreds of requests per minute. How do you fix this?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'Client-side request control is about matching user intent to API calls. Debounce waits for the user to stop typing. Throttle limits rate. Request cancellation ensures you only process the latest response.',
    situation: `You have a search input that calls \`GET /api/search?q=...\` on every keystroke. A fast typist generates 10 requests per second. The server is getting hammered, responses arrive out of order (an earlier slow response overwrites a later fast one), and the UI flickers. You need to fix all three problems. What's your approach?`,
    options: [
      {
        id: 'a',
        label: 'Debounce the input (300ms), cancel in-flight requests with AbortController when a new keystroke comes in',
        explanation: 'Debounce solves the hammering: wait until the user stops typing for 300ms before firing. AbortController solves the race condition: cancel the previous fetch when a new one starts, so stale responses never overwrite fresh ones. Together these are the standard pattern for search inputs. The flicker goes away because you\'re no longer rendering intermediate out-of-order responses. With React Query or SWR, this is a few lines — they handle cancellation and deduplication automatically.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Throttle requests to one per second using setInterval to batch keystrokes',
        explanation: 'Throttle limits rate but doesn\'t solve the race condition — a slow response from second 1 can still overwrite the result from second 2. It also feels laggy: the user stops typing and waits up to 1 second. Debounce (fires after user stops) feels more responsive for search than throttle (fires on a fixed interval).',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a minimum query length (3 chars) and a "Search" button — don\'t search on every keystroke',
        explanation: 'Minimum length reduces requests and is a reasonable UX guardrail (single-char searches are rarely useful). But requiring a button click removes the "instant search" experience and doesn\'t fix the race condition if users still type quickly. The debounce + cancel approach gives you both instant-feel and safety.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
