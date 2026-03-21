import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-event-loop-basics',
  title: 'Predict Execution Order',
  description: 'Write a function that demonstrates your understanding of the event loop by controlling execution order.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript', 'async-js'],
  content: {
    overview: 'The JavaScript event loop processes synchronous code first, then microtasks (Promise .then), then macrotasks (setTimeout). Getting this wrong causes bugs that are hard to reproduce.',
    starterCode: `// Write a function that returns a Promise resolving to an array
// of strings in this exact order: ['sync', 'microtask', 'macrotask']
// Use Promise.resolve() for the microtask and setTimeout for the macrotask.

function executionOrder() {
  // your code here
}`,
    solution: `function executionOrder() {
  const log = []
  return new Promise(resolve => {
    log.push('sync')
    Promise.resolve().then(() => {
      log.push('microtask')
    })
    setTimeout(() => {
      log.push('macrotask')
      resolve(log)
    }, 0)
  })
}`,
    hints: [
      'Push \'sync\' immediately (synchronous code runs first), then schedule the other two.',
      'Promise.resolve().then(() => log.push(\'microtask\')) schedules a microtask — it runs before setTimeout.',
      'Use setTimeout(() => { log.push(\'macrotask\'); resolve(log) }, 0) — resolve inside the setTimeout so the Promise waits for all three.',
    ],
    explanation: 'sync runs first (it\'s in the main execution). Promise microtasks run before the next event loop tick. setTimeout with 0ms is a macrotask — it runs after all pending microtasks. This is why Promise.then() always fires before setTimeout even at 0ms delay.',
    testCases: [
      {
        description: 'returns values in sync → microtask → macrotask order',
        testCode: `const result = await executionOrder()
assert.deepStrictEqual(result, ['sync', 'microtask', 'macrotask'])`,
      },
      {
        description: 'returns an array of 3 items',
        testCode: `const result = await executionOrder()
assert.strictEqual(result.length, 3)`,
      },
      {
        description: 'sync is always first',
        testCode: `const result = await executionOrder()
assert.strictEqual(result[0], 'sync')`,
      },
    ],
  },
}
export default challenge
