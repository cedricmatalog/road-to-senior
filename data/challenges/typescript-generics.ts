import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-generics',
  title: 'Type a Generic Pipeline Function',
  description: 'Implement a `pipe` function that chains unary functions left-to-right, fully typed so the return type of each function is the input type of the next.',
  type: 'code',
  difficulty: 'senior',
  skills: ['typescript'],
  content: {
    overview: `\`pipe\` is functional composition left-to-right: the output of each function becomes the input of the next. The runtime is a one-liner with \`reduce\` — the challenge is the TypeScript types, where each step's output must match the next step's input type.`,
    solution: `function pipe(value, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), value)
}`,
    explanation: `\`pipe\` is a functional programming staple — compose functions left-to-right so the output of each becomes the input of the next. \`reduce\` is the natural fit: the accumulator starts as the value and each step applies the next function. The TypeScript challenge is expressing that each function's output must match the next function's input — this requires either overloads (verbose but fully typed) or a recursive conditional type. In practice, many teams use \`any\` at the type boundary and trust runtime correctness.`,
    hints: [
      '`pipe` takes a value and an array of functions. Start with just making it work at runtime — types come second.',
      'For the simplest correct runtime: `functions.reduce((acc, fn) => fn(acc), value)`.',
      'For TypeScript: use overloads or a variadic tuple approach. A single generic `<T>(value: T, ...fns: Array<(x: any) => any>) => any` is a valid starting point that keeps the runtime correct.',
    ],
    starterCode: `function pipe(value, ...fns) {
  // apply fns left to right, passing output of each as input to next
}`,
    testCases: [
      {
        description: 'applies functions in order',
        explanation: 'Chains three transforms — verifies left-to-right ordering and that output flows correctly between steps.',
        testCode: `
const result = pipe(5, x => x * 2, x => x + 1, x => x.toString())
if (result === '11') { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'works with a single function',
        explanation: 'Edge case — a pipeline of one is just function application. reduce with a single step must still work.',
        testCode: `
const result = pipe('hello', s => s.toUpperCase())
if (result === 'HELLO') { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'works with no functions (returns value)',
        explanation: 'Zero-function case — pipe(42) should return 42 unchanged. reduce on an empty array returns the initial value.',
        testCode: `
const result = pipe(42)
if (result === 42) { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
    ],
  },
}
export default challenge
