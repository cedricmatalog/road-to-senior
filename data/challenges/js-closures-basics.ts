import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-closures-basics',
  title: 'Build a Simple Cache',
  description: 'Use a closure to cache the results of an expensive function.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript', 'closures-scope'],
  content: {
    overview: 'Closures let inner functions access variables from their enclosing scope even after that scope has returned. This is how you build stateful utilities like caches, counters, and rate limiters without classes.',
    starterCode: `// Write memoize(fn) that wraps a function and caches its results.
// If called again with the same single argument, return the cached result.
// (Assume the argument is a primitive — string or number)

function memoize(fn) {
  // your code here
}`,
    solution: `function memoize(fn) {
  const cache = {}
  return function(arg) {
    if (arg in cache) return cache[arg]
    cache[arg] = fn(arg)
    return cache[arg]
  }
}`,
    hints: [
      'Create a cache object inside memoize — it will be shared across all calls via closure.',
      'Return a new function that checks the cache before calling fn.',
      'Use `arg in cache` to check for cached values — this handles falsy cached values like 0 correctly.',
    ],
    explanation: 'The cache object lives in the closure — it persists across calls to the returned function. Using `arg in cache` (not `cache[arg]`) correctly handles cached falsy values like 0 or false.',
    testCases: [
      {
        description: 'returns correct result',
        testCode: `const double = memoize(x => x * 2)
assert.strictEqual(double(5), 10)`,
      },
      {
        description: 'calls fn only once for same argument',
        testCode: `let callCount = 0
const fn = memoize(x => { callCount++; return x * 2 })
fn(3)
fn(3)
assert.strictEqual(callCount, 1)`,
      },
      {
        description: 'calls fn again for different arguments',
        testCode: `let callCount = 0
const fn = memoize(x => { callCount++; return x * 2 })
fn(1)
fn(2)
assert.strictEqual(callCount, 2)`,
      },
    ],
  },
}
export default challenge
