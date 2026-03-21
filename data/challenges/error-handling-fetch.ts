import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'error-handling-fetch',
  title: 'Robust Fetch with Error Handling',
  description: 'Write a fetch wrapper that handles network errors, non-2xx responses, and JSON parse failures gracefully.',
  type: 'code',
  difficulty: 'mid',
  skills: ['error-handling', 'async-js'],
  content: {
    starterCode: `async function safeFetch(url) {
  // Should return { data, error } — never throw
}`,
    testCases: [
      {
        description: 'returns data on success',
        testCode: `
global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'Alice' }) })
safeFetch('/api/user').then(({ data, error }) => {
  if (data?.name === 'Alice' && !error) { console.log("PASS") } else { console.log("FAIL: " + JSON.stringify({ data, error })) }
})`,
      },
      {
        description: 'returns error on non-2xx status',
        testCode: `
global.fetch = () => Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
safeFetch('/api/user').then(({ data, error }) => {
  if (!data && error) { console.log("PASS") } else { console.log("FAIL: should have error for 404") }
})`,
      },
    ],
  },
}
export default challenge
