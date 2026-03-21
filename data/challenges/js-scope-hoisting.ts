import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-scope-hoisting',
  title: 'var vs let — Loop Variables',
  description: 'A bug report comes in: clicking any item in a dynamically built list always shows "item 3" instead of the item you clicked. The cause is a classic var-in-loop mistake.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'This is one of the most common real bugs in JavaScript UIs. When you create event listeners inside a loop using var, every listener closes over the same variable — by the time any of them fire, the loop has already finished and the variable holds its final value. Switching to let gives each iteration its own binding, so each listener captures a different value.',
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
    hints: [
      'The problem is that var creates one shared variable for all loop iterations. Change it to let.',
      'let is block-scoped — each iteration of the loop gets its own copy of i.',
      'You only need to change one word in the starter code.',
    ],
    explanation: 'With var, there is one i shared by all closures — by the time any click handler fires, the loop has finished and i is 3. With let, each loop iteration creates a new i binding captured independently by each closure. This is why "always use let, never var in loops" is standard practice. The same bug appears in any loop that creates callbacks: event listeners, setTimeout calls, or promise chains.',
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
