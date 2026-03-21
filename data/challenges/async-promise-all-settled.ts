import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-promise-all-settled',
  title: 'Implement Promise.allSettled',
  description: 'Implement `allSettled(promises)` — resolves when all promises settle, returning an array of `{ status, value/reason }` objects regardless of failures.',
  type: 'code',
  difficulty: 'mid',
  skills: ['async-js', 'promises-concurrency'],
  content: {
    overview: `Unlike \`Promise.all\` which rejects on first failure, \`allSettled\` always resolves with the outcome of every promise. Essential when you need results from all operations even if some fail — like fetching data from multiple sources in parallel.`,
    solution: `function allSettled(promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p).then(
        value => ({ status: 'fulfilled', value }),
        reason => ({ status: 'rejected', reason })
      )
    )
  )
}`,
    explanation: `The trick: wrap each promise in a \`.then()\` that converts both fulfillment and rejection into a resolved value (an object). Since these wrappers never reject, \`Promise.all\` on them always resolves. This is the implementation the native \`Promise.allSettled\` uses internally. Useful whenever you need a "collect all results, check for failures after" pattern rather than "fail fast".`,
    hints: [
      'Map each promise to a new promise that always resolves — convert both success and failure into a { status, value/reason } object.',
      'Use `.then(value => ..., reason => ...)` — the second argument to `.then()` is the rejection handler.',
      'Wrap each promise in `Promise.resolve(p)` first to handle non-promise values in the array.',
    ],
    testCases: [
      {
        description: 'returns fulfilled status for resolved promises',
        explanation: 'Resolved promises must produce { status: "fulfilled", value: ... }.',
        testCode: `
allSettled([Promise.resolve(1), Promise.resolve(2)]).then(results => {
  if (results[0].status === 'fulfilled' && results[0].value === 1 &&
      results[1].status === 'fulfilled' && results[1].value === 2) { console.log("PASS") }
  else { console.log("FAIL: " + JSON.stringify(results)) }
})`,
      },
      {
        description: 'returns rejected status for rejected promises',
        explanation: 'Rejected promises must produce { status: "rejected", reason: ... } — not cause allSettled to reject.',
        testCode: `
allSettled([Promise.reject(new Error('boom')), Promise.resolve('ok')]).then(results => {
  if (results[0].status === 'rejected' && results[0].reason.message === 'boom' &&
      results[1].status === 'fulfilled') { console.log("PASS") }
  else { console.log("FAIL: " + JSON.stringify(results, null, 2)) }
})`,
      },
      {
        description: 'resolves even if all promises reject',
        explanation: 'allSettled must never reject — even if every promise fails.',
        testCode: `
allSettled([Promise.reject('a'), Promise.reject('b')]).then(results => {
  if (results.length === 2 && results.every(r => r.status === 'rejected')) { console.log("PASS") }
  else { console.log("FAIL: " + JSON.stringify(results)) }
})`,
      },
    ],
  },
}
export default challenge
