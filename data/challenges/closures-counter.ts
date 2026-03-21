import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'closures-counter',
  title: 'Build a Counter with Closures',
  description: 'Implement a counter factory using closures — no classes allowed.',
  type: 'code',
  difficulty: 'junior',
  skills: ['closures-scope'],
  content: {
    starterCode: `function makeCounter(start = 0) {
  // return an object with increment, decrement, and value methods
}`,
    testCases: [
      {
        description: 'increment increases value by 1',
        testCode: `
const c = makeCounter(0)
c.increment()
if (c.value() === 1) { console.log("PASS") } else { console.log("FAIL: expected 1, got " + c.value()) }`,
      },
      {
        description: 'counters are independent',
        testCode: `
const a = makeCounter(0); const b = makeCounter(10)
a.increment(); a.increment()
if (a.value() === 2 && b.value() === 10) { console.log("PASS") } else { console.log("FAIL: counters shared state") }`,
      },
    ],
  },
}
export default challenge
