import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'closures-counter',
  title: 'Build a Counter with Closures',
  description: 'Implement a counter factory using closures — no classes allowed.',
  type: 'code',
  difficulty: 'junior',
  skills: ['closures-scope'],
  content: {
    overview: `A closure lets a function "remember" variables from its enclosing scope after that scope has exited. Each call to \`makeCounter\` creates a fresh, independent \`count\` — the returned methods close over it.`,
    solution: `function makeCounter(start = 0) {
  let count = start
  return {
    increment() { count++ },
    decrement() { count-- },
    value() { return count },
  }
}`,
    explanation: `A closure is a function that "closes over" variables from its enclosing scope — they persist between calls. Here, \`count\` lives in \`makeCounter\`'s scope and each returned method reads or writes it. Each call to \`makeCounter\` creates a fresh \`count\`, so counters are independent. This pattern is the foundation of encapsulation in JavaScript without classes.`,
    hints: [
      'A closure "closes over" a variable — declare a `let count = start` inside the function.',
      'Return an object literal with three methods: `increment`, `decrement`, and `value`.',
      'Each method just reads or modifies `count`. No `this`, no class needed.',
    ],
    starterCode: `function makeCounter(start = 0) {
  // return an object with increment, decrement, and value methods
}`,
    testCases: [
      {
        description: 'increment increases value by 1',
        explanation: 'Confirms increment mutates the closed-over count and value() reads it correctly.',
        testCode: `
const c = makeCounter(0)
c.increment()
if (c.value() === 1) { console.log("PASS") } else { console.log("FAIL: expected 1, got " + c.value()) }`,
      },
      {
        description: 'counters are independent',
        explanation: 'Each makeCounter() call must produce its own isolated count — shared state means the closure is leaking.',
        testCode: `
const a = makeCounter(0); const b = makeCounter(10)
a.increment(); a.increment()
if (a.value() === 2 && b.value() === 10) { console.log("PASS") } else { console.log("FAIL: counters shared state") }`,
      },
    ],
  },
}
export default challenge
