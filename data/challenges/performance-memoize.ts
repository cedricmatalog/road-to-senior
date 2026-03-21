import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'performance-memoize',
  title: 'Implement Memoization',
  description: 'Implement a `memoize` function that caches the results of expensive function calls and returns the cached result on repeated calls with the same arguments.',
  type: 'code',
  difficulty: 'mid',
  skills: ['performance', 'closures-scope'],
  content: {
    overview: `Memoization caches function results by input — if you've seen these arguments before, return the cached value instead of recomputing. It's the manual version of what React's \`useMemo\` and \`useCallback\` do, and a fundamental optimization pattern.`,
    solution: `function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}`,
    explanation: `Memoization trades memory for speed — cache the result of a call keyed by its inputs, and return the cached value on subsequent identical calls. The function is only invoked once per unique argument set. \`JSON.stringify(args)\` is a simple cache key that works for primitive arguments; for object arguments or functions you'd need a WeakMap or custom key strategy. This is the manual form of what React's \`useMemo\` and \`useCallback\` do under the hood.`,
    hints: [
      'Use a `Map` (or plain object) inside a closure to store results keyed by the arguments.',
      'For single-argument functions, `JSON.stringify(args)` works as a cache key for primitive values.',
      'Return the cached value immediately if the key exists. Otherwise, call the function, store the result, and return it.',
    ],
    starterCode: `function memoize(fn) {
  // return a memoized version of fn
}`,
    testCases: [
      {
        description: 'returns correct result',
        explanation: 'Sanity check — the memoized function must still compute the right answer on first call.',
        testCode: `
const double = memoize(x => x * 2)
if (double(5) === 10) { console.log("PASS") } else { console.log("FAIL: got " + double(5)) }`,
      },
      {
        description: 'caches result — original function called only once',
        explanation: 'The core guarantee — identical calls must hit the cache. If the original is called 3 times, the cache lookup is broken.',
        testCode: `
let calls = 0
const expensive = memoize(x => { calls++; return x * x })
expensive(4); expensive(4); expensive(4)
if (calls === 1) { console.log("PASS") } else { console.log("FAIL: called " + calls + " times") }`,
      },
      {
        description: 'different arguments produce different cached results',
        explanation: 'Different inputs must be stored under different cache keys — a single shared slot would make memoize(square)(3) === memoize(square)(4).',
        testCode: `
const square = memoize(x => x * x)
const a = square(3); const b = square(4)
if (a === 9 && b === 16) { console.log("PASS") } else { console.log("FAIL: " + a + ", " + b) }`,
      },
    ],
  },
}
export default challenge
