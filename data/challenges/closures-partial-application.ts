import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'closures-partial-application',
  title: 'Implement Partial Application',
  description: 'You have a generic `log(level, service, message)` function. Every call in the payments module repeats the same level and service. Pre-fill them once instead of every call.',
  type: 'code',
  difficulty: 'mid',
  skills: ['closures-scope'],
  content: {
    overview: `When you find yourself passing the same arguments to a function over and over, partial application lets you pre-fill them once and get back a specialised function. It's how you create \`logError\` from \`log\`, \`fetchFromAPI\` from \`fetchWithAuth\`, or \`formatUSD\` from a generic formatter — same logic, less repetition.`,
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
