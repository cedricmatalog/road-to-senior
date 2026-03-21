import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'closures-once',
  title: 'Implement a Once Function',
  description: 'Implement `once(fn)` — returns a function that calls `fn` only on the first invocation and returns the same result on all subsequent calls.',
  type: 'code',
  difficulty: 'junior',
  skills: ['closures-scope'],
  content: {
    overview: `A classic closure pattern: store state (whether the function has been called, and its result) in the enclosing scope. The returned wrapper checks and updates that state on each call.`,
    starterCode: `// once(fn) returns a new function that calls fn only the first time.
// Subsequent calls return the first result without calling fn again.

function once(fn) {
  // your code here
}`,
    solution: `function once(fn) {
  let called = false
  let result
  return function(...args) {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }
}`,
    explanation: `The closure captures two variables: \`called\` (a flag) and \`result\` (the cached return value). On first call, \`called\` flips to \`true\` and \`result\` is stored. All subsequent calls skip the function and return the cached result. This pattern is used for lazy initialization, one-time setup functions, and preventing duplicate side effects.`,
    hints: [
      'You need two variables in the closure: a flag to track whether fn has been called, and a place to store the result.',
      'On first call: set the flag, call fn, store the result. On all subsequent calls: skip fn and return the stored result.',
      'Use rest/spread (...args) to forward arguments to fn on the first call.',
    ],
    testCases: [
      {
        description: 'calls fn only once',
        explanation: 'The wrapped function must invoke fn exactly once no matter how many times it\'s called.',
        testCode: `
let calls = 0
const inc = once(() => { calls++; return calls })
inc(); inc(); inc()
if (calls === 1) { console.log("PASS") } else { console.log("FAIL: called " + calls + " times") }`,
      },
      {
        description: 'returns the same result on repeat calls',
        explanation: 'All calls after the first must return the original result, not undefined.',
        testCode: `
const greet = once(() => 'hello')
const a = greet()
const b = greet()
if (a === 'hello' && b === 'hello') { console.log("PASS") } else { console.log("FAIL: " + a + ", " + b) }`,
      },
      {
        description: 'passes arguments on first call',
        explanation: 'Arguments must be forwarded to fn on the first call.',
        testCode: `
const add = once((a, b) => a + b)
const result = add(3, 4)
if (result === 7) { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
    ],
  },
}
export default challenge
