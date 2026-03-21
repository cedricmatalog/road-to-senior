import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-scope-hoisting',
  title: 'var vs let — Loop Variables',
  description: 'Fix a classic var-in-loop bug using let.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'var is function-scoped and hoisted — the same variable is shared across all loop iterations. let is block-scoped — each iteration gets its own binding. This is one of the most common interview questions and a real source of bugs.',
    starterCode: `// This function should return an array of functions.
// Each function, when called, should return its index (0, 1, 2).
// But with var, they all return 3. Fix it using let.

function makeCounters() {
  const fns = []
  for (var i = 0; i < 3; i++) {
    fns.push(function() { return i })
  }
  return fns
}`,
    solution: `function makeCounters() {
  const fns = []
  for (let i = 0; i < 3; i++) {
    fns.push(function() { return i })
  }
  return fns
}`,
    explanation: 'With var, there is one i shared by all closures — by the time any of the functions run, i is 3. With let, each loop iteration creates a new i binding captured independently by each closure. This is why let was introduced: to fix this exact class of bugs.',
    testCases: [
      {
        description: 'first function returns 0',
        testCode: `const counters = makeCounters()
assert.strictEqual(counters[0](), 0)`,
      },
      {
        description: 'second function returns 1',
        testCode: `const counters = makeCounters()
assert.strictEqual(counters[1](), 1)`,
      },
      {
        description: 'third function returns 2',
        testCode: `const counters = makeCounters()
assert.strictEqual(counters[2](), 2)`,
      },
    ],
  },
}
export default challenge
