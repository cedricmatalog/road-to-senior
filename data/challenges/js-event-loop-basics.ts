import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-event-loop-basics',
  title: 'Predict Execution Order',
  description: 'A teammate is confused why their analytics event fires before the DOM update, even though the DOM update was written first. Understand the event loop to explain and fix it.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript', 'async-js'],
  content: {
    overview: 'Execution order bugs are common when mixing synchronous code, Promises, and setTimeout. The JavaScript event loop always runs synchronous code first, then microtasks (Promise .then), then macrotasks (setTimeout). Getting this wrong produces race conditions that are hard to reproduce.',
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
    explanation: 'Synchronous code runs first — that\'s your DOM update or state mutation. Promise microtasks fire next, before the browser repaints or the next setTimeout. setTimeout (even at 0ms) is a macrotask — it runs last. This is why an analytics event inside a Promise.then() fires before any setTimeout, even if the setTimeout was scheduled first. Knowing this order helps you reason about when data is ready and why some callbacks fire "too early" or "too late".',
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
