import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-discriminated-union',
  title: 'Type a Result Type with Discriminated Unions',
  description: 'An API call can succeed or fail. Model the response so callers are forced to handle both cases and TypeScript errors if they miss one.',
  type: 'code',
  difficulty: 'senior',
  skills: ['typescript'],
  content: {
    overview: `Discriminated unions use a shared literal field (the discriminant) to let TypeScript narrow a union type in switch/if blocks. The Result type pattern — borrowed from Rust and functional languages — makes error handling explicit and impossible to forget.`,
    starterCode: `// ok(value) and err(error) create typed result objects.
// ok  => { ok: true, value }
// err => { ok: false, error }

function ok(value) {
  // your code here
}

function err(error) {
  // your code here
}`,
    solution: `function ok(value) { return { ok: true, value } }
function err(error) { return { ok: false, error } }

function match(result, handlers) {
  if (result.ok) return handlers.ok(result.value)
  return handlers.err(result.error)
}`,
    explanation: `The \`ok\` field is the discriminant — TypeScript uses it to narrow the type in each branch. \`match\` forces callers to handle both cases explicitly, unlike try/catch which is easy to forget. This pattern eliminates a whole class of bugs: "I forgot to check if this operation failed." It's the foundation of how languages like Rust enforce error handling at the type level.`,
    hints: [
      'ok() returns { ok: true, value } and err() returns { ok: false, error } — the `ok` field is the discriminant.',
      'match() checks result.ok and calls the appropriate handler from the handlers object.',
      'The handlers object should have an `ok` function and an `err` function.',
    ],
    testCases: [
      {
        description: 'match calls ok handler for success',
        explanation: 'When result.ok is true, match must call handlers.ok with the value.',
        testCode: `
function ok(value) { return { ok: true, value } }
function match(result, handlers) {
  if (result.ok) return handlers.ok(result.value)
  return handlers.err(result.error)
}
const result = match(ok(42), {
  ok: val => 'got ' + val,
  err: e => 'error: ' + e,
})
if (result === 'got 42') { console.log("PASS") } else { console.log("FAIL: " + result) }`,
      },
      {
        description: 'match calls err handler for failure',
        explanation: 'When result.ok is false, match must call handlers.err with the error.',
        testCode: `
function err(error) { return { ok: false, error } }
function match(result, handlers) {
  if (result.ok) return handlers.ok(result.value)
  return handlers.err(result.error)
}
const result = match(err('not found'), {
  ok: val => 'value: ' + val,
  err: e => 'failed: ' + e,
})
if (result === 'failed: not found') { console.log("PASS") } else { console.log("FAIL: " + result) }`,
      },
    ],
  },
}
export default challenge
