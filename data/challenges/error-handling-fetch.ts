import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'error-handling-fetch',
  title: 'Robust Fetch with Error Handling',
  description: 'Write a fetch wrapper that handles network errors, non-2xx responses, and JSON parse failures gracefully.',
  type: 'code',
  difficulty: 'mid',
  skills: ['error-handling', 'async-js'],
  content: {
    overview: `\`fetch()\` only throws on network failure — it resolves even for 404s and 500s. A robust wrapper must handle three distinct failure modes: network error, non-2xx status, and malformed JSON. The \`{ data, error }\` pattern ensures callers never have to catch exceptions.`,
    solution: `async function safeFetch(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return { data: null, error: \`HTTP \${res.status}\` }
    try {
      const data = await res.json()
      return { data, error: null }
    } catch {
      return { data: null, error: 'Invalid JSON response' }
    }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Network error' }
  }
}`,
    explanation: `\`fetch()\` only rejects on network failure — it resolves even for 4xx/5xx responses. That's why you need to check \`res.ok\` explicitly. There are three distinct failure modes: network error (throws), bad status (resolves with \`ok: false\`), and malformed JSON (throws on \`res.json()\`). The \`{ data, error }\` return pattern avoids exceptions propagating to callers — they always get a predictable shape to handle.`,
    hints: [
      'Wrap everything in try/catch — network failures throw, they don\'t return.',
      'Check `res.ok` after awaiting fetch. If false, that\'s a non-2xx — return `{ data: null, error: \`HTTP \${res.status}\` }`.',
      'Wrap `await res.json()` in its own try/catch in case the body isn\'t valid JSON.',
    ],
    starterCode: `async function safeFetch(url) {
  // Should return { data, error } — never throw
}`,
    testCases: [
      {
        description: 'returns data on success',
        explanation: 'The happy path — res.ok is true, JSON parses cleanly. Confirms { data, error: null } shape.',
        testCode: `
global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'Alice' }) })
safeFetch('/api/user').then(({ data, error }) => {
  if (data?.name === 'Alice' && !error) { console.log("PASS") } else { console.log("FAIL: " + JSON.stringify({ data, error })) }
})`,
      },
      {
        description: 'returns error on non-2xx status',
        explanation: 'fetch() resolves for 404 — you must check res.ok explicitly. Missing this check is the #1 fetch bug.',
        testCode: `
global.fetch = () => Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
safeFetch('/api/user').then(({ data, error }) => {
  if (!data && error) { console.log("PASS") } else { console.log("FAIL: should have error for 404") }
})`,
      },
      {
        description: 'returns error on invalid JSON',
        explanation: 'res.json() can throw if the server returns malformed JSON (e.g., an HTML error page). Must be caught separately.',
        testCode: `
global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.reject(new SyntaxError('Unexpected token')) })
safeFetch('/api/user').then(({ data, error }) => {
  if (!data && error) { console.log("PASS") } else { console.log("FAIL: should have error for invalid JSON") }
})`,
      },
    ],
  },
}
export default challenge
