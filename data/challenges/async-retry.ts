import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-retry',
  title: 'Implement Async Retry with Backoff',
  description: 'Implement a `retry` function that retries a failing async operation up to N times with exponential backoff between attempts.',
  type: 'code',
  difficulty: 'senior',
  skills: ['async-js', 'error-handling'],
  content: {
    overview: `Transient failures are unavoidable in distributed systems. Retry with exponential backoff gives a failing service time to recover without hammering it — each attempt waits twice as long as the last. Used in every production HTTP client, queue consumer, and database connection pool.`,
    solution: `async function retry(fn, { times = 3, baseDelay = 100 } = {}) {
  for (let attempt = 0; attempt < times; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === times - 1) throw err
      await new Promise(r => setTimeout(r, baseDelay * Math.pow(2, attempt)))
    }
  }
}`,
    explanation: `Exponential backoff prevents thundering herd — if many clients retry immediately after a failure, they all hit the server at once and it fails again. Doubling the wait per attempt (100ms, 200ms, 400ms...) spreads load naturally. The critical detail: on the final attempt, let the error propagate — swallowing it hides failures from callers. Real implementations add jitter (random delay offset) to prevent clients that started at the same time from retrying in sync.`,
    hints: [
      'Use a loop (or recursion) — try the operation, catch the error, wait, then try again.',
      'Exponential backoff: wait `baseDelay * 2^attempt` ms before each retry. Use `await new Promise(r => setTimeout(r, delay))`.',
      'On the final attempt, let the error propagate — don\'t swallow it.',
    ],
    starterCode: `async function retry(fn, { times = 3, baseDelay = 100 } = {}) {
  // call fn(), retry up to 'times' on failure
  // wait baseDelay * 2^attempt ms between attempts
}`,
    testCases: [
      {
        description: 'resolves immediately on success',
        explanation: 'If fn succeeds on the first attempt, retry must return its value without any delay or extra calls.',
        testCode: `
retry(() => Promise.resolve(42)).then(result => {
  if (result === 42) { console.log("PASS") } else { console.log("FAIL: got " + result) }
})`,
      },
      {
        description: 'retries and resolves after transient failure',
        explanation: 'Simulates 2 failures then success — verifies the loop retries and eventually resolves with the correct value.',
        testCode: `
let attempts = 0
const fn = () => { attempts++; return attempts < 3 ? Promise.reject(new Error('fail')) : Promise.resolve('ok') }
retry(fn, { times: 3, baseDelay: 10 }).then(result => {
  if (result === 'ok' && attempts === 3) { console.log("PASS") }
  else { console.log("FAIL: result=" + result + " attempts=" + attempts) }
})`,
      },
      {
        description: 'rejects after exhausting retries',
        explanation: 'After all attempts fail, the last error must propagate — swallowing it would hide the failure from callers.',
        testCode: `
let attempts = 0
const fn = () => { attempts++; return Promise.reject(new Error('always fails')) }
retry(fn, { times: 2, baseDelay: 10 }).then(() => {
  console.log("FAIL: should have rejected")
}).catch(err => {
  if (attempts === 2 && err.message === 'always fails') { console.log("PASS") }
  else { console.log("FAIL: attempts=" + attempts + " err=" + err.message) }
})`,
      },
    ],
  },
}
export default challenge
