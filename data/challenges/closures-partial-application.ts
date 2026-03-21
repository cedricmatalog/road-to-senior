import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'closures-partial-application',
  title: 'Implement Partial Application',
  description: 'Implement `partial(fn, ...presetArgs)` — returns a new function with some arguments pre-filled.',
  type: 'code',
  difficulty: 'mid',
  skills: ['closures-scope'],
  content: {
    overview: `Partial application fixes some arguments of a function and returns a new function that accepts the rest. It's a form of function specialization that reduces repetition and enables composition.`,
    starterCode: `// partial(fn, ...presetArgs) returns a new function that calls fn
// with presetArgs prepended to any later arguments.

function partial(fn, ...presetArgs) {
  // your code here
}`,
    solution: `function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs)
  }
}`,
    explanation: `The closure captures \`presetArgs\`. When the returned function is called, it combines preset args with the new args via spread and calls the original function. This is different from currying (which always takes one argument at a time) — partial application fixes any number of args upfront. Used heavily in functional pipelines and to create specialised versions of generic utilities.`,
    hints: [
      'Capture the preset arguments in the outer function\'s scope.',
      'The returned function should combine presetArgs with any new arguments using spread syntax.',
      '`fn(...presetArgs, ...laterArgs)` — preset args come first.',
    ],
    testCases: [
      {
        description: 'pre-fills first argument',
        explanation: 'The most basic case — fix one arg and the returned function takes the rest.',
        testCode: `
function add(a, b) { return a + b }
const add5 = partial(add, 5)
if (add5(3) === 8) { console.log("PASS") } else { console.log("FAIL: got " + add5(3)) }`,
      },
      {
        description: 'pre-fills multiple arguments',
        explanation: 'Multiple preset args must all be forwarded in order before the later args.',
        testCode: `
function greet(greeting, name, punctuation) { return greeting + ' ' + name + punctuation }
const hello = partial(greet, 'Hello', 'World')
if (hello('!') === 'Hello World!') { console.log("PASS") } else { console.log("FAIL: got " + hello('!')) }`,
      },
      {
        description: 'works with no later arguments',
        explanation: 'If all args are preset, calling the returned function with no args should work.',
        testCode: `
const getAnswer = partial((a, b) => a + b, 40, 2)
if (getAnswer() === 42) { console.log("PASS") } else { console.log("FAIL: got " + getAnswer()) }`,
      },
    ],
  },
}
export default challenge
