import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-async-function',
  title: 'Test an Async Data Fetcher',
  description: 'Implement `getUserById` with proper async error handling, designed so it can be tested with stub fetchers.',
  type: 'code',
  difficulty: 'mid',
  skills: ['testing', 'async-js'],
  content: {
    overview: `Testing async functions requires controlling their dependencies. By accepting the fetcher as a parameter, you can pass a stub that resolves instantly in tests — no real network, no flakiness, no test timeouts.`,
    solution: `async function getUserById(id, fetcher) {
  if (!id) throw new Error('id is required')
  const response = await fetcher('/users/' + id)
  if (!response.ok) throw new Error('User not found')
  return response.json()
}`,
    explanation: `Injecting \`fetcher\` makes the function unit-testable: pass \`() => Promise.resolve({ ok: true, json: () => ({ id: 1 }) })\` in tests, the real \`fetch\` in production. The function throws on missing id (fail fast) and on bad response status. Throwing instead of returning null forces callers to handle errors explicitly — they can't silently ignore a failed fetch.`,
    hints: [
      'Validate the id first — throw early for missing input.',
      'Check response.ok after awaiting the fetcher — a 404 won\'t throw, it resolves with ok: false.',
      'Return response.json() — the parsed data, not the raw response.',
    ],
    testCases: [
      {
        description: 'returns user data on success',
        explanation: 'The stub resolves with a valid response — getUserById must return the parsed JSON.',
        testCode: `
async function getUserById(id, fetcher) {
  if (!id) throw new Error('id is required')
  const response = await fetcher('/users/' + id)
  if (!response.ok) throw new Error('User not found')
  return response.json()
}
const stub = () => Promise.resolve({ ok: true, json: () => ({ id: 1, name: 'Alice' }) })
getUserById(1, stub).then(user => {
  if (user.name === 'Alice') { console.log("PASS") } else { console.log("FAIL: " + JSON.stringify(user)) }
})`,
      },
      {
        description: 'throws when response is not ok',
        explanation: 'A 404 response (ok: false) must cause getUserById to throw — not return undefined.',
        testCode: `
async function getUserById(id, fetcher) {
  if (!id) throw new Error('id is required')
  const response = await fetcher('/users/' + id)
  if (!response.ok) throw new Error('User not found')
  return response.json()
}
const stub = () => Promise.resolve({ ok: false, status: 404 })
getUserById(1, stub).then(() => {
  console.log("FAIL: should have thrown")
}).catch(err => {
  if (err.message === 'User not found') { console.log("PASS") } else { console.log("FAIL: " + err.message) }
})`,
      },
      {
        description: 'throws for missing id',
        explanation: 'Calling with no id must throw immediately before touching the fetcher.',
        testCode: `
async function getUserById(id, fetcher) {
  if (!id) throw new Error('id is required')
  const response = await fetcher('/users/' + id)
  if (!response.ok) throw new Error('User not found')
  return response.json()
}
let fetcherCalled = false
const stub = () => { fetcherCalled = true; return Promise.resolve({ ok: true, json: () => ({}) }) }
getUserById(null, stub).then(() => {
  console.log("FAIL: should have thrown")
}).catch(err => {
  if (err.message === 'id is required' && !fetcherCalled) { console.log("PASS") }
  else { console.log("FAIL: " + err.message + " fetcherCalled=" + fetcherCalled) }
})`,
      },
    ],
  },
}
export default challenge
